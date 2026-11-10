import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { scoreSubmission } from "@/lib/scoring/engine";
import { getCurrentUser } from "@/lib/auth";

export const maxDuration = 60;

/**
 * Picu penilaian otomatis untuk satu submission.
 *
 * Otorisasi: admin bisa menilai submission apa pun; peserta hanya
 * submission miliknya sendiri (untuk memicu ulang bila gagal).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { submissionId } = body;

    const admin = createAdminClient();
    if (!admin) {
      return NextResponse.json(
        { ok: false, message: "SUPABASE_SERVICE_ROLE_KEY belum diset di server." },
        { status: 503 }
      );
    }

    const user = await getCurrentUser();
    const isStaff = user?.role === "admin" || user?.role === "instructor";

    // Tanpa submissionId: cuma staff yang boleh memicu batch kecil
    if (!submissionId) {
      if (!isStaff) {
        return NextResponse.json(
          { ok: false, message: "submissionId wajib diisi." },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { ok: false, message: "submissionId wajib diisi." },
        { status: 400 }
      );
    }

    const { data: sub } = await admin
      .from("work_submissions")
      .select("id, user_id, scoring_status")
      .eq("id", submissionId)
      .maybeSingle();

    if (!sub) {
      return NextResponse.json(
        { ok: false, message: "Submission tidak ditemukan." },
        { status: 404 }
      );
    }

    if (!isStaff && sub.user_id !== user?.id) {
      return NextResponse.json(
        { ok: false, message: "Anda tidak berhak menilai submission ini." },
        { status: 403 }
      );
    }

    const outcome = await scoreSubmission(submissionId);
    return NextResponse.json(outcome, { status: outcome.ok ? 200 : 500 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Terjadi kesalahan saat menilai." },
      { status: 500 }
    );
  }
}
