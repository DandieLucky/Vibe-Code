import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Ganti password peserta/admin.
 *
 * Password lama diverifikasi ulang (signInWithPassword) sebelum diganti,
 * supaya sesi yang dicuri tidak bisa langsung dipakai untuk mengunci
 * pemilik akun yang sebenarnya.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, currentPassword, newPassword } = await req.json();

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json(
        { ok: false, message: "Email, password lama, dan password baru wajib diisi." },
        { status: 400 }
      );
    }

    // Validasi kekuatan password baru
    if (newPassword.length < 8) {
      return NextResponse.json(
        { ok: false, message: "Password baru minimal 8 karakter." },
        { status: 400 }
      );
    }
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Password baru harus mengandung huruf besar, huruf kecil, dan angka.",
        },
        { status: 400 }
      );
    }
    if (newPassword === currentPassword) {
      return NextResponse.json(
        { ok: false, message: "Password baru tidak boleh sama dengan password lama." },
        { status: 400 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) {
      return NextResponse.json(
        { ok: false, message: "Konfigurasi Supabase tidak lengkap di server." },
        { status: 503 }
      );
    }

    const supabase = createClient(url, anon, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // 1. Verifikasi password lama
    const { data: signIn, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

    if (signInError || !signIn.session) {
      return NextResponse.json(
        { ok: false, message: "Password lama salah." },
        { status: 401 }
      );
    }

    // 2. Ganti password memakai sesi user yang bersangkutan
    const userClient = createClient(url, anon, {
      auth: { autoRefreshToken: false, persistSession: false },
      global: { headers: { Authorization: `Bearer ${signIn.session.access_token}` } },
    });

    const { error: updateError } = await userClient.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      return NextResponse.json(
        { ok: false, message: "Gagal mengganti password: " + updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Password berhasil diganti. Silakan login ulang dengan password baru.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Terjadi kesalahan." },
      { status: 500 }
    );
  }
}
