import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { COURSE_INFO } from "@/lib/data/curriculum-data";
import {
  getCurriculumModules,
  resetDefaultCurriculumInDb,
  slugifyText,
} from "@/lib/data-access/curriculum";

export const dynamic = "force-dynamic";

async function pastikanAdmin(): Promise<{ ok: boolean; pesan?: string }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, pesan: "Koneksi database belum siap." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, pesan: "Anda belum login." };

  const { data, error } = await supabase.rpc("is_admin");
  if (error) {
    const { data: prof } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    if ((prof as any)?.role !== "admin" && (prof as any)?.role !== "instructor") {
      return { ok: false, pesan: "Halaman ini hanya untuk administrator." };
    }
    return { ok: true };
  }
  if (data !== true) {
    return { ok: false, pesan: "Halaman ini hanya untuk administrator." };
  }
  return { ok: true };
}

function revalidateCurriculumRoutes() {
  revalidatePath("/beranda");
  revalidatePath("/kurikulum");
  revalidatePath("/dashboard");
  revalidatePath("/kumpulan-karya");
  revalidatePath("/admin");
  revalidatePath("/admin/curriculum");
}

export async function GET() {
  const izin = await pastikanAdmin();
  if (!izin.ok) return NextResponse.json({ error: izin.pesan }, { status: 403 });

  const modules = await getCurriculumModules({ includeUnpublished: true });
  return NextResponse.json({ modules });
}

export async function POST(req: NextRequest) {
  const izin = await pastikanAdmin();
  if (!izin.ok) return NextResponse.json({ error: izin.pesan }, { status: 403 });

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Kunci server Supabase (SERVICE_ROLE_KEY) belum terpasang." },
      { status: 503 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Format JSON tidak valid." }, { status: 400 });
  }

  const action = String(body?.action || "");

  try {
    if (action === "upsert_module") {
      const mod = body.module;
      if (!mod?.title?.trim()) {
        return NextResponse.json({ error: "Judul modul wajib diisi." }, { status: 400 });
      }

      // Pastikan row course induk ada
      await admin.from("courses").upsert(
        {
          id: COURSE_INFO.id,
          slug: COURSE_INFO.slug,
          title: COURSE_INFO.title,
          description: COURSE_INFO.description,
          is_published: true,
        },
        { onConflict: "id" }
      );

      const id = mod.id || `modul-${Date.now()}`;
      const num = Number(mod.module_number) || 1;
      const baseSlug = mod.slug?.trim() || `modul-${num}-${slugifyText(mod.title)}`;

      const { error } = await admin.from("modules").upsert(
        {
          id,
          course_id: COURSE_INFO.id,
          module_number: num,
          title: mod.title.trim(),
          slug: baseSlug,
          description: String(mod.description || ""),
          estimated_minutes: Number(mod.estimated_minutes) || 45,
          difficulty_level: String(mod.difficulty_level || "Pemula"),
          is_published: mod.is_published !== false,
          order_index: Number(mod.order_index ?? num),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      revalidateCurriculumRoutes();
      const modules = await getCurriculumModules({ includeUnpublished: true });
      return NextResponse.json({ ok: true, id, modules });
    }

    if (action === "delete_module") {
      const moduleId = String(body.moduleId || "");
      if (!moduleId) {
        return NextResponse.json({ error: "ID modul wajib dikirim." }, { status: 400 });
      }

      await admin.from("lessons").delete().eq("module_id", moduleId);
      const { error } = await admin.from("modules").delete().eq("id", moduleId);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      revalidateCurriculumRoutes();
      const modules = await getCurriculumModules({ includeUnpublished: true });
      return NextResponse.json({ ok: true, modules });
    }

    if (action === "reorder_modules") {
      const orderedIds: string[] = Array.isArray(body.orderedIds) ? body.orderedIds : [];
      for (let i = 0; i < orderedIds.length; i++) {
        await admin
          .from("modules")
          .update({
            order_index: i + 1,
            module_number: i + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", orderedIds[i]);
      }
      revalidateCurriculumRoutes();
      const modules = await getCurriculumModules({ includeUnpublished: true });
      return NextResponse.json({ ok: true, modules });
    }

    if (action === "upsert_lesson") {
      const lesson = body.lesson;
      if (!lesson?.module_id || !lesson?.title?.trim()) {
        return NextResponse.json(
          { error: "Module ID dan judul materi wajib diisi." },
          { status: 400 }
        );
      }

      const id = lesson.id || `lesson-${Date.now()}`;
      const num = Number(lesson.lesson_number) || 1;
      const slug = lesson.slug?.trim() || `${slugifyText(lesson.title)}-${id.slice(-4)}`;

      const contentJson = {
        objective: lesson.objective || undefined,
        prerequisites: Array.isArray(lesson.prerequisites) ? lesson.prerequisites : undefined,
        concept_explanation: lesson.concept_explanation || "",
        preparation: Array.isArray(lesson.preparation) ? lesson.preparation : undefined,
        thinking_steps: Array.isArray(lesson.thinking_steps) ? lesson.thinking_steps : undefined,
        step_instructions: Array.isArray(lesson.step_instructions) ? lesson.step_instructions : undefined,
        antigravity_prompt: lesson.antigravity_prompt || undefined,
        code_snippets: Array.isArray(lesson.code_snippets) ? lesson.code_snippets : undefined,
        expected_result: lesson.expected_result || undefined,
        validation_check: Array.isArray(lesson.validation_check) ? lesson.validation_check : undefined,
        common_errors: Array.isArray(lesson.common_errors) ? lesson.common_errors : undefined,
        exercise: lesson.exercise || undefined,
        quiz: lesson.quiz || undefined,
      };

      const { error } = await admin.from("lessons").upsert(
        {
          id,
          module_id: String(lesson.module_id),
          lesson_number: num,
          title: lesson.title.trim(),
          slug,
          description: String(lesson.description || ""),
          estimated_minutes: Number(lesson.estimated_minutes) || 15,
          order_index: Number(lesson.order_index ?? num),
          is_published: lesson.is_published !== false,
          content_json: contentJson,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      revalidateCurriculumRoutes();
      const modules = await getCurriculumModules({ includeUnpublished: true });
      return NextResponse.json({ ok: true, id, modules });
    }

    if (action === "delete_lesson") {
      const lessonId = String(body.lessonId || "");
      if (!lessonId) {
        return NextResponse.json({ error: "ID materi wajib dikirim." }, { status: 400 });
      }

      const { error } = await admin.from("lessons").delete().eq("id", lessonId);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      revalidateCurriculumRoutes();
      const modules = await getCurriculumModules({ includeUnpublished: true });
      return NextResponse.json({ ok: true, modules });
    }

    if (action === "reorder_lessons") {
      const orderedIds: string[] = Array.isArray(body.orderedIds) ? body.orderedIds : [];
      for (let i = 0; i < orderedIds.length; i++) {
        await admin
          .from("lessons")
          .update({
            order_index: i + 1,
            lesson_number: i + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", orderedIds[i]);
      }
      revalidateCurriculumRoutes();
      const modules = await getCurriculumModules({ includeUnpublished: true });
      return NextResponse.json({ ok: true, modules });
    }

    if (action === "reset_defaults") {
      await resetDefaultCurriculumInDb();
      revalidateCurriculumRoutes();
      const modules = await getCurriculumModules({ includeUnpublished: true });
      return NextResponse.json({ ok: true, modules });
    }

    return NextResponse.json({ error: "Aksi tidak dikenali." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Gagal menyimpan perubahan kurikulum." },
      { status: 500 }
    );
  }
}

