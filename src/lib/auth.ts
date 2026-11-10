import { cache } from "react";
import { createServerSupabaseClient } from "./supabase/server";

export type UserRole = "student" | "admin" | "instructor";

export interface CurrentUser {
  id: string;
  email: string;
  full_name: string;
  institution: string | null;
  whatsapp: string | null;
  avatar_url: string | null;
  role: UserRole;
}

/**
 * Ambil user yang sedang login beserta profilnya.
 * Di-cache per request supaya tidak query berulang di satu render.
 * Mengembalikan null jika belum login atau Supabase belum dikonfigurasi.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, institution, whatsapp, avatar_url, role")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email ?? "",
    full_name: profile?.full_name ?? (user.email ?? "").split("@")[0],
    institution: profile?.institution ?? null,
    whatsapp: profile?.whatsapp ?? null,
    avatar_url: profile?.avatar_url ?? null,
    role: (profile?.role as UserRole) ?? "student",
  };
});

/** True jika user adalah admin atau instructor. */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin" || user?.role === "instructor";
}

/** Ambil profil peserta + ringkasan progresnya. */
export async function getProgressSummary(userId: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { completed: [], bookmarked: [], notes: [] };

  const [progressRes, bookmarkRes, notesRes] = await Promise.all([
    supabase.from("user_progress").select("lesson_id, status").eq("user_id", userId),
    supabase.from("bookmarks").select("lesson_id").eq("user_id", userId),
    supabase.from("learning_notes").select("lesson_id, note_text").eq("user_id", userId),
  ]);

  return {
    completed:
      progressRes.data?.filter((r) => r.status === "completed").map((r) => r.lesson_id) ?? [],
    bookmarked: bookmarkRes.data?.map((r) => r.lesson_id) ?? [],
    notes:
      notesRes.data?.map((r) => ({ lessonId: r.lesson_id, note: r.note_text })) ?? [],
  };
}
