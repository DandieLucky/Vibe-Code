# ComposeLab — Platform Pembelajaran Android & AI Prompting

Platform pembelajaran pengembangan aplikasi Android modern menggunakan **Kotlin**, **Jetpack Compose Material 3**, **Room Database (KSP)**, dan **Google Credential Manager API** dengan pendekatan berpikir terstruktur (anti-vibecoding).

---

## Konsep Pembelajaran (Pelatihan 3 Hari)

1. **Desain Hallmark Bloom**: Palet kertas hangat (`--color-paper`), tinta umber (`--color-ink`), dan aksen terracotta (`--color-accent`) dengan tipografi Ranade, Gambarino, dan Geist Mono.
2. **Blok Pikirkan Dulu & Formula Prompt 6-Bagian**: Setiap materi praktik diawali panduan merancang alur logika (*Input-Proses-Output*) sebelum menyusun prompt terstruktur (**TUJUAN, KONTEKS, INSTRUKSI, BATASAN, HASIL AKHIR, VALIDASI**).
3. **Studi Kasus Aplikasi SakuSiswa**: Aplikasi catatan dan manajemen tugas siswa dengan autentikasi akun Google lokal, penyimpanan Room Database per akun, dan operasi CRUD lengkap.
4. **Sistem Pengumpulan & Penilaian Karya Android**: Formulir pengumpulan karya peserta dengan verifikasi repository GitHub publik, unggah screenshot aplikasi Android, serta tautan opsional file APK dan video demo.
5. **Dashboard Administrator**: Penilaian karya otomatis (pemeriksaan struktur proyek Android + evaluasi AI Gemini), ekspor data ke Excel (`.xlsx` via `exceljs`) / CSV, dan integrasi Google Sheets API.

---

## Arsitektur Teknologi Platform

- **Frontend**: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Lucide Icons.
- **Database & Auth**: Supabase PostgreSQL (Row Level Security), Supabase Auth (`@supabase/ssr`), Supabase Storage (`work-submissions`).
- **Utility & Ekspor**: Zod Validation, ExcelJS (`exceljs`), Google Sheets API (`googleapis`).

---

## 6 Modul Pembelajaran (Program 3 Hari)

| Modul | Hari | Judul Modul | Jumlah Materi | Level |
| :---: | :---: | :--- | :---: | :---: |
| **01** | Hari 1 | Berpikir Komputasional, Prompting AI Bijak & Persiapan Android Studio | 4 Materi | Pemula |
| **02** | Hari 1 | Dasar Bahasa Kotlin & Membangun UI dengan Jetpack Compose | 4 Materi | Pemula |
| **03** | Hari 1 | Merancang Antarmuka Utama & Navigasi Aplikasi SakuSiswa | 4 Materi | Pemula |
| **04** | Hari 2 | Autentikasi Akun Google Modern dengan Credential Manager API | 4 Materi | Menengah |
| **05** | Hari 2 | Penyimpanan Lokal Room Database (KSP) & Operasi CRUD Lengkap | 4 Materi | Menengah |
| **06** | Hari 3 | Debugging di Logcat, Kustomisasi Mandiri, Build APK & Pengumpulan Karya | 4 Materi | Pemula |

---

## Panduan Memulai Cepat

```bash
fnm use 24
npm install
cp .env.example .env.local
npm run typecheck
npm run test
npm run dev
```

Buka browser pada alamat **`http://localhost:3000`**.
