import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "teal" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-ink text-sheet hover:bg-umber focus-visible:ring-accent shadow-sm",
      secondary:
        "bg-paper-2 text-ink hover:bg-paper-3 focus-visible:ring-accent",
      outline:
        "border border-rule bg-sheet text-ink hover:bg-paper-2 focus-visible:ring-accent",
      ghost:
        "text-ink-2 hover:bg-paper-2 hover:text-ink focus-visible:ring-accent",
      danger:
        "bg-rose-600 text-sheet hover:bg-rose-700 focus-visible:ring-rose-500 shadow-sm",
      teal:
        "bg-umber text-sheet hover:bg-ink focus-visible:ring-accent shadow-sm",
      accent:
        "bg-accent text-sheet hover:bg-rubber-lo focus-visible:ring-accent shadow-sm",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-6 py-3 gap-2.5 font-semibold",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
