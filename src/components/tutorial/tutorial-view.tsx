"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check, ChevronDown, ChevronRight, AlertTriangle, Lightbulb,
  Copy, Terminal, Play, Send, CircleCheck, Loader2, Info,
} from "lucide-react";
import type { BagianTutorial, LangkahTutorial } from "@/lib/data/tutorial-persiapan";

interface Props {
  bagian: BagianTutorial;
  /** Sumber penyimpanan progres — dipakai untuk menyimpan centang langkah */
  storageKey: string;
}

/** Blok kode dengan tombol salin — peserta cukup klik, tidak perlu mengetik ulang. */
function BlokKode({ isi }: { isi: string }) {
  const [tersalin, setTersalin] = useState(false);

  const salin = async () => {
    try {
      await navigator.clipboard.writeText(isi);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 1800);
    } catch {
      /* clipboard tidak tersedia — peserta bisa menyalin manual */
    }
  };

  return (
    <div className="relative group">
      <pre className="rounded-xl bg-slate-900 text-sky-300 border border-slate-800 px-4 py-3 pr-12 overflow-x-auto">
        <code className="text-[11px] sm:text-xs font-mono leading-relaxed whitespace-pre">{isi}</code>
      </pre>
      <button
        type="button"
        onClick={salin}
        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-sky-300 hover:bg-slate-700 transition-colors"
        title="Salin"
      >
        {tersalin ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

/** Kotak prompt AI — bisa disalin langsung ke Agent Antigravity. */
function BlokPrompt({ isi }: { isi: string }) {
  const [tersalin, setTersalin] = useState(false);
  const teks = isi.replace(/\\n/g, "\n");

  return (
    <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/60 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-indigo-100 border-b border-indigo-200">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
          <Play className="w-3 h-3" />
          Prompt — salin ke Agent
        </span>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(teks);
            setTersalin(true);
            setTimeout(() => setTersalin(false), 1800);
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-white text-[10px] font-bold text-indigo-700 hover:bg-indigo-50 border border-indigo-200"
        >
          {tersalin ? <><Check className="w-3 h-3" /> Tersalin</> : <><Copy className="w-3 h-3" /> Salin prompt</>}
        </button>
      </div>
      <pre className="px-4 py-3 overflow-x-auto">
        <code className="text-[11px] font-mono text-slate-700 leading-relaxed whitespace-pre-wrap">{teks}</code>
      </pre>
    </div>
  );
}

function Langkah({
  langkah, nomor, selesai, onToggle, terakhir,
}: {
  langkah: LangkahTutorial;
  nomor: number;
  selesai: boolean;
  onToggle: () => void;
  terakhir: boolean;
}) {
  const [bukaTroubleshoot, setBukaTroubleshoot] = useState(false);

  return (
    <div className="relative pl-11 sm:pl-14">
      {/* Garis penghubung antar langkah */}
      {!terakhir && (
        <span className={`absolute left-[19px] sm:left-[23px] top-11 bottom-0 w-0.5 ${selesai ? "bg-emerald-300" : "bg-slate-200"}`} />
      )}

      {/* Nomor langkah */}
      <span
        className={`absolute left-0 top-0 h-10 w-10 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 transition-colors ${
          selesai ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25" : "bg-slate-900 text-sky-400"
        }`}
      >
        {selesai ? <Check className="w-5 h-5" /> : nomor}
      </span>

      <div className={`rounded-2xl border bg-white p-5 sm:p-6 mb-6 transition-colors ${
        selesai ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200"
      }`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">{langkah.judul}</h3>
        </div>

        {langkah.penjelasan && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{langkah.penjelasan}</p>
        )}

        {langkah.peringatan && (
          <div className="mb-4 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-3.5">
            <p className="text-[11px] font-extrabold text-amber-900 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              {langkah.peringatan.judul}
            </p>
            <p className="text-[11px] text-amber-800 leading-relaxed">{langkah.peringatan.isi}</p>
          </div>
        )}

        {/* Instruksi */}
        {langkah.instruksi && langkah.instruksi.length > 0 && (
        <ol className="space-y-2.5 mb-4">
          {langkah.instruksi.map((t, i) => (
            <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="shrink-0 h-5 w-5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
        )}

        {/* Blok kode */}
        {langkah.kode && langkah.kode.length > 0 && (
          <div className="space-y-2 mb-4">
            {langkah.kode.map((k, i) => <BlokKode key={i} isi={k} />)}
          </div>
        )}

        {/* Gambar panduan */}
        {langkah.gambar && langkah.gambar.length > 0 && (
          <div className="space-y-3 mb-4">
            {langkah.gambar.map((g, i) => (
              <figure key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full h-auto"
                />
                <figcaption className="px-3 py-2 text-[10px] text-slate-500 bg-white border-t border-slate-100 italic">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {/* Hasil yang diharapkan */}
        {(langkah.hasilDiharapkan || langkah.hasilItem) && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 mb-4">
            <p className="text-[11px] font-extrabold text-emerald-900 flex items-center gap-1.5 mb-2">
              <CircleCheck className="w-3.5 h-3.5" />
              Hasil yang diharapkan
            </p>
            {langkah.hasilDiharapkan && (
              <p className="text-[11px] text-emerald-800 leading-relaxed">{langkah.hasilDiharapkan}</p>
            )}
            {langkah.hasilItem && (
              <ul className="space-y-1.5 mt-1">
                {langkah.hasilItem.map((t, i) => (
                  <li key={i} className="text-[11px] text-emerald-800 flex gap-2">
                    <span className="shrink-0">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Prompt AI */}
        {langkah.blokPrompt && (
          <div className="mb-4"><BlokPrompt isi={langkah.blokPrompt} /></div>
        )}

        {/* Perintah kirim ke GitHub */}
        {langkah.blokKirim && (
          <div className="mb-4">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Send className="w-3 h-3" />
              Kirim ke GitHub
            </p>
            <BlokKode isi={langkah.blokKirim.replace(/\\n/g, "\n")} />
          </div>
        )}

        {/* Troubleshooting */}
        {langkah.troubleshooting && langkah.troubleshooting.length > 0 && (
          <div className="mb-4 rounded-xl border border-slate-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setBukaTroubleshoot(!bukaTroubleshoot)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Kalau tidak sesuai
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${bukaTroubleshoot ? "rotate-180" : ""}`} />
            </button>
            {bukaTroubleshoot && (
              <div className="px-3.5 py-3 space-y-3 bg-white border-t border-slate-200">
                {langkah.troubleshooting.map((t, i) => (
                  <div key={i}>
                    <p className="text-[11px] font-bold text-slate-800">{t.masalah}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">{t.solusi}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tombol Selesai */}
        <button
          type="button"
          onClick={onToggle}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            selesai
              ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          {selesai ? (
            <><Check className="w-4 h-4" /> Sudah selesai — klik untuk batalkan</>
          ) : (
            <><Check className="w-4 h-4" /> Tandai Selesai</>
          )}
        </button>
      </div>
    </div>
  );
}

export function TutorialView({ bagian, storageKey }: Props) {
  const [selesai, setSelesai] = useState<string[]>([]);
  const [siap, setSiap] = useState(false);

  // Muat progres dari database (dengan cadangan localStorage)
  useEffect(() => {
    (async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const sb = createClient();
        if (sb) {
          const { data: { user } } = await sb.auth.getUser();
          if (user) {
            const { data } = await sb
              .from("profiles")
              .select("tutorial_progress")
              .eq("id", user.id)
              .single();
            const tersimpan = (data as any)?.tutorial_progress?.[bagian.id] ?? [];
            setSelesai(tersimpan);
            setSiap(true);
            return;
          }
        }
      } catch { /* jatuh ke localStorage */ }

      try {
        const lokal = JSON.parse(localStorage.getItem(storageKey) || "[]");
        setSelesai(Array.isArray(lokal) ? lokal : []);
      } catch { setSelesai([]); }
      setSiap(true);
    })();
  }, [bagian.id, storageKey]);

  const simpan = useCallback(async (daftarBaru: string[]) => {
    setSelesai(daftarBaru);
    localStorage.setItem(storageKey, JSON.stringify(daftarBaru));

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const sb = createClient();
      if (!sb) return;
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return;

      const { data } = await sb.from("profiles").select("tutorial_progress").eq("id", user.id).single();
      const semua = { ...((data as any)?.tutorial_progress ?? {}), [bagian.id]: daftarBaru };
      await sb.from("profiles").update({ tutorial_progress: semua } as any).eq("id", user.id);
    } catch { /* progres lokal tetap tersimpan */ }
  }, [bagian.id, storageKey]);

  const toggle = (id: string) => {
    const baru = selesai.includes(id) ? selesai.filter((x) => x !== id) : [...selesai, id];
    simpan(baru);
  };

  const total = bagian.langkah.length;
  const jumlahSelesai = selesai.filter((id) => bagian.langkah.some((l) => l.id === id)).length;
  const persen = total > 0 ? Math.round((jumlahSelesai / total) * 100) : 0;

  if (!siap) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-sky-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Bilah atas */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/dashboard" className="hover:text-slate-800">Dashboard</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-800">
              {bagian.id === "persiapan" ? "Persiapan" : "Development"}
            </span>
          </div>
          <Link href="/tutorial" className="text-[11px] font-bold text-sky-600 hover:underline">
            Semua Tutorial
          </Link>
        </div>

        {/* Kartu judul + progres */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 mb-8 shadow-xs">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">{bagian.judul}</h1>
            <span className="shrink-0 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-extrabold">
              {jumlahSelesai} / {total} langkah
            </span>
          </div>

          {bagian.pengantar && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{bagian.pengantar}</p>
          )}

          {bagian.peringatanAwal && (
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-3.5 mb-4 flex gap-2.5">
              <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-sky-900 leading-relaxed">{bagian.peringatanAwal}</p>
            </div>
          )}

          {/* Batang progres */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${persen}%` }}
              />
            </div>
            <span className="text-xs font-extrabold text-slate-600 w-10 text-right">{persen}%</span>
          </div>
          {persen === 100 && (
            <p className="mt-3 text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              Semua langkah selesai. Progresmu tersimpan otomatis.
            </p>
          )}
        </div>

        {/* Daftar langkah */}
        {bagian.langkah.map((l, i) => (
          <Langkah
            key={l.id}
            langkah={l}
            nomor={i + 1}
            selesai={selesai.includes(l.id)}
            onToggle={() => toggle(l.id)}
            terakhir={i === bagian.langkah.length - 1}
          />
        ))}

        {/* Penutup */}
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6 text-center">
          <p className="text-sm font-bold text-slate-800 mb-1">
            {bagian.id === "persiapan"
              ? "Sudah siap semua?"
              : "Sudah selesai semua langkahnya?"}
          </p>
          <p className="text-xs text-slate-500 mb-4">
            {bagian.id === "persiapan"
              ? "Saat acara, kamu akan memakai Tutorial Development untuk membangun aplikasi langkah demi langkah."
              : "Jangan lupa kumpulkan link GitHub dan link website-mu untuk dinilai."}
          </p>
          <Link
            href={bagian.id === "persiapan" ? "/tutorial/development" : "/kumpulan-karya"}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            {bagian.id === "persiapan" ? "Lanjut ke Tutorial Development" : "Kumpulkan Karya"}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
