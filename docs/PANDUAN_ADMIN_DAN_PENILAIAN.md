# Panduan Administrator & Penilaian Karya

Dokumen ini adalah manual operasional bagi tim fasilitator, pengajar, dan administrator dalam mengelola platform, memeriksa hasil karya peserta, memberikan penilaian, serta mengedit konten kurikulum.

---

## 1. Akses Portal Administrator

- URL Admin: **`http://localhost:3000/admin`** (atau domain live `/admin`)
- Akun Default Pengujian:
  - **Email**: `admin@vibecode.id`
  - **Password**: `admin123`

---

## 2. Navigasi Menu Dashboard Admin

### A. Overview Dashboard (`/admin`)
Menampilkan ringkasan metrik real-time:
- Total karya yang dikumpulkan peserta
- Total karya menunggu pemeriksaan
- Total karya diterima (lulus)
- Total karya yang memerlukan revisi
- Visualisasi grafik progress pengumpulan karya
- Tabel 5 kiriman karya terbaru

### B. Kumpulan Karya & Penilaian (`/admin/submissions`)
Pusat evaluasi seluruh karya peserta:
1. **Pencarian & Penyaringan**: Cari berdasarkan nama peserta, email, institusi, atau judul proyek. Saring berdasarkan status (Semua, Menunggu, Diterima, Perlu Revisi, Ditolak).
2. **Review & Penilaian**:
   - Klik tombol **Review** pada baris peserta untuk membuka modal detail.
   - Periksa link repository GitHub dan link deployment Vercel (buka langsung via tombol eksternal).
   - Tinjau screenshot aplikasi jika peserta mengunggah gambar.
   - Ubah status: **Diterima (Lulus)**, **Perlu Revisi**, atau **Ditolak**.
   - Masukkan **Nilai / Skor Akhir (0 - 100)**.
   - Tuliskan **Catatan Review & Umpan Balik** yang akan otomatis terlihat di dashboard peserta.
   - Klik **Simpan Penilaian**.

### C. Manajemen Kurikulum & CMS (`/admin/curriculum`)
Memungkinkan administrator memperbarui konten edukasi tanpa mengotak-atik source code:
- **Tambah Modul Baru**: Masukkan nomor modul, judul, estimasi waktu, level kesulitan, dan deskripsi.
- **Edit / Hapus Modul**: Memperbarui urutan dan teks modul.
- **Tambah Materi & Prompt AI**: Menambahkan topik praktik baru lengkap dengan formula prompt 6-bagian Antigravity (Tujuan, Konteks, Instruksi, Batasan).

### D. Pengaturan Platform (`/admin/settings`)
- **Mode Pendaftaran**:
  - *Pendaftaran Terbuka*: Siapapun dapat mendaftar langsung.
  - *Berdasarkan Undangan Admin*: Peserta wajib memasukkan kode undangan resmi (misal: `CHAT2026`).
- **Tenggat Waktu (Deadline)**: Mengatur tanggal dan jam penutupan penerimaan karya.
- **Pengumuman Situs**: Menampilkan pesan pengumuman di halaman siswa.
