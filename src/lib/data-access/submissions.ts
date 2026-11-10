"use client";

import { createClient } from "@/lib/supabase/client";
import type { WorkSubmission, SubmissionStatus } from "@/types/database";

/**
 * Data-access pengumpulan karya peserta.
 *
 * ATURAN BISNIS: peserta hanya boleh submit SEKALI. Setelah ada submission,
 * UI harus menampilkan status "terkunci" — tidak ada form submit ulang.
 */

const LS_KEY = "vibe_user_submission";

export interface SubmissionRecord extends Partial<WorkSubmission> {
  id: string;
  user_id: string;
  project_title: string;
  project_description: string;
  github_url: string;
  deployment_url: string;
  submission_status: SubmissionStatus;
  submitted_at: string;
  submission_code?: string | null;
  final_score?: number | null;
  technical_score?: number | null;
  ai_score?: number | null;
  ai_summary?: string | null;
  scoring_status?: string | null;
  penalty_applied?: number | null;
  penalty_reason?: string | null;
  lighthouse_performance?: number | null;
  is_deployment_live?: boolean | null;
}

/** Submission milik user yang sedang login (atau null). */
export async function loadMySubmission(): Promise<SubmissionRecord | null> {
  const supabase = createClient();

  if (!supabase) {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as SubmissionRecord) : null;
    } catch {
      return null;
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("work_submissions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) return null;
  return data as unknown as SubmissionRecord | null;
}

export interface SubmitPayload {
  project_title: string;
  project_description: string;
  github_url: string;
  deployment_url: string;
  completed_modules: string[];
  full_name: string;
  email: string;
  whatsapp: string;
  institution: string;
  screenshot_url?: string;
}

export interface SubmitResult {
  ok: boolean;
  message: string;
  submissionCode?: string;
}

/**
 * Simpan karya peserta. Menolak jika sudah pernah submit (sekali saja).
 */
export async function submitWork(payload: SubmitPayload): Promise<SubmitResult> {
  const supabase = createClient();

  if (!supabase) {
    // Mode demo: simpan lokal, tandai supaya UI mengunci form
    const demo: SubmissionRecord = {
      id: "demo-" + Date.now(),
      user_id: "demo-user",
      ...payload,
      submission_status: "pending",
      submitted_at: new Date().toISOString(),
      submission_code: "VC-DEMO-0001",
      scoring_status: "pending",
    };
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(demo));
      return {
        ok: true,
        message:
          "Karya tersimpan dalam mode demo (belum tersambung ke database). Login agar karya Anda masuk ke sistem penilaian.",
        submissionCode: "VC-DEMO-0001",
      };
    } catch {
      return { ok: false, message: "Gagal menyimpan karya di browser Anda." };
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Anda harus login sebelum mengumpulkan karya." };
  }

  // Cek apakah sudah pernah submit — aturan: sekali saja
  const { data: existing } = await supabase
    .from("work_submissions")
    .select("id, submission_code")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    return {
      ok: false,
      message: `Anda sudah pernah mengumpulkan karya (kode: ${existing.submission_code ?? "-"}). Pengumpulan hanya dapat dilakukan satu kali.`,
    };
  }

  const { data, error } = await supabase
    .from("work_submissions")
    .insert({
      user_id: user.id,
      ...payload,
      submission_status: "pending",
      scoring_status: "pending",
    })
    .select("id, submission_code")
    .single();

  if (error) {
    return { ok: false, message: "Gagal menyimpan karya: " + error.message };
  }

  // Picu penilaian otomatis (best-effort; kegagalan tidak menggagalkan submit,
  // karena admin selalu bisa memicu ulang penilaian dari panel admin).
  if ((data as any)?.id) {
    try {
      await fetch("/api/scoring/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: (data as any).id }),
      });
    } catch {
      /* diabaikan */
    }
  }

  return {
    ok: true,
    message: "Karya berhasil dikumpulkan dan sedang dalam proses penilaian otomatis.",
    submissionCode: (data as any)?.submission_code ?? undefined,
  };
}

/** Statistik singkat untuk header dashboard peserta. */
export async function getSubmissionStats(): Promise<{
  total: number;
  pendingScoring: number;
}> {
  const supabase = createClient();
  if (!supabase) return { total: 0, pendingScoring: 0 };

  const { count } = await supabase
    .from("work_submissions")
    .select("id", { count: "exact", head: true });

  const { count: pending } = await supabase
    .from("work_submissions")
    .select("id", { count: "exact", head: true })
    .eq("scoring_status", "pending");

  return { total: count ?? 0, pendingScoring: pending ?? 0 };
}
