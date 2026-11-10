"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertCircle,
  UploadCloud,
  FileCheck2,
  Github,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Send,
  FileText,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MODULES_DATA } from "@/lib/data/curriculum-data";
import { submissionSchema } from "@/lib/validations";
import { WorkSubmission } from "@/types/database";
import { SubmissionStatusBadge } from "@/components/submission/submission-status-badge";
import confetti from "canvas-confetti";
import { submitWork, loadMySubmission, type SubmissionRecord } from "@/lib/data-access/submissions";

export default function KumpulanKaryaPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    whatsapp: "",
    institution: "",
    project_title: "Katalog UMKM Digital Modern",
    project_description: "Aplikasi katalog produk UMKM interaktif dengan integrasi pemesanan WhatsApp dan admin dashboard aman.",
    completed_modules: [
      "Modul 1: Pengenalan Web & AI",
      "Modul 2: Persiapan Lingkungan",
      "Modul 3: Membuat Proyek Pertama",
      "Modul 4: Menguasai Google Antigravity",
      "Modul 5: Membangun Frontend",
      "Modul 6: Database Supabase",
      "Modul 7: Proyek Katalog UMKM",
    ],
    github_url: "",
    deployment_url: "",
    screenshot_url: "",
    attachment_url: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [pesanGalat, setPesanGalat] = useState<string | null>(null);
  const [kodeKarya, setKodeKarya] = useState<string | null>(null);
  const [userSubmission, setUserSubmission] = useState<SubmissionRecord | null>(null);

  // File upload state
  const [screenshotFileName, setScreenshotFileName] = useState("");
  const [attachmentFileName, setAttachmentFileName] = useState("");

  // Load profile and existing submission from storage
  useEffect(() => {
    (async () => {
    try {
      // Auto-fill from profile if available
      const prof = localStorage.getItem("vibe_user_profile");
      if (prof) {
        const parsed = JSON.parse(prof);
        setFormData((prev) => ({
          ...prev,
          full_name: parsed.fullName || prev.full_name,
          email: parsed.email || prev.email,
          whatsapp: parsed.whatsapp || prev.whatsapp,
          institution: parsed.institution || prev.institution,
        }));
      }

      // Ambil data dari DATABASE — supaya peserta yang ganti perangkat
      // tetap melihat karyanya, dan admin melihat kiriman yang sama.
      const parsedSub = await loadMySubmission();
      if (parsedSub) {
        setUserSubmission(parsedSub);
        setKodeKarya(parsedSub.submission_code ?? null);
        setFormData((prev) => ({
          ...prev,
          full_name: parsedSub.full_name || prev.full_name,
          email: parsedSub.email || prev.email,
          whatsapp: parsedSub.whatsapp || prev.whatsapp,
          institution: parsedSub.institution || prev.institution,
          project_title: parsedSub.project_title || prev.project_title,
          project_description: parsedSub.project_description || prev.project_description,
          completed_modules: parsedSub.completed_modules || prev.completed_modules,
          github_url: parsedSub.github_url || prev.github_url,
          deployment_url: parsedSub.deployment_url || prev.deployment_url,
          screenshot_url: parsedSub.screenshot_url || "",
          attachment_url: (parsedSub as any).attachment_url || "",
        }));
      }
    } catch (e) {
      console.error(e);
    }
    })();
  }, []);

  const handleToggleModule = (moduleTitle: string) => {
    setFormData((prev) => {
      const exists = prev.completed_modules.includes(moduleTitle);
      return {
        ...prev,
        completed_modules: exists
          ? prev.completed_modules.filter((m) => m !== moduleTitle)
          : [...prev.completed_modules, moduleTitle],
      };
    });
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file screenshot maksimal 5 MB.");
      return;
    }

    setScreenshotFileName(file.name);
    // Convert to DataURL for immediate preview & persistence
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        screenshot_url: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran dokumen lampiran maksimal 10 MB.");
      return;
    }

    setAttachmentFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        attachment_url: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setIsSubmitting(true);

    try {
      // Validate schema
      const validation = submissionSchema.safeParse(formData);

      if (!validation.success) {
        const errors: Record<string, string> = {};
        for (const issue of validation.error.issues) {
          if (issue.path[0]) {
            errors[issue.path[0].toString()] = issue.message;
          }
        }
        setFormErrors(errors);
        setIsSubmitting(false);
        // Scroll to first error
        window.scrollTo({ top: 400, behavior: "smooth" });
        return;
      }

      // Build submission record
      const submissionRecord: WorkSubmission = {
        id: userSubmission?.id || "sub-" + Date.now(),
        user_id: "user-current",
        full_name: formData.full_name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        institution: formData.institution,
        project_title: formData.project_title,
        project_description: formData.project_description,
        completed_modules: formData.completed_modules,
        github_url: formData.github_url,
        deployment_url: formData.deployment_url,
        screenshot_url: formData.screenshot_url,
        attachment_url: formData.attachment_url,
        submission_status: userSubmission ? userSubmission.submission_status : "pending",
        admin_notes: userSubmission?.admin_notes,
        score: userSubmission?.score,
        submitted_at: userSubmission?.submitted_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // ------------------------------------------------------------------
      // Simpan ke DATABASE, bukan ke browser.
      // Kalau disimpan ke browser, admin tidak akan pernah melihat karya ini.
      // ------------------------------------------------------------------
      const hasil = await submitWork({
        project_title: formData.project_title,
        project_description: formData.project_description,
        github_url: formData.github_url,
        deployment_url: formData.deployment_url,
        completed_modules: formData.completed_modules,
        full_name: formData.full_name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        institution: formData.institution,
        screenshot_url: formData.screenshot_url,
      });

      if (!hasil.ok) {
        setPesanGalat(hasil.message);
        setIsSubmitting(false);
        window.scrollTo({ top: 200, behavior: "smooth" });
        return;
      }

      // Baca ulang dari database supaya yang tampil benar-benar data tersimpan
      const tersimpan = await loadMySubmission();
      setUserSubmission(tersimpan ?? submissionRecord);
      setKodeKarya(hasil.submissionCode ?? null);
      setSubmissionSuccess(true);
      setIsSubmitting(false);

      // Celebrate!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      window.scrollTo({ top: 200, behavior: "smooth" });
    } catch (err: any) {
      console.error(err);
      setIsSubmitting(false);
    }
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
          <span className="font-semibold text-slate-800">Kumpulan Karya Peserta</span>
        </div>

        {/* Header Title & Notice */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
              MODUL WAJIB EVALUASI
            </span>
            <Badge variant="teal">Sertifikasi & Penilaian</Badge>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kumpulan Karya Peserta
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Kumpulkan hasil karya aplikasi web katalog UMKM Anda. Seluruh karya akan ditinjau, dinilai, dan dikelola oleh administrator dalam dashboard terpusat.
          </p>
        </div>

        {/* Existing Submission Banner if already submitted */}
        {userSubmission && (
          <div className="mb-8 rounded-2xl border-2 border-emerald-300 bg-emerald-50/60 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Status Karya Anda:
                </span>
                <div className="mt-1">
                  <SubmissionStatusBadge status={userSubmission.submission_status} />
                </div>
              </div>

              {userSubmission.score !== undefined && userSubmission.score !== null && (
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800">Nilai / Skor:</span>
                  <div className="text-2xl font-extrabold text-emerald-700">
                    {userSubmission.score} / 100
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900">Judul Proyek: </strong>
                {userSubmission.project_title}
              </div>
              <div>
                <strong className="text-slate-900">Link GitHub: </strong>
                <a
                  href={userSubmission.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 font-semibold hover:underline"
                >
                  {userSubmission.github_url}
                </a>
              </div>
              <div>
                <strong className="text-slate-900">Link Deployment Vercel: </strong>
                <a
                  href={userSubmission.deployment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 font-semibold hover:underline"
                >
                  {userSubmission.deployment_url}
                </a>
              </div>
              <div>
                <strong className="text-slate-900">Modul Selesai: </strong>
                {(userSubmission.completed_modules || []).length} Modul
              </div>
            </div>

            {userSubmission.admin_notes && (
              <div className="mt-4 p-3.5 rounded-xl bg-white border border-emerald-200 text-xs text-slate-800">
                <strong className="text-emerald-900 font-bold block mb-1">
                  Catatan Review Admin:
                </strong>
                {userSubmission.admin_notes}
              </div>
            )}
          </div>
        )}

        {/* Submission Success Alert */}
        {submissionSuccess && (
          <div className="mb-8 rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-900 animate-in fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-base font-bold">Karya Berhasil Dikumpulkan!</h3>
                {kodeKarya && (
                  <p className="text-xs font-bold text-emerald-900 mt-1">
                    Kode karya Anda: <span className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300">{kodeKarya}</span>
                  </p>
                )}
                <p className="text-xs text-emerald-800 mt-1">
                  Karya Anda sudah masuk ke database dan dapat dilihat administrator.
                  Pengumpulan hanya dapat dilakukan <strong>satu kali</strong> — pastikan semua sudah benar.
                </p>
              </div>
            </div>
          </div>
        )}

        {pesanGalat && (
          <div className="mb-6 rounded-2xl border border-red-300 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-red-900">Karya belum tersimpan</h3>
                <p className="text-xs text-red-800 mt-1">{pesanGalat}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submission Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="pb-4 mb-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {userSubmission ? "Perbarui Pengumpulan Karya" : "Formulir Pengumpulan Karya"}
              </h2>
              <p className="text-xs text-slate-500">
                Isi data diri dan tautan karya Anda. Pastikan link Vercel dan GitHub dapat dibuka publik tanpa login.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identity Group */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Identitas Peserta
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nama Lengkap"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  error={formErrors.full_name}
                  placeholder="Contoh: Budi Santoso"
                  required
                />
                <Input
                  label="Alamat Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={formErrors.email}
                  placeholder="email@anda.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nomor WhatsApp (Aktif)"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  error={formErrors.whatsapp}
                  placeholder="081234567890"
                  required
                />
                <Input
                  label="Institusi / Sekolah / Nama UMKM"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  error={formErrors.institution}
                  placeholder="SMK / Universitas / Nama Usaha"
                  required
                />
              </div>
            </div>

            {/* Project Details Group */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Rincian Proyek Aplikasi
              </h3>

              <Input
                label="Judul Proyek"
                value={formData.project_title}
                onChange={(e) =>
                  setFormData({ ...formData, project_title: e.target.value })
                }
                error={formErrors.project_title}
                placeholder="Contoh: Katalog Digital Toko Berkah UMKM"
                required
              />

              <Textarea
                label="Deskripsi Singkat Proyek"
                rows={3}
                value={formData.project_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    project_description: e.target.value,
                  })
                }
                error={formErrors.project_description}
                placeholder="Jelaskan fitur utama katalog, keunggulan toko, dan bagaimana AI Antigravity membantu Anda membuatnya..."
                required
              />
            </div>

            {/* Completed Modules Checkbox Group */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  3. Modul yang Telah Diselesaikan
                </h3>
                <span className="text-xs text-sky-600 font-semibold font-mono">
                  {formData.completed_modules.length} dari 12 Modul Dipilih
                </span>
              </div>

              {formErrors.completed_modules && (
                <p className="text-xs font-medium text-rose-600">
                  {formErrors.completed_modules}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                {MODULES_DATA.map((m) => {
                  const title = `Modul ${m.module_number}: ${m.title}`;
                  const isChecked = formData.completed_modules.includes(title);

                  return (
                    <label
                      key={m.id}
                      className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        isChecked
                          ? "bg-sky-50 text-sky-900 border border-sky-200"
                          : "bg-white text-slate-700 border border-slate-200/60 hover:bg-slate-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleModule(title)}
                        className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                      />
                      <span className="truncate">{title}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Repository & Deployment URLs Group */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                4. Tautan Proyek Online (Wajib Publik)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Link Repository GitHub"
                  value={formData.github_url}
                  onChange={(e) =>
                    setFormData({ ...formData, github_url: e.target.value })
                  }
                  error={formErrors.github_url}
                  placeholder="https://github.com/username/katalog-umkm"
                  helperText="Harus berupa link repository publik di github.com"
                  required
                />

                <Input
                  label="Link Website Deployment Vercel"
                  value={formData.deployment_url}
                  onChange={(e) =>
                    setFormData({ ...formData, deployment_url: e.target.value })
                  }
                  error={formErrors.deployment_url}
                  placeholder="https://katalog-umkm-anda.vercel.app"
                  helperText="Pastikan dapat dibuka siapapun tanpa login (bukan localhost)"
                  required
                />
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Peringatan Keamanan:</strong> Jangan pernah memasukkan password akun GitHub, Vercel, atau kredensial rahasia Supabase Anda ke dalam formulir ini. Juri hanya membutuhkan tautan publik.
                </span>
              </div>
            </div>

            {/* File Upload Group */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                5. Lampiran Berkas & Tangkapan Layar (Screenshot)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Screenshot Upload */}
                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 text-center space-y-2">
                  <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                  <div className="text-xs font-semibold text-slate-700">
                    Upload Screenshot Aplikasi
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Format PNG, JPEG, atau WebP (Maks. 5 MB)
                  </p>
                  <label className="inline-block cursor-pointer">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs">
                      Pilih Gambar
                    </span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleScreenshotChange}
                      className="hidden"
                    />
                  </label>
                  {screenshotFileName && (
                    <div className="text-[11px] font-mono text-emerald-700 font-semibold truncate">
                      ✓ {screenshotFileName}
                    </div>
                  )}
                  {formData.screenshot_url && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 max-h-24">
                      <img
                        src={formData.screenshot_url}
                        alt="Preview Screenshot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Document Attachment Upload */}
                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 text-center space-y-2">
                  <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                  <div className="text-xs font-semibold text-slate-700">
                    Upload Dokumen Pendukung (Opsional)
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Format PDF atau ZIP (Maks. 10 MB)
                  </p>
                  <label className="inline-block cursor-pointer">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs">
                      Pilih Dokumen
                    </span>
                    <input
                      type="file"
                      accept="application/pdf,application/zip"
                      onChange={handleAttachmentChange}
                      className="hidden"
                    />
                  </label>
                  {attachmentFileName && (
                    <div className="text-[11px] font-mono text-emerald-700 font-semibold truncate">
                      ✓ {attachmentFileName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 text-center sm:text-left">
                Setelah dikirim, karya akan masuk ke tabel database admin untuk dinilai.
              </span>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                isLoading={isSubmitting}
                className="w-full sm:w-auto font-bold px-8 shadow-md"
              >
                <Send className="w-4 h-4 mr-2" />
                {userSubmission ? "Perbarui Kiriman Karya" : "Kirimkan Karya Saya Sekarang"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
