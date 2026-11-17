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
    <div className="rounded-xl border border-umber bg-ink overflow-hidden my-4">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-umber/70 border-b border-umber text-xs text-paper-3">
        <div className="flex items-center gap-2 font-mono">
          <FileCode className="w-3.5 h-3.5 text-accent-2" />
          <span className="font-semibold text-sheet">
            {filename || `example.${language}`}
          </span>
          <span className="text-[11px] text-paper-3/80">
            {language}
          </span>
        </div>
        <CopyButton
          textToCopy={code}
          variant="outline"
          label="Salin Kode"
          copiedLabel="Tersalin!"
          className="bg-ink border-umber text-paper-3 hover:bg-umber hover:text-sheet py-1 px-2.5 text-[11px]"
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
