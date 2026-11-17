import Link from "next/link";
import "./bloom.css";
import { SakuSiswaWorkbench } from "./sakusiswa-workbench";
import { getCurriculumModules } from "@/lib/data-access/curriculum";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ComposeLab — Platform Belajar Android Kotlin & Jetpack Compose",
  description:
    "Kurikulum 10 modul Android Kotlin, Jetpack Compose, Navigation, ViewModel, Room Database, dan DataStore Preferences bersama LLM Gemini.",
};

const MODULES_SUMMARY = [
  {
    num: "01",
    title: "Pengenalan Android Studio & Proyek Pertama",
    desc: "Menyiapkan Android Studio, Version Catalog (libs.versions.toml), MainActivity, dan Emulator.",
  },
  {
    num: "02",
    title: "Membangun Aplikasi Pertama & Tata Letak Dasar",
    desc: "Mengenal val/var, Column, Row, State remember, serta Scaffold dan TopAppBar Material 3.",
  },
  {
    num: "03",
    title: "Bekerja dengan Gambar, Ikon & Resource",
    desc: "Mengelola res/drawable, Image dengan ContentScale, Material Icons, dan strings.xml.",
  },
  {
    num: "04",
    title: "Menerima Input Pengguna & Validasi Form",
    desc: "OutlinedTextField, RadioButton, validasi isError/supportingText, dan State Hoisting.",
  },
  {
    num: "05",
    title: "Navigasi Antar Layar (Navigation Compose)",
    desc: "Menambahkan navigation-compose, rute Screen, NavHost, dan tombol Back di TopAppBar.",
  },
  {
    num: "06",
    title: "ViewModel, StateFlow & Debugging Logcat",
    desc: "Memisahkan logika ke ViewModel, StateFlow, membedah error Logcat, dan FloatingActionButton.",
  },
  {
    num: "07",
    title: "Daftar Dapat Digulir (Scrollable List & Grid)",
    desc: "Membuat model data class, Card item, LazyColumn dengan key, dan LazyVerticalGrid.",
  },
  {
    num: "08",
    title: "Navigasi dengan Mengirim Data (Route Arguments)",
    desc: "Mengirim ID lewat navArgument, halaman Tambah/Edit dengan LaunchedEffect, dan menu hapus.",
  },
  {
    num: "09",
    title: "Penyimpanan Permanen Room Database (KSP)",
    desc: "Konfigurasi KSP, @Entity, @Dao dengan Flow, @Database Singleton, dan CRUD SQLite.",
  },
  {
    num: "10",
    title: "Dialog Konfirmasi & Preferensi (AlertDialog & DataStore)",
    desc: "AlertDialog konfirmasi hapus, DataStore Preferences List/Grid, Build APK, dan push GitHub.",
  },
];

const SCHEDULE = [
  {
    day: "Tahap 1",
    title: "Modul 1 sampai 4 — Fondasi & UI Input",
    desc: "Android Studio, tata letak dasar Jetpack Compose, resource gambar/teks, serta form input dan validasi.",
  },
  {
    day: "Tahap 2",
    title: "Modul 5 sampai 8 — Navigasi & Daftar Data",
    desc: "Navigation Compose, ViewModel & StateFlow, LazyColumn/Grid, serta pengiriman data antar layar.",
  },
  {
    day: "Tahap 3",
    title: "Modul 9 dan 10 — Room, DataStore & Rilis",
    desc: "Penyimpanan permanen Room Database (KSP), AlertDialog, DataStore Preferences, Build APK, dan push GitHub.",
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
                Kurikulum 10 modul bertahap: Kotlin, Jetpack Compose, Navigation, ViewModel, Room Database, dan DataStore.
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
              <p className="bloom-serif-figure">10</p>
              <p className="bloom-serif-caption">
                Modul terpadu dari Android Studio, Compose UI, Navigation, ViewModel, hingga Room Database dan DataStore.
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

      {/* Modul Kurikulum */}
      <section id="kurikulum" className="bloom-section">
        <div className="bloom-container">
          <div className="bloom-section-head">
            <h2>{modulesSummary.length} modul kurikulum Android Compose</h2>
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
