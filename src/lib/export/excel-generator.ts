import ExcelJS from "exceljs";
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

export async function generateExcelBuffer(submissions: WorkSubmission[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Kumpulan Karya Peserta");

  worksheet.columns = [
    { header: "No", key: "no", width: 5 },
    { header: "Nama Lengkap", key: "full_name", width: 25 },
    { header: "Email", key: "email", width: 25 },
    { header: "WhatsApp", key: "whatsapp", width: 18 },
    { header: "Asal Institusi / Sekolah", key: "institution", width: 25 },
    { header: "Judul Proyek", key: "project_title", width: 30 },
    { header: "Modul Diselesaikan", key: "completed_modules", width: 30 },
    { header: "Link Repository GitHub", key: "github_url", width: 45 },
    { header: "Link APK / Rilis", key: "apk_url", width: 45 },
    { header: "Link Video Demo", key: "demo_video_url", width: 40 },
    { header: "Screenshot URL", key: "screenshot_url", width: 40 },
    { header: "Dokumen Lampiran", key: "attachment_url", width: 40 },
    { header: "Status Penilaian", key: "submission_status", width: 25 },
    { header: "Nilai / Skor", key: "score", width: 12 },
    { header: "Catatan Review Admin", key: "admin_notes", width: 35 },
    { header: "Tanggal Pengumpulan", key: "submitted_at", width: 22 },
  ];

  submissions.forEach((sub, index) => {
    worksheet.addRow({
      no: index + 1,
      full_name: sub.full_name || "-",
      email: sub.email || "-",
      whatsapp: sub.whatsapp || "-",
      institution: sub.institution || "-",
      project_title: sub.project_title || "-",
      completed_modules: Array.isArray(sub.completed_modules)
        ? sub.completed_modules.join(", ")
        : sub.completed_modules || "-",
      github_url: sub.github_url || "-",
      apk_url: sub.apk_url || sub.deployment_url || "-",
      demo_video_url: sub.demo_video_url || "-",
      screenshot_url: sub.screenshot_url || "-",
      attachment_url: sub.attachment_url || "-",
      submission_status: formatSubmissionStatus(sub.submission_status),
      score: sub.score !== undefined && sub.score !== null ? sub.score : "-",
      admin_notes: sub.admin_notes || "-",
      submitted_at: formatDate(sub.submitted_at),
    });
  });

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
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
    "Link APK": `"${(sub.apk_url || sub.deployment_url || "").replace(/"/g, '""')}"`,
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
    "Link APK",
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
        r["Link APK"],
        r["Status Penilaian"],
        r.Skor,
        r["Catatan Admin"],
        r["Tanggal Pengumpulan"],
      ].join(",")
    );
  }

  return csvRows.join("\n");
}
