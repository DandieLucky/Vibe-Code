import { NextRequest, NextResponse } from "next/server";
import { generateExcelBuffer, generateCsvString, filterSubmissionsForExport } from "@/lib/export/excel-generator";
import { WorkSubmission } from "@/types/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { format = "xlsx", submissions = [], filter = {} } = body;

    const filteredData: WorkSubmission[] = filterSubmissionsForExport(submissions, filter);

    if (format === "csv") {
      const csvString = generateCsvString(filteredData);
      return new NextResponse(csvString, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="kumpulan_karya_${Date.now()}.csv"`,
        },
      });
    }

    // Default: Excel .xlsx
    const excelBuffer = generateExcelBuffer(filteredData);

    return new NextResponse(excelBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="kumpulan_karya_${Date.now()}.xlsx"`,
      },
    });
  } catch (err: any) {
    console.error("Export API Error:", err);
    return NextResponse.json(
      { error: "Gagal membuat berkas ekspor", details: err?.message },
      { status: 500 }
    );
  }
}
