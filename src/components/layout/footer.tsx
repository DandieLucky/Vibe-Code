import React from "react";
import Link from "next/link";
import { Code2, Heart, ExternalLink, ShieldCheck, Github, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-paper-2 text-ink-2 border-t border-rule text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center text-sheet shadow-xs">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-ink tracking-tight">
                COMPOSELAB
              </span>
            </div>
            <p className="text-ink-2 text-sm leading-relaxed max-w-sm">
              Platform pembelajaran pengembangan aplikasi modern dengan pendekatan berpikir terstruktur, manajemen modul fleksibel, dan prompting AI.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Berpikir Terstruktur
              </span>
              <span>AI Prompting</span>
              <span>Proyek Terpadu</span>
            </div>
          </div>

          {/* Navigasi Kurikulum */}
          <div>
            <h4 className="font-bold text-ink text-sm mb-4">
              Kurikulum Inti
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/kurikulum" className="hover:text-accent transition-colors">
                  Modul 1: Prompting &amp; Logika
                </Link>
              </li>
              <li>
                <Link href="/kurikulum" className="hover:text-accent transition-colors">
                  Modul 3: Antarmuka &amp; Navigasi
                </Link>
              </li>
              <li>
                <Link href="/kurikulum" className="hover:text-accent transition-colors">
                  Modul 4: Autentikasi Modern
                </Link>
              </li>
              <li>
                <Link href="/kurikulum" className="hover:text-accent transition-colors font-semibold text-accent">
                  Modul 5: Database Lokal &amp; CRUD
                </Link>
              </li>
              <li>
                <Link href="/kurikulum" className="hover:text-accent transition-colors">
                  Modul 6: Build Rilis &amp; GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Fitur & Pengumpulan */}
          <div>
            <h4 className="font-bold text-ink text-sm mb-4">
              Karya &amp; Peserta
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/kumpulan-karya" className="hover:text-accent transition-colors font-medium text-ink">
                  Formulir Pengumpulan Karya
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-accent transition-colors">
                  Dashboard Progres Belajar
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-accent transition-colors">
                  Dashboard Administrator
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-accent transition-colors">
                  Pengaturan Profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Referensi Eksternal */}
          <div>
            <h4 className="font-bold text-ink text-sm mb-4">
              Referensi Resmi
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://developer.android.com/compose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1 text-ink-2"
                >
                  <span>Jetpack Compose Docs</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://developer.android.com/training/data-storage/room"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>Room Database Guide</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://developer.android.com/identity/sign-in/credential-manager-siwg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>Credential Manager</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://kotlinlang.org/docs/home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>Kotlin Documentation</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} ComposeLab. Hak cipta dilindungi.</p>
          <p className="flex items-center gap-1 text-muted">
            Program Pembelajaran Android
          </p>
        </div>
      </div>
    </footer>
  );
}
