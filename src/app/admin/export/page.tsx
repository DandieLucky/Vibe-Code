"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Download,
  Filter,
  Calendar,
  CheckCircle2,
  Table,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { WorkSubmission } from "@/types/database";
import {
  generateExcelBuffer,
  generateCsvString,
  filterSubmissionsForExport,
  ExportFilterOptions,
} from "@/lib/export/excel-generator";

export default function AdminExportPage() {
  const [submissions, setSubmissions] = useState<WorkSubmission[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState("");

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

  const filterOptions: ExportFilterOptions = {
    status: statusFilter,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    searchTerm: searchTerm || undefined,
  };

  const previewList = filterSubmissionsForExport(submissions, filterOptions);

  const handleExportExcel = () => {
    setIsExporting(true);
    try {
      const buffer = generateExcelBuffer(previewList);
      const blob = new Blob([buffer as any], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kumpulan_karya_peserta_${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setDownloadSuccessMsg(`Berhasil mengunduh berkas Excel (${previewList.length} data karya).`);
      setTimeout(() => setDownloadSuccessMsg(""), 3500);
    } catch (err: any) {
      console.error(err);
      alert("Gagal mengunduh file Excel: " + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCsv = () => {
    setIsExporting(true);
    try {
      const csv = generateCsvString(previewList);
      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kumpulan_karya_peserta_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setDownloadSuccessMsg(`Berhasil mengunduh berkas CSV (${previewList.length} data karya).`);
      setTimeout(() => setDownloadSuccessMsg(""), 3500);
    } catch (err: any) {
      console.error(err);
      alert("Gagal mengunduh file CSV: " + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="teal">FITUR EKSPOR DATA</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Ekspor Data Pengumpulan Karya (Excel & CSV)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Unduh laporan lengkap identitas siswa, link GitHub, link Vercel, status penilaian, dan catatan fasilitator.
        </p>
      </div>

      {downloadSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{downloadSuccessMsg}</span>
        </div>
      )}

      {/* Filter Configuration Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-sky-600" />
          <span>Opsi Filter & Periode Data Ekspor</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-700">
              Filter Berdasarkan Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">Semua Status (Seluruh Data)</option>
              <option value="pending">Hanya Menunggu Pemeriksaan</option>
              <option value="accepted">Hanya Diterima (Lulus)</option>
              <option value="revision_needed">Hanya Perlu Revisi</option>
              <option value="rejected">Hanya Ditolak</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-700">
              Periode Dari Tanggal
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* End Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-700">
              Sampai Tanggal
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-600 font-medium">
            Terpilih:{" "}
            <strong className="text-slate-900 font-bold text-sm">
              {previewList.length} dari {submissions.length} karya
            </strong>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={previewList.length === 0 || isExporting}
              onClick={handleExportCsv}
              className="gap-2 text-xs font-semibold"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Ekspor CSV (.csv)</span>
            </Button>

            <Button
              type="button"
              variant="accent"
              disabled={previewList.length === 0 || isExporting}
              onClick={handleExportExcel}
              className="gap-2 font-bold shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Unduh File Excel (.xlsx)</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Table className="w-4 h-4 text-sky-600" />
            <span>Pratinjau Data yang Akan Diekspor ({previewList.length} Baris)</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Format Tabel Bersih & Rapi</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] bg-slate-50">
                <th className="py-2.5 px-3 font-bold">No</th>
                <th className="py-2.5 px-3 font-bold">Nama Lengkap</th>
                <th className="py-2.5 px-3 font-bold">Institusi</th>
                <th className="py-2.5 px-3 font-bold">Judul Proyek</th>
                <th className="py-2.5 px-3 font-bold">Status</th>
                <th className="py-2.5 px-3 font-bold">Skor</th>
                <th className="py-2.5 px-3 font-bold">GitHub URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {previewList.slice(0, 10).map((sub, idx) => (
                <tr key={sub.id} className="hover:bg-slate-50">
                  <td className="py-2 px-3 text-slate-400">{idx + 1}</td>
                  <td className="py-2 px-3 font-sans font-bold text-slate-800">{sub.full_name}</td>
                  <td className="py-2 px-3 font-sans text-slate-600">{sub.institution}</td>
                  <td className="py-2 px-3 font-sans text-slate-800 truncate max-w-[150px]">{sub.project_title}</td>
                  <td className="py-2 px-3 font-sans">
                    <span className="capitalize">{sub.submission_status}</span>
                  </td>
                  <td className="py-2 px-3 font-bold">{sub.score ?? "-"}</td>
                  <td className="py-2 px-3 text-sky-700 truncate max-w-[150px]">{sub.github_url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
