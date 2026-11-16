// ============================================================================
// TUTORIAL PERSIAPAN LAPTOP ANDROID — ComposeLab
// ============================================================================
// Dikerjakan sebelum atau pada awal pelatihan.
// Progress dicatat lewat tombol "Selesai" per langkah dan disimpan ke database.
// ============================================================================

export interface GambarPanduan {
  src: string;
  alt: string;
}

export interface LangkahTutorial {
  id: string;
  judul: string;
  penjelasan?: string;
  instruksi?: string[];
  gambar?: GambarPanduan[];
  hasilDiharapkan?: string;
  hasilItem?: string[];
  troubleshooting?: { masalah: string; solusi: string }[];
  peringatan?: { judul: string; isi: string };
  kode?: string[];
  blokPrompt?: string;
  blokKirim?: string;
}

export interface BagianTutorial {
  id: string;
  judul: string;
  pengantar?: string;
  peringatanAwal?: string;
  langkah: LangkahTutorial[];
}

// ============================================================================
// BAGIAN 1 — PERSIAPAN LAPTOP ANDROID
// ============================================================================

export const PERSIAPAN: BagianTutorial = {
  id: "persiapan",
  judul: "Tutorial Persiapan Laptop Android",
  pengantar:
    "Selesaikan langkah persiapan ini sebelum praktik membangun aplikasi SakuSiswa. " +
    "Pasang Android Studio, siapkan HP Android / Emulator, pasang Git, lalu siapkan akun. " +
    "Tekan Selesai di setiap langkah yang sudah beres.",
  peringatanAwal:
    "Jika ada kendala saat instalasi, catat pesan error-nya atau ambil foto layar, lalu tanyakan ke fasilitator.",
  langkah: [
    {
      id: "p1-cek-laptop",
      judul: "Cek spesifikasi laptop & kabel data",
      penjelasan:
        "Android Studio membutuhkan ruang penyimpanan yang cukup agar proses kompilasi Kotlin dan Gradle berjalan lancar.",
      instruksi: [
        "Sistem operasi Windows 10/11 (64-bit) atau macOS 12+.",
        "RAM minimal 8 GB (jika RAM 8 GB, gunakan HP Android fisik dengan kabel USB agar laptop tetap ringan).",
        "Pastikan ruang kosong harddisk/SSD minimal 15 GB untuk Android Studio, Android SDK, dan cache Gradle.",
        "Bawa charger laptop dan kabel data USB yang mendukung transfer data (bukan kabel cas saja).",
      ],
      hasilItem: [
        "Ruang penyimpanan tersisa minimal 15 GB",
        "Kabel data USB siap menghubungkan HP Android ke laptop",
      ],
    },
    {
      id: "p1-android-studio",
      judul: "Pasang Android Studio & Android SDK",
      penjelasan:
        "Android Studio adalah editor resmi dari Google untuk menulis kode Kotlin, melihat Preview Jetpack Compose, membaca error di Logcat, dan merakit file .apk. Sudah membawa JDK (JetBrains Runtime) bawaan sehingga tidak perlu menginstal Java terpisah.",
      instruksi: [
        "Buka developer.android.com/studio di browser, lalu unduh Android Studio versi stabil terbaru.",
        "Jalankan installer (Windows: .exe, macOS: .dmg), ikuti wizard instalasi dengan pilihan Standard.",
        "Saat pertama kali dibuka, ikuti jendela Android Studio Setup Wizard untuk mengunduh komponen Android SDK terbaru (API 34/35) dan Android SDK Platform-Tools.",
        "Tunggu hingga seluruh unduhan selesai dan muncul layar Welcome to Android Studio.",
      ],
      hasilItem: [
        "Android Studio dapat dibuka dengan normal",
        "Android SDK dan Platform-Tools selesai terpasang tanpa error",
      ],
      troubleshooting: [
        {
          masalah: "Unduhan SDK berhenti di tengah jalan karena koneksi terputus",
          solusi: "Buka Settings -> Languages & Frameworks -> Android SDK, lalu centang ulang SDK Platform terbaru dan klik Apply.",
        },
        {
          masalah: "Windows menampilkan peringatan ruang disk tidak cukup",
          solusi: "Kosongkan minimal 15 GB di drive C:\\ sebelum menjalankan Setup Wizard.",
        },
      ],
    },
    {
      id: "p1-device-setup",
      judul: "Siapkan perangkat uji (HP Android USB Debugging atau Emulator)",
      penjelasan:
        "Kamu membutuhkan perangkat untuk menjalankan dan menguji aplikasi SakuSiswa. Menggunakan HP Android fisik sangat disarankan karena jauh lebih ringan dibanding Emulator.",
      instruksi: [
        "Cara A (HP Fisik — Disarankan): Buka Pengaturan HP -> Tentang Ponsel -> ketuk 'Nomor Versi / Build Number' sebanyak 7 kali hingga muncul pesan 'Anda adalah pengembang'.",
        "Masuk ke Pengaturan Tambahan / Sistem -> Opsi Pengembang (Developer Options) -> aktifkan 'Debugging USB (USB Debugging)'.",
        "Colokkan HP ke laptop dengan kabel USB, ubah mode koneksi USB dari 'Hanya Mengisi Daya' menjadi 'Transfer File (MTP)', lalu klik 'Selalu izinkan dari komputer ini' saat muncul dialog RSA di layar HP.",
        "Cara B (Emulator — jika tidak membawa HP Android): Di Android Studio buka Device Manager -> Create Virtual Device -> pilih Pixel 6 / Medium Phone -> unduh System Image API 34/35 dengan Play Store -> Finish.",
      ],
      hasilItem: [
        "Nama HP Android atau Virtual Device muncul di daftar perangkat pada toolbar atas Android Studio",
      ],
      troubleshooting: [
        {
          masalah: "HP tidak muncul di daftar device Android Studio",
          solusi: "Coba ganti port USB atau kabel data lain, lalu matikan dan nyalakan kembali sakelar USB Debugging di HP.",
        },
      ],
    },
    {
      id: "p1-git",
      judul: "Pasang Git & atur identitas",
      penjelasan:
        "Git dipakai untuk mencatat versi kode dan mengunggah seluruh proyek Android SakuSiswa ke repository GitHub milikmu.",
      instruksi: [
        "Windows: buka git-scm.com/downloads, unduh versi Windows, jalankan installer dan klik Next sampai selesai.",
        "macOS: buka Terminal, ketik git --version. Jika muncul tawaran memasang Command Line Developer Tools, klik Install.",
        "Cek versi Git dan atur nama serta email Git-mu lewat terminal:",
      ],
      kode: [
        "git --version",
        "git config --global user.name \"Nama Lengkap Kamu\"",
        "git config --global user.email \"email_github_kamu@gmail.com\"",
      ],
      hasilItem: ["git --version menampilkan git version 2.…"],
    },
    {
      id: "p1-akun",
      judul: "Siapkan akun GitHub, Google Cloud & Asisten AI",
      penjelasan:
        "Kamu memerlukan tiga akun ini untuk menyimpan kode, mengaktifkan tombol Login Google di aplikasi SakuSiswa, dan berdiskusi dengan asisten AI secara terstruktur.",
      instruksi: [
        "Akun GitHub (daftar di github.com) — pastikan kamu ingat username dan password-nya untuk mengumpulkan link repository.",
        "Akun Google aktif — dipakai untuk membuka Google Cloud Console (console.cloud.google.com) guna membuat Web Client ID bagi Credential Manager, serta dipakai login di HP/Emulator uji coba.",
        "Akses Asisten AI (Gemini / Google Antigravity / ChatGPT) di browser untuk latihan menyusun Prompt 6-Bagian dan berdiskusi saat debugging.",
      ],
      peringatan: {
        judul: "Prinsip Belajar di ComposeLab",
        isi: "AI adalah rekan diskusi dan asisten penulis draf, bukan pengganti otakmu. Biasakan selalu membaca alur 'Pikirkan Dulu' sebelum memakai prompt.",
      },
    },
  ],
};
