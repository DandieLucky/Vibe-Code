"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ListTree, Layers } from "lucide-react";

export interface OutlineSection {
  id: string;
  label: string;
}

export interface ModuleLessonNavItem {
  id: string;
  lesson_number: number;
  title: string;
  slug: string;
  estimated_minutes: number;
}

interface LessonOutlineProps {
  sections: OutlineSection[];
  moduleSlug: string;
  moduleNumber: number;
  moduleTitle: string;
  currentLessonId: string;
  lessons: ModuleLessonNavItem[];
}

/**
 * Sticky sidebar for lesson pages: shows section jump links, module lesson switcher,
 * and local completion state so learners always know where they are.
 */
export function LessonOutline({
  sections,
  moduleSlug,
  moduleNumber,
  moduleTitle,
  currentLessonId,
  lessons,
}: LessonOutlineProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vibe_completed_lessons");
      if (stored) {
        setCompletedIds(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors in restricted environments
    }

    const handleStorage = () => {
      try {
        const stored = localStorage.getItem("vibe_completed_lessons");
        if (stored) setCompletedIds(JSON.parse(stored));
      } catch {
        // Ignore
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [currentLessonId]);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const completedInModule = lessons.filter((l) => completedIds.includes(l.id)).length;
  const percent = lessons.length > 0 ? Math.round((completedInModule / lessons.length) * 100) : 0;

  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      {/* Section Jump Links */}
      {sections.length > 0 && (
        <div className="rounded-xl border border-rule bg-sheet p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-ink mb-3">
            <ListTree className="w-4 h-4 text-accent" />
            <span>Alur Materi Ini</span>
          </div>
          <nav aria-label="Daftar seksi materi" className="space-y-1">
            {sections.map((sec, idx) => {
              const isActive = activeId === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setActiveId(sec.id)}
                  className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    isActive
                      ? "bg-accent-soft text-accent font-semibold"
                      : "text-ink-2 hover:bg-paper hover:text-ink"
                  }`}
                >
                  <span className="font-mono text-[11px] text-muted w-4 shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate">{sec.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}

      {/* Module Lesson Switcher */}
      <div className="rounded-xl border border-rule bg-sheet p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-ink">
            <Layers className="w-4 h-4 text-accent" />
            <span>Modul {moduleNumber}</span>
          </div>
          <span className="font-mono text-[11px] font-semibold text-accent">
            {completedInModule}/{lessons.length}
          </span>
        </div>

        <p className="text-xs text-muted line-clamp-2 mb-3 leading-relaxed">
          {moduleTitle}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-paper-3 rounded-full h-1.5 overflow-hidden mb-3">
          <div
            className="bg-accent h-1.5 rounded-full transition-colors duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="space-y-1">
          {lessons.map((item) => {
            const isCurrent = item.id === currentLessonId;
            const isDone = completedIds.includes(item.id);
            return (
              <Link
                key={item.id}
                href={`/kurikulum/${moduleSlug}/${item.slug}`}
                className={`flex items-start gap-2 px-2.5 py-2 rounded-lg text-xs transition-colors ${
                  isCurrent
                    ? "bg-paper-2 text-ink font-semibold border border-rule"
                    : "text-ink-2 hover:bg-paper hover:text-ink"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Circle
                    className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                      isCurrent ? "text-accent" : "text-rule"
                    }`}
                  />
                )}
                <div className="min-w-0">
                  <div className="leading-snug line-clamp-2">
                    <span className="font-mono text-[11px] text-muted mr-1">
                      {moduleNumber}.{item.lesson_number}
                    </span>
                    {item.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

