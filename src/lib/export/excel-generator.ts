import * as XLSX from "xlsx";
import type { WorkSubmission } from "../../types/database.ts";
import { formatDate } from "../utils.ts";

export interface ExportFilterOptions {
  status?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export function filterSubmissionsForExport(
  submissions: WorkSubmission[],
  options: ExportFilterOptions
): WorkSubmission[] {
  return submissions.filter((sub) => {
    // Filter by status
    if (options.status && options.status !== "all" && sub.submission_status !== options.status) {
      return false;
    }

    // Filter by date range
    if (options.startDate) {
      const subDate = new Date(sub.submitted_at);
      const start = new Date(options.startDate);
      if (subDate < start) return false;
    }
    if (options.endDate) {
      const subDate = new Date(sub.submitted_at);
      const end = new Date(options.endDate);
      end.setHours(23, 59, 59, 999);
      if (subDate > end) return false;
    }

    // Search filter
    if (options.searchTerm) {
      const q = options.searchTerm.toLowerCase();
      const matchName = sub.full_name?.toLowerCase().includes(q);
      const matchEmail = sub.email?.toLowerCase().includes(q);
      const matchInst = sub.institution?.toLowerCase().includes(q);
      const matchTitle = sub.project_title?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchInst && !matchTitle) return false;
    }

    return true;
  });
}

export function formatSubmissionStatus(status: string): string {
  switch (status) {
    case "accepted":
      return "Diterima (Lulus)";
    case "revision_needed":
      return "Perlu Revisi";
    case "rejected":
      return "Ditolak";
    case "pending":
    default:
      return "Menunggu Pemeriksaan";
  }
}

export function generateExcelBuffer(submissions: WorkSubmission[]): Buffer {
  const rows = submissions.map((sub, index) => ({
    No: index + 1,
    "Nama Lengkap": sub.full_name || "-",
    Email: sub.email || "-",
    WhatsApp: sub.whatsapp || "-",
    "Asal Institusi / Sekolah": sub.institution || "-",
    "Judul Proyek": sub.project_title || "-",
    "Modul Diselesaikan": Array.isArray(sub.completed_modules)
      ? sub.completed_modules.join(", ")
      : sub.completed_modules || "-",
    "Link Repository GitHub": sub.github_url || "-",
    "Link Deployment Vercel": sub.deployment_url || "-",
    "Screenshot URL": sub.screenshot_url || "-",
    "Dokumen Lampiran": sub.attachment_url || "-",
    "Status Penilaian": formatSubmissionStatus(sub.submission_status),
    "Nilai / Skor": sub.score !== undefined && sub.score !== null ? sub.score : "-",
    "Catatan Review Admin": sub.admin_notes || "-",
    "Tanggal Pengumpulan": formatDate(sub.submitted_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto-width columns for neat readability
  const colWidths = [
    { wch: 5 },  // No
    { wch: 25 }, // Nama
    { wch: 25 }, // Email
    { wch: 18 }, // WhatsApp
    { wch: 25 }, // Institusi
    { wch: 30 }, // Judul
    { wch: 30 }, // Modul
    { wch: 45 }, // GitHub
    { wch: 45 }, // Vercel
    { wch: 40 }, // Screenshot
    { wch: 40 }, // Attachment
    { wch: 25 }, // Status
    { wch: 12 }, // Skor
    { wch: 35 }, // Catatan
    { wch: 22 }, // Tanggal
  ];
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Kumpulan Karya Peserta");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  return buffer;
}

export function generateCsvString(submissions: WorkSubmission[]): string {
  const rows = submissions.map((sub, index) => ({
    No: index + 1,
    "Nama Lengkap": `"${(sub.full_name || "").replace(/"/g, '""')}"`,
    Email: `"${(sub.email || "").replace(/"/g, '""')}"`,
    WhatsApp: `"${(sub.whatsapp || "").replace(/"/g, '""')}"`,
    "Asal Institusi": `"${(sub.institution || "").replace(/"/g, '""')}"`,
    "Judul Proyek": `"${(sub.project_title || "").replace(/"/g, '""')}"`,
    "Link GitHub": `"${(sub.github_url || "").replace(/"/g, '""')}"`,
    "Link Deployment": `"${(sub.deployment_url || "").replace(/"/g, '""')}"`,
    "Status Penilaian": `"${formatSubmissionStatus(sub.submission_status)}"`,
    "Skor": sub.score !== undefined && sub.score !== null ? sub.score : "",
    "Catatan Admin": `"${(sub.admin_notes || "").replace(/"/g, '""')}"`,
    "Tanggal Pengumpulan": `"${formatDate(sub.submitted_at)}"`,
  }));

  const headers = [
    "No",
    "Nama Lengkap",
    "Email",
    "WhatsApp",
    "Asal Institusi",
    "Judul Proyek",
    "Link GitHub",
    "Link Deployment",
    "Status Penilaian",
    "Skor",
    "Catatan Admin",
    "Tanggal Pengumpulan",
  ];

  const csvRows = [headers.join(",")];
  for (const r of rows) {
    csvRows.push(
      [
        r.No,
        r["Nama Lengkap"],
        r.Email,
        r.WhatsApp,
        r["Asal Institusi"],
        r["Judul Proyek"],
        r["Link GitHub"],
        r["Link Deployment"],
        r["Status Penilaian"],
        r.Skor,
        r["Catatan Admin"],
        r["Tanggal Pengumpulan"],
      ].join(",")
    );
  }

  return csvRows.join("\n");
}
