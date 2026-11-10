"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Code2, ArrowRight, ShieldAlert, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    institution: "",
    whatsapp: "",
    password: "",
    confirm_password: "",
    invitation_code: "",
  });

  const [registrationMode, setRegistrationMode] = useState<"open" | "invite_only">("open");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Ambil mode pendaftaran dari tabel site_settings (bukan localStorage)
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase
      .from("site_settings")
      .select("registration_mode")
      .eq("id", "default")
      .single()
      .then(({ data }) => {
        if (data?.registration_mode === "invite_only") {
          setRegistrationMode("invite_only");
        }
      });
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMsg("");

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        if (issue.path[0]) errors[issue.path[0].toString()] = issue.message;
      }
      setFormErrors(errors);
      return;
    }

    // Mode undangan: cek kode undangan ke server (bukan hardcoded di browser)
    if (registrationMode === "invite_only") {
      try {
        const res = await fetch("/api/auth/verify-invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: formData.invitation_code }),
        });
        const result = await res.json();
        if (!result.valid) {
          setFormErrors({
            invitation_code:
              result.message || "Kode undangan tidak valid. Hubungi fasilitator workshop.",
          });
          return;
        }
      } catch {
        setFormErrors({ invitation_code: "Gagal memverifikasi kode undangan." });
        return;
      }
    }

    const supabase = createClient();
    if (!supabase) {
      setFormErrors({
        email:
          "Sistem autentikasi belum dikonfigurasi. Hubungi fasilitator untuk mengaktifkan database.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.full_name,
            institution: formData.institution,
            whatsapp: formData.whatsapp,
          },
        },
      });

      if (error) {
        const msg = error.message.includes("already registered")
          ? "Email ini sudah terdaftar. Silakan masuk atau gunakan email lain."
          : error.message;
        setFormErrors({ email: msg });
        setIsLoading(false);
        return;
      }

      // Jika konfirmasi email masih aktif, tidak ada session
      if (!data.session) {
        setSuccessMsg(
          "Pendaftaran berhasil! Cek email Anda untuk konfirmasi sebelum masuk."
        );
        setIsLoading(false);
        return;
      }

      setSuccessMsg("Pendaftaran berhasil! Mengalihkan ke dashboard...");
      router.refresh();
      setTimeout(() => router.push("/dashboard"), 800);
    } catch (err: any) {
      setFormErrors({ email: err?.message || "Terjadi kesalahan saat mendaftar." });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-lg space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-md">
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
            Pendaftaran Peserta Baru
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Daftar untuk menyimpan progres belajar, sertifikasi, dan pengumpulan karya
          </p>
        </div>

        {registrationMode === "invite_only" && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Mode Pendaftaran Terbatas (Berdasarkan Undangan):</strong>
              <p className="mt-0.5">
                Pendaftaran hanya dibuka bagi peserta yang memiliki kode undangan fasilitator.
              </p>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Nama Lengkap"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            error={formErrors.full_name}
            placeholder="Contoh: Budi Santoso"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Alamat Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={formErrors.email}
              placeholder="email@anda.com"
              autoComplete="email"
              required
            />
            <Input
              label="Nomor WhatsApp"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              error={formErrors.whatsapp}
              placeholder="081234567890"
              required
            />
          </div>

          <Input
            label="Asal Sekolah / Kampus / Nama UMKM"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            error={formErrors.institution}
            placeholder="SMK / Universitas / Nama Usaha"
            required
          />

          {registrationMode === "invite_only" && (
            <Input
              label="Kode Undangan Fasilitator"
              value={formData.invitation_code}
              onChange={(e) =>
                setFormData({ ...formData, invitation_code: e.target.value })
              }
              error={formErrors.invitation_code}
              placeholder="Masukkan kode undangan dari fasilitator"
              required
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={formErrors.password}
              placeholder="Minimal 6 karakter"
              autoComplete="new-password"
              required
            />
            <Input
              label="Konfirmasi Password"
              type="password"
              value={formData.confirm_password}
              onChange={(e) =>
                setFormData({ ...formData, confirm_password: e.target.value })
              }
              error={formErrors.confirm_password}
              placeholder="Ulangi password"
              autoComplete="new-password"
              required
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            isLoading={isLoading}
            className="w-full font-bold mt-2 shadow-md"
          >
            Daftar Sekarang
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Sudah memiliki akun?{" "}
          <Link href="/login" className="font-bold text-sky-600 hover:underline">
            Masuk di Sini
          </Link>
        </div>
      </div>
    </div>
  );
}
