"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit3,
  Image as ImageIcon,
  FileText,
  FileSpreadsheet,
  Save,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { WorkSubmission, SubmissionStatus } from "@/types/database";
import { SubmissionStatusBadge } from "@/components/submission/submission-status-badge";
import { formatDate } from "@/lib/utils";
import { ambilSemuaKarya, simpanPenilaian } from "@/lib/data-access/admin";

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<WorkSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected submission for Grading Detail Modal
  const [selectedSubmission, setSelectedSubmission] = useState<WorkSubmission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [gradingStatus, setGradingStatus] = useState<SubmissionStatus>("pending");
  const [gradingScore, setGradingScore] = useState<number | string>("");
  const [gradingNotes, setGradingNotes] = useState("");
  const [isSavingGrading, setIsSavingGrading] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [pesanGagal, setPesanGagal] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vibe_all_submissions");
      if (stored) {
        setSubmissions(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleOpenDetail = (sub: WorkSubmission) => {
    setSelectedSubmission(sub);
    setGradingStatus(sub.submission_status);
    setGradingScore(sub.score !== undefined && sub.score !== null ? sub.score : "");
    setGradingNotes(sub.admin_notes || "");
    setSaveSuccessMsg(false);
    setModalOpen(true);
  };

  const handleSaveGrading = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;
    setIsSavingGrading(true);

    const updatedSub: WorkSubmission = {
      ...selectedSubmission,
      submission_status: gradingStatus,
      score: gradingScore !== "" ? Number(gradingScore) : undefined,
      admin_notes: gradingNotes,
      updated_at: new Date().toISOString(),
    };

    // Simpan langsung ke database supaya penilaian berlaku untuk semua admin.
    const hasil = await simpanPenilaian(updatedSub.id, {
      status: gradingStatus,
      skor: gradingScore !== "" ? Number(gradingScore) : null,
      catatan: gradingNotes,
    });

    setIsSavingGrading(false);

    if (!hasil.sukses) {
      setPesanGagal(hasil.pesan ?? "Gagal menyimpan penilaian ke database.");
      setTimeout(() => setPesanGagal(null), 5000);
      return;
    }

    const updatedList = submissions.map((s) =>
      s.id === updatedSub.id ? updatedSub : s
    );
    setSubmissions(updatedList);
    setSelectedSubmission(updatedSub);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2000);
  };

  // Filter & Search & Sort
  const filtered = submissions.filter((sub) => {
    if (selectedStatus !== "all" && sub.submission_status !== selectedStatus) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = sub.full_name?.toLowerCase().includes(q);
      const matchEmail = sub.email?.toLowerCase().includes(q);
      const matchInst = sub.institution?.toLowerCase().includes(q);
      const matchTitle = sub.project_title?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchInst && !matchTitle) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const timeA = new Date(a.submitted_at).getTime();
    const timeB = new Date(b.submitted_at).getTime();
    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Kumpulan Karya Peserta & Penilaian
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Daftar lengkap hasil proyek siswa untuk diperiksa, diberi skor, dan disetujui kelulusannya.
          </p>
        </div>

        <Link href="/admin/export">
          <Button variant="outline" size="sm" className="gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Ekspor Excel (.xlsx)</span>
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, email, institusi, atau judul..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          {[
            { id: "all", label: "Semua Status" },
            { id: "pending", label: "Menunggu" },
            { id: "accepted", label: "Diterima" },
            { id: "revision_needed", label: "Perlu Revisi" },
            { id: "rejected", label: "Ditolak" },
          ].map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => {
                setSelectedStatus(st.id);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                selectedStatus === st.id
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Sort Order */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as any)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 self-end lg:self-auto"
        >
          <option value="newest">Pengumpulan Terbaru</option>
          <option value="oldest">Pengumpulan Terlama</option>
        </select>
      </div>

      {/* Submissions Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50">
                <th className="py-3 px-3.5 font-bold w-12 text-center">No</th>
                <th className="py-3 px-4 font-bold">Identitas Peserta</th>
                <th className="py-3 px-4 font-bold">Institusi</th>
                <th className="py-3 px-4 font-bold">Judul Proyek</th>
                <th className="py-3 px-4 font-bold">Tautan Proyek</th>
                <th className="py-3 px-4 font-bold">Tanggal</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-center">Skor</th>
                <th className="py-3 px-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map((sub, idx) => (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3.5 text-center font-mono text-slate-400">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{sub.full_name}</div>
                    <div className="text-[11px] text-slate-400">{sub.email}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{sub.whatsapp}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {sub.institution}
                  </td>
                  <td className="py-3 px-4 max-w-[180px]">
                    <div className="font-semibold text-slate-800 truncate" title={sub.project_title}>
                      {sub.project_title}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {sub.completed_modules.length} Modul Selesai
                    </div>
                  </td>
                  <td className="py-3 px-4 space-y-1">
                    <a
                      href={sub.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={sub.deployment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>Vercel Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {formatDate(sub.submitted_at)}
                  </td>
                  <td className="py-3 px-4">
                    <SubmissionStatusBadge status={sub.submission_status} />
                  </td>
                  <td className="py-3 px-4 text-center font-bold font-mono">
                    {sub.score !== undefined && sub.score !== null ? (
                      <span className="text-emerald-700">{sub.score}</span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      type="button"
                      variant="accent"
                      size="sm"
                      onClick={() => handleOpenDetail(sub)}
                      className="text-xs gap-1 font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginated.length === 0 && (
          <div className="text-center py-12 p-4">
            <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">Tidak ada karya yang sesuai filter</h3>
            <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci atau status pencarian.</p>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500">
            <div>
              Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, sorted.length)} dari {sorted.length} karya
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="px-3 font-semibold text-slate-700">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Grading & Detail Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Penilaian & Review Karya Peserta"
        description="Periksa link karya aplikasi, berikan skor, dan ubah status kelulusan peserta."
        maxWidth="3xl"
      >
        {selectedSubmission && (
          <div className="space-y-6">
            {/* Identity & Links Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Nama Peserta:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedSubmission.full_name}</span>
                <div className="text-slate-500">{selectedSubmission.email}</div>
                <div className="text-slate-500">{selectedSubmission.whatsapp}</div>
                <div className="mt-1 font-semibold text-sky-800">{selectedSubmission.institution}</div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-slate-400 block mb-0.5">Judul Proyek:</span>
                  <span className="font-bold text-slate-800">{selectedSubmission.project_title}</span>
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <a
                    href={selectedSubmission.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sky-700 font-bold hover:underline"
                  >
                    <span>Buka Repository GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={selectedSubmission.deployment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-700 font-bold hover:underline"
                  >
                    <span>Buka Website Vercel Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Description & Completed Modules */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700">Deskripsi Proyek Peserta:</span>
              <p className="p-3 rounded-lg bg-white border border-slate-200 text-slate-700 leading-relaxed">
                {selectedSubmission.project_description}
              </p>
            </div>

            {/* Screenshot Preview if available */}
            {selectedSubmission.screenshot_url && (
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-sky-600" />
                  <span>Preview Tangkapan Layar (Screenshot):</span>
                </span>
                <div className="rounded-xl overflow-hidden border border-slate-200 max-h-60 bg-slate-950 flex items-center justify-center">
                  <img
                    src={selectedSubmission.screenshot_url}
                    alt="Screenshot Karya"
                    className="max-h-60 w-auto object-contain"
                  />
                </div>
              </div>
            )}

            {/* Grading Form */}
            <form onSubmit={handleSaveGrading} className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Keputusan Penilaian Administrator
                </h3>
                {saveSuccessMsg && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                    <Check className="w-4 h-4" /> Penilaian Berhasil Disimpan!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-700">
                    Status Kelulusan Karya
                  </label>
                  <select
                    value={gradingStatus}
                    onChange={(e) => setGradingStatus(e.target.value as SubmissionStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="pending">Menunggu Pemeriksaan</option>
                    <option value="accepted">Diterima (Lulus)</option>
                    <option value="revision_needed">Perlu Revisi</option>
                    <option value="rejected">Ditolak</option>
                  </select>
                </div>

                {/* Score Input */}
                <Input
                  label="Nilai / Skor Akhir (0 - 100)"
                  type="number"
                  min="0"
                  max="100"
                  value={gradingScore}
                  onChange={(e) => setGradingScore(e.target.value)}
                  placeholder="Contoh: 90"
                />
              </div>

              {/* Admin Notes */}
              <Textarea
                label="Catatan Review & Umpan Balik untuk Peserta"
                rows={3}
                value={gradingNotes}
                onChange={(e) => setGradingNotes(e.target.value)}
                placeholder="Tuliskan apresiasi, kriteria yang belum terpenuhi, atau instruksi perbaikan untuk siswa..."
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Tutup
                </Button>
                <Button
                  type="submit"
                  variant="accent"
                  isLoading={isSavingGrading}
                  className="font-bold gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan Penilaian
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
