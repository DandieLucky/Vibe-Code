# Panduan Instalasi dan Menjalankan Proyek

Dokumen ini menjelaskan langkah-langkah instalasi, konfigurasi awal, dan cara menjalankan platform pembelajaran development di komputer lokal.

---

## 1. Prasyarat Sistem

Pastikan perangkat komputer Anda memenuhi spesifikasi minimum:
- **Node.js**: Versi 20 LTS atau 24 LTS (direkomendasikan versi 24.x)
- **NPM**: Versi 10 atau 11
- **Git**: Versi 2.x ke atas
- **Browser Modern**: Google Chrome, Microsoft Edge, Firefox, atau Safari versi terbaru
- **Editor Kode**: Visual Studio Code dengan ekstensi Google Antigravity terpasang

---

## 2. Langkah Instalasi

### Langkah 1: Kloning Repository
Buka terminal dan jalankan:
```bash
git clone https://github.com/username/vibe-code-learning-platform.git
cd vibe-code-learning-platform
```

### Langkah 2: Instalasi Dependensi NPM
Instal paket pustaka yang tercantum di `package.json`:
```bash
npm install
```

### Langkah 3: Konfigurasi File Lingkungan (.env.local)
Buat salinan file template konfigurasi:
```bash
cp .env.example .env.local
```
Sesuaikan nilai URL dan Kunci Supabase Anda (lihat panduan `PANDUAN_ENVIRONMENT_VARIABLES.md`).

---

## 3. Skrip Perintah Tersedia

Platform ini menyediakan perintah npm standar untuk seluruh siklus kerja:

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server lokal pengembangan dengan Turbopack/Fast Refresh di port 3000 |
| `npm run build` | Mengompilasi dan mengoptimasi aplikasi untuk rilis produksi (Next.js production build) |
| `npm run start` | Menjalankan server aplikasi Next.js versi build produksi lokal |
| `npm run typecheck` | Memvalidasi seluruh tipe data TypeScript menggunakan `tsc --noEmit` |
| `npm run test` | Menjalankan automated test suite menggunakan Node.js test runner bawaan |
| `npm run lint` | Memindai potensi kesalahan sintaks dan standar kode Next.js ESLint |

---

## 4. Menjalankan Server Lokal (Development)

Jalankan perintah berikut:
```bash
npm run dev
```

Buka peramban dan kunjungi:
```
http://localhost:3000
```

### Navigasi Halaman Utama:
- Beranda: `http://localhost:3000`
- Kurikulum 12 Modul: `http://localhost:3000/kurikulum`
- Kumpulan Karya Peserta: `http://localhost:3000/kumpulan-karya`
- Dashboard Peserta: `http://localhost:3000/dashboard`
- Dashboard Administrator: `http://localhost:3000/admin`
- Halaman Login: `http://localhost:3000/login`

Untuk menghentikan server lokal, tekan tombol keyboard `Ctrl + C` di jendela terminal Anda.
