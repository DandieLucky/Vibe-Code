// ============================================================================
// TUTORIAL DEVELOPMENT SAKUSISWA — ComposeLab SMKN 1
// ============================================================================
// 12 langkah berurutan membangun aplikasi Android SakuSiswa (Kotlin + Jetpack
// Compose + Room Database KSP + Google Credential Manager + CRUD Lengkap).
// ============================================================================

import type { BagianTutorial } from "./tutorial-persiapan";

export const DEVELOPMENT: BagianTutorial = {
  id: "development",
  judul: "Tutorial Step-by-Step Membangun Aplikasi SakuSiswa",
  pengantar:
    "Ikuti 12 langkah ini secara berurutan dari Hari ke-1 hingga Hari ke-3. Jangan melompati langkah. " +
    "Setelah satu langkah selesai dan berjalan tanpa error di Android Studio, tekan tombol Selesai di langkah itu.",
  peringatanAwal:
    "Centang langkah hanya untuk membantu melacak progres belajarmu. Karya akhir dinilai dari Repository GitHub, Screenshot Aplikasi, dan kelengkapan fitur Login Google + Room Database + CRUD.",
  langkah: [
    // ---------- HARI 1: PERSIAPAN PROYEK & UI JETPACK COMPOSE ----------
    {
      id: "d1-new-project",
      judul: "Buat proyek baru Empty Activity (Jetpack Compose)",
      penjelasan:
        "Kita memulai dengan template Empty Activity modern yang sudah memakai Kotlin DSL dan Jetpack Compose Material 3 tanpa file XML.",
      instruksi: [
        "Buka Android Studio -> klik New Project -> pilih 'Empty Activity' (yang berlogo Jetpack Compose), lalu klik Next.",
        "Isi Name: 'SakuSiswa', Package name: 'id.smkn1jakarta.sakusiswa', Minimum SDK: 'API 26 (Android 8.0)', Build configuration language: 'Kotlin DSL (build.gradle.kts)'.",
        "Klik Finish dan tunggu proses Gradle Sync di pojok kanan bawah selesai.",
        "Jalankan aplikasi awal ke HP/Emulator dengan menekan tombol Run (▶).",
      ],
      hasilDiharapkan:
        "Aplikasi awal bertuliskan 'Hello Android!' tampil di HP atau Emulator tanpa error merah.",
      troubleshooting: [
        {
          masalah: "Gradle Sync gagal karena jaringan sekolah lambat",
          solusi: "Klik ikon gajah 'Sync Project with Gradle Files' di toolbar atas, atau pastikan koneksi Wi-Fi stabil.",
        },
      ],
    },
    {
      id: "d2-package-structure",
      judul: "Rapikan struktur package (data, viewmodel, ui)",
      penjelasan:
        "Agar proyek mudah dipelihara dan mudah di-debug, kita pisahkan kode menjadi 3 package sesuai tanggung jawabnya (arsitektur MVVM sederhana).",
      instruksi: [
        "Ubah tampilan panel kiri Android Studio ke mode 'Android'.",
        "Buka app -> kotlin+java -> klik kanan pada 'id.smkn1jakarta.sakusiswa'.",
        "Pilih New -> Package, lalu buat 3 package secara terpisah: 'data', 'viewmodel', dan 'ui'.",
      ],
      hasilItem: [
        "Package data, viewmodel, dan ui tampil sejajar di bawah id.smkn1jakarta.sakusiswa",
      ],
    },
    {
      id: "d3-ui-components",
      judul: "Buat komponen UI dasar (StudentHeaderCard, TaskItemCard, TaskFormDialog)",
      penjelasan:
        "Sebelum menyambungkan database, kita bangun dulu komponen tampilan Material 3 dan uji lewat @Preview di Android Studio.",
      instruksi: [
        "Di dalam package 'ui', buat file 'StudentHeaderCard.kt' untuk menampilkan nama, email siswa, dan jumlah tugas aktif/selesai.",
        "Buat file 'TaskItemCard.kt' berisi Checkbox, label mata pelajaran, judul tugas (dengan efek garis coret saat selesai), catatan, tenggat, tombol Edit, dan tombol Delete.",
        "Buat file 'TaskFormDialog.kt' berisi AlertDialog dengan 4 OutlinedTextField (Mata Pelajaran, Judul, Tenggat, Catatan) dan validasi tombol Simpan.",
        "Buka mode Split di Android Studio dan pastikan @Preview tampil rapi tanpa error.",
      ],
      blokPrompt: `[PIKIRKAN DULU] Komponen UI tidak mengakses database langsung, melainkan menerima data dan callback dari atas.\n[TUJUAN] Membuat StudentHeaderCard.kt, TaskItemCard.kt, dan TaskFormDialog.kt di package ui.\n[KONTEKS] Kotlin, Jetpack Compose Material 3, proyek SakuSiswa.\n[INSTRUKSI] Gunakan Card, Row dengan Modifier.weight(1f), Checkbox, IconButton Edit/Delete, dan remember { mutableStateOf("") } pada form.\n[BATASAN] Gunakan ikon standar Icons.Default.*.\n[VALIDASI] Pastikan @Preview merender kartu dengan rapi tanpa teks terpotong.`,
      hasilDiharapkan:
        "Ketiga komponen UI tampil sempurna pada panel Preview Android Studio.",
    },

    // ---------- HARI 2 PAGI: AUTENTIKASI GOOGLE CREDENTIAL MANAGER ----------
    {
      id: "d4-google-cloud-sha1",
      judul: "Ambil SHA-1 & buat Web Client ID di Google Cloud Console",
      penjelasan:
        "Credential Manager API membutuhkan verifikasi bahwa aplikasi SakuSiswa benar-benar milikmu melalui kode SHA-1 debug dan Web Client ID.",
      instruksi: [
        "Buka tab Terminal di Android Studio dan jalankan perintah di bawah ini untuk melihat SHA-1 pada bagian 'Variant: debug'.",
        "Buka console.cloud.google.com -> buat proyek 'SakuSiswa-SMKN1' -> atur OAuth consent screen (External) dan tambahkan emailmu di Test Users.",
        "Buka Credentials -> Create Credentials -> OAuth client ID -> buat tipe 'Android' (masukkan package id.smkn1jakarta.sakusiswa dan SHA-1).",
        "Buat satu OAuth client ID lagi bertipe 'Web application', lalu salin nilai Client ID-nya (.apps.googleusercontent.com).",
      ],
      kode: ["./gradlew signingReport"],
      hasilItem: [
        "Kode SHA-1 Debug tercatat",
        "Web Client ID (.apps.googleusercontent.com) tersimpan di catatan",
      ],
      troubleshooting: [
        {
          masalah: "Di Windows perintah ./gradlew tidak dikenali",
          solusi: "Gunakan gradlew signingReport (tanpa ./ di depan).",
        },
      ],
    },
    {
      id: "d5-credential-deps",
      judul: "Pasang dependensi Credential Manager & izin INTERNET",
      penjelasan:
        "Tambahkan pustaka AndroidX Credentials dan Google ID agar aplikasi dapat menampilkan bottom sheet Sign in with Google.",
      instruksi: [
        "Buka AndroidManifest.xml dan tambahkan <uses-permission android:name=\"android.permission.INTERNET\" /> di atas tag <application>.",
        "Buka build.gradle.kts (Module :app) dan tambahkan ketiga library Credential Manager di dalam blok dependencies { ... }.",
        "Klik 'Sync Now' di bagian atas editor hingga selesai.",
      ],
      kode: [
        "implementation(\"androidx.credentials:credentials:1.3.0\")",
        "implementation(\"androidx.credentials:credentials-play-services-auth:1.3.0\")",
        "implementation(\"com.google.android.libraries.identity.googleid:googleid:1.1.1\")",
      ],
      hasilDiharapkan:
        "Gradle Sync sukses tanpa error unresolved reference.",
    },
    {
      id: "d6-google-auth-manager",
      judul: "Buat GoogleAuthManager.kt & LoginScreen.kt dengan sesi lokal",
      penjelasan:
        "GoogleAuthManager memanggil Credential Manager, menyimpan sesi ke SharedPreferences, dan menangani pembatalan login tanpa crash.",
      instruksi: [
        "Di dalam package 'data', buat 'GoogleAuthManager.kt' berisi SignedInUser, signInWithGoogle(webClientId), saveSession(), getSavedSession(), dan signOut().",
        "Di dalam package 'ui', buat 'LoginScreen.kt' berisi tombol 'Masuk dengan Akun Google' dan mode cadangan 'Masuk Mode Praktik Offline' untuk emulator tanpa Play Store.",
        "Pastikan GetCredentialException ditangkap menggunakan try-catch.",
      ],
      hasilDiharapkan:
        "Bottom sheet pilih akun Google muncul saat tombol ditekan dan nama + email siswa berhasil terbaca.",
    },

    // ---------- HARI 2 SIANG-SORE: ROOM DATABASE (KSP) & CRUD ----------
    {
      id: "d7-room-ksp-gradle",
      judul: "Pasang plugin KSP dan dependensi Room Database",
      penjelasan:
        "Kita menggunakan KSP (Kotlin Symbol Processing) sebagai pengganti kapt yang lebih cepat dan modern untuk men-generate kode SQL Room.",
      instruksi: [
        "Cek versi Kotlin proyekmu di gradle/libs.versions.toml.",
        "Tambahkan plugin 'com.google.devtools.ksp' di build.gradle.kts (Module :app) sesuai versi Kotlin tersebut.",
        "Tambahkan room-runtime, room-ktx, ksp(room-compiler), dan lifecycle-viewmodel-compose di dependencies.",
        "Klik 'Sync Now' dan pastikan tidak ada error versi.",
      ],
      kode: [
        "implementation(\"androidx.room:room-runtime:2.6.1\")",
        "implementation(\"androidx.room:room-ktx:2.6.1\")",
        "ksp(\"androidx.room:room-compiler:2.6.1\")",
        "implementation(\"androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7\")",
      ],
      hasilDiharapkan:
        "Anotasi @Entity, @Dao, dan @Database dapat di-import dari androidx.room.*.",
    },
    {
      id: "d8-room-entity-dao-db",
      judul: "Buat TaskEntity.kt, TaskDao.kt & SakuSiswaDatabase.kt",
      penjelasan:
        "Tiga file inti Room Database: cetakan tabel tugas (per userEmail), antarmuka kuery CRUD dengan Flow, dan koneksi database Singleton.",
      instruksi: [
        "Di package 'data', buat 'TaskEntity.kt' dengan @Entity(tableName = \"tasks\") dan @PrimaryKey(autoGenerate = true).",
        "Buat 'TaskDao.kt' dengan getTasksByUser(email): Flow<List<TaskEntity>>, insertTask, updateTask, dan deleteTask.",
        "Buat 'SakuSiswaDatabase.kt' dengan pola Singleton getDatabase(context).",
        "Klik Build -> Make Project untuk memastikan KSP sukses men-generate implementasi database.",
      ],
      hasilDiharapkan:
        "Build -> Make Project selesai dengan tanda centang hijau tanpa error SQL.",
    },
    {
      id: "d9-viewmodel-homescreen",
      judul: "Buat TaskViewModel, HomeScreen & hubungkan di MainActivity",
      penjelasan:
        "Menyatukan LoginScreen, HomeScreen, TaskViewModel, dan Room Database agar seluruh operasi Create, Read, Update, Delete (CRUD) + Search + Filter berjalan nyata.",
      instruksi: [
        "Di package 'viewmodel', buat 'TaskViewModel.kt' dengan flatMapLatest, stateIn, addTask, updateTask, toggleTaskCompleted, dan deleteTask.",
        "Di package 'ui', buat 'HomeScreen.kt' menggunakan Scaffold, TopAppBar, StudentHeaderCard, kotak Search, 3 FilterChip, LazyColumn, dan dialog Tambah/Edit/Konfirmasi Hapus.",
        "Di 'MainActivity.kt', inisialisasi database, ViewModel, dan GoogleAuthManager, lalu arahkan layar sesuai state currentUser.",
        "Klik Run (▶) dan uji seluruh alur CRUD + tutup aplikasi & buka kembali!",
      ],
      hasilDiharapkan:
        "Seluruh fitur Login Google, Tambah, Lihat, Cari, Filter, Edit, Centang Selesai, Hapus, dan Logout berjalan lancar dan data tetap tersimpan.",
    },

    // ---------- HARI 3: DEBUGGING, KREASI MANDIRI, BUILD APK & GITHUB ----------
    {
      id: "d10-debugging-kreasi",
      judul: "Debugging dengan Logcat & tambah 1 fitur kreasi mandiri",
      penjelasan:
        "Di Hari ke-3, pastikan aplikasimu bersih dari crash dan tambahkan minimal 1 fitur pembeda hasil rancanganmu sendiri.",
      instruksi: [
        "Buka tab Logcat di Android Studio dan ketik filter 'package:mine level:error' sambil menguji semua tombol aplikasi.",
        "Pilih 1 fitur tambahan: misalnya Progress Bar ketuntasan di StudentHeaderCard, Label Prioritas Tugas, atau Bersihkan Tugas Selesai.",
        "Rancang alurnya terlebih dahulu di catatan sebelum menyusun prompt diskusi ke AI.",
        "Uji kembali fitur baru bersama fitur lama untuk memastikan tidak ada regresi.",
      ],
      hasilDiharapkan:
        "Logcat bersih dari error fatal dan fitur kreasi mandiri berjalan sesuai harapan.",
    },
    {
      id: "d11-build-apk-github",
      judul: "Build file .apk & unggah proyek ke GitHub + README.md",
      penjelasan:
        "Buat file installer Android (.apk) dan publikasikan kode sumber proyekmu secara profesional ke repository GitHub publik.",
      instruksi: [
        "Klik Build -> Build Bundle(s) / APK(s) -> Build APK(s), lalu klik 'locate' untuk mengambil file app-debug.apk.",
        "Buat file README.md di folder root proyek yang menjelaskan fitur Login Google, Room Database, CRUD, dan fitur kreasi tambahanmu.",
        "Buat repository baru berstatus Public di github.com (misalnya 'sakusiswa-android').",
        "Jalankan perintah Git di Terminal Android Studio untuk mengunggah seluruh proyek.",
      ],
      kode: [
        "git init",
        "git add .",
        "git commit -m \"feat: aplikasi Android SakuSiswa SMKN 1\"",
        "git branch -M main",
        "git remote add origin https://github.com/USERNAME/sakusiswa-android.git",
        "git push -u origin main",
      ],
      hasilItem: [
        "File .apk berhasil dibuat (opsional diunggah ke GitHub Releases / Google Drive)",
        "Repository GitHub berstatus Public dan menampilkan folder app/, build.gradle.kts, serta README.md",
      ],
    },
    {
      id: "d12-kumpul-karya",
      judul: "Ambil screenshot & kumpulkan karya di ComposeLab SMKN 1",
      penjelasan:
        "Langkah terakhir! Kumpulkan karyamu melalui menu Kumpulan Karya agar dapat diperiksa oleh guru dan sistem penilai otomatis.",
      instruksi: [
        "Ambil 1 screenshot terbaik aplikasi SakuSiswa yang menampilkan daftar tugas milikmu.",
        "Buka halaman 'Kumpulan Karya' di ComposeLab SMKN 1.",
        "Isi judul proyek, deskripsi singkat, centang 6 modul, masukkan Link Repository GitHub (wajib), Link APK / Video Demo (opsional), dan unggah Screenshot (wajib).",
        "Klik tombol 'Kirim Karya' dan pantau status penilaiannya di Dashboard.",
      ],
      hasilDiharapkan:
        "Status pengumpulan karya tercatat 'Menunggu Pemeriksaan' di Dashboard siswa dan siap dinilai oleh guru.",
    },
  ],
};
