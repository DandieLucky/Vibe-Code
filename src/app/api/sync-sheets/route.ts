import { NextRequest, NextResponse } from "next/server";
import { syncSubmissionsToGoogleSheets, isGoogleSheetsConfigured } from "@/lib/google-sheets/sheets-client";
import { WorkSubmission } from "@/types/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { submissions = [], spreadsheetId } = body;

    const result = await syncSubmissionsToGoogleSheets(submissions, spreadsheetId);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    });
  } catch (err: any) {
    console.error("API Sync Sheets Error:", err);
    return NextResponse.json(
      {
        success: false,
        syncedCount: 0,
        message: err?.message || "Terjadi kesalahan internal saat sinkronisasi Google Sheets.",
      },
      { status: 500 }
    );
  }
}
