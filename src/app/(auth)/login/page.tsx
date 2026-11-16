"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, GraduationCap, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (searchParams.get("ganti") === "sukses") {
      setNotice("Password berhasil diganti. Silakan masuk dengan password baru Anda.");
    }
    if (searchParams.get("daftar") === "sukses") {
      setNotice("Pendaftaran berhasil! Silakan masuk dengan akun Anda.");
    }
    if (searchParams.get("redirect")) {
      setNotice("Silakan masuk dulu untuk membuka halaman tersebut.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setIsLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase belum dikonfigurasi. Hubungi fasilitator.");
      setIsLoading(false);
      return;
    }

    // Rapikan spasi yang tidak sengaja ikut tersalin (paling sering dari
    // copy-paste password di file atau WhatsApp). Tanpa ini, login ditolak
    // dengan pesan "password salah" padahal passwordnya benar.
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });

    if (signInError) {
      if (signInError.message.includes("Invalid login credentials")) {
        const adaSpasi = password !== cleanPassword || email !== cleanEmail;
        setError(
          adaSpasi
            ? "Email atau password salah. Catatan: password Anda tadi mengandung spasi di awal/akhir — sudah otomatis dibersihkan, silakan coba lagi."
            : "Email atau password salah. Periksa kembali. Tip: salin password dengan klik-3x pada kata, jangan menyeret dari ujung baris."
        );
      } else {
        setError(signInError.message);
      }
      setIsLoading(false);
      return;
    }

    // Arahkan sesuai peran: admin ke portal admin, peserta ke dashboard
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, must_change_password")
      .eq("id", data.user.id)
      .single();

    // Password sementara dari fasilitator → wajib diganti dulu
    if (profile?.must_change_password) {
      router.push("/profil?ganti-password=wajib");
      router.refresh();
      return;
    }

    const explicit = searchParams.get("redirect");
    const target =
      explicit ? explicit :
      profile?.role === "admin" || profile?.role === "instructor" ? "/admin" : "/dashboard";

    router.push(target);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
            <div className="h-11 w-11 rounded-2xl bg-accent flex items-center justify-center shadow-sm">
              <GraduationCap className="w-6 h-6 text-sheet" />
            </div>
            <span className="text-2xl font-extrabold text-ink tracking-tight">COMPOSELAB</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-ink">Masuk ke Akun Anda</h1>
          <p className="mt-1.5 text-sm text-muted">
            Satu pintu untuk siswa dan fasilitator
          </p>
        </div>

        {/* Penjelasan: satu form untuk dua peran */}
        <div className="mb-5 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-rule bg-paper-2 p-3">
            <GraduationCap className="w-4 h-4 text-accent mb-1.5" />
            <p className="text-[11px] font-bold text-ink">Siswa</p>
            <p className="text-[10px] text-ink-2 leading-snug">
              Buka kurikulum, simpan progres, kumpulkan karya
            </p>
          </div>
          <div className="rounded-xl border border-rule bg-sheet p-3">
            <ShieldCheck className="w-4 h-4 text-ink-2 mb-1.5" />
            <p className="text-[11px] font-bold text-ink">Administrator</p>
            <p className="text-[10px] text-muted leading-snug">
              Kelola karya, penilaian, dan pengaturan
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 shadow-xs">
          {notice && (
            <div className="mb-5 p-3 rounded-xl bg-paper-2 border border-rule text-xs text-ink flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>{notice}</span>
            </div>
          )}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-[38px] w-4 h-4 text-muted pointer-events-none" />
              <Input
                label="Alamat Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="pl-10"
                autoComplete="email"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-[38px] w-4 h-4 text-muted pointer-events-none" />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password Anda"
                className="pl-10"
                autoComplete="current-password"
                required
              />
            </div>

            <Button type="submit" variant="accent" size="lg" isLoading={isLoading} className="w-full font-bold">
              <LogIn className="w-4 h-4 mr-1.5" />
              Masuk
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-rule text-center">
            <p className="text-xs text-muted mb-3">
              Belum punya akun? Pendaftaran terbuka untuk siswa.
            </p>
            <Link href="/register">
              <Button variant="outline" size="sm" className="w-full font-semibold">
                Daftar Sebagai Siswa
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-muted">
          Akun administrator dibuat oleh fasilitator. Jika Anda siswa,
          silakan daftar sendiri lewat tombol di atas.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <LoginForm />
    </Suspense>
  );
}
