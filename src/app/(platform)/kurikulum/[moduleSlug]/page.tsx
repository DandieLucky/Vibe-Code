import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MODULES_DATA } from "@/lib/data/curriculum-data";

interface ModulePageProps {
  params: Promise<{ moduleSlug: string }>;
}

export default async function ModuleDetailPage({ params }: ModulePageProps) {
  const { moduleSlug } = await params;
  const module = MODULES_DATA.find((m) => m.slug === moduleSlug);

  if (!module) {
    notFound();
  }

  // Find previous and next module for navigation
  const currentIndex = MODULES_DATA.findIndex((m) => m.id === module.id);
  const prevModule = currentIndex > 0 ? MODULES_DATA[currentIndex - 1] : null;
  const nextModule =
    currentIndex < MODULES_DATA.length - 1 ? MODULES_DATA[currentIndex + 1] : null;

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-800">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/kurikulum" className="hover:text-slate-800">
            Kurikulum
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800 truncate">
            Modul {module.module_number}
          </span>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 text-white p-6 sm:p-8 shadow-md mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
              MODUL {module.module_number} DARI 12
            </span>
            <Badge
              variant={
                module.difficulty_level === "Pemula"
                  ? "success"
                  : module.difficulty_level === "Menengah"
                  ? "info"
                  : "warning"
              }
            >
              {module.difficulty_level}
            </Badge>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              Estimasi: {module.estimated_minutes} Menit
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {module.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {module.description}
          </p>

          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Terdiri atas{" "}
              <strong className="text-white font-bold">{module.lessons.length} materi praktik</strong> terstruktur.
            </div>
            {module.lessons.length > 0 && (
              <Link href={`/kurikulum/${module.slug}/${module.lessons[0].slug}`}>
                <Button variant="accent" size="sm" className="font-bold">
                  Mulai Materi Pertama
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Lessons List in this Module */}
        <div className="space-y-4 mb-10">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <span>Daftar Materi Pembelajaran</span>
          </h2>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs divide-y divide-slate-100">
            {module.lessons.map((lesson, idx) => (
              <Link
                key={lesson.id}
                href={`/kurikulum/${module.slug}/${lesson.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-slate-50 transition-colors gap-3"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <span className="flex items-center justify-center h-7 w-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs shrink-0 mt-0.5 sm:mt-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {lesson.description}
                    </p>
                    {lesson.antigravity_prompt && (
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-sky-600 font-medium">
                        <Sparkles className="w-3 h-3 text-sky-500" />
                        <span>Termasuk Prompt AI Google Antigravity Teruji</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto text-xs">
                  <span className="text-slate-400 font-mono">
                    ±{lesson.estimated_minutes}m
                  </span>
                  <Button variant="outline" size="sm" className="text-xs">
                    Buka Materi &rarr;
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Previous / Next Module Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          {prevModule ? (
            <Link href={`/kurikulum/${prevModule.slug}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Modul Sebelumnya: Modul {prevModule.module_number}</span>
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {nextModule ? (
            <Link href={`/kurikulum/${nextModule.slug}`}>
              <Button variant="accent" size="sm" className="gap-2">
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
