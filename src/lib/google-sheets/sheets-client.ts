import { google } from "googleapis";
import { WorkSubmission } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { formatSubmissionStatus } from "@/lib/export/excel-generator";

export interface SyncResult {
  success: boolean;
  syncedCount: number;
  message: string;
  error?: string;
}

export function isGoogleSheetsConfigured(): boolean {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  return (
    !!clientEmail &&
    !!privateKey &&
    !!spreadsheetId &&
    !clientEmail.includes("your-service-account") &&
    !spreadsheetId.includes("your-google-spreadsheet-id")
  );
}

export async function syncSubmissionsToGoogleSheets(
  submissions: WorkSubmission[],
  spreadsheetIdOverride?: string
): Promise<SyncResult> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = spreadsheetIdOverride || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    return {
      success: false,
      syncedCount: 0,
      message:
        "Integrasi Google Sheets belum dikonfigurasi. Silakan isi kredensial di pengaturan admin atau file .env.local.",
    };
  }

  // Format private key properly for newline escaped characters in .env
  privateKey = privateKey.replace(/\\n/g, "\n");

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Header row
    const headers = [
      "ID Karya",
      "Nama Lengkap",
      "Email",
      "WhatsApp",
      "Institusi",
      "Judul Proyek",
      "Modul Selesai",
      "Link GitHub",
      "Link Deployment Vercel",
      "Status Penilaian",
      "Skor",
      "Catatan Admin",
      "Waktu Pengumpulan",
      "Terakhir Diperbarui",
    ];

    // Data rows
    const rows = submissions.map((sub) => [
      sub.id,
      sub.full_name || "",
      sub.email || "",
      sub.whatsapp || "",
      sub.institution || "",
      sub.project_title || "",
      Array.isArray(sub.completed_modules) ? sub.completed_modules.join(", ") : sub.completed_modules || "",
      sub.github_url || "",
      sub.deployment_url || "",
      formatSubmissionStatus(sub.submission_status),
      sub.score !== undefined && sub.score !== null ? sub.score : "",
      sub.admin_notes || "",
      formatDate(sub.submitted_at),
      formatDate(sub.updated_at),
    ]);

    // To prevent duplicate rows and keep clean sync, we update the entire sheet range starting at A1
    const values = [headers, ...rows];

    // Check sheet status / clear previous content or overwrite range
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1:N" + (values.length + 5),
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return {
      success: true,
      syncedCount: submissions.length,
      message: `Berhasil menyinkronkan ${submissions.length} karya peserta ke Google Spreadsheet.`,
    };
  } catch (err: any) {
    console.error("Google Sheets Sync Error:", err);
    return {
      success: false,
      syncedCount: 0,
      message: `Gagal menyinkronkan ke Google Sheets: ${err?.message || "Kesalahan jaringan"}`,
      error: err?.message,
    };
  }
}
