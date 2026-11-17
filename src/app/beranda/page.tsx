import Link from "next/link";
import "./bloom.css";
import { SakuSiswaWorkbench } from "./sakusiswa-workbench";
import { getCurriculumModules } from "@/lib/data-access/curriculum";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ComposeLab — Platform Belajar Pemrograman Terstruktur & AI Prompting",
  description:
    "Platform pembelajaran pemrograman terstruktur dengan pendekatan berpikir komputasional dan prompting AI 6-bagian.",
};

const MODULES_SUMMARY = [
  {
    num: "01",
    title: "Berpikir Komputasional & Prompting AI",
    desc: "Memecah masalah aplikasi menjadi alur logika sebelum menyusun prompt 6-bagian.",
  },
  {
    num: "02",
    title: "Persiapan Lingkungan & Bahasa Pemrograman",
    desc: "Instalasi perangkat kerja, struktur proyek modern, dan dasar bahasa pemrograman.",
  },
  {
    num: "03",
    title: "Antarmuka Pengguna & Navigasi Layar",
    desc: "Membangun antarmuka modern, pengelolaan state, dan navigasi antar halaman.",
  },
  {
    num: "04",
    title: "Autentikasi & Pengelolaan Sesi",
    desc: "Integrasi autentikasi modern dan penyimpanan sesi pengguna secara aman.",
  },
  {
    num: "05",
    title: "Basis Data Lokal & Operasi CRUD",
    desc: "Simpan, baca real-time, ubah, hapus, dan filter data aplikasi.",
  },
  {
    num: "06",
    title: "Debugging, Build Rilis & Pengumpulan Karya",
    desc: "Membaca log error, ekspor paket rilis, push ke GitHub, dan kumpulkan karya.",
  },
];

const SCHEDULE = [
  {
    day: "Tahap 1",
    title: "Modul 1 sampai 3",
    desc: "Cara berpikir terstruktur, persiapan perangkat kerja, dasar bahasa pemrograman, dan antarmuka aplikasi.",
  },
  {
    day: "Tahap 2",
    title: "Modul 4 dan 5",
    desc: "Integrasi autentikasi modern serta pembuatan database lokal lengkap dengan fitur Create, Read, Update, dan Delete.",
  },
  {
    day: "Tahap 3",
    title: "Modul 6 — Pengerjaan Mandiri & Pengumpulan",
    desc: "Penyempurnaan aplikasi masing-masing peserta, uji coba, push GitHub, dan pengumpulan karya di ComposeLab.",
  },
];

