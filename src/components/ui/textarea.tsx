import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, helperText, id, rows = 4, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-ink-2"
          >
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={inputId}
          rows={rows}
          ref={ref}
          className={cn(
            "w-full rounded-lg border bg-sheet px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-paper-2 disabled:text-muted",
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
              : "border-rule focus:border-accent focus:ring-accent-soft",
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-muted">{helperText}</p>
        )}
        {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
