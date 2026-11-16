"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, GraduationCap, BookOpen, Trophy, Save, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const PERKS = [
  { icon: BookOpen, title: "6 Modul Terstruktur", desc: "Dari instalasi Android Studio sampai aplikasi SakuSiswa selesai" },
  { icon: Save, title: "Progres Tersimpan", desc: "Lanjutkan kapan saja, dari perangkat mana saja" },
  { icon: Trophy, title: "Ikut Papan Peringkat", desc: "Karya Anda dinilai otomatis dan diperingkat" },
  { icon: ShieldCheck, title: "Sertifikat & Umpan Balik", desc: "Penilaian kualitas kode Kotlin & Room oleh AI" },
];

/**
 * Membungkus halaman yang hanya boleh dibuka setelah login.
 *
 * Selama status login belum pasti, tampilkan skeleton — bukan halaman
 * isi — supaya materi tidak sempat terlihat sebelum dinding muncul.
 */
export function LoginGate({ children, feature = "materi ini" }: { children: React.ReactNode; feature?: string }) {
  const { isAuthenticated, isLoading } = useCurrentUser();
  const pathname = usePathname();
  const [graceExpired, setGraceExpired] = useState(false);

  // Toleransi singkat supaya pengguna yang sudah login tidak berkedip
  useEffect(() => {
    const t = setTimeout(() => setGraceExpired(true), 900);
    return () => clearTimeout(t);
  }, []);

  if (isLoading && !graceExpired) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-3 border-rule border-t-accent animate-spin motion-reduce:animate-none" />
          <p className="text-xs text-muted font-medium">Memeriksa akses…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper py-12 sm:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl border border-rule bg-sheet p-8 sm:p-10 shadow-sm text-center">
            <div className="h-16 w-16 rounded-2xl bg-ink flex items-center justify-center mx-auto mb-5">
              <Lock className="w-8 h-8 text-accent-2" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-3">
              Daftar Dulu untuk Membuka {feature}
            </h1>
            <p className="text-sm text-ink-2 leading-relaxed mb-7 max-w-lg mx-auto">
              Kurikulum ComposeLab dikhususkan untuk peserta terdaftar. Dengan mendaftar,
              progres belajar Anda tersimpan otomatis dan karya Anda bisa ikut dinilai.
              Gratis, tanpa biaya.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
              {PERKS.map((p) => (
                <div key={p.title} className="rounded-xl border border-rule bg-paper p-3.5">
                  <p.icon className="w-4 h-4 text-accent mb-1.5" />
                  <p className="text-xs font-bold text-ink">{p.title}</p>
                  <p className="text-[11px] text-muted leading-snug mt-0.5">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/register?redirect=${encodeURIComponent(pathname)}`} className="sm:flex-1">
                <Button variant="primary" size="lg" className="w-full font-bold">
                  <GraduationCap className="w-4 h-4 mr-1.5" />
                  Daftar Gratis Sekarang
                </Button>
              </Link>
              <Link href={`/login?redirect=${encodeURIComponent(pathname)}`} className="sm:flex-1">
                <Button variant="outline" size="lg" className="w-full font-semibold">
                  Masuk
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            Ingin lihat isi platform dulu?{" "}
            <Link href="/" className="text-accent font-semibold hover:underline">
              Kembali ke Dashboard Utama
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
