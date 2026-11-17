import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ChevronDown,
  Clock,
  BookOpen,
  Target,
  FileCheck2,
  ListOrdered,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Code2,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCurriculumModules } from "@/lib/data-access/curriculum";
import { AntigravityPromptCard } from "@/components/lesson/antigravity-prompt-card";
import { CodeBlock } from "@/components/lesson/code-block";
import { LessonInteractiveTools } from "@/components/lesson/lesson-interactive-tools";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { LessonOutline, type OutlineSection } from "@/components/lesson/lesson-outline";

export const dynamic = "force-dynamic";

interface LessonPageProps {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}

export default async function LessonDetailPage({ params }: LessonPageProps) {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=" + encodeURIComponent("/kurikulum"));
  }

  const modules = await getCurriculumModules({ includeUnpublished: false });
  const { moduleSlug, lessonSlug } = await params;

  const currentModule = modules.find((m) => m.slug === moduleSlug);
  if (!currentModule) {
    notFound();
  }

  const currentLessonIndex = currentModule.lessons.findIndex(
    (l) => l.slug === lessonSlug
  );
  if (currentLessonIndex === -1) {
    notFound();
  }

  const lesson = currentModule.lessons[currentLessonIndex];

  // Previous & next lesson navigation across modules
  let prevLesson: { moduleSlug: string; lesson: typeof lesson } | null = null;
  let nextLesson: { moduleSlug: string; lesson: typeof lesson } | null = null;

  if (currentLessonIndex > 0) {
    prevLesson = {
      moduleSlug: currentModule.slug,
      lesson: currentModule.lessons[currentLessonIndex - 1],
    };
  } else {
    const currentModuleIndex = modules.findIndex((m) => m.id === currentModule.id);
    if (currentModuleIndex > 0) {
      const prevMod = modules[currentModuleIndex - 1];
      if (prevMod.lessons.length > 0) {
        prevLesson = {
          moduleSlug: prevMod.slug,
          lesson: prevMod.lessons[prevMod.lessons.length - 1],
        };
      }
    }
  }

  if (currentLessonIndex < currentModule.lessons.length - 1) {
    nextLesson = {
      moduleSlug: currentModule.slug,
      lesson: currentModule.lessons[currentLessonIndex + 1],
    };
  } else {
    const currentModuleIndex = modules.findIndex((m) => m.id === currentModule.id);
    if (currentModuleIndex < modules.length - 1) {
      const nextMod = modules[currentModuleIndex + 1];
      if (nextMod.lessons.length > 0) {
        nextLesson = {
          moduleSlug: nextMod.slug,
          lesson: nextMod.lessons[0],
        };
      }
    }
  }

  // Build dynamic outline sections for the sticky sidebar
  const outlineSections: OutlineSection[] = [];
  if (lesson.objective) outlineSections.push({ id: "tujuan", label: "Tujuan Pembelajaran" });
  if (lesson.concept_explanation) outlineSections.push({ id: "konsep", label: "Konsep & Teori" });
  if (lesson.step_instructions?.length) outlineSections.push({ id: "langkah", label: "Langkah Praktik" });
  if (lesson.thinking_steps?.length) outlineSections.push({ id: "pikirkan-dulu", label: "Alur Logika AI" });
  if (lesson.antigravity_prompt) outlineSections.push({ id: "prompt-ai", label: "Prompt AI 6-Bagian" });
  if (lesson.code_snippets?.length) outlineSections.push({ id: "kode", label: "Kode Referensi" });
  if (lesson.expected_result || lesson.validation_check?.length) {
    outlineSections.push({ id: "validasi", label: "Hasil & Validasi" });
  }
  if (lesson.common_errors?.length) outlineSections.push({ id: "kesalahan", label: "Kendala Umum" });
  outlineSections.push({ id: "evaluasi", label: "Evaluasi & Selesai" });

  return (
    <div className="bg-paper min-h-screen py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-5 flex-wrap">
          <Link href="/beranda" className="hover:text-ink">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/kurikulum" className="hover:text-ink">
            Kurikulum
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            href={`/kurikulum/${currentModule.slug}`}
            className="hover:text-ink font-medium truncate max-w-[180px]"
          >
            Modul {currentModule.module_number}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="font-semibold text-ink truncate max-w-[240px]">
            {lesson.title}
          </span>
        </nav>

        {/* Lesson Header Banner */}
        <header className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-accent-soft text-accent border border-rule">
              Modul {currentModule.module_number}, Materi {lesson.lesson_number}
            </span>
            <Badge
              variant={
                currentModule.difficulty_level === "Pemula"
                  ? "success"
                  : currentModule.difficulty_level === "Menengah"
                  ? "info"
                  : "warning"
              }
              className="text-[11px]"
            >
              {currentModule.difficulty_level}
            </Badge>
            <span className="text-xs text-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              ±{lesson.estimated_minutes} Menit
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight leading-snug">
            {lesson.title}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-ink-2 leading-relaxed max-w-3xl">
            {lesson.description}
          </p>
        </header>

        {/* 2-Column Main Layout: Content Left + Sticky Outline Right */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8 lg:items-start">
          {/* Primary Reading & Practice Column */}
          <div className="space-y-6 min-w-0">
            {/* 1. Tujuan Pembelajaran */}
            {lesson.objective && (
              <section
                id="tujuan"
                className="scroll-mt-24 rounded-2xl border border-rule border-l-4 border-l-accent bg-sheet p-5 sm:p-6"
              >
                <div className="flex items-center gap-2 text-ink font-bold text-xs mb-2">
                  <Target className="w-4 h-4 text-accent" />
                  <span>Tujuan Pembelajaran</span>
                </div>
                <p className="text-sm sm:text-base text-ink leading-relaxed font-medium">
                  {lesson.objective}
                </p>
              </section>
            )}

            {/* 2. Prasyarat Materi (Collapsible Secondary Block) */}
            {lesson.prerequisites && lesson.prerequisites.length > 0 && (
              <details className="group rounded-xl border border-rule bg-paper-2">
                <summary className="flex items-center justify-between gap-2 px-5 py-3.5 cursor-pointer list-none text-xs font-bold text-ink select-none">
                  <span className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-accent" />
                    <span>Prasyarat Sebelum Memulai ({lesson.prerequisites.length})</span>
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-4 pt-1 border-t border-rule">
                  <ul className="space-y-1.5 text-xs sm:text-sm text-ink-2 mt-2">
                    {lesson.prerequisites.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-accent font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            )}

            {/* 3. Penjelasan Konsep & Teori Dasar */}
            {lesson.concept_explanation && (
              <section
                id="konsep"
                className="scroll-mt-24 rounded-2xl border border-rule bg-sheet p-6 sm:p-8"
              >
                <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2 mb-4 pb-3 border-b border-rule">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <span>Penjelasan Konsep &amp; Teori Dasar</span>
                </h2>
                <MarkdownContent content={lesson.concept_explanation} />
              </section>
            )}

            {/* 4. Persiapan Sebelum Praktik */}
            {lesson.preparation && lesson.preparation.length > 0 && (
              <section className="rounded-2xl border border-rule bg-paper-2 p-5 sm:p-6">
                <h3 className="text-xs sm:text-sm font-bold text-ink flex items-center gap-2 mb-3">
                  <Compass className="w-4 h-4 text-accent" />
                  <span>Persiapan Sebelum Praktik</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-ink-2">
                  {lesson.preparation.map((prep, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono font-bold text-accent shrink-0">
                        {idx + 1}.
                      </span>
                      <span className="leading-relaxed">{prep}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 5. Instruksi Praktik Langkah demi Langkah (Flat rows, no card-in-card) */}
            {lesson.step_instructions && lesson.step_instructions.length > 0 && (
              <section
                id="langkah"
                className="scroll-mt-24 rounded-2xl border border-rule bg-sheet overflow-hidden"
              >
                <div className="px-6 py-4 bg-paper-2 border-b border-rule">
                  <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                    <ListOrdered className="w-5 h-5 text-accent" />
                    <span>Instruksi Praktik Langkah demi Langkah</span>
                  </h2>
                </div>
                <div className="divide-y divide-rule">
                  {lesson.step_instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 px-6 py-4">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-ink text-sheet font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-ink leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5.5 Pikirkan Dulu: Alur Logika Sebelum Prompting AI */}
            {lesson.thinking_steps && lesson.thinking_steps.length > 0 && (
              <section
                id="pikirkan-dulu"
                className="scroll-mt-24 rounded-2xl border border-rule border-l-4 border-l-ink bg-sheet overflow-hidden"
              >
                <div className="px-6 py-4 bg-paper-2 border-b border-rule flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    <span>Pikirkan Dulu: Rancang Alur Logika</span>
                  </h2>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-accent-soft text-accent border border-rule">
                    Wajib Dipahami Sebelum Prompting
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs sm:text-sm text-ink-2 mb-4 leading-relaxed">
                    Jangan langsung menyalin prompt ke AI. Pahami urutan logika di bawah ini agar Anda tahu{" "}
                    <strong className="text-ink">mengapa</strong> kode tersebut dibuat dan bisa mendeteksi jika AI keliru:
                  </p>
                  <ol className="divide-y divide-rule border-t border-rule">
                    {lesson.thinking_steps.map((thought, idx) => (
                      <li key={idx} className="flex items-start gap-3 py-3.5">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-accent-soft text-accent font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-ink leading-relaxed font-medium">
                          {thought}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )}

            {/* 6. Prompt AI Terstruktur */}
            {lesson.antigravity_prompt && (
              <section id="prompt-ai" className="scroll-mt-24">
                <div className="mb-3">
                  <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-accent" />
                    <span>Prompt AI Terstruktur (Formula 6-Bagian)</span>
                  </h2>
                  <p className="text-xs text-muted mt-0.5">
                    Gunakan prompt ini setelah memahami alur logika di atas.
                  </p>
                </div>
                <AntigravityPromptCard prompt={lesson.antigravity_prompt} lessonTitle={lesson.title} />
              </section>
            )}

            {/* 7. Kode Program Referensi */}
            {lesson.code_snippets && lesson.code_snippets.length > 0 && (
              <section id="kode" className="scroll-mt-24">
                <h2 className="text-base sm:text-lg font-bold text-ink mb-2">
                  Kode Program Referensi
                </h2>
                {lesson.code_snippets.map((snip, idx) => (
                  <CodeBlock
                    key={idx}
                    filename={snip.filename}
                    language={snip.language}
                    code={snip.code}
                  />
                ))}
              </section>
            )}

            {/* 8. Hasil yang Diharapkan & 9. Cara Memeriksa Keberhasilan */}
            {(lesson.expected_result || (lesson.validation_check && lesson.validation_check.length > 0)) && (
              <section
                id="validasi"
                className="scroll-mt-24 rounded-2xl border border-rule bg-sheet overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-rule">
                  {lesson.expected_result && (
                    <div className="p-5 sm:p-6">
                      <h3 className="text-xs font-bold text-ink flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        <span>Hasil yang Diharapkan</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                        {lesson.expected_result}
                      </p>
                    </div>
                  )}

                  {lesson.validation_check && lesson.validation_check.length > 0 && (
                    <div className="p-5 sm:p-6 bg-paper/50">
                      <h3 className="text-xs font-bold text-ink flex items-center gap-2 mb-2">
                        <FileCheck2 className="w-4 h-4 text-accent" />
                        <span>Cara Memeriksa Keberhasilan</span>
                      </h3>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-ink-2">
                        {lesson.validation_check.map((chk, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent font-bold">✓</span>
                            <span>{chk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 10. Kesalahan yang Sering Terjadi & Solusi (Collapsible) */}
            {lesson.common_errors && lesson.common_errors.length > 0 && (
              <details
                id="kesalahan"
                className="scroll-mt-24 group rounded-2xl border border-rule bg-sheet overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-2 px-6 py-4 bg-paper-2 cursor-pointer list-none text-xs sm:text-sm font-bold text-ink select-none">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-accent" />
                    <span>
                      Kendala yang Sering Terjadi &amp; Solusinya ({lesson.common_errors.length})
                    </span>
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="divide-y divide-rule border-t border-rule">
                  {lesson.common_errors.map((err, idx) => (
                    <div key={idx} className="px-6 py-4 space-y-1">
                      <div className="text-xs sm:text-sm font-bold text-ink flex items-start gap-2">
                        <span className="text-accent font-mono shrink-0">!</span>
                        <span>{err.error}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-ink-2 pl-4">
                        <strong className="text-ink font-semibold">Solusi: </strong>
                        {err.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* 11. Tantangan Latihan Mandiri */}
            {lesson.exercise && (
              <section className="rounded-2xl border border-rule bg-paper-2 p-5 sm:p-6">
                <h3 className="text-xs sm:text-sm font-bold text-ink flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <span>Tantangan Latihan Mandiri</span>
                </h3>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  {lesson.exercise}
                </p>
              </section>
            )}

            {/* 12. Evaluasi Pemahaman, Catatan Pribadi & Tandai Selesai */}
            <div id="evaluasi" className="scroll-mt-24">
              <LessonInteractiveTools lessonId={lesson.id} quiz={lesson.quiz} />
            </div>

            {/* 13. Referensi Dokumentasi Resmi */}
            {lesson.references && lesson.references.length > 0 && (
              <div className="p-5 rounded-2xl border border-rule bg-paper-2">
                <span className="text-xs font-bold text-ink block mb-2.5">
                  Referensi Dokumentasi Terkait
                </span>
                <div className="flex flex-wrap gap-2">
                  {lesson.references.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline bg-sheet px-3 py-1.5 rounded-lg border border-rule"
                    >
                      <span>{ref.title}</span>
                      <ExternalLink className="w-3 h-3 text-muted" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 14. Navigasi Materi Sebelumnya & Berikutnya */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-rule">
              {prevLesson ? (
                <Link href={`/kurikulum/${prevLesson.moduleSlug}/${prevLesson.lesson.slug}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Sebelumnya: </span>
                    <span className="truncate max-w-[180px]">{prevLesson.lesson.title}</span>
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link href={`/kurikulum/${nextLesson.moduleSlug}/${nextLesson.lesson.slug}`}>
                  <Button variant="accent" size="sm" className="gap-2 font-bold">
                    <span className="hidden sm:inline">Berikutnya: </span>
                    <span className="truncate max-w-[180px]">{nextLesson.lesson.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/kumpulan-karya">
                  <Button variant="teal" size="sm" className="gap-2 font-bold">
                    <span>Kumpulkan Karya Anda</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Sticky Outline & Module Switcher Sidebar */}
          <div className="mt-8 lg:mt-0">
            <LessonOutline
              sections={outlineSections}
              moduleSlug={currentModule.slug}
              moduleNumber={currentModule.module_number}
              moduleTitle={currentModule.title}
              currentLessonId={lesson.id}
              lessons={currentModule.lessons.map((l) => ({
                id: l.id,
                lesson_number: l.lesson_number,
                title: l.title,
                slug: l.slug,
                estimated_minutes: l.estimated_minutes,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
