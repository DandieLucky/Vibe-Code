import { NextRequest, NextResponse } from "next/server";
import { scorePendingSubmissions } from "@/lib/scoring/engine";
import { getCurrentUser } from "@/lib/auth";

export const maxDuration = 300;

/**
 * Nilai semua submission berstatus pending/failed.
 * Hanya admin/instructor. Dipakai untuk menilai 100 peserta sekaligus
 * dalam beberapa putaran (masing-masing maksimal 25 submission).
 */
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "admin" && user.role !== "instructor")) {
    return NextResponse.json(
      { ok: false, message: "Hanya admin yang dapat menjalankan penilaian massal." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const limit = Math.min(Math.max(Number(body?.limit) || 10, 1), 25);

    const result = await scorePendingSubmissions(limit);
    return NextResponse.json({ ok: true, ...result });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Gagal menjalankan penilaian massal." },
      { status: 500 }
    );
  }
}
