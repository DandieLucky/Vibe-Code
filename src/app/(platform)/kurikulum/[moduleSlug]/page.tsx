import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Clock,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCurriculumModules } from "@/lib/data-access/curriculum";

export const dynamic = "force-dynamic";

interface ModulePageProps {
  params: Promise<{ moduleSlug: string }>;
}

function getStageLabel(moduleNumber: number): string {
  if (moduleNumber <= 4) return "Tahap 1 — Fondasi & UI Dasar";
  if (moduleNumber <= 8) return "Tahap 2 — State, Navigasi & Interaksi";
  return "Tahap 3 — Persistensi Data & Rilis";
}

export default async function ModuleDetailPage({ params }: ModulePageProps) {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=" + encodeURIComponent("/kurikulum"));
  }

  const modules = await getCurriculumModules({ includeUnpublished: false });
  const { moduleSlug } = await params;
  const currentModule = modules.find((m) => m.slug === moduleSlug);

  if (!currentModule) {
    notFound();
  }

  const currentIndex = modules.findIndex((m) => m.id === currentModule.id);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  const stageLabel = getStageLabel(currentModule.module_number);

  return (
    <div className="bg-paper min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-5 flex-wrap">
          <Link href="/beranda" className="hover:text-ink">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/kurikulum" className="hover:text-ink">
            Kurikulum
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-ink truncate">
            Modul {currentModule.module_number}
          </span>
        </nav>

        {/* Clean Cobalt Module Header */}
        <header className="rounded-2xl border border-rule bg-sheet overflow-hidden mb-8">
          <div className="px-6 py-3.5 bg-paper-2 border-b border-rule flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-accent-soft text-accent border border-rule">
                Modul {currentModule.module_number} dari {modules.length}
              </span>
              <Badge
                variant={
                  currentModule.difficulty_level === "Pemula"
                    ? "success"
                    : currentModule.difficulty_level === "Menengah"
                    ? "info"
                    : "warning"
                }
              >
                {currentModule.difficulty_level}
              </Badge>
            </div>
            <span className="text-xs text-muted font-medium">{stageLabel}</span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight leading-snug">
                {currentModule.title}
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-ink-2 leading-relaxed">
                {currentModule.description}
              </p>
            </div>

            {currentModule.lessons.length > 0 && (
              <Link
                href={`/kurikulum/${currentModule.slug}/${currentModule.lessons[0].slug}`}
                className="shrink-0"
              >
                <Button variant="accent" size="md" className="font-bold">
                  Mulai Materi Pertama
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            )}
          </div>
        </header>

        {/* 2-Column Content: Lessons List Left + Sticky Summary Right */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 lg:items-start">
          {/* Lessons List */}
          <div className="space-y-4 mb-10 lg:mb-0">
            <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <span>Daftar Materi Pembelajaran ({currentModule.lessons.length})</span>
            </h2>

            <div className="rounded-2xl border border-rule bg-sheet overflow-hidden divide-y divide-rule">
              {currentModule.lessons.map((lesson, idx) => (
                <Link
                  key={lesson.id}
                  href={`/kurikulum/${currentModule.slug}/${lesson.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-paper transition-colors gap-3"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span className="flex items-center justify-center h-7 w-7 rounded-full bg-paper-2 border border-rule text-ink font-bold text-xs shrink-0 mt-0.5 group-hover:bg-accent group-hover:text-sheet group-hover:border-accent transition-colors">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-accent transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-2 mt-1 line-clamp-2 leading-relaxed">
                        {lesson.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          ±{lesson.estimated_minutes} menit
                        </span>
                        {lesson.antigravity_prompt && (
                          <span className="inline-flex items-center gap-1 text-accent font-medium">
                            <Sparkles className="w-3.5 h-3.5" />
                            Prompt AI 6-Bagian
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent shrink-0 self-end sm:self-center">
                    <span>Buka Materi</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Sticky Module Summary Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-rule bg-sheet p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-ink">
                <Layers className="w-4 h-4 text-accent" />
                <span>Ringkasan Modul</span>
              </div>

              <dl className="divide-y divide-rule text-xs">
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <dt className="text-muted">Tahap</dt>
                  <dd className="font-semibold text-ink text-right">{stageLabel.split(" — ")[0]}</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <dt className="text-muted">Jumlah Materi</dt>
                  <dd className="font-semibold text-ink">{currentModule.lessons.length} materi praktik</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <dt className="text-muted">Estimasi Waktu</dt>
                  <dd className="font-semibold text-ink">±{currentModule.estimated_minutes} menit</dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <dt className="text-muted">Tingkat</dt>
                  <dd className="font-semibold text-ink">{currentModule.difficulty_level}</dd>
                </div>
              </dl>

              <Link href="/kurikulum" className="block">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Lihat Semua {modules.length} Modul
                </Button>
              </Link>
            </div>
          </aside>
        </div>

        {/* Previous / Next Module Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-10 border-t border-rule">
          {prevModule ? (
            <Link href={`/kurikulum/${prevModule.slug}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Modul {prevModule.module_number}</span>
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {nextModule ? (
            <Link href={`/kurikulum/${nextModule.slug}`}>
              <Button variant="accent" size="sm" className="gap-2 font-bold">
                <span>Modul Selanjutnya: Modul {nextModule.module_number}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Link href="/kumpulan-karya">
              <Button variant="teal" size="sm" className="gap-2 font-bold">
                <span>Kumpulkan Karya Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
