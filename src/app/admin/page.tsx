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
import { SubmissionStatusBadge } from "@/components/submission/submission-status-badge";
import { formatDate } from "@/lib/utils";

// Seed sample demo submissions if storage empty
const INITIAL_DEMO_SUBMISSIONS: WorkSubmission[] = [
  {
    id: "sub-101",
    user_id: "user-1",
    full_name: "Ahmad Fauzi",
    email: "ahmad.fauzi@gmail.com",
    whatsapp: "081288990011",
    institution: "SMKN 1 Yogyakarta",
    project_title: "Katalog UMKM Batik & Tenun Jogja",
    project_description: "Katalog produk batik tulis dan lurik khas Yogyakarta dengan pemesanan WhatsApp otomatis dan database Supabase.",
    completed_modules: ["Modul 1 s/d Modul 7"],
    github_url: "https://github.com/ahmadfauzi/katalog-batik-jogja",
    deployment_url: "https://katalog-batik-jogja.vercel.app",
    screenshot_url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
    submission_status: "pending",
    score: undefined,
    admin_notes: "Menunggu peninjauan fasilitator.",
    submitted_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "sub-102",
    user_id: "user-2",
    full_name: "Siti Rahmawati",
    email: "siti.rahma@student.ac.id",
    whatsapp: "085677889900",
    institution: "Universitas Gadjah Mada",
    project_title: "Katalog Digital Sambal & Kuliner Nusantara",
    project_description: "Aplikasi e-katalog untuk aneka olahan sambal kemasan rumahan dengan filter kategori dan login admin.",
    completed_modules: ["Modul 1 s/d Modul 11"],
    github_url: "https://github.com/sitirahma/katalog-sambal-nusantara",
    deployment_url: "https://katalog-sambal-nusantara.vercel.app",
    screenshot_url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600",
    submission_status: "accepted",
    score: 95,
    admin_notes: "Luar biasa! Fitur US-01 sampai US-06 berfungsi mulus, desain sangat responsif dan rapi.",
    submitted_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "sub-103",
    user_id: "user-3",
    full_name: "Dedi Prasetyo",
    email: "dedi.prasetyo@umkm.id",
    whatsapp: "081900112233",
    institution: "Paguyuban Pengrajin Rotan Jepara",
    project_title: "Katalog Furnitur & Kerajinan Anyaman",
    project_description: "Katalog produk kerajinan tangan ekspor dengan rute dinamis dan WhatsApp ordering.",
    completed_modules: ["Modul 1 s/d Modul 7"],
    github_url: "https://github.com/dedipras/katalog-rotan-jepara",
    deployment_url: "https://katalog-rotan-jepara.vercel.app",
    screenshot_url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600",
    submission_status: "revision_needed",
    score: 75,
    admin_notes: "Link WhatsApp belum mencantumkan nama produk otomatis di query URL. Mohon periksa komponen TombolWhatsApp.jsx.",
    submitted_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function AdminOverviewPage() {
  const [submissions, setSubmissions] = useState<WorkSubmission[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vibe_all_submissions");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) {
          setSubmissions(parsed);
          return;
        }
      }
      // Populate initial demo seed
      localStorage.setItem("vibe_all_submissions", JSON.stringify(INITIAL_DEMO_SUBMISSIONS));
      setSubmissions(INITIAL_DEMO_SUBMISSIONS);
    } catch (e) {
      console.error(e);
      setSubmissions(INITIAL_DEMO_SUBMISSIONS);
    }
  }, []);

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
