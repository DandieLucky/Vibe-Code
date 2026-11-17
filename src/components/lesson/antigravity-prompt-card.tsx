"use client";

import React, { useState } from "react";
import { Sparkles, Terminal, ShieldAlert, CheckCircle2, FileCode, Target, Check } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { AntigravityPromptFormat } from "@/types/database";

interface AntigravityPromptCardProps {
  prompt: AntigravityPromptFormat;
  lessonTitle?: string;
}

/**
 * Clean Cobalt-styled 6-part AI discussion prompt card without nested card clutter.
 */
export function AntigravityPromptCard({ prompt }: AntigravityPromptCardProps) {
  const [activeTab, setActiveTab] = useState<"structured" | "raw">("structured");

  return (
    <div className="rounded-2xl border border-rule bg-sheet overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-paper-2 border-b border-rule">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-accent-soft text-accent border border-rule shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-ink">
                Prompt Diskusi &amp; Implementasi AI
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-sheet text-accent border border-rule">
                Formula 6-Bagian
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Pahami alur logika terlebih dahulu sebelum menyalin prompt ke asisten AI.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-sheet p-0.5 border border-rule text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("structured")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeTab === "structured"
                  ? "bg-ink text-sheet"
                  : "text-ink-2 hover:text-ink"
              }`}
            >
              Terstruktur
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("raw")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeTab === "raw"
                  ? "bg-ink text-sheet"
                  : "text-ink-2 hover:text-ink"
              }`}
            >
              Raw Text
            </button>
          </div>

          <CopyButton
            textToCopy={prompt.rawPrompt}
            label="Salin Prompt"
            copiedLabel="Tersalin!"
            className="text-xs py-1.5 px-3.5 font-semibold"
          />
        </div>
      </div>

      {/* Body */}
      {activeTab === "structured" ? (
        <div className="divide-y divide-rule">
          {/* A. Tujuan */}
          <div className="p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-ink mb-1.5">
              <Target className="w-4 h-4 text-accent" />
              <span>A. Tujuan</span>
            </div>
            <p className="text-sm font-semibold text-ink leading-relaxed">
              {prompt.tujuan}
            </p>
          </div>

          {/* B. Konteks */}
          <div className="p-5 bg-paper/50">
            <div className="flex items-center gap-2 text-xs font-bold text-ink-2 mb-2">
              <FileCode className="w-4 h-4 text-muted" />
              <span>B. Konteks Proyek &amp; File</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-2 font-mono leading-relaxed">
              {prompt.konteks}
            </p>
          </div>

          {/* C. Instruksi */}
          <div className="p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-ink mb-3">
              <Terminal className="w-4 h-4 text-accent" />
              <span>C. Instruksi Teknis Langkah demi Langkah</span>
            </div>
            <ol className="space-y-2">
              {prompt.instruksi.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-2 leading-relaxed">
                  <span className="flex items-center justify-center h-5 w-5 rounded-full bg-accent-soft text-accent text-[11px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* D. Batasan & E. Hasil Akhir */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-rule">
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-ink mb-2">
                <ShieldAlert className="w-4 h-4 text-muted" />
                <span>D. Batasan (Jangan Dilanggar)</span>
              </div>
              <ul className="space-y-1.5">
                {prompt.batasan.map((bat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-ink-2 leading-relaxed">
                    <span className="text-accent font-bold">•</span>
                    <span>{bat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-ink mb-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>E. Hasil Akhir yang Diharapkan</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                {prompt.hasilAkhir}
              </p>
            </div>
          </div>

          {/* F. Validasi */}
          <div className="p-5 bg-paper-2/60">
            <div className="flex items-center gap-2 text-xs font-bold text-ink mb-1.5">
              <Check className="w-4 h-4 text-accent" />
              <span>F. Validasi Keberhasilan</span>
            </div>
            <p className="text-xs sm:text-sm text-ink leading-relaxed font-medium">
              {prompt.validasi}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-5 bg-ink">
          <pre className="text-paper font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {prompt.rawPrompt}
          </pre>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 bg-paper border-t border-rule flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>Minta AI menjelaskan fungsi tiap baris kode sebelum menempelkannya ke Android Studio.</span>
        <span className="font-mono text-[11px]">{prompt.rawPrompt.length} karakter</span>
      </div>
    </div>
  );
}
