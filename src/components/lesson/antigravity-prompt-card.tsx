"use client";

import React, { useState } from "react";
import { Sparkles, Terminal, ShieldAlert, CheckCircle2, FileCode, Target, ArrowRight } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { AntigravityPromptFormat } from "@/types/database";
import { Badge } from "@/components/ui/badge";

interface AntigravityPromptCardProps {
  prompt: AntigravityPromptFormat;
  lessonTitle?: string;
}

export function AntigravityPromptCard({ prompt, lessonTitle }: AntigravityPromptCardProps) {
  const [activeTab, setActiveTab] = useState<"structured" | "raw">("structured");

  return (
    <div className="rounded-2xl border-2 border-rule bg-sheet shadow-sm overflow-hidden">
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-ink text-sheet">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-accent-soft text-accent-2 border border-rule">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-accent-2">
                Prompt Diskusi &amp; Implementasi AI
              </span>
              <Badge variant="teal" className="text-[10px] py-0 px-2 bg-umber text-paper border-rule">
                Formula 6-Bagian
              </Badge>
            </div>
            <p className="text-xs text-paper-3 mt-0.5">
              Berpikir Terstruktur • Pahami Kode Sebelum Diterapkan
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="inline-flex rounded-lg bg-umber p-0.5 border border-rule text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("structured")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeTab === "structured"
                  ? "bg-accent text-sheet shadow-sm"
                  : "text-paper-3 hover:text-white"
              }`}
            >
              Terstruktur
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("raw")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeTab === "raw"
                  ? "bg-accent text-sheet shadow-sm"
                  : "text-paper-3 hover:text-white"
              }`}
            >
              Raw Text
            </button>
          </div>

          {/* Master Copy Button */}
          <CopyButton
            textToCopy={prompt.rawPrompt}
            label="Salin Prompt Lengkap"
            copiedLabel="Prompt Tersalin"
            className="text-xs py-2 px-4 font-bold shadow-md"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {activeTab === "structured" ? (
          <div className="space-y-4">
            {/* A. TUJUAN */}
            <div className="rounded-xl border border-rule bg-paper p-4">
              <div className="flex items-center gap-2 text-ink font-bold text-xs mb-1.5">
                <Target className="w-4 h-4 text-accent" />
                <span>A. Tujuan</span>
              </div>
              <p className="text-sm font-semibold text-ink leading-snug">
                {prompt.tujuan}
              </p>
            </div>

            {/* B. KONTEKS */}
            <div className="rounded-xl border border-rule bg-paper-2 p-4">
              <div className="flex items-center gap-2 text-ink-2 font-bold text-xs mb-1.5">
                <FileCode className="w-4 h-4 text-muted" />
                <span>B. Konteks Proyek &amp; File</span>
              </div>
              <p className="text-sm text-ink-2 font-mono bg-sheet p-2.5 rounded-lg border border-rule">
                {prompt.konteks}
              </p>
            </div>

            {/* C. INSTRUKSI */}
            <div className="rounded-xl border border-rule bg-sheet p-4 shadow-xs">
              <div className="flex items-center gap-2 text-ink font-bold text-xs mb-2.5">
                <Terminal className="w-4 h-4 text-accent" />
                <span>C. Instruksi Teknis Langkah demi Langkah</span>
              </div>
              <ol className="space-y-2">
                {prompt.instruksi.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-ink-2 leading-relaxed">
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-accent-soft text-accent text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* D. BATASAN & E. HASIL AKHIR (2 Columns on Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* D. BATASAN */}
              <div className="rounded-xl border border-rose-100 bg-rose-50/30 p-4">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>D. Batasan (Jangan Dilanggar)</span>
                </div>
                <ul className="space-y-1.5">
                  {prompt.batasan.map((bat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-rose-900">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{bat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* E. HASIL AKHIR */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>E. Hasil Akhir yang Diharapkan</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {prompt.hasilAkhir}
                </p>
              </div>
            </div>

            {/* F. VALIDASI */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1.5">
                <span className="flex items-center justify-center h-4 w-4 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                  ✓
                </span>
                <span>F. Validasi Keberhasilan</span>
              </div>
              <p className="text-xs text-amber-950 font-medium">
                {prompt.validasi}
              </p>
            </div>
          </div>
        ) : (
          /* Raw View */
          <div className="relative">
            <div className="absolute top-3 right-3 z-10">
              <CopyButton
                textToCopy={prompt.rawPrompt}
                variant="outline"
                label="Salin Teks Raw"
                copiedLabel="Tersalin!"
              />
            </div>
            <pre className="p-4 rounded-xl bg-ink text-paper font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-umber">
              {prompt.rawPrompt}
            </pre>
          </div>
        )}

        {/* Quick Instructions Footer */}
        <div className="mt-4 pt-3 border-t border-rule flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1.5">
            Pahami dulu alur logikanya, lalu salin prompt ini untuk berdiskusi dengan asisten AI.
          </span>
          <span className="text-[11px] text-muted">
            {prompt.rawPrompt.length} karakter
          </span>
        </div>
      </div>
    </div>
  );
}
