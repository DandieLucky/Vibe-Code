"use client";

import { createClient } from "@/lib/supabase/client";

/**
 * Data-access progres belajar.
 *
 * Strategi: Supabase sebagai sumber kebenaran bila user login.
 * Jika belum login / Supabase belum dikonfigurasi, otomatis jatuh ke
 * localStorage (mode demo) sehingga platform tetap bisa dipakai.
 */

const LS = {
  completed: "vibe_completed_lessons",
  bookmarks: "vibe_bookmarked_lessons",
  note: (lessonId: string) => `vibe_note_${lessonId}`,
};

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* localStorage penuh atau diblokir — abaikan */
  }
}

export interface ProgressSnapshot {
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  notes: Record<string, string>;
  source: "supabase" | "local";
}

/** Ambil seluruh progres user (sekali fetch, dipakai semua widget). */
export async function loadProgress(): Promise<ProgressSnapshot> {
  const supabase = createClient();
  if (!supabase) {
    return {
      completedLessonIds: readLS<string[]>(LS.completed, []),
      bookmarkedLessonIds: readLS<string[]>(LS.bookmarks, []),
      notes: collectLocalNotes(),
      source: "local",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      completedLessonIds: readLS<string[]>(LS.completed, []),
      bookmarkedLessonIds: readLS<string[]>(LS.bookmarks, []),
      notes: collectLocalNotes(),
      source: "local",
    };
  }

  const [progressRes, bookmarkRes, notesRes] = await Promise.all([
    supabase.from("user_progress").select("lesson_id, status").eq("user_id", user.id),
    supabase.from("bookmarks").select("lesson_id").eq("user_id", user.id),
    supabase.from("learning_notes").select("lesson_id, note_text").eq("user_id", user.id),
  ]);

  const notes: Record<string, string> = {};
  for (const row of notesRes.data ?? []) {
    notes[row.lesson_id] = row.note_text;
  }

  return {
    completedLessonIds:
      progressRes.data?.filter((r) => r.status === "completed").map((r) => r.lesson_id) ?? [],
    bookmarkedLessonIds: bookmarkRes.data?.map((r) => r.lesson_id) ?? [],
    notes,
    source: "supabase",
  };
}

function collectLocalNotes(): Record<string, string> {
  const notes: Record<string, string> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("vibe_note_")) {
        const text = localStorage.getItem(key);
        if (text?.trim()) notes[key.replace("vibe_note_", "")] = text;
      }
    }
  } catch {
    /* abaikan */
  }
  return notes;
}

/** Tandai pelajaran selesai / batal selesai. */
export async function toggleLessonComplete(
  lessonId: string,
  isCompleted: boolean
): Promise<boolean> {
  const supabase = createClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (isCompleted) {
        const { error } = await supabase.from("user_progress").upsert(
          {
            user_id: user.id,
            lesson_id: lessonId,
            status: "completed",
            completed_at: new Date().toISOString(),
          },
          { onConflict: "user_id,lesson_id" }
        );
        if (error) return false;
      } else {
        const { error } = await supabase
          .from("user_progress")
          .upsert(
            {
              user_id: user.id,
              lesson_id: lessonId,
              status: "in_progress",
              completed_at: null,
            },
            { onConflict: "user_id,lesson_id" }
          );
        if (error) return false;
      }
      return true;
    }
  }

  // Fallback localStorage
  const current = readLS<string[]>(LS.completed, []);
  const next = isCompleted
    ? Array.from(new Set([...current, lessonId]))
    : current.filter((id) => id !== lessonId);
  writeLS(LS.completed, next);
  return true;
}

/** Toggle bookmark sebuah pelajaran. */
export async function toggleBookmark(lessonId: string): Promise<boolean> {
  const supabase = createClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: existing } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId)
        .maybeSingle();

      if (existing) {
        await supabase.from("bookmarks").delete().eq("id", existing.id);
      } else {
        await supabase
          .from("bookmarks")
          .insert({ user_id: user.id, lesson_id: lessonId });
      }
      return true;
    }
  }

  const current = readLS<string[]>(LS.bookmarks, []);
  const next = current.includes(lessonId)
    ? current.filter((id) => id !== lessonId)
    : [...current, lessonId];
  writeLS(LS.bookmarks, next);
  return true;
}

/** Simpan catatan pribadi untuk sebuah pelajaran. */
export async function saveNote(lessonId: string, note: string): Promise<boolean> {
  const supabase = createClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (!note.trim()) {
        const { error } = await supabase
          .from("learning_notes")
          .delete()
          .eq("user_id", user.id)
          .eq("lesson_id", lessonId);
        return !error;
      }
      const { error } = await supabase.from("learning_notes").upsert(
        { user_id: user.id, lesson_id: lessonId, note_text: note },
        { onConflict: "user_id,lesson_id" }
      );
      return !error;
    }
  }

  writeLS(LS.note(lessonId), note);
  return true;
}

/**
 * Kirim progres yang tersimpan lokal ke Supabase setelah user login.
 * Dipakai agar peserta yang belajar sebelum punya akun tidak kehilangan progres.
 */
export async function migrateLocalProgressToSupabase(): Promise<{
  migratedLessons: number;
  migratedBookmarks: number;
  migratedNotes: number;
}> {
  const result = { migratedLessons: 0, migratedBookmarks: 0, migratedNotes: 0 };
  const supabase = createClient();
  if (!supabase) return result;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return result;

  const completed = readLS<string[]>(LS.completed, []);
  const bookmarks = readLS<string[]>(LS.bookmarks, []);
  const notes = collectLocalNotes();

  if (completed.length) {
    const rows = completed.map((lessonId) => ({
      user_id: user.id,
      lesson_id: lessonId,
      status: "completed" as const,
      completed_at: new Date().toISOString(),
    }));
    const { error } = await supabase
      .from("user_progress")
      .upsert(rows, { onConflict: "user_id,lesson_id" });
    if (!error) result.migratedLessons = rows.length;
  }

  if (bookmarks.length) {
    const rows = bookmarks.map((lessonId) => ({
      user_id: user.id,
      lesson_id: lessonId,
    }));
    const { error } = await supabase
      .from("bookmarks")
      .upsert(rows, { onConflict: "user_id,lesson_id" });
    if (!error) result.migratedBookmarks = rows.length;
  }

  const noteRows = Object.entries(notes).map(([lessonId, text]) => ({
    user_id: user.id,
    lesson_id: lessonId,
    note_text: text,
  }));
  if (noteRows.length) {
    const { error } = await supabase
      .from("learning_notes")
      .upsert(noteRows, { onConflict: "user_id,lesson_id" });
    if (!error) result.migratedNotes = noteRows.length;
  }

  return result;
}
