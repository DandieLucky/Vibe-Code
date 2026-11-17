"use client";

import React from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { GEMINI_MASTER_CONTEXT_PROMPT } from "@/lib/data/gemini-master-context";

/**
 * Prominent "Step 0" card on /kurikulum so learners prime Gemini with the
 * end-to-end CatatanBelajar architecture before starting Modul 1–10.
 */
export function GeminiMasterContextCard() {
  return (
    <section className="mb-10 rounded-2xl border border-rule border-l-4 border-l-accent bg-sheet overflow-hidden">
      <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-paper-2 border-b border-rule">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-accent-soft text-accent border border-rule shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-accent">Langkah 0</span>
              <h2 className="text-sm sm:text-base font-bold text-ink">
                Salin Konteks Proyek ke Gemini (Sekali di Awal Sesi)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-2 mt-1 leading-relaxed max-w-2xl">
              Tempelkan prompt ini di chat Gemini baru sebelum mulai Modul 1–10 agar AI memahami seluruh peta aplikasi{" "}
              <strong className="text-ink">CatatanBelajar</strong> dan tidak melompat ke materi modul berikutnya.
            </p>
          </div>
        </div>

        <CopyButton
          textToCopy={GEMINI_MASTER_CONTEXT_PROMPT}
          label="Salin Master Context"
          copiedLabel="Master Context Tersalin!"
          className="text-xs py-2 px-4 font-bold shrink-0 self-start md:self-center"
        />
      </div>

      <details className="group">
        <summary className="flex items-center justify-between gap-2 px-5 py-3 cursor-pointer list-none text-xs font-semibold text-ink-2 hover:text-ink hover:bg-paper transition-colors select-none">
          <span>Lihat isi Master Context Prompt (Modul 1–10)</span>
          <ChevronDown className="w-4 h-4 text-muted transition-transform group-open:rotate-180" />
        </summary>
        <div className="p-5 bg-ink border-t border-rule">
          <pre className="text-paper font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {GEMINI_MASTER_CONTEXT_PROMPT}
          </pre>
        </div>
      </details>
    </section>
  );
}