export default async function BerandaPage() {
  const liveModules = await getCurriculumModules({ includeUnpublished: false });
  const modulesSummary =
    liveModules.length > 0
      ? liveModules.map((m) => ({
          num: String(m.module_number).padStart(2, "0"),
          title: m.title,
          desc: m.description,
        }))
      : MODULES_SUMMARY;

  return (
    <div className="bloom-page">
      {/* Hero Corridor */}
      <section className="bloom-hero">
        <div className="bloom-container">
          <div className="bloom-hero-grid">
            <div>
              <h1>Bangun aplikasi Android dengan nalar</h1>
              <p className="bloom-lead">
                Pelatihan Android: Kotlin, Compose, Room, dan Google Login.
              </p>

              <div className="bloom-actions">
                <Link href="/register" className="bloom-cta-primary">
                  <span className="bloom-rec" aria-hidden="true">
                    <span className="bloom-rec-cap" />
                  </span>
                  <span>Daftar &amp; Mulai Belajar</span>
                </Link>
                <Link href="/login" className="bloom-cta-secondary">
                  Masuk Akun
                </Link>
              </div>

              <p className="bloom-note">
                Materi lengkap terbuka setelah siswa mendaftar akun di platform ini.
              </p>
            </div>

            <SakuSiswaWorkbench />
          </div>
        </div>
      </section>

      {/* First-visit guidance */}
      <section id="cara-belajar" className="bloom-section">
        <div className="bloom-container">
          <div className="bloom-section-head">
            <h2>Tiga langkah belajar di ComposeLab</h2>
            <p className="bloom-section-sub">
              AI dipakai sebagai teman diskusi dan pembuat draf, sementara kamu tetap memahami alur datanya.
            </p>
          </div>

          <div className="bloom-steps-grid">
            <div className="bloom-step-surface">
              <p className="bloom-step-num">Langkah 01</p>
              <h3>Pikirkan alur dulu</h3>
              <p className="bloom-step-desc">
                Tentukan input, kolom tabel Room, dan respons layar sebelum membuka asisten AI.
              </p>
            </div>
            <div className="bloom-step-surface">
              <p className="bloom-step-num">Langkah 02</p>
              <h3>Tulis prompt 6-bagian</h3>
              <p className="bloom-step-desc">
                Gunakan tujuan, konteks, instruksi, batasan, hasil akhir, dan validasi yang jelas.
              </p>
            </div>
            <div className="bloom-step-surface">
              <p className="bloom-step-num">Langkah 03</p>
              <h3>Uji di Android Studio</h3>
              <p className="bloom-step-desc">
                Baca kode hasilnya, jalankan di Emulator atau HP Android, lalu perbaiki jika ada error di Logcat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule with Coral display figure */}
      <section id="karya" className="bloom-section">
        <div className="bloom-container">
          <div className="bloom-schedule-grid">
            <div>
              <p className="bloom-serif-figure">6</p>
              <p className="bloom-serif-caption">
                Modul terpadu dari fondasi logika, autentikasi, dan database hingga proyek aplikasi siap rilis.
              </p>
              <div className="bloom-actions">
                <Link href="/register" className="bloom-cta-secondary">
                  Gabung Pelatihan
                </Link>
              </div>
            </div>

            <div className="bloom-schedule-rows">
              {SCHEDULE.map((item) => (
                <div key={item.day} className="bloom-schedule-row">
                  <span className="bloom-day-label">{item.day}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="bloom-step-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 Modul Kurikulum */}
      <section id="kurikulum" className="bloom-section">
        <div className="bloom-container">
          <div className="bloom-section-head">
            <h2>Kurikulum terstruktur dan modular</h2>
            <p className="bloom-section-sub">
              Ringkas, namun tetap memuat detail kode, konsep, dan troubleshooting.{" "}
              <Link href="/kurikulum" className="bloom-link">
                Buka halaman kurikulum
              </Link>
            </p>
          </div>

          <div className="bloom-module-list">
            {modulesSummary.map((mod) => (
              <div key={mod.num} className="bloom-module-row">
                <span className="bloom-module-num">{mod.num}</span>
                <div>
                  <h3>{mod.title}</h3>
                  <p className="bloom-step-desc">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership / Roles close */}
      <section className="bloom-section">
        <div className="bloom-container">
          <div className="bloom-section-head">
            <h2>Masuk sesuai peran Anda</h2>
            <p className="bloom-section-sub">
              Siswa dan guru menggunakan pintu masuk yang sama; sistem otomatis menyesuaikan dashboard.
            </p>
          </div>

          <div className="bloom-roles-grid">
            <div className="bloom-role-panel">
              <div>
                <h3>Siswa</h3>
                <ul className="bloom-role-list">
                  <li>Akses modul lengkap beserta blok Pikirkan Dulu dan Prompt AI.</li>
                  <li>Centang progres persiapan perangkat dan langkah pengembangan.</li>
                  <li>Kumpulkan link GitHub, screenshot aplikasi, dan tautan rilis.</li>
                </ul>
              </div>
              <div>
                <Link href="/register" className="bloom-cta-primary">
                  <span className="bloom-rec" aria-hidden="true">
                    <span className="bloom-rec-cap" />
                  </span>
                  <span>Daftar Akun Siswa</span>
                </Link>
              </div>
            </div>

            <div className="bloom-role-panel">
              <div>
                <h3>Guru &amp; Fasilitator</h3>
                <ul className="bloom-role-list">
                  <li>Pantau progres belajar siswa dari modul pertama hingga modul terakhir.</li>
                  <li>Periksa repositori GitHub, screenshot, dan jalankan penilaian karya.</li>
                  <li>Ekspor rekap nilai ke Excel, CSV, atau Google Sheets.</li>
                </ul>
              </div>
              <div>
                <Link href="/login" className="bloom-cta-secondary">
                  Masuk Dashboard Guru
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
