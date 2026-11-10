"use client";

import React, { useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { FileCode } from "lucide-react";

interface CodeBlockProps {
  filename?: string;
  language?: string;
  code: string;
}

export function CodeBlock({
  filename,
  language = "typescript",
  code,
}: CodeBlockProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-md my-4">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-2 font-mono">
          <FileCode className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold text-slate-200">
            {filename || `example.${language}`}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
            {language}
          </span>
        </div>
        <CopyButton
          textToCopy={code}
          variant="outline"
          label="Salin Kode"
          copiedLabel="Tersalin!"
          className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white py-1 px-2.5 text-[11px]"
        />
      </div>

      {/* Code contents */}
      <div className="p-4 overflow-x-auto text-xs font-mono text-slate-100 leading-relaxed">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
