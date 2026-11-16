# 06: Adaptasi Form Pengumpulan Karya Android (`/kumpulan-karya`) & Schema Database

**What to build:** Memperbarui form pengumpulan karya siswa, skema validasi Zod, serta migrasi tabel `work_submissions` agar menerima **Link Repo GitHub (wajib)**, **Screenshot Aplikasi Android (wajib)**, **Link APK di Google Drive/GitHub Release (opsional)**, dan **Link Video Demo (opsional)** menggantikan Link Deploy Vercel.

**Blocked by:** 01: Rebranding Platform ke "ComposeLab SMKN 1" & Penyesuaian Shell Global

**Status:** done

- [x] Form `/kumpulan-karya` tidak lagi meminta URL Vercel, melainkan field khusus karya Android (GitHub Repo wajib, Screenshot wajib, Link APK & Video Demo opsional)
- [x] Migrasi SQL baru (`20261117000001_android_submission_fields.sql`) ditambahkan untuk mendukung kolom link APK / video demo dengan tetap menjaga kompatibilitas data lama
- [x] Siswa dapat mengirim karya dan melihat status pengumpulan di `/kumpulan-karya` dan `/dashboard`

