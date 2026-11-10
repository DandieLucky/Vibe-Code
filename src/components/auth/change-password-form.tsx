"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ShieldCheck, AlertTriangle, Check, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

interface Props {
  email: string;
  /** true = dipaksa ganti password sebelum boleh memakai platform */
  forced?: boolean;
}

export function ChangePasswordForm({ email, forced = false }: Props) {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Indikator kekuatan password
  const checks = [
    { label: "Minimal 8 karakter", ok: next.length >= 8 },
    { label: "Huruf besar (A-Z)", ok: /[A-Z]/.test(next) },
    { label: "Huruf kecil (a-z)", ok: /[a-z]/.test(next) },
    { label: "Angka (0-9)", ok: /[0-9]/.test(next) },
  ];
  const passed = checks.filter((c) => c.ok).length;
  const strengthPct = (passed / checks.length) * 100;
  const strengthLabel = ["Sangat lemah", "Lemah", "Cukup", "Kuat", "Sangat kuat"][passed];
  const strengthColor = ["bg-rose-500", "bg-orange-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"][passed];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (next !== confirm) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    if (passed < 4) {
      setError("Password baru belum memenuhi semua syarat keamanan.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, currentPassword: current, newPassword: next }),
      });
      const result = await res.json();

      if (!result.ok) {
        setError(result.message || "Gagal mengganti password.");
        setIsLoading(false);
        return;
      }

      setSuccess(
        forced
          ? "Password berhasil diganti! Keluar otomatis dalam 3 detik, lalu login dengan password baru."
          : "Password berhasil diganti. Silakan login ulang dengan password baru."
      );

      // Paksa login ulang supaya sesi lama (dengan password sementara) tidak berlaku
      setTimeout(async () => {
        const supabase = createClient();
        if (supabase) await supabase.auth.signOut();
        router.push(forced ? "/login?ganti=sukses" : "/login");
        router.refresh();
      }, 3000);
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan.");
      setIsLoading(false);
    }
  };

  return (
    <div className={`rounded-2xl border bg-white p-6 sm:p-8 shadow-xs ${forced ? "border-amber-300 ring-2 ring-amber-100" : "border-slate-200"}`}>
      <div className="flex items-start gap-3 mb-5">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${forced ? "bg-amber-100 text-amber-700" : "bg-slate-900 text-sky-400"}`}>
          {forced ? <AlertTriangle className="w-5 h-5" /> : <KeyRound className="w-5 h-5" />}
        </div>
        <div>
          <h2 className="font-bold text-slate-900">
            {forced ? "Ganti Password Anda Sekarang" : "Ganti Password"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {forced
              ? "Akun Anda dibuatkan fasilitator dengan password sementara. Demi keamanan, ganti sekarang. Anda tidak bisa memakai platform sebelum ini selesai."
              : "Gunakan password yang kuat dan tidak dipakai di layanan lain."}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Password Saat Ini"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="Password sementara dari fasilitator"
          autoComplete="current-password"
          required
        />

        <div>
          <Input
            label="Password Baru"
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            placeholder="Minimal 8 karakter"
            autoComplete="new-password"
            required
          />
          {next && (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full ${strengthColor} transition-all duration-300`} style={{ width: `${strengthPct}%` }} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 w-20 text-right">{strengthLabel}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {checks.map((c) => (
                  <span key={c.label} className={`text-[10px] flex items-center gap-1 ${c.ok ? "text-emerald-600" : "text-slate-400"}`}>
                    {c.ok ? <Check className="w-3 h-3" /> : <span className="w-3 h-3 text-center">·</span>}
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <Input
          label="Ulangi Password Baru"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Ketik ulang password baru"
          autoComplete="new-password"
          required
        />

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="flex-1 font-bold">
            <ShieldCheck className="w-4 h-4 mr-1.5" />
            Simpan Password Baru
          </Button>
          {!forced && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={async () => {
                const supabase = createClient();
                if (supabase) await supabase.auth.signOut();
                router.push("/");
                router.refresh();
              }}
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Keluar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
