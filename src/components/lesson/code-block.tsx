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
    <div className="rounded-xl border border-ink-2 bg-ink overflow-hidden shadow-md my-4">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-ink border-b border-ink-2 text-xs text-paper-3">
        <div className="flex items-center gap-2 font-mono">
          <FileCode className="w-3.5 h-3.5 text-accent-2" />
          <span className="font-semibold text-paper-3">
            {filename || `example.${language}`}
          </span>
          <span className="text-[10px] text-muted bg-ink px-1.5 py-0.5 rounded">
            {language}
          </span>
        </div>
        <CopyButton
          textToCopy={code}
          variant="outline"
          label="Salin Kode"
          copiedLabel="Tersalin!"
          className="bg-ink border-ink-2 text-paper-3 hover:bg-ink-2 hover:text-sheet py-1 px-2.5 text-[11px]"
        />
      </div>

      {/* Code contents */}
      <div className="p-4 overflow-x-auto text-xs font-mono text-paper-3 leading-relaxed">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
