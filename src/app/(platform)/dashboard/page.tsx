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
  Rocket,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MODULES_DATA, type FullModule } from "@/lib/data/curriculum-data";
import { SubmissionStatusBadge } from "@/components/submission/submission-status-badge";
import { WorkSubmission } from "@/types/database";
import {
  loadProgress,
  migrateLocalProgressToSupabase,
} from "@/lib/data-access/progress";
import { loadMySubmission } from "@/lib/data-access/submissions";

function DashboardPesertaInner() {
  const [modules, setModules] = useState<FullModule[]>(MODULES_DATA);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>([]);
  const [notesList, setNotesList] = useState<{ lessonId: string; note: string; lessonTitle: string }[]>([]);
  const [userSubmission, setUserSubmission] = useState<WorkSubmission | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ full_name: string } | null>(null);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        let activeModules = MODULES_DATA;
        try {
          const modRes = await fetch("/api/curriculum");
          if (modRes.ok) {
            const modJson = await modRes.json();
            if (Array.isArray(modJson?.modules) && modJson.modules.length > 0) {
              activeModules = modJson.modules;
              if (!cancelled) setModules(activeModules);
            }
          }
        } catch {
          /* gunakan MODULES_DATA */
        }
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
          for (const m of modules) {
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
  const progressPercent = totalLessons > 0 ? Math.min(100, Math.round((totalCompleted / totalLessons) * 100)) : 0;

  // Determine last opened lesson or next lesson to study
  let nextLessonToStudy = null;
  for (const m of modules) {
    for (const l of m.lessons) {
      if (!completedLessons.includes(l.id)) {
        nextLessonToStudy = { module: m, lesson: l };
        break;
      }
    }
    if (nextLessonToStudy) break;
  }

  return (
    <div className="bg-paper min-h-screen">
      {/* Pintasan tutorial */}
      <div className="bg-ink text-sheet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-sm font-bold flex items-center gap-2">
              <Rocket className="w-4 h-4 text-accent-2" />
              Ikuti tutorial langkah demi langkah, lengkap dengan panduan hasil
            </p>
            <div className="flex gap-2">
              <Link href="/tutorial/persiapan">
                <Button size="sm" variant="outline" className="border-umber bg-umber text-sheet hover:bg-ink font-semibold">
                  Persiapan
                </Button>
              </Link>
              <Link href="/tutorial/development">
                <Button size="sm" variant="accent" className="font-bold">
                  Development
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted mb-4">
            <Link href="/beranda" className="hover:text-ink">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-ink">Dashboard Peserta</span>
          </div>

          {/* Demo Mode Notice Banner */}
          {isDemoMode && (
            <div className="mb-6 rounded-xl border border-rule bg-paper-2 p-4 text-xs text-ink flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
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
          <div className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-accent text-sheet flex items-center justify-center font-bold text-2xl shadow-sm">
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-ink">
                    {currentUser?.full_name ?? "Peserta ComposeLab"}
                  </h1>
                  <Badge variant="teal" className="text-[10px]">
                    Peserta Aktif
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-ink-2 mt-1">
                  Program Pembelajaran Pemrograman Terstruktur &amp; AI Prompting
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
            <div className="rounded-2xl border border-rule bg-sheet p-5 shadow-2xs">
              <span className="text-xs font-bold text-muted">
                Total Modul
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-ink mt-1">
                {modules.length} Modul
              </div>
              <p className="text-[11px] text-muted mt-1">Kurikulum Terstruktur</p>
            </div>

            <div className="rounded-2xl border border-rule bg-sheet p-5 shadow-2xs">
              <span className="text-xs font-bold text-muted">
                Materi Selesai
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-accent mt-1">
                {totalCompleted} <span className="text-sm text-muted font-normal">/ {totalLessons}</span>
              </div>
              <p className="text-[11px] text-muted mt-1">Praktik Tuntas</p>
            </div>

            <div className="rounded-2xl border border-rule bg-sheet p-5 shadow-2xs">
              <span className="text-xs font-bold text-muted">
                Persentase Progres
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">
                {progressPercent}%
              </div>
              <p className="text-[11px] text-muted mt-1">Kelulusan Kurikulum</p>
            </div>

            <div className="rounded-2xl border border-rule bg-sheet p-5 shadow-2xs">
              <span className="text-xs font-bold text-muted">
                Status Karya
              </span>
              <div className="mt-2">
                {userSubmission ? (
                  <SubmissionStatusBadge status={userSubmission.submission_status} />
                ) : (
                  <span className="text-xs font-semibold text-muted">
                    Belum Dikumpulkan
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted mt-1">Evaluasi Fasilitator</p>
            </div>
          </div>

          {/* Next Lesson Recommendation Card */}
          {nextLessonToStudy && (
            <div className="rounded-2xl border-2 border-rule bg-paper-2 p-6 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>Rekomendasi Materi: Modul {nextLessonToStudy.module.module_number}.{nextLessonToStudy.lesson.lesson_number} {nextLessonToStudy.lesson.title}</span>
                </h2>
                <p className="text-xs text-ink-2 mt-1 line-clamp-1">
                  {nextLessonToStudy.lesson.description}
                </p>
              </div>
              <Link
                href={`/kurikulum/${nextLessonToStudy.module.slug}/${nextLessonToStudy.lesson.slug}`}
                className="shrink-0"
              >
                <Button variant="accent" size="md" className="font-bold shadow-sm">
                  Lanjutkan Belajar
                </Button>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Module Progress Breakdown */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-2xl border border-rule bg-sheet p-6 shadow-xs">
                <h2 className="text-base font-bold text-ink mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent" />
                  <span>Rincian Progres Per Modul</span>
                </h2>

                <div className="space-y-4">
                  {modules.map((module) => {
                    const doneInMod = module.lessons.filter((l) =>
                      completedLessons.includes(l.id)
                    ).length;
                    const modPct = module.lessons.length > 0 ? Math.round((doneInMod / module.lessons.length) * 100) : 0;

                    return (
                      <div
                        key={module.id}
                        className="p-4 rounded-xl border border-rule bg-paper hover:bg-paper-2 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Link
                            href={`/kurikulum/${module.slug}`}
                            className="text-xs sm:text-sm font-bold text-ink hover:text-accent transition-colors"
                          >
                            Modul {module.module_number}: {module.title}
                          </Link>
                          <span className="font-mono text-xs font-semibold text-ink-2">
                            {doneInMod}/{module.lessons.length} ({modPct}%)
                          </span>
                        </div>
                        <div className="w-full bg-paper-3 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-accent h-1.5 rounded-full transition-colors duration-300"
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
            <div className="rounded-2xl border border-rule bg-sheet p-6 shadow-xs">
              <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Pengumpulan Karya Anda</span>
              </h3>
              {userSubmission ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-muted">Judul Proyek:</span>
                    <p className="font-bold text-ink">{userSubmission.project_title}</p>
                  </div>
                  <div>
                    <span className="text-muted">Status Penilaian:</span>
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
                  <p className="text-xs text-muted leading-relaxed">
                    Anda belum mengumpulkan hasil karya proyek aplikasi Anda.
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
            <div className="rounded-2xl border border-rule bg-sheet p-6 shadow-xs">
              <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500" />
                <span>Materi Disimpan ({bookmarkedLessons.length})</span>
              </h3>
              {bookmarkedLessons.length > 0 ? (
                <div className="space-y-2">
                  {bookmarkedLessons.map((lId) => {
                    let title = "Materi";
                    let link = "/kurikulum";
                    for (const m of modules) {
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
                        className="block p-2.5 rounded-lg bg-paper hover:bg-accent-soft text-xs font-medium text-ink hover:text-accent transition-colors border border-rule"
                      >
                        {title}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-muted">
                  Belum ada materi yang ditandai bookmark.
                </p>
              )}
            </div>

            {/* Personal Notes Widget */}
            <div className="rounded-2xl border border-rule bg-sheet p-6 shadow-xs">
              <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-accent" />
                <span>Catatan Pribadi ({notesList.length})</span>
              </h3>
              {notesList.length > 0 ? (
                <div className="space-y-2.5 max-h-64 overflow-y-auto">
                  {notesList.map((n, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-paper border border-rule text-xs space-y-1">
                      <div className="font-bold text-ink">{n.lessonTitle}</div>
                      <p className="text-ink-2 line-clamp-2">{n.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted">
                  Belum ada catatan pribadi yang ditulis.
                </p>
              )}
            </div>
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
