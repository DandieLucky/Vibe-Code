import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * API admin — membaca & menilai karya.
 *
 * KENAPA LEWAT SERVER:
 * Kunci "anon" yang tertanam di browser tidak dapat dipakai untuk membaca tabel
 * (ditolak "Invalid API key"). Kunci server (service_role) bekerja normal, dan
 * hanya boleh hidup di server — tidak pernah dikirim ke browser.
 *
 * HAK AKSES: hanya admin yang sudah login. Peserta ditolak.
 */
async function pastikanAdmin(): Promise<{ ok: boolean; pesan?: string }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, pesan: "Koneksi database belum siap." };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, pesan: "Anda belum login." };

  // Peran dibaca dari user_roles lewat fungsi is_admin() di database
  const { data, error } = await supabase.rpc("is_admin");
  if (error) {
    const { data: prof } = await supabase
      .from("profiles").select("role").eq("id", user.id).maybeSingle();
    if ((prof as any)?.role !== "admin") {
      return { ok: false, pesan: "Halaman ini hanya untuk administrator." };
    }
    return { ok: true };
  }
  if (data !== true) return { ok: false, pesan: "Halaman ini hanya untuk administrator." };
  return { ok: true };
}

/** Semua karya peserta — dipakai tabel penilaian admin. */
export async function GET() {
  const izin = await pastikanAdmin();
  if (!izin.ok) return NextResponse.json({ error: izin.pesan }, { status: 403 });

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Kunci server belum terpasang." }, { status: 503 });
  }

  const { data, error } = await admin
    .from("work_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ karya: data ?? [] });
}

/**
 * Menyimpan penilaian admin. Skor akhir dihitung dari komponen, supaya
 * tabel admin dan papan peringkat selalu menunjukkan angka yang sama.
 */
export async function PATCH(req: NextRequest) {
  const izin = await pastikanAdmin();
  if (!izin.ok) return NextResponse.json({ error: izin.pesan }, { status: 403 });

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Kunci server belum terpasang." }, { status: 503 });
  }

  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Data yang dikirim tidak valid." }, { status: 400 });
  }

  const { id } = body;
  if (!id) return NextResponse.json({ error: "ID karya wajib diisi." }, { status: 400 });

  // Ambil nilai lama — supaya hasil penilaian otomatis tidak hilang
  const { data: lama } = await admin
    .from("work_submissions")
    .select("technical_score, ai_score, penalty_applied, score")
    .eq("id", id)
    .single();

  const angka = (v: unknown, bawaan: number | null) => {
    if (v === undefined || v === null || v === "") return bawaan;
    const n = Number(v);
    return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : bawaan;
  };

  const technical = angka(body.technical_score, (lama as any)?.technical_score ?? null);
  const ai = angka(body.ai_score, (lama as any)?.ai_score ?? null);
  const penalti = angka(body.penalty_applied, (lama as any)?.penalty_applied ?? 0) ?? 0;

  // Skor akhir: 40% teknis + 60% AI − penalti (bobot yang sama dengan papan peringkat)
  let skorAkhir: number | null = null;
  if (technical !== null || ai !== null) {
    skorAkhir = Math.max(0, Math.round(((technical ?? 0) * 0.4 + (ai ?? 0) * 0.6) - penalti));
  }

  const ubah: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
    technical_score: technical,
    ai_score: ai,
    penalty_applied: penalti,
    final_score: skorAkhir,
    score: skorAkhir,
    is_manual_review: true,
  };
  if (body.submission_status) ubah.submission_status = body.submission_status;
  if (body.admin_notes !== undefined) ubah.admin_notes = body.admin_notes;
  if (body.penalty_reason !== undefined) ubah.penalty_reason = body.penalty_reason;

  const { data, error } = await admin
    .from("work_submissions").update(ubah).eq("id", id).select("*").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ sukses: true, karya: data });
}
