"use client";

import { LoginGate } from "@/components/auth/login-gate";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  BookOpen,
  CheckCircle2,
  Clock,
  Bookmark,
  StickyNote,
  Award,
  ArrowRight,
  Sparkles,
  Layers,
  UploadCloud,
  FileCheck2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MODULES_DATA } from "@/lib/data/curriculum-data";
import { SubmissionStatusBadge } from "@/components/submission/submission-status-badge";
import { WorkSubmission } from "@/types/database";
import {
  loadProgress,
  migrateLocalProgressToSupabase,
} from "@/lib/data-access/progress";
import { loadMySubmission } from "@/lib/data-access/submissions";

function DashboardPesertaInner() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>([]);
  const [notesList, setNotesList] = useState<{ lessonId: string; note: string; lessonTitle: string }[]>([]);
  const [userSubmission, setUserSubmission] = useState<WorkSubmission | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ full_name: string } | null>(null);

  const totalLessons = MODULES_DATA.reduce((acc, m) => acc + m.lessons.length, 0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // 1. Pindahkan progres yang tersimpan di browser ke database (sekali, best-effort)
        await migrateLocalProgressToSupabase().catch(() => null);

        // 2. Muat progres dari Supabase (fallback otomatis ke localStorage bila belum login)
        const snapshot = await loadProgress();
        if (cancelled) return;

        setCompletedLessons(snapshot.completedLessonIds);
        setBookmarkedLessons(snapshot.bookmarkedLessonIds);
        setIsDemoMode(snapshot.source === "local");

        // Nama peserta untuk header
        try {
          const { createClient } = await import("@/lib/supabase/client");
          const sb = createClient();
          if (sb) {
            const { data: authData } = await sb.auth.getUser();
            if (authData.user) {
              const { data: prof } = await sb
                .from("profiles")
                .select("full_name")
                .eq("id", authData.user.id)
                .single();
              if (!cancelled && prof?.full_name) setCurrentUser({ full_name: prof.full_name });
            }
          }
        } catch {
          /* nama opsional */
        }

        // 3. Susun daftar catatan dengan judul pelajaran yang sesuai
        const collected: { lessonId: string; note: string; lessonTitle: string }[] = [];
        for (const [lessonId, note] of Object.entries(snapshot.notes)) {
          if (!note.trim()) continue;
          let title = "Materi";
          for (const m of MODULES_DATA) {
            const found = m.lessons.find((l) => l.id === lessonId);
            if (found) {
              title = `${m.module_number}.${found.lesson_number} ${found.title}`;
              break;
            }
          }
          collected.push({ lessonId, note, lessonTitle: title });
        }
        setNotesList(collected);

        // 4. Muat submission milik peserta
        const sub = await loadMySubmission();
        if (cancelled) return;
        if (sub) {
          setUserSubmission({
            id: sub.id,
            user_id: sub.user_id,
            full_name: "",
            email: "",
            whatsapp: "",
            institution: "",
            project_title: sub.project_title,
            project_description: sub.project_description,
            completed_modules: [],
            github_url: sub.github_url,
            deployment_url: sub.deployment_url,
            submission_status: sub.submission_status,
            admin_notes: sub.ai_summary ?? undefined,
            submitted_at: sub.submitted_at,
          } as unknown as WorkSubmission);
        }
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const totalCompleted = completedLessons.length;
  const progressPercent = Math.min(100, Math.round((totalCompleted / totalLessons) * 100));

  // Determine last opened lesson or next lesson to study
  let nextLessonToStudy = null;
  for (const m of MODULES_DATA) {
    for (const l of m.lessons) {
      if (!completedLessons.includes(l.id)) {
        nextLessonToStudy = { module: m, lesson: l };
        break;
      }
    }
    if (nextLessonToStudy) break;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-800">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800">Dashboard Peserta</span>
        </div>

        {/* Demo Mode Notice Banner */}
        {isDemoMode && (
          <div className="mb-6 rounded-xl border border-sky-200 bg-sky-50/70 p-4 text-xs text-sky-900 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span>
                <strong>Mode Demonstrasi:</strong> Progres belajar Anda tersimpan di browser ini saja.
                Login agar progres tersimpan permanen dan tidak hilang saat berganti perangkat atau
                membersihkan cache.
              </span>
            </div>
            <Link href="/login">
              <Button size="sm" variant="accent" className="text-xs py-1 px-3">
                Login / Buat Akun
              </Button>
            </Link>
          </div>
        )}

        {/* User Profile Header Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentUser?.full_name ?? "Peserta Belajar Vibe Code"}
                </h1>
                <Badge variant="teal" className="text-[10px]">
                  Siswa Aktif
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Program Pelatihan Web Development Terintegrasi Google Antigravity & Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/profil">
              <Button variant="outline" size="sm">
                Pengaturan Profil
              </Button>
            </Link>
            <Link href="/kumpulan-karya">
              <Button variant="accent" size="sm" className="font-bold">
                <UploadCloud className="w-4 h-4 mr-1.5" />
                Kumpulkan Karya
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Modul
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              12 Modul
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Kurikulum Terstandar</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Materi Selesai
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 mt-1">
              {totalCompleted} <span className="text-sm text-slate-400 font-normal">/ {totalLessons}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Praktik Tuntas</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Persentase Progres
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 mt-1">
              {progressPercent}%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Kelulusan Kurikulum</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Status Karya
            </span>
            <div className="mt-2">
              {userSubmission ? (
                <SubmissionStatusBadge status={userSubmission.submission_status} />
              ) : (
                <span className="text-xs font-semibold text-slate-500">
                  Belum Dikumpulkan
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Evaluasi Fasilitator</p>
          </div>
        </div>

        {/* Next Lesson Recommendation Card */}
        {nextLessonToStudy && (
          <div className="rounded-2xl border-2 border-sky-300 bg-gradient-to-r from-sky-50 via-white to-white p-6 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Rekomendasi Materi Selanjutnya</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Modul {nextLessonToStudy.module.module_number}.{nextLessonToStudy.lesson.lesson_number}: {nextLessonToStudy.lesson.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {nextLessonToStudy.lesson.description}
              </p>
            </div>
            <Link
              href={`/kurikulum/${nextLessonToStudy.module.slug}/${nextLessonToStudy.lesson.slug}`}
              className="shrink-0"
            >
              <Button variant="accent" size="md" className="font-bold shadow-sm">
                Lanjutkan Belajar &rarr;
              </Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Module Progress Breakdown */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-600" />
                <span>Rincian Progres Per Modul</span>
              </h2>

              <div className="space-y-4">
                {MODULES_DATA.map((module) => {
                  const doneInMod = module.lessons.filter((l) =>
                    completedLessons.includes(l.id)
                  ).length;
                  const modPct = Math.round((doneInMod / module.lessons.length) * 100);

                  return (
                    <div
                      key={module.id}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Link
                          href={`/kurikulum/${module.slug}`}
                          className="text-xs sm:text-sm font-bold text-slate-800 hover:text-sky-600 transition-colors"
                        >
                          Modul {module.module_number}: {module.title}
                        </Link>
                        <span className="font-mono text-xs font-semibold text-slate-600">
                          {doneInMod}/{module.lessons.length} ({modPct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-sky-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${modPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Bookmarks & Personal Notes */}
          <div className="lg:col-span-4 space-y-6">
            {/* Submission Status Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Pengumpulan Karya Anda</span>
              </h3>
              {userSubmission ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400">Judul Proyek:</span>
                    <p className="font-bold text-slate-800">{userSubmission.project_title}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Status Penilaian:</span>
                    <div className="mt-1">
                      <SubmissionStatusBadge status={userSubmission.submission_status} />
                    </div>
                  </div>
                  {userSubmission.admin_notes && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                      <strong>Catatan Admin:</strong>
                      <p className="mt-0.5">{userSubmission.admin_notes}</p>
                    </div>
                  )}
                  <Link href="/kumpulan-karya" className="block pt-2">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Lihat Detail Pengumpulan
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Anda belum mengumpulkan hasil karya aplikasi katalog UMKM.
                  </p>
                  <Link href="/kumpulan-karya" className="block">
                    <Button variant="accent" size="sm" className="w-full font-bold">
                      Isi Formulir Karya
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Bookmarks Widget */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500" />
                <span>Materi Disimpan ({bookmarkedLessons.length})</span>
              </h3>
              {bookmarkedLessons.length > 0 ? (
                <div className="space-y-2">
                  {bookmarkedLessons.map((lId) => {
                    let title = "Materi";
                    let link = "/kurikulum";
                    for (const m of MODULES_DATA) {
                      const l = m.lessons.find((item) => item.id === lId);
                      if (l) {
                        title = l.title;
                        link = `/kurikulum/${m.slug}/${l.slug}`;
                        break;
                      }
                    }
                    return (
                      <Link
                        key={lId}
                        href={link}
                        className="block p-2.5 rounded-lg bg-slate-50 hover:bg-sky-50 text-xs font-medium text-slate-800 hover:text-sky-700 transition-colors border border-slate-100"
                      >
                        {title}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Belum ada materi yang ditandai bookmark.
                </p>
              )}
            </div>

            {/* Personal Notes Widget */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-teal-600" />
                <span>Catatan Pribadi ({notesList.length})</span>
              </h3>
              {notesList.length > 0 ? (
                <div className="space-y-2.5 max-h-64 overflow-y-auto">
                  {notesList.map((n, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="font-bold text-slate-800">{n.lessonTitle}</div>
                      <p className="text-slate-600 line-clamp-2">{n.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Belum ada catatan pribadi yang ditulis.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Dashboard peserta — hanya untuk yang sudah login.
 * Pengunjung yang belum punya akun diarahkan ke halaman pendaftaran.
 */
export default function DashboardPesertaPage() {
  return (
    <LoginGate feature="dashboard peserta">
      <DashboardPesertaInner />
    </LoginGate>
  );
}
