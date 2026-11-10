"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  FolderGit2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileSpreadsheet,
  Sheet,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MODULES_DATA } from "@/lib/data/curriculum-data";
import { WorkSubmission } from "@/types/database";
import { ambilSemuaKarya, ambilRingkasanPeserta, ambilStatistikKarya, type RingkasanPeserta } from "@/lib/data-access/admin";
import { SubmissionStatusBadge } from "@/components/submission/submission-status-badge";
import { formatDate } from "@/lib/utils";

export default function AdminOverviewPage() {
  const [submissions, setSubmissions] = useState<WorkSubmission[]>([]);
  const [peserta, setPeserta] = useState<RingkasanPeserta[]>([]);
  const [statistik, setStatistik] = useState<{
    totalPeserta: number; totalKarya: number; menunggu: number; diterima: number;
    perluRevisi: number; ditolak: number; rataRataSkor: number | null;
    tertinggi: number | null; sudahKumpul: number; belumKumpul: number;
  } | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState<string | null>(null);

  // ------------------------------------------------------------------
  // Dashboard admin membaca DATABASE, bukan data contoh.
  // Angka di layar harus selalu sama dengan isi database.
  // ------------------------------------------------------------------
  const muatData = React.useCallback(async () => {
    setMemuat(true);
    setGalat(null);
    try {
      const [karya, ringkasan, stat] = await Promise.all([
        ambilSemuaKarya(),
        ambilRingkasanPeserta(),
        ambilStatistikKarya(),
      ]);
      setSubmissions(karya);
      setPeserta(ringkasan);
      setStatistik(stat);
    } catch (e) {
      setGalat(e instanceof Error ? e.message : "Gagal memuat data dari database.");
    } finally {
      setMemuat(false);
    }
  }, []);

  useEffect(() => { muatData(); }, [muatData]);

  const totalModules = MODULES_DATA.length;
  const totalLessons = MODULES_DATA.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalSubmissions = submissions.length;

  const countPending = submissions.filter((s) => s.submission_status === "pending").length;
  const countAccepted = submissions.filter((s) => s.submission_status === "accepted").length;
  const countRevision = submissions.filter((s) => s.submission_status === "revision_needed").length;
  const countRejected = submissions.filter((s) => s.submission_status === "rejected").length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
              ADMINISTRATOR DASHBOARD
            </span>
            <Badge variant="teal">Sistem Aktif</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ringkasan Platform & Penilaian Karya
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau metrik peserta, kurikulum 12 modul, antrean review karya, dan sinkronisasi data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/export">
            <Button variant="outline" size="sm" className="gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Ekspor Excel</span>
            </Button>
          </Link>
          <Link href="/admin/submissions">
            <Button variant="accent" size="sm" className="gap-2 font-bold shadow-sm">
              <FolderGit2 className="w-4 h-4" />
              <span>Periksa Antrean Karya ({countPending})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 8 Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Karya</span>
            <FolderGit2 className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {totalSubmissions}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Dikumpulkan Siswa</p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-xs">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Menunggu Review</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-800">
            {countPending}
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-1">Perlu Pemeriksaan Segera</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Karya Diterima</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800">
            {countAccepted}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Lulus Kriteria US-01 s/d US-06</p>
        </div>

        <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-5 shadow-xs">
          <div className="flex items-center justify-between text-orange-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Perlu Revisi</span>
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-800">
            {countRevision}
          </div>
          <p className="text-[11px] text-orange-600 font-medium mt-1">Diberi Catatan Perbaikan</p>
        </div>
      </div>

      {/* Curriculum Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Modul Kurikulum
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              {totalModules} Modul
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Dari Setup hingga Deployment</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
            <BookOpen className="w-6 h-6 text-sky-600" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Materi Praktik
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-sky-600 mt-1">
              {totalLessons} Materi
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Substantif & Terstruktur</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-700 font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Prompt AI Antigravity
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-teal-600 mt-1">
              100% Siap Salin
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Formula 6-Bagian Anti-Gagal</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Activity Bar Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Visualisasi Status Pengumpulan Karya
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Komposisi persentase kelulusan dan peninjauan karya peserta
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600">
            Total {totalSubmissions} Karya Terkumpul
          </span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden flex mb-4">
          <div
            style={{ width: `${(countAccepted / (totalSubmissions || 1)) * 100}%` }}
            className="bg-emerald-500 transition-all duration-500"
            title={`Diterima: ${countAccepted}`}
          />
          <div
            style={{ width: `${(countPending / (totalSubmissions || 1)) * 100}%` }}
            className="bg-amber-400 transition-all duration-500"
            title={`Menunggu: ${countPending}`}
          />
          <div
            style={{ width: `${(countRevision / (totalSubmissions || 1)) * 100}%` }}
            className="bg-orange-500 transition-all duration-500"
            title={`Perlu Revisi: ${countRevision}`}
          />
          <div
            style={{ width: `${(countRejected / (totalSubmissions || 1)) * 100}%` }}
            className="bg-rose-500 transition-all duration-500"
            title={`Ditolak: ${countRejected}`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
            <span>Diterima (Lulus): <strong>{countAccepted}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-400"></span>
            <span>Menunggu Review: <strong>{countPending}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-500"></span>
            <span>Perlu Revisi: <strong>{countRevision}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500"></span>
            <span>Ditolak: <strong>{countRejected}</strong></span>
          </div>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        {/* ----------------------------------------------------------- */}
        {/* Progres belajar seluruh peserta — dari database, bukan contoh */}
        {/* ----------------------------------------------------------- */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Progres Peserta</h2>
            <p className="text-xs text-slate-500">
              {statistik
                ? `${statistik.sudahKumpul} sudah mengumpulkan karya, ${statistik.belumKumpul} belum`
                : "Memuat data peserta..."}
            </p>
          </div>
          <Button variant="outline" size="sm" className="text-xs gap-2" onClick={muatData} disabled={memuat}>
            <RefreshCw className={`w-3.5 h-3.5 ${memuat ? "animate-spin" : ""}`} />
            Muat Ulang
          </Button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs mb-8">
          {galat && (
            <div className="p-4 bg-red-50 border-b border-red-200">
              <p className="text-xs font-bold text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Gagal memuat data: {galat}
              </p>
            </div>
          )}

          {memuat ? (
            <div className="p-10 text-center text-sm text-slate-400">Memuat data peserta...</div>
          ) : peserta.length === 0 ? (
            <div className="p-10 text-center">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700 mb-1">Belum ada peserta terdaftar</p>
              <p className="text-xs text-slate-500">
                Peserta akan muncul di sini setelah mereka mendaftar di halaman /register.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Peserta</th>
                    <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-center">Materi Selesai</th>
                    <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-center">Status Karya</th>
                    <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-center">Skor</th>
                    <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Waktu Kumpul</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {peserta.map((pp) => {
                    const persenMateri = Math.min(100, Math.round((pp.jumlah_pelajaran_selesai / totalLessons) * 100));
                    return (
                      <tr key={pp.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                              {(pp.full_name || pp.email || "?").charAt(0).toUpperCase()}
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate">{pp.full_name || "(belum diisi)"}</p>
                              <p className="text-[10px] text-slate-500 truncate">{pp.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2 justify-center">
                            <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-sky-500 rounded-full" style={{ width: `${persenMateri}%` }} />
                            </div>
                            <span className="text-[11px] font-bold text-slate-600 tabular-nums">
                              {pp.jumlah_pelajaran_selesai}/{totalLessons}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {pp.sudah_kumpul ? (
                            <Badge variant="teal" className="text-[10px]">Sudah Kumpul</Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] text-slate-500">Belum Kumpul</Badge>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {typeof pp.skor_akhir === "number" ? (
                            <span className={`text-sm font-extrabold tabular-nums ${
                              pp.skor_akhir >= 85 ? "text-emerald-600" : pp.skor_akhir >= 70 ? "text-sky-600" : "text-amber-600"
                            }`}>{pp.skor_akhir}</span>
                          ) : (
                            <span className="text-xs text-slate-300">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[11px] text-slate-500">
                            {pp.submitted_at ? formatDate(pp.submitted_at) : "—"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Pengumpulan Karya Terbaru
            </h2>
            <p className="text-xs text-slate-500">
              Daftar kiriman karya peserta yang siap ditinjau dan dinilai
            </p>
          </div>
          <Link href="/admin/submissions">
            <Button variant="outline" size="sm" className="text-xs">
              Lihat Seluruh Karya &rarr;
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px] bg-slate-50/75">
                <th className="py-3 px-4 font-semibold">Peserta</th>
                <th className="py-3 px-4 font-semibold">Institusi</th>
                <th className="py-3 px-4 font-semibold">Judul Proyek</th>
                <th className="py-3 px-4 font-semibold">Tautan Proyek</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.slice(0, 5).map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{sub.full_name}</div>
                    <div className="text-[11px] text-slate-400">{sub.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {sub.institution}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 max-w-[200px] truncate">
                    {sub.project_title}
                  </td>
                  <td className="py-3.5 px-4 space-y-1">
                    <a
                      href={sub.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={sub.deployment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>Vercel Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3.5 px-4">
                    <SubmissionStatusBadge status={sub.submission_status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/admin/submissions?id=${sub.id}`}>
                      <Button variant="outline" size="sm" className="text-xs">
                        Review & Nilai
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
