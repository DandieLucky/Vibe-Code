# Panduan Pengumpulan Karya Peserta

Panduan lengkap bagi peserta workshop/pelatihan dalam mengumpulkan hasil karya aplikasi web katalog UMKM untuk keperluan evaluasi dan sertifikasi kelulusan.

---

## 1. Syarat Sebelum Mengumpulkan Karya

Pastikan Anda telah menyelesaikan dan memverifikasi checklist berikut:
1. **Aplikasi Online Live di Vercel**: Domain `https://xxxx.vercel.app` dapat dibuka lancar di browser smartphone tanpa perlu login.
2. **Katalog & Detail Produk Berfungsi**: Data produk berhasil diambil dari tabel database Supabase (US-01 & US-02).
3. **Pemesanan WhatsApp Berfungsi**: Tombol WhatsApp di halaman produk membuka obrolan ke nomor toko Anda dengan format pesan rapi (US-03).
4. **Halaman Admin Aman**: Halaman `/admin` tidak bisa dibuka tanpa login admin (US-04 & US-06).
5. **Repository GitHub Publik**: Kode Anda telah di-push ke GitHub dan link repository berstatus publik (bukan private).
6. **PROMPTS.md Lengkap**: File riwayat prompt AI Antigravity tersimpan di root repository Anda.

---

## 2. Langkah Pengisian Formulir Karya

1. Buka menu **Kumpulan Karya** di navigasi atas (`/kumpulan-karya`).
2. Lengkapi kolom data diri:
   - **Nama Lengkap**: Nama asli untuk sertifikat kelulusan.
   - **Alamat Email & WhatsApp**: Kontak aktif yang dapat dihubungi fasilitator.
   - **Asal Institusi**: Nama sekolah, kampus, dinas, atau nama usaha UMKM Anda.
   - **Judul & Deskripsi Proyek**: Ceritakan keunggulan katalog yang Anda bangun.
3. Centang **Modul yang Telah Diselesaikan** pada daftar 12 modul.
4. Masukkan **Link Repository GitHub Publik** Anda (contoh: `https://github.com/username/katalog-umkm`).
5. Masukkan **Link Website Deployment Vercel** Anda (contoh: `https://katalog-budi.vercel.app`).
6. Unggah **Screenshot Aplikasi** (format PNG/JPG/WebP, maksimal 5 MB).
7. Klik tombol **Kirimkan Karya Saya Sekarang**.
8. Setelah berhasil, perayaan confetti akan muncul dan status karya Anda menjadi **Menunggu Pemeriksaan**.

---

## 3. Memantau Status Penilaian

Anda dapat melihat status pemeriksaan karya kapan saja melalui menu **Dashboard Peserta** (`/dashboard`) atau kembali membuka halaman `/kumpulan-karya`.

### Keterangan Status Karya:
- **Menunggu Pemeriksaan (Kuning)**: Karya telah masuk antrean dan sedang menunggu giliran ditinjau oleh fasilitator.
- **Diterima / Lulus (Hijau)**: Seluruh kriteria wajib terpenuhi dengan nilai kelulusan.
- **Perlu Revisi (Oranye)**: Terdapat fitur yang belum berfungsi sesuai spesifikasi. Baca **Catatan Review Admin** di dashboard Anda, perbaiki kodenya, lakukan `git push`, lalu perbarui kiriman karya Anda.
- **Ditolak (Merah)**: Link tidak dapat dibuka atau repository berstatus privat.
