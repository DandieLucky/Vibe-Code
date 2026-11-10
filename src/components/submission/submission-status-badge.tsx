import React from "react";
import { SubmissionStatus } from "@/types/database";
import { Clock, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmissionStatusBadgeProps {
  status: SubmissionStatus | string;
  className?: string;
  showIcon?: boolean;
}

export function SubmissionStatusBadge({
  status,
  className,
  showIcon = true,
}: SubmissionStatusBadgeProps) {
  const configs: Record<
    string,
    { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    pending: {
      label: "Menunggu Pemeriksaan",
      bg: "bg-amber-50",
      text: "text-amber-800",
      border: "border-amber-300",
      icon: Clock,
    },
    accepted: {
      label: "Diterima (Lulus)",
      bg: "bg-emerald-50",
      text: "text-emerald-800",
      border: "border-emerald-300",
      icon: CheckCircle2,
    },
    revision_needed: {
      label: "Perlu Revisi",
      bg: "bg-orange-50",
      text: "text-orange-800",
      border: "border-orange-300",
      icon: AlertTriangle,
    },
    rejected: {
      label: "Ditolak",
      bg: "bg-rose-50",
      text: "text-rose-800",
      border: "border-rose-300",
      icon: XCircle,
    },
  };

  const config = configs[status] || configs.pending;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-2xs",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{config.label}</span>
    </span>
  );
}
