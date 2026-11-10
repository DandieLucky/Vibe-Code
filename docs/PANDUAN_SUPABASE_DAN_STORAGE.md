# Panduan Konfigurasi Supabase & Cloud Storage

Panduan langkah demi langkah untuk mengonfigurasi proyek Supabase, menjalankan skrip schema database, dan menyiapkan bucket Supabase Storage `work-submissions`.

---

## 1. Menyiapkan Proyek Supabase Baru

1. Buka [https://supabase.com](https://supabase.com) dan login menggunakan akun GitHub Anda.
2. Buat Organization baru (contoh: `Vibe Code Academy` atau nama organisasi Anda).
3. Klik **New Project**:
   - **Name**: `vibe-code-platform`
   - **Database Password**: Buat password yang kuat dan catat di tempat aman.
   - **Region**: Pilih **Singapore (ap-southeast-1)** untuk kecepatan akses dan latensi rendah di Indonesia.
   - **Pricing Plan**: Free Tier.
4. Tunggu sekitar 1-2 menit hingga status database berubah menjadi **Active**.

---

## 2. Menjalankan Skrip Schema & Seed Data

1. Di dashboard Supabase, buka menu **SQL Editor** pada sidebar kiri.
2. Klik **New query**.
3. Buka file `supabase/schema.sql` pada proyek Anda, salin seluruh kodenya, dan tempelkan ke SQL Editor.
4. Klik tombol hijau **Run** di pojok kanan bawah. Pastikan muncul pesan `Success. No rows returned`.
5. Buka kembali tab SQL Editor, salin isi file `supabase/seed.sql`, dan klik **Run** untuk mengisi 12 modul dan data kursus awal.
6. Buka menu **Table Editor** dan pastikan seluruh 12 tabel sudah terbuat.

---

## 3. Menyiapkan Supabase Storage: Bucket `work-submissions`

Bucket ini digunakan untuk menampung tangkapan layar (screenshot) aplikasi dan dokumen PDF karya siswa.

1. Di dashboard Supabase, buka menu **SQL Editor**.
2. Salin isi file `supabase/storage-setup.sql` dan klik **Run**.
3. Skrip tersebut otomatis:
   - Membuat bucket bernama `work-submissions` berstatus publik agar reviewer dapat mem-preview screenshot seketika.
   - Mengatur batas ukuran file maksimum **5 MB** per berkas.
   - Membatasi tipe MIME yang diizinkan hanya: `image/png`, `image/jpeg`, `image/webp`, `application/pdf`, dan `application/zip`.
   - Mengaktifkan Storage RLS Policy sehingga hanya pengguna terautentikasi atau pemilik file yang dapat mengunggah dan mengedit.

---

## 4. Mengambil Kredensial Proyek

1. Di dashboard Supabase, klik ikon gerigi **Project Settings** di bagian bawah sidebar kiri.
2. Buka submenu **Data API**.
3. Salin 3 nilai penting berikut:
   - **Project URL**: `https://xxxx.supabase.co`
   - **Project API Keys (anon public)**: Kunci publik yang aman untuk browser.
   - **Project API Keys (service_role secret)**: Kunci rahasia khusus backend server.

Masukkan nilai-nilai tersebut ke file `.env.local` di komputer pengembang Anda dan ke menu Environment Variables di Vercel.
