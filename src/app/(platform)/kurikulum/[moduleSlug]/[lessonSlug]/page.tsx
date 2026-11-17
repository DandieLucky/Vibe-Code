import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
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
  ShieldAlert,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCurriculumModules } from "@/lib/data-access/curriculum";
import { AntigravityPromptCard } from "@/components/lesson/antigravity-prompt-card";

export const dynamic = "force-dynamic";
import { CodeBlock } from "@/components/lesson/code-block";
import { LessonInteractiveTools } from "@/components/lesson/lesson-interactive-tools";

interface LessonPageProps {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}

export default async function LessonDetailPage({ params }: LessonPageProps) {
  // Gerbang kurikulum: materi hanya terbuka setelah login.
  // Dicek di server supaya isi pelajaran tidak pernah dikirim ke browser
  // sebelum hak akses terbukti.
  const supabase = await createServerSupabaseClient();
  // Tanpa Supabase (mode demo/lokal) materi tetap tampil; gerbang login
  // hanya berlaku saat Supabase aktif.
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
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

  // Calculate previous and next lessons across all modules
  let prevLesson: { moduleSlug: string; lesson: typeof lesson } | null = null;
  let nextLesson: { moduleSlug: string; lesson: typeof lesson } | null = null;

  if (currentLessonIndex > 0) {
    prevLesson = {
      moduleSlug: currentModule.slug,
      lesson: currentModule.lessons[currentLessonIndex - 1],
    };
  } else {
    // Check previous module
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
    // Check next module
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

  return (
    <div className="bg-paper min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-6 flex-wrap">
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
          <span className="font-semibold text-ink truncate max-w-[200px]">
            {lesson.title}
          </span>
        </nav>

        {/* Lesson Header Banner */}
        <header className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-accent-soft text-accent border border-rule">
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
              className="text-[10px]"
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
          <p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed">
            {lesson.description}
          </p>
        </header>

        {/* 1. Tujuan Pembelajaran & 2. Prasyarat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {lesson.objective && (
            <div className="rounded-xl border border-rule bg-paper-2 p-5">
              <div className="flex items-center gap-2 text-ink font-bold text-xs mb-2">
                <Target className="w-4 h-4 text-accent" />
                <span>Tujuan Pembelajaran</span>
              </div>
              <p className="text-xs sm:text-sm text-ink leading-relaxed font-medium">
                {lesson.objective}
              </p>
            </div>
          )}

          {lesson.prerequisites && lesson.prerequisites.length > 0 && (
            <div className="rounded-xl border border-rule bg-sheet p-5">
              <div className="flex items-center gap-2 text-ink-2 font-bold text-xs mb-2">
                <FileCheck2 className="w-4 h-4 text-muted" />
                <span>Prasyarat Materi</span>
              </div>
              <ul className="space-y-1.5 text-xs text-ink-2">
                {lesson.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-accent font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 3. Penjelasan Konsep */}
        {lesson.concept_explanation && (
          <section className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 shadow-xs mb-8">
            <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-accent" />
              <span>Penjelasan Konsep &amp; Teori Dasar</span>
            </h2>
            <div className="text-sm text-ink-2 leading-relaxed space-y-3 whitespace-pre-line">
              {lesson.concept_explanation}
            </div>
          </section>
        )}

        {/* 4. Persiapan Praktik */}
        {lesson.preparation && lesson.preparation.length > 0 && (
          <section className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 mb-8">
            <h3 className="text-xs font-bold text-amber-900 flex items-center gap-2 mb-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Persiapan Sebelum Praktik</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-amber-950">
              {lesson.preparation.map((prep, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono font-bold text-amber-600">{idx + 1}.</span>
                  <span>{prep}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 5. Instruksi Langkah demi Langkah */}
        {lesson.step_instructions && lesson.step_instructions.length > 0 && (
          <section className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 shadow-xs mb-8">
            <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2 mb-4">
              <ListOrdered className="w-5 h-5 text-accent" />
              <span>Instruksi Praktik Langkah demi Langkah</span>
            </h2>
            <div className="space-y-3">
              {lesson.step_instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-paper border border-rule">
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

        {/* 5.5 Blok Pikirkan Dulu (Alur Logika Sebelum Prompting AI) */}
        {lesson.thinking_steps && lesson.thinking_steps.length > 0 && (
          <section className="rounded-2xl border-2 border-rule bg-paper-2 p-6 sm:p-7 shadow-xs mb-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h2 className="text-base sm:text-lg font-extrabold text-ink flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                <span>Pikirkan Dulu: Rancang Alur Logika Sebelum Prompting</span>
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-accent-soft text-accent border border-rule">
                Wajib Dipahami Siswa
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ink-2 mb-4 leading-relaxed">
              Jangan langsung menyalin prompt ke AI. Jawab dan pahami urutan logika di bawah ini agar kamu tahu <strong>mengapa</strong> kode tersebut dibuat dan bisa mendeteksi jika AI keliru:
            </p>
            <div className="space-y-2.5">
              {lesson.thinking_steps.map((thought, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-sheet border border-rule"
                >
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-accent text-sheet font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-ink leading-relaxed font-medium">
                    {thought}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Prompt Terstruktur untuk Diskusi AI */}
        {lesson.antigravity_prompt && (
          <section className="mb-8">
            <div className="mb-2">
              <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                <Code2 className="w-5 h-5 text-accent" />
                <span>Prompt AI Terstruktur (Formula 6-Bagian)</span>
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Gunakan prompt ini setelah memahami alur di atas. Minta AI menjelaskan fungsi tiap bagian kode sebelum kamu menempelkannya ke Android Studio.
              </p>
            </div>
            <AntigravityPromptCard prompt={lesson.antigravity_prompt} lessonTitle={lesson.title} />
          </section>
        )}

        {/* 7. Kode Program jika ada */}
        {lesson.code_snippets && lesson.code_snippets.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-bold text-ink mb-2">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {lesson.expected_result && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-5">
              <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-2 mb-2">
                <span>Hasil yang Diharapkan</span>
              </h3>
              <p className="text-xs sm:text-sm text-ink leading-relaxed font-medium">
                {lesson.expected_result}
              </p>
            </div>
          )}

          {lesson.validation_check && lesson.validation_check.length > 0 && (
            <div className="rounded-xl border border-rule bg-paper-2 p-5">
              <h3 className="text-xs font-bold text-ink flex items-center gap-2 mb-2">
                <span>Cara Memeriksa Keberhasilan</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-ink-2">
                {lesson.validation_check.map((chk, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 10. Kesalahan yang Sering Terjadi & Solusi */}
        {lesson.common_errors && lesson.common_errors.length > 0 && (
          <section className="rounded-2xl border border-rose-100 bg-rose-50/30 p-6 mb-8">
            <h3 className="text-xs font-bold text-rose-900 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Kesalahan yang Sering Terjadi &amp; Solusinya</span>
            </h3>
            <div className="space-y-3">
              {lesson.common_errors.map((err, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-sheet border border-rose-200/80 space-y-1">
                  <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>{err.error}</span>
                  </div>
                  <div className="text-xs text-ink-2 pl-5">
                    <strong className="text-ink font-semibold">Solusi: </strong>
                    {err.solution}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 11. Latihan Praktik Mandiri */}
        {lesson.exercise && (
          <section className="rounded-xl border border-rule bg-sheet p-5 mb-8">
            <h3 className="text-xs font-bold text-ink flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Tantangan Latihan Mandiri</span>
            </h3>
            <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
              {lesson.exercise}
            </p>
          </section>
        )}

        {/* 12. Evaluasi Pemahaman Quiz & Catatan Pribadi & Tombol Tandai Selesai */}
        <LessonInteractiveTools
          lessonId={lesson.id}
          quiz={lesson.quiz}
        />

        {/* 13. Referensi Dokumentasi Resmi */}
        {lesson.references && lesson.references.length > 0 && (
          <div className="p-4 rounded-xl border border-rule bg-paper-2 mb-10">
            <span className="text-[11px] font-bold text-muted block mb-2">
              Referensi Dokumentasi Terkait:
            </span>
            <div className="flex flex-wrap gap-2">
              {lesson.references.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline bg-sheet px-3 py-1.5 rounded-lg border border-rule"
                >
                  <span>{ref.title}</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 14. Navigasi Materi Sebelumnya & Berikutnya */}
        <div className="flex items-center justify-between pt-6 border-t border-rule">
          {prevLesson ? (
            <Link
              href={`/kurikulum/${prevLesson.moduleSlug}/${prevLesson.lesson.slug}`}
            >
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Materi Sebelumnya: </span>
                <span className="truncate max-w-[150px]">{prevLesson.lesson.title}</span>
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              href={`/kurikulum/${nextLesson.moduleSlug}/${nextLesson.lesson.slug}`}
            >
              <Button variant="accent" size="sm" className="gap-2 font-bold">
                <span className="hidden sm:inline">Materi Berikutnya: </span>
                <span className="truncate max-w-[150px]">{nextLesson.lesson.title}</span>
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
    </div>
  );
}
