# Panduan Integrasi Google Sheets API

Panduan konfigurasi sinkronisasi otomatis data karya siswa ke dokumen Google Spreadsheet menggunakan Google Sheets API v4 dan Service Account Google Cloud.

---

## 1. Arsitektur Sinkronisasi

- **Backend-Only Sync**: Seluruh proses autentikasi dan transfer data dilakukan di sisi server Next.js (`src/lib/google-sheets/sheets-client.ts` dan `src/app/api/sync-sheets/route.ts`).
- **Kredensial Aman**: Private Key RSA Google Cloud tersimpan secara terisolasi di environment variable server dan **tidak pernah dikirim ke browser client**.
- **Pencegahan Data Ganda (Deduplication)**: Sinkronisasi menimpa rentang sel (range update) berdasarkan indeks ID unik karya, sehingga menjalankan sinkronisasi berulang kali tidak akan menduplikasi baris.
- **Graceful Fallback**: Jika Google Sheets API belum dikonfigurasi, sistem database utama Supabase dan fitur ekspor Excel (.xlsx) tetap beroperasi normal 100% tanpa gangguan.

---

## 2. Langkah Setup Service Account Google Cloud

### Langkah 1: Buat Proyek di Google Cloud Console
1. Buka [https://console.cloud.google.com](https://console.cloud.google.com).
2. Buat proyek baru dengan nama `Vibe-Code-Sheets-Sync`.

### Langkah 2: Aktifkan Google Sheets API
1. Buka menu **APIs & Services** &rarr; **Library**.
2. Cari `Google Sheets API` dan klik tombol **Enable**.

### Langkah 3: Buat Service Account
1. Buka menu **APIs & Services** &rarr; **Credentials** &rarr; **Create Credentials** &rarr; **Service Account**.
2. Beri nama: `sheets-sync-worker`.
3. Klik **Done**.
4. Klik email Service Account yang baru dibuat (format: `sheets-sync-worker@project-id.iam.gserviceaccount.com`).
5. Buka tab **Keys** &rarr; **Add Key** &rarr; **Create new key** &rarr; pilih format **JSON**.
6. Simpan file JSON yang terunduh di tempat aman di komputer Anda.

### Langkah 4: Bagikan Akses Google Spreadsheet
1. Buka dokumen Google Spreadsheet target Anda di Google Drive.
2. Klik tombol **Share (Bagikan)** di pojok kanan atas.
3. Masukkan alamat email Service Account dari Langkah 3.
4. Berikan hak akses sebagai **Editor**, lalu klik **Share**.

### Langkah 5: Salin Kredensial ke `.env.local`
Buka file `.env.local` dan masukkan:
```bash
GOOGLE_SHEETS_CLIENT_EMAIL="sheets-sync-worker@project-id.iam.gserviceaccount.com"
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
```
*(ID Spreadsheet dapat diambil dari URL dokumen di antara `/d/` dan `/edit`)*.

---

## 3. Menjalankan Sinkronisasi Manual

1. Buka menu **Integrasi Google Sheets** di dashboard admin (`/admin/google-sheets`).
2. Masukkan ID Spreadsheet (jika belum tercantum).
3. Klik tombol **Sinkronkan Sekarang**.
4. Sistem akan mengirimkan seluruh data karya terbaru ke lembar kerja Google Sheets dalam 1-2 detik.
