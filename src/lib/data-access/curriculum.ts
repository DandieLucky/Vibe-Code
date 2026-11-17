import { MODULES_DATA, COURSE_INFO, type FullModule } from "@/lib/data/curriculum-data";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Lesson } from "@/types/database";

type LessonContentJson = Omit<
  Lesson,
  | "id"
  | "module_id"
  | "lesson_number"
  | "title"
  | "slug"
  | "description"
  | "estimated_minutes"
  | "order_index"
  | "is_published"
  | "created_at"
>;

const DEFAULT_LESSON_BY_ID = new Map<string, Lesson>(
  MODULES_DATA.flatMap((m) => m.lessons.map((l) => [l.id, l] as const))
);

export function extractLessonContentJson(lesson: Lesson): LessonContentJson {
  const {
    id: _id,
    module_id: _moduleId,
    lesson_number: _lessonNumber,
    title: _title,
    slug: _slug,
    description: _description,
    estimated_minutes: _estimatedMinutes,
    order_index: _orderIndex,
    is_published: _isPublished,
    created_at: _createdAt,
    ...rest
  } = lesson;
  return rest;
}

export function slugifyText(input: string): string {
  const cleaned = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || `item-${Date.now()}`;
}

function mapDbRowToLesson(row: any): Lesson {
  const hasJson =
    row.content_json &&
    typeof row.content_json === "object" &&
    Object.keys(row.content_json).length > 0;
  const fallbackContent = !hasJson
    ? (() => {
        const def = DEFAULT_LESSON_BY_ID.get(String(row.id));
        return def ? extractLessonContentJson(def) : {};
      })()
    : {};
  const content: LessonContentJson = hasJson ? row.content_json : fallbackContent;

  return {
    id: String(row.id),
    module_id: String(row.module_id),
    lesson_number: Number(row.lesson_number ?? 1),
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    description: String(row.description ?? ""),
    estimated_minutes: Number(row.estimated_minutes ?? 15),
    order_index: Number(row.order_index ?? 1),
    is_published: row.is_published !== false,
    created_at: String(row.created_at ?? new Date().toISOString()),
    ...content,
  };
}

export interface SeedResult {
  ok: boolean;
  error?: string;
  warning?: string;
}

export async function seedDefaultCurriculumToDb(): Promise<SeedResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Kunci server Supabase belum terpasang." };

  const { error: courseErr } = await admin.from("courses").upsert(
    {
      id: COURSE_INFO.id,
      slug: COURSE_INFO.slug,
      title: COURSE_INFO.title,
      description: COURSE_INFO.description,
      cover_image: COURSE_INFO.cover_image,
      is_published: true,
    },
    { onConflict: "id" }
  );

  if (courseErr) {
    console.error("[curriculum] gagal seed course:", courseErr.message);
    return { ok: false, error: `Gagal menyimpan course: ${courseErr.message}` };
  }

  const modulePayload = MODULES_DATA.map((mod) => ({
    id: mod.id,
    course_id: COURSE_INFO.id,
    module_number: mod.module_number,
    title: mod.title,
    slug: mod.slug,
    description: mod.description,
    estimated_minutes: mod.estimated_minutes,
    difficulty_level: mod.difficulty_level,
    is_published: mod.is_published,
    order_index: mod.order_index,
  }));

  const { error: modErr } = await admin
    .from("modules")
    .upsert(modulePayload, { onConflict: "id" });

  if (modErr) {
    console.error("[curriculum] gagal seed modules:", modErr.message);
    return { ok: false, error: `Gagal menyimpan modul: ${modErr.message}` };
  }

  const lessonPayload = MODULES_DATA.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      id: lesson.id,
      module_id: mod.id,
      lesson_number: lesson.lesson_number,
      title: lesson.title,
      slug: lesson.slug,
      description: lesson.description,
      estimated_minutes: lesson.estimated_minutes,
      order_index: lesson.order_index,
      is_published: lesson.is_published,
      content_json: extractLessonContentJson(lesson),
    }))
  );

  const { error: lessonErr } = await admin
    .from("lessons")
    .upsert(lessonPayload, { onConflict: "id" });

  if (lessonErr) {
    // Jika kolom content_json belum dibuat di Supabase, simpan tanpa content_json
    // agar modul & materi tetap langsung muncul (konten bawaan digabung dari kode).
    if (lessonErr.message.includes("content_json")) {
      const baseLessons = lessonPayload.map(({ content_json: _c, ...rest }) => rest);
      const { error: baseErr } = await admin
        .from("lessons")
        .upsert(baseLessons, { onConflict: "id" });
      if (baseErr) {
        return { ok: false, error: `Gagal menyimpan materi: ${baseErr.message}` };
      }
      return {
        ok: true,
        warning:
          "7 modul berhasil disinkronkan, tetapi migrasi kolom content_json belum dijalankan di Supabase. Jalankan SQL di supabase/migrations/20261117000002_custom_curriculum_cms.sql agar editan isi artikel ikut tersimpan.",
      };
    }

    console.error("[curriculum] gagal seed lessons:", lessonErr.message);
    return { ok: false, error: `Gagal menyimpan materi: ${lessonErr.message}` };
  }

  return { ok: true };
}

