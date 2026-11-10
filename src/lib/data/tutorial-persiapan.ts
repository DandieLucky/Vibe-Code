// ============================================================================
// TUTORIAL PENSIAPAN & DEVELOPMENT — Vibe Code
// ============================================================================
// Isi diambil dari workshop Katalog UMKM. Setiap langkah memuat:
//   - nomor & judul
//   - penjelasan singkat
//   - instruksi bernomor
//   - gambar panduan (opsional)
//   - blok "Hasil yang diharapkan"
//   - blok "Kalau tidak sesuai" (troubleshooting)
//
// Progress dicatat lewat tombol "Selesai" per langkah dan disimpan ke
// database, sehingga peserta bisa lanjut dari perangkat lain.
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
// BAGIAN 1 — PERSIAPAN (dikerjakan sebelum hari acara)
// ============================================================================

export const PERSIAPAN: BagianTutorial = {
  id: "persiapan",
  judul: "Tutorial persiapan laptop",
  pengantar:
    "Selesaikan sebelum hari acara. Pasang tiga software berikut, lalu siapkan akun. " +
    "Tekan Selesai di setiap langkah yang sudah beres.",
  peringatanAwal:
    "Kalau ada kendala, catat pesan error-nya dan sampaikan ke pendamping saat registrasi.",
  langkah: [
    {
      id: "p1-cek-laptop",
      judul: "Cek laptop",
      penjelasan: "Pastikan laptopmu memenuhi syarat berikut.",
      instruksi: [
        "Windows 10 atau 11 (64-bit), atau",
        "macOS 12 (Monterey) atau lebih baru dengan chip Apple Silicon (M1, M2, M3, M4). Mac dengan prosesor Intel tidak didukung Antigravity.",
        "Bawa charger. Pastikan ruang kosong minimal 10 GB.",
      ],
      gambar: [
        { src: "/panduan/cek-laptop.png", alt: "Syarat laptop: Windows 10/11 atau macOS Apple Silicon, ruang kosong 10 GB" },
      ],
    },
    {
      id: "p1-nodejs",
      judul: "Pasang Node.js",
      penjelasan:
        "Node.js dibutuhkan untuk menjalankan aplikasi di laptop. Aplikasi ini memerlukan minimal " +
        "versi 20.9; yang disarankan adalah versi 24 LTS. Jangan pakai versi 20 ke bawah karena " +
        "sudah tidak mendapat pembaruan keamanan.",
      instruksi: [
        "Buka nodejs.org/en/download.",
        "Pilih versi v24.x (LTS). Kalau di halaman itu versi 26 sudah berlabel LTS, versi 26 juga boleh.",
        "Pilih sistem operasimu, unduh installer (Windows: .msi, macOS: .pkg), lalu jalankan dan klik Next sampai selesai dengan pilihan bawaan.",
        "Tutup lalu buka lagi terminal (Windows: Command Prompt atau PowerShell; macOS: Terminal), lalu cek:",
      ],
      kode: ["node -v", "npm -v"],
      gambar: [{ src: "/panduan/nodejs-pilih-versi.png", alt: "Halaman unduhan Node.js" }],
      hasilItem: [
        "node -v menampilkan v24.… (atau v26.…), dan",
        "npm -v menampilkan angka versi, misalnya 11.…",
      ],
      troubleshooting: [
        { masalah: "\"node is not recognized\"", solusi: "Tutup semua jendela terminal lalu buka lagi. Kalau masih, restart laptop." },
        { masalah: "Muncul versi lama (misalnya v18 atau v20)", solusi: "Hapus Node.js lama lewat Settings → Apps (Windows) lalu pasang ulang versi 24." },
      ],
    },
    {
      id: "p1-git",
      judul: "Pasang Git",
      penjelasan: "Git dipakai untuk menyimpan dan mengirim kodemu ke GitHub.",
      instruksi: [
        "Windows: buka git-scm.com/downloads, unduh versi Windows, jalankan installer dan klik Next sampai selesai dengan pilihan bawaan.",
        "macOS: buka Terminal, ketik git --version. Kalau muncul jendela tawaran memasang Command Line Developer Tools, klik Install.",
        "Cek hasilnya:",
      ],
      kode: ["git --version"],
      gambar: [{ src: "/panduan/git-pasang.png", alt: "Halaman unduhan Git" }],
      hasilItem: ["Muncul tulisan seperti git version 2.…"],
    },
    {
      id: "p1-vscode",
      judul: "Pasang VS Code & ekstensi Google Antigravity",
      penjelasan:
        "Visual Studio Code (VS Code) adalah editor kode yang dipakai sepanjang workshop. " +
        "Ekstensi Google Antigravity menambahkan AI agent di dalam VS Code. Keduanya gratis, " +
        "cukup login dengan akun Google.",
      instruksi: [
        "Buka code.visualstudio.com/download.",
        "Pilih sesuai laptopmu: Windows klik tombol Windows; macOS klik tombol Mac.",
        "Jalankan installer. Di Windows, setujui lisensi lalu klik Next sampai selesai dengan pilihan bawaan. Di macOS, buka file yang terunduh lalu seret Visual Studio Code ke folder Applications.",
        "Buka VS Code. Buka panel Extensions dengan Ctrl+Shift+X (Windows) atau Cmd+Shift+X (macOS). Cari Google Antigravity, pastikan penerbitnya Google, lalu klik Install.",
        "Klik ikon Antigravity di Activity Bar (deretan ikon paling kiri VS Code), lalu login dengan akun Google-mu.",
      ],
      gambar: [
        { src: "/panduan/vscode-antigravity.png", alt: "Halaman unduhan VS Code" },
        { src: "/panduan/nodejs-cek-terminal.png", alt: "Ekstensi Google Antigravity di panel Extensions" },
        { src: "/panduan/siapkan-akun.png", alt: "Ikon Antigravity di Activity Bar dan halaman login" },
      ],
      hasilItem: [
        "VS Code terbuka, ekstensi Google Antigravity terpasang,",
        "sudah login dengan akun Google, dan",
        "panel chat agent Antigravity bisa dibuka dari ikonnya di Activity Bar.",
      ],
      peringatan: {
        judul: "Penting",
        isi: "Pasang hanya ekstensi Google Antigravity dengan penerbit Google; abaikan ekstensi lain yang namanya mirip. Jangan memakai agent Antigravity sepanjang minggu sebelum acara. Kuota AI gratis dihitung per minggu, dan kamu butuh kuota penuh di hari H.",
      },
    },
    {
      id: "p1-akun",
      judul: "Siapkan akun",
      penjelasan: "Kamu memerlukan tiga akun berikut sebelum hari acara.",
      instruksi: [
        "Akun GitHub (daftar di github.com). Ingat username dan password-nya.",
        "Akun Google untuk login ekstensi Google Antigravity di VS Code.",
        "Akun Vercel dan Supabase dibuat saat acara, cukup login memakai GitHub.",
      ],
      gambar: [
        { src: "/panduan/siapkan-akun.png", alt: "Membuat akun GitHub" },
        { src: "/panduan/siapkan-akun.png", alt: "Login Vercel memakai GitHub" },
        { src: "/panduan/siapkan-akun.png", alt: "Login Supabase memakai GitHub" },
      ],
    },
  ],
};
