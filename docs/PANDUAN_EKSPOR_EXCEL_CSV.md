# Panduan Ekspor Data ke Excel & CSV

Manual penggunaan fitur ekspor data pengumpulan karya peserta ke format spreadsheet Microsoft Excel (`.xlsx`) dan Comma Separated Values (`.csv`).

---

## 1. Akses Menu Ekspor

Buka portal admin pada rute:
```
http://localhost:3000/admin/export
```
Atau klik tombol **Ekspor Excel & CSV** di sidebar admin.

---

## 2. Pilihan Format Berkas

1. **Microsoft Excel (.xlsx)**:
   - Dibuat menggunakan library resmi SheetJS (`xlsx`).
   - Lebar kolom diatur secara otomatis (Auto-fit Width) agar data rapi dan tidak terpotong saat dibuka di Microsoft Excel atau WPS Office.
   - Dilengkapi header tebal dan nama sheet `Kumpulan Karya Peserta`.
2. **CSV (.csv)**:
   - Berkas teks murni berstandar RFC 4180 dengan encoding `UTF-8 with BOM (\uFEFF)`.
   - Kompatibel langsung untuk diimpor ke sistem database lain atau Google Spreadsheet.

---

## 3. Opsi Filter Data Ekspor

Sebelum mengunduh berkas, Anda dapat menentukan cakupan data yang ingin diekspor:
1. **Filter Status**:
   - Semua Status (Seluruh data submission)
   - Hanya Menunggu Pemeriksaan
   - Hanya Diterima (Lulus)
   - Hanya Perlu Revisi
   - Hanya Ditolak
2. **Periode Tanggal**:
   - Menentukan tanggal awal (*Dari Tanggal*) dan tanggal akhir (*Sampai Tanggal*).
3. **Pencarian Kata Kunci**:
   - Menyaring peserta dari institusi tertentu atau nama tertentu.

Klik tombol **Unduh File Excel (.xlsx)** atau **Ekspor CSV (.csv)** untuk langsung mengunduh berkas ke komputer Anda.

---

## 4. Struktur Kolom pada File Ekspor

Data ekspor memuat 15 kolom terperinci:
1. `No`
2. `Nama Lengkap`
3. `Email`
4. `WhatsApp`
5. `Asal Institusi / Sekolah`
6. `Judul Proyek`
7. `Modul Diselesaikan`
8. `Link Repository GitHub`
9. `Link Deployment Vercel`
10. `Screenshot URL`
11. `Dokumen Lampiran`
12. `Status Penilaian`
13. `Nilai / Skor`
14. `Catatan Review Admin`
15. `Tanggal Pengumpulan`
