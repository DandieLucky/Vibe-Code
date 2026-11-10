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
    <div className="rounded-2xl border-2 border-sky-200/80 bg-gradient-to-b from-sky-50/40 via-white to-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-900 text-white">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/30">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                PROMPT GOOGLE ANTIGRAVITY
              </span>
              <Badge variant="teal" className="text-[10px] py-0 px-2 bg-teal-950 text-teal-300 border-teal-800">
                Siap Salin
              </Badge>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-mono">
              Formula 6-Bagian Presisi • Anti-Halusinasi
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("structured")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeTab === "structured"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Terstruktur
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("raw")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeTab === "raw"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Raw Text
            </button>
          </div>

          {/* Master Copy Button */}
          <CopyButton
            textToCopy={prompt.rawPrompt}
            label="SALIN PROMPT LENGKAP"
            copiedLabel="PROMPT TERSALIN!"
            className="text-xs py-2 px-4 font-bold shadow-md"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {activeTab === "structured" ? (
          <div className="space-y-4">
            {/* A. TUJUAN */}
            <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-xs uppercase tracking-wider mb-1.5">
                <Target className="w-4 h-4 text-sky-600" />
                <span>A. TUJUAN</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                {prompt.tujuan}
              </p>
            </div>

            {/* B. KONTEKS */}
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider mb-1.5">
                <FileCode className="w-4 h-4 text-slate-600" />
                <span>B. KONTEKS PROYEK & FILE</span>
              </div>
              <p className="text-sm text-slate-700 font-mono bg-white p-2.5 rounded-lg border border-slate-200">
                {prompt.konteks}
              </p>
            </div>

            {/* C. INSTRUKSI */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-2.5">
                <Terminal className="w-4 h-4 text-sky-600" />
                <span>C. INSTRUKSI TEKNIS LANGKAH DEMI LANGKAH</span>
              </div>
              <ol className="space-y-2">
                {prompt.instruksi.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold shrink-0 mt-0.5">
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
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>D. BATASAN (DILARANG UBAH)</span>
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
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>E. HASIL AKHIR YANG DIHARAPKAN</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {prompt.hasilAkhir}
                </p>
              </div>
            </div>

            {/* F. VALIDASI */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1.5">
                <span className="flex items-center justify-center h-4 w-4 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                  ✓
                </span>
                <span>F. VALIDASI OTOMATIS OLEH AI</span>
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
            <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
              {prompt.rawPrompt}
            </pre>
          </div>
        )}

        {/* Quick Instructions Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Klik tombol salin di atas, buka panel Antigravity Agent, lalu tekan kirim.
          </span>
          <span className="font-mono text-[11px] text-slate-400">
            Karakter: {prompt.rawPrompt.length}
          </span>
        </div>
      </div>
    </div>
  );
}
