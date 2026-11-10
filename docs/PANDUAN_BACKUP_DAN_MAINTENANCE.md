# Panduan Backup, Keamanan & Pemeliharaan Aplikasi

Panduan teknis bagi tim pengelola sistem dalam melakukan pencadangan database (backup), audit keamanan berkala, dan pemeliharaan aplikasi jangka panjang.

---

## 1. Strategi Backup Database Supabase

### A. Automatic Daily Backups (Bawaan Supabase)
Supabase secara otomatis mencadangkan seluruh database PostgreSQL Anda setiap hari pada waktu malam hari secara gratis dan menyimpannya selama 7 hari.
- Untuk memulihkan (restore): Buka dashboard Supabase &rarr; **Project Settings** &rarr; **Database** &rarr; **Backups** &rarr; pilih snapshot tanggal yang diinginkan &rarr; klik **Restore**.

### B. Manual Backup Menggunakan `pg_dump`
Untuk backup manual mandiri ke penyimpanan lokal komputer Anda:
```bash
# Menjalankan dump database ke file SQL terkompresi
pg_dump -h db.xxxx.supabase.co -U postgres -d postgres -F c -b -v -f "backup_vibe_code_$(date +%Y%m%d).dump"
```

---

## 2. Pemeliharaan Rutin & Update Dependensi

Setiap 1 hingga 3 bulan, lakukan audit berkala terhadap pustaka dependensi pihak ketiga:
```bash
# 1. Pindai kerentanan keamanan
npm audit

# 2. Periksa apakah ada pustaka versi baru
npm outdated

# 3. Perbarui paket secara aman
npm update
```

Jika terdapat advisory celah keamanan kritis pada paket framework Next.js atau React, segera perbarui versi paket dan jalankan kembali:
```bash
npm run typecheck
npm run test
npm run build
```
Lalu commit dan dorong ke GitHub untuk pembaruan instan di Vercel.

---

## 3. Checklist Audit Keamanan Berkala (K-06 s/d K-13)

| Kode | Kriteria Pemeriksaan | Cara Verifikasi |
| :---: | :--- | :--- |
| **K-06** | Header Keamanan Live | Periksa DevTools Network tab: pastikan header `X-Content-Type-Options: nosniff` dan `X-Frame-Options` aktif. |
| **K-07** | Tanpa dangerouslySetInnerHTML berbahaya | Pindai kode untuk memastikan tidak ada injeksi HTML tanpa sanitasi. |
| **K-08** | `/admin` Tidak Diindeks Mesin Pencari | Periksa tag meta di rute `/admin`: harus memuat `robots: noindex, nofollow`. |
| **K-09** | Error Tanpa Stack Trace | Pastikan `src/app/error.tsx` menyembunyikan detail teknis server dari pengunjung umum. |
| **K-10** | Dependensi Bersih | Hasil eksekusi `npm audit` menunjukkan 0 critical vulnerabilities. |
| **K-11** | Content Security Policy Ketat | Script dan font hanya dimuat dari sumber terpercaya (Google Fonts, Supabase). |
| **K-12** | Rate Limiting Login | Formulir login mencegah serangan tebak password brute-force bertubi-tubi. |
| **K-13** | Bebas Log Data Sensitif | Tab Console browser bersih dari logging password atau token otentikasi. |
