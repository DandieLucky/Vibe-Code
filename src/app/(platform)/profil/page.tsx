"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, School, ShieldCheck, ChevronRight, Save, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { ChangePasswordForm } from "@/components/auth/change-password-form";

interface ProfileState {
  full_name: string;
  email: string;
  whatsapp: string;
  institution: string;
  role: string;
  must_change_password: boolean;
}

export default function ProfilPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      if (!supabase) {
        setErrorMsg("Supabase belum dikonfigurasi, profil tidak dapat dimuat.");
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/profil");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, email, whatsapp, institution, role, must_change_password")
        .eq("id", user.id)
        .single();

      setProfile({
        full_name: data?.full_name ?? "",
        email: data?.email ?? user.email ?? "",
        whatsapp: data?.whatsapp ?? "",
        institution: data?.institution ?? "",
        role: data?.role ?? "student",
        must_change_password: data?.must_change_password ?? false,
      });
      setLoading(false);
    })();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setErrorMsg("");
    setSavedMsg("");
    setSaving(true);

    const supabase = createClient();
    if (!supabase) {
      setErrorMsg("Supabase belum dikonfigurasi.");
      setSaving(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setErrorMsg("Sesi berakhir, silakan login ulang.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        whatsapp: profile.whatsapp || null,
        institution: profile.institution || null,
      })
      .eq("id", user.id);

    if (error) {
      setErrorMsg("Gagal menyimpan: " + error.message);
    } else {
      setSavedMsg("Profil berhasil disimpan.");
      router.refresh();
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-500">Memuat profil...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <p className="text-sm text-slate-600">{errorMsg || "Profil tidak dapat dimuat."}</p>
          <Link href="/login" className="inline-block mt-4">
            <Button variant="primary" size="sm">Masuk</Button>
          </Link>
        </div>
      </div>
    );
  }

  const roleLabel =
    profile.role === "admin" ? "Administrator" :
    profile.role === "instructor" ? "Instruktur" : "Peserta";

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-800">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800">Pengaturan Profil</span>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {profile.full_name || "Peserta"}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={profile.role === "admin" ? "teal" : "default"} className="text-[10px]">
                {roleLabel}
              </Badge>
              <span className="text-xs text-slate-500">{profile.email}</span>
            </div>
          </div>
        </div>

        {profile.must_change_password && (
          <div className="mb-6">
            <ChangePasswordForm email={profile.email} forced />
          </div>
        )}

        {savedMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{savedMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
            {errorMsg}
          </div>
        )}

        {/* Data diri */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs mb-6">
          <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            Data Diri
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Nama Lengkap"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              placeholder="Nama lengkap Anda"
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Email" value={profile.email} disabled />
              <Input
                label="Nomor WhatsApp"
                value={profile.whatsapp}
                onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                placeholder="081234567890"
              />
            </div>
            <Input
              label="Asal Sekolah / Kampus / Nama UMKM"
              value={profile.institution}
              onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
              placeholder="SMK / Universitas / Nama Usaha"
            />
            <Button type="submit" variant="primary" size="lg" isLoading={saving} className="font-bold w-full sm:w-auto">
              <Save className="w-4 h-4 mr-1.5" />
              Simpan Perubahan
            </Button>
          </form>
        </div>

        {/* Ganti password (mode normal) */}
        {!profile.must_change_password && <ChangePasswordForm email={profile.email} />}
      </div>
    </div>
  );
}