export async function resetDefaultCurriculumInDb(): Promise<SeedResult> {
  const admin = createAdminClient();
  if (!admin) return { ok: false, error: "Kunci server Supabase belum terpasang." };

  const { error: delLessonsErr } = await admin.from("lessons").delete().neq("id", "");
  if (delLessonsErr) {
    return { ok: false, error: `Gagal menghapus materi lama: ${delLessonsErr.message}` };
  }

  const { error: delModsErr } = await admin.from("modules").delete().neq("id", "");
  if (delModsErr) {
    return { ok: false, error: `Gagal menghapus modul lama: ${delModsErr.message}` };
  }

  return seedDefaultCurriculumToDb();
}

/**
 * Mengambil seluruh modul & materi kurikulum dari Supabase (jika tersedia),
 * dengan seed otomatis dari MODULES_DATA saat tabel masih kosong dan fallback
 * aman ke MODULES_DATA jika platform berjalan tanpa koneksi Supabase.
 */
export async function getCurriculumModules(options?: {
  includeUnpublished?: boolean;
}): Promise<FullModule[]> {
  const includeUnpublished = options?.includeUnpublished ?? false;

  const fallback = () => {
    if (includeUnpublished) return MODULES_DATA;
    return MODULES_DATA.filter((m) => m.is_published).map((m) => ({
      ...m,
      lessons: m.lessons.filter((l) => l.is_published),
    }));
  };

  const client = createAdminClient() ?? (await createServerSupabaseClient());
  if (!client) {
    return fallback();
  }

  try {
    let { data: moduleRows, error: modErr } = await client
      .from("modules")
      .select("*")
      .order("order_index", { ascending: true })
      .order("module_number", { ascending: true });

    if (modErr) {
      console.warn("[curriculum] fallback MODULES_DATA karena query modules gagal:", modErr.message);
      return fallback();
    }

    const isStalePlaceholder =
      Array.isArray(moduleRows) &&
      moduleRows.length > 0 &&
      moduleRows.every(
        (m: any) =>
          m.course_id === "b319caba-00e0-534e-874c-c75238f99baf" &&
          typeof m.description === "string" &&
          m.description.startsWith("Katalog referensi")
      );

    if (!moduleRows || moduleRows.length === 0 || isStalePlaceholder) {
      const admin = createAdminClient();
      if (admin) {
        if (isStalePlaceholder) {
          await admin
            .from("modules")
            .delete()
            .eq("course_id", "b319caba-00e0-534e-874c-c75238f99baf");
        }
        const seeded = await seedDefaultCurriculumToDb();
        if (seeded.ok) {
          const refreshed = await admin
            .from("modules")
            .select("*")
            .order("order_index", { ascending: true })
            .order("module_number", { ascending: true });
          moduleRows = refreshed.data ?? [];
        } else {
          return fallback();
        }
      } else {
        return fallback();
      }
    }

    const { data: lessonRows, error: lessonErr } = await client
      .from("lessons")
      .select("*")
      .order("order_index", { ascending: true })
      .order("lesson_number", { ascending: true });

    if (lessonErr) {
      console.warn("[curriculum] fallback MODULES_DATA karena query lessons gagal:", lessonErr.message);
      return fallback();
    }

    const lessonsByModule = new Map<string, Lesson[]>();
    for (const row of lessonRows ?? []) {
      const mapped = mapDbRowToLesson(row);
      if (!includeUnpublished && !mapped.is_published) continue;
      const list = lessonsByModule.get(mapped.module_id) ?? [];
      list.push(mapped);
      lessonsByModule.set(mapped.module_id, list);
    }

    const modules: FullModule[] = [];
    for (const row of moduleRows ?? []) {
      const isPub = row.is_published !== false;
      if (!includeUnpublished && !isPub) continue;
      modules.push({
        id: String(row.id),
        course_id: String(row.course_id ?? COURSE_INFO.id),
        module_number: Number(row.module_number ?? 1),
        title: String(row.title ?? ""),
        slug: String(row.slug ?? ""),
        description: String(row.description ?? ""),
        estimated_minutes: Number(row.estimated_minutes ?? 45),
        difficulty_level: (row.difficulty_level || "Pemula") as FullModule["difficulty_level"],
        is_published: isPub,
        order_index: Number(row.order_index ?? 1),
        created_at: String(row.created_at ?? new Date().toISOString()),
        lessons: lessonsByModule.get(String(row.id)) ?? [],
      });
    }

    return modules;
  } catch (err) {
    console.warn("[curriculum] exception saat memuat kurikulum dari DB:", err);
    return fallback();
  }
}
