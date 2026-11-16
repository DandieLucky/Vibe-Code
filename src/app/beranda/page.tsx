import Link from "next/link";
import "./bloom.css";
import { SakuSiswaWorkbench } from "./sakusiswa-workbench";

export const metadata = {
  title: "ComposeLab SMKN 1 — Platform Belajar Android & AI Prompting",
  description:
    "Pelatihan 3 hari membangun aplikasi Android SakuSiswa dengan Kotlin, Jetpack Compose, Room Database, dan Google Sign-In untuk kelas 10 SMK Negeri 1 Jakarta.",
};

const MODULES_SUMMARY = [
  {
    num: "01",
    title: "Berpikir Komputasional & Prompting AI",
    desc: "Memecah masalah aplikasi menjadi alur logika sebelum menyusun prompt 6-bagian.",
  },
  {
    num: "02",
    title: "Persiapan Android Studio & Kotlin Dasar",
    desc: "Instalasi JDK, Android Studio, Emulator/HP, serta variabel, data class, dan null-safety.",
  },
  {
    num: "03",
    title: "Jetpack Compose & Desain SakuSiswa",
    desc: "Membangun antarmuka Material 3, state management, dan navigasi layar aplikasi.",
  },
  {
    num: "04",
    title: "Login Google Credential Manager",
    desc: "Autentikasi akun Google modern dan penyimpanan sesi siswa secara lokal.",
  },
  {
    num: "05",
    title: "Room Database (KSP) & CRUD Lengkap",
    desc: "Simpan, baca real-time dengan Flow, ubah, hapus, dan filter tugas per akun.",
  },
  {
    num: "06",
    title: "Debugging, Build APK & Pengumpulan Karya",
    desc: "Membaca Logcat, ekspor APK, push ke GitHub, dan kumpulkan karya untuk dinilai.",
  },
];

const SCHEDULE = [
  {
    day: "Hari 1",
    title: "Modul 1 sampai 3 — Pendampingan Guru",
    desc: "Cara berpikir terstruktur, setup Android Studio, Kotlin dasar, dan tampilan awal SakuSiswa di Jetpack Compose.",
  },
  {
    day: "Hari 2",
    title: "Modul 4 dan 5 — Pendampingan Guru",
    desc: "Integrasi Login Google Credential Manager serta pembuatan Room Database lengkap dengan fitur Create, Read, Update, dan Delete.",
  },
  {
    day: "Hari 3",
    title: "Modul 6 — Pengerjaan Mandiri & Pengumpulan",
    desc: "Penyempurnaan aplikasi masing-masing siswa, uji coba di HP/Emulator, push GitHub, dan pengumpulan karya di ComposeLab.",
  },
];

export default function BerandaPage() {
  return (
    <div className="bloom-page">
      {/* Hero Corridor */}
      <section className="bloom-hero">
        <div className="bloom-container">
          <div className="bloom-hero-grid">
            <div>
              <h1>Bangun aplikasi Android dengan nalar</h1>
              <p className="bloom-lead">
                Pelatihan 3 hari SMKN 1 Jakarta: Kotlin, Compose, Room, dan Google Login.
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
                Materi lengkap terbuka setelah siswa mendaftar akun gratis di platform ini.
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

      {/* Schedule with Gambarino outlier figure */}
      <section id="karya" className="bloom-section">
        <div className="bloom-container">
          <div className="bloom-schedule-grid">
            <div>
              <p className="bloom-serif-figure">3</p>
              <p className="bloom-serif-caption">
                Hari pelatihan terpadu: dua hari bimbingan langsung dan satu hari pengerjaan karya mandiri.
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
            <h2>Enam modul kurikulum SakuSiswa</h2>
            <p className="bloom-section-sub">
              Ringkas untuk 3 hari, namun tetap memuat detail kode, konsep, dan troubleshooting.{" "}
              <Link href="/kurikulum" className="bloom-link">
                Buka halaman kurikulum
              </Link>
            </p>
          </div>

          <div className="bloom-module-list">
            {MODULES_SUMMARY.map((mod) => (
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
                <h3>Siswa Kelas 10 SMKN 1 Jakarta</h3>
                <ul className="bloom-role-list">
                  <li>Akses 6 modul lengkap beserta blok Pikirkan Dulu dan Prompt AI.</li>
                  <li>Centang progres persiapan Android Studio dan langkah SakuSiswa.</li>
                  <li>Kumpulkan link GitHub, screenshot aplikasi, dan link APK.</li>
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
                  <li>Pantau progres belajar siswa dari hari pertama hingga hari ketiga.</li>
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
