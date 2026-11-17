# Blueprint Kurikulum Pemula: Android Kotlin & Jetpack Compose Bersama Gemini (Anti-*Vibecoding*)

Dokumen ini adalah hasil brainstorming (`/grill-me`) dan sintesis riset primer ([`gemini-beginner-coding-pedagogy.md`](file:///Users/erje/Ubuntu/Projects/LearnSMKN1JKT/Vibe-Code/docs/research/gemini-beginner-coding-pedagogy.md)) untuk menyusun materi yang **mudah dipahami pemula total**, **cepat menghasilkan pemahaman nyata**, dan **memanfaatkan LLM Gemini sebagai partner belajar—bukan mesin *vibecoding***.

---

## 1. Prinsip Utama Desain Materi

1. **Satu Konsep Kecil per Materi (Beban Kognitif Rendah):**
   Pemula tidak langsung dibombardir arsitektur berat (`ViewModel`, `Room`, `Coroutines`, `OAuth`) di awal. Setiap materi hanya membahas **1 konsep inti** dengan **1 analogi sehari-hari** dan **10–25 baris kode**.
2. **Siklus Belajar PRIMM (*Predict – Run – Investigate – Modify – Make*):**
   Berdasarkan riset Sentance & Waite (2017; 2019), pemula tidak disuruh menulis kode dari nol sebelum bisa membaca kode:
   - **Predict (Tebak):** Baca potongan kode pendek, tebak output-nya sebelum dijalankan.
   - **Run (Jalankan):** Uji tebakan di Android Studio / Kotlin Playground.
   - **Investigate (Bedah):** Tanya Gemini *"jelaskan baris 3 dan 4 dengan analogi"*, bukan *"buatkan kode baru"*.
   - **Modify (Ubah):** Ubah kode yang ada secara manual (mis. ubah warna, teks, atau kondisi).
   - **Make (Buat):** Baru buat fitur kecil sendiri dengan menyusun spesifikasi Input–Proses–Output terlebih dahulu.
3. **Pagar Anti-*Vibecoding* Saat Memakai Gemini:**
   Riset Bastani et al. (2025) & Prather et al. (2024) membuktikan AI yang langsung memberi kode utuh menurunkan kemampuan mandiri sebesar 17% dan memicu *illusion of competence*. Karena itu, setiap materi menyertakan **Prompt Gemini Berpagar** (*Socratic* & *Explain-Before-Code*).
4. **Opsionalitas Teknis di Backend (Jika Nanti Membuat Tutor In-App):**
   Berdasarkan dokumentasi resmi Google per November 2026, gunakan **`@google/genai`** dengan model **`gemini-4-hydrogen`** melalui **Interactions API** (`ai.interactions.create`) dan `system_instruction` berpagar Socratic + *Structured Outputs* (Zod). *(Catatan: Pada kurikulum tahap ini, siswa cukup memakai Gemini Chat / Gemini in Android Studio secara langsung menggunakan template prompt di bawah).*

---

## 2. Tiga Template Prompt Gemini Wajib untuk Pemula

Setiap materi akan membiasakan siswa memakai 3 pola prompt terstruktur (mengikuti panduan resmi [Prompt Design Strategies](https://ai.google.com/gemini-api/docs/prompting-strategies) dengan delimiter `<aturan>`, `<konteks>`, `<tugas>`):

### A. Mode 1 — Tanya Konsep & Analogi (Saat Baru Kenal Istilah)
```text
<aturan>
Saya programmer pemula total yang sedang belajar Android Kotlin & Jetpack Compose.
Jelaskan dengan bahasa Indonesia sederhana, maksimal 3 paragraf, sertakan 1 analogi sehari-hari, dan JANGAN berikan kode proyek utuh.
</aturan>

<tugas>
Jelaskan apa itu [NAMA KONSEP, mis. val vs var] dan kenapa aplikasi Android membutuhkannya.
</tugas>
```

### B. Mode 2 — Bedah Kode PRIMM (Anti-Salin Buta)
```text
<aturan>
Saya sedang belajar membaca kode Kotlin dengan metode PRIMM.
JANGAN tulis ulang atau perbaiki kode saya secara utuh.
Beri penjelasan baris demi baris yang paling penting, lalu ajukan 1 pertanyaan untuk menguji pemahaman saya.
</aturan>

<kode>
[TEMPEL 5-15 BARIS KODE YANG SEDANG DIPELAJARI]
</kode>

<tugas>
Prediksi saya: [TULIS TEBAKAN SAYA].
Apakah tebakan saya tepat? Jelaskan alurnya langkah demi langkah.
</tugas>
```

### C. Mode 3 — Bedah Error Logcat (Saat Aplikasi Crash / Gagal Build)
```text
<aturan>
Bertindaklah sebagai mentor debugging Socratic untuk pemula Android.
JANGAN langsung memberi kode perbaikan siap salin.
1) Jelaskan arti error ini dalam bahasa manusia.
2) Tunjuk baris atau file mana yang menjadi biang keladinya.
3) Beri 1 petunjuk langkah perbaikan agar saya perbaiki sendiri.
</aturan>

<error_logcat>
[TEMPEL PESAN ERROR MERAH / CAUSED BY DARI LOGCAT]
</error_logcat>
```

---

## 3. Peta Kurikulum: 7 Modul Ringan Bertahap dari Nol

| Modul | Judul Modul | Fokus Konsep (1 Langkah Kecil) | Output Nyata Pemula |
| :---: | :--- | :--- | :--- |
| **01** | **Cara Kerja Aplikasi & Berpikir Terstruktur Bersama Gemini** | Input-Proses-Output, perbedaan *vibecoding* vs *AI-assisted learning*, cara menulis prompt berpagar ke Gemini | Peta alur aplikasi sederhana & akun Gemini siap pakai |
| **02** | **Kotak Data Kotlin (`val`, `var`, Tipe Data, & `if/else`)** | Variabel, tipe teks/angka/boolean, percabangan sederhana, dan null-safety dasar (`?`, `?:`) | Program mini logika penilaian / status tugas di Kotlin |
| **03** | **Daftar Data & Fungsi Kecil (`List`, `data class`, `fun`)** | Mengelompokkan data (`data class`), menyimpan banyak item (`List`), dan menyaring daftar (`filter`) | Simulasi daftar catatan di memori dengan fungsi terpisah |
| **04** | **Layar Pertama dengan Jetpack Compose** | Mengenal `@Composable`, `Text`, `Column`, `Row`, `Card`, dan `Modifier` (padding/warna) | 1 layar kartu profil / kartu catatan rapi di Preview |
| **05** | **Membuat Aplikasi Hidup (`Button`, `State`, & `TextField`)** | Apa itu `remember` & `mutableStateOf` (mengapa layar berubah saat tombol diklik), form input sederhana | Aplikasi mini interaktif (Tambah & Tandai Selesai di layar) |
| **06** | **Menyimpan Data & Berpindah Halaman** | Pengenalan penyimpanan lokal sederhana (`SharedPreferences` / `DataStore` atau `Room` dasar) & navigasi 2 layar | Aplikasi Catatan Harian yang datanya tidak hilang saat ditutup |
| **07** | **Membaca Error Logcat, Modifikasi Mandiri & Rilis ke GitHub** | Membaca baris `Caused by:` di Logcat bersama Gemini Mode 3, menambah 1 fitur kreasi sendiri, build APK, & push GitHub | Karya aplikasi mandiri + README yang dipahami pemula |

*(Setiap modul berisi **3–4 materi singkat** berdurasi ±15 menit agar tidak terasa berat).*

---

## 4. Contoh Lengkap 1 Materi (Siap Pakai untuk CMS Blogspot `/admin/curriculum`)

Contoh ini dirancang agar bisa langsung disalin ke editor Blogspot di `/admin/curriculum`.

- **Judul Materi:** Kotak Penyimpanan Bernama Variabel (`val` vs `var`)
- **Ringkasan Singkat:** Kenali cara komputer menyimpan data sementara menggunakan `val` (terkunci) dan `var` (bisa diubah) tanpa menghafal teori rumit.
- **Estimasi:** `15` menit
- **Tujuan Pembelajaran:** Pemula mampu membedakan kapan memakai `val` dan `var`, serta memprediksi error jika mencoba mengubah nilai `val`.

### Isi Artikel Materi (`concept_explanation`)

```markdown
## Analogi Sederhana: Loker Terkunci vs Papan Tulis

Bayangkan aplikasi Android kamu punya ratusan informasi yang harus diingat: nama pengguna, jumlah tugas, atau status apakah tombol sudah ditekan. Di dalam Kotlin, tempat menyimpan satu informasi disebut **variabel**.

Ada dua jenis kotak penyimpanan di Kotlin:
- **`val` (Value — Loker Terkunci):** Sekali kamu menaruh barang di dalamnya dan menguncinya, isinya **tidak bisa diganti**. Cocok untuk data yang tetap, seperti `namaAplikasi` atau `tanggalLahir`.
- **`var` (Variable — Papan Tulis Kapur):** Isinya bisa dihapus dan ditulis ulang berkali-kali. Cocok untuk data yang berubah, seperti `jumlahPoin` atau `teksYangDiketik`.

> **Aturan Emas Pemula:** Selalu mulai dengan `val`. Baru ganti ke `var` jika kamu memang yakin nilainya perlu berubah di tengah jalan.

---

## Siklus PRIMM (Jangan Langsung Menyalin!)

### 1. Predict (Tebak Dulu!)
Baca 5 baris kode Kotlin di bawah ini. Menurutmu, apa yang terjadi saat baris ke-4 dijalankan?
- Apakah hasilnya mencetak `15`?
- Atau justru muncul error merah?

### 2. Run (Uji Tebakanmu)
Salin kode di cuplikan kode ke Kotlin Playground / Android Studio, lalu jalankan.

### 3. Investigate (Bedah Bersama Gemini)
Jika muncul error atau kamu ragu kenapa `val` menolak diubah, pakai **Prompt Gemini** di bawah ini untuk bertanya—**bukan** meminta Gemini menuliskan program baru.

### 4. Modify (Ubah Sendiri)
Ubah baris ke-2 dari `val` menjadi `var`, lalu tambahkan satu variabel `val namaSiswa = "Budi"` dan cetak keduanya.
```

### Cuplikan Kode (`code_snippets`)
- **Filename:** `BelajarVariabel.kt` | **Language:** `kotlin`
```kotlin
fun main() {
    val poin = 10
    var nyawa = 3
    nyawa = 2
    poin = 15 // Coba tebak: baris ini berhasil atau error?
    println("Poin: $poin, Nyawa: $nyawa")
}
```

### Prompt AI Terstruktur (`antigravity_prompt`)
- **Tujuan:** Memahami perbedaan `val` dan `var` serta membaca pesan error compiler Kotlin dengan bantuan Gemini tanpa menyalin kode jawaban.
- **Konteks:** Saya pemula total belajar Kotlin dasar menggunakan pendekatan PRIMM.
- **Instruksi:**
  1. Baca kode `BelajarVariabel.kt` yang saya tempel.
  2. Jelaskan arti pesan error `Val cannot be reassigned` dalam bahasa sehari-hari.
  3. Berikan 1 pertanyaan latihan singkat untuk menguji apakah saya paham kapan memakai `val` vs `var`.
- **Batasan:**
  1. JANGAN tulis ulang kode yang sudah diperbaiki.
  2. Gunakan maksimal 3 paragraf pendek.
- **Hasil Akhir:** Penjelasan singkat arti error + 1 pertanyaan latihan.
- **Validasi:** Saya bisa menjelaskan ulang dengan kata-kata sendiri mengapa `poin = 15` gagal, lalu memperbaikinya secara manual.

### Checklist Validasi (`validation_check`)
1. Saya sudah menuliskan tebakan *Predict* sebelum menjalankan kode.
2. Saya memahami mengapa `val` menghasilkan error `Val cannot be reassigned`.
3. Saya berhasil mengubah kode secara manual sehingga mencetak `Poin: 15, Nyawa: 2`.

