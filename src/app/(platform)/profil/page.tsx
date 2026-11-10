"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Mail, Phone, School, ShieldCheck, KeyRound, Check, ChevronRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ProfilPage() {
  const [profile, setProfile] = useState({
    fullName: "Budi Santoso",
    email: "budi@contoh.com",
    whatsapp: "081234567890",
    institution: "SMK / Universitas / Pelaku UMKM",
    avatarUrl: "",
  });

  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vibe_user_profile");
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("vibe_user_profile", JSON.stringify(profile));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (passwordState.newPassword.length < 6) {
      setPasswordError("Password baru minimal 6 karakter.");
      return;
    }
    if (passwordState.newPassword !== passwordState.confirmPassword) {
      setPasswordError("Konfirmasi password tidak cocok.");
      return;
    }

    setPasswordSuccess(true);
    setPasswordState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-800">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/dashboard" className="hover:text-slate-800">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800">Pengaturan Profil</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pengaturan Akun & Profil
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola data diri, institusi, kontak WhatsApp, dan keamanan password Anda.
          </p>
        </div>

        <div className="space-y-8">
          {/* Card 1: Biodata Profil */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Informasi Pribadi & Kontak
                  </h2>
                  <p className="text-xs text-slate-500">
                    Data ini akan otomatis tercantum pada formulir pengumpulan karya.
                  </p>
                </div>
              </div>
              {savedSuccess && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                  <Check className="w-4 h-4" /> Berhasil Disimpan!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nama Lengkap"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  required
                />
                <Input
                  label="Alamat Email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nomor WhatsApp (Aktif)"
                  value={profile.whatsapp}
                  onChange={(e) =>
                    setProfile({ ...profile, whatsapp: e.target.value })
                  }
                  placeholder="08xxxxxxxxxx atau 628xxxxxxxxxx"
                  required
                />
                <Input
                  label="Asal Sekolah / Kampus / Usaha UMKM"
                  value={profile.institution}
                  onChange={(e) =>
                    setProfile({ ...profile, institution: e.target.value })
                  }
                  required
                />
              </div>

              <div className="pt-3 flex justify-end">
                <Button type="submit" variant="accent" className="font-bold gap-2">
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </div>

          {/* Card 2: Pengaturan Password */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Ganti Password
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pastikan menggunakan kombinasi password yang kuat dan aman.
                  </p>
                </div>
              </div>
              {passwordSuccess && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                  <Check className="w-4 h-4" /> Password Berhasil Diperbarui!
                </span>
              )}
            </div>

            {passwordError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200">
                {passwordError}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                label="Password Saat Ini"
                type="password"
                value={passwordState.oldPassword}
                onChange={(e) =>
                  setPasswordState({
                    ...passwordState,
                    oldPassword: e.target.value,
                  })
                }
                placeholder="••••••••"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Password Baru"
                  type="password"
                  value={passwordState.newPassword}
                  onChange={(e) =>
                    setPasswordState({
                      ...passwordState,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="Minimal 6 karakter"
                  required
                />
                <Input
                  label="Konfirmasi Password Baru"
                  type="password"
                  value={passwordState.confirmPassword}
                  onChange={(e) =>
                    setPasswordState({
                      ...passwordState,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Ulangi password baru"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end">
                <Button type="submit" variant="primary" className="font-bold">
                  Perbarui Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
