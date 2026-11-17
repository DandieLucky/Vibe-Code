import { NextResponse } from "next/server";
import { getCurriculumModules } from "@/lib/data-access/curriculum";

export const dynamic = "force-dynamic";

export async function GET() {
  const modules = await getCurriculumModules({ includeUnpublished: false });
  return NextResponse.json({ modules });
}

