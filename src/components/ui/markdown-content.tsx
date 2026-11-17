import React from "react";

function formatInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-paper-2 border border-rule font-mono text-xs text-ink"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={idx} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

/**
 * Merender konten Markdown ringan (heading ##/###, bold, italic, kode sebaris,
 * blok kode, dan daftar poin/nomor) tanpa ketergantungan library eksternal.
 */
export function MarkdownContent({
  content,
  emptyText = "Belum ada isi materi.",
}: {
  content: string;
  emptyText?: string;
}) {
  if (!content.trim()) {
    return <p className="text-sm text-muted italic">{emptyText}</p>;
  }

  const blocks = content.split(/```([\s\S]*?)```/g);
  return (
    <div className="space-y-3 text-sm sm:text-[15px] text-ink-2 leading-relaxed">
      {blocks.map((block, bIdx) => {
        if (bIdx % 2 === 1) {
          const lines = block.split("\n");
          const codeBody = lines.slice(1).join("\n") || block;
          return (
            <pre
              key={bIdx}
              className="p-4 rounded-xl bg-ink text-paper font-mono text-xs overflow-x-auto border border-umber"
            >
              <code>{codeBody.trim()}</code>
            </pre>
          );
        }

        return block.split("\n").map((line, lIdx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={`${bIdx}-${lIdx}`} className="h-1" />;
          if (trimmed.startsWith("### ")) {
            return (
              <h4 key={`${bIdx}-${lIdx}`} className="text-base font-bold text-ink pt-2">
                {formatInlineMarkdown(trimmed.slice(4))}
              </h4>
            );
          }
          if (trimmed.startsWith("## ")) {
            return (
              <h3 key={`${bIdx}-${lIdx}`} className="text-lg font-extrabold text-ink pt-2">
                {formatInlineMarkdown(trimmed.slice(3))}
              </h3>
            );
          }
          if (trimmed.startsWith("> ")) {
            return (
              <blockquote
                key={`${bIdx}-${lIdx}`}
                className="border-l-2 border-accent pl-3 py-1 bg-paper rounded-r-lg text-ink-2"
              >
                {formatInlineMarkdown(trimmed.slice(2))}
              </blockquote>
            );
          }
          if (/^[-*]\s+/.test(trimmed)) {
            return (
              <div key={`${bIdx}-${lIdx}`} className="flex items-start gap-2 pl-2">
                <span className="text-accent font-bold">•</span>
                <span>{formatInlineMarkdown(trimmed.replace(/^[-*]\s+/, ""))}</span>
              </div>
            );
          }
          if (/^\d+\.\s+/.test(trimmed)) {
            const numMatch = trimmed.match(/^(\d+\.)\s+(.*)$/);
            return (
              <div key={`${bIdx}-${lIdx}`} className="flex items-start gap-2 pl-2">
                <span className="font-mono text-xs font-bold text-accent pt-0.5">
                  {numMatch?.[1]}
                </span>
                <span>{formatInlineMarkdown(numMatch?.[2] || trimmed)}</span>
              </div>
            );
          }
          return <p key={`${bIdx}-${lIdx}`}>{formatInlineMarkdown(trimmed)}</p>;
        });
      })}
    </div>
  );
}

