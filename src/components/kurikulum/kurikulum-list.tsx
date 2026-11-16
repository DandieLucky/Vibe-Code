"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MODULES_DATA } from "@/lib/data/curriculum-data";

export default function KurikulumList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load completed lessons from localStorage
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

  const totalLessons = MODULES_DATA.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalCompleted = completedLessons.length;
  const progressPercent = Math.min(100, Math.round((totalCompleted / totalLessons) * 100));

  const filteredModules = MODULES_DATA.filter((m) => {
    if (selectedDifficulty !== "all" && m.difficulty_level !== selectedDifficulty) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchModTitle = m.title.toLowerCase().includes(q);
      const matchModDesc = m.description.toLowerCase().includes(q);
      const matchLesson = m.lessons.some((l) =>
        l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
      );
      if (!matchModTitle && !matchModDesc && !matchLesson) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#6A5A4E] mb-2">
            <Link href="/beranda" className="hover:text-[#2B211B]">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#2B211B]">Kurikulum 6 Modul</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E6DDD2]">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2B211B] tracking-tight">
                Kurikulum Lengkap Android Kotlin &amp; Compose
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#5D4E43] max-w-2xl">
                6 modul padat untuk pelatihan 3 hari. Dilengkapi alur berpikir terstruktur dan prompt AI siap diskusi.
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="bg-[#FDFBF7] rounded-2xl border border-[#E6DDD2] p-4 sm:p-5 shadow-xs shrink-0 min-w-[280px]">
              <div className="flex items-center justify-between text-xs font-bold text-[#2B211B] mb-2">
                <span>Progres Belajar Anda</span>
                <span className="text-[#C4552D] font-mono text-sm">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#EFE7DC] rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#C4552D] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2.5 text-[11px] text-[#6A5A4E]">
                <span>{totalCompleted} dari {totalLessons} materi selesai</span>
                <Link href="/dashboard" className="text-[#C4552D] font-semibold hover:underline">
                  Buka Dashboard &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search bar */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#6A5A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari modul atau materi (contoh: Room Database, Compose, Google Login)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D8CCBE] bg-[#FDFBF7] text-sm text-[#2B211B] placeholder:text-[#6A5A4E] focus:outline-none focus:ring-2 focus:ring-[#C4552D]"
            />
          </div>

          {/* Difficulty filter buttons */}
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
                    ? "bg-[#2B211B] text-[#FDFBF7] shadow-xs"
                    : "bg-[#FDFBF7] text-[#4A3B31] border border-[#D8CCBE] hover:bg-[#F3ECE2]"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modules List Grid */}
        <div className="space-y-6">
          {filteredModules.map((module) => {
            const completedInModule = module.lessons.filter((l) =>
              completedLessons.includes(l.id)
            ).length;
            const modulePercent = Math.round(
              (completedInModule / module.lessons.length) * 100
            );

            return (
              <div
                key={module.id}
                className="rounded-2xl border border-[#E6DDD2] bg-[#FDFBF7] shadow-xs overflow-hidden transition-colors duration-200 hover:border-[#D8CCBE]"
              >
                {/* Module Header Bar */}
                <div className="p-6 bg-[#2B211B] text-[#FDFBF7] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        MODUL {module.module_number}
                      </span>
                      <Badge
                        variant={
                          module.difficulty_level === "Pemula"
                            ? "success"
                            : module.difficulty_level === "Menengah"
                            ? "info"
                            : "warning"
                        }
                        className="text-[10px]"
                      >
                        {module.difficulty_level}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        ±{module.estimated_minutes} Menit
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {module.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  {/* Module Completion Meter */}
                  <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-200">
                        {completedInModule} / {module.lessons.length} Selesai
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {modulePercent}% Selesai
                      </div>
                    </div>
                    <Link href={`/kurikulum/${module.slug}`}>
                      <Button variant="accent" size="sm" className="font-bold">
                        Buka Modul
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Lessons List in Module */}
                <div className="divide-y divide-slate-100">
                  {module.lessons.map((lesson) => {
                    const isDone = completedLessons.includes(lesson.id);

                    return (
                      <Link
                        key={lesson.id}
                        href={`/kurikulum/${module.slug}/${lesson.slug}`}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 hover:bg-slate-50 transition-colors gap-3"
                      >
                        <div className="flex items-start sm:items-center gap-3.5">
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 sm:mt-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 group-hover:text-sky-500 shrink-0 mt-0.5 sm:mt-0" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-semibold text-slate-400">
                                #{module.module_number}.{lesson.lesson_number}
                              </span>
                              <h3 className="text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                                {lesson.title}
                              </h3>
                              {lesson.antigravity_prompt && (
                                <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-1.5 py-0.2 rounded font-mono font-medium">
                                  +Prompt AI
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {lesson.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto text-xs">
                          <span className="text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            {lesson.estimated_minutes}m
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isDone
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-700"
                            }`}
                          >
                            {isDone ? "Selesai" : "Pelajari"}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredModules.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">
                Tidak ada modul yang cocok
              </h3>
              <p className="text-xs text-slate-500 mt-1">
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

