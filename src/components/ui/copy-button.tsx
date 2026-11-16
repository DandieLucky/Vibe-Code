"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: "pill" | "icon" | "outline" | "solid";
}

export function CopyButton({
  textToCopy,
  label = "Salin Prompt",
  copiedLabel = "Tersalin!",
  className,
  variant = "pill",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for non-https or older browser context
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin teks:", err);
    }
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Salin ke clipboard"
        className={cn(
          "inline-flex items-center justify-center h-8 w-8 rounded-lg border transition-colors duration-200 focus:outline-none",
          copied
            ? "bg-emerald-50 border-emerald-300 text-emerald-600"
            : "bg-sheet border-rule text-ink-2 hover:bg-paper-2 hover:text-ink",
          className
        )}
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
      </button>
    );
  }

  if (variant === "outline") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors duration-200 focus:outline-none",
          copied
            ? "bg-emerald-50 border-emerald-400 text-emerald-700"
            : "bg-sheet border-rule text-ink-2 hover:bg-paper-2",
          className
        )}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>{copiedLabel}</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-muted" />
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  // Default "pill" or "solid"
  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-colors duration-200 active:scale-95",
        copied
          ? "bg-emerald-600 text-sheet hover:bg-emerald-700 ring-2 ring-emerald-300"
          : "bg-accent text-sheet hover:bg-rubber-lo",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-sheet" />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-accent-soft" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
