"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Bookmark,
  StickyNote,
  HelpCircle,
  AlertCircle,
  Save,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LessonInteractiveToolsProps {
  lessonId: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export function LessonInteractiveTools({ lessonId, quiz }: LessonInteractiveToolsProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({});

  useEffect(() => {
    try {
      // Check completion status
      const completedList: string[] = JSON.parse(
        localStorage.getItem("vibe_completed_lessons") || "[]"
      );
      setIsCompleted(completedList.includes(lessonId));

      // Check bookmark status
      const bookmarkList: string[] = JSON.parse(
        localStorage.getItem("vibe_bookmarked_lessons") || "[]"
      );
      setIsBookmarked(bookmarkList.includes(lessonId));

      // Load personal note
      const storedNote = localStorage.getItem(`vibe_note_${lessonId}`);
      if (storedNote) setNote(storedNote);
    } catch (err) {
      console.error(err);
    }
  }, [lessonId]);

  const toggleComplete = () => {
    try {
      const completedList: string[] = JSON.parse(
        localStorage.getItem("vibe_completed_lessons") || "[]"
      );
      let updated: string[];

      if (isCompleted) {
        updated = completedList.filter((id) => id !== lessonId);
        setIsCompleted(false);
      } else {
        updated = [...completedList, lessonId];
        setIsCompleted(true);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
        });
      }
      localStorage.setItem("vibe_completed_lessons", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleBookmark = () => {
    try {
      const bookmarkList: string[] = JSON.parse(
        localStorage.getItem("vibe_bookmarked_lessons") || "[]"
      );
      let updated: string[];

      if (isBookmarked) {
        updated = bookmarkList.filter((id) => id !== lessonId);
        setIsBookmarked(false);
      } else {
        updated = [...bookmarkList, lessonId];
        setIsBookmarked(true);
      }
      localStorage.setItem("vibe_bookmarked_lessons", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const saveNote = () => {
    localStorage.setItem(`vibe_note_${lessonId}`, note);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleSelectQuizOption = (qIdx: number, optionIdx: number) => {
    if (quizSubmitted[qIdx]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleCheckQuizAnswer = (qIdx: number) => {
    if (selectedAnswers[qIdx] === undefined) return;
    setQuizSubmitted((prev) => ({ ...prev, [qIdx]: true }));
    if (quiz && selectedAnswers[qIdx] === quiz[qIdx].correctIndex) {
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.8 },
      });
    }
  };

  return (
    <div className="space-y-8 my-8">
      {/* 1. Evaluasi Pemahaman (Interactive Quiz) */}
      {quiz && quiz.length > 0 && (
        <div className="rounded-2xl border border-rule bg-sheet p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-lg bg-accent-soft text-accent flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-ink">
              Evaluasi Pemahaman Materi
            </h3>
          </div>

          <div className="space-y-6">
            {quiz.map((q, qIdx) => {
              const isChecked = quizSubmitted[qIdx];
              const selected = selectedAnswers[qIdx];
              const isCorrect = selected === q.correctIndex;

              return (
                <div key={qIdx} className="space-y-3 pt-3 border-t border-rule first:border-0 first:pt-0">
                  <p className="text-sm font-semibold text-ink">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      let optionClasses =
                        "border-rule bg-paper hover:bg-paper-2 text-ink-2";

                      if (isOptionSelected) {
                        optionClasses = "border-accent bg-accent-soft text-ink font-semibold ring-1 ring-accent-2";
                      }

                      if (isChecked) {
                        if (optIdx === q.correctIndex) {
                          optionClasses = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-400";
                        } else if (isOptionSelected && !isCorrect) {
                          optionClasses = "border-rose-400 bg-rose-50 text-rose-800 line-through";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                          disabled={isChecked}
                          className={`w-full text-left px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors flex items-center justify-between ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {isChecked && optIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isChecked ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={selected === undefined}
                      onClick={() => handleCheckQuizAnswer(qIdx)}
                      className="text-xs"
                    >
                      Periksa Jawaban
                    </Button>
                  ) : (
                    <div
                      className={`p-3 rounded-xl text-xs leading-relaxed ${
                        isCorrect
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-amber-50 text-amber-900 border border-amber-200"
                      }`}
                    >
                      <div className="font-bold mb-1">
                        {isCorrect ? "✓ Jawaban Benar!" : "✕ Jawaban Kurang Tepat"}
                      </div>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Catatan Pribadi Siswa */}
      <div className="rounded-2xl border border-rule bg-sheet p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StickyNote className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-bold text-ink">
              Catatan Pribadi untuk Materi Ini
            </h3>
          </div>
          {noteSaved && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Tersimpan!
            </span>
          )}
        </div>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Tuliskan catatan penting, alur logika, atau ringkasan pemahaman Anda di sini (tersimpan otomatis di browser)…"
          className="w-full p-3 rounded-xl border border-rule text-xs sm:text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent bg-paper"
        />
        <div className="mt-2.5 flex justify-end">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={saveNote}
            className="text-xs gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            Simpan Catatan
          </Button>
        </div>
      </div>

      {/* 3. Action Bar: Bookmark & Mark as Completed */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-paper-2 border border-rule text-ink">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleBookmark}
            className={`p-2.5 rounded-xl border transition-colors ${
              isBookmarked
                ? "bg-accent-soft text-accent border-accent/30"
                : "bg-sheet text-ink-2 border-rule hover:text-ink"
            }`}
            title={isBookmarked ? "Hapus dari Bookmark" : "Simpan ke Bookmark"}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-accent" : ""}`} />
          </button>
          <div>
            <div className="text-xs font-semibold text-ink">
              {isBookmarked ? "Tersimpan di Bookmark" : "Simpan materi untuk dibuka lagi nanti"}
            </div>
            <div className="text-[11px] text-muted">
              Progres tersimpan di browser &amp; database akun Anda
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={toggleComplete}
          variant={isCompleted ? "teal" : "accent"}
          className={`font-bold px-6 py-2.5 text-sm transition-colors ${
            isCompleted ? "bg-emerald-600 hover:bg-emerald-700 text-sheet" : ""
          }`}
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          {isCompleted ? "Materi Ini Telah Selesai ✓" : "Tandai Selesai"}
        </Button>
      </div>
    </div>
  );
}
