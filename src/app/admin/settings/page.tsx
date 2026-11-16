"use client";

import React, { useState, useEffect } from "react";
import { Settings, ShieldCheck, Users, Bell, Clock, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function AdminSettingsPage() {
  const [registrationMode, setRegistrationMode] = useState<"open" | "invite_only">("open");
  const [allowSubmissions, setAllowSubmissions] = useState(true);
  const [submissionDeadline, setSubmissionDeadline] = useState("2026-11-10T15:00");
  const [announcement, setAnnouncement] = useState(
    "Pengumpulan karya ditutup tepat pukul 15.00 WIB. Pastikan repository GitHub Anda berstatus publik dan screenshot aplikasi Android diunggah."
  );
  const [invitationCode, setInvitationCode] = useState("CHAT2026");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    try {
      const mode = localStorage.getItem("vibe_reg_mode") as "open" | "invite_only";
      if (mode) setRegistrationMode(mode);

      const deadline = localStorage.getItem("vibe_deadline");
      if (deadline) setSubmissionDeadline(deadline);

      const ann = localStorage.getItem("vibe_announcement");
      if (ann) setAnnouncement(ann);

      const code = localStorage.getItem("vibe_invite_code");
      if (code) setInvitationCode(code);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("vibe_reg_mode", registrationMode);
    localStorage.setItem("vibe_deadline", submissionDeadline);
    localStorage.setItem("vibe_announcement", announcement);
    localStorage.setItem("vibe_invite_code", invitationCode);

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-rule">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="teal">PENGATURAN GLOBAL</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Pengaturan Platform & Pendaftaran Peserta
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Atur mode pendaftaran (terbuka vs undangan), tenggat waktu pengumpulan karya, dan pengumuman situs.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Seluruh pengaturan platform berhasil disimpan!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: Registration Mode */}
        <div className="rounded-2xl border border-rule bg-sheet p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-ink flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            <span>Mode Pengelolaan Pendaftaran Peserta</span>
          </h2>
          <p className="text-xs text-muted">
            Tentukan apakah registrasi akun baru terbuka untuk umum atau hanya untuk peserta berstatus undangan workshop.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label
              className={`p-4 rounded-xl border cursor-pointer transition-colors flex items-start gap-3 ${
                registrationMode === "open"
                  ? "bg-accent-soft border-accent ring-1 ring-accent-2"
                  : "bg-paper border-rule hover:bg-paper-2"
              }`}
            >
              <input
                type="radio"
                name="regMode"
                value="open"
                checked={registrationMode === "open"}
                onChange={() => setRegistrationMode("open")}
                className="mt-1"
              />
              <div>
                <span className="text-sm font-bold text-ink block">
                  Pendaftaran Terbuka (Public)
                </span>
                <span className="text-xs text-muted leading-relaxed">
                  siswa dapat langsung mendaftar tanpa kode undangan.
                </span>
              </div>
            </label>

            <label
              className={`p-4 rounded-xl border cursor-pointer transition-colors flex items-start gap-3 ${
                registrationMode === "invite_only"
                  ? "bg-accent-soft border-accent ring-1 ring-accent-2"
                  : "bg-paper border-rule hover:bg-paper-2"
              }`}
            >
              <input
                type="radio"
                name="regMode"
                value="invite_only"
                checked={registrationMode === "invite_only"}
                onChange={() => setRegistrationMode("invite_only")}
                className="mt-1"
              />
              <div>
                <span className="text-sm font-bold text-ink block">
                  Berdasarkan Undangan Admin
                </span>
                <span className="text-xs text-muted leading-relaxed">
                  Calon peserta wajib memasukkan Kode Undangan resmi dari fasilitator saat mengisi form registrasi.
                </span>
              </div>
            </label>
          </div>

          {registrationMode === "invite_only" && (
            <div className="pt-2">
              <Input
                label="Kode Undangan Resmi"
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value)}
                placeholder="Contoh: CHAT2026"
                helperText="Berikan kode ini kepada peserta workshop yang diizinkan mendaftar."
                required
              />
            </div>
          )}
        </div>

        {/* Card 2: Submissions & Deadline */}
        <div className="rounded-2xl border border-rule bg-sheet p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-ink flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>Tenggat Waktu Pengumpulan Karya (Deadline)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Batas Akhir Waktu Pengumpulan"
              type="datetime-local"
              value={submissionDeadline}
              onChange={(e) => setSubmissionDeadline(e.target.value)}
              helperText="Sesuai lembar kerja referensi: Kirim sebelum pukul 15.00 WIB."
            />

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink-2">
                Status Formulir Karya
              </label>
              <div className="pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowSubmissions}
                    onChange={(e) => setAllowSubmissions(e.target.checked)}
                    className="h-4 w-4 rounded border-rule text-accent focus:ring-accent"
                  />
                  <span className="text-xs font-semibold text-ink">
                    Buka Penerimaan Karya Baru
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Site Announcement */}
        <div className="rounded-2xl border border-rule bg-sheet p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-ink flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            <span>Teks Pengumuman Puncak Platform</span>
          </h2>

          <Textarea
            label="Pengumuman untuk Peserta (Tampil di Halaman Kumpulan Karya)"
            rows={3}
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="accent" size="lg" className="font-bold gap-2 shadow-md">
            <Save className="w-4 h-4" />
            <span>Simpan Seluruh Pengaturan</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
