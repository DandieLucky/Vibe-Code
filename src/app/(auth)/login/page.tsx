"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Code2, ArrowRight, Check, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { loginSchema } from "@/lib/validations";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message ?? "Data login tidak valid.");
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setErrorMsg(
        "Sistem autentikasi belum dikonfigurasi. Hubungi fasilitator untuk mengaktifkan database."
      );
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });

      if (error) {
        // Terjemahkan pesan error Supabase ke Bahasa Indonesia
        const msg =
          error.message === "Invalid login credentials"
            ? "Email atau password salah."
            : error.message === "Email not confirmed"
            ? "Email belum dikonfirmasi. Hubungi fasilitator."
            : error.message;
        setErrorMsg(msg);
        setIsLoading(false);
        return;
      }

      // Arahkan admin ke panel admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const isStaff = profile?.role === "admin" || profile?.role === "instructor";
      const target = isStaff && redirectTo === "/dashboard" ? "/admin" : redirectTo;

      setSuccessMsg("Login berhasil! Mengalihkan...");
      router.refresh();
      setTimeout(() => router.push(target), 400);
    } catch (err: any) {
      setErrorMsg(err?.message || "Terjadi kesalahan saat masuk.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-md">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center font-bold">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">
              VIBE CODE
            </span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Masuk ke Akun Anda
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Akses progres kurikulum, riwayat catatan, dan kumpulan karya
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-semibold flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Alamat Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            autoComplete="email"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full font-bold mt-2 shadow-md"
          >
            Masuk Sekarang
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Belum memiliki akun?{" "}
          <Link href="/register" className="font-bold text-sky-600 hover:underline">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
          <p className="text-sm text-slate-500">Memuat halaman masuk...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
