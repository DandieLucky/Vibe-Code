"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  Circle,
  Search,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GeminiMasterContextCard } from "@/components/lesson/gemini-master-context-card";
import { MODULES_DATA, type FullModule } from "@/lib/data/curriculum-data";

interface LearningStage {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  matches: (moduleNumber: number) => boolean;
}

const LEARNING_STAGES: LearningStage[] = [
  {
    id: "tahap-1",
    tag: "Tahap 1",
    title: "Fondasi & Antarmuka Compose",
    subtitle: "Persiapan Android Studio, dasar Kotlin, Composable, Layout, hingga komponen Material 3.",
    matches: (n) => n <= 4,
  },
  {
    id: "tahap-2",
    tag: "Tahap 2",
    title: "State, Daftar & Navigasi Multi-Layar",
    subtitle: "Mengelola state, daftar LazyColumn, ViewModel, dan navigasi antar-halaman.",
    matches: (n) => n >= 5 && n <= 8,
  },
  {
    id: "tahap-3",
    tag: "Tahap 3",
    title: "Persistensi Data & Rilis Aplikasi",
    subtitle: "Menyimpan data lokal dengan Room & DataStore serta membangun APK siap uji.",
    matches: (n) => n >= 9,
  },
];

export default function KurikulumList({ modules = MODULES_DATA }: { modules?: FullModule[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vibe_completed_lessons");
      if (stored) {
        setCompletedLessons(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Gagal membaca progres lokal:", err);
    }
  }, []);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalCompleted = completedLessons.length;
  const progressPercent =
    totalLessons > 0 ? Math.min(100, Math.round((totalCompleted / totalLessons) * 100)) : 0;

  const filteredModules = modules.filter((m) => {
    if (selectedDifficulty !== "all" && m.difficulty_level !== selectedDifficulty) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchModTitle = m.title.toLowerCase().includes(q);
      const matchModDesc = m.description.toLowerCase().includes(q);
      const matchLesson = m.lessons.some(
        (l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
      );
      if (!matchModTitle && !matchModDesc && !matchLesson) return false;
    }
    return true;
  });

  const stagesWithModules = LEARNING_STAGES.map((stage) => ({
    ...stage,
    items: filteredModules.filter((m) => stage.matches(m.module_number)),
  })).filter((s) => s.items.length > 0);

  return (
    <div className="bg-paper min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Page Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-1.5 text-xs text-muted mb-3">
            <Link href="/beranda" className="hover:text-ink">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-ink">Kurikulum ({modules.length} Modul)</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-rule">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
                Kurikulum &amp; Modul Pembelajaran
              </h1>
              <p className="mt-2 text-sm sm:text-base text-ink-2 max-w-2xl leading-relaxed">
                {modules.length} modul bertahap dibagi menjadi 3 tahap belajar, dilengkapi alur berpikir dan prompt AI siap diskusi.
              </p>
            </div>

            {/* Overall Progress Card */}
            <div className="bg-sheet rounded-2xl border border-rule p-4 sm:p-5 shrink-0 min-w-[280px]">
              <div className="flex items-center justify-between text-xs font-bold text-ink mb-2">
                <span>Progres Belajar Anda</span>
                <span className="text-accent font-mono text-sm">{progressPercent}%</span>
              </div>
              <div className="w-full bg-paper-3 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-accent h-2 rounded-full transition-colors duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2.5 text-xs text-muted">
                <span>
                  {totalCompleted} dari {totalLessons} materi selesai
                </span>
                <Link href="/dashboard" className="text-accent font-semibold hover:underline">
                  Buka Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Level Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari modul atau materi (contoh: Room, Compose, ViewModel)…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-rule bg-sheet text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "Semua Level" },
              { id: "Pemula", label: "Pemula" },
              { id: "Menengah", label: "Menengah" },
              { id: "Lanjutan", label: "Lanjutan" },
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setSelectedDifficulty(lvl.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                  selectedDifficulty === lvl.id
                    ? "bg-ink text-sheet"
                    : "bg-sheet text-ink-2 border border-rule hover:bg-paper-2"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master Context Prompt for Gemini */}
        <GeminiMasterContextCard />

        {/* 3 Learning Stages */}
        <div className="space-y-12">
          {stagesWithModules.map((stage) => (
            <section key={stage.id} className="space-y-5">
              {/* Stage Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-rule">
                <div>
                  <span className="inline-block text-xs font-bold text-accent mb-1">
                    {stage.tag}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                    {stage.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-2 mt-1">
                    {stage.subtitle}
                  </p>
                </div>
                <span className="text-xs font-semibold text-muted shrink-0">
                  {stage.items.length} Modul
                </span>
              </div>

              {/* 2-Column Module Grid per Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {stage.items.map((module) => {
                  const completedInModule = module.lessons.filter((l) =>
                    completedLessons.includes(l.id)
                  ).length;
                  const modulePercent =
                    module.lessons.length > 0
                      ? Math.round((completedInModule / module.lessons.length) * 100)
                      : 0;

                  return (
                    <div
                      key={module.id}
                      className="rounded-2xl border border-rule bg-sheet overflow-hidden flex flex-col justify-between transition-colors hover:border-muted"
                    >
                      {/* Clean Cobalt Card Header */}
                      <div>
                        <div className="p-5 bg-paper-2 border-b border-rule">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-accent-soft text-accent border border-rule">
                                Modul {module.module_number}
                              </span>
                              <Badge
                                variant={
                                  module.difficulty_level === "Pemula"
                                    ? "success"
                                    : module.difficulty_level === "Menengah"
                                    ? "info"
                                    : "warning"
                                }
                                className="text-[11px]"
                              >
                                {module.difficulty_level}
                              </Badge>
                            </div>

                            <span className="text-xs text-muted flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              ±{module.estimated_minutes} mnt
                            </span>
                          </div>

                          <Link
                            href={`/kurikulum/${module.slug}`}
                            className="group inline-flex items-start gap-2"
                          >
                            <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                              {module.title}
                            </h3>
                          </Link>
                          <p className="text-xs sm:text-sm text-ink-2 mt-1.5 line-clamp-2 leading-relaxed">
                            {module.description}
                          </p>
                        </div>

                        {/* Compact Lesson Rows */}
                        <div className="divide-y divide-rule">
                          {module.lessons.map((lesson) => {
                            const isDone = completedLessons.includes(lesson.id);

                            return (
                              <Link
                                key={lesson.id}
                                href={`/kurikulum/${module.slug}/${lesson.slug}`}
                                className="group flex items-center justify-between px-5 py-3 hover:bg-paper transition-colors gap-3"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  {isDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-rule group-hover:text-accent shrink-0" />
                                  )}
                                  <div className="min-w-0 flex items-center gap-2">
                                    <span className="font-mono text-xs text-muted shrink-0">
                                      {module.module_number}.{lesson.lesson_number}
                                    </span>
                                    <span className="text-xs sm:text-sm font-medium text-ink group-hover:text-accent transition-colors truncate">
                                      {lesson.title}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  {lesson.antigravity_prompt && (
                                    <Sparkles
                                      className="w-3.5 h-3.5 text-accent"
                                      aria-label="Dilengkapi Prompt AI"
                                    />
                                  )}
                                  <span className="text-[11px] text-muted hidden sm:inline">
                                    {lesson.estimated_minutes}m
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Module Card Footer */}
                      <div className="px-5 py-3.5 bg-paper border-t border-rule flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div className="w-24 bg-paper-3 rounded-full h-1.5 overflow-hidden shrink-0">
                            <div
                              className="bg-accent h-1.5 rounded-full transition-colors duration-300"
                              style={{ width: `${modulePercent}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted truncate">
                            {completedInModule}/{module.lessons.length} selesai
                          </span>
                        </div>

                        <Link href={`/kurikulum/${module.slug}`}>
                          <Button variant="outline" size="sm" className="text-xs gap-1.5">
                            <span>Buka Modul</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {filteredModules.length === 0 && (
            <div className="text-center py-16 bg-sheet rounded-2xl border border-rule p-8">
              <Search className="w-10 h-10 text-paper-3 mx-auto mb-3" />
              <h3 className="text-base font-bold text-ink">
                Tidak ada modul yang cocok
              </h3>
              <p className="text-xs text-muted mt-1">
                Coba gunakan kata kunci pencarian yang lain atau reset filter level kesulitan.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDifficulty("all");
                }}
              >
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
