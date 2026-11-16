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
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-[#2B211B] text-[#FDFBF7] hover:bg-[#3F3128] focus-visible:ring-[#C4552D] shadow-sm",
      secondary:
        "bg-[#F3ECE2] text-[#2B211B] hover:bg-[#E6DDD2] focus-visible:ring-[#C4552D]",
      outline:
        "border border-[#D8CCBE] bg-[#FDFBF7] text-[#2B211B] hover:bg-[#F3ECE2] focus-visible:ring-[#C4552D]",
      ghost:
        "text-[#5D4E43] hover:bg-[#F3ECE2] hover:text-[#2B211B] focus-visible:ring-[#C4552D]",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 shadow-sm",
      teal:
        "bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-600 shadow-sm",
      accent:
        "bg-[#C4552D] text-[#FDFBF7] hover:bg-[#A94420] focus-visible:ring-[#C4552D] shadow-sm",
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
