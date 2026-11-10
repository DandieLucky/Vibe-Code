import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Verifikasi kode undangan pendaftaran.
 *
 * Kode undangan dibaca dari environment variable INVITATION_CODES
 * (dipisah koma), BUKAN di-hardcode di bundle browser. Ini mencegah
 * peserta menemukan kode undangan lewat DevTools.
 *
 * Set di Vercel: INVITATION_CODES=KODE1,KODE2
 */
export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { valid: false, message: "Kode undangan wajib diisi." },
        { status: 400 }
      );
    }

    const raw = process.env.INVITATION_CODES || "";
    const validCodes = raw
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    if (validCodes.length === 0) {
      return NextResponse.json({
        valid: false,
        message:
          "Mode undangan aktif tetapi belum ada kode yang dikonfigurasi. Hubungi fasilitator.",
      });
    }

    const isValid = validCodes.some(
      (valid) => valid.toLowerCase() === code.trim().toLowerCase()
    );

    // Catat percobaan (best-effort, tidak menggagalkan request jika log rusak)
    const admin = createAdminClient();
    if (admin) {
      await admin
        .from("integration_logs")
        .insert({
          service_name: "registration",
          event_type: "invite_code_check",
          status: isValid ? "success" : "failed",
          payload: { code_length: code.length },
        })
        .then(
          () => {},
          () => {}
        );
    }

    return NextResponse.json({
      valid: isValid,
      message: isValid ? "" : "Kode undangan tidak valid. Hubungi fasilitator workshop.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { valid: false, message: "Terjadi kesalahan saat memverifikasi kode." },
      { status: 500 }
    );
  }
}
