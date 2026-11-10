# Panduan Deployment Vercel

Panduan komprehensif mempublikasikan platform pembelajaran ini ke jaringan cloud global Vercel dengan otomatisasi integrasi GitHub (CI/CD).

---

## 1. Persiapan Pra-Deployment

Sebelum menghubungkan repository ke Vercel, selalu pastikan kode Anda lulus pengujian lokal:
```bash
# 1. Pastikan tidak ada kesalahan tipe data
npm run typecheck

# 2. Pastikan test suite lulus 100%
npm run test

# 3. Uji kompilasi bundle produksi lokal
npm run build
```
Jika ketiga perintah di atas selesai tanpa error, aplikasi Anda dijamin siap terbit di Vercel.

---

## 2. Langkah Deployment ke Vercel

### Langkah 1: Push Kode ke GitHub
Pastikan seluruh perubahan lokal telah di-commit dan di-push ke branch utama (`main`):
```bash
git add .
git commit -m "feat: rilis platform pembelajaran v1.0.0 siap produksi"
git push origin main
```

### Langkah 2: Impor Proyek di Vercel
1. Buka [https://vercel.com/dashboard](https://vercel.com/dashboard) dan login menggunakan akun GitHub Anda.
2. Klik tombol **Add New...** &rarr; **Project**.
3. Cari repository Anda di daftar dan klik tombol **Import**.

### Langkah 3: Konfigurasi Environment Variables di Vercel
Sebelum mengklik tombol Deploy, buka bagian **Environment Variables** dan tambahkan:
- `NEXT_PUBLIC_SUPABASE_URL` = URL Proyek Supabase Anda
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Kunci Anon Supabase
- `SUPABASE_SERVICE_ROLE_KEY` = Kunci Service Role Supabase
- *(Opsional)* `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEETS_SPREADSHEET_ID`

### Langkah 4: Eksekusi Deploy
1. Klik tombol biru **Deploy**.
2. Mesin Vercel akan mengkloning kode, menginstal modul, dan menjalankan `npm run build` di cloud.
3. Setelah ±1 menit, Anda akan disambut animasi kembang api dan tautan domain live gratis (format: `https://nama-proyek-anda.vercel.app`).

---

## 3. Menghubungkan Domain Kustom (Opsional)

Jika Anda ingin menggunakan domain sendiri (misal: `belajar.domainanda.com`):
1. Di dashboard Vercel, buka proyek Anda &rarr; tab **Settings** &rarr; menu **Domains**.
2. Masukkan nama domain Anda dan klik **Add**.
3. Di panel registrar domain Anda (Cloudflare, Niagahoster, Rumahweb, dsb.), tambahkan DNS record sesuai panduan Vercel:
   - Type `CNAME` &rarr; Host `belajar` &rarr; Target `cname.vercel-dns.com`
4. Sertifikat SSL HTTPS otomatis diterbitkan gratis oleh Vercel dalam hitungan menit.
