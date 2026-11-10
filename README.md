# Vibe Code — Platform Pembelajaran Development Terintegrasi

Platform pembelajaran pengembangan aplikasi web full-stack dari nol sampai online menggunakan **Google Antigravity**, **Next.js 15 App Router**, dan **Supabase PostgreSQL**.

Didesain untuk pelajar, mahasiswa, guru, dosen, pelaku UMKM, dan masyarakat umum agar mampu membangun aplikasi web nyata, memiliki repository GitHub sendiri, dan mempublikasikan karya ke Vercel tanpa hambatan hafalan sintaks rumit.

---

## 🌟 Referensi & Konsep Pengembangan

Platform ini dibangun berdasarkan analisis mendalam terhadap kurikulum dan pengalaman belajar pada worksheet referensi:
🔗 **[https://worksheet.andixurniawan.com/development](https://worksheet.andixurniawan.com/development)** *(Workshop Katalog UMKM - Creative Hub App Talent CHAT 2026)*.

### Peningkatan yang Dihadirkan:
1. **Desain Modern & Responsif**: Palet warna korporat/edukasi (Navy `#0F172A`, Slate `#F8FAFC`, Tech Blue `#0284C7`, dan Teal `#0D9488`).
2. **Formula Prompt 6-Bagian Presisi**: Setiap materi praktik dilengkapi prompt terstruktur (**TUJUAN, KONTEKS, INSTRUKSI, BATASAN, HASIL AKHIR, VALIDASI**) dengan tombol **SALIN PROMPT** yang berfungsi 100%.
3. **Pemisahan Database Bersih**: Skema database platform pembelajaran dipisahkan secara tegas dari skema database proyek latihan katalog UMKM siswa (`supabase/umkm-exercise-schema.sql`).
4. **Sistem Pengumpulan Karya Terpadu**: Formulir pengumpulan karya peserta dengan upload screenshot, verifikasi link publik GitHub & Vercel, riwayat penilaian, dan status revisi.
5. **Dashboard Administrator Kaya Fitur**: Penilaian karya, review detail, CMS modul & materi, ekspor data ke Excel (.xlsx) / CSV, dan integrasi Google Sheets API backend.

---

## 🛠️ Arsitektur Teknologi

- **Frontend**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend**: Next.js Server Actions, Route Handlers, Node.js Test Runner.
- **Database & Auth**: Supabase PostgreSQL (12 Tabel Relasional dengan Row Level Security penuh), Supabase Auth (`@supabase/ssr`), Supabase Storage (`work-submissions`).
- **AI Coding Agent**: Google Antigravity & Agent Mode.
- **Utility & Ekspor**: Zod Validation, SheetJS (`xlsx`), Google Sheets API (`googleapis`).
- **Deployment**: GitHub CI/CD, Vercel Global Edge Network.

---

## 📚 12 Modul Pembelajaran Lengkap

| Modul | Judul Modul | Jumlah Materi | Level |
| :---: | :--- | :---: | :---: |
| **01** | Pengenalan Web Development & AI Coding Agent | 4 Materi | Pemula |
| **02** | Persiapan Lingkungan Pengembangan (Node.js 24, Git, Supabase) | 4 Materi | Pemula |
| **03** | Membuat Proyek Pertama Next.js & App Router | 4 Materi | Pemula |
| **04** | Menguasai Google Antigravity & Agentic Coding | 4 Materi | Pemula |
| **05** | Membangun Frontend Modern dengan Tailwind CSS | 4 Materi | Pemula |
| **06** | Membangun Database Cloud dengan Supabase PostgreSQL | 4 Materi | Menengah |
| **07** | **Membangun Aplikasi Katalog UMKM (Studi Kasus US-01 s/d US-06)** | 6 Materi | Menengah |
| **08** | Membangun Admin Dashboard & Manajemen Produk (CRUD) | 4 Materi | Menengah |
| **09** | Keamanan Aplikasi Web & Proteksi Data (K-6 s/d K-13) | 4 Materi | Lanjutan |
| **10** | Testing Otomatis & Debugging Komprehensif | 4 Materi | Menengah |
| **11** | Version Control GitHub & Deployment Cloud Vercel | 4 Materi | Pemula |
| **12** | Finalisasi Proyek, Checklist Kelulusan & Pengumpulan Karya | 4 Materi | Pemula |

---

## 🚀 Panduan Memulai Cepat

### 1. Kloning Repository & Instal Dependensi
```bash
git clone https://github.com/username/vibe-code-learning-platform.git
cd vibe-code-learning-platform
npm install
```

### 2. Atur Environment Variable
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Isi nilai `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Jika menggunakan mode demonstrasi lokal tanpa koneksi cloud, aplikasi otomatis menjalankan fallback demo localStorage yang aman.

### 3. Jalankan Pengujian Otomatis & Kompilasi
```bash
# Menjalankan test suite unit & integrasi
npm run test

# Memeriksa integritas tipe TypeScript
npm run typecheck

# Membangun bundle produksi Next.js
npm run build
```

### 4. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada alamat: **`http://localhost:3000`**.

---

## 📋 Akun Uji Coba Demo (Default)

- **Administrator**: `admin@vibecode.id` | Password: `admin123` &rarr; Akses ke `/admin`
- **Siswa / Peserta**: Masukkan email dan password apapun (min. 6 digit) &rarr; Akses ke `/dashboard`

---

## 📖 Indeks Dokumentasi Lengkap

1. [Panduan Instalasi & Menjalankan Proyek](docs/PANDUAN_INSTALASI_DAN_RUNNING.md)
2. [Dokumentasi Database & Relasi Tabel](docs/DOKUMENTASI_DATABASE.md)
3. [Panduan Konfigurasi Supabase & Storage](docs/PANDUAN_SUPABASE_DAN_STORAGE.md)
4. [Panduan Environment Variables](docs/PANDUAN_ENVIRONMENT_VARIABLES.md)
5. [Panduan Administrator & Penilaian Karya](docs/PANDUAN_ADMIN_DAN_PENILAIAN.md)
6. [Panduan Pengumpulan Karya Peserta](docs/PANDUAN_PENGUMPULAN_KARYA.md)
7. [Panduan Ekspor Excel & CSV](docs/PANDUAN_EKSPOR_EXCEL_CSV.md)
8. [Panduan Integrasi Google Sheets API](docs/PANDUAN_INTEGRASI_GOOGLE_SHEETS.md)
9. [Panduan Deployment Vercel](docs/PANDUAN_DEPLOYMENT_VERCEL.md)
10. [Panduan Backup & Pemeliharaan Aplikasi](docs/PANDUAN_BACKUP_DAN_MAINTENANCE.md)

---

## 📄 Lisensi & Hak Cipta
Didedikasikan untuk kemajuan talenta teknologi dan digitalisasi UMKM Indonesia.
Proyek ini dilisensikan di bawah Lisensi MIT.
