import type { Module, Lesson } from "../../types/database.ts";

export interface FullModule extends Module {
  lessons: Lesson[];
}

export const COURSE_INFO = {
  id: "course-android-compose-smkn1",
  slug: "android-kotlin-jetpack-compose-sakusiswa",
  title: "Pengembangan Aplikasi Android Modern dengan Kotlin, Jetpack Compose & AI Prompting",
  description:
    "Kurikulum intensif (6 modul padat) khusus siswa. Belajar merancang aplikasi Android SakuSiswa (Catatan & Tugas Sekolah) menggunakan Kotlin, Jetpack Compose Material 3, Room Database (KSP), dan Google Credential Manager dengan pola berpikir terstruktur.",
  cover_image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=1200",
  total_modules: 6,
  total_estimated_hours: 18,
  target_audience: [
    "Siswa RPL / PPLG",
    "Pemula Pemrograman Android",
    "Guru & Fasilitator Produktif SMK",
  ],
};

export const MODULES_DATA: FullModule[] = [
  // =========================================================================
  // MODUL 1 (HARI 1 PAGI): BERPIKIR KOMPUTASIONAL, PROMPTING AI & ANDROID STUDIO
  // =========================================================================
  {
    id: "modul-1",
    course_id: "course-android-compose-smkn1",
    module_number: 1,
    title: "Berpikir Komputasional, Prompting AI Bijak & Persiapan Android Studio",
    slug: "modul-1-fondasi-prompting-dan-android-studio",
    description:
      "Membangun pola pikir rekayasa perangkat lunak (Input-Proses-Output), cara memanfaatkan AI sebagai teman diskusi tanpa terjebak vibecoding, serta menyiapkan Android Studio dan struktur proyek.",
    estimated_minutes: 150,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 1,
    created_at: new Date().toISOString(),
    lessons: [
      {
        id: "m1-l1",
        module_id: "modul-1",
        lesson_number: 1,
        title: "Berpikir Terstruktur vs Vibecoding: Cara Kerja Aplikasi Android",
        slug: "berpikir-terstruktur-vs-vibecoding",
        description:
          "Memahami mengapa programmer profesional merancang alur data terlebih dahulu sebelum meminta bantuan AI, serta mengenal komponen utama aplikasi SakuSiswa.",
        estimated_minutes: 35,
        order_index: 1,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu membedakan penggunaan AI yang terarah (AI-Assisted Engineering) dengan menyalin kode secara buta (vibecoding), serta memetakan Input-Proses-Output aplikasi SakuSiswa.",
        prerequisites: ["Menguasai penggunaan dasar laptop dan browser"],
        concept_explanation: `Bayangkan kamu ingin membangun rumah. Jika kamu langsung menyuruh tukang "tolong bangunkan rumah yang bagus" tanpa gambar denah, hasilnya pasti berantakan dan sulit diperbaiki ketika bocor. Di dunia pemrograman, menyuruh AI membuat seluruh aplikasi tanpa kamu pahami alurnya disebut "vibecoding". Saat terjadi error, kamu akan panik karena tidak tahu bagian mana yang rusak.

Sebaliknya, seorang Software Engineer menggunakan pendekatan Berpikir Komputasional (Computational Thinking):
1. Dekomposisi: Memecah aplikasi besar menjadi bagian-bagian kecil (Layar Login, Daftar Tugas, Form Tambah Tugas, Database Lokal).
2. Pola Input -> Proses -> Penyimpanan -> Output:
   - Input: Siswa mengetik judul tugas "PR Matematika Bab Aljabar" dan memilih mata pelajaran.
   - Proses: Aplikasi memeriksa apakah judul tidak kosong, lalu melampirkan email Google siswa yang sedang login.
   - Penyimpanan: Data disimpan ke tabel lokal di HP menggunakan Room Database.
   - Output: Layar Jetpack Compose otomatis menampilkan kartu tugas baru di daftar.

Dalam Pelatihan ini, kita akan membangun satu aplikasi utuh bernama "SakuSiswa" (Aplikasi Catatan & Manajemen Tugas Siswa) dengan tiga pilar wajib: Login Google (Credential Manager), Database Lokal (Room Database), dan fitur CRUD (Create, Read, Update, Delete).`,
        preparation: [
          "Siapkan buku catatan atau aplikasi catatan di laptop untuk menggambar alur aplikasi",
          "Buka halaman Beranda ComposeLab dan amati simulasi alur SakuSiswa",
        ],
        thinking_steps: [
          "Data apa saja yang wajib dicatat saat seorang siswa menambahkan satu tugas sekolah baru?",
          "Mengapa kita perlu menyimpan email akun Google siswa di setiap baris tugas pada database lokal?",
          "Apa yang harus terjadi di layar jika siswa menekan tombol Simpan ketika kolom Judul Tugas masih kosong?",
        ],
        step_instructions: [
          "Buat satu dokumen teks atau catatan baru bernama 'Blueprint-SakuSiswa.md' di folder kerjamu.",
          "Tuliskan daftar 4 fitur utama yang harus ada di aplikasi SakuSiswa: Login Google, Tambah Tugas (Create), Lihat & Filter Tugas (Read), Ubah Status/Isi Tugas (Update), dan Hapus Tugas (Delete).",
          "Tuliskan daftar kolom data yang dibutuhkan untuk satu tugas: id, userEmail, mataPelajaran, judulTugas, catatan, tenggatWaktu, dan isCompleted.",
          "Diskusikan dengan teman sebangku atau guru mengapa setiap tugas harus memiliki 'id' yang unik.",
        ],
        antigravity_prompt: {
          tujuan:
            "Berdiskusi dengan AI untuk memvalidasi rancangan tabel data dan alur Input-Proses-Output aplikasi SakuSiswa.",
          konteks:
            "Siswa SMK sedang merancang aplikasi Android SakuSiswa menggunakan Kotlin, Jetpack Compose, Room Database lokal, dan Login Google.",
          instruksi: [
            "Periksa apakah rancangan kolom data tugas (id, userEmail, subject, title, description, dueDate, isDone) sudah cukup untuk kebutuhan pencatatan tugas harian siswa SMK.",
            "Jelaskan dengan bahasa sederhana untuk siswa bagaimana alur data mengalir dari tombol Simpan di Jetpack Compose menuju Room Database.",
            "Berikan 3 contoh skenario pengujian (test case) sederhana untuk memastikan fitur tambah tugas berjalan benar.",
          ],
          batasan: [
            "Jangan langsung memberikan ratusan baris kode; fokus pada penjelasan diagram alur dan struktur data.",
            "Gunakan analogi kehidupan sekolah sehari-hari.",
          ],
          hasilAkhir:
            "Ringkasan blueprint arsitektur SakuSiswa dan 3 skenario pengujian yang dipahami siswa.",
          validasi:
            "Siswa dapat menjelaskan kembali fungsi setiap kolom data tanpa membaca teks.",
          rawPrompt: `[TUJUAN]\nMemvalidasi rancangan tabel data dan alur Input-Proses-Output aplikasi Android SakuSiswa.\n\n[KONTEKS]\nSaya siswa SMK yang sedang merancang aplikasi Android "SakuSiswa" (pencatat tugas & materi sekolah) dengan Kotlin, Jetpack Compose, Room Database lokal, dan Login Google.\n\n[INSTRUKSI]\n1. Evaluasi rancangan kolom tabel tugas saya: id (Int), userEmail (String), subject (String), title (String), notes (String), dueDate (String), isCompleted (Boolean).\n2. Jelaskan dengan analogi sederhana bagaimana alur data bergerak sejak pengguna menekan tombol "Simpan Tugas" di layar Compose hingga tersimpan di Room Database.\n3. Berikan 3 skenario uji coba (test case) termasuk ketika pengguna salah memasukkan input.\n\n[BATASAN]\nJangan langsung menulis kode lengkap. Jelaskan secara bertahap agar saya memahami logikanya terlebih dahulu.\n\n[HASIL AKHIR]\nPenjelasan alur data Input-Proses-Output dan tabel rancangan data SakuSiswa.\n\n[VALIDASI]\nAjukan 2 pertanyaan singkat di akhir penjelasan untuk menguji apakah saya sudah paham.`,
        },
        code_snippets: [
          {
            filename: "Blueprint-SakuSiswa.md",
            language: "markdown",
            code: `# Blueprint Aplikasi SakuSiswa

## 1. Alur Input - Proses - Output
- **Input**: Akun Google Siswa + Form Tugas (Mata Pelajaran, Judul, Catatan, Tenggat)
- **Proses**: Validasi input tidak kosong -> Simpan/Ubah/Hapus melalui ViewModel & DAO
- **Penyimpanan Lokal**: Room Database (SQLite di dalam perangkat Android)
- **Output**: Daftar kartu tugas interaktif di Jetpack Compose yang terfilter per akun

## 2. Struktur Tabel Tugas (tasks)
| Nama Kolom   | Tipe Data | Keterangan                                  |
| ------------ | --------- | ------------------------------------------- |
| id           | Int (PK)  | Nomor unik otomatis (autoGenerate = true)   |
| userEmail    | String    | Email Google siswa pemilik tugas            |
| subject      | String    | Nama mata pelajaran (misal: Dasar PPLG)     |
| title        | String    | Judul tugas atau PR                         |
| notes        | String    | Detail instruksi atau catatan tambahan      |
| dueDate      | String    | Tanggal pengumpulan (misal: 20 Nov 2026)    |
| isCompleted  | Boolean   | Status tugas (false = Belum, true = Selesai)|`,
          },
        ],
        expected_result:
          "Siswa memiliki blueprint tertulis aplikasi SakuSiswa dan memahami alur kerja aplikasi sebelum menulis satu baris kode pun.",
        validation_check: [
          "Dapat menyebutkan 4 komponen utama: UI Compose, ViewModel, Room Database, dan Google Auth",
          "Memahami mengapa vibecoding berbahaya saat aplikasi mengalami bug",
        ],
        common_errors: [
          {
            error: "Langsung meminta AI 'buatkan aplikasi catatan tugas lengkap' dalam satu prompt.",
            solution:
              "Pecah pembuatan aplikasi per lapis: mulai dari rancangan data, tampilan UI statis, koneksi Room Database, baru autentikasi Google.",
          },
        ],
        exercise:
          "Tambahkan 1 contoh kasus di catatanmu: apa yang terjadi jika dua siswa berbeda login bergantian di HP yang sama menggunakan aplikasi SakuSiswa?",
        quiz: [
          {
            question: "Mengapa kita perlu merancang alur Input-Proses-Output sebelum memberikan prompt ke AI?",
            options: [
              "Agar AI bekerja lebih lambat",
              "Agar kita memahami struktur data dan bisa memverifikasi serta memperbaiki kode yang dihasilkan AI",
              "Karena Android Studio tidak bisa berjalan tanpa dokumen Markdown",
              "Supaya tidak perlu melakukan pengujian aplikasi",
            ],
            correctIndex: 1,
            explanation:
              "Dengan memahami alur logika terlebih dahulu, kita memegang kendali penuh atas arsitektur program dan tahu letak kesalahan jika muncul bug.",
          },
        ],
        references: [
          {
            title: "Guide to App Architecture — Android Developers",
            url: "https://developer.android.com/topic/architecture",
          },
        ],
      },
      {
        id: "m1-l2",
        module_id: "modul-1",
        lesson_number: 2,
        title: "Formula Prompt 6-Bagian: Cara Berdiskusi dengan AI Secara Efektif",
        slug: "formula-prompt-6-bagian-android",
        description:
          "Menguasai teknik menyusun prompt presisi (Tujuan, Konteks, Instruksi, Batasan, Hasil Akhir, Validasi) agar AI menghasilkan kode Kotlin yang bersih dan memberikan penjelasan yang mudah dipahami.",
        estimated_minutes: 35,
        order_index: 2,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu menulis prompt terstruktur 6-bagian untuk meminta bantuan pembuatan komponen Android sekaligus meminta penjelasan baris demi baris.",
        prerequisites: ["Menyelesaikan Materi 1.1 tentang Berpikir Terstruktur"],
        concept_explanation: `AI (seperti Gemini, ChatGPT, atau Claude) sangat pintar, tetapi ia tidak bisa membaca pikiranmu. Jika kamu hanya mengetik "buatkan database tugas", AI mungkin akan membuatkan kode Java lama, atau memakai library yang sudah kadaluarsa (deprecated) seperti 'kapt' atau 'GoogleSignInClient'.

Agar AI selalu memberikan jawaban yang relevan dengan standar Android terbaru (2026) dan sesuai dengan proyekmu, gunakan **Formula Prompt 6-Bagian**:
1. **[TUJUAN]**: Satu kalimat tegas tentang apa yang ingin dicapai.
2. **[KONTEKS]**: Versi bahasa, library, dan nama file di proyekmu (misal: Kotlin, Jetpack Compose Material 3, Room Database dengan KSP).
3. **[INSTRUKSI]**: Langkah-langkah detail yang harus dikerjakan AI, termasuk meminta AI menjelaskan bagian yang sulit.
4. **[BATASAN]**: Hal yang dilarang (misal: Jangan gunakan XML Layout, jangan gunakan kapt, jangan gunakan library berbayar).
5. **[HASIL AKHIR]**: Bentuk output yang kamu harapkan (kode per file + penjelasan fungsi).
6. **[VALIDASI]**: Cara kamu memastikan kodenya benar di Android Studio.`,
        preparation: [
          "Buka asisten AI yang kamu gunakan di browser atau editor",
          "Perhatikan struktur kartu Prompt AI Terstruktur di halaman ini",
        ],
        thinking_steps: [
          "Apa bedanya prompt 'buatkan login google android' dengan prompt yang menyebutkan 'gunakan Android Credential Manager API dan Jetpack Compose'?",
          "Mengapa bagian [BATASAN] sangat penting saat kita meminta kode Android kepada AI?",
          "Kalimat apa yang harus kita tambahkan di [INSTRUKSI] agar kita ikut pintar dan tidak sekadar menyalin kode?",
        ],
        step_instructions: [
          "Baca contoh perbandingan Prompt Buruk vs Prompt 6-Bagian pada blok kode di bawah.",
          "Salin template kosong Formula Prompt 6-Bagian ke catatan pribadimu.",
          "Latih dirimu menulis 1 prompt 6-bagian untuk meminta AI menjelaskan perbedaan 'val' dan 'var' di bahasa Kotlin.",
          "Kirim prompt tersebut ke AI, lalu baca penjelasannya dan catat poin intinya.",
        ],
        antigravity_prompt: {
          tujuan:
            "Melatih penggunaan Formula Prompt 6-Bagian untuk mempelajari konsep dasar Kotlin dan Jetpack Compose bersama AI.",
          konteks:
            "Proyek belajar Android SakuSiswa untuk siswa SMK menggunakan Kotlin dan Jetpack Compose Material 3.",
          instruksi: [
            "Jelaskan mengapa Android modern menggunakan Jetpack Compose dibandingkan XML Layout lama.",
            "Tunjukkan 1 contoh fungsi @Composable paling sederhana yang menampilkan teks sapaan nama siswa.",
            "Jelaskan arti anotasi @Composable dan @Preview baris demi baris.",
          ],
          batasan: [
            "Jangan gunakan XML atau Activity lama (AppCompatActivity).",
            "Gunakan bahasa Indonesia yang ramah untuk siswa SMK.",
          ],
          hasilAkhir:
            "Penjelasan ringkas dan 1 potongan kode fungsi @Composable beserta penjelasannya.",
          validasi:
            "Siswa memahami fungsi @Composable dan @Preview sebelum membuka Android Studio.",
          rawPrompt: `[TUJUAN]\nMemahami konsep dasar fungsi @Composable dan @Preview pada Jetpack Compose.\n\n[KONTEKS]\nSaya siswa SMK yang baru belajar membuat aplikasi Android menggunakan bahasa Kotlin dan Jetpack Compose Material 3.\n\n[INSTRUKSI]\n1. Jelaskan secara singkat mengapa Android modern beralih dari XML ke Jetpack Compose.\n2. Berikan 1 contoh kode fungsi @Composable bernama GreetingSiswa(nama: String, kelas: String).\n3. Jelaskan fungsi setiap baris kode tersebut, terutama arti @Composable dan @Preview.\n\n[BATASAN]\nJangan gunakan XML Layout. Gunakan komponen Material 3 (androidx.compose.material3).\n\n[HASIL AKHIR]\nPotongan kode Kotlin singkat disertai penjelasan baris demi baris.\n\n[VALIDASI]\nBerikan 1 soal tebak output singkat di bagian akhir untuk menguji pemahaman saya.`,
        },
        code_snippets: [
          {
            filename: "Perbandingan-Prompt.txt",
            language: "markdown",
            code: `❌ CONTOH PROMPT BURUK (Vibecoding):
"Buatkan aplikasi catatan tugas Android pakai database."
-> Akibat: AI bingung, memakai kode XML kuno, atau menghasilkan 10 file sekaligus yang penuh error saat di-run.

✅ CONTOH PROMPT TERSTRUKTUR (6-Bagian):
[TUJUAN] Membuat data class Entity Room untuk tabel tugas siswa.
[KONTEKS] Proyek Android Kotlin, Jetpack Compose, Room Database 2.6+ dengan KSP.
[INSTRUKSI]
1. Buat file TaskEntity.kt dengan anotasi @Entity(tableName = "tasks").
2. Sertakan kolom id (PrimaryKey autoGenerate), userEmail, subject, title, dueDate, dan isCompleted.
3. Jelaskan fungsi @PrimaryKey(autoGenerate = true) untuk pemula.
[BATASAN] Hanya buat file TaskEntity.kt dulu, jangan buat DAO atau UI dulu.
[HASIL AKHIR] Kode TaskEntity.kt yang bersih beserta penjelasan anotasi Room.
[VALIDASI] Pastikan tidak ada error import pada paket androidx.room.`,
          },
        ],
        expected_result:
          "Siswa terbiasa menyusun prompt dengan 6 bagian lengkap dan selalu meminta penjelasan logika dari AI.",
        validation_check: [
          "Menghafal 6 komponen prompt: Tujuan, Konteks, Instruksi, Batasan, Hasil Akhir, Validasi",
          "Mampu menyebutkan minimal 2 batasan teknis penting di proyek Android kita (tanpa XML, gunakan KSP bukan kapt)",
        ],
        common_errors: [
          {
            error: "Meminta AI membuat seluruh layar, database, dan login sekaligus dalam satu pesan.",
            solution:
              "Selalu minta satu komponen atau satu file per satu prompt agar mudah diuji dan dipahami.",
          },
        ],
        exercise:
          "Buatlah satu prompt 6-bagian di buku catatanmu untuk meminta AI membuatkan tampilan tombol 'Tambah Tugas' berwarna terracotta di Jetpack Compose!",
        quiz: [
          {
            question: "Bagian mana dalam Formula Prompt 6-Bagian yang mencegah AI menggunakan teknologi Android yang sudah usang seperti XML atau kapt?",
            options: [
              "Bagian Hasil Akhir",
              "Bagian Konteks dan Batasan",
              "Bagian Judul Aplikasi",
              "Bagian Tombol Salin",
            ],
            correctIndex: 1,
            explanation:
              "Konteks dan Batasan memberi pagar tegas kepada AI tentang teknologi yang wajib dipakai (Jetpack Compose, KSP) dan yang dilarang (XML, kapt).",
          },
        ],
      },
      {
        id: "m1-l3",
        module_id: "modul-1",
        lesson_number: 3,
        title: "Instalasi Android Studio, SDK & Menyiapkan Emulator / HP Android",
        slug: "instalasi-android-studio-dan-emulator",
        description:
          "Menyiapkan peralatan tempur utama: Android Studio terbaru, JDK bawaan (JBR 17/21), Android SDK, serta menghubungkan HP Android fisik dengan USB Debugging atau membuat Virtual Device (Emulator).",
        estimated_minutes: 45,
        order_index: 3,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa berhasil memasang Android Studio, membuat proyek Empty Activity (Jetpack Compose), dan menjalankannya di HP Android atau Emulator.",
        prerequisites: ["Laptop Windows 10/11 atau macOS dengan ruang kosong minimal 15 GB"],
        concept_explanation: `Untuk membuat aplikasi Android, kita menggunakan IDE (Integrated Development Environment) resmi dari Google bernama **Android Studio**. Di dalam Android Studio sudah terdapat:
1. **Code Editor Pintar**: Tempat kita menulis kode Kotlin dengan fitur auto-complete dan deteksi error langsung.
2. **JDK (Java Development Kit / JetBrains Runtime)**: Mesin penerjemah kode Kotlin agar bisa dikompilasi menjadi aplikasi Android.
3. **Android SDK (Software Development Kit)**: Kumpulan pustaka sistem Android (misalnya API Level 34 / Android 14 atau API Level 35 / Android 15).
4. **Gradle**: Sistem otomatis yang mengunduh library (seperti Room Database dan Credential Manager) serta merakit kode menjadi file \`.apk\`.

Untuk menguji aplikasi, kamu punya 2 pilihan:
- **Pilihan A (Sangat Disarankan untuk Laptop RAM 8 GB)**: Menggunakan **HP Android Fisik** milikmu sendiri dengan kabel data USB dan mengaktifkan fitur **USB Debugging** di Opsi Pengembang (Developer Options). Cara ini jauh lebih ringan bagi laptop!
- **Pilihan B (Laptop RAM 16 GB+)**: Menggunakan **Android Emulator** (HP virtual di layar laptop) melalui menu Device Manager.`,
        preparation: [
          "Pastikan koneksi internet stabil untuk mengunduh komponen Gradle pertama kali",
          "Siapkan kabel data USB (yang bisa transfer data, bukan hanya cas) jika ingin memakai HP Android sendiri",
        ],
        thinking_steps: [
          "Mengapa menggunakan HP Android fisik via USB Debugging lebih disarankan jika RAM laptopmu 8 GB?",
          "Apa fungsi Gradle saat pertama kali kita membuka proyek baru di Android Studio?",
        ],
        step_instructions: [
          "Buka Android Studio, lalu klik tombol 'New Project'.",
          "Pada daftar template, pilih 'Empty Activity' (yang memiliki ikon logo Jetpack Compose), lalu klik Next.",
          "Isi Name dengan 'SakuSiswa', Package name dengan 'id.composelab.sakusiswa', Minimum SDK pilih 'API 26 (Android 8.0)', dan Build configuration language pilih 'Kotlin DSL (build.gradle.kts) [Recommended]'.",
          "Klik Finish dan tunggu proses 'Gradle Sync' di pojok kanan bawah selesai (jangan panik jika butuh beberapa menit saat pertama kali).",
          "Jika memakai HP fisik: buka Pengaturan HP -> Tentang Ponsel -> ketuk 'Nomor Versi / Build Number' 7 kali sampai muncul 'Anda adalah pengembang'. Masuk ke Opsi Pengembang -> aktifkan 'Debugging USB', lalu colokkan HP ke laptop dan pilih 'Izinkan / Allow'.",
          "Klik tombol segitiga hijau 'Run app' di bagian atas Android Studio dan pastikan layar 'Hello Android!' tampil di HP atau Emulator.",
        ],
        antigravity_prompt: {
          tujuan:
            "Memahami langkah pemecahan masalah (troubleshooting) jika proses Gradle Sync atau deteksi HP USB Debugging mengalami kendala.",
          konteks:
            "Siswa baru pertama kali membuat project 'Empty Activity' (Jetpack Compose) di Android Studio dengan Kotlin DSL.",
          instruksi: [
            "Jelaskan apa yang sedang dilakukan Android Studio saat status bar menampilkan 'Gradle Download / Indexing'.",
            "Berikan panduan langkah demi langkah mengaktifkan USB Debugging di HP Xiaomi/Samsung/Oppo/Vivo.",
            "Jelaskan solusi jika muncul error 'SDK location not found' atau 'Cachedajar/Gradle sync failed'.",
          ],
          batasan: [
            "Berikan langkah praktis yang aman dilakukan oleh siswa pemula tanpa mengubah pengaturan sistem operasi yang berbahaya.",
          ],
          hasilAkhir:
            "Panduan ringkas mengatasi kendala awal Android Studio dan USB Debugging.",
          validasi:
            "Nama perangkat HP atau Emulator muncul di dropdown daftar device Android Studio.",
          rawPrompt: `[TUJUAN]\nMengatasi kendala awal pembuatan proyek baru Android Studio dan koneksi USB Debugging.\n\n[KONTEKS]\nSaya siswa SMK menggunakan Android Studio untuk proyek baru "SakuSiswa" dengan template Empty Activity (Jetpack Compose) dan Kotlin DSL.\n\n[INSTRUKSI]\n1. Jelaskan secara sederhana apa yang terjadi saat proses "Gradle Sync" berlangsung.\n2. Berikan langkah praktis mengaktifkan Developer Options & USB Debugging di HP Android.\n3. Berikan 3 solusi paling efektif jika HP sudah dicolokkan ke laptop tetapi belum muncul di daftar device Android Studio.\n\n[BATASAN]\nGunakan bahasa yang jelas, singkat, dan mudah diikuti pemula.\n\n[HASIL AKHIR]\nChecklist langkah koneksi HP ke Android Studio.\n\n[VALIDASI]\nPastikan saya tahu cara mengecek status perangkat lewat tab Device Manager.`,
        },
        code_snippets: [
          {
            filename: "Konfigurasi-Project-Baru.txt",
            language: "yaml",
            code: `Template Project : Empty Activity (Jetpack Compose)
Name             : SakuSiswa
Package Name     : id.composelab.sakusiswa
Save Location    : Folder kerja masing-masing siswa
Minimum SDK      : API 26 ("Oreo"; Android 8.0)
Build Config     : Kotlin DSL (build.gradle.kts) [Recommended]`,
          },
        ],
        expected_result:
          "Proyek SakuSiswa berhasil dibuat, Gradle Sync selesai dengan tanda centang hijau, dan aplikasi awal 'Hello Android!' tampil di HP atau Emulator.",
        validation_check: [
          "Tidak ada garis merah pada file MainActivity.kt",
          "Perangkat HP atau Emulator terdeteksi di toolbar atas Android Studio",
          "Aplikasi pertama berhasil terbuka saat tombol Run (▶) ditekan",
        ],
        common_errors: [
          {
            error: "Salah memilih 'Empty Views Activity' (XML) bukannya 'Empty Activity' (berlogo Compose).",
            solution:
              "Pastikan memilih 'Empty Activity' paling pertama yang memiliki ikon kubus biru-hijau Jetpack Compose.",
          },
          {
            error: "HP sudah dicolokkan ke laptop tapi tidak terdeteksi di Android Studio.",
            solution:
              "Ganti kabel USB dengan kabel yang mendukung transfer data, ubah mode USB di notifikasi HP dari 'Hanya Mengisi Daya' ke 'Transfer File / MTP', dan centang 'Selalu izinkan dari komputer ini' pada pop-up RSA di layar HP.",
          },
        ],
        exercise:
          "Ubah teks 'Android' di dalam fungsi Greeting(\"Android\") pada file MainActivity.kt menjadi nama lengkapmu, lalu tekan tombol Run lagi!",
        quiz: [
          {
            question: "Template proyek manakah yang wajib kita pilih di Android Studio untuk membangun UI modern dengan Jetpack Compose?",
            options: [
              "Empty Views Activity",
              "Empty Activity (dengan logo Jetpack Compose)",
              "Basic Views Activity",
              "Native C++",
            ],
            correctIndex: 1,
            explanation:
              "Empty Activity dengan logo Jetpack Compose sudah otomatis menyiapkan MainActivity berbasis ComponentActivity dan fungsi @Composable tanpa file XML.",
          },
        ],
      },
      {
        id: "m1-l4",
        module_id: "modul-1",
        lesson_number: 4,
        title: "Anatomi Proyek Android: Manifest, MainActivity & Gradle Version Catalog",
        slug: "anatomi-proyek-android-modern",
        description:
          "Mengenal peta folder di Android Studio agar tidak tersesat: perbedaan build.gradle.kts (Project vs Module), libs.versions.toml, AndroidManifest.xml, dan MainActivity.kt.",
        estimated_minutes: 35,
        order_index: 4,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa memahami fungsi setiap file dan folder utama pada proyek Android modern serta tahu di mana harus meletakkan file baru.",
        prerequisites: ["Proyek SakuSiswa sudah terbuka di Android Studio"],
        concept_explanation: `Saat kamu mengubah tampilan panel kiri Android Studio ke mode **"Android"**, kamu akan melihat dua bagian besar: **app** dan **Gradle Scripts**. Mari kita kenali fungsinya satu per satu:

1. **app/manifests/AndroidManifest.xml**: "KTP" dari aplikasimu. Di sini tercatat nama aplikasi, ikon, izin akses (seperti izin internet untuk Login Google), dan Activity mana yang pertama kali dibuka.
2. **app/kotlin+java/id.composelab.sakusiswa/**: Tempat seluruh kode program Kotlin kita berada! Di dalamnya ada \`MainActivity.kt\` (pintu masuk utama aplikasi) dan folder \`ui.theme\` (pengaturan warna & font).
3. **app/res/**: Tempat menyimpan gambar (drawable), ikon aplikasi (mipmap), dan teks statis (values/strings.xml).
4. **Gradle Scripts/libs.versions.toml**: Daftar katalog versi library (Version Catalog). Di Android modern, kita mendaftarkan versi Room dan Credential Manager di sini agar rapi.
5. **Gradle Scripts/build.gradle.kts (Module :app)**: Tempat kita memasang plugin (seperti KSP) dan menambahkan \`implementation(...)\` library yang dibutuhkan aplikasi.`,
        preparation: [
          "Pastikan dropdown di pojok kiri atas panel Project Android Studio diatur ke tampilan 'Android' (bukan 'Project')",
        ],
        thinking_steps: [
          "Mengapa ada dua file bernama build.gradle.kts di bagian Gradle Scripts? Apa bedanya yang bertuliskan (Project: SakuSiswa) dan (Module :app)?",
          "Jika nanti kita ingin menambahkan library Room Database, file mana yang harus kita buka?",
        ],
        step_instructions: [
          "Klik dua kali pada file 'AndroidManifest.xml' dan temukan baris android:label=\"@string/app_name\".",
          "Buka 'app/kotlin+java/id.composelab.sakusiswa/MainActivity.kt' dan perhatikan fungsi onCreate() serta blok setContent { ... }.",
          "Buka 'Gradle Scripts -> build.gradle.kts (Module :app)' dan amati blok android { ... } serta dependencies { ... }.",
          "Buat 3 package (folder) baru di dalam 'id.composelab.sakusiswa' dengan cara klik kanan -> New -> Package: beri nama 'data', 'ui', dan 'viewmodel' untuk persiapan arsitektur rapi kita.",
        ],
        antigravity_prompt: {
          tujuan:
            "Memahami fungsi blok kode di dalam MainActivity.kt dan build.gradle.kts (Module :app).",
          konteks:
            "Proyek Android Studio SakuSiswa dengan package id.composelab.sakusiswa menggunakan Kotlin DSL.",
          instruksi: [
            "Jelaskan fungsi ComponentActivity(), onCreate(), enableEdgeToEdge(), dan setContent {} di dalam MainActivity.kt.",
            "Jelaskan perbedaan namespace dan applicationId di dalam build.gradle.kts (Module :app).",
            "Jelaskan mengapa kita membagi kode ke dalam 3 package: data, ui, dan viewmodel.",
          ],
          batasan: [
            "Jelaskan dengan kalimat pendek dan poin-poin yang mudah dicerna siswa.",
          ],
          hasilAkhir:
            "Kamus ringkas fungsi bagian-bagian MainActivity.kt dan struktur package proyek.",
          validasi:
            "Siswa sudah membuat package data, ui, dan viewmodel di dalam package utama proyek.",
          rawPrompt: `[TUJUAN]\nMemahami isi file MainActivity.kt dan struktur package aplikasi SakuSiswa.\n\n[KONTEKS]\nProyek Android Kotlin Jetpack Compose dengan package id.composelab.sakusiswa.\n\n[INSTRUKSI]\n1. Jelaskan fungsi baris kode berikut kepada siswa SMK: class MainActivity : ComponentActivity(), override fun onCreate(), enableEdgeToEdge(), dan setContent {}.\n2. Jelaskan mengapa memisahkan kode ke dalam package 'data', 'ui', dan 'viewmodel' jauh lebih rapi dibandingkan menumpuk semua kode di satu file MainActivity.kt.\n\n[BATASAN]\nGunakan analogi sederhana (misal: dapur restoran, pelayan, dan meja pelanggan).\n\n[HASIL AKHIR]\nPenjelasan per bagian kode dan analogi arsitektur folder.\n\n[VALIDASI]\nPastikan saya paham file mana yang harus diedit ketika ingin menambah library baru.`,
        },
        code_snippets: [
          {
            filename: "Struktur-Package-SakuSiswa.txt",
            language: "markdown",
            code: `id.composelab.sakusiswa/
├── data/          # Tempat menyimpan Room Entity (TaskEntity), DAO (TaskDao), Database, & GoogleAuthManager
├── viewmodel/     # Tempat menyimpan pengatur logika layar (TaskViewModel)
├── ui/            # Tempat menyimpan layar Compose (LoginScreen, HomeScreen, TaskDialog) & theme/
└── MainActivity.kt # Pintu masuk utama yang menghubungkan semuanya`,
          },
        ],
        expected_result:
          "Siswa mengenali letak file penting di Android Studio dan telah menyiapkan 3 folder package (data, viewmodel, ui) untuk proyek SakuSiswa.",
        validation_check: [
          "Dapat menunjukkan letak build.gradle.kts (Module :app) tanpa salah buka",
          "Memiliki package data, viewmodel, dan ui di dalam id.composelab.sakusiswa",
        ],
        common_errors: [
          {
            error: "Menambahkan dependencies library di build.gradle.kts (Project: SakuSiswa) bukan di (Module :app).",
            solution:
              "Selalu perhatikan keterangan di dalam tanda kurung di sebelah nama file: library aplikasi selalu ditambahkan di (Module :app).",
          },
        ],
        exercise:
          "Buka file res/values/strings.xml, lalu ubah nilai app_name dari 'SakuSiswa' menjadi 'SakuSiswa', jalankan ulang aplikasi dan lihat nama aplikasinya di daftar menu HP!",
        quiz: [
          {
            question: "Di manakah kita menambahkan daftar library (dependencies) seperti Room Database dan Credential Manager pada proyek Android?",
            options: [
              "Di dalam file AndroidManifest.xml",
              "Di dalam file build.gradle.kts (Module :app)",
              "Di dalam file strings.xml",
              "Di dalam folder res/drawable",
            ],
            correctIndex: 1,
            explanation:
              "File build.gradle.kts (Module :app) memiliki blok dependencies { ... } yang bertugas mengatur pustaka apa saja yang dipakai oleh modul aplikasi.",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // MODUL 2 (HARI 1 SIANG): DASAR KOTLIN & JETPACK COMPOSE MATERIAL 3
  // =========================================================================
  {
    id: "modul-2",
    course_id: "course-android-compose-smkn1",
    module_number: 2,
    title: "Dasar Bahasa Kotlin & Membangun UI dengan Jetpack Compose",
    slug: "modul-2-dasar-kotlin-dan-jetpack-compose",
    description:
      "Menguasai pondasi bahasa Kotlin yang paling sering dipakai di Android (val/var, Null-Safety, data class, fungsi) serta merakit tampilan interaktif menggunakan Jetpack Compose dan Material 3.",
    estimated_minutes: 180,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 2,
    created_at: new Date().toISOString(),
    lessons: [
      {
        id: "m2-l1",
        module_id: "modul-2",
        lesson_number: 1,
        title: "Variabel Kotlin (val vs var), Tipe Data & Null-Safety Anti-Crash",
        slug: "variabel-kotlin-dan-null-safety",
        description:
          "Memahami cara menyimpan data di memori menggunakan val dan var, merangkai teks dengan String Template ($), serta fitur unggulan Kotlin Null-Safety (? dan ?:) agar aplikasi tidak mudah Force Close.",
        estimated_minutes: 45,
        order_index: 1,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu menggunakan val, var, String Template, dan operator Elvis (?:) untuk menangani data kosong dengan aman.",
        prerequisites: ["Menyelesaikan Modul 1"],
        concept_explanation: `Bahasa **Kotlin** dipilih Google sebagai bahasa utama Android karena ringkas dan aman. Ada 3 aturan dasar yang wajib kamu kuasai:

1. **\`val\` vs \`var\`**:
   - Gunakan **\`val\`** (Value / Tetap) untuk data yang tidak berubah setelah diisi, misalnya NISN atau ID tugas. Biasakan selalu memakai \`val\` terlebih dahulu!
   - Gunakan **\`var\`** (Variable / Bisa Berubah) hanya jika nilainya memang perlu diganti, misalnya teks yang sedang diketik pengguna.
2. **String Template (\`$nama\`)**:
   - Kita bisa menyisipkan isi variabel langsung ke dalam tanda kutip teks menggunakan tanda dolar, contohnya: \`"Halo, $namaSiswa dari kelas $kelas"\`.
3. **Null-Safety (\`?\` dan \`?:\`)**:
   - Penyebab aplikasi Android paling sering *Force Close* (keluar sendiri) adalah \`NullPointerException\` (mencoba membaca data yang ternyata kosong/null).
   - Di Kotlin, variabel biasa **dilarang** bernilai \`null\`. Jika suatu data *boleh* kosong (misalnya foto profil Google belum ada), kita wajib memberi tanda tanya \`String?\`.
   - Saat menampilkannya, kita gunakan operator Elvis \`?:\` untuk memberi nilai cadangan, contoh: \`val namaTampil = namaGoogle ?: "Siswa"\`.`,
        preparation: [
          "Buka proyek SakuSiswa di Android Studio",
        ],
        thinking_steps: [
          "Saat pengguna login dengan akun Google, bagaimana jika akun Google tersebut tidak mengatur nama tampilan (displayName bernilai null)?",
          "Manakah yang sebaiknya menggunakan 'val' dan manakah yang menggunakan 'var': (a) Email akun Google yang login, (b) Status centang tugas selesai/belum?",
        ],
        step_instructions: [
          "Buka file MainActivity.kt dan perhatikan bagaimana variabel dideklarasikan.",
          "Cobalah membuat variabel 'val namaSiswa: String = \"Budi\"' dan 'val panggilan: String? = null' di dalam fungsi @Composable.",
          "Gunakan operator Elvis 'val sapaan = panggilan ?: namaSiswa' lalu tampilkan ke komponen Text().",
          "Lihat hasilnya melalui panel Split / Preview di sebelah kanan editor Android Studio.",
        ],
        antigravity_prompt: {
          tujuan:
            "Memahami penggunaan val, var, dan Null-Safety (?.) serta operator Elvis (?:) pada kasus profil siswa di aplikasi SakuSiswa.",
          konteks:
            "Belajar dasar Kotlin untuk aplikasi Android SakuSiswa SMK.",
          instruksi: [
            "Berikan contoh kode Kotlin singkat yang memperlihatkan perbedaan val dan var.",
            "Tunjukkan bagaimana cara aman menangani data profil Google (displayName: String?, email: String?) menggunakan operator Elvis (?:).",
            "Berikan penjelasan mengapa Kotlin melarang nilai null pada tipe String biasa (tanpa tanda tanya).",
          ],
          batasan: [
            "Gunakan contoh kasus siswa SMK dan tugas sekolah.",
          ],
          hasilAkhir:
            "Contoh kode pendek dan penjelasan Null-Safety yang mudah dipahami.",
          validasi:
            "Siswa dapat memperbaiki error 'Null can not be a value of a non-null type String'.",
          rawPrompt: `[TUJUAN]\nMenguasai penggunaan val, var, dan Null-Safety (? dan ?:) di Kotlin.\n\n[KONTEKS]\nSaya siswa SMK yang sedang belajar Kotlin untuk membuat aplikasi Android SakuSiswa.\n\n[INSTRUKSI]\n1. Berikan contoh perbedaan val dan var menggunakan kasus data siswa.\n2. Tunjukkan contoh penggunaan nullable type (String?) dan Elvis operator (?:) ketika mengambil nama akun Google yang mungkin kosong (null).\n3. Jelaskan mengapa muncul pesan error "Null can not be a value of a non-null type String" dan bagaimana cara memperbaikinya.\n\n[BATASAN]\nGunakan contoh kode singkat maksimal 20 baris.\n\n[HASIL AKHIR]\nPenjelasan ringkas dan contoh kode Kotlin yang aman dari NullPointerException.\n\n[VALIDASI]\nBerikan 2 baris kode yang sengaja salah soal null, lalu minta saya menebak perbaikannya.`,
        },
        code_snippets: [
          {
            filename: "LatihanKotlinDasar.kt",
            language: "kotlin",
            code: `// 1. val (tidak bisa diubah) vs var (bisa diubah)
val sekolah = "SMK Contoh"
var jumlahTugasSelesai = 0
jumlahTugasSelesai = jumlahTugasSelesai + 1 // Boleh karena var

// 2. Nullable (?) dan Operator Elvis (?:)
val namaAkunGoogle: String? = null // Bisa saja kosong dari Google
val namaYangDitampilkan: String = namaAkunGoogle ?: "Siswa"

// 3. String Template ($)
val pesanHeader = "Halo, $namaYangDitampilkan dari $sekolah! Kamu sudah menyelesaikan $jumlahTugasSelesai tugas."`,
          },
        ],
        expected_result:
          "Siswa memahami kapan menggunakan val/var dan cara melindungi aplikasi dari error data kosong (null) dengan operator Elvis (?:).",
        validation_check: [
          "Dapat menjelaskan perbedaan String dan String?",
          "Dapat menggunakan ?: untuk memberi teks cadangan ketika variabel bernilai null",
        ],
        common_errors: [
          {
            error: "Menggunakan operator !! (double bang) seperti namaAkunGoogle!! yang memaksa data tidak null.",
            solution:
              "Hindari penggunaan !! karena jika datanya benar-benar null, aplikasi akan langsung Force Close. Gunakan ?: (Elvis operator) sebagai gantinya.",
          },
        ],
        exercise:
          "Buatlah variabel nullable 'val catatanTambahan: String? = null', lalu tampilkan teks 'Tidak ada catatan tambahan' jika variabel tersebut bernilai null!",
        quiz: [
          {
            question: "Apa hasil dari kode: val hasil = namaPanggilan ?: \"Siswa\" jika variabel namaPanggilan bernilai null?",
            options: [
              "Aplikasi langsung Force Close",
              "Nilai hasil berisi teks \"Siswa\"",
              "Nilai hasil berisi teks \"null\"",
              "Kode gagal dikompilasi",
            ],
            correctIndex: 1,
            explanation:
              "Operator Elvis (?:) akan mengambil nilai di sebelah kanan (\"Siswa\") apabila ekspresi di sebelah kiri bernilai null.",
          },
        ],
      },
      {
        id: "m2-l2",
        module_id: "modul-2",
        lesson_number: 2,
        title: "Data Class, List & Pengenalan Coroutines (suspend) di Kotlin",
        slug: "data-class-list-dan-coroutines",
        description:
          "Membuat cetakan objek tugas dengan data class, mengelola kumpulan tugas dengan List dan filter(), serta mengenal fungsi suspend untuk operasi database dan login yang tidak membuat layar macet.",
        estimated_minutes: 45,
        order_index: 2,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu membuat data class untuk membungkus informasi tugas, memfilter List tugas berdasarkan status/mata pelajaran, dan memahami alasan digunakannya fungsi suspend.",
        prerequisites: ["Menyelesaikan Materi 2.1"],
        concept_explanation: `Dalam aplikasi SakuSiswa, kita tidak mungkin menyimpan 10 tugas dengan membuat variabel \`judul1\`, \`judul2\`, \`judul3\` satu per satu. Kita membutuhkan:

1. **\`data class\`**: Cetakan khusus di Kotlin untuk membungkus beberapa data yang saling berkaitan menjadi satu objek utuh (misalnya satu objek \`Tugas\` memiliki \`id\`, \`mapel\`, \`judul\`, dan \`selesai\`). Kelebihan \`data class\` adalah memiliki fungsi \`.copy()\` untuk mengubah satu nilai dengan mudah (misalnya mengubah \`selesai = false\` menjadi \`true\`).
2. **\`List<Tugas>\` dan \`.filter { ... }\`**: Kumpulan banyak objek tugas yang berurutan. Dengan fungsi \`.filter { !it.selesai }\`, kita bisa menyaring hanya tugas yang belum selesai dalam satu baris kode!
3. **Coroutines (\`suspend fun\`)**: Layar HP Android menggambar tampilan 60 hingga 120 kali per detik di jalur utama (*Main Thread*). Jika kita membaca database atau menghubungi server Google Login di jalur utama, layar HP akan membeku (*freeze / Not Responding*). Karena itu, operasi database Room dan Login Google dijalankan di jalur latar belakang menggunakan kata kunci **\`suspend\`** (Coroutines).`,
        preparation: [
          "Siapkan package 'data' yang sudah dibuat pada Modul 1",
        ],
        thinking_steps: [
          "Jika kita ingin mengubah status sebuah objek data class Task dari belum selesai (false) menjadi selesai (true), mengapa fungsi .copy(isCompleted = true) sangat membantu?",
          "Apa yang akan dirasakan pengguna jika proses baca/tulis 1.000 baris database dijalankan di Main Thread tanpa Coroutines?",
        ],
        step_instructions: [
          "Buat contoh data class bernama 'PreviewTask' untuk latihan di dalam MainActivity atau file latihan.",
          "Buat sebuah daftar 'val daftarTugas = listOf(...)' berisi 3 tugas contoh dari mata pelajaran berbeda.",
          "Gunakan fungsi '.filter { it.subject == \"Dasar PPLG\" }' untuk melihat cara menyaring daftar di Kotlin.",
          "Gunakan fungsi '.count { !it.isCompleted }' untuk menghitung berapa tugas yang belum dikerjakan.",
        ],
        antigravity_prompt: {
          tujuan:
            "Memahami cara kerja data class, fungsi .copy(), .filter(), dan konsep suspend function pada Kotlin.",
          konteks:
            "Aplikasi Android SakuSiswa (pencatat tugas sekolah) dengan Kotlin dan Jetpack Compose.",
          instruksi: [
            "Tunjukkan contoh data class Task beserta penggunaan fungsi .copy() untuk menandai tugas selesai.",
            "Tunjukkan cara menyaring List<Task> berdasarkan status selesai dan kata kunci pencarian judul.",
            "Jelaskan analogi sederhana perbedaan fungsi biasa (fun) dan fungsi asinkron (suspend fun) di Android.",
          ],
          batasan: [
            "Fokus pada logika Kotlin murni yang bersih dan mudah dipahami pemula.",
          ],
          hasilAkhir:
            "Potongan kode contoh operasi data class, List filter, dan analogi Coroutines.",
          validasi:
            "Siswa memahami fungsi it di dalam blok lambda .filter { it.isCompleted }.",
          rawPrompt: `[TUJUAN]\nMenguasai penggunaan data class, List.filter, dan konsep suspend function untuk aplikasi SakuSiswa.\n\n[KONTEKS]\nSaya siswa SMK sedang mempelajari pengelolaan data tugas sekolah di bahasa Kotlin.\n\n[INSTRUKSI]\n1. Buat contoh data class Task(val id: Int, val subject: String, val title: String, val isCompleted: Boolean = false).\n2. Tunjukkan cara mengubah status isCompleted menjadi true menggunakan fungsi .copy().\n3. Tunjukkan cara memfilter List<Task> untuk mencari tugas yang belum selesai dan mengandung kata kunci tertentu.\n4. Jelaskan dengan analogi kasir kantin sekolah mengapa operasi berat di Android harus memakai "suspend fun" (Coroutines).\n\n[BATASAN]\nJelaskan secara ringkas dan beri komentar pada setiap langkah kode.\n\n[HASIL AKHIR]\nContoh kode Kotlin dan analogi Coroutines.\n\n[VALIDASI]\nPastikan saya paham apa arti variabel implisit "it" di dalam fungsi .filter { ... }.`,
        },
        code_snippets: [
          {
            filename: "ContohDataClassDanList.kt",
            language: "kotlin",
            code: `data class TaskSample(
    val id: Int,
    val subject: String,
    val title: String,
    val dueDate: String,
    val isCompleted: Boolean = false
)

val contohDaftarTugas = listOf(
    TaskSample(1, "Dasar PPLG", "Merancang Entity Room", "18 Nov 2026", isCompleted = true),
    TaskSample(2, "Matematika", "Latihan Matriks Hal 42", "19 Nov 2026", isCompleted = false),
    TaskSample(3, "Informatika", "Presentasi Jaringan Lokal", "20 Nov 2026", isCompleted = false)
)

// Menyaring tugas yang belum selesai
val tugasBelumSelesai = contohDaftarTugas.filter { !it.isCompleted }

// Mengubah status satu tugas dengan .copy()
val tugasUpdated = contohDaftarTugas[1].copy(isCompleted = true)`,
          },
        ],
        expected_result:
          "Siswa lancar menggunakan data class, memanipulasi List dengan filter/copy, dan memahami peran suspend function untuk menjaga kelancaran layar aplikasi.",
        validation_check: [
          "Dapat menggunakan .copy() pada objek data class",
          "Dapat menyaring List menggunakan .filter { ... }",
          "Mengetahui bahwa fungsi suspend hanya bisa dipanggil dari Coroutine atau fungsi suspend lain",
        ],
        common_errors: [
          {
            error: "Memanggil suspend fun langsung di dalam onClick tombol tanpa coroutineScope.launch { ... }.",
            solution:
              "Panggilan suspend fun harus dibungkus di dalam viewModelScope.launch { ... } (di ViewModel) atau rememberCoroutineScope().launch { ... } (di Composable).",
          },
        ],
        exercise:
          "Bagaimana cara menulis fungsi .filter { ... } untuk mencari tugas yang judulnya mengandung kata 'Matriks' tanpa peduli huruf besar atau kecil (ignoreCase = true)?",
        quiz: [
          {
            question: "Fungsi bawaan apakah pada data class Kotlin yang memudahkan kita membuat salinan objek dengan mengubah satu properti saja?",
            options: [
              ".delete()",
              ".copy()",
              ".filter()",
              ".println()",
            ],
            correctIndex: 1,
            explanation:
              "Setiap data class di Kotlin otomatis menyediakan fungsi .copy() sehingga kita bisa memperbarui satu properti (misal isCompleted = true) tanpa menulis ulang properti lainnya.",
          },
        ],
      },
      {
        id: "m2-l3",
        module_id: "modul-2",
        lesson_number: 3,
        title: "Menyusun Tata Letak dengan Jetpack Compose (Column, Row, Card & Modifier)",
        slug: "tata-letak-jetpack-compose-dasar",
        description:
          "Membangun tampilan aplikasi tanpa XML menggunakan blok bangunan utama Jetpack Compose: Column (vertikal), Row (horizontal), Box (tumpukan), Card Material 3, dan pengaturan gaya dengan Modifier.",
        estimated_minutes: 45,
        order_index: 3,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu menyusun tata letak vertikal dan horizontal menggunakan Column, Row, Spacer, Card, serta mengatur jarak (padding) dan ukuran melalui Modifier.",
        prerequisites: ["Menyelesaikan Materi 2.1 dan 2.2"],
        concept_explanation: `Di Jetpack Compose, kamu menyusun tampilan persis seperti menyusun balok LEGO menggunakan fungsi Kotlin yang diberi tanda **\`@Composable\`**. Tiga wadah tata letak paling utama adalah:

1. **\`Column { ... }\`**: Menyusun elemen secara berurutan dari **atas ke bawah** (vertikal). Misalnya: Judul Tugas di atas, Nama Mata Pelajaran di tengah, Tanggal Tenggat di bawah.
2. **\`Row { ... }\`**: Menyusun elemen berjejer dari **kiri ke kanan** (horizontal). Misalnya: Kotak Checkbox di kiri, Teks Judul di tengah, Tombol Hapus di kanan.
3. **\`Box { ... }\`**: Menumpuk elemen di atas elemen lain (seperti stiker di atas sampul buku).

Untuk mengatur ukuran, jarak dalam (*padding*), warna latar, atau aksi klik pada komponen apa pun, kita menggunakan **\`Modifier\`**.
> **Aturan Emas Modifier**: Urutan penulisan \`Modifier\` sangat berpengaruh! \`Modifier.padding(16.dp).background(Color.Red)\` hasilnya berbeda dengan \`Modifier.background(Color.Red).padding(16.dp)\`.`,
        preparation: [
          "Aktifkan tampilan 'Split' (Code + Preview) di pojok kanan atas editor Android Studio",
        ],
        thinking_steps: [
          "Jika kita ingin membuat satu kartu tugas yang di sebelah kirinya ada Checkbox, di tengahnya ada tumpukan Judul & Mata Pelajaran, dan di kanannya ada ikon Hapus: kombinasi Row dan Column seperti apa yang harus kita susun?",
          "Mengapa satuan ukuran di Jetpack Compose menggunakan .dp (Density-independent Pixels) untuk jarak/kotak dan .sp (Scale-independent Pixels) untuk ukuran huruf?",
        ],
        step_instructions: [
          "Di dalam MainActivity.kt, buat satu fungsi baru bernama '@Composable fun KartuProfilSiswa(nama: String, kelas: String)'.",
          "Bungkus tampilannya dengan komponen 'Card' dari Material 3 dan berikan 'Modifier.fillMaxWidth().padding(16.dp)'.",
          "Di dalam Card, gunakan 'Row(verticalAlignment = Alignment.CenterVertically)' untuk menaruh bulatan inisial nama di sebelah kiri dan 'Column' berisi nama serta kelas di sebelah kanan.",
          "Tambahkan '@Preview(showBackground = true)' untuk melihat hasilnya secara instan tanpa perlu menjalankan emulator.",
        ],
        antigravity_prompt: {
          tujuan:
            "Membuat komponen Kartu Profil Siswa dan Kartu Statistik Tugas di Jetpack Compose menggunakan Row, Column, dan Material 3 Card.",
          konteks:
            "Aplikasi Android SakuSiswa dengan Kotlin dan Jetpack Compose Material 3.",
          instruksi: [
            "Buat fungsi @Composable StudentHeaderCard(studentName: String, studentEmail: String, pendingCount: Int, completedCount: Int).",
            "Gunakan Card Material 3 dengan sudut membulat (RoundedCornerShape(16.dp)).",
            "Tampilkan nama dan email siswa di bagian atas, lalu 2 kotak ringkasan jumlah tugas 'Belum Selesai' dan 'Selesai' secara berdampingan menggunakan Row dan Modifier.weight(1f).",
            "Jelaskan fungsi Modifier.weight(1f) kepada siswa.",
          ],
          batasan: [
            "Gunakan hanya komponen standar androidx.compose.material3 dan androidx.compose.foundation.layout.",
          ],
          hasilAkhir:
            "Kode fungsi StudentHeaderCard lengkap dengan @Preview dan penjelasan fungsi Modifier.weight(1f).",
          validasi:
            "Preview tampil rapi di Android Studio dengan 2 kotak statistik sama lebar.",
          rawPrompt: `[TUJUAN]\nMembuat komponen header profil siswa dan ringkasan statistik tugas menggunakan Row, Column, dan Card Material 3.\n\n[KONTEKS]\nProyek Android SakuSiswa dengan Kotlin dan Jetpack Compose Material 3.\n\n[INSTRUKSI]\n1. Buat fungsi @Composable bernama StudentHeaderCard(studentName: String, studentEmail: String, pendingCount: Int, completedCount: Int).\n2. Gunakan komponen Card Material 3 dengan padding 16.dp.\n3. Susun nama dan email menggunakan Column, lalu di bawahnya buat Row berisi 2 kotak statistik ("Belum Selesai" dan "Sudah Selesai") yang membagi lebar layar sama rata menggunakan Modifier.weight(1f).\n4. Jelaskan mengapa Modifier.weight(1f) membuat kedua kotak memiliki lebar yang persis sama.\n\n[BATASAN]\nJangan gunakan library eksternal di luar Material 3 bawaan.\n\n[HASIL AKHIR]\nKode Composable lengkap dengan fungsi @Preview.\n\n[VALIDASI]\nPastikan kode dapat dirender di tab Preview Android Studio tanpa error import.`,
        },
        code_snippets: [
          {
            filename: "StudentHeaderCard.kt",
            language: "kotlin",
            code: `package id.composelab.sakusiswa.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun StudentHeaderCard(
    studentName: String,
    studentEmail: String,
    pendingCount: Int,
    completedCount: Int,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer
        )
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = "Halo, $studentName",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = studentEmail,
                style = MaterialTheme.typography.bodySmall
            )
            Spacer(modifier = Modifier.height(12.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Surface(
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(12.dp),
                    color = MaterialTheme.colorScheme.surface
                ) {
                    Column(
                        modifier = Modifier.padding(12.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text("$pendingCount", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
                        Text("Tugas Aktif", style = MaterialTheme.typography.labelMedium)
                    }
                }
                Surface(
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(12.dp),
                    color = MaterialTheme.colorScheme.surface
                ) {
                    Column(
                        modifier = Modifier.padding(12.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text("$completedCount", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
                        Text("Selesai", style = MaterialTheme.typography.labelMedium)
                    }
                }
            }
        }
    }
}`,
          },
        ],
        expected_result:
          "Siswa mampu merakit tata letak kartu informasi yang rapi menggunakan kombinasi Card, Column, Row, Spacer, dan Modifier.weight(1f).",
        validation_check: [
          "Memahami perbedaan Column (atas-bawah) dan Row (kiri-kanan)",
          "Berhasil menampilkan StudentHeaderCard di Preview Android Studio",
        ],
        common_errors: [
          {
            error: "Teks saling bertumpuk di pojok kiri atas karena lupa membungkus beberapa Text di dalam Column atau Row.",
            solution:
              "Jika menaruh lebih dari satu komponen di dalam fungsi @Composable atau Card, selalu bungkus dengan Column (untuk susunan menurun) atau Row (untuk susunan menyamping).",
          },
        ],
        exercise:
          "Tambahkan sebuah tombol OutlinedButton bertuliskan 'Keluar' di sebelah kanan nama siswa pada StudentHeaderCard menggunakan Row!",
        quiz: [
          {
            question: "Komponen tata letak manakah di Jetpack Compose yang digunakan untuk menyusun elemen secara berdampingan dari kiri ke kanan?",
            options: [
              "Column",
              "Row",
              "Spacer",
              "Divider",
            ],
            correctIndex: 1,
            explanation:
              "Row menyusun elemen anak secara horizontal (kiri ke kanan), sedangkan Column menyusun elemen secara vertikal (atas ke bawah).",
          },
        ],
      },
      {
        id: "m2-l4",
        module_id: "modul-2",
        lesson_number: 4,
        title: "State, Recomposition & Form Input Interaktif di Jetpack Compose",
        slug: "state-recomposition-dan-form-input",
        description:
          "Memahami nyawa dari UI deklaratif: bagaimana perubahan nilai State (remember & mutableStateOf) memicu layar menggambar ulang (Recomposition) pada OutlinedTextField dan Checkbox.",
        estimated_minutes: 45,
        order_index: 4,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa memahami konsep State & Recomposition serta mampu membuat form input tambah tugas dengan validasi tidak boleh kosong.",
        prerequisites: ["Menyelesaikan Materi 2.3"],
        concept_explanation: `Pernahkah kamu mencoba membuat kotak ketik \`OutlinedTextField\` di Jetpack Compose, tetapi saat kamu mengetik di keyboard, hurufnya tidak mau muncul di layar? Itu terjadi karena kamu belum menghubungkannya dengan **State**!

Di Jetpack Compose:
1. **State** adalah nilai data yang bisa berubah seiring waktu (misalnya teks yang sedang diketik, atau status dialog terbuka/tertutup).
2. **Recomposition** adalah proses otomatis ketika Jetpack Compose menggambar ulang komponen layar yang membaca State tersebut setiap kali nilainya berubah.
3. Agar nilai variabel tidak ter-reset kembali menjadi kosong saat layar digambar ulang, kita wajib membungkusnya dengan **\`remember { mutableStateOf("") }\`** (atau \`rememberSaveable\` agar tahan saat layar HP diputar miring/landscape).`,
        preparation: [
          "Pastikan kamu memahami konsep var dari Materi 2.1",
        ],
        thinking_steps: [
          "Mengapa jika kita hanya memakai 'var judul = \"\"' biasa tanpa 'remember { mutableStateOf(\"\") }', ketikan kita tidak muncul di OutlinedTextField?",
          "Bagaimana cara menonaktifkan tombol 'Simpan Tugas' (enabled = false) secara otomatis selama kolom Judul atau Mata Pelajaran masih kosong?",
        ],
        step_instructions: [
          "Buat file baru di package 'ui' bernama 'AddTaskDialog.kt'.",
          "Deklarasikan 3 state menggunakan 'var subject by remember { mutableStateOf(\"\") }', 'var title by remember { mutableStateOf(\"\") }', dan 'var dueDate by remember { mutableStateOf(\"\") }'.",
          "Hubungkan masing-masing state ke komponen 'OutlinedTextField(value = title, onValueChange = { title = it }, ...)'.",
          "Tambahkan validasi pada tombol Simpan: 'enabled = title.isNotBlank() && subject.isNotBlank()' agar pengguna tidak bisa menyimpan tugas kosong.",
        ],
        antigravity_prompt: {
          tujuan:
            "Membuat komponen dialog form tambah/edit tugas (TaskFormDialog) dengan state management dan validasi input di Jetpack Compose.",
          konteks:
            "Package id.composelab.sakusiswa.ui pada aplikasi Android SakuSiswa menggunakan Material 3.",
          instruksi: [
            "Buat fungsi @Composable TaskFormDialog yang menerima parameter initialSubject, initialTitle, initialNotes, initialDueDate, onDismiss, dan onConfirm.",
            "Gunakan AlertDialog Material 3 berisi OutlinedTextField untuk Mata Pelajaran, Judul Tugas, Catatan, dan Tenggat Waktu.",
            "Terapkan validasi tombol Simpan hanya aktif (enabled) jika Mata Pelajaran dan Judul Tugas tidak kosong (isNotBlank).",
            "Jelaskan peran kata kunci 'by remember { mutableStateOf(...) }' dan mengapa harus meng-import getValue serta setValue.",
          ],
          batasan: [
            "Gunakan komponen resmi androidx.compose.material3.",
          ],
          hasilAkhir:
            "File TaskFormDialog.kt yang siap dipakai untuk fitur Create maupun Update tugas.",
          validasi:
            "Tombol Simpan otomatis mati saat kolom judul kosong dan menyala saat diisi.",
          rawPrompt: `[TUJUAN]\nMembuat komponen AlertDialog form input tugas (Tambah & Edit) dengan validasi state di Jetpack Compose.\n\n[KONTEKS]\nAplikasi SakuSiswa package id.composelab.sakusiswa.ui menggunakan Kotlin dan Material 3.\n\n[INSTRUKSI]\n1. Buat fungsi @Composable TaskFormDialog(\n   dialogTitle: String,\n   initialSubject: String = "",\n   initialTitle: String = "",\n   initialNotes: String = "",\n   initialDueDate: String = "",\n   onDismiss: () -> Unit,\n   onConfirm: (subject: String, title: String, notes: String, dueDate: String) -> Unit\n).\n2. Gunakan remember { mutableStateOf(...) } untuk mengelola teks pada 4 OutlinedTextField.\n3. Buat tombol Simpan hanya bisa diklik (enabled) apabila subject.isNotBlank() && title.isNotBlank().\n4. Jelaskan mengapa kita wajib menambahkan import androidx.compose.runtime.getValue dan setValue saat memakai kata kunci "by remember".\n\n[BATASAN]\nPastikan kode bersih, tidak menggunakan library form pihak ketiga.\n\n[HASIL AKHIR]\nKode lengkap TaskFormDialog.kt beserta penjelasan cara kerja State & Recomposition.\n\n[VALIDASI]\nPastikan dialog dapat digunakan baik untuk Tambah Tugas Baru (nilai awal kosong) maupun Edit Tugas (nilai awal terisi).`,
        },
        code_snippets: [
          {
            filename: "TaskFormDialog.kt",
            language: "kotlin",
            code: `package id.composelab.sakusiswa.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun TaskFormDialog(
    dialogTitle: String,
    initialSubject: String = "",
    initialTitle: String = "",
    initialNotes: String = "",
    initialDueDate: String = "",
    onDismiss: () -> Unit,
    onConfirm: (subject: String, title: String, notes: String, dueDate: String) -> Unit
) {
    var subject by remember { mutableStateOf(initialSubject) }
    var title by remember { mutableStateOf(initialTitle) }
    var notes by remember { mutableStateOf(initialNotes) }
    var dueDate by remember { mutableStateOf(initialDueDate) }

    val isFormValid = subject.isNotBlank() && title.isNotBlank()

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(text = dialogTitle) },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                OutlinedTextField(
                    value = subject,
                    onValueChange = { subject = it },
                    label = { Text("Mata Pelajaran *") },
                    placeholder = { Text("Contoh: Dasar PPLG") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
                OutlinedTextField(
                    value = title,
                    onValueChange = { title = it },
                    label = { Text("Judul Tugas *") },
                    placeholder = { Text("Contoh: Membuat Entity Room") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
                OutlinedTextField(
                    value = dueDate,
                    onValueChange = { dueDate = it },
                    label = { Text("Tenggat Waktu") },
                    placeholder = { Text("Contoh: Jumat, 20 Nov") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
                OutlinedTextField(
                    value = notes,
                    onValueChange = { notes = it },
                    label = { Text("Catatan Tambahan") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 2
                )
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    onConfirm(
                        subject.trim(),
                        title.trim(),
                        notes.trim(),
                        dueDate.trim().ifEmpty { "Belum ditentukan" }
                    )
                },
                enabled = isFormValid
            ) {
                Text("Simpan")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Batal")
            }
        }
    )
}`,
          },
        ],
        expected_result:
          "Siswa berhasil membuat komponen dialog form input tugas yang interaktif, reaktif terhadap ketikan pengguna, dan memiliki validasi tombol Simpan.",
        validation_check: [
          "Ketikan muncul lancar pada setiap OutlinedTextField",
          "Tombol Simpan tidak bisa ditekan jika Mata Pelajaran atau Judul masih kosong",
        ],
        common_errors: [
          {
            error: "Muncul error 'Type MutableState<String> has no method getValue' saat memakai 'var title by remember'.",
            solution:
              "Tambahkan baris 'import androidx.compose.runtime.getValue' dan 'import androidx.compose.runtime.setValue' (atau 'import androidx.compose.runtime.*') di bagian atas file.",
          },
        ],
        exercise:
          "Tambahkan teks peringatan kecil berwarna merah di bawah kolom Judul Tugas jika pengguna sudah mengetik spasi kosong (title.isEmpty())!",
        quiz: [
          {
            question: "Apa yang terjadi jika kita menggunakan variabel String biasa tanpa remember { mutableStateOf(...) } sebagai value dari OutlinedTextField?",
            options: [
              "Teks berubah menjadi huruf kapital semua",
              "Layar tidak melakukan Recomposition sehingga ketikan keyboard tidak tampil di dalam kotak teks",
              "Database otomatis terhapus",
              "Aplikasi langsung terhubung ke Google",
            ],
            correctIndex: 1,
            explanation:
              "Jetpack Compose hanya menggambar ulang (recompose) komponen UI ketika nilai State (MutableState) yang diamatinya berubah.",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // MODUL 3 (HARI 1 SORE): ARSITEKTUR UI & DAFTAR TUGAS SAKUSISWA
  // =========================================================================
  {
    id: "modul-3",
    course_id: "course-android-compose-smkn1",
    module_number: 3,
    title: "Merancang Antarmuka Utama & Navigasi Aplikasi SakuSiswa",
    slug: "modul-3-antarmuka-dan-navigasi-sakusiswa",
    description:
      "Merakit komponen kartu tugas (TaskItemCard), daftar bergulir hemat memori dengan LazyColumn, filter chip mata pelajaran, serta struktur layar utama SakuSiswa.",
    estimated_minutes: 150,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 3,
    created_at: new Date().toISOString(),
    lessons: [
      {
        id: "m3-l1",
        module_id: "modul-3",
        lesson_number: 1,
        title: "Pola Arsitektur MVVM Sederhana: Memisahkan UI dan Logika Data",
        slug: "pola-arsitektur-mvvm-sederhana",
        description:
          "Memahami mengapa kode tampilan (@Composable) tidak boleh mengakses database secara langsung, serta bagaimana ViewModel menjadi jembatan yang rapi.",
        estimated_minutes: 35,
        order_index: 1,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa memahami alur Unidirectional Data Flow (UDF) antara Layar Compose, ViewModel, dan Data Layer.",
        prerequisites: ["Menyelesaikan Modul 2"],
        concept_explanation: `Ketika aplikasi bertambah fitur (ada Login Google, ada Room Database, ada Pencarian, ada Filter), menaruh semua kode di dalam \`MainActivity.kt\` akan membuat file tersebut panjangnya ribuan baris dan mustahil di-debug.

Standar industri Android menggunakan pola **MVVM (Model - View - ViewModel)**:
1. **Model / Data Layer (\`data/\`)**: Bagian yang mengurus penyimpanan data di Room Database (\`TaskEntity\`, \`TaskDao\`, \`SakuSiswaDatabase\`) dan pengambilan profil akun Google (\`GoogleAuthManager\`).
2. **ViewModel (\`viewmodel/\`)**: "Manajer Layar" yang menyiapkan data untuk ditampilkan ke layar (misalnya memfilter daftar tugas) dan menerima perintah aksi dari layar (misalnya \`addTask()\`, \`toggleTaskDone()\`, \`deleteTask()\`). ViewModel juga tetap hidup meskipun layar HP diputar!
3. **View / UI Layer (\`ui/\`)**: Fungsi \`@Composable\` yang tugasnya murni **menampilkan state** dari ViewModel dan **melapor** ketika tombol ditekan.`,
        preparation: [
          "Pastikan 3 folder package (data, viewmodel, ui) sudah siap di proyek SakuSiswa",
        ],
        thinking_steps: [
          "Apa yang terjadi pada variabel biasa di dalam Activity ketika pengguna memutar layar HP dari berdiri (portrait) ke miring (landscape)?",
          "Mengapa memisahkan fungsi tampilan (UI) dari fungsi database membuat kita lebih mudah bertanya ke AI saat terjadi error?",
        ],
        step_instructions: [
          "Periksa kembali struktur package di proyek SakuSiswa.",
          "Catat pembagian file yang akan kita bangun: di dalam 'data' ada TaskEntity.kt, TaskDao.kt, SakuSiswaDatabase.kt, dan GoogleAuthManager.kt.",
          "Di dalam 'viewmodel' akan ada TaskViewModel.kt.",
          "Di dalam 'ui' akan ada LoginScreen.kt, HomeScreen.kt, TaskItemCard.kt, dan TaskFormDialog.kt.",
        ],
        antigravity_prompt: {
          tujuan:
            "Memahami pembagian tanggung jawab antara UI (Compose), ViewModel, dan Room Database pada aplikasi SakuSiswa.",
          konteks:
            "Arsitektur MVVM aplikasi Android SakuSiswa untuk siswa SMK.",
          instruksi: [
            "Gambarkan diagram alur teks (ASCII) bagaimana aksi klik tombol 'Hapus Tugas' mengalir dari TaskItemCard -> HomeScreen -> TaskViewModel -> TaskDao -> Room Database.",
            "Jelaskan bagaimana perubahan data di Room Database otomatis mengalir balik ke layar lewat Flow dan StateFlow.",
          ],
          batasan: [
            "Gunakan penjelasan konseptual yang mudah dipahami siswa.",
          ],
          hasilAkhir:
            "Diagram alur satu arah (Unidirectional Data Flow) aplikasi SakuSiswa.",
          validasi:
            "Siswa dapat menyebutkan peran masing-masing file di dalam package data, viewmodel, dan ui.",
          rawPrompt: `[TUJUAN]\nMemahami alur data satu arah (Unidirectional Data Flow) pada arsitektur MVVM aplikasi SakuSiswa.\n\n[KONTEKS]\nAplikasi Android SakuSiswa dengan Kotlin, Jetpack Compose, ViewModel, dan Room Database.\n\n[INSTRUKSI]\n1. Buat diagram alur teks sederhana yang menunjukkan perjalanan perintah saat siswa menekan tombol "Centang Selesai" pada kartu tugas.\n2. Jelaskan bagaimana perubahan di tabel Room Database otomatis memperbarui tampilan di Jetpack Compose melalui Flow.\n3. Berikan alasan mengapa kita tidak boleh memanggil fungsi database langsung di dalam fungsi @Composable.\n\n[BATASAN]\nGunakan bahasa Indonesia yang jelas untuk siswa SMK.\n\n[HASIL AKHIR]\nDiagram alur MVVM dan penjelasan peran ViewModel.\n\n[VALIDASI]\nPastikan saya tahu di package mana file TaskViewModel.kt harus disimpan.`,
        },
        code_snippets: [
          {
            filename: "Alur-MVVM-SakuSiswa.txt",
            language: "markdown",
            code: `[Layar Compose (UI)]
   │  1. Siswa klik tombol "Simpan" / "Centang" / "Hapus" (Event naik ke atas)
   ▼
[TaskViewModel]
   │  2. Menjalankan coroutine viewModelScope.launch { dao.insertTask(...) }
   ▼
[TaskDao & Room Database]
   │  3. Menyimpan ke file SQLite lokal & memancarkan data terbaru lewat Flow<List<TaskEntity>>
   ▼
[Layar Compose (UI)]
      4. Otomatis menggambar ulang (Recompose) daftar tugas terbaru!`,
          },
        ],
        expected_result:
          "Siswa memahami peta besar arsitektur aplikasi SakuSiswa sehingga tidak bingung saat membuat file-file berikutnya.",
        validation_check: [
          "Dapat menjelaskan arah aliran Event (UI ke ViewModel) dan State (ViewModel ke UI)",
        ],
        common_errors: [
          {
            error: "Meletakkan semua kelas Entity, DAO, dan layar Compose di dalam satu file MainActivity.kt.",
            solution:
              "Pisahkan setiap kelas/layar ke dalam file .kt tersendiri sesuai package-nya agar mudah dibaca dan di-debug.",
          },
        ],
        exercise:
          "Jika muncul error saat kuery SQL salah ketik, di package manakah kita harus mencari dan memperbaiki kesalahannya (`ui`, `viewmodel`, atau `data`)?",
        quiz: [
          {
            question: "Komponen manakah dalam arsitektur MVVM Android yang bertugas menyimpan state layar agar tidak hilang saat layar HP diputar (rotasi)?",
            options: [
              "AndroidManifest.xml",
              "ViewModel",
              "Spacer",
              "IconButton",
            ],
            correctIndex: 1,
            explanation:
              "ViewModel dirancang oleh Jetpack untuk bertahan melewati perubahan konfigurasi seperti rotasi layar hingga Activity benar-benar ditutup.",
          },
        ],
      },
      {
        id: "m3-l2",
        module_id: "modul-3",
        lesson_number: 2,
        title: "Membangun Komponen Kartu Tugas Interaktif (TaskItemCard)",
        slug: "membangun-komponen-kartu-tugas",
        description:
          "Merancang komponen kartu tugas yang menampilkan badge mata pelajaran, judul dengan efek coret (strikethrough) saat selesai, tenggat waktu, tombol edit, dan tombol hapus.",
        estimated_minutes: 40,
        order_index: 2,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu membuat komponen TaskItemCard yang menerima parameter data dan meneruskan aksi klik (onToggleComplete, onEditClick, onDeleteClick) melalui lambda callback.",
        prerequisites: ["Menyelesaikan Materi 3.1"],
        concept_explanation: `Setiap baris tugas pada aplikasi SakuSiswa akan ditampilkan menggunakan satu komponen kartu bernama **\`TaskItemCard\`**. Agar komponen ini pintar dan mudah diuji, kita menggunakan teknik **State Hoisting** (mengangkat state dan aksi ke atas):

\`TaskItemCard\` menerima:
- Data yang ditampilkan: \`subject\`, \`title\`, \`notes\`, \`dueDate\`, \`isCompleted\`.
- Tiga fungsi aksi (*callback*):
  1. \`onToggleComplete: () -> Unit\` -> dipanggil saat Checkbox dicentang/dilepas.
  2. \`onEditClick: () -> Unit\` -> dipanggil saat tombol pensil (Edit) ditekan.
  3. \`onDeleteClick: () -> Unit\` -> dipanggil saat tombol tempat sampah (Hapus) ditekan.

Selain itu, kita berikan sentuhan visual yang jelas: jika \`isCompleted == true\`, judul tugas otomatis diberi garis coret (\`TextDecoration.LineThrough\`) supaya siswa langsung tahu tugas mana yang sudah beres!`,
        preparation: [
          "Buka package 'id.composelab.sakusiswa.ui' di Android Studio",
        ],
        thinking_steps: [
          "Mengapa TaskItemCard sebaiknya hanya melapor lewat fungsi callback (onEditClick, onDeleteClick) daripada menghapus data database sendiri di dalam kartu?",
          "Perubahan visual apa yang membantu pengguna membedakan tugas yang sudah selesai dan yang belum selesai?",
        ],
        step_instructions: [
          "Klik kanan pada package 'ui' -> New -> Kotlin Class/File -> ketik 'TaskItemCard'.",
          "Susun komponen Card dengan Row utama: Checkbox di kiri, Column (Badge Mapel, Judul, Catatan, Tenggat) di tengah dengan Modifier.weight(1f), serta Row tombol Edit & Hapus di kanan.",
          "Tambahkan TextDecoration.LineThrough pada judul ketika isCompleted bernilai true.",
          "Uji tampilannya menggunakan fungsi @Preview di bagian bawah file.",
        ],
        antigravity_prompt: {
          tujuan:
            "Membuat komponen TaskItemCard.kt yang bersih, informatif, dan mendukung aksi Checkbox, Edit, serta Hapus.",
          konteks:
            "Aplikasi Android SakuSiswa package id.composelab.sakusiswa.ui menggunakan Jetpack Compose Material 3.",
          instruksi: [
            "Buat fungsi @Composable TaskItemCard dengan parameter subject, title, notes, dueDate, isCompleted, onToggleComplete, onEditClick, dan onDeleteClick.",
            "Tampilkan nama mata pelajaran di dalam Surface/Badge kecil di atas judul tugas.",
            "Terapkan efek garis coret (TextDecoration.LineThrough) pada judul apabila isCompleted == true.",
            "Sediakan IconButton dengan ikon Edit (Icons.Default.Edit) dan Delete (Icons.Default.Delete).",
          ],
          batasan: [
            "Gunakan ikon bawaan androidx.compose.material.icons.Icons.Default agar tidak perlu menambah aset gambar eksternal.",
          ],
          hasilAkhir:
            "File TaskItemCard.kt lengkap dengan 2 @Preview (kondisi tugas belum selesai dan sudah selesai).",
          validasi:
            "Tidak ada teks judul panjang yang mendorong tombol Edit/Hapus keluar layar karena sudah memakai Modifier.weight(1f).",
          rawPrompt: `[TUJUAN]\nMembuat komponen kartu tugas interaktif (TaskItemCard.kt) di Jetpack Compose.\n\n[KONTEKS]\nAplikasi Android SakuSiswa, package id.composelab.sakusiswa.ui, menggunakan Material 3.\n\n[INSTRUKSI]\n1. Buat fungsi @Composable TaskItemCard(\n   subject: String,\n   title: String,\n   notes: String,\n   dueDate: String,\n   isCompleted: Boolean,\n   onToggleComplete: () -> Unit,\n   onEditClick: () -> Unit,\n   onDeleteClick: () -> Unit\n).\n2. Susun Checkbox di sebelah kiri, informasi tugas di tengah dengan Modifier.weight(1f), dan IconButton Edit & Delete di sebelah kanan.\n3. Jika isCompleted bernilai true, berikan efek garis coret (TextDecoration.LineThrough) pada teks judul.\n4. Jelaskan mengapa Modifier.weight(1f) pada Column tengah mencegah tombol Edit dan Delete terdorong keluar layar saat judul tugas sangat panjang.\n\n[BATASAN]\nGunakan hanya ikon standar Icons.Default.Edit dan Icons.Default.Delete.\n\n[HASIL AKHIR]\nKode lengkap TaskItemCard.kt beserta @Preview.\n\n[VALIDASI]\nPastikan kartu tetap rapi meskipun judul tugas panjangnya 2 baris.`,
        },
        code_snippets: [
          {
            filename: "TaskItemCard.kt",
            language: "kotlin",
            code: `package id.composelab.sakusiswa.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp

@Composable
fun TaskItemCard(
    subject: String,
    title: String,
    notes: String,
    dueDate: String,
    isCompleted: Boolean,
    onToggleComplete: () -> Unit,
    onEditClick: () -> Unit,
    onDeleteClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isCompleted)
                MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f)
            else
                MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = isCompleted,
                onCheckedChange = { onToggleComplete() }
            )

            Column(
                modifier = Modifier
                    .weight(1f)
                    .padding(horizontal = 8.dp)
            ) {
                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = MaterialTheme.colorScheme.secondaryContainer
                ) {
                    Text(
                        text = subject,
                        style = MaterialTheme.typography.labelSmall,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                    )
                }

                Spacer(modifier = Modifier.height(4.dp))

                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold,
                    textDecoration = if (isCompleted) TextDecoration.LineThrough else TextDecoration.None
                )

                if (notes.isNotBlank()) {
                    Text(
                        text = notes,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                Spacer(modifier = Modifier.height(4.dp))

                Text(
                    text = "Tenggat: $dueDate",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.primary
                )
            }

            IconButton(onClick = onEditClick) {
                Icon(
                    imageVector = Icons.Default.Edit,
                    contentDescription = "Ubah Tugas"
                )
            }
            IconButton(onClick = onDeleteClick) {
                Icon(
                    imageVector = Icons.Default.Delete,
                    contentDescription = "Hapus Tugas",
                    tint = MaterialTheme.colorScheme.error
                )
            }
        }
    }
}`,
          },
        ],
        expected_result:
          "File TaskItemCard.kt selesai dibuat dan menampilkan kartu tugas lengkap dengan Checkbox, label mata pelajaran, judul, catatan, tenggat, serta tombol Edit dan Hapus.",
        validation_check: [
          "Kartu tugas menampilkan garis coret saat parameter isCompleted diisi true",
          "Tombol Edit dan Delete tetap berada di sisi kanan meskipun judul tugas panjang",
        ],
        common_errors: [
          {
            error: "Lupa memasang Modifier.weight(1f) pada Column tengah sehingga tombol Edit dan Delete hilang terdorong ke kanan luar layar.",
            solution:
              "Pastikan Column pembungkus teks di tengah memiliki Modifier.weight(1f) agar ia mengambil sisa ruang yang tersedia setelah Checkbox dan IconButton.",
          },
        ],
        exercise:
          "Uji TaskItemCard di @Preview dengan memasukkan teks judul sepanjang 15 kata. Pastikan teksnya turun ke baris kedua dengan rapi dan tidak menutupi ikon!",
        quiz: [
          {
            question: "Mengapa kita perlu menambahkan Modifier.weight(1f) pada Column teks di tengah Row kartu tugas?",
            options: [
              "Agar teks berubah warna menjadi merah",
              "Agar Column tengah fleksibel mengisi ruang dan tidak mendorong IconButton di sebelah kanan keluar dari layar",
              "Agar kartu tidak bisa diklik",
              "Untuk menghapus database secara otomatis",
            ],
            correctIndex: 1,
            explanation:
              "Tanpa weight(1f), Column teks yang panjang akan mengambil seluruh lebar Row sehingga elemen di sebelah kanannya terdorong keluar batas layar.",
          },
        ],
      },
      {
        id: "m3-l3",
        module_id: "modul-3",
        lesson_number: 3,
        title: "Menampilkan Daftar Tugas dengan LazyColumn, Filter & Pencarian",
        slug: "menampilkan-daftar-tugas-lazycolumn",
        description:
          "Menggunakan LazyColumn untuk merender daftar tugas yang bisa digulir (scroll) secara efisien, menambahkan bilah pencarian (Search), FilterChip status, serta tampilan Empty State saat daftar kosong.",
        estimated_minutes: 40,
        order_index: 3,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa memahami keunggulan LazyColumn dibanding Column biasa untuk daftar panjang serta mampu menyusun layar daftar tugas lengkap dengan pencarian dan filter.",
        prerequisites: ["Menyelesaikan Materi 3.2"],
        concept_explanation: `Mengapa untuk menampilkan daftar tugas kita menggunakan **\`LazyColumn\`** dan bukan \`Column\` biasa?
- \`Column\` biasa akan langsung menggambar *semua* item sekaligus di memori meskipun item ke-50 masih berada jauh di bawah layar. Jika ada ratusan tugas, HP akan terasa berat.
- **\`LazyColumn\`** (pengganti \`RecyclerView\` lama di XML) bersifat "cerdas/hemat": ia **hanya menggambar item yang sedang terlihat di layar HP** saat itu, dan mendaur ulangnya ketika pengguna menggulir (*scroll*) layar ke bawah!

Di dalam \`LazyColumn\`, kita menggunakan blok \`items(items = daftarTugas, key = { it.id }) { task -> ... }\`. Memberikan parameter \`key = { it.id }\` sangat penting agar Jetpack Compose mengenali identitas tiap kartu tugas secara akurat saat ada item yang dihapus atau dicentang.`,
        preparation: [
          "Pastikan komponen StudentHeaderCard dan TaskItemCard sudah ada di package 'ui'",
        ],
        thinking_steps: [
          "Mengapa memberikan parameter 'key = { it.id }' pada LazyColumn items() membuat animasi dan pembaruan daftar menjadi jauh lebih akurat?",
          "Apa yang sebaiknya ditampilkan di layar jika daftar tugas masih kosong (0 item) agar pengguna tidak mengira aplikasinya rusak?",
        ],
        step_instructions: [
          "Pelajari cara kerja blok 'LazyColumn { items(tasks, key = { it.id }) { task -> ... } }'.",
          "Siapkan 3 pilihan FilterChip: 'Semua', 'Belum Selesai', dan 'Selesai'.",
          "Tambahkan kondisi 'if (filteredTasks.isEmpty())' untuk menampilkan pesan ramah 'Belum ada tugas. Tekan tombol + Tugas Baru di pojok kanan bawah!'.",
        ],
        antigravity_prompt: {
          tujuan:
            "Memahami cara kerja LazyColumn dengan key unik, FilterChip status tugas, dan tampilan Empty State.",
          konteks:
            "Layar utama aplikasi SakuSiswa menggunakan Jetpack Compose Material 3.",
          instruksi: [
            "Jelaskan perbedaan mendasar antara Column biasa dan LazyColumn di Jetpack Compose.",
            "Tunjukkan cara menggunakan items(items = filteredTasks, key = { it.id }) di dalam LazyColumn.",
            "Tunjukkan cara membuat deretan 3 FilterChip ('Semua', 'Aktif', 'Selesai') yang menyaring daftar tugas secara real-time.",
          ],
          batasan: [
            "Gunakan komponen resmi androidx.compose.foundation.lazy.LazyColumn dan androidx.compose.foundation.lazy.items.",
          ],
          hasilAkhir:
            "Contoh kode LazyColumn + FilterChip beserta penjelasan fungsi key = { it.id }.",
          validasi:
            "Siswa tidak lupa meng-import androidx.compose.foundation.lazy.items.",
          rawPrompt: `[TUJUAN]\nMembuat daftar tugas bergulir dengan LazyColumn, FilterChip status, dan Empty State di Jetpack Compose.\n\n[KONTEKS]\nAplikasi Android SakuSiswa menggunakan Kotlin dan Material 3.\n\n[INSTRUKSI]\n1. Jelaskan mengapa LazyColumn jauh lebih hemat memori dibandingkan Column untuk menampilkan daftar data dari database.\n2. Tunjukkan contoh penggunaan LazyColumn dengan items(items = daftarTugas, key = { it.id }) yang memanggil komponen TaskItemCard.\n3. Tunjukkan cara menambahkan Row berisi 3 FilterChip ("Semua", "Belum Selesai", "Selesai") di atas LazyColumn.\n4. Jelaskan mengapa import "androidx.compose.foundation.lazy.items" sering terlupakan dan menyebabkan error pada blok items().\n\n[BATASAN]\nGunakan kode yang bersih dan mudah dipahami siswa.\n\n[HASIL AKHIR]\nPotongan kode LazyColumn + FilterChip dan tips menghindari error import items.\n\n[VALIDASI]\nPastikan ada tampilan Empty State saat daftar tugas kosong.`,
        },
        code_snippets: [
          {
            filename: "ContohLazyColumnFilter.kt",
            language: "kotlin",
            code: `import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items // WAJIB di-import agar items(list) dikenali!

// Contoh di dalam layar utama:
Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    FilterChip(
        selected = selectedFilter == "ALL",
        onClick = { selectedFilter = "ALL" },
        label = { Text("Semua") }
    )
    FilterChip(
        selected = selectedFilter == "PENDING",
        onClick = { selectedFilter = "PENDING" },
        label = { Text("Belum Selesai") }
    )
    FilterChip(
        selected = selectedFilter == "DONE",
        onClick = { selectedFilter = "DONE" },
        label = { Text("Selesai") }
    )
}

if (filteredTasks.isEmpty()) {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text("Belum ada tugas di kategori ini. Yuk tambah tugas baru!")
    }
} else {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(10.dp),
        contentPadding = PaddingValues(bottom = 88.dp)
    ) {
        items(items = filteredTasks, key = { it.id }) { task ->
            TaskItemCard(
                subject = task.subject,
                title = task.title,
                notes = task.notes,
                dueDate = task.dueDate,
                isCompleted = task.isCompleted,
                onToggleComplete = { onToggle(task) },
                onEditClick = { onEdit(task) },
                onDeleteClick = { onDelete(task) }
            )
        }
    }
}`,
          },
        ],
        expected_result:
          "Siswa memahami penggunaan LazyColumn, FilterChip, dan Empty State, serta tahu pentingnya import androidx.compose.foundation.lazy.items.",
        validation_check: [
          "Dapat menjelaskan perbedaan Column dan LazyColumn",
          "Mengetahui solusi jika items(list) bergaris merah di Android Studio",
        ],
        common_errors: [
          {
            error: "Muncul error 'Type mismatch: inferred type is List<Task> but Int was expected' pada baris items(filteredTasks).",
            solution:
              "Tambahkan baris 'import androidx.compose.foundation.lazy.items' di bagian atas file, karena tanpa import tersebut Kotlin mengira parameter pertama adalah jumlah angka (Int).",
          },
        ],
        exercise:
          "Mengapa kita menambahkan 'contentPadding = PaddingValues(bottom = 88.dp)' pada LazyColumn? Apa hubungannya dengan tombol FloatingActionButton di pojok kanan bawah?",
        quiz: [
          {
            question: "Import manakah yang wajib ditambahkan agar fungsi items(daftarTugas) di dalam LazyColumn dapat menerima sebuah List?",
            options: [
              "import java.util.Scanner",
              "import androidx.compose.foundation.lazy.items",
              "import android.widget.Toast",
              "import androidx.room.Entity",
            ],
            correctIndex: 1,
            explanation:
              "Fungsi ekstensi items() yang menerima List berada di dalam paket androidx.compose.foundation.lazy.items.",
          },
        ],
      },
      {
        id: "m3-l4",
        module_id: "modul-3",
        lesson_number: 4,
        title: "Menyusun Kerangka Layar Utama dengan Scaffold & Konfirmasi Hapus",
        slug: "kerangka-scaffold-dan-konfirmasi-hapus",
        description:
          "Merakit tampilan utuh menggunakan Scaffold Material 3 (TopAppBar, FloatingActionButton, Content) serta menambahkan AlertDialog konfirmasi sebelum menghapus tugas agar siswa tidak salah pencet.",
        estimated_minutes: 35,
        order_index: 4,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu merakit HomeScreen menggunakan Scaffold Material 3 dan menambahkan fitur konfirmasi sebelum menghapus data.",
        prerequisites: ["Menyelesaikan Materi 3.1 s/d 3.3"],
        concept_explanation: `Agar aplikasi terlihat standar, rapi, dan proporsional seperti aplikasi Android resmi buatan Google, Material 3 menyediakan kerangka layar bernama **\`Scaffold\`**.
\`Scaffold\` menyediakan slot khusus untuk:
1. **\`topBar\`**: Bilah judul di bagian paling atas layar (\`TopAppBar\`), tempat menampilkan judul aplikasi **"SakuSiswa"** dan tombol **Keluar (Logout)**.
2. **\`floatingActionButton\`**: Tombol melayang di pojok kanan bawah (\`ExtendedFloatingActionButton\` bertuliskan **"+ Tugas Baru"**) yang selalu mudah dijangkau jempol pengguna.
3. **\`content\`**: Area utama layar yang memberikan nilai \`innerPadding\` agar daftar \`LazyColumn\` kita tidak tertutup oleh \`TopAppBar\`.

Selain itu, dalam desain aplikasi yang baik, tindakan destruktif seperti **Menghapus Data (Delete)** wajib dilengkapi **Dialog Konfirmasi** ("Yakin ingin menghapus tugas ini?") agar pengguna tidak kehilangan catatan penting karena tidak sengaja tersentuh.`,
        preparation: [
          "Pastikan StudentHeaderCard, TaskItemCard, dan TaskFormDialog sudah berada di package 'ui'",
        ],
        thinking_steps: [
          "Mengapa parameter 'innerPadding' dari blok Scaffold wajib dipasang ke 'Modifier.padding(innerPadding)' pada Column utama di dalamnya?",
          "State apa yang perlu kita simpan ketika pengguna menekan ikon tempat sampah pada salah satu kartu tugas sebelum tugas itu benar-benar dihapus?",
        ],
        step_instructions: [
          "Perhatikan bagaimana Scaffold mengatur posisi topBar, floatingActionButton, dan area konten utama.",
          "Buat sebuah state 'var taskToDelete by remember { mutableStateOf<TaskEntity?>(null) }' untuk menampung tugas yang sedang akan dihapus.",
          "Ketika 'taskToDelete != null', tampilkan AlertDialog konfirmasi berisi judul tugas yang akan dihapus beserta tombol 'Hapus' dan 'Batal'.",
        ],
        antigravity_prompt: {
          tujuan:
            "Memahami penggunaan Scaffold Material 3 dan state dialog konfirmasi hapus pada layar utama SakuSiswa.",
          konteks:
            "Layar HomeScreen aplikasi SakuSiswa dengan Jetpack Compose Material 3.",
          instruksi: [
            "Tunjukkan kerangka kode Scaffold lengkap dengan TopAppBar dan ExtendedFloatingActionButton.",
            "Jelaskan mengapa mengabaikan parameter innerPadding pada Scaffold menyebabkan bagian atas konten tertutup TopAppBar.",
            "Tunjukkan pola state 'var taskToDelete by remember { mutableStateOf<TaskEntity?>(null) }' untuk memunculkan AlertDialog konfirmasi hapus.",
          ],
          batasan: [
            "Gunakan anotasi @OptIn(ExperimentalMaterial3Api::class) jika menggunakan TopAppBar Material 3.",
          ],
          hasilAkhir:
            "Pola kode Scaffold dan AlertDialog konfirmasi hapus yang bersih.",
          validasi:
            "Siswa memahami fungsi innerPadding dan @OptIn(ExperimentalMaterial3Api::class).",
          rawPrompt: `[TUJUAN]\nMerakit struktur layar utama SakuSiswa dengan Scaffold Material 3 dan dialog konfirmasi hapus.\n\n[KONTEKS]\nAplikasi Android SakuSiswa menggunakan Kotlin dan Jetpack Compose Material 3.\n\n[INSTRUKSI]\n1. Tunjukkan cara menggunakan Scaffold dengan TopAppBar (menampilkan judul "SakuSiswa" dan tombol "Keluar") serta ExtendedFloatingActionButton ("+ Tugas Baru").\n2. Jelaskan fungsi parameter innerPadding yang diberikan oleh Scaffold.\n3. Tunjukkan cara menampilkan AlertDialog konfirmasi hapus ketika variabel state taskToDelete tidak bernilai null.\n\n[BATASAN]\nTambahkan @OptIn(ExperimentalMaterial3Api::class) untuk TopAppBar.\n\n[HASIL AKHIR]\nContoh kode struktur Scaffold dan dialog konfirmasi hapus.\n\n[VALIDASI]\nPastikan saya mengerti mengapa innerPadding tidak boleh diabaikan.`,
        },
        code_snippets: [
          {
            filename: "DeleteConfirmationDialog.kt",
            language: "kotlin",
            code: `@Composable
fun DeleteConfirmDialog(
    taskTitle: String,
    onDismiss: () -> Unit,
    onConfirmDelete: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Hapus Tugas?") },
        text = {
            Text("Apakah kamu yakin ingin menghapus tugas \"$taskTitle\"? Data yang dihapus tidak dapat dikembalikan.")
        },
        confirmButton = {
            Button(
                onClick = onConfirmDelete,
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.error
                )
            ) {
                Text("Ya, Hapus")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Batal")
            }
        }
    )
}`,
          },
        ],
        expected_result:
          "Siswa memahami cara menggabungkan seluruh komponen UI Modul 1 sampai 3 ke dalam kerangka Scaffold Material 3 beserta dialog konfirmasi hapus.",
        validation_check: [
          "Memahami peran topBar, floatingActionButton, dan innerPadding pada Scaffold",
          "Memahami cara kerja state dialog konfirmasi hapus",
        ],
        common_errors: [
          {
            error: "Muncul garis merah 'This material API is experimental and is likely to change' pada TopAppBar.",
            solution:
              "Tambahkan anotasi '@OptIn(ExperimentalMaterial3Api::class)' tepat di atas deklarasi fungsi '@Composable fun HomeScreen(...)'.",
          },
        ],
        exercise:
          "Coba bayangkan: jika kita ingin menggunakan 1 state yang sama untuk membuka dialog Edit Tugas, tipe data apa yang paling tepat untuk 'var taskToEdit by remember { mutableStateOf<...>(null) }'?",
        quiz: [
          {
            question: "Apa akibatnya jika kita tidak memasang Modifier.padding(innerPadding) pada wadah utama di dalam blok Scaffold?",
            options: [
              "Aplikasi tidak bisa di-install di HP",
              "Bagian atas konten layar akan tertutup oleh TopAppBar",
              "Warna tombol berubah menjadi hitam",
              "Database lokal menjadi penuh",
            ],
            correctIndex: 1,
            explanation:
              "Scaffold menghitung tinggi TopAppBar dan BottomBar lalu memberikannya lewat parameter innerPadding agar isi layar tidak tertimpa oleh bilah navigasi.",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // MODUL 4 (HARI 2 PAGI): AUTENTIKASI GOOGLE CREDENTIAL MANAGER API
  // =========================================================================
  {
    id: "modul-4",
    course_id: "course-android-compose-smkn1",
    module_number: 4,
    title: "Autentikasi Akun Google Modern dengan Credential Manager API",
    slug: "modul-4-autentikasi-google-credential-manager",
    description:
      "Mengintegrasikan fitur Sign in with Google menggunakan standar terbaru Android Credential Manager API, mengambil nama dan email siswa dari GoogleIdTokenCredential, serta menyimpan sesi login lokal.",
    estimated_minutes: 160,
    difficulty_level: "Menengah",
    is_published: true,
    order_index: 4,
    created_at: new Date().toISOString(),
    lessons: [
      {
        id: "m4-l1",
        module_id: "modul-4",
        lesson_number: 1,
        title: "Mengenal Android Credential Manager API, SHA-1 & Web Client ID",
        slug: "mengenal-credential-manager-dan-sha1",
        description:
          "Memahami cara kerja login Google modern di Android yang menggantikan GoogleSignInClient lama, serta cara mengambil sidik jari sertifikat SHA-1 di Android Studio.",
        estimated_minutes: 40,
        order_index: 1,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa memahami mengapa Credential Manager API menjadi standar resmi Android saat ini serta berhasil mendapatkan kode SHA-1 dan Web Client ID di Google Cloud Console.",
        prerequisites: ["Menyelesaikan Modul 1 s/d 3", "Memiliki akun Google aktif"],
        concept_explanation: `Saat kamu meminta AI membuatkan kode "Login Google Android" tanpa instruksi khusus, AI sering kali masih memberikan kode \`GoogleSignInClient\` yang **sudah resmi dipensiunkan (deprecated)** oleh Google!

Di Android modern (2025–2026), standar resmi untuk login akun Google adalah **Android Credential Manager API** (\`androidx.credentials\` + \`googleid\`). Keunggulannya:
1. Tampilan *bottom sheet* pemilihan akun Google langsung menyatu dengan sistem Android.
2. Kita langsung memperoleh objek **\`GoogleIdTokenCredential\`** yang berisi:
   - \`id\` (Alamat email akun Google siswa, misal \`budi@gmail.com\`)
   - \`displayName\` (Nama lengkap akun Google)
   - \`profilePictureUri\` (Link foto profil Google)
3. Tidak wajib menyewa server cloud! Email dari Google tersebut langsung kita pakai sebagai identitas pemilik tugas di **Room Database lokal**.

Agar Google mengizinkan aplikasi SakuSiswa milikmu membuka jendela login, Google memerlukan 2 hal dari proyekmu:
- **Sidik Jari SHA-1 Debug**: Tanda tangan unik aplikasi di laptopmu (diambil lewat perintah \`./gradlew signingReport\`).
- **Web Client ID**: Kunci OAuth 2.0 bertipe *Web application* dari Google Cloud Console yang dimasukkan ke dalam fungsi \`setServerClientId("...")\`.`,
        preparation: [
          "Buka tab Terminal di bagian bawah Android Studio",
          "Buka console.cloud.google.com di browser menggunakan akun Google-mu",
        ],
        thinking_steps: [
          "Mengapa kita wajib menyebutkan 'gunakan androidx.credentials Credential Manager API, jangan gunakan GoogleSignInClient' ketika menulis prompt ke AI?",
          "Mengapa parameter setServerClientId() di Credential Manager justru meminta 'Web application Client ID' dan bukan 'Android Client ID'?",
        ],
        step_instructions: [
          "Buka tab Terminal di Android Studio, ketik './gradlew signingReport' (macOS/Linux) atau 'gradlew signingReport' (Windows) lalu tekan Enter.",
          "Cari bagian 'Variant: debug' dan salin deretan kode 'SHA1: AA:BB:CC:...' ke catatanmu.",
          "Buka Google Cloud Console -> buat project baru 'SakuSiswa' -> masuk ke menu 'APIs & Services -> OAuth consent screen', pilih External, isi nama aplikasi 'SakuSiswa', dan tambahkan emailmu di bagian Test Users.",
          "Masuk ke menu 'Credentials -> Create Credentials -> OAuth client ID': buat 1 bertipe 'Android' (isi package name 'id.composelab.sakusiswa' dan kode SHA-1 tadi), lalu buat 1 lagi bertipe 'Web application' dan salin kode Client ID-nya (yang berakhiran .apps.googleusercontent.com).",
        ],
        antigravity_prompt: {
          tujuan:
            "Memahami langkah mengambil SHA-1 di Android Studio dan alasan dibutuhkannya OAuth Client ID Android serta Web untuk Credential Manager.",
          konteks:
            "Konfigurasi Sign in with Google menggunakan Android Credential Manager API pada proyek SakuSiswa.",
          instruksi: [
            "Jelaskan perbedaan peran OAuth Client ID tipe Android dan tipe Web application pada Credential Manager API.",
            "Berikan solusi jika perintah './gradlew signingReport' di terminal Windows memunculkan error JAVA_HOME.",
            "Jelaskan mengapa muncul error 'GetCredentialCancellationException' atau 'NoCredentialException' jika SHA-1 belum didaftarkan.",
          ],
          batasan: [
            "Fokus pada Credential Manager API terbaru, bukan Firebase Auth atau GoogleSignInClient lama.",
          ],
          hasilAkhir:
            "Panduan ringkas konfigurasi SHA-1 & Web Client ID beserta daftar penyebab error umum.",
          validasi:
            "Siswa memiliki string Web Client ID (.apps.googleusercontent.com) yang siap dipasang di kode.",
          rawPrompt: `[TUJUAN]\nMemahami konfigurasi SHA-1 dan Web Client ID untuk Android Credential Manager API.\n\n[KONTEKS]\nSaya siswa SMK sedang menyiapkan Sign in with Google pada aplikasi Android SakuSiswa (package: id.composelab.sakusiswa) tanpa backend eksternal.\n\n[INSTRUKSI]\n1. Jelaskan secara sederhana mengapa Android Credential Manager membutuhkan dua OAuth Client ID di Google Cloud Console (satu tipe Android dengan SHA-1, dan satu tipe Web application untuk setServerClientId).\n2. Tunjukkan cara mudah melihat nilai SHA-1 lewat panel Gradle di Android Studio jika terminal mengalami kendala.\n3. Jelaskan apa penyebab error "No credentials available" saat tombol Login Google ditekan di Emulator.\n\n[BATASAN]\nJangan gunakan GoogleSignInClient yang sudah deprecated.\n\n[HASIL AKHIR]\nPenjelasan fungsi SHA-1, Web Client ID, dan checklist pengecekan jika login gagal.\n\n[VALIDASI]\nPastikan saya tahu Client ID mana yang harus ditempelkan ke variabel WEB_CLIENT_ID di kode Kotlin.`,
        },
        code_snippets: [
          {
            filename: "Checklist-Google-Cloud-OAuth.txt",
            language: "yaml",
            code: `1. Ambil SHA-1 Debug di Terminal Android Studio:
   ./gradlew signingReport
   -> Salin nilai SHA1 pada Variant: debug

2. Di Google Cloud Console (APIs & Services -> Credentials):
   a) OAuth Client ID 1 (Tipe: Android)
      - Package name : id.composelab.sakusiswa
      - SHA-1        : (Tempel SHA-1 dari langkah 1)
   b) OAuth Client ID 2 (Tipe: Web application)
      - Salin "Client ID" (contoh: 123456789-abcdef.apps.googleusercontent.com)
      - Nilai inilah yang dimasukkan ke setServerClientId(WEB_CLIENT_ID) di Kotlin!`,
          },
        ],
        expected_result:
          "Siswa berhasil mendapatkan nilai SHA-1 Debug dan memiliki kode Web Client ID dari Google Cloud Console.",
        validation_check: [
          "Dapat menunjukkan kode SHA-1 dari hasil signingReport",
          "Memiliki Web Client ID berakhiran .apps.googleusercontent.com",
        ],
        common_errors: [
          {
            error: "Memasukkan Client ID tipe Android ke dalam fungsi setServerClientId(), sehingga login selalu gagal.",
            solution:
              "Fungsi setServerClientId() wajib diisi dengan Client ID dari OAuth bertipe 'Web application', sedangkan OAuth bertipe 'Android' bekerja otomatis di balik layar mencocokkan SHA-1 dan package name.",
          },
        ],
        exercise:
          "Cek apakah di HP atau Emulator yang kamu gunakan sudah ada minimal 1 akun Google yang login di menu Settings -> Accounts!",
        quiz: [
          {
            question: "Client ID tipe manakah dari Google Cloud Console yang wajib dimasukkan ke dalam parameter setServerClientId() pada GetGoogleIdOption?",
            options: [
              "OAuth Client ID tipe iOS",
              "OAuth Client ID tipe Web application",
              "Kode SHA-1 langsung",
              "Nama package aplikasi",
            ],
            correctIndex: 1,
            explanation:
              "GetGoogleIdOption.Builder().setServerClientId() membutuhkan OAuth 2.0 Client ID bertipe Web application, sementara Client ID tipe Android memverifikasi package name dan SHA-1 aplikasi.",
          },
        ],
      },
      {
        id: "m4-l2",
        module_id: "modul-4",
        lesson_number: 2,
        title: "Menambahkan Dependensi Credential Manager & Izin Internet",
        slug: "dependensi-credential-manager-dan-manifest",
        description:
          "Memasang library androidx.credentials dan com.google.android.libraries.identity.googleid di build.gradle.kts (Module :app) serta menambahkan izin INTERNET pada AndroidManifest.xml.",
        estimated_minutes: 35,
        order_index: 2,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu menambahkan dependensi Credential Manager API di build.gradle.kts dan melakukan Sync Now hingga sukses.",
        prerequisites: ["Menyelesaikan Materi 4.1"],
        concept_explanation: `Untuk memanggil fitur **Credential Manager API** dan **Google ID**, kita perlu menambahkan 3 baris library resmi di dalam blok \`dependencies { ... }\` pada file \`build.gradle.kts (Module :app)\`:

1. \`androidx.credentials:credentials:1.3.0\`: API inti Credential Manager Jetpack.
2. \`androidx.credentials:credentials-play-services-auth:1.3.0\`: Penghubung Credential Manager dengan Google Play Services di HP Android.
3. \`com.google.android.libraries.identity.googleid:googleid:1.1.1\`: Pembaca token identitas akun Google (\`GoogleIdTokenCredential\`).

Jangan lupa juga menambahkan baris \`<uses-permission android:name="android.permission.INTERNET" />\` di dalam \`AndroidManifest.xml\` agar aplikasi diizinkan menghubungi layanan autentikasi Google.`,
        preparation: [
          "Buka file AndroidManifest.xml dan build.gradle.kts (Module :app)",
        ],
        thinking_steps: [
          "Apa yang terjadi jika kita sudah menulis kode import androidx.credentials.* tetapi belum menekan tombol 'Sync Now' setelah mengedit build.gradle.kts?",
          "Di bagian mana di dalam AndroidManifest.xml baris <uses-permission> harus diletakkan (di luar atau di dalam tag <application>)?",
        ],
        step_instructions: [
          "Buka 'app/manifests/AndroidManifest.xml', lalu tambahkan '<uses-permission android:name=\"android.permission.INTERNET\" />' tepat di atas tag '<application>'.",
          "Buka 'Gradle Scripts -> build.gradle.kts (Module :app)', gulir ke bagian paling bawah di dalam blok 'dependencies { ... }'.",
          "Tambahkan ketiga baris implementation untuk credentials, credentials-play-services-auth, dan googleid seperti pada contoh kode di bawah.",
          "Klik tombol 'Sync Now' yang muncul di pita biru bagian atas editor dan tunggu sampai selesai tanpa error.",
        ],
        antigravity_prompt: {
          tujuan:
            "Memverifikasi penambahan dependensi Credential Manager API dan izin internet pada proyek SakuSiswa.",
          konteks:
            "File build.gradle.kts (Module :app) dengan Kotlin DSL dan AndroidManifest.xml.",
          instruksi: [
            "Tunjukkan penempatan tepat tag <uses-permission android:name=\"android.permission.INTERNET\" /> di dalam AndroidManifest.xml.",
            "Tunjukkan penulisan implementation(...) untuk Credential Manager API dan Google ID di dalam build.gradle.kts (Module :app).",
            "Jelaskan cara mengatasi error jika salah mengetik tanda kutip satu ('...') yang seharusnya tanda kutip dua (\"...\") pada Kotlin DSL.",
          ],
          batasan: [
            "Gunakan sintaks Kotlin DSL (build.gradle.kts) dengan tanda kurung dan kutip dua.",
          ],
          hasilAkhir:
            "Potongan kode AndroidManifest.xml dan build.gradle.kts yang siap di-sync.",
          validasi:
            "Proses Gradle Sync selesai tanpa pesan error.",
          rawPrompt: `[TUJUAN]\nMenambahkan dependensi Android Credential Manager API dan izin INTERNET dengan benar.\n\n[KONTEKS]\nProyek Android SakuSiswa menggunakan Kotlin DSL (build.gradle.kts Module :app).\n\n[INSTRUKSI]\n1. Tunjukkan posisi baris <uses-permission android:name="android.permission.INTERNET" /> di dalam AndroidManifest.xml.\n2. Tunjukkan baris dependencies untuk androidx.credentials:credentials:1.3.0, androidx.credentials:credentials-play-services-auth:1.3.0, dan com.google.android.libraries.identity.googleid:googleid:1.1.1.\n3. Jelaskan mengapa di file .kts (Kotlin Script) kita wajib memakai tanda kurung dan kutip dua implementation("...") bukan kutip satu.\n\n[BATASAN]\nHanya tampilkan bagian yang perlu ditambahkan agar tidak membingungkan.\n\n[HASIL AKHIR]\nSnippet konfigurasi AndroidManifest.xml dan build.gradle.kts.\n\n[VALIDASI]\nPastikan Gradle Sync berhasil tanpa error unresolved reference.`,
        },
        code_snippets: [
          {
            filename: "build.gradle.kts (Module :app)",
            language: "kotlin",
            code: `dependencies {
    // ... dependensi Compose bawaan tetap dipertahankan ...

    // Google Sign-In dengan Android Credential Manager API
    implementation("androidx.credentials:credentials:1.3.0")
    implementation("androidx.credentials:credentials-play-services-auth:1.3.0")
    implementation("com.google.android.libraries.identity.googleid:googleid:1.1.1")
}`,
          },
          {
            filename: "AndroidManifest.xml",
            language: "xml",
            code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Izin internet untuk verifikasi akun Google -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        ...`,
          },
        ],
        expected_result:
          "Ketiga library Credential Manager berhasil ter-install di proyek dan izin internet sudah aktif di AndroidManifest.xml.",
        validation_check: [
          "Gradle Sync selesai dengan sukses",
          "Ketika mengetik import androidx.credentials.CredentialManager di file Kotlin, auto-complete langsung muncul",
        ],
        common_errors: [
          {
            error: "Menulis implementation 'androidx.credentials:credentials:1.3.0' (Groovy style) di dalam file build.gradle.kts.",
            solution:
              "Karena menggunakan Kotlin DSL (.kts), wajib memakai tanda kurung dan kutip dua: implementation(\"androidx.credentials:credentials:1.3.0\").",
          },
        ],
        exercise:
          "Coba ketik 'import androidx.credentials.CredentialManager' di bagian atas MainActivity.kt untuk memastikan library sudah terbaca!",
        quiz: [
          {
            question: "Di manakah letak penulisan tag <uses-permission android:name=\"android.permission.INTERNET\" /> yang benar di dalam AndroidManifest.xml?",
            options: [
              "Di dalam tag <activity>",
              "Di dalam tag <manifest>, sejajar (di luar/di atas) tag <application>",
              "Di dalam file build.gradle.kts",
              "Di dalam fungsi @Composable",
            ],
            correctIndex: 1,
            explanation:
              "Tag <uses-permission> selalu diletakkan langsung di bawah elemen akar <manifest> sebelum blok <application>.",
          },
        ],
      },
      {
        id: "m4-l3",
        module_id: "modul-4",
        lesson_number: 3,
        title: "Membangun GoogleAuthManager & Layar Login SakuSiswa",
        slug: "membangun-google-auth-manager-dan-login-screen",
        description:
          "Menulis kelas GoogleAuthManager untuk memunculkan dialog pemilihan akun Google, mengekstrak nama dan email pengguna, serta menyediakan mode Login Tamu Lokal untuk pengujian darurat di kelas.",
        estimated_minutes: 45,
        order_index: 3,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu membuat kelas GoogleAuthManager dan LoginScreen yang menampilkan akun Google serta menangani error dengan ramah.",
        prerequisites: ["Menyelesaikan Materi 4.1 dan 4.2"],
        concept_explanation: `Sekarang kita akan membuat kelas **\`GoogleAuthManager\`** di dalam package \`data\`. Bagaimana urutan kerjanya?

1. Kita membuat model data sederhana **\`SignedInUser(val email: String, val displayName: String, val photoUrl: String?)\`**.
2. Di dalam fungsi \`suspend fun signInWithGoogle(webClientId: String): Result<SignedInUser>\`:
   - Kita menyusun permintaan **\`GetGoogleIdOption\`** dengan \`setFilterByAuthorizedAccounts(false)\` (agar semua akun Google di HP bisa dipilih).
   - Kita memanggil \`credentialManager.getCredential(context, request)\`.
   - Jika berhasil, kita mengubah hasilnya menjadi \`GoogleIdTokenCredential.createFrom(credential.data)\` dan mengambil \`credential.id\` (email) serta \`credential.displayName\`.
3. **Tips Rekayasa Cerdas untuk Praktik Sekolah**: Terkadang di laboratorium sekolah ada emulator yang tidak memiliki Google Play Services atau internet sedang terputus. Karena itu, pada \`LoginScreen\`, selain tombol utama **"Masuk dengan Akun Google"**, kita juga menyediakan opsi **"Masuk Mode Praktik Offline"** dengan email siswa agar proses belajar CRUD Room Database tidak pernah terhambat!`,
        preparation: [
          "Siapkan Web Client ID dari Materi 4.1",
          "Buka package 'id.composelab.sakusiswa.data' dan 'id.composelab.sakusiswa.ui'",
        ],
        thinking_steps: [
          "Mengapa fungsi signInWithGoogle() harus diberi kata kunci 'suspend'?",
          "Mengapa membungkus panggilan getCredential() dengan blok try-catch sangat penting (misalnya ketika pengguna menutup jendela pilih akun Google tanpa jadi memilih)?",
        ],
        step_instructions: [
          "Klik kanan pada package 'data' -> New -> Kotlin Class/File -> buat 'GoogleAuthManager.kt'.",
          "Tulis data class SignedInUser dan kelas GoogleAuthManager seperti pada contoh kode referensi.",
          "Klik kanan pada package 'ui' -> New -> Kotlin Class/File -> buat 'LoginScreen.kt'.",
          "Gunakan rememberCoroutineScope() di dalam LoginScreen untuk menjalankan googleAuthManager.signInWithGoogle() ketika tombol ditekan.",
        ],
        antigravity_prompt: {
          tujuan:
            "Membuat GoogleAuthManager.kt dan LoginScreen.kt menggunakan Android Credential Manager API dan Jetpack Compose.",
          konteks:
            "Aplikasi Android SakuSiswa (id.composelab.sakusiswa) menggunakan Kotlin, Coroutines, dan Material 3.",
          instruksi: [
            "Buat data class SignedInUser(val email: String, val displayName: String) dan class GoogleAuthManager(private val context: Context) di package data.",
            "Implementasikan suspend fun signInWithGoogle(webClientId: String): Result<SignedInUser> menggunakan CredentialManager dan GetGoogleIdOption.",
            "Buat @Composable fun LoginScreen di package ui yang memiliki tombol 'Masuk dengan Google' serta pesan error yang jelas jika login dibatalkan atau gagal.",
            "Jelaskan fungsi CustomCredential dan TYPE_GOOGLE_ID_TOKEN_CREDENTIAL.",
          ],
          batasan: [
            "Tangani GetCredentialException menggunakan try-catch agar aplikasi tidak pernah crash saat user menekan tombol kembali.",
          ],
          hasilAkhir:
            "File GoogleAuthManager.kt dan LoginScreen.kt yang siap dihubungkan ke sesi pengguna.",
          validasi:
            "Jendela pemilihan akun Google muncul saat tombol Masuk dengan Google ditekan.",
          rawPrompt: `[TUJUAN]\nMembuat kelas GoogleAuthManager.kt dan layar LoginScreen.kt dengan Android Credential Manager API.\n\n[KONTEKS]\nAplikasi Android SakuSiswa, package id.composelab.sakusiswa, menggunakan Kotlin dan Jetpack Compose Material 3.\n\n[INSTRUKSI]\n1. Buat data class SignedInUser(val email: String, val displayName: String) di dalam file GoogleAuthManager.kt.\n2. Buat fungsi suspend signInWithGoogle(webClientId: String): Result<SignedInUser> yang memanggil CredentialManager.create(context).getCredential(...).\n3. Tangkap GetCredentialException di dalam blok try-catch dan kembalikan pesan error bahasa Indonesia yang mudah dimengerti.\n4. Buat fungsi @Composable LoginScreen yang memanggil signInWithGoogle di dalam rememberCoroutineScope().launch { ... }.\n\n[BATASAN]\nPastikan Context yang dikirim ke getCredential berasal dari LocalContext.current (Activity context).\n\n[HASIL AKHIR]\nKode lengkap GoogleAuthManager.kt dan LoginScreen.kt beserta penjelasan alurnya.\n\n[VALIDASI]\nPastikan aplikasi tidak Force Close ketika pengguna menutup pop-up pemilihan akun Google.`,
        },
        code_snippets: [
          {
            filename: "GoogleAuthManager.kt",
            language: "kotlin",
            code: `package id.composelab.sakusiswa.data

import android.content.Context
import androidx.credentials.CredentialManager
import androidx.credentials.CustomCredential
import androidx.credentials.GetCredentialRequest
import androidx.credentials.exceptions.GetCredentialException
import com.google.android.libraries.identity.googleid.GetGoogleIdOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential

data class SignedInUser(
    val email: String,
    val displayName: String
)

class GoogleAuthManager(private val context: Context) {
    private val credentialManager = CredentialManager.create(context)

    suspend fun signInWithGoogle(webClientId: String): Result<SignedInUser> {
        return try {
            val googleIdOption = GetGoogleIdOption.Builder()
                .setFilterByAuthorizedAccounts(false)
                .setServerClientId(webClientId)
                .setAutoSelectEnabled(false)
                .build()

            val request = GetCredentialRequest.Builder()
                .addCredentialOption(googleIdOption)
                .build()

            val response = credentialManager.getCredential(
                context = context,
                request = request
            )

            val credential = response.credential
            if (credential is CustomCredential &&
                credential.type == GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL
            ) {
                val googleIdToken = GoogleIdTokenCredential.createFrom(credential.data)
                Result.success(
                    SignedInUser(
                        email = googleIdToken.id,
                        displayName = googleIdToken.displayName ?: googleIdToken.id.substringBefore("@")
                    )
                )
            } else {
                Result.failure(Exception("Tipe kredensial Google tidak dikenali."))
            }
        } catch (e: GetCredentialException) {
            Result.failure(Exception("Login Google gagal atau dibatalkan: \${e.message}"))
        } catch (e: Exception) {
            Result.failure(Exception("Terjadi kesalahan login: \${e.message}"))
        }
    }
}`,
          },
        ],
        expected_result:
          "Kelas GoogleAuthManager selesai dibuat dan mampu mengekstrak email serta nama akun Google pengguna secara aman.",
        validation_check: [
          "Tidak ada error kompilasi pada GoogleAuthManager.kt",
          "Eksepsi GetCredentialException sudah ditangkap dengan try-catch",
        ],
        common_errors: [
          {
            error: "Mengirim applicationContext (bukan Activity context dari LocalContext.current) ke getCredential(), sehingga bottom sheet tidak muncul.",
            solution:
              "Selalu gunakan Context dari LocalContext.current di dalam Composable karena Credential Manager membutuhkan Activity untuk menampilkan jendela pop-up akun.",
          },
        ],
        exercise:
          "Perhatikan baris 'displayName = googleIdToken.displayName ?: googleIdToken.id.substringBefore(\"@\")'. Jelaskan apa yang dilakukan baris kode tersebut jika akun Google siswa belum memiliki nama tampilan!",
        quiz: [
          {
            question: "Mengapa kita membungkus pemanggilan credentialManager.getCredential() di dalam blok try-catch?",
            options: [
              "Supaya warna tombol berubah otomatis",
              "Karena jika pengguna menutup dialog pemilihan akun atau tidak ada koneksi internet, CredentialManager melempar GetCredentialException",
              "Untuk menghapus semua tugas di database",
              "Karena bahasa Kotlin mewajibkan try-catch di setiap baris",
            ],
            correctIndex: 1,
            explanation:
              "Pembatalan login oleh pengguna atau kegagalan jaringan akan melempar GetCredentialException. Dengan try-catch, aplikasi tetap berjalan normal dan bisa menampilkan pesan informasi.",
          },
        ],
      },
      {
        id: "m4-l4",
        module_id: "modul-4",
        lesson_number: 4,
        title: "Menyimpan Sesi Login Lokal & Fitur Keluar (Logout)",
        slug: "menyimpan-sesi-login-lokal-dan-logout",
        description:
          "Menyimpan email dan nama akun Google yang sudah login ke penyimpanan lokal perangkat (SharedPreferences / DataStore) agar siswa tidak perlu login berulang kali setiap membuka aplikasi.",
        estimated_minutes: 40,
        order_index: 4,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu menyimpan dan menghapus sesi pengguna yang login secara lokal menggunakan SessionManager serta memanggil clearCredentialState saat Logout.",
        prerequisites: ["Menyelesaikan Materi 4.3"],
        concept_explanation: `Bayangkan betapa repotnya jika setiap kali kamu menutup aplikasi SakuSiswa lalu membukanya lagi 5 menit kemudian, aplikasi meminta kamu Login Google dari awal.

Untuk menyimpan informasi sederhana seperti *"Siapa email dan nama siswa yang sedang login saat ini?"*, Android menyediakan penyimpanan *Key-Value* lokal bernama **\`SharedPreferences\`** (atau Jetpack \`DataStore\`).
1. **Saat Login Berhasil**: Kita simpan \`user_email\` dan \`user_name\` ke penyimpanan lokal.
2. **Saat Aplikasi Baru Dibuka**: Kita cek apakah \`user_email\` sudah ada. Jika sudah ada, langsung buka **\`HomeScreen\`**!
3. **Saat Tombol Keluar (Logout) Ditekan**: Kita hapus \`user_email\` dari penyimpanan lokal dan panggil \`credentialManager.clearCredentialState(ClearCredentialStateRequest())\` agar siswa bisa berganti ke akun Google lain.`,
        preparation: [
          "Buka file GoogleAuthManager.kt di package 'data'",
        ],
        thinking_steps: [
          "Mengapa untuk menyimpan 2 data sederhana (email dan nama user yang aktif) kita cukup memakai SharedPreferences/DataStore, sedangkan untuk menyimpan ratusan daftar tugas yang perlu difilter kita memakai Room Database?",
          "Apa yang terjadi jika saat Logout kita hanya menghapus SharedPreferences tetapi tidak memanggil clearCredentialState?",
        ],
        step_instructions: [
          "Tambahkan fungsi saveSession(user: SignedInUser), getSavedUser(): SignedInUser?, dan signOut() di dalam GoogleAuthManager.kt.",
          "Buat file LoginScreen.kt di package 'ui' yang menampilkan kartu login SakuSiswa.",
          "Uji alur masuk -> tutup aplikasi -> buka kembali aplikasi -> pastikan sesi pengguna tetap tersimpan.",
        ],
        antigravity_prompt: {
          tujuan:
            "Melengkapi GoogleAuthManager dengan penyimpanan sesi lokal dan fungsi signOut(), serta membuat LoginScreen.kt.",
          konteks:
            "Aplikasi Android SakuSiswa menggunakan Credential Manager API dan penyimpanan sesi lokal.",
          instruksi: [
            "Tambahkan fungsi saveUserSession(user: SignedInUser), getSavedUser(): SignedInUser?, dan suspend fun signOut() menggunakan ClearCredentialStateRequest di dalam GoogleAuthManager.",
            "Buat komponen @Composable LoginScreen(onLoginSuccess: (SignedInUser) -> Unit) yang bersih dan ramah bagi siswa SMK.",
            "Sediakan juga tombol masuk mode simulasi lokal jika siswa sedang menguji di emulator tanpa Play Store.",
          ],
          batasan: [
            "Gunakan kode yang ringkas dan mudah dipahami siswa.",
          ],
          hasilAkhir:
            "Kode sesi login lokal dan LoginScreen.kt yang siap diintegrasikan.",
          validasi:
            "Sesi pengguna tetap bertahan ketika aplikasi ditutup dan dibuka kembali.",
          rawPrompt: `[TUJUAN]\nMenambahkan manajemen sesi login lokal (simpan sesi & logout) pada GoogleAuthManager dan membuat LoginScreen.kt.\n\n[KONTEKS]\nAplikasi Android SakuSiswa, package id.composelab.sakusiswa.\n\n[INSTRUKSI]\n1. Tambahkan fungsi saveSession(user: SignedInUser), getSavedSession(): SignedInUser?, dan suspend fun signOut() (memanggil clearCredentialState) pada GoogleAuthManager.\n2. Buat @Composable fun LoginScreen(webClientId: String, authManager: GoogleAuthManager, onSignedIn: (SignedInUser) -> Unit).\n3. Sediakan tombol utama "Masuk dengan Akun Google" serta form kecil cadangan untuk emulator sekolah yang belum login Play Store.\n\n[BATASAN]\nPastikan semua state error ditampilkan dengan jelas di layar.\n\n[HASIL AKHIR]\nKode lengkap penyimpanan sesi dan LoginScreen.kt.\n\n[VALIDASI]\nPastikan tombol Keluar benar-benar menghapus sesi dan mengembalikan pengguna ke LoginScreen.`,
        },
        code_snippets: [
          {
            filename: "SesiLoginTambahan.kt",
            language: "kotlin",
            code: `// Tambahkan di dalam class GoogleAuthManager(private val context: Context):
private val prefs = context.getSharedPreferences("sakusiswa_session", Context.MODE_PRIVATE)

fun saveSession(user: SignedInUser) {
    prefs.edit()
        .putString("email", user.email)
        .putString("name", user.displayName)
        .apply()
}

fun getSavedSession(): SignedInUser? {
    val email = prefs.getString("email", null) ?: return null
    val name = prefs.getString("name", "Siswa") ?: "Siswa"
    return SignedInUser(email = email, displayName = name)
}

suspend fun signOut() {
    prefs.edit().clear().apply()
    try {
        credentialManager.clearCredentialState(
            androidx.credentials.ClearCredentialStateRequest()
        )
    } catch (_: Exception) { }
}`,
          },
        ],
        expected_result:
          "Fitur autentikasi Google dan manajemen sesi lokal SakuSiswa selesai; pengguna dapat login, tetap masuk saat aplikasi dibuka ulang, dan melakukan logout.",
        validation_check: [
          "Fungsi getSavedSession() mengembalikan data pengguna yang sudah login",
          "Fungsi signOut() menghapus sesi dan mengembalikan tampilan ke layar login",
        ],
        common_errors: [
          {
            error: "Lupa memanggil .apply() setelah prefs.edit().putString(...) sehingga sesi tidak tersimpan.",
            solution:
              "Selalu akhiri perubahan SharedPreferences.Editor dengan .apply() agar data benar-benar ditulis ke penyimpanan lokal.",
          },
        ],
        exercise:
          "Uji fitur Logout di aplikasimu, lalu masuk kembali menggunakan akun kedua untuk membuktikan bahwa sesi akun berhasil berganti!",
        quiz: [
          {
            question: "Fungsi apakah pada CredentialManager yang dipanggil saat pengguna menekan tombol Logout agar status kredensial aktif dibersihkan?",
            options: [
              "credentialManager.deleteDatabase()",
              "credentialManager.clearCredentialState(ClearCredentialStateRequest())",
              "credentialManager.finishActivity()",
              "credentialManager.reboot()",
            ],
            correctIndex: 1,
            explanation:
              "clearCredentialState() memberi tahu sistem Credential Manager bahwa sesi pengguna telah berakhir sehingga saat login berikutnya pilihan akun ditampilkan kembali.",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // MODUL 5 (HARI 2 SIANG-SORE): ROOM DATABASE (KSP) & OPERASI CRUD LENGKAP
  // =========================================================================
  {
    id: "modul-5",
    course_id: "course-android-compose-smkn1",
    module_number: 5,
    title: "Penyimpanan Lokal Room Database (KSP) & Operasi CRUD Lengkap",
    slug: "modul-5-room-database-ksp-dan-crud",
    description:
      "Inti dari penyimpanan data lokal Android: mengonfigurasi Room Database dengan plugin KSP modern, membuat Entity, DAO dengan Flow, Database Singleton, serta menghubungkan fitur Create, Read, Update, dan Delete ke Jetpack Compose.",
    estimated_minutes: 210,
    difficulty_level: "Menengah",
    is_published: true,
    order_index: 5,
    created_at: new Date().toISOString(),
    lessons: [
      {
        id: "m5-l1",
        module_id: "modul-5",
        lesson_number: 1,
        title: "Konfigurasi Room Database & Plugin KSP di Gradle",
        slug: "konfigurasi-room-database-dan-ksp",
        description:
          "Memahami arsitektur 3 pilar Room Database (Entity, DAO, Database) dan cara memasang Kotlin Symbol Processing (KSP) sebagai pengganti kapt yang lebih cepat dan modern.",
        estimated_minutes: 45,
        order_index: 1,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa memahami fungsi Entity, DAO, dan Database pada Room serta berhasil mengonfigurasi plugin KSP dan dependensi Room 2.6+ di build.gradle.kts.",
        prerequisites: ["Menyelesaikan Modul 1 s/d 4"],
        concept_explanation: `Mengapa tugas yang kita ketik di variabel State (\`mutableStateOf\`) hilang begitu aplikasi ditutup? Karena State hanya hidup di **RAM (memori sementara)**. Agar data tugas tersimpan permanen di memori internal HP meskipun HP dimatikan atau tanpa sinyal internet, kita menggunakan **Room Database** (pustaka resmi Jetpack di atas mesin database **SQLite**).

Room Database memiliki **3 Komponen Utama**:
1. **\`@Entity\` (Tabel)**: Cetakan \`data class\` yang menentukan nama tabel dan kolom-kolomnya (misal tabel \`tasks\`).
2. **\`@Dao\` (Data Access Object / Pelayan Data)**: Interface berisi fungsi perintah untuk menambah (\`@Insert\`), membaca (\`@Query\`), mengubah (\`@Update\`), dan menghapus (\`@Delete\`) data.
3. **\`@Database\` (Brankas Utama)**: Kelas abstrak yang menyatukan semua Entity dan DAO serta membuat koneksi file database di dalam HP.

**Penting (Standar 2026 — Gunakan KSP, Bukan kapt!)**:
Room membutuhkan *code generator* untuk menerjemahkan anotasi \`@Entity\` dan \`@Dao\` menjadi kode SQL otomatis. Dulu orang memakai \`kapt\`, tetapi sekarang \`kapt\` sudah lambat dan usang. Kita wajib menggunakan **KSP (Kotlin Symbol Processing)** (\`com.google.devtools.ksp\`) yang hingga 2x lebih cepat!`,
        preparation: [
          "Buka build.gradle.kts (Project: SakuSiswa) dan build.gradle.kts (Module :app)",
        ],
        thinking_steps: [
          "Apa perbedaan fungsi antara @Entity, @Dao, dan @Database di dalam Room?",
          "Mengapa jika kita hanya menambahkan implementation(\"androidx.room:room-runtime\") tanpa ksp(\"androidx.room:room-compiler\"), aplikasi akan crash saat dijalankan?",
        ],
        step_instructions: [
          "Buka 'build.gradle.kts (Project: SakuSiswa)' dan tambahkan plugin KSP yang sesuai dengan versi Kotlin proyekmu di dalam blok plugins { ... }.",
          "Buka 'build.gradle.kts (Module :app)', aktifkan plugin KSP di blok plugins { ... } paling atas.",
          "Masih di 'build.gradle.kts (Module :app)', tambahkan 3 dependensi Room (room-runtime, room-ktx, dan ksp room-compiler) serta lifecycle-viewmodel-compose.",
          "Klik 'Sync Now' dan pastikan proses unduh selesai tanpa error.",
        ],
        antigravity_prompt: {
          tujuan:
            "Memasang plugin KSP dan dependensi Room Database di build.gradle.kts sesuai versi Kotlin proyek.",
          konteks:
            "Proyek Android Studio SakuSiswa menggunakan Kotlin DSL (build.gradle.kts).",
          instruksi: [
            "Tunjukkan cara mengecek versi Kotlin di file gradle/libs.versions.toml agar versi plugin KSP cocok.",
            "Tunjukkan baris plugin KSP dan dependencies untuk Room Database (room-runtime, room-ktx, dan ksp room-compiler) beserta lifecycle-viewmodel-compose.",
            "Jelaskan apa fungsi room-ktx (dukungan Coroutines dan Flow).",
          ],
          batasan: [
            "Gunakan KSP (ksp(...)), dilarang menggunakan kapt.",
          ],
          hasilAkhir:
            "Konfigurasi Gradle untuk Room + KSP yang berhasil di-sync.",
          validasi:
            "Anotasi @Entity, @Dao, dan @Database dapat di-import di file Kotlin.",
          rawPrompt: `[TUJUAN]\nMengonfigurasi Room Database dengan plugin KSP pada proyek Android Studio Kotlin DSL.\n\n[KONTEKS]\nProyek SakuSiswa menggunakan build.gradle.kts dan gradle/libs.versions.toml.\n\n[INSTRUKSI]\n1. Jelaskan cara mencocokkan versi plugin "com.google.devtools.ksp" dengan versi Kotlin yang tertulis di libs.versions.toml.\n2. Tunjukkan penambahan plugin KSP di build.gradle.kts (Project) dan build.gradle.kts (Module :app).\n3. Tunjukkan penambahan dependencies Room (room-runtime, room-ktx, dan ksp room-compiler) serta androidx.lifecycle:lifecycle-viewmodel-compose.\n4. Jelaskan mengapa room-ktx wajib dipasang agar kita bisa memakai suspend fun dan Flow di DAO.\n\n[BATASAN]\nJangan gunakan kapt. Gunakan KSP.\n\n[HASIL AKHIR]\nPanduan dan snippet kode konfigurasi Room + KSP di Gradle.\n\n[VALIDASI]\nPastikan Gradle Sync berjalan sukses tanpa error versi KSP.`,
        },
        code_snippets: [
          {
            filename: "build.gradle.kts (Module :app) — Bagian Room & KSP",
            language: "kotlin",
            code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    id("com.google.devtools.ksp") version "2.0.21-1.0.27" // Sesuaikan awalan 2.0.21 dengan versi kotlin di libs.versions.toml
}

dependencies {
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    ksp("androidx.room:room-compiler:$roomVersion")

    // ViewModel untuk Jetpack Compose
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
}`,
          },
        ],
        expected_result:
          "Plugin KSP dan pustaka Room Database berhasil terpasang dan ter-sinkronisasi di proyek SakuSiswa.",
        validation_check: [
          "Gradle Sync berjalan sukses tanpa error",
          "Paket androidx.room.* dapat di-import di dalam kode Kotlin",
        ],
        common_errors: [
          {
            error: "Muncul error 'ksp-x.x.x is too old/new for kotlin-x.x.x' saat Gradle Sync.",
            solution:
              "Buka file gradle/libs.versions.toml, lihat angka pada baris 'kotlin = \"...\"' (misal 2.0.21), lalu pastikan awalan versi plugin KSP sama persis dengan versi Kotlin tersebut (atau gunakan plugin kotlin.kapt hanya jika jaringan sekolah memblokir repositori KSP).",
          },
        ],
        exercise:
          "Buka file gradle/libs.versions.toml di proyekmu dan catat berapa versi 'kotlin' dan 'agp' (Android Gradle Plugin) yang tertulis di sana!",
        quiz: [
          {
            question: "Manakah dari ketiga dependensi Room berikut yang bertugas menghasilkan kode implementasi SQL secara otomatis saat proses kompilasi melalui KSP?",
            options: [
              "androidx.room:room-compiler (dipasang dengan ksp(...))",
              "androidx.compose.material3:material3",
              "androidx.credentials:credentials",
              "androidx.activity:activity-compose",
            ],
            correctIndex: 0,
            explanation:
              "room-compiler membaca anotasi @Entity, @Dao, dan @Database lalu menghasilkan kode SQLite secara otomatis melalui KSP.",
          },
        ],
      },
      {
        id: "m5-l2",
        module_id: "modul-5",
        lesson_number: 2,
        title: "Membuat @Entity (TaskEntity), @Dao (TaskDao) & @Database Singleton",
        slug: "membuat-entity-dao-dan-database-room",
        description:
          "Menulis ketiga file inti Room Database di dalam package data: TaskEntity.kt sebagai representasi tabel tugas, TaskDao.kt untuk operasi CRUD + Flow, dan SakuSiswaDatabase.kt.",
        estimated_minutes: 55,
        order_index: 2,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu menulis kode TaskEntity, TaskDao (Insert, Query, Update, Delete), dan SakuSiswaDatabase tanpa error kompilasi.",
        prerequisites: ["Menyelesaikan Materi 5.1"],
        concept_explanation: `Sekarang kita akan menulis 3 file inti di dalam package **\`data\`**:

1. **\`TaskEntity.kt\`**:
   Diberi anotasi \`@Entity(tableName = "tasks")\`. Kolom \`id\` diberi \`@PrimaryKey(autoGenerate = true)\` agar nomor ID bertambah otomatis (1, 2, 3, dst.) setiap kali tugas baru disimpan. Kita juga menyertakan kolom \`userEmail\` agar tugas milik Siswa A tidak bercampur dengan tugas milik Siswa B!
2. **\`TaskDao.kt\`**:
   Diberi anotasi \`@Dao\`. Perhatikan perbedaan cara kerja fungsi di dalamnya:
   - **Read (\`@Query\`)**: Mengembalikan **\`Flow<List<TaskEntity>>\`**. Karena memakai \`Flow\`, fungsi ini adalah pipa siaran langsung: begitu ada data yang ditambah, diubah, atau dihapus, \`Flow\` otomatis mengirimkan daftar terbaru ke layar!
   - **Create (\`@Insert\`), Update (\`@Update\`), Delete (\`@Delete\`)**: Diberi kata kunci **\`suspend\`** agar berjalan di latar belakang tanpa membuat layar macet.
3. **\`SakuSiswaDatabase.kt\`**:
   Menggunakan pola **Singleton (\`INSTANCE\`)** dengan \`@Volatile\` dan \`synchronized\`. Tujuannya agar di seluruh aplikasi hanya ada **satu** koneksi database yang dibuka, sehingga hemat memori dan tidak terjadi bentrokan file database.`,
        preparation: [
          "Buka package 'id.composelab.sakusiswa.data' di Android Studio",
        ],
        thinking_steps: [
          "Mengapa pada query 'SELECT * FROM tasks WHERE userEmail = :email ORDER BY isCompleted ASC, id DESC', fungsi getTasksByUser() tidak memakai kata kunci 'suspend' melainkan mengembalikan 'Flow<List<TaskEntity>>'?",
          "Mengapa kita mengurutkan daftar tugas dengan 'ORDER BY isCompleted ASC, id DESC'?",
        ],
        step_instructions: [
          "Buat file 'TaskEntity.kt' di dalam package 'data' dan ketik struktur @Entity(tableName = \"tasks\").",
          "Buat file 'TaskDao.kt' di dalam package 'data' dan lengkapi ke-4 operasi CRUD: getTasksByUser (@Query), insertTask (@Insert), updateTask (@Update), dan deleteTask (@Delete).",
          "Buat file 'SakuSiswaDatabase.kt' di dalam package 'data' dengan companion object getDatabase(context).",
          "Pilih menu 'Build -> Make Project' (ikon palu di atas) untuk memastikan KSP berhasil membuat kode database tanpa error!",
        ],
        antigravity_prompt: {
          tujuan:
            "Membuat 3 file lapisan data Room Database: TaskEntity.kt, TaskDao.kt, dan SakuSiswaDatabase.kt.",
          konteks:
            "Package id.composelab.sakusiswa.data menggunakan Room Database 2.6+ dengan KSP dan Kotlin Coroutines Flow.",
          instruksi: [
            "Buat TaskEntity.kt dengan kolom id, userEmail, subject, title, notes, dueDate, isCompleted, dan createdAt.",
            "Buat TaskDao.kt dengan fungsi getTasksByUser(email: String): Flow<List<TaskEntity>>, suspend fun insertTask, suspend fun updateTask, dan suspend fun deleteTask.",
            "Buat SakuSiswaDatabase.kt menggunakan pola Singleton dan fallbackToDestructiveMigration().",
            "Jelaskan arti ORDER BY isCompleted ASC, id DESC pada query SQL.",
          ],
          batasan: [
            "Pastikan semua kuery SQL di @Query bebas dari salah ketik nama tabel atau kolom.",
          ],
          hasilAkhir:
            "Tiga file Kotlin lapisan Room Database yang lolos kompilasi KSP.",
          validasi:
            "Menu Build -> Make Project sukses tanpa error dari room-compiler.",
          rawPrompt: `[TUJUAN]\nMembuat lapisan Room Database lengkap (TaskEntity, TaskDao, dan SakuSiswaDatabase) untuk aplikasi SakuSiswa.\n\n[KONTEKS]\nAplikasi Android SakuSiswa, package id.composelab.sakusiswa.data, menggunakan Room dengan KSP dan Kotlin Flow.\n\n[INSTRUKSI]\n1. Buat TaskEntity.kt (@Entity(tableName = "tasks")) dengan kolom: id (PrimaryKey autoGenerate), userEmail, subject, title, notes, dueDate, dan isCompleted.\n2. Buat TaskDao.kt (@Dao) yang memuat:\n   - @Query("SELECT * FROM tasks WHERE userEmail = :email ORDER BY isCompleted ASC, id DESC") fun getTasksByUser(email: String): Flow<List<TaskEntity>>\n   - @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun insertTask(task: TaskEntity)\n   - @Update suspend fun updateTask(task: TaskEntity)\n   - @Delete suspend fun deleteTask(task: TaskEntity)\n3. Buat SakuSiswaDatabase.kt (@Database(entities = [TaskEntity::class], version = 1, exportSchema = false)) dengan pola Singleton.\n4. Jelaskan mengapa urutan "ORDER BY isCompleted ASC, id DESC" membuat tugas yang belum selesai selalu berada di urutan atas.\n\n[BATASAN]\nGunakan import resmi dari androidx.room.* dan kotlinx.coroutines.flow.Flow.\n\n[HASIL AKHIR]\nKode lengkap TaskEntity.kt, TaskDao.kt, dan SakuSiswaDatabase.kt.\n\n[VALIDASI]\nPastikan saat menekan Build -> Make Project, KSP berhasil men-generate SakuSiswaDatabase_Impl tanpa error.`,
        },
        code_snippets: [
          {
            filename: "TaskEntity.kt",
            language: "kotlin",
            code: `package id.composelab.sakusiswa.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "tasks")
data class TaskEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val userEmail: String,
    val subject: String,
    val title: String,
    val notes: String = "",
    val dueDate: String = "Belum ditentukan",
    val isCompleted: Boolean = false
)`,
          },
          {
            filename: "TaskDao.kt",
            language: "kotlin",
            code: `package id.composelab.sakusiswa.data

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface TaskDao {
    // READ: Mengambil daftar tugas milik email siswa yang login secara real-time
    @Query("SELECT * FROM tasks WHERE userEmail = :email ORDER BY isCompleted ASC, id DESC")
    fun getTasksByUser(email: String): Flow<List<TaskEntity>>

    // CREATE: Menambah tugas baru
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTask(task: TaskEntity)

    // UPDATE: Mengubah isi tugas atau status selesai
    @Update
    suspend fun updateTask(task: TaskEntity)

    // DELETE: Menghapus tugas
    @Delete
    suspend fun deleteTask(task: TaskEntity)
}`,
          },
          {
            filename: "SakuSiswaDatabase.kt",
            language: "kotlin",
            code: `package id.composelab.sakusiswa.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(
    entities = [TaskEntity::class],
    version = 1,
    exportSchema = false
)
abstract class SakuSiswaDatabase : RoomDatabase() {
    abstract fun taskDao(): TaskDao

    companion object {
        @Volatile
        private var INSTANCE: SakuSiswaDatabase? = null

        fun getDatabase(context: Context): SakuSiswaDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    SakuSiswaDatabase::class.java,
                    "sakusiswa_local.db"
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}`,
          },
        ],
        expected_result:
          "Ketiga file lapisan database Room selesai dibuat dan proses Build -> Make Project berhasil tanpa error.",
        validation_check: [
          "TaskEntity, TaskDao, dan SakuSiswaDatabase berada di package data",
          "Build -> Make Project sukses tanpa pesan error SQL dari Room",
        ],
        common_errors: [
          {
            error: "Salah ketik nama tabel di @Query, misalnya menulis 'SELECT * FROM task' padahal tableName = 'tasks'.",
            solution:
              "Keunggulan Room + KSP adalah ia memeriksa kuery SQL saat kompilasi. Samakan persis nama tabel di @Query dengan yang tertulis di @Entity(tableName = \"tasks\").",
          },
        ],
        exercise:
          "Tambahkan 1 fungsi query opsional di TaskDao untuk menghapus semua tugas yang sudah selesai milik satu user: '@Query(\"DELETE FROM tasks WHERE userEmail = :email AND isCompleted = 1\") suspend fun clearCompletedTasks(email: String)'!",
        quiz: [
          {
            question: "Bagaimana cara Room Database mengetahui baris tugas mana yang harus diperbarui saat kita memanggil fungsi @Update updateTask(task: TaskEntity)?",
            options: [
              "Berdasarkan warna kartu di layar",
              "Berdasarkan nilai @PrimaryKey (kolom id) pada objek TaskEntity tersebut",
              "Secara acak",
              "Berdasarkan ukuran layar HP",
            ],
            correctIndex: 1,
            explanation:
              "Anotasi @Update dan @Delete di Room mencocokkan baris di database menggunakan nilai @PrimaryKey (id) dari objek Entity yang dikirimkan.",
          },
        ],
      },
      {
        id: "m5-l3",
        module_id: "modul-5",
        lesson_number: 3,
        title: "Membuat TaskViewModel: Menghubungkan Room Database dengan State UI",
        slug: "membuat-task-viewmodel-room",
        description:
          "Membangun kelas TaskViewModel yang mengamati perubahan userEmail dan aliran data Flow dari TaskDao, serta menyediakan fungsi addTask(), updateTask(), toggleTaskCompleted(), dan deleteTask().",
        estimated_minutes: 55,
        order_index: 3,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu membuat TaskViewModel yang menjembatani operasi CRUD Room Database dengan Jetpack Compose menggunakan StateFlow dan viewModelScope.",
        prerequisites: ["Menyelesaikan Materi 5.2"],
        concept_explanation: `Kita sudah punya database (\`TaskDao\`) dan sudah punya komponen layar (\`TaskItemCard\`, \`TaskFormDialog\`). Sekarang kita buat sang konduktor orkestra di dalam package **\`viewmodel\`**: **\`TaskViewModel.kt\`**!

Apa saja tugas \`TaskViewModel\`?
1. Menyimpan email pengguna yang sedang login (\`_currentUserEmail\`).
2. Menggunakan \`flatMapLatest\` dan \`stateIn\` untuk mengubah \`Flow<List<TaskEntity>>\` dari \`TaskDao\` menjadi **\`StateFlow<List<TaskEntity>>\`** bernama \`tasks\`. Begitu siswa login (atau ganti akun), daftar \`tasks\` otomatis berganti mengikuti email akun tersebut!
3. Menyediakan 4 fungsi CRUD yang sangat bersih untuk dipanggil dari layar:
   - **Create**: \`fun addTask(subject: String, title: String, notes: String, dueDate: String)\`
   - **Read**: variabel \`val tasks: StateFlow<List<TaskEntity>>\`
   - **Update (Isi Tugas)**: \`fun updateTask(task: TaskEntity, subject: String, title: String, notes: String, dueDate: String)\`
   - **Update (Centang Selesai)**: \`fun toggleTaskCompleted(task: TaskEntity)\` -> memakai \`task.copy(isCompleted = !task.isCompleted)\`!
   - **Delete**: \`fun deleteTask(task: TaskEntity)\``,
        preparation: [
          "Buka package 'id.composelab.sakusiswa.viewmodel' di Android Studio",
        ],
        thinking_steps: [
          "Perhatikan fungsi toggleTaskCompleted(task: TaskEntity): mengapa ekspresi '!task.isCompleted' bisa membalik status dari false menjadi true dan sebaliknya?",
          "Mengapa semua panggilan dao.insertTask, dao.updateTask, dan dao.deleteTask di dalam ViewModel dibungkus dengan 'viewModelScope.launch { ... }'?",
        ],
        step_instructions: [
          "Klik kanan pada package 'viewmodel' -> New -> Kotlin Class/File -> buat 'TaskViewModel.kt'.",
          "Tulis kode TaskViewModel beserta ViewModelProvider.Factory agar ViewModel bisa menerima parameter TaskDao.",
          "Perhatikan bagaimana keempat fungsi CRUD (addTask, updateTask, toggleTaskCompleted, deleteTask) ditulis kurang dari 10 baris per fungsi.",
        ],
        antigravity_prompt: {
          tujuan:
            "Membuat TaskViewModel.kt lengkap dengan operasi CRUD Room Database dan ViewModelFactory.",
          konteks:
            "Package id.composelab.sakusiswa.viewmodel menggunakan AndroidX Lifecycle ViewModel, StateFlow, dan TaskDao.",
          instruksi: [
            "Buat class TaskViewModel(private val taskDao: TaskDao) : ViewModel().",
            "Gunakan MutableStateFlow untuk menyimpan email user aktif dan hubungkan ke taskDao.getTasksByUser(email) menggunakan flatMapLatest dan stateIn.",
            "Implementasikan fungsi setUserEmail, addTask, updateTask, toggleTaskCompleted, dan deleteTask di dalam viewModelScope.launch.",
            "Sediakan companion object Factory agar TaskViewModel dapat diinstansiasi di MainActivity.",
          ],
          batasan: [
            "Tambahkan @OptIn(ExperimentalCoroutinesApi::class) untuk penggunaan flatMapLatest.",
          ],
          hasilAkhir:
            "File TaskViewModel.kt yang bersih dan bebas memory leak.",
          validasi:
            "Semua fungsi CRUD di TaskViewModel terkompilasi tanpa error.",
          rawPrompt: `[TUJUAN]\nMembuat TaskViewModel.kt untuk mengelola state dan operasi CRUD Room Database pada aplikasi SakuSiswa.\n\n[KONTEKS]\nAplikasi Android SakuSiswa, package id.composelab.sakusiswa.viewmodel, menggunakan ViewModel, viewModelScope, StateFlow, dan TaskDao.\n\n[INSTRUKSI]\n1. Buat class TaskViewModel(private val taskDao: TaskDao) : ViewModel().\n2. Buat variabel _userEmail = MutableStateFlow("") dan hubungkan dengan taskDao.getTasksByUser(email) menjadi val tasks: StateFlow<List<TaskEntity>> menggunakan flatMapLatest dan stateIn.\n3. Buat fungsi CRUD:\n   - addTask(subject, title, notes, dueDate)\n   - updateTask(task, newSubject, newTitle, newNotes, newDueDate)\n   - toggleTaskCompleted(task)\n   - deleteTask(task)\n4. Buat TaskViewModelFactory untuk menyuntikkan TaskDao ke dalam TaskViewModel.\n5. Jelaskan cara kerja fungsi toggleTaskCompleted yang memanfaatkan task.copy(isCompleted = !task.isCompleted).\n\n[BATASAN]\nPastikan kode aman dan menggunakan viewModelScope.launch untuk setiap operasi tulis database.\n\n[HASIL AKHIR]\nKode lengkap TaskViewModel.kt beserta penjelasan setiap fungsi CRUD.\n\n[VALIDASI]\nPastikan tidak ada error import pada kotlinx.coroutines.flow.*. `,
        },
        code_snippets: [
          {
            filename: "TaskViewModel.kt",
            language: "kotlin",
            code: `package id.composelab.sakusiswa.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import id.composelab.sakusiswa.data.TaskDao
import id.composelab.sakusiswa.data.TaskEntity
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

@OptIn(ExperimentalCoroutinesApi::class)
class TaskViewModel(private val taskDao: TaskDao) : ViewModel() {

    private val _userEmail = MutableStateFlow("")

    val tasks: StateFlow<List<TaskEntity>> = _userEmail
        .flatMapLatest { email ->
            if (email.isBlank()) flowOf(emptyList())
            else taskDao.getTasksByUser(email)
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    fun setUserEmail(email: String) {
        _userEmail.value = email
    }

    // CREATE
    fun addTask(subject: String, title: String, notes: String, dueDate: String) {
        val email = _userEmail.value
        if (email.isBlank() || title.isBlank()) return
        viewModelScope.launch {
            taskDao.insertTask(
                TaskEntity(
                    userEmail = email,
                    subject = subject,
                    title = title,
                    notes = notes,
                    dueDate = dueDate,
                    isCompleted = false
                )
            )
        }
    }

    // UPDATE (Edit isi tugas)
    fun updateTask(
        task: TaskEntity,
        newSubject: String,
        newTitle: String,
        newNotes: String,
        newDueDate: String
    ) {
        viewModelScope.launch {
            taskDao.updateTask(
                task.copy(
                    subject = newSubject,
                    title = newTitle,
                    notes = newNotes,
                    dueDate = newDueDate
                )
            )
        }
    }

    // UPDATE (Toggle status selesai/belum)
    fun toggleTaskCompleted(task: TaskEntity) {
        viewModelScope.launch {
            taskDao.updateTask(task.copy(isCompleted = !task.isCompleted))
        }
    }

    // DELETE
    fun deleteTask(task: TaskEntity) {
        viewModelScope.launch {
            taskDao.deleteTask(task)
        }
    }

    companion object {
        fun provideFactory(taskDao: TaskDao): ViewModelProvider.Factory =
            object : ViewModelProvider.Factory {
                @Suppress("UNCHECKED_CAST")
                override fun <T : ViewModel> create(modelClass: Class<T>): T {
                    return TaskViewModel(taskDao) as T
                }
            }
    }
}`,
          },
        ],
        expected_result:
          "File TaskViewModel.kt selesai dibuat dan menyediakan seluruh operasi CRUD (Create, Read, Update, Delete) secara reaktif.",
        validation_check: [
          "Keempat operasi CRUD (addTask, tasks StateFlow, updateTask/toggleTaskCompleted, deleteTask) sudah lengkap di dalam TaskViewModel",
        ],
        common_errors: [
          {
            error: "Lupa memanggil viewModel.setUserEmail(user.email) setelah pengguna berhasil login, sehingga daftar tugas selalu kosong.",
            solution:
              "Pastikan begitu pengguna berhasil login (atau sesi ditemukan), email pengguna dikirimkan ke viewModel.setUserEmail(user.email).",
          },
        ],
        exercise:
          "Jelaskan apa yang terjadi pada aliran data 'val tasks: StateFlow<List<TaskEntity>>' ketika fungsi 'setUserEmail(\"siswa2@gmail.com\")' dipanggil!",
        quiz: [
          {
            question: "Coroutine scope manakah yang digunakan di dalam kelas ViewModel untuk menjalankan fungsi suspend DAO secara aman?",
            options: [
              "GlobalScope",
              "viewModelScope",
              "MainScope",
              "Thread.sleep",
            ],
            correctIndex: 1,
            explanation:
              "viewModelScope terikat otomatis dengan siklus hidup ViewModel dan akan membatalkan pekerjaan yang sedang berjalan jika ViewModel dihancurkan, sehingga mencegah kebocoran memori (memory leak).",
          },
        ],
      },
      {
        id: "m5-l4",
        module_id: "modul-5",
        lesson_number: 4,
        title: "Menyatukan Seluruh Aplikasi: HomeScreen CRUD Lengkap & MainActivity",
        slug: "menyatukan-homescreen-crud-dan-mainactivity",
        description:
          "Merakit HomeScreen.kt yang menghubungkan TaskViewModel, pencarian, filter status, dialog Tambah/Edit/Hapus, serta menghubungkan LoginScreen dan HomeScreen di dalam MainActivity.kt.",
        estimated_minutes: 55,
        order_index: 4,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa berhasil merakit aplikasi SakuSiswa yang utuh (Login Google -> Tambah Tugas -> Lihat & Cari Tugas -> Edit Tugas -> Centang Selesai -> Hapus Tugas -> Logout) dan menjalankannya di perangkat.",
        prerequisites: ["Menyelesaikan Materi 5.1 s/d 5.3"],
        concept_explanation: `Inilah momen puncak pelatihan! Seluruh kepingan puzzle yang sudah kita rancang secara terstruktur sejak Modul 1 kini kita satukan:

1. **\`HomeScreen.kt\`**:
   - Mengambil daftar tugas terbaru dari \`TaskViewModel\` dengan \`val tasks by viewModel.tasks.collectAsState()\`.
   - Menyediakan kotak pencarian (\`searchQuery\`) dan 3 \`FilterChip\` (*Semua*, *Aktif*, *Selesai*).
   - Mengelola 3 state dialog:
     - \`showAddDialog\` (Boolean) -> membuka \`TaskFormDialog\` untuk **Create**.
     - \`taskToEdit\` (\`TaskEntity?\`) -> membuka \`TaskFormDialog\` terisi data lama untuk **Update**.
     - \`taskToDelete\` (\`TaskEntity?\`) -> membuka \`AlertDialog\` konfirmasi untuk **Delete**.
2. **\`MainActivity.kt\`**:
   - Menginisialisasi \`SakuSiswaDatabase\`, \`TaskViewModel\`, dan \`GoogleAuthManager\`.
   - Mengecek apakah ada sesi login yang tersimpan: jika belum ada tampilkan \`LoginScreen\`, jika sudah ada tampilkan \`HomeScreen\`!`,
        preparation: [
          "Pastikan GoogleAuthManager, TaskEntity, TaskDao, SakuSiswaDatabase, TaskViewModel, StudentHeaderCard, TaskItemCard, dan TaskFormDialog sudah ada",
        ],
        thinking_steps: [
          "Bagaimana satu komponen TaskFormDialog yang sama bisa kita pakai untuk Tambah Tugas Baru sekaligus Edit Tugas Lama?",
          "Mengapa kita menggunakan collectAsState() saat membaca viewModel.tasks di dalam fungsi @Composable HomeScreen?",
        ],
        step_instructions: [
          "Buat file 'HomeScreen.kt' di dalam package 'ui' dan salin/ketik struktur lengkapnya.",
          "Buka 'MainActivity.kt' dan hubungkan alur pergantian antara LoginScreen dan HomeScreen berdasarkan state 'currentUser'.",
          "Masukkan WEB_CLIENT_ID dari Google Cloud Console pada konstanta di MainActivity.kt.",
          "Tekan tombol Run (▶) dan uji seluruh fitur: Login -> Tambah 3 Tugas -> Cari Tugas -> Edit Judul -> Centang Selesai -> Hapus 1 Tugas -> Tutup Aplikasi & Buka Lagi!",
        ],
        antigravity_prompt: {
          tujuan:
            "Merakit HomeScreen.kt dan MainActivity.kt yang menyatukan Login Google, Room Database, dan seluruh operasi CRUD SakuSiswa.",
          konteks:
            "Proyek Android SakuSiswa (id.composelab.sakusiswa) dengan Kotlin, Jetpack Compose Material 3, Room, dan Credential Manager.",
          instruksi: [
            "Buat HomeScreen.kt yang menampilkan TopAppBar, StudentHeaderCard, OutlinedTextField pencarian, FilterChip status, LazyColumn daftar TaskItemCard, dan ExtendedFloatingActionButton.",
            "Hubungkan dialog tambah tugas (showAddDialog), dialog edit tugas (taskToEdit), dan dialog konfirmasi hapus (taskToDelete) di dalam HomeScreen.kt.",
            "Perbarui MainActivity.kt untuk memeriksa sesi GoogleAuthManager dan mengarahkan pengguna antara LoginScreen dan HomeScreen.",
          ],
          batasan: [
            "Pastikan seluruh fitur CRUD (Create, Read, Update, Delete) dapat diakses langsung dari layar HomeScreen.",
          ],
          hasilAkhir:
            "Kode lengkap HomeScreen.kt dan MainActivity.kt yang siap dijalankan di HP/Emulator.",
          validasi:
            "Data tugas tetap tersimpan di Room Database meskipun aplikasi ditutup paksa dan dibuka kembali.",
          rawPrompt: `[TUJUAN]\nMenyatukan seluruh komponen ke dalam HomeScreen.kt dan MainActivity.kt sehingga aplikasi SakuSiswa berfungsi penuh.\n\n[KONTEKS]\nAplikasi Android SakuSiswa (package id.composelab.sakusiswa) dengan GoogleAuthManager, SakuSiswaDatabase, TaskViewModel, StudentHeaderCard, TaskItemCard, dan TaskFormDialog.\n\n[INSTRUKSI]\n1. Buat HomeScreen.kt yang membaca viewModel.tasks.collectAsState(), menyediakan pencarian judul/mapel, FilterChip (Semua, Belum Selesai, Selesai), dan menampilkan daftar tugas di LazyColumn.\n2. Hubungkan aksi klik tombol "+ Tugas Baru" ke TaskFormDialog (Create), tombol Edit di kartu ke TaskFormDialog (Update), Checkbox ke viewModel.toggleTaskCompleted (Update), dan tombol Delete ke AlertDialog konfirmasi hapus (Delete).\n3. Buat MainActivity.kt yang mengelola state currentUser (SignedInUser?), memanggil viewModel.setUserEmail(), dan menampilkan LoginScreen jika currentUser == null atau HomeScreen jika sudah login.\n\n[BATASAN]\nPastikan kode bersih, lengkap dengan seluruh import yang dibutuhkan.\n\n[HASIL AKHIR]\nKode utuh HomeScreen.kt dan MainActivity.kt.\n\n[VALIDASI]\nBerikan daftar 5 langkah pengujian (checklist) untuk memastikan Login Google dan CRUD Room berjalan sempurna.`,
        },
        code_snippets: [
          {
            filename: "HomeScreen.kt",
            language: "kotlin",
            code: `package id.composelab.sakusiswa.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import id.composelab.sakusiswa.data.SignedInUser
import id.composelab.sakusiswa.data.TaskEntity
import id.composelab.sakusiswa.viewmodel.TaskViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    user: SignedInUser,
    viewModel: TaskViewModel,
    onSignOut: () -> Unit
) {
    val tasks by viewModel.tasks.collectAsState()
    var searchQuery by remember { mutableStateOf("") }
    var filterMode by remember { mutableStateOf("ALL") } // ALL, PENDING, DONE

    var showAddDialog by remember { mutableStateOf(false) }
    var taskToEdit by remember { mutableStateOf<TaskEntity?>(null) }
    var taskToDelete by remember { mutableStateOf<TaskEntity?>(null) }

    val filteredTasks = remember(tasks, searchQuery, filterMode) {
        tasks.filter { task ->
            val matchFilter = when (filterMode) {
                "PENDING" -> !task.isCompleted
                "DONE" -> task.isCompleted
                else -> true
            }
            val q = searchQuery.trim()
            val matchSearch = q.isEmpty() ||
                task.title.contains(q, ignoreCase = true) ||
                task.subject.contains(q, ignoreCase = true)
            matchFilter && matchSearch
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("SakuSiswa") },
                actions = {
                    TextButton(onClick = onSignOut) {
                        Text("Keluar")
                    }
                }
            )
        },
        floatingActionButton = {
            ExtendedFloatingActionButton(
                onClick = { showAddDialog = true },
                icon = { Icon(Icons.Default.Add, contentDescription = null) },
                text = { Text("Tugas Baru") }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 16.dp)
        ) {
            StudentHeaderCard(
                studentName = user.displayName,
                studentEmail = user.email,
                pendingCount = tasks.count { !it.isCompleted },
                completedCount = tasks.count { it.isCompleted }
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                placeholder = { Text("Cari judul tugas atau mata pelajaran...") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(8.dp))

            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(
                    selected = filterMode == "ALL",
                    onClick = { filterMode = "ALL" },
                    label = { Text("Semua (\${tasks.size})") }
                )
                FilterChip(
                    selected = filterMode == "PENDING",
                    onClick = { filterMode = "PENDING" },
                    label = { Text("Aktif (\${tasks.count { !it.isCompleted }})") }
                )
                FilterChip(
                    selected = filterMode == "DONE",
                    onClick = { filterMode = "DONE" },
                    label = { Text("Selesai (\${tasks.count { it.isCompleted }})") }
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            if (filteredTasks.isEmpty()) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Belum ada tugas. Tekan tombol + Tugas Baru di kanan bawah!")
                }
            } else {
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(10.dp),
                    contentPadding = PaddingValues(bottom = 88.dp)
                ) {
                    items(items = filteredTasks, key = { it.id }) { task ->
                        TaskItemCard(
                            subject = task.subject,
                            title = task.title,
                            notes = task.notes,
                            dueDate = task.dueDate,
                            isCompleted = task.isCompleted,
                            onToggleComplete = { viewModel.toggleTaskCompleted(task) },
                            onEditClick = { taskToEdit = task },
                            onDeleteClick = { taskToDelete = task }
                        )
                    }
                }
            }
        }
    }

    if (showAddDialog) {
        TaskFormDialog(
            dialogTitle = "Tambah Tugas Baru",
            onDismiss = { showAddDialog = false },
            onConfirm = { subject, title, notes, dueDate ->
                viewModel.addTask(subject, title, notes, dueDate)
                showAddDialog = false
            }
        )
    }

    taskToEdit?.let { editing ->
        TaskFormDialog(
            dialogTitle = "Edit Tugas",
            initialSubject = editing.subject,
            initialTitle = editing.title,
            initialNotes = editing.notes,
            initialDueDate = editing.dueDate,
            onDismiss = { taskToEdit = null },
            onConfirm = { subject, title, notes, dueDate ->
                viewModel.updateTask(editing, subject, title, notes, dueDate)
                taskToEdit = null
            }
        )
    }

    taskToDelete?.let { deleting ->
        AlertDialog(
            onDismissRequest = { taskToDelete = null },
            title = { Text("Hapus Tugas?") },
            text = { Text("Yakin ingin menghapus tugas \\"\${deleting.title}\\"?") },
            confirmButton = {
                Button(
                    onClick = {
                        viewModel.deleteTask(deleting)
                        taskToDelete = null
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.error
                    )
                ) {
                    Text("Hapus")
                }
            },
            dismissButton = {
                TextButton(onClick = { taskToDelete = null }) {
                    Text("Batal")
                }
            }
        )
    }
}`,
          },
        ],
        expected_result:
          "Aplikasi SakuSiswa berjalan secara utuh dengan fitur Login Google, Room Database lokal, dan keempat operasi CRUD (Create, Read, Update, Delete).",
        validation_check: [
          "Dapat menambah tugas baru dan langsung muncul di daftar",
          "Dapat mengubah judul/mata pelajaran tugas serta mencentang selesai",
          "Dapat menghapus tugas dengan dialog konfirmasi",
          "Data tetap ada saat aplikasi ditutup dan dibuka kembali",
        ],
        common_errors: [
          {
            error: "Dialog Tambah atau Edit tidak mau tertutup setelah tombol Simpan ditekan.",
            solution:
              "Pastikan di dalam blok onConfirm = { ... }, kamu mengatur kembali state 'showAddDialog = false' atau 'taskToEdit = null' setelah memanggil fungsi ViewModel.",
          },
        ],
        exercise:
          "Tambahkan minimal 3 tugas sekolah aslimu minggu ini ke dalam aplikasi SakuSiswa, lalu coba cari salah satu tugas menggunakan kotak pencarian!",
        quiz: [
          {
            question: "Fungsi apakah yang dipakai di dalam @Composable HomeScreen untuk mengamati perubahan StateFlow<List<TaskEntity>> dari TaskViewModel?",
            options: [
              ".collectAsState()",
              ".toString()",
              ".finish()",
              ".clear()",
            ],
            correctIndex: 0,
            explanation:
              "collectAsState() mengubah aliran StateFlow dari ViewModel menjadi Compose State sehingga setiap kali data di Room Database berubah, layar otomatis melakukan Recomposition.",
          },
        ],
      },
    ],
  },

  // =========================================================================
  // MODUL 6 (HARI 3): DEBUGGING LOGCAT, BUILD APK, GITHUB & PENGUMPULAN KARYA
  // =========================================================================
  {
    id: "modul-6",
    course_id: "course-android-compose-smkn1",
    module_number: 6,
    title: "Debugging di Logcat, Kustomisasi Mandiri, Build APK & Pengumpulan Karya",
    slug: "modul-6-debugging-build-apk-dan-pengumpulan-karya",
    description:
      "Tahap akhir: pengerjaan karya mandiri: melatih keterampilan membaca pesan error di Logcat dan Build Output, mempercantik fitur SakuSiswa dengan kreasi sendiri, membuat file APK, mengunggah kode ke GitHub, dan mengumpulkan karya.",
    estimated_minutes: 210,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 6,
    created_at: new Date().toISOString(),
    lessons: [
      {
        id: "m6-l1",
        module_id: "modul-6",
        lesson_number: 1,
        title: "Seni Debugging Android: Membaca Logcat, Stacktrace & Bertanya Error ke AI",
        slug: "seni-debugging-android-logcat",
        description:
          "Tidak panik saat aplikasi error atau Force Close: memahami perbedaan Compile-Time Error (Build Output) vs Runtime Crash (Logcat), cara menyaring tag package:mine level:error, dan cara menyalin pesan error yang tepat ke AI.",
        estimated_minutes: 50,
        order_index: 1,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu menemukan baris kode penyebab crash menggunakan panel Logcat di Android Studio dan menyusun prompt debugging yang akurat kepada AI.",
        prerequisites: ["Menyelesaikan Modul 1 s/d 5"],
        concept_explanation: `Seorang Software Engineer profesional tidak diukur dari "tidak pernah mengalami error", melainkan dari **ketenangan dan ketepatannya membaca petunjuk error (Debugging)**.

Di Android Studio, ada **2 Jenis Error Utama**:
1. **Compile-Time Error (Muncul saat Build / sebelum aplikasi terbuka)**:
   - Dilihat di tab **Build** (bagian bawah).
   - Penyebab umum: Salah ketik nama variabel (\`Unresolved reference\`), lupa import, tipe data tidak cocok (\`Type mismatch\`), atau salah tulis kuery SQL di \`@Query\` Room.
2. **Runtime Error / Force Close (Aplikasi tiba-tiba keluar saat dijalankan)**:
   - Dilihat di tab **Logcat** (ikon kucing di bagian bawah Android Studio).
   - Ketik filter **\`package:mine level:error\`** di kotak pencarian Logcat agar hanya error dari aplikasimu yang tampil berwarna merah!
   - Cari baris bertuliskan **\`Caused by:\`** diikuti tautan biru nama file dan nomor barismu, misalnya \`at id.composelab.sakusiswa.ui.HomeScreenKt(HomeScreen.kt:45)\`. Klik tautan biru itu, dan kursor akan langsung melompat ke baris yang rusak!

**Cara Bijak Bertanya Error ke AI**:
Jangan pernah hanya mengetik *"Kak AI, aplikasiku keluar sendiri, kenapa ya?"*. Salin **1) Pesan \`Caused by:\` dari Logcat**, **2) Potongan fungsi tempat baris error itu berada**, dan minta AI menjelaskan *mengapa* error itu terjadi sebelum memberikan solusinya!`,
        preparation: [
          "Buka panel Logcat di bagian bawah Android Studio",
          "Ketik 'package:mine level:error' pada bilah filter Logcat",
        ],
        thinking_steps: [
          "Apa bedanya error yang muncul di tab 'Build' dengan error yang muncul di tab 'Logcat'?",
          "Mengapa baris 'Caused by: ...' dan nomor baris file (misal HomeScreen.kt:45) di Logcat adalah informasi paling berharga saat melakukan debugging?",
        ],
        step_instructions: [
          "Buka tab Logcat di Android Studio saat aplikasimu sedang berjalan di HP atau Emulator.",
          "Pada kotak filter Logcat, ketik 'package:mine' untuk menyaring log khusus dari aplikasi SakuSiswa milikmu.",
          "Tambahkan 'Log.d(\"SakuSiswaDebug\", \"Jumlah tugas dimuat: ${tasks.size}\")' di dalam kode untuk berlatih mencetak pesan pantauan sendiri.",
          "Pelajari format Prompt Debugging Terstruktur pada kartu prompt di bawah ini.",
        ],
        antigravity_prompt: {
          tujuan:
            "Menganalisis pesan error dari Build Output atau Logcat Android Studio secara sistematis bersama AI.",
          konteks:
            "Debugging aplikasi Android SakuSiswa (Kotlin, Jetpack Compose, Room Database, Credential Manager).",
          instruksi: [
            "Analisis pesan error / stacktrace 'Caused by:' yang saya lampirkan.",
            "Jelaskan dengan bahasa sederhana untuk siswa apa akar penyebab (root cause) dari error tersebut.",
            "Tunjukkan baris mana yang harus diperbaiki dan bagaimana cara mencegah error serupa di kemudian hari.",
          ],
          batasan: [
            "Jangan mengubah keseluruhan arsitektur file jika error hanya disebabkan oleh satu bagian kecil.",
          ],
          hasilAkhir:
            "Penjelasan akar masalah error dan perbaikan kode yang tepat sasaran.",
          validasi:
            "Error merah di Logcat atau Build Output hilang setelah perbaikan diterapkan.",
          rawPrompt: `[TUJUAN]\nMendiagnosis dan memperbaiki error pada aplikasi Android SakuSiswa berdasarkan pesan Logcat / Build Output.\n\n[KONTEKS]\nProyek Android SakuSiswa (Kotlin, Jetpack Compose, Room Database KSP, Credential Manager).\nBerikut adalah pesan error dari Logcat / Build Output saya:\n"""\n(Tempel baris Caused by: atau pesan error merah di sini)\n"""\nDan berikut adalah potongan kode pada file yang ditunjuk oleh error tersebut:\n"""\n(Tempel 15-30 baris kode di sekitar nomor baris yang error)\n"""\n\n[INSTRUKSI]\n1. Jelaskan terlebih dahulu MENGAPA error ini terjadi dengan bahasa yang mudah dipahami siswa SMK.\n2. Tunjukkan baris mana yang menjadi penyebab utamanya.\n3. Berikan kode perbaikan untuk bagian tersebut.\n\n[BATASAN]\nJangan mengubah nama fungsi atau variabel lain yang sudah berjalan normal.\n\n[HASIL AKHIR]\nPenjelasan penyebab bug dan potongan kode perbaikan.\n\n[VALIDASI]\nSebutkan bagaimana cara saya menguji bahwa bug ini sudah benar-benar sembuh.`,
        },
        code_snippets: [
          {
            filename: "Panduan-Filter-Logcat.txt",
            language: "yaml",
            code: `# Filter Penting di Kotak Pencarian Logcat Android Studio:
1. Menampilkan hanya error dari aplikasi kita sendiri:
   package:mine level:error

2. Menampilkan log debug khusus yang kita pasang dengan Log.d("SakuSiswaDebug", "..."):
   package:mine tag:SakuSiswaDebug

# 3 Error Paling Sering & Artinya:
- NullPointerException        : Mencoba memanggil data yang bernilai null (kosong).
- IllegalStateException (Room): Mengubah kolom @Entity setelah aplikasi pernah di-install tanpa menaikkan version database / uninstall aplikasi lama di HP.
- GetCredentialException      : Konfigurasi SHA-1 atau Web Client ID Google belum cocok, atau HP belum login akun Google.`,
          },
        ],
        expected_result:
          "Siswa terampil menggunakan filter Logcat (package:mine level:error) dan tahu cara mengatasi perubahan skema Room Database maupun error runtime lainnya.",
        validation_check: [
          "Dapat menggunakan filter package:mine level:error di Logcat",
          "Mengetahui bahwa jika menambah/mengubah kolom di @Entity TaskEntity, aplikasi lama di HP cukup di-uninstall lalu di-Run ulang (atau menaikkan version di @Database)",
        ],
        common_errors: [
          {
            error: "Aplikasi langsung Force Close setelah siswa menambahkan kolom baru di TaskEntity.kt dengan pesan 'Room cannot verify the data integrity'.",
            solution:
              "Karena tabel di HP sudah telanjur dibuat dengan struktur lama, uninstall dulu aplikasi SakuSiswa dari HP/Emulator (atau naikkan angka version = 2 pada @Database di SakuSiswaDatabase.kt), lalu klik Run lagi!",
          },
        ],
        exercise:
          "Buka Logcat, ketik filter 'package:mine', lalu coba tambahkan 1 tugas baru di aplikasi dan amati aktivitas log yang muncul!",
        quiz: [
          {
            question: "Apa yang harus kamu lakukan jika aplikasi Force Close dengan pesan 'Room cannot verify the data integrity' setelah kamu mengubah kolom di TaskEntity.kt?",
            options: [
              "Membeli HP baru",
              "Meng-uninstall aplikasi SakuSiswa lama di HP/Emulator (atau menaikkan angka version di @Database) lalu klik Run kembali",
              "Menghapus Android Studio",
              "Mematikan Wi-Fi",
            ],
            correctIndex: 1,
            explanation:
              "Room memeriksa kecocokan skema tabel. Saat masa pengembangan, meng-uninstall aplikasi lama di HP atau menaikkan version database (karena kita sudah memakai fallbackToDestructiveMigration) akan membuat ulang tabel dengan struktur baru.",
          },
        ],
      },
      {
        id: "m6-l2",
        module_id: "modul-6",
        lesson_number: 2,
        title: "Eksplorasi & Kreasi Mandiri: Menambahkan Fitur Pembeda Karya",
        slug: "eksplorasi-dan-kreasi-mandiri-sakusiswa",
        description:
          "Saatnya membuat aplikasi SakuSiswa milikmu unik! Menambahkan minimal 1 fitur kreasi mandiri (seperti Tingkat Prioritas Tugas, Kategori Warna Mata Pelajaran, atau Progress Bar Persentase Selesai) menggunakan alur berpikir terstruktur.",
        estimated_minutes: 60,
        order_index: 2,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu merancang dan mengimplementasikan minimal 1 fitur tambahan pada aplikasi SakuSiswa secara mandiri dengan bantuan diskusi AI terstruktur.",
        prerequisites: ["Aplikasi inti SakuSiswa sudah berjalan lancar"],
        concept_explanation: `Di tahap akhir ini, setiap siswa memiliki proyek **SakuSiswa** yang sudah memenuhi syarat utama: **Login Google + Room Database Lokal + CRUD Lengkap**. Agar karyamu meraih nilai terbaik dan mencerminkan kreativitasmu sendiri, pilih **minimal 1 fitur pengayaan** berikut untuk kamu tambahkan:

1. **Ide 1 — Progress Bar Penyelesaian Tugas di Header**:
   Menampilkan \`LinearProgressIndicator\` di dalam \`StudentHeaderCard\` yang menunjukkan persentase tugas yang sudah selesai (misal: \`Selesai 3 dari 4 tugas (75%)\`).
2. **Ide 2 — Label Prioritas Tugas (Tinggi / Sedang / Santai)**:
   Menambahkan pilihan prioritas pada \`TaskEntity\` dan \`TaskFormDialog\`, lalu memberi warna badge berbeda di \`TaskItemCard\` (Merah untuk Tinggi, Kuning untuk Sedang, Hijau untuk Santai).
3. **Ide 3 — Tombol "Bersihkan Tugas Selesai"**:
   Menambahkan tombol di \`TopAppBar\` untuk menghapus seluruh tugas yang sudah dicentang selesai sekaligus dengan konfirmasi.
4. **Ide 4 — Kustomisasi Palet Warna Tema Sekolah / Pribadi**:
   Mengubah skema warna Material 3 di \`ui/theme/Color.kt\` dan \`Theme.kt\` sesuai identitas desain pilihanmu.`,
        preparation: [
          "Pilih 1 atau 2 ide fitur tambahan yang paling kamu sukai",
          "Tulis dulu rancangan perubahannya di catatan (file mana saja yang akan disentuh)",
        ],
        thinking_steps: [
          "Jika kamu memilih menambahkan kolom 'priority: String' pada TaskEntity, file apa saja yang ikut perlu disesuaikan secara berurutan (Entity -> ViewModel -> FormDialog -> ItemCard)?",
          "Bagaimana cara menghitung persentase tugas selesai (0f sampai 1f) dengan aman tanpa terkena error pembagian dengan nol (Divide by Zero) saat total tugas masih 0?",
        ],
        step_instructions: [
          "Pilih 1 fitur tambahan dan tuliskan alur Input-Proses-Output-nya di catatanmu.",
          "Susun prompt 6-bagianmu sendiri untuk berdiskusi dengan AI mengenai cara menambahkan fitur tersebut.",
          "Terapkan kodenya bertahap dari lapisan data -> viewmodel -> ui.",
          "Uji fitur barumu di HP/Emulator dan pastikan fitur lama (Login & CRUD) tetap berjalan lancar!",
        ],
        antigravity_prompt: {
          tujuan:
            "Menambahkan indikator progress bar persentase penyelesaian tugas dan badge prioritas pada aplikasi SakuSiswa.",
          konteks:
            "Aplikasi Android SakuSiswa yang sudah memiliki StudentHeaderCard, TaskEntity, TaskViewModel, dan TaskItemCard.",
          instruksi: [
            "Tunjukkan cara menghitung nilai progress (Float antara 0f sampai 1f) secara aman ketika total tugas = 0 maupun > 0.",
            "Tambahkan komponen LinearProgressIndicator Material 3 beserta teks persentase di dalam StudentHeaderCard.",
            "Jelaskan langkah-langkah jika saya juga ingin menambahkan kolom 'priority' (Tinggi, Sedang, Rendah) mulai dari TaskEntity hingga TaskItemCard.",
          ],
          batasan: [
            "Jangan merusak fungsi CRUD yang sudah berjalan.",
          ],
          hasilAkhir:
            "Kode peningkatan fitur StudentHeaderCard dan panduan penambahan kolom prioritas.",
          validasi:
            "Progress bar bergerak naik secara otomatis saat tugas dicentang selesai.",
          rawPrompt: `[TUJUAN]\nMenambahkan fitur Progress Bar persentase ketuntasan tugas pada StudentHeaderCard di aplikasi SakuSiswa.\n\n[KONTEKS]\nKomponen StudentHeaderCard(studentName, studentEmail, pendingCount, completedCount) pada proyek Android Jetpack Compose Material 3.\n\n[INSTRUKSI]\n1. Hitung total tugas (val total = pendingCount + completedCount) dan rasio progress (val progress = if (total > 0) completedCount.toFloat() / total else 0f).\n2. Tampilkan LinearProgressIndicator(progress = { progress }) dan teks persentase "\${(progress * 100).toInt()}% tugas tuntas" di bawah kotak statistik.\n3. Jelaskan mengapa kita wajib memeriksa "if (total > 0)" sebelum melakukan pembagian.\n\n[BATASAN]\nTetap gunakan komponen resmi Material 3.\n\n[HASIL AKHIR]\nKode StudentHeaderCard.kt yang sudah dilengkapi Progress Bar ketuntasan.\n\n[VALIDASI]\nPastikan aplikasi tidak error saat daftar tugas masih kosong (0 tugas).`,
        },
        code_snippets: [
          {
            filename: "RumusProgressAman.kt",
            language: "kotlin",
            code: `val totalTasks = pendingCount + completedCount
val completionRatio: Float = if (totalTasks > 0) {
    completedCount.toFloat() / totalTasks.toFloat()
} else {
    0f
}
val percentageText = "\${(completionRatio * 100).toInt()}% Tugas Selesai"

Spacer(modifier = Modifier.height(12.dp))
Text(text = percentageText, style = MaterialTheme.typography.labelMedium)
Spacer(modifier = Modifier.height(4.dp))
LinearProgressIndicator(
    progress = { completionRatio },
    modifier = Modifier
        .fillMaxWidth()
        .height(8.dp)
)`,
          },
        ],
        expected_result:
          "Aplikasi SakuSiswa milik siswa memiliki fitur pembeda hasil kreasi dan pemikiran terstruktur sendiri.",
        validation_check: [
          "Minimal 1 fitur kreasi tambahan berfungsi dengan baik",
          "Siswa dapat menjelaskan alur kode fitur tambahan tersebut kepada guru/fasilitator",
        ],
        common_errors: [
          {
            error: "Langsung membagi completedCount / totalTasks tanpa mengecek apakah totalTasks == 0.",
            solution:
              "Selalu gunakan percabangan 'if (totalTasks > 0) ... else 0f' agar tidak menghasilkan nilai NaN (Not a Number) ketika daftar tugas masih kosong.",
          },
        ],
        exercise:
          "Ubah juga warna utama di ui/theme/Color.kt agar tampilan SakuSiswa milikmu memiliki karakter warna khasmu sendiri!",
        quiz: [
          {
            question: "Mengapa kita perlu memeriksa 'if (totalTasks > 0)' sebelum menghitung 'completedCount.toFloat() / totalTasks'?",
            options: [
              "Untuk mencegah hasil pembagian 0/0 (NaN) ketika pengguna baru pertama kali masuk dan belum memiliki tugas",
              "Supaya ukuran huruf menjadi lebih besar",
              "Karena Kotlin tidak bisa menghitung pembagian",
              "Agar koneksi internet lebih cepat",
            ],
            correctIndex: 0,
            explanation:
              "Membagi 0.0f dengan 0.0f di floating-point menghasilkan NaN (Not a Number) yang dapat membuat komponen grafik/progress bar gagal digambar.",
          },
        ],
      },
      {
        id: "m6-l3",
        module_id: "modul-6",
        lesson_number: 3,
        title: "Build File APK Android & Mengunggah Proyek ke Repository GitHub",
        slug: "build-apk-dan-push-github",
        description:
          "Merakit kode menjadi file installer Android (.apk) yang bisa dipasang di HP tanpa kabel, serta mengunggah seluruh source code proyek SakuSiswa ke repository publik GitHub menggunakan Git.",
        estimated_minutes: 50,
        order_index: 3,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa berhasil menghasilkan file app-debug.apk dan mengunggah seluruh proyek SakuSiswa ke repository GitHub publik miliknya.",
        prerequisites: ["Memiliki akun GitHub dan Git sudah terpasang di laptop"],
        concept_explanation: `Setelah aplikasi SakuSiswa selesai diuji, ada 2 hasil karya fisik yang wajib kamu siapkan:

1. **File Installer Android (\`app-debug.apk\`)**:
   - Dibuat melalui menu **\`Build -> Build Bundle(s) / APK(s) -> Build APK(s)\`** di Android Studio.
   - Setelah selesai, klik tautan **\`locate\`** pada notifikasi yang muncul di pojok kanan bawah. Kamu akan menemukan file \`app-debug.apk\` di dalam folder \`app/build/outputs/apk/debug/\`.
   - File \`.apk\` ini bisa kamu unggah ke **GitHub Releases** atau **Google Drive** agar guru maupun temanmu bisa mencobanya!
2. **Repository GitHub Publik**:
   - Tempat menyimpan seluruh kode sumber (*source code*) proyekmu secara profesional.
   - Proyek Android Studio yang dibuat dari template resmi sudah otomatis memiliki file **\`.gitignore\`** sehingga folder berat seperti \`build/\` dan \`.gradle/\` tidak ikut terunggah ke GitHub.`,
        preparation: [
          "Login ke akun github.com di browser",
          "Buka tab Terminal di Android Studio",
        ],
        thinking_steps: [
          "Mengapa folder 'build/' dan '.gradle/' tidak boleh ikut di-push ke GitHub dan sudah otomatis dikecualikan oleh file .gitignore?",
          "Mengapa repository GitHub yang dikumpulkan harus diatur sebagai 'Public' (bukan Private)?",
        ],
        step_instructions: [
          "Di menu atas Android Studio, klik 'Build -> Build Bundle(s) / APK(s) -> Build APK(s)'.",
          "Tunggu hingga muncul notifikasi 'Build APK(s): APK(s) generated successfully', lalu klik 'locate' dan salin file 'app-debug.apk' ke tempat yang mudah ditemukan (dan ganti namanya menjadi 'SakuSiswa-NamaKamu.apk').",
          "Buka github.com -> klik tombol '+' -> 'New repository' -> beri nama 'sakusiswa-android', pilih 'Public', jangan centang Add a README, lalu klik 'Create repository'.",
          "Buka Terminal di Android Studio, lalu jalankan perintah git init, git add ., git commit, dan git push sesuai blok kode di bawah.",
        ],
        antigravity_prompt: {
          tujuan:
            "Memahami langkah build APK dan perintah Git untuk mengunggah proyek Android Studio ke GitHub.",
          konteks:
            "Proyek Android Studio SakuSiswa yang siap dipublikasikan ke repository GitHub publik.",
          instruksi: [
            "Tuliskan urutan perintah Git dari git init hingga git push -u origin main di terminal Android Studio.",
            "Jelaskan cara mengunggah file APK ke fitur 'Releases' di repository GitHub agar memiliki link unduhan langsung.",
            "Jelaskan solusi jika muncul error 'remote origin already exists' saat menjalankan git remote add.",
          ],
          batasan: [
            "Berikan perintah terminal yang aman dan jelas.",
          ],
          hasilAkhir:
            "Urutan perintah Git dan cara membuat GitHub Release untuk file APK.",
          validasi:
            "Folder app/src/main dan file build.gradle.kts terlihat di halaman repository GitHub.",
          rawPrompt: `[TUJUAN]\nMengunggah proyek Android SakuSiswa ke GitHub dan mempublikasikan file APK lewat GitHub Releases.\n\n[KONTEKS]\nSaya siswa SMK sudah menyelesaikan aplikasi SakuSiswa di Android Studio dan sudah menghasilkan file app-debug.apk.\n\n[INSTRUKSI]\n1. Berikan urutan perintah Git di Terminal Android Studio mulai dari git init, git add ., git commit, git branch -M main, git remote add origin, hingga git push -u origin main.\n2. Jelaskan solusi jika saat git remote add origin muncul pesan "error: remote origin already exists".\n3. Berikan langkah mudah mengunggah file SakuSiswa.apk ke menu "Releases -> Create a new release" di halaman repository GitHub saya.\n\n[BATASAN]\nGunakan langkah singkat yang mudah diikuti pemula.\n\n[HASIL AKHIR]\nPanduan push GitHub dan pembuatan link unduhan APK.\n\n[VALIDASI]\nPastikan repository berstatus Public dan menampilkan folder app/ serta build.gradle.kts.`,
        },
        code_snippets: [
          {
            filename: "Perintah-Git-Push-Android.sh",
            language: "bash",
            code: `# Jalankan di tab Terminal Android Studio:
git init
git add .
git commit -m "feat: aplikasi Android SakuSiswa dengan Room CRUD dan Google Login"
git branch -M main
git remote add origin https://github.com/USERNAME_KAMU/sakusiswa-android.git
git push -u origin main`,
          },
        ],
        expected_result:
          "File APK berhasil dibuat dan seluruh kode proyek SakuSiswa berhasil tampil di repository GitHub publik milik siswa.",
        validation_check: [
          "Memiliki file .apk hasil Build APK(s)",
          "Link github.com/username/sakusiswa-android dapat dibuka dan menampilkan folder app serta build.gradle.kts",
        ],
        common_errors: [
          {
            error: "Mengunggah hanya 1 file MainActivity.kt secara manual ke GitHub tanpa folder app/ dan build.gradle.kts.",
            solution:
              "Gunakan perintah 'git add .' dari folder akar proyek di Terminal Android Studio agar seluruh struktur proyek Android ikut terunggah secara utuh.",
          },
        ],
        exercise:
          "Unggah file APK yang sudah kamu build ke menu 'Releases' di sisi kanan halaman repository GitHub-mu (atau ke Google Drive dengan akses 'Siapa saja yang memiliki link')!",
        quiz: [
          {
            question: "Menu manakah di Android Studio yang digunakan untuk menghasilkan file installer .apk yang siap dipasang di HP Android?",
            options: [
              "File -> Close Project",
              "Build -> Build Bundle(s) / APK(s) -> Build APK(s)",
              "View -> Appearance",
              "Help -> About",
            ],
            correctIndex: 1,
            explanation:
              "Menu Build -> Build Bundle(s) / APK(s) -> Build APK(s) merakit proyek menjadi file app-debug.apk di dalam folder app/build/outputs/apk/debug/.",
          },
        ],
      },
      {
        id: "m6-l4",
        module_id: "modul-6",
        lesson_number: 4,
        title: "Menyusun README.md Profesional & Mengumpulkan Karya di ComposeLab",
        slug: "menyusun-readme-dan-kumpulkan-karya",
        description:
          "Melengkapi repository GitHub dengan dokumentasi README.md yang menjelaskan arsitektur aplikasi, daftar fitur CRUD, dan cara kerja, lalu mengirimkan karya melalui halaman Kumpulan Karya.",
        estimated_minutes: 50,
        order_index: 4,
        is_published: true,
        created_at: new Date().toISOString(),
        objective:
          "Siswa mampu menulis dokumentasi README.md yang terstruktur, mengambil screenshot aplikasi, dan mengumpulkan karya di platform ComposeLab.",
        prerequisites: ["Repository GitHub sudah online dan aplikasi sudah berjalan"],
        concept_explanation: `Karya seorang Software Engineer belum lengkap tanpa **Dokumentasi (\`README.md\`)**. Ketika guru, juri, atau perekrut membuka repository GitHub milikmu, file \`README.md\` adalah halaman sampul pertama yang mereka baca—dan juga dinilai secara otomatis oleh sistem penilai AI di **ComposeLab**!

\`README.md\` yang baik memuat:
1. **Judul & Deskripsi Singkat Aplikasi SakuSiswa**.
2. **Daftar Fitur Utama**: Login Google (Credential Manager), Penyimpanan Lokal (Room Database KSP), CRUD Tugas (Create, Read, Update, Delete), Pencarian & Filter, serta Fitur Kreasi Mandiri yang kamu tambahkan.
3. **Teknologi & Arsitektur**: Kotlin, Jetpack Compose Material 3, MVVM, Room Database, Coroutines Flow.
4. **Cara Menjalankan Proyek di Android Studio**.

Setelah \`README.md\` di-push ke GitHub dan kamu mengambil *screenshot* tampilan aplikasimu yang sedang berjalan, buka menu **Kumpulan Karya** di atas dan kirimkan karyamu!`,
        preparation: [
          "Siapkan 1 gambar screenshot aplikasi SakuSiswa milikmu (format PNG/JPG/WebP)",
          "Siapkan Link Repository GitHub dan Link APK (opsional)",
        ],
        thinking_steps: [
          "Mengapa menulis dokumentasi README.md dengan kalimatmu sendiri membuktikan bahwa kamu benar-benar memahami cara kerja aplikasimu?",
          "Apa saja 4 poin pemeriksaan terakhir sebelum kamu menekan tombol Kirim Karya di ComposeLab?",
        ],
        step_instructions: [
          "Buat file bernama 'README.md' di folder paling luar (root) proyek SakuSiswa di Android Studio.",
          "Isi README.md mengikuti template di bawah, sesuaikan dengan nama, kelas, dan fitur kreasi tambahan yang kamu buat.",
          "Jalankan 'git add README.md && git commit -m \"docs: tambah dokumentasi README SakuSiswa\" && git push' di Terminal.",
          "Buka halaman 'Kumpulan Karya' di website ComposeLab, isi judul proyek, deskripsi, centang 6 modul, masukkan Link GitHub, Link APK, unggah Screenshot, lalu klik Kirim Karya!",
        ],
        antigravity_prompt: {
          tujuan:
            "Menyusun file README.md yang rapi dan informatif untuk repository GitHub proyek Android SakuSiswa.",
          konteks:
            "Proyek akhir Pelatihan Android Kotlin & Jetpack Compose siswa.",
          instruksi: [
            "Buatkan struktur README.md berbahasa Indonesia yang menjelaskan aplikasi SakuSiswa.",
            "Sertakan bagian: Deskripsi Aplikasi, Fitur Utama (Login Google, Room Database, CRUD Tugas, Filter, dan Fitur Tambahan), Arsitektur MVVM, serta Cara Menjalankan di Android Studio.",
            "Berikan tempat khusus untuk menuliskan refleksi singkat apa yang dipelajari siswa selama pelatihan.",
          ],
          batasan: [
            "Gunakan format Markdown standar yang bersih dan mudah dibaca di GitHub.",
          ],
          hasilAkhir:
            "Dokumen README.md profesional siap push ke GitHub.",
          validasi:
            "Halaman utama repository GitHub siswa menampilkan dokumentasi README.md secara lengkap.",
          rawPrompt: `[TUJUAN]\nMembuat file dokumentasi README.md profesional untuk repository GitHub aplikasi Android SakuSiswa.\n\n[KONTEKS]\nKarya aplikasi Android siswa menggunakan Kotlin, Jetpack Compose Material 3, Room Database (KSP), dan Google Credential Manager.\n\n[INSTRUKSI]\n1. Susun template README.md yang mencakup:\n   - Judul Proyek & Identitas Pembuat (Nama & Kelas)\n   - Deskripsi Singkat Aplikasi SakuSiswa\n   - Daftar Fitur (Login Google Credential Manager, Room Database Lokal, Create/Read/Update/Delete Tugas, Pencarian & Filter, serta Fitur Kreasi Tambahan)\n   - Arsitektur & Tech Stack (MVVM, Kotlin, Jetpack Compose, Room KSP, Coroutines Flow)\n   - Langkah Menjalankan Proyek di Android Studio\n2. Tambahkan bagian "Refleksi Pembelajaran" berisi 3 poin tentang bagaimana saya merancang alur logika sebelum mem-prompt AI.\n\n[BATASAN]\nGunakan Markdown yang rapi dengan tabel atau poin-poin yang jelas.\n\n[HASIL AKHIR]\nIsi file README.md lengkap yang siap disimpan ke root repository.\n\n[VALIDASI]\nPastikan seluruh kriteria penilaian di ComposeLab tercakup di dalam README.md.`,
        },
        code_snippets: [
          {
            filename: "README.md",
            language: "markdown",
            code: `# SakuSiswa — Aplikasi Catatan & Manajemen Tugas Siswa

Disusun oleh: **[Nama Lengkap Kamu]** — Kelas **[Kelas Kamu, misal: X RPL 1]**  
Pelatihan Android ComposeLab

## Tentang Aplikasi
**SakuSiswa** adalah aplikasi Android native untuk membantu siswa mencatat, memantau, dan menyelesaikan tugas sekolah harian secara terorganisir. Aplikasi ini bekerja cepat secara offline menggunakan penyimpanan lokal **Room Database** dan terintegrasi dengan **Sign in with Google (Credential Manager API)**.

## Fitur Utama
- **Autentikasi Google Modern**: Masuk menggunakan akun Google via Android Credential Manager API dan penyimpanan sesi lokal.
- **Penyimpanan Lokal Room Database (KSP)**: Data tugas tersimpan permanen di perangkat menggunakan SQLite/Room dan terpisah per email pengguna.
- **CRUD Tugas Lengkap**:
  - **Create**: Tambah tugas baru lengkap dengan mata pelajaran, judul, catatan, dan tenggat waktu.
  - **Read**: Daftar tugas real-time berbasis Kotlin \`Flow\` dan \`LazyColumn\` dengan pencarian & filter status.
  - **Update**: Edit detail tugas dan centang tugas selesai dengan satu ketukan.
  - **Delete**: Hapus tugas dilengkapi dialog konfirmasi pengaman.
- **Fitur Kreasi Tambahan**: Progress bar persentase ketuntasan tugas di kartu profil siswa.

## Arsitektur & Teknologi
- **Bahasa**: Kotlin
- **Antarmuka (UI)**: Jetpack Compose & Material 3
- **Arsitektur**: MVVM (\`data\`, \`viewmodel\`, \`ui\`)
- **Database Lokal**: AndroidX Room Database + KSP
- **Autentikasi**: AndroidX Credentials + Google ID Token`,
          },
        ],
        expected_result:
          "Repository GitHub siswa memiliki README.md yang lengkap dan karya telah berhasil dikumpulkan di halaman Kumpulan Karya ComposeLab.",
        validation_check: [
          "Repository GitHub berstatus Public dan menampilkan README.md",
          "Status pengumpulan di halaman Kumpulan Karya telah terkirim beserta screenshot aplikasi",
        ],
        common_errors: [
          {
            error: "Mengumpulkan link GitHub yang masih berstatus Private sehingga sistem penilai otomatis tidak bisa membaca kode.",
            solution:
              "Buka Settings di repository GitHub -> gulir ke paling bawah (Danger Zone) -> Change repository visibility -> ubah menjadi Public.",
          },
        ],
        exercise:
          "Buka halaman Kumpulan Karya sekarang, kirimkan link GitHub, link APK, dan screenshot terbaik aplikasimu!",
        quiz: [
          {
            question: "Mengapa repository GitHub yang dikumpulkan pada halaman Kumpulan Karya wajib diatur menjadi Public?",
            options: [
              "Agar kuota internet berkurang",
              "Agar guru dan mesin penilai otomatis dapat memeriksa struktur kode Kotlin, Room, Compose, dan README.md milikmu",
              "Karena GitHub melarang kode Kotlin di repository Private",
              "Supaya aplikasi otomatis terhapus",
            ],
            correctIndex: 1,
            explanation:
              "Mesin penilai dan guru membutuhkan akses baca publik untuk memverifikasi kelengkapan struktur proyek Android (build.gradle.kts, Room, Compose, dan README.md).",
          },
        ],
      },
    ],
  },
];
