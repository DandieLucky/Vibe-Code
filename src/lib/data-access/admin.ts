
// ============================================================================
// Fungsi khusus admin — membaca data seluruh peserta dari database.
// Dipakai dashboard admin supaya angkanya nyata, bukan data contoh.
// ============================================================================

import { createClient } from "@/lib/supabase/client";
import type { WorkSubmission } from "@/types/database";

/** Ringkasan tiap peserta: progres belajar + status pengumpulan karya. */
export interface RingkasanPeserta {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
  jumlah_pelajaran_selesai: number;
  sudah_kumpul: boolean;
  skor_akhir: number | null;
  submission_code: string | null;
  github_url: string | null;
  deployment_url: string | null;
  submitted_at: string | null;
}

/** Semua karya yang sudah dikumpulkan (untuk dashboard admin). */
export async function ambilSemuaKarya(): Promise<WorkSubmission[]> {
  const sb = createClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from("work_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) { console.error("ambilSemuaKarya:", error.message); return []; }
  return (data ?? []) as WorkSubmission[];
}

/** Progres belajar semua peserta + status karya mereka, dari view database. */
export async function ambilRingkasanPeserta(): Promise<RingkasanPeserta[]> {
  const sb = createClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from("v_ringkasan_peserta")
    .select("*")
    .order("jumlah_pelajaran_selesai", { ascending: false });
  if (error) { console.error("ambilRingkasanPeserta:", error.message); return []; }
  return (data ?? []) as RingkasanPeserta[];
}

/** Hitung sebaran status karya — dipakai kartu ringkasan. */
export async function ambilStatistikKarya() {
  const karya = await ambilSemuaKarya();
  const peserta = await ambilRingkasanPeserta();

  const hitung = (s: string) => karya.filter((k) => k.submission_status === s).length;
  const skor = karya.map((k) => k.score).filter((s): s is number => typeof s === "number");
  const rataRata = skor.length > 0 ? Math.round(skor.reduce((a, b) => a + b, 0) / skor.length) : null;

  return {
    totalPeserta: peserta.length,
    totalKarya: karya.length,
    menunggu: hitung("pending"),
    diterima: hitung("accepted"),
    perluRevisi: hitung("revision_needed"),
    ditolak: hitung("rejected"),
    rataRataSkor: rataRata,
    tertinggi: skor.length > 0 ? Math.max(...skor) : null,
    sudahKumpul: peserta.filter((p) => p.sudah_kumpul).length,
    belumKumpul: peserta.filter((p) => !p.sudah_kumpul).length,
  };
}


/**
 * Simpan keputusan admin (status, skor, catatan) untuk satu karya.
 * Langsung ke database supaya ketiga admin melihat hasil yang sama.
 */
export async function simpanPenilaian(
  submissionId: string,
  data: { status: string; skor: number | null; catatan: string }
): Promise<{ sukses: boolean; pesan?: string }> {
  const sb = createClient();
  if (!sb) return { sukses: false, pesan: "Koneksi database belum siap." };

  const { error } = await sb
    .from("work_submissions")
    .update({
      submission_status: data.status,
      score: data.skor,
      admin_notes: data.catatan,
      updated_at: new Date().toISOString(),
    })
    .eq("id", submissionId);

  if (error) {
    console.error("simpanPenilaian:", error.message);
    return { sukses: false, pesan: error.message };
  }
  return { sukses: true };
}
