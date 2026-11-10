import React from "react";
import Link from "next/link";
import { Code2, Heart, ExternalLink, ShieldCheck, Github, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                VIBE CODE
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Platform pembelajaran web development terintegrasi berbasis AI Coding Agent Google Antigravity, Next.js App Router, dan Supabase PostgreSQL.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Row Level Security
              </span>
              <span>•</span>
              <span>Next.js 15 Ready</span>
              <span>•</span>
              <span>TypeScript Strict</span>
            </div>
          </div>

          {/* Navigasi Kurikulum */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 tracking-wider uppercase">
              Kurikulum Inti
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/kurikulum/modul-1-pengenalan-web-development" className="hover:text-sky-400 transition-colors">
                  Modul 1: Pengenalan Web & AI
                </Link>
              </li>
              <li>
                <Link href="/kurikulum/modul-4-menguasai-google-antigravity" className="hover:text-sky-400 transition-colors">
                  Modul 4: Google Antigravity
                </Link>
              </li>
              <li>
                <Link href="/kurikulum/modul-6-membangun-database-supabase" className="hover:text-sky-400 transition-colors">
                  Modul 6: Database Supabase
                </Link>
              </li>
              <li>
                <Link href="/kurikulum/modul-7-membangun-aplikasi-katalog-umkm" className="hover:text-sky-400 transition-colors font-semibold text-sky-300">
                  Modul 7: Proyek Katalog UMKM
                </Link>
              </li>
              <li>
                <Link href="/kurikulum/modul-11-github-dan-deployment" className="hover:text-sky-400 transition-colors">
                  Modul 11: Deployment Vercel
                </Link>
              </li>
            </ul>
          </div>

          {/* Fitur & Pengumpulan */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 tracking-wider uppercase">
              Karya & Peserta
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/kumpulan-karya" className="hover:text-sky-400 transition-colors font-medium text-slate-200">
                  Formulir Pengumpulan Karya
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-sky-400 transition-colors">
                  Dashboard Progres Belajar
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-sky-400 transition-colors">
                  Dashboard Administrator
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-sky-400 transition-colors">
                  Pengaturan Profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Referensi Eksternal */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 tracking-wider uppercase">
              Referensi Resmi
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://worksheet.andixurniawan.com/development"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1 text-slate-300"
                >
                  <span>Worksheet Referensi</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <span>Dokumentasi Next.js</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <span>Supabase Cloud</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <span>Vercel Platform</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Vibe Code Platform. Hak cipta dilindungi.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Didesain untuk Pelajar, Mahasiswa, Guru, Dosen, dan Pelaku UMKM Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
