"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Code2, Lock, Mail, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Check credentials: if demo admin or standard user
      if (email === "admin@vibecode.id" && password === "admin123") {
        setSuccessMsg("Login berhasil! Mengalihkan ke Dashboard Admin...");
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
        return;
      }

      // Demo student login
      if (email.includes("@") && password.length >= 6) {
        // Save demo session
        localStorage.setItem(
          "vibe_user_profile",
          JSON.stringify({
            fullName: email.split("@")[0].toUpperCase(),
            email: email,
            whatsapp: "081234567890",
            institution: "Peserta Terdaftar",
            role: "student",
          })
        );
        setSuccessMsg("Login berhasil! Mengalihkan ke Dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setErrorMsg("Email atau password tidak valid (password minimal 6 karakter).");
        setIsLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan saat masuk.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-md">
        {/* Brand header */}
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
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-semibold">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Demo Credentials Helper Pill */}
        <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 text-xs text-sky-950 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-sky-900">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Akun Uji Coba Cepat (Demo Mode):</span>
          </div>
          <div className="text-[11px] font-mono text-slate-700 pl-5">
            • Admin: <span className="text-sky-800 font-bold">admin@vibecode.id</span> / <span className="text-sky-800 font-bold">admin123</span>
            <br />
            • Siswa: Masukkan email & password apapun (min. 6 digit)
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Alamat Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
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
