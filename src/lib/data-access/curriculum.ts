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
  const content: LessonContentJson =
    row.content_json && typeof row.content_json === "object" ? row.content_json : {};

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

export async function seedDefaultCurriculumToDb(): Promise<boolean> {
  const admin = createAdminClient();
  if (!admin) return false;

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
    return false;
  }

  for (const mod of MODULES_DATA) {
    const { error: modErr } = await admin.from("modules").upsert(
      {
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
      },
      { onConflict: "id" }
    );

    if (modErr) {
      console.error("[curriculum] gagal seed module:", mod.id, modErr.message);
      return false;
    }

    for (const lesson of mod.lessons) {
      const contentJson = extractLessonContentJson(lesson);
      const { error: lessonErr } = await admin.from("lessons").upsert(
        {
          id: lesson.id,
          module_id: mod.id,
          lesson_number: lesson.lesson_number,
          title: lesson.title,
          slug: lesson.slug,
          description: lesson.description,
          estimated_minutes: lesson.estimated_minutes,
          order_index: lesson.order_index,
          is_published: lesson.is_published,
          content_json: contentJson,
        },
        { onConflict: "id" }
      );

      if (lessonErr) {
        console.error("[curriculum] gagal seed lesson:", lesson.id, lessonErr.message);
        return false;
      }
    }
  }

  return true;
}

export async function resetDefaultCurriculumInDb(): Promise<boolean> {
  const admin = createAdminClient();
  if (!admin) return false;
  await admin.from("lessons").delete().neq("id", "");
  await admin.from("modules").delete().neq("id", "");
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

    // Jika masih berisi katalog referensi lama (12 modul web) dan belum dimigrasi,
    // bersihkan atau anggap belum di-seed dengan materi aktif.
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
        if (seeded) {
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

