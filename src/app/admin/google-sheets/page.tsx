"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sheet,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Server,
  FileSpreadsheet,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { WorkSubmission } from "@/types/database";
import { ambilKaryaLewatServer } from "@/lib/data-access/admin";

export default function AdminGoogleSheetsPage() {
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    success?: boolean;
    message?: string;
    lastSyncTime?: string;
  } | null>(null);

  const [submissions, setSubmissions] = useState<WorkSubmission[]>([]);

  useEffect(() => {
    try {
      // Daftar karya dibaca dari database (lewat API server) supaya yang
      // diekspor ke Google Sheets selalu data terbaru, bukan salinan lama.
      ambilKaryaLewatServer().then(setSubmissions).catch(() => {});

      const storedSheetId = localStorage.getItem("vibe_sheets_id");
      if (storedSheetId) {
        setSpreadsheetId(storedSheetId);
        setIsConfigured(true);
      }

      const storedSync = localStorage.getItem("vibe_last_sheets_sync");
      if (storedSync) {
        setSyncStatus(JSON.parse(storedSync));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("vibe_sheets_id", spreadsheetId);
    setIsConfigured(!!spreadsheetId);
    alert("Konfigurasi Google Spreadsheet berhasil disimpan!");
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncStatus(null);

    try {
      const res = await fetch("/api/sync-sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissions,
          spreadsheetId: spreadsheetId || undefined,
        }),
      });

      const data = await res.json();
      const statusObj = {
        success: data.success,
        message: data.message,
        lastSyncTime: new Date().toISOString(),
      };

      setSyncStatus(statusObj);
      localStorage.setItem("vibe_last_sheets_sync", JSON.stringify(statusObj));
    } catch (err: any) {
      const statusObj = {
        success: false,
        message:
          "Integrasi Google Sheets memerlukan kredensial Service Account resmi di .env.local. Jika belum disiapkan, data tetap 100% aman di database Supabase dan dapat diekspor melalui menu Ekspor Excel (.xlsx).",
        lastSyncTime: new Date().toISOString(),
      };
      setSyncStatus(statusObj);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="teal">INTEGRASI CLOUD OPSIONAL</Badge>
          <span className="text-xs text-slate-500">• Supabase Tetap Menjadi Database Utama</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Integrasi Google Sheets API
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Sinkronkan kumpulan karya siswa ke dokumen Google Spreadsheet otomatis melalui backend yang aman.
        </p>
      </div>

      {/* Integration Status Notice */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Status Integrasi Google Sheets
              </h2>
              <Badge variant={isConfigured ? "success" : "default"}>
                {isConfigured ? "Terkonfigurasi" : "Belum Dikonfigurasi"}
              </Badge>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
              Sinkronisasi dijalankan murni di sisi Server (Backend API) menggunakan Service Account Google Cloud. Kredensial rahasia tidak pernah diekspos ke browser pengguna.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="accent"
          isLoading={isSyncing}
          onClick={handleManualSync}
          className="font-bold gap-2 shrink-0 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Sinkronkan Sekarang</span>
        </Button>
      </div>

      {/* Sync Status Banner */}
      {syncStatus && (
        <div
          className={`p-5 rounded-2xl border text-xs leading-relaxed ${
            syncStatus.success
              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
              : "bg-amber-50 border-amber-300 text-amber-950"
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            {syncStatus.success ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Sinkronisasi Berhasil</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Pemberitahuan Status Sinkronisasi</span>
              </>
            )}
          </div>
          <p className="mt-1 pl-7">{syncStatus.message}</p>
          {syncStatus.lastSyncTime && (
            <div className="mt-2 pl-7 text-[11px] font-mono text-slate-500">
              Waktu sinkronisasi terakhir: {new Date(syncStatus.lastSyncTime).toLocaleString("id-ID")}
            </div>
          )}
        </div>
      )}

      {/* Settings Form Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-sky-600" />
          <span>Pengaturan Target Google Spreadsheet</span>
        </h2>

        <form onSubmit={handleSaveConfig} className="space-y-4">
          <Input
            label="Google Spreadsheet ID"
            value={spreadsheetId}
            onChange={(e) => setSpreadsheetId(e.target.value)}
            placeholder="Contoh: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            helperText="Diambil dari URL Google Sheet: https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit"
          />

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900">
              Cara Mengaktifkan Sinkronisasi Google Sheets:
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-slate-600">
              <li>Buat dokumen baru di Google Spreadsheet.</li>
              <li>Buka Google Cloud Console &rarr; Aktifkan <strong>Google Sheets API</strong>.</li>
              <li>Buat <strong>Service Account</strong> dan unduh file kunci JSON-nya.</li>
              <li>Bagikan (Share) Google Spreadsheet Anda ke email Service Account dengan akses <strong>Editor</strong>.</li>
              <li>Masukkan kredensial ke dalam file <code>.env.local</code> di server Anda (lihat <code>.env.example</code>).</li>
            </ol>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" className="font-bold">
              Simpan Pengaturan
            </Button>
          </div>
        </form>
      </div>

      {/* Graceful Fallback Guarantee Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex items-start gap-4">
        <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">
            Jaminan Ketersediaan Data Tanpa Gangguan
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Sesuai kriteria arsitektur: Jika Google Sheets API belum dikonfigurasi atau mengalami gangguan jaringan, seluruh fitur platform tetap berjalan normal 100%. Data pengumpulan karya selalu tersimpan aman di database Supabase dan admin dapat mengunduh seluruh data dalam format Excel (.xlsx) kapan saja tanpa ketergantungan pihak ketiga.
          </p>
          <div className="pt-2">
            <Link href="/admin/export">
              <Button variant="outline" size="sm" className="text-xs font-semibold gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Buka Ekspor Excel (.xlsx)</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
