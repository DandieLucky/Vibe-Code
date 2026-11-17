import type { Module, Lesson } from "../../types/database.ts";

export interface FullModule extends Module {
  lessons: Lesson[];
}

export const COURSE_INFO = {
  id: "course-android-compose-10modul",
  slug: "android-kotlin-jetpack-compose-lengkap",
  title: "Pemrograman Android Dasar: Kotlin & Jetpack Compose (Modul 1–10)",
  description:
    "Kurikulum 10 modul bertahap untuk membangun aplikasi Android modern CatatanBelajar menggunakan Kotlin, Jetpack Compose Material 3, Navigation Compose, ViewModel, Room Database (KSP), AlertDialog, dan DataStore Preferences dengan dukungan LLM Gemini.",
  cover_image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=1200",
  total_modules: 10,
  total_estimated_hours: 18,
  target_audience: [
    "Programmer Pemula Android",
    "Pelajar & Mahasiswa Pemrograman Mobile",
    "Pembelajar Mandiri Kotlin & Jetpack Compose",
  ],
};

interface StepLessonInput {
  id: string;
  moduleId: string;
  num: number;
  title: string;
  slug: string;
  description: string;
  minutes?: number;
  objective: string;
  concept: string;
  thinkingSteps: string[];
  instructions: string[];
  code?: { filename: string; language: string; code: string }[];
  promptTujuan: string;
  promptKonteks: string;
  promptInstruksi: string[];
  promptBatasan: string[];
  promptHasilAkhir: string;
  promptValidasi: string;
  expectedResult: string;
  validationCheck: string[];
  commonErrors?: { error: string; solution: string }[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const CREATED_AT = "2026-11-17T00:00:00.000Z";

function makeLesson(input: StepLessonInput): Lesson {
  const rawPrompt = [
    `[TUJUAN]\n${input.promptTujuan}`,
    `[KONTEKS]\n${input.promptKonteks}`,
    `[INSTRUKSI]\n${input.promptInstruksi.map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
    `[BATASAN]\n${input.promptBatasan.map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
    `[HASIL AKHIR]\n${input.promptHasilAkhir}`,
    `[VALIDASI]\n${input.promptValidasi}`,
  ].join("\n\n");

  return {
    id: input.id,
    module_id: input.moduleId,
    lesson_number: input.num,
    title: input.title,
    slug: input.slug,
    description: input.description,
    estimated_minutes: input.minutes ?? 15,
    order_index: input.num,
    is_published: true,
    created_at: CREATED_AT,
    objective: input.objective,
    concept_explanation: input.concept,
    thinking_steps: input.thinkingSteps,
    step_instructions: input.instructions,
    code_snippets: input.code,
    antigravity_prompt: {
      tujuan: input.promptTujuan,
      konteks: input.promptKonteks,
      instruksi: input.promptInstruksi,
      batasan: input.promptBatasan,
      hasilAkhir: input.promptHasilAkhir,
      validasi: input.promptValidasi,
      rawPrompt,
    },
    expected_result: input.expectedResult,
    validation_check: input.validationCheck,
    common_errors: input.commonErrors,
    quiz: input.quiz ? [input.quiz] : undefined,
  };
}

export const MODULES_DATA: FullModule[] = [
  // =========================================================================
  // MODUL 1: PENGENALAN ANDROID STUDIO, PROYEK PERTAMA & POLA KERJA GEMINI
  // =========================================================================
  {
    id: "modul-1",
    course_id: COURSE_INFO.id,
    module_number: 1,
    title: "Pengenalan Android Studio & Proyek Pertama",
    slug: "modul-1-pengenalan-android-studio",
    description:
      "Menyiapkan lingkungan pengembangan Android Studio, memahami struktur proyek Kotlin + Jetpack Compose (Version Catalog), dan cara memanfaatkan Gemini sebagai asisten belajar.",
    estimated_minutes: 60,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 1,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m1-l1",
        moduleId: "modul-1",
        num: 1,
        title: "Ekosistem Android Modern & Peran Gemini Tanpa Salin Buta",
        slug: "ekosistem-android-dan-peran-gemini",
        description:
          "Memahami arsitektur dasar Android (Kotlin + Jetpack Compose) dan cara bertanya ke Gemini untuk mempercepat pemahaman kode.",
        objective: "Memahami alur kerja pengembangan aplikasi Android modern dan pola diskusi terstruktur bersama Gemini.",
        concept: `## Mengapa Kotlin & Jetpack Compose?
Pengembangan Android modern tidak lagi memakai file layout XML terpisah, melainkan **Jetpack Compose**—antarmuka ditulis langsung dengan fungsi **Kotlin**. Sepanjang Modul 1–10 kita akan membangun aplikasi **CatatanBelajar** secara bertahap.

## Pola Memakai Gemini Secara Benar
Saat memakai LLM Gemini (Gemini Chat atau Gemini in Android Studio), selalu sertakan:
1. **Tujuan & Konteks:** Bagian mana yang sedang dikerjakan (misal *Modul 4 Input Validasi*).
2. **Potongan Kode / Error Spesifik:** Tempel baris terkait agar Gemini tidak mengarang.
3. **Minta Penjelasan Singkat:** Pastikan kamu mengerti cara kerja kode sebelum menyimpannya.`,
        thinkingSteps: [
          "Tentukan masalah atau bagian layar yang ingin dibuat (Input -> Proses -> Output).",
          "Siapkan konteks proyek (Kotlin, Jetpack Compose Material 3, Gradle Version Catalog).",
        ],
        instructions: [
          "Pastikan Android Studio versi terbaru (Ladybug/Meerkat ke atas) sudah terpasang beserta Android SDK.",
          "Buka menu kurikuler di platform ini dan salin 'Master Context Proyek' (Langkah 0) terlebih dahulu.",
          "Buka Gemini Chat (gemini.google.com) atau panel Gemini di Android Studio, lalu tempelkan Master Context sebagai pesan pertama.",
          "Tunggu Gemini membalas bahwa ia memahami peta Modul 1–10 proyek CatatanBelajar (com.belajar.catatan).",
          "Salin Prompt AI 6-Bagian di bawah ke sesi chat yang sama untuk menanyakan hubungan Activity, Composable, dan MaterialTheme.",
          "Catat ringkasan jawaban Gemini di bagian Catatan Pribadi di bawah materi ini dengan bahasa Anda sendiri.",
        ],
        promptTujuan: "Memahami peran komponen utama dalam proyek Android Jetpack Compose.",
        promptKonteks:
          "Saya berada di Modul 1, Materi 1.1 (Pengenalan Ekosistem) untuk membangun aplikasi CatatanBelajar (package com.belajar.catatan). Belum ada file kode yang dibuat karena kita masih menyiapkan arsitektur dasar.",
        promptInstruksi: [
          "Jelaskan secara ringkas hubungan antara Activity, fungsi @Composable, dan MaterialTheme pada proyek CatatanBelajar.",
        ],
        promptBatasan: [
          "Jangan tulis kode Room, Navigation, atau ViewModel dulu karena belum masuk modulnya.",
          "Jawab maksimal 3 paragraf dengan analogi sederhana untuk pemula.",
        ],
        promptHasilAkhir: "Gambaran jelas tentang struktur aplikasi Compose.",
        promptValidasi: "Bisa menyebutkan fungsi masing-masing komponen dengan bahasa sendiri.",
        expectedResult: "Memahami peta besar materi Modul 1 sampai 10.",
        validationCheck: ["Android Studio sudah terpasang.", "Memahami pola diskusi terstruktur dengan Gemini."],
      }),
      makeLesson({
        id: "m1-l2",
        moduleId: "modul-1",
        num: 2,
        title: "Membuat Proyek Empty Activity & Mengenal libs.versions.toml",
        slug: "membuat-proyek-dan-version-catalog",
        description:
          "Membuat proyek Android baru dengan template Empty Activity Compose dan memahami file gradle/libs.versions.toml.",
        objective: "Mampu membuat proyek Jetpack Compose dan membaca daftar versi library di Version Catalog.",
        concept: `## Langkah Membuat Proyek Baru
1. Buka Android Studio → **New Project**.
2. Pilih **Empty Activity** (ikon Compose) → klik **Next**.
3. Isi **Name:** \`CatatanBelajar\`, **Package name:** \`com.belajar.catatan\`, **Minimum SDK:** API 24 (Android 7.0).
4. Klik **Finish** dan tunggu proses *Gradle Sync* selesai.

## Mengenal \`gradle/libs.versions.toml\`
Proyek Android modern mengelola versi library terpusat di \`gradle/libs.versions.toml\` dengan 3 bagian: \`[versions]\`, \`[libraries]\`, dan \`[plugins]\`.`,
        thinkingSteps: [
          "Tunggu Gradle selesai mengunduh dependensi awal sebelum mengedit kode.",
          "Periksa folder gradle/ untuk melihat file libs.versions.toml.",
        ],
        instructions: [
          "Buka Android Studio → klik 'New Project' → pilih tab Phone and Tablet → pilih template 'Empty Activity' (berikon Compose).",
          "Isi Name: CatatanBelajar, Package name: com.belajar.catatan, Minimum SDK: API 24 (Android 7.0), lalu klik Finish.",
          "Tunggu indikator 'Gradle Build' di pojok kanan bawah selesai hingga tidak ada pesan error merah.",
          "Di panel Project (ubah dropdown ke mode Android), buka Gradle Scripts → gradle/libs.versions.toml.",
          "Amati blok [versions], [libraries], dan [plugins], lalu buka app/build.gradle.kts untuk melihat cara pemanggilan alias(libs.plugins.kotlin.compose).",
          "Salin Prompt AI di bawah ke sesi Gemini Anda untuk memahami fungsi Compose BOM sebelum lanjut ke materi berikutnya.",
        ],
        code: [
          {
            filename: "gradle/libs.versions.toml (cuplikan)",
            language: "toml",
            code: `[versions]
kotlin = "2.3.10"
composeBom = "2026.02.01"

[libraries]
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }`,
          },
        ],
        promptTujuan: "Memahami fungsi Compose BOM (Bill of Materials) di libs.versions.toml.",
        promptKonteks:
          "Saya berada di Modul 1, Materi 1.2 untuk proyek CatatanBelajar (com.belajar.catatan). Proyek Empty Activity baru saja dibuat dan Gradle Sync berhasil, saya sedang membuka gradle/libs.versions.toml.",
        promptInstruksi: [
          "Jelaskan fungsi Compose BOM (androidx-compose-bom) agar saya tahu mengapa library material3 tidak perlu ditulis versinya satu per satu.",
        ],
        promptBatasan: [
          "Fokus hanya pada gradle/libs.versions.toml dan app/build.gradle.kts.",
          "Jangan ubah atau tambahkan library Room, Navigation, atau DataStore dulu.",
          "Maksimal 2 paragraf ringkas.",
        ],
        promptHasilAkhir: "Pemahaman cara kerja Gradle Version Catalog dan BOM.",
        promptValidasi: "Gradle Sync sukses tanpa error.",
        expectedResult: "Proyek CatatanBelajar terbentuk dengan Gradle Sync hijau.",
        validationCheck: ["Proyek berhasil di-sync.", "Menemukan file libs.versions.toml dan build.gradle.kts."],
      }),
      makeLesson({
        id: "m1-l3",
        moduleId: "modul-1",
        num: 3,
        title: "Mengenal MainActivity.kt, @Composable, dan @Preview",
        slug: "mengenal-mainactivity-dan-preview",
        description:
          "Membedah struktur MainActivity.kt, blok setContent, dan cara menggunakan @Preview untuk melihat UI tanpa emulator.",
        objective: "Mampu memodifikasi Composable bawaan dan melihat hasilnya di panel Split/Design Preview.",
        concept: `## Titik Awal Aplikasi: \`MainActivity.kt\`
Saat aplikasi dijalankan, sistem Android memanggil fungsi \`onCreate()\` di \`MainActivity.kt\`. Di dalamnya terdapat \`setContent { ... }\` yang menjadi pintu masuk seluruh tampilan Jetpack Compose.

Tambahkan anotasi \`@Preview(showBackground = true)\` di atas fungsi Composable tanpa parameter agar Android Studio langsung menggambar pratinjaunya di sebelah kanan editor.`,
        thinkingSteps: [
          "Cari fungsi onCreate dan setContent di MainActivity.kt.",
          "Amati tab Code | Split | Design di pojok kanan atas editor.",
        ],
        instructions: [
          "Buka proyek CatatanBelajar di Android Studio, lalu navigasi ke app/src/main/java/com/belajar/catatan/MainActivity.kt.",
          "Temukan blok setContent { CatatanBelajarTheme { ... } } di dalam fungsi onCreate(). Perhatikan bagaimana Scaffold membungkus konten utama.",
          "Ganti fungsi bawaan Greeting menjadi @Composable fun SalamPembuka(nama: String, modifier: Modifier = Modifier) seperti pada kode referensi.",
          "Di bagian bawah MainActivity.kt, tambahkan @Preview(showBackground = true) di atas fungsi PreviewSalamPembuka() yang memanggil CatatanBelajarTheme { SalamPembuka(\"CatatanBelajar\") }.",
          "Klik tab 'Split' di pojok kanan atas editor untuk melihat pratinjau UI, lalu klik 'Build & Refresh' jika tampilan belum muncul.",
          "Salin Prompt AI di bawah ke sesi Gemini Anda untuk memahami fungsi innerPadding agar tampilan tidak tertutup status bar.",
        ],
        code: [
          {
            filename: "MainActivity.kt",
            language: "kotlin",
            code: `class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            CatatanBelajarTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    SalamPembuka(
                        nama = "CatatanBelajar",
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun SalamPembuka(nama: String, modifier: Modifier = Modifier) {
    Text(text = "Selamat datang di $nama!", modifier = modifier)
}

@Preview(showBackground = true)
@Composable
fun PreviewSalamPembuka() {
    CatatanBelajarTheme { SalamPembuka("CatatanBelajar") }
}`,
          },
        ],
        promptTujuan: "Memahami fungsi innerPadding dari Scaffold di MainActivity.kt.",
        promptKonteks:
          "Saya berada di Modul 1, Materi 1.3 untuk proyek CatatanBelajar (com.belajar.catatan). Proyek Empty Activity sudah jadi (Materi 1.2) dan sekarang saya mengedit MainActivity.kt untuk memanggil SalamPembuka di dalam Scaffold.",
        promptInstruksi: [
          "Jelaskan apa yang terjadi di layar HP jika Modifier.padding(innerPadding) dihapus saat enableEdgeToEdge() aktif di MainActivity.kt.",
        ],
        promptBatasan: [
          "Fokus hanya pada MainActivity.kt dan fungsi Composable sederhana.",
          "Jangan gunakan ViewModel, Navigation, atau Room dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman penanganan status bar / edge-to-edge di Compose.",
        promptValidasi: "Preview SalamPembuka tampil bersih di panel Split.",
        expectedResult: "Panel Preview menampilkan teks sapaan tanpa terpotong status bar.",
        validationCheck: ["Preview muncul di tab Split.", "Memahami fungsi setContent dan innerPadding."],
      }),
      makeLesson({
        id: "m1-l4",
        moduleId: "modul-1",
        num: 4,
        title: "Menjalankan Aplikasi di Emulator & Perangkat HP Fisik",
        slug: "menjalankan-di-emulator-dan-hp",
        description:
          "Membuat Virtual Device (AVD) atau menyambungkan HP Android via USB Debugging lalu menjalankan aplikasi.",
        objective: "Mampu menjalankan aplikasi CatatanBelajar di Emulator Android atau HP fisik.",
        concept: `## Dua Pilihan Menjalankan Aplikasi
1. **Android Emulator (AVD):** Buka **Device Manager** → **Create Virtual Device** → pilih Pixel dengan Play Store / API terbaru → klik **Run (▶)**.
2. **HP Android Fisik (Lebih Ringan):** Aktifkan **Developer Options** (ketuk *Build Number* 7x di *About Phone*), nyalakan **USB Debugging**, lalu hubungkan kabel USB ke laptop.`,
        thinkingSteps: [
          "Pilih target perangkat di dropdown toolbar atas Android Studio.",
          "Tekan tombol Run (Shift+F10 / Ctrl+R).",
        ],
        instructions: [
          "Pilih salah satu metode uji: Emulator (klik Device Manager di kanan atas Android Studio → Create Virtual Device → pilih Pixel + API terbaru) atau HP fisik.",
          "Jika memakai HP fisik: buka Pengaturan → Tentang Ponsel → ketuk Nomor Bentukan (Build Number) 7x, lalu aktifkan USB Debugging di Opsi Developer.",
          "Hubungkan HP dengan kabel data USB, lalu tekan 'Allow / Izinkan' pada pop-up USB Debugging di layar HP.",
          "Pastikan nama perangkat/emulator sudah terpilih di dropdown toolbar atas Android Studio (sebelah tombol Run ▶).",
          "Klik tombol Run (▶) atau tekan Shift+F10, lalu tunggu proses Gradle Build hingga aplikasi CatatanBelajar terbuka otomatis di layar.",
          "Jika perangkat tidak muncul atau emulator error, salin Prompt AI di bawah dan tanyakan ke Gemini dengan menyertakan pesan errornya.",
        ],
        promptTujuan: "Mengatasi kendala perangkat tidak terdeteksi saat akan Run aplikasi.",
        promptKonteks:
          "Saya berada di Modul 1, Materi 1.4 untuk proyek CatatanBelajar (com.belajar.catatan). MainActivity.kt sudah menampilkan SalamPembuka di Preview (Materi 1.3), dan sekarang saya akan menjalankan aplikasi ke Emulator atau HP fisik.",
        promptInstruksi: [
          "Berikan daftar cek singkat langkah demi langkah jika emulator lambat atau HP Android tidak muncul di daftar perangkat Android Studio.",
        ],
        promptBatasan: [
          "Fokus hanya pada setup perangkat/emulator Android Studio, jangan ubah kode Kotlin.",
          "Format daftar bernomor maksimal 5 poin.",
        ],
        promptHasilAkhir: "Langkah troubleshooting perangkat Android Studio.",
        promptValidasi: "Aplikasi tampil di layar Emulator atau HP.",
        expectedResult: "Aplikasi CatatanBelajar berhasil berjalan di layar perangkat.",
        validationCheck: ["Aplikasi terpasang dan terbuka tanpa crash."],
        commonErrors: [
          {
            error: "Device unauthorized / tidak muncul",
            solution: "Cabut-pasang kabel USB, lalu tekan 'Allow USB Debugging' pada pop-up di layar HP.",
          },
        ],
      }),
    ],
  },

  // =========================================================================
  // MODUL 2: MEMBANGUN APLIKASI PERTAMA & TATA LETAK DASAR COMPOSE
  // =========================================================================
  {
    id: "modul-2",
    course_id: COURSE_INFO.id,
    module_number: 2,
    title: "Membangun Aplikasi Pertama & Tata Letak Dasar",
    slug: "modul-2-aplikasi-pertama-dan-layout",
    description:
      "Menggunakan variabel Kotlin, menyusun layout Column dan Row, mengelola State tombol interaktif, serta memakai Scaffold dan TopAppBar Material 3.",
    estimated_minutes: 60,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 2,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m2-l1",
        moduleId: "modul-2",
        num: 1,
        title: "Dasar Kotlin (val vs var), Text, dan Modifier.padding",
        slug: "dasar-kotlin-text-dan-modifier",
        description:
          "Menggunakan val/var dalam komponen Compose, mengatur gaya teks MaterialTheme.typography, dan memberi jarak dengan Modifier.",
        objective: "Mampu menampilkan teks dengan tipografi Material 3 dan mengatur padding.",
        concept: `## \`val\` vs \`var\` & Gaya \`Text\`
- Gunakan \`val\` untuk nilai tetap (seperti judul aplikasi) dan \`var\` untuk nilai yang berubah.
- Di Compose, komponen \`Text\` diatur tampilannya lewat \`style = MaterialTheme.typography.headlineMedium\` dan \`modifier = Modifier.padding(16.dp)\`.`,
        thinkingSteps: [
          "Gunakan satuan dp (density-independent pixels) untuk ukuran jarak dan padding.",
          "Gunakan MaterialTheme.typography agar ukuran teks konsisten.",
        ],
        instructions: [
          "Di panel Project (mode Android), klik kanan pada package com.belajar.catatan → New → Package → beri nama 'ui.screen'.",
          "Klik kanan package ui.screen → New → Kotlin Class/File → pilih File → beri nama HalamanUtama.kt.",
          "Tuliskan @Composable fun HeaderBelajar(judul: String, modifier: Modifier = Modifier) menggunakan Text dengan MaterialTheme.typography.titleLarge dan Modifier.padding(16.dp).",
          "Tambahkan @Preview(showBackground = true) di bawahnya untuk menguji HeaderBelajar(\"Target Belajar Hari Ini\").",
          "Panggil HeaderBelajar di dalam MainActivity.kt menggantikan SalamPembuka, lalu cek di panel Split Preview.",
          "Salin Prompt AI di bawah ke Gemini untuk memastikan Anda paham perbedaan satuan dp dan sp pada Compose.",
        ],
        code: [
          {
            filename: "HalamanUtama.kt",
            language: "kotlin",
            code: `@Composable
fun HeaderBelajar(judul: String, modifier: Modifier = Modifier) {
    Text(
        text = judul,
        style = MaterialTheme.typography.titleLarge,
        color = MaterialTheme.colorScheme.primary,
        modifier = modifier.padding(16.dp)
    )
}`,
          },
        ],
        promptTujuan: "Memahami penggunaan satuan dp dan sp di Jetpack Compose.",
        promptKonteks:
          "Saya berada di Modul 2, Materi 2.1 untuk proyek CatatanBelajar (com.belajar.catatan). MainActivity.kt dari Modul 1 sudah berjalan, dan sekarang saya membuat file ui/screen/HalamanUtama.kt berisi komponen HeaderBelajar.",
        promptInstruksi: [
          "Jelaskan secara singkat kapan memakai satuan dp (seperti padding(16.dp)) dan kapan memakai sp pada Text di Jetpack Compose.",
        ],
        promptBatasan: [
          "Fokus hanya pada Text, Modifier.padding, dan tipografi Material 3 di HalamanUtama.kt.",
          "Jangan tambahkan state, Navigation, atau ViewModel dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman unit ukuran UI Android.",
        promptValidasi: "Teks muncul dengan warna primary dan jarak 16.dp.",
        expectedResult: "Header teks tampil rapi dengan warna tema Material 3.",
        validationCheck: ["File HalamanUtama.kt berhasil dibuat.", "Padding dan warna tampil di Preview."],
      }),
      makeLesson({
        id: "m2-l2",
        moduleId: "modul-2",
        num: 2,
        title: "Menyusun Komponen dengan Column, Row, dan Spacer",
        slug: "column-row-dan-spacer",
        description:
          "Menata beberapa komponen secara vertikal dengan Column, horizontal dengan Row, serta memberi jarak rapi dengan Spacer.",
        objective: "Mampu menyusun komponen bertingkat tanpa saling bertumpuk.",
        concept: `## Tata Letak Vertikal & Horizontal
- **\`Column\`:** Menumpuk komponen dari atas ke bawah. Atur jarak otomatis lewat \`verticalArrangement = Arrangement.spacedBy(12.dp)\`.
- **\`Row\`:** Menjajarkan komponen dari kiri ke kanan. Atur perataan vertikal dengan \`verticalAlignment = Alignment.CenterVertically\`.`,
        thinkingSteps: [
          "Bungkus elemen yang ingin disusun ke bawah dalam Column.",
          "Gunakan Row untuk tombol-tombol yang bersebelahan.",
        ],
        instructions: [
          "Di dalam package ui.screen, buat file baru bernama LayoutDasar.kt (atau tambahkan di HalamanUtama.kt).",
          "Buat @Composable fun RingkasanSesi(jumlahSelesai: Int, onTambah: () -> Unit, onReset: () -> Unit) sesuai kode referensi.",
          "Bungkus Text judul target belajar di dalam Column dengan Modifier.fillMaxWidth().padding(16.dp) dan verticalArrangement = Arrangement.spacedBy(12.dp).",
          "Di bawah Text, tambahkan Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) berisi Button('+1 Target') dan OutlinedButton('Reset').",
          "Tambahkan @Preview(showBackground = true) yang memanggil RingkasanSesi(jumlahSelesai = 3, onTambah = {}, onReset = {}), lalu periksa hasilnya di tab Split.",
          "Salin Prompt AI di bawah ke Gemini untuk membedah perbedaan Arrangement dan Alignment.",
        ],
        code: [
          {
            filename: "LayoutDasar.kt",
            language: "kotlin",
            code: `@Composable
fun RingkasanSesi(jumlahSelesai: Int, onTambah: () -> Unit, onReset: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxWidth().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text("Target Selesai Hari Ini: $jumlahSelesai", style = MaterialTheme.typography.headlineSmall)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = onTambah) { Text("+1 Target") }
            OutlinedButton(onClick = onReset) { Text("Reset") }
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami Arrangement vs Alignment pada Column dan Row.",
        promptKonteks:
          "Saya berada di Modul 2, Materi 2.2 untuk proyek CatatanBelajar (com.belajar.catatan). Saya sudah punya HalamanUtama.kt (Materi 2.1) dan sekarang menyusun komponen RingkasanSesi memakai Column dan Row di LayoutDasar.kt.",
        promptInstruksi: [
          "Jelaskan perbedaan verticalArrangement/horizontalArrangement dengan Alignment pada Column dan Row menggunakan contoh tombol di RingkasanSesi.",
        ],
        promptBatasan: [
          "Fokus hanya pada layout Column, Row, Spacer, Arrangement, dan Alignment.",
          "Jangan ubah fungsi menjadi stateful atau memakai remember dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman posisi sumbu utama dan sumbu silang di Compose.",
        promptValidasi: "Kedua tombol sejajar rapi horizontal di bawah teks.",
        expectedResult: "Teks dan tombol tersusun bersih tanpa tumpang tindih.",
        validationCheck: ["Column dan Row tersusun sesuai arahnya.", "Jarak antar tombol konsisten."],
      }),
      makeLesson({
        id: "m2-l3",
        moduleId: "modul-2",
        num: 3,
        title: "State Interaktif dengan remember { mutableStateOf(...) }",
        slug: "state-remember-mutablestateof",
        description:
          "Membuat angka penghitung atau status layar berubah otomatis saat tombol diklik menggunakan remember dan mutableStateOf.",
        objective: "Mampu menyimpan dan mengubah state lokal di dalam Composable.",
        concept: `## Mengapa Harus \`remember { mutableStateOf(...) }\`?
Saat tombol diklik, Compose menjalankan ulang fungsi Composable (*recomposition*).
- \`mutableStateOf(0)\` memberi sinyal ke Compose untuk menggambar ulang UI saat nilainya berubah.
- \`remember\` menjaga agar nilai hitungan tidak kembali ke \`0\` saat digambar ulang.`,
        thinkingSteps: [
          "Import androidx.compose.runtime.getValue dan setValue agar bisa memakai kata kunci 'by'.",
          "Pastikan tombol memanggil jumlah++ saat onClick.",
        ],
        instructions: [
          "Buat file baru PenghitungTarget.kt di dalam package ui.screen.",
          "Pastikan 4 import Compose runtime ditambahkan di atas file: getValue, setValue, remember, dan mutableStateOf.",
          "Deklarasikan var jumlah by remember { mutableStateOf(0) } di dalam @Composable fun PenghitungTarget.",
          "Panggil komponen RingkasanSesi dari Materi 2.2 dan teruskan jumlahSelesai = jumlah, onTambah = { jumlah++ }, serta onReset = { jumlah = 0 }.",
          "Panggil PenghitungTarget() di MainActivity.kt, lalu klik Run (▶) di Emulator/HP dan uji klik tombol '+1 Target' serta 'Reset' berulang kali.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami kenapa kata kunci 'by' membutuhkan import getValue/setValue.",
        ],
        code: [
          {
            filename: "PenghitungTarget.kt",
            language: "kotlin",
            code: `import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue

@Composable
fun PenghitungTarget(modifier: Modifier = Modifier) {
    var jumlah by remember { mutableStateOf(0) }
    RingkasanSesi(
        jumlahSelesai = jumlah,
        onTambah = { jumlah++ },
        onReset = { jumlah = 0 }
    )
}`,
          },
        ],
        promptTujuan: "Memahami cara kerja delegate 'by remember' dan import getValue/setValue.",
        promptKonteks:
          "Saya berada di Modul 2, Materi 2.3 untuk proyek CatatanBelajar (com.belajar.catatan). RingkasanSesi sudah dibuat di Materi 2.2, dan sekarang saya menambahkan var jumlah by remember { mutableStateOf(0) } di PenghitungTarget.kt.",
        promptInstruksi: [
          "Jelaskan perbedaan memakai '=' (mengakses .value) dengan memakai delegate 'by' pada remember { mutableStateOf(0) }, serta mengapa recomposition terjadi saat tombol diklik.",
        ],
        promptBatasan: [
          "Gunakan state lokal remember { mutableStateOf(...) } saja.",
          "Jangan ubah ke ViewModel atau StateFlow dulu karena itu materi Modul 6.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman sintaks State di Compose.",
        promptValidasi: "Angka bertambah dan kembali ke 0 saat tombol Reset ditekan.",
        expectedResult: "Aplikasi penghitung sederhana bekerja interaktif.",
        validationCheck: ["Tombol +1 menambah angka.", "Tombol Reset mengembalikan ke 0."],
      }),
      makeLesson({
        id: "m2-l4",
        moduleId: "modul-2",
        num: 4,
        title: "Kerangka Layar Material 3 dengan Scaffold & TopAppBar",
        slug: "scaffold-dan-topappbar-material3",
        description:
          "Membungkus layar dengan Scaffold dan TopAppBar agar aplikasi memiliki header standar Android Material 3.",
        objective: "Mampu memasang TopAppBar di dalam Scaffold dan meneruskan innerPadding ke konten utama.",
        concept: `## Struktur Kerangka \`Scaffold\`
\`Scaffold\` menyediakan slot standar aplikasi Android: \`topBar\`, \`floatingActionButton\`, \`snackbarHost\`, dan konten utama.
Saat menggunakan \`TopAppBar\`, tambahkan anotasi \`@OptIn(ExperimentalMaterial3Api::class)\` di atas fungsi Composable.`,
        thinkingSteps: [
          "Tempatkan TopAppBar pada parameter topBar = { ... } milik Scaffold.",
          "Teruskan innerPadding ke Column konten utama agar konten tidak tertutup TopAppBar.",
        ],
        instructions: [
          "Buat file baru LayarKerangka.kt di package ui.screen dan buat @Composable fun LayarUtamaScaffold().",
          "Tambahkan anotasi @OptIn(ExperimentalMaterial3Api::class) tepat di atas fungsi LayarUtamaScaffold().",
          "Di dalam Scaffold(topBar = { ... }), pasang TopAppBar dengan title = { Text(\"CatatanBelajar\") } dan containerColor dari MaterialTheme.colorScheme.primaryContainer.",
          "Pada blok konten Scaffold { innerPadding -> ... }, panggil PenghitungTarget(modifier = Modifier.padding(innerPadding)).",
          "Panggil LayarUtamaScaffold() di MainActivity.kt (gantikan blok Scaffold lama), lalu Run di Emulator untuk memastikan TopAppBar tampil rapi di atas konten.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami fungsi @OptIn(ExperimentalMaterial3Api::class).",
        ],
        code: [
          {
            filename: "LayarKerangka.kt",
            language: "kotlin",
            code: `@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LayarUtamaScaffold() {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("CatatanBelajar") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.primary
                )
            )
        }
    ) { innerPadding ->
        PenghitungTarget(modifier = Modifier.padding(innerPadding))
    }
}`,
          },
        ],
        promptTujuan: "Memahami slot topBar dan content pada Scaffold Material 3.",
        promptKonteks:
          "Saya berada di Modul 2, Materi 2.4 untuk proyek CatatanBelajar (com.belajar.catatan). PenghitungTarget (Materi 2.3) sudah interaktif, dan sekarang saya membungkusnya dengan Scaffold + TopAppBar di LayarKerangka.kt.",
        promptInstruksi: [
          "Jelaskan fungsi @OptIn(ExperimentalMaterial3Api::class) saat memakai TopAppBar dan mengapa innerPadding wajib diteruskan ke konten utama.",
        ],
        promptBatasan: [
          "Fokus hanya pada Scaffold dan TopAppBar Material 3.",
          "Jangan tambahkan Navigation Compose atau FloatingActionButton dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman kerangka Scaffold Material 3.",
        promptValidasi: "TopAppBar tampil di atas dan konten berada tepat di bawahnya.",
        expectedResult: "Layar memiliki bilah judul Material 3 yang rapi.",
        validationCheck: ["TopAppBar muncul di bagian atas layar.", "Konten tidak tertutup TopAppBar."],
      }),
    ],
  },

  // =========================================================================
  // MODUL 3: BEKERJA DENGAN GAMBAR, IKON & RESOURCE ANDROID
  // =========================================================================
  {
    id: "modul-3",
    course_id: COURSE_INFO.id,
    module_number: 3,
    title: "Bekerja dengan Gambar, Ikon & Resource",
    slug: "modul-3-gambar-ikon-dan-resource",
    description:
      "Mengelola folder res/drawable dan strings.xml, menampilkan gambar dengan ContentScale, memotong sudut gambar, serta memakai Material Icons.",
    estimated_minutes: 60,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 3,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m3-l1",
        moduleId: "modul-3",
        num: 1,
        title: "Mengenal Folder res/drawable & Impor Gambar ke Proyek",
        slug: "mengenal-res-drawable",
        description:
          "Cara memasukkan file PNG/JPG/WebP ke folder res/drawable dengan aturan penamaan resource Android yang valid.",
        objective: "Mampu mengimpor aset gambar ke res/drawable tanpa error penamaan resource.",
        concept: `## Aturan Penamaan File di \`res/drawable\`
Android sangat ketat soal nama file resource:
- Hanya boleh **huruf kecil** (\`a-z\`), **angka** (\`0-9\`), dan **garis bawah** (\`_\`).
- **Dilarang** memakai spasi, tanda hubung (\`-\`), huruf kapital, atau diawali angka! Contoh valid: \`banner_belajar.png\`.`,
        thinkingSteps: [
          "Siapkan 1 gambar ilustrasi atau ikon berformat PNG/JPG.",
          "Ganti nama file menjadi huruf kecil dengan underscore sebelum disalin ke app/src/main/res/drawable.",
        ],
        instructions: [
          "Siapkan 1 file gambar (PNG/JPG/WebP) di komputer Anda dan ubah namanya menjadi huruf kecil dengan garis bawah, misalnya: ilustrasi_belajar.png.",
          "Di Android Studio, buka menu Tools → Resource Manager (atau klik panel Resource Manager di sisi kiri).",
          "Klik tombol '+' (Add resources to the module) → pilih 'Import Drawables', lalu pilih file ilustrasi_belajar.png.",
          "Pastikan Qualifier Type disetel default (No Density / nodpi atau drawable), lalu klik Next → Import.",
          "Periksa di panel Project bahwa file sudah masuk ke app/src/main/res/drawable/ilustrasi_belajar.png dan ID R.drawable.ilustrasi_belajar dikenali tanpa garis merah.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami aturan ketat penamaan resource Android.",
        ],
        promptTujuan: "Memahami aturan penamaan file resource Android di folder res/drawable.",
        promptKonteks:
          "Saya berada di Modul 3, Materi 3.1 untuk proyek CatatanBelajar (com.belajar.catatan). Layar Scaffold dasar dari Modul 2 sudah ada, dan sekarang saya mengimpor gambar ke app/src/main/res/drawable.",
        promptInstruksi: [
          "Jelaskan kenapa nama file 'Banner-Belajar 1.png' menyebabkan build error di Android dan sebutkan aturan penamaan yang benar.",
        ],
        promptBatasan: [
          "Fokus hanya pada aturan folder res/drawable Android.",
          "Jangan tambahkan library pemuat gambar eksternal seperti Coil dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman konvensi penamaan resource Android.",
        promptValidasi: "R.drawable.ilustrasi_belajar dikenali tanpa garis merah.",
        expectedResult: "Aset gambar siap dipanggil lewat R.drawable.",
        validationCheck: ["Nama file hanya huruf kecil dan underscore.", "Tidak ada error build pada resource."],
      }),
      makeLesson({
        id: "m3-l2",
        moduleId: "modul-3",
        num: 2,
        title: "Menampilkan Image dengan ContentScale & Clip Sudut Membulat",
        slug: "menampilkan-image-contentscale-clip",
        description:
          "Menampilkan gambar di Jetpack Compose dengan proporsi tepat (ContentScale.Crop) dan sudut membulat (RoundedCornerShape).",
        objective: "Mampu menampilkan gambar yang proporsional dan tidak gepeng di berbagai ukuran layar.",
        concept: `## Proporsi Gambar dengan \`ContentScale\`
- \`ContentScale.Crop\`: Mengisi penuh ukuran kotak sambil menjaga rasio aspek (memotong pinggir yang berlebih agar gambar tidak gepeng).
- \`ContentScale.Fit\`: Menampilkan seluruh gambar utuh di dalam kotak.
- Tambahkan \`.clip(RoundedCornerShape(12.dp))\` pada \`Modifier\` untuk memberi sudut melengkung yang rapi.`,
        thinkingSteps: [
          "Selalu isi parameter contentDescription untuk aksesibilitas pembaca layar.",
          "Atur tinggi tetap (misal .height(160.dp)) dan .fillMaxWidth() agar gambar konsisten.",
        ],
        instructions: [
          "Buat file baru ui/component/BannerIlustrasi.kt di dalam package com.belajar.catatan.",
          "Tambahkan komponen Image dengan painter = painterResource(id = R.drawable.ilustrasi_belajar) dan isi contentDescription = \"Ilustrasi catatan belajar\".",
          "Tambahkan parameter contentScale = ContentScale.Crop agar gambar memenuhi kotak tanpa terlihat gepeng.",
          "Atur modifier = modifier.fillMaxWidth().height(160.dp).clip(RoundedCornerShape(12.dp)) untuk memberi tinggi tetap dan sudut membulat.",
          "Tambahkan @Preview(showBackground = true) untuk melihat BannerIlustrasi di tab Split, lalu panggil BannerIlustrasi() di HalamanUtama.",
          "Salin Prompt AI di bawah ke Gemini untuk membandingkan ContentScale.Crop dan ContentScale.Fit.",
        ],
        code: [
          {
            filename: "BannerIlustrasi.kt",
            language: "kotlin",
            code: `@Composable
fun BannerIlustrasi(modifier: Modifier = Modifier) {
    Image(
        painter = painterResource(id = R.drawable.ilustrasi_belajar),
        contentDescription = "Ilustrasi catatan belajar",
        contentScale = ContentScale.Crop,
        modifier = modifier
            .fillMaxWidth()
            .height(160.dp)
            .clip(RoundedCornerShape(12.dp))
    )
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan ContentScale.Crop, Fit, dan FillBounds di Jetpack Compose.",
        promptKonteks:
          "Saya berada di Modul 3, Materi 3.2 untuk proyek CatatanBelajar (com.belajar.catatan). Gambar ilustrasi_belajar.png sudah masuk ke res/drawable (Materi 3.1), dan sekarang saya membuat komponen BannerIlustrasi.kt.",
        promptInstruksi: [
          "Jelaskan kapan sebaiknya memakai ContentScale.Crop dibanding ContentScale.Fit pada komponen Image di BannerIlustrasi.kt.",
        ],
        promptBatasan: [
          "Fokus hanya pada komponen Image, painterResource, ContentScale, dan Modifier.clip.",
          "Jangan gunakan library eksternal seperti Coil/Glide.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman pengaturan rasio gambar di Compose.",
        promptValidasi: "Gambar tampil proporsional dengan sudut membulat di Preview.",
        expectedResult: "Gambar banner tampil penuh, tajam, dan tidak gepeng.",
        validationCheck: ["Gambar tampil dengan sudut membulat.", "contentDescription terisi."],
      }),
      makeLesson({
        id: "m3-l3",
        moduleId: "modul-3",
        num: 3,
        title: "Menggunakan Material Icons & IconButton",
        slug: "material-icons-dan-iconbutton",
        description:
          "Menambahkan ikon vektor bawaan Material Design dan tombol ikon interaktif pada baris judul atau kartu.",
        objective: "Mampu memakai Icon dan IconButton serta menambahkan material-icons-extended jika butuh lebih banyak ikon.",
        concept: `## Ikon Vektor di Compose
Compose sudah menyertakan ikon dasar di \`Icons.Default.*\` (seperti \`Add\`, \`Delete\`, \`Edit\`, \`Check\`, \`ArrowBack\`).
Jika butuh ikon lebih lengkap (misal \`Icons.Default.Bookmark\`), tambahkan \`androidx.compose.material:material-icons-extended\` ke \`libs.versions.toml\`.`,
        thinkingSteps: [
          "Gunakan IconButton jika ikon harus bisa diklik (otomatis memberi area sentuh 48.dp).",
          "Gunakan tint = MaterialTheme.colorScheme.primary untuk mewarnai ikon.",
        ],
        instructions: [
          "Buat file baru ui/component/TombolIkon.kt di package com.belajar.catatan.",
          "Buat @Composable fun TombolTambahIkon(onClick: () -> Unit) menggunakan IconButton(onClick = onClick).",
          "Di dalam IconButton, pasang Icon(imageVector = Icons.Default.Add, contentDescription = \"Tambah catatan\", tint = MaterialTheme.colorScheme.primary).",
          "Pasang ikon aksi di parameter actions = { ... } milik TopAppBar pada LayarKerangka.kt (misal tombol Info).",
          "Jalankan di Emulator atau Preview Interaktif, lalu ketuk ikon untuk memastikan efek riak (ripple) Material muncul.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami standar aksesibilitas IconButton.",
        ],
        code: [
          {
            filename: "TombolIkon.kt",
            language: "kotlin",
            code: `@Composable
fun TombolTambahIkon(onClick: () -> Unit) {
    IconButton(onClick = onClick) {
        Icon(
            imageVector = Icons.Default.Add,
            contentDescription = "Tambah catatan",
            tint = MaterialTheme.colorScheme.primary
        )
    }
}`,
          },
        ],
        promptTujuan: "Memahami alasan memakai IconButton daripada Modifier.clickable langsung pada Icon.",
        promptKonteks:
          "Saya berada di Modul 3, Materi 3.3 untuk proyek CatatanBelajar (com.belajar.catatan). BannerIlustrasi (Materi 3.2) sudah selesai, dan sekarang saya menambahkan Icon serta IconButton di TombolIkon.kt dan TopAppBar.",
        promptInstruksi: [
          "Jelaskan keuntungan aksesibilitas dan ukuran area sentuh (touch target 48.dp) saat memakai IconButton dibanding Modifier.clickable langsung pada Icon.",
        ],
        promptBatasan: [
          "Gunakan Icons.Default.* yang sudah ada di proyek.",
          "Jangan tambahkan Navigation Compose dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman standar aksesibilitas tombol ikon Android.",
        promptValidasi: "Ikon dapat diklik dengan efek riak (ripple) Material.",
        expectedResult: "Tombol ikon muncul rapi dan memiliki efek klik.",
        validationCheck: ["Ikon tampil jelas.", "Klik memicu aksi onClick."],
      }),
      makeLesson({
        id: "m3-l4",
        moduleId: "modul-3",
        num: 4,
        title: "Mengelola Teks dengan res/values/strings.xml",
        slug: "mengelola-teks-strings-xml",
        description:
          "Memindahkan teks statis dari kode Kotlin ke strings.xml agar mudah diterjemahkan ke berbagai bahasa.",
        objective: "Mampu menyimpan teks di strings.xml dan memanggilnya lewat stringResource(R.string.*).",
        concept: `## Mengapa Tidak Menulis Teks Mentah di Kode?
Menyimpan semua label tombol dan judul di \`res/values/strings.xml\` memudahkan pemeliharaan teks dan mendukung multi-bahasa (misal \`values-en/strings.xml\`). Di Compose, panggil dengan \`stringResource(R.string.nama_string)\`.`,
        thinkingSteps: [
          "Buka app/src/main/res/values/strings.xml.",
          "Tambahkan entri <string name=\"...\">...</string> untuk judul dan tombol.",
        ],
        instructions: [
          "Buka file app/src/main/res/values/strings.xml di panel Project Android Studio.",
          "Tambahkan entri <string name=\"judul_app\">CatatanBelajar</string>, <string name=\"tombol_simpan\">Simpan</string>, dan <string name=\"sapa_pengguna\">Halo, %1$s!</string>.",
          "Buka LayarKerangka.kt dan ganti teks mentah \"CatatanBelajar\" pada TopAppBar dengan stringResource(R.string.judul_app).",
          "Ganti juga label tombol di komponen Anda menjadi stringResource(R.string.tombol_simpan).",
          "Cek panel Split Preview untuk memastikan semua teks dari strings.xml tampil normal tanpa error XML.",
          "Salin Prompt AI di bawah ke Gemini untuk melihat cara memanggil placeholder %1$s dengan stringResource().",
        ],
        code: [
          {
            filename: "res/values/strings.xml",
            language: "xml",
            code: `<resources>
    <string name="app_name">CatatanBelajar</string>
    <string name="tombol_simpan">Simpan</string>
    <string name="sapa_pengguna">Halo, %1$s!</string>
</resources>`,
          },
        ],
        promptTujuan: "Memahami cara memakai placeholder %1$s di strings.xml bersama stringResource().",
        promptKonteks:
          "Saya berada di Modul 3, Materi 3.4 untuk proyek CatatanBelajar (com.belajar.catatan). Saya sedang memindahkan teks hardcoded dari file Compose ke app/src/main/res/values/strings.xml.",
        promptInstruksi: [
          "Tunjukkan cara memanggil string 'sapa_pengguna' yang memiliki placeholder %1$s menggunakan stringResource() di Jetpack Compose.",
        ],
        promptBatasan: [
          "Fokus hanya pada strings.xml dan stringResource().",
          "Tunjukkan maksimal 3 baris contoh pemanggilan di Compose.",
        ],
        promptHasilAkhir: "Pemahaman resource string dinamis dengan argumen.",
        promptValidasi: "Teks tampil dari strings.xml di Preview dan Emulator.",
        expectedResult: "Aplikasi membaca label teks dari strings.xml.",
        validationCheck: ["strings.xml diperbarui tanpa error XML.", "stringResource() tampil benar."],
      }),
    ],
  },

  // =========================================================================
  // MODUL 4: MENERIMA INPUT PENGGUNA, VALIDASI & STATE HOISTING
  // =========================================================================
  {
    id: "modul-4",
    course_id: COURSE_INFO.id,
    module_number: 4,
    title: "Menerima Input Pengguna & Validasi Form",
    slug: "modul-4-input-pengguna-dan-validasi",
    description:
      "Membangun form interaktif dengan OutlinedTextField, RadioButton, Switch, validasi error form (isError), serta merapikan state dengan State Hoisting.",
    estimated_minutes: 65,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 4,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m4-l1",
        moduleId: "modul-4",
        num: 1,
        title: "Kotak Input OutlinedTextField & KeyboardOptions",
        slug: "outlined-textfield-dan-keyboard-options",
        description:
          "Membuat input teks dengan label, placeholder, tombol aksi keyboard (ImeAction), dan tipe keyboard khusus angka/teks.",
        objective: "Mampu membuat form ketikan dengan OutlinedTextField dan mengatur KeyboardOptions.",
        concept: `## Pola Input Terkontrol
\`OutlinedTextField\` menerima \`value\` (teks saat ini) dan \`onValueChange\` (callback saat user mengetik). Atur \`singleLine = true\` dan \`keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next)\` agar user nyaman berpindah kolom form.`,
        thinkingSteps: [
          "Siapkan state String untuk judul dan catatan.",
          "Gunakan KeyboardType.Number jika input khusus angka (misal target menit belajar).",
        ],
        instructions: [
          "Buat file baru ui/screen/FormInputMateri.kt di package com.belajar.catatan.",
          "Buat @Composable fun KolomJudul(nilai: String, onUbah: (String) -> Unit) menggunakan OutlinedTextField dengan label = { Text(\"Judul Materi\") }.",
          "Tambahkan singleLine = true dan keyboardOptions = KeyboardOptions(capitalization = KeyboardCapitalization.Sentences, imeAction = ImeAction.Next).",
          "Tambahkan satu OutlinedTextField kedua untuk 'Target Menit Belajar' dengan keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number, imeAction = ImeAction.Done).",
          "Jalankan di Emulator, ketuk masing-masing kolom, dan pastikan keyboard angka serta tombol Next/Done muncul sesuai konfigurasi.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami perbedaan KeyboardType dan ImeAction.",
        ],
        code: [
          {
            filename: "FormInputMateri.kt",
            language: "kotlin",
            code: `@Composable
fun KolomJudul(nilai: String, onUbah: (String) -> Unit) {
    OutlinedTextField(
        value = nilai,
        onValueChange = onUbah,
        label = { Text("Judul Materi") },
        singleLine = true,
        keyboardOptions = KeyboardOptions(
            capitalization = KeyboardCapitalization.Sentences,
            imeAction = ImeAction.Next
        ),
        modifier = Modifier.fillMaxWidth()
    )
}`,
          },
        ],
        promptTujuan: "Memahami konfigurasi KeyboardOptions dan ImeAction di Jetpack Compose.",
        promptKonteks:
          "Saya berada di Modul 4, Materi 4.1 untuk proyek CatatanBelajar (com.belajar.catatan). Dasar layout & resource dari Modul 1–3 sudah selesai, dan sekarang saya membuat FormInputMateri.kt berisi OutlinedTextField untuk Judul Materi dan Target Menit.",
        promptInstruksi: [
          "Jelaskan fungsi KeyboardType.Number dan ImeAction.Done pada OutlinedTextField serta kapan keduanya perlu digabungkan.",
        ],
        promptBatasan: [
          "Fokus hanya pada OutlinedTextField dan KeyboardOptions.",
          "Jangan tambahkan validasi error (Materi 4.3), ViewModel, atau Room dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman pengaturan keyboard virtual Android.",
        promptValidasi: "Keyboard memunculkan tombol Next/Done sesuai pengaturan.",
        expectedResult: "Kotak ketikan berfungsi mulus dengan label mengambang.",
        validationCheck: ["Teks bisa diketik dan dihapus.", "KeyboardOptions sesuai jenis input."],
      }),
      makeLesson({
        id: "m4-l2",
        moduleId: "modul-4",
        num: 2,
        title: "Pilihan Kategori dengan RadioButton & Switch",
        slug: "radiobutton-dan-switch-compose",
        description:
          "Menyediakan pilihan kategori tunggal (Teori / Praktik / Proyek) dengan RadioButton dan opsi aktif dengan Switch.",
        objective: "Mampu membuat kelompok RadioButton yang dapat diklik seluruh barisnya.",
        concept: `## Kelompok Pilihan \`RadioButton\`
Agar pengguna mudah memilih, jangan hanya membuat lingkaran \`RadioButton\` yang bisa diklik—buat seluruh baris \`Row\` bisa dipilih dengan \`Modifier.selectable(...)\` dan beri \`role = Role.RadioButton\` untuk aksesibilitas.`,
        thinkingSteps: [
          "Siapkan daftar pilihan kategori: listOf(\"Teori\", \"Praktik\", \"Proyek\").",
          "Simpan pilihan terpilih ke dalam state String.",
        ],
        instructions: [
          "Buat file baru ui/component/PilihanKategori.kt di package com.belajar.catatan.",
          "Buat daftar pilihan kategori: listOf(\"Teori\", \"Praktik\", \"Proyek\") dan state terpilih di layar pemanggil.",
          "Susun opsi dalam Column(Modifier.selectableGroup()) dengan Row per opsi yang memakai Modifier.selectable(selected = ..., onClick = ..., role = Role.RadioButton).",
          "Di dalam Row, pasang RadioButton(selected = (opsi == terpilih), onClick = null) diikuti Text(text = opsi).",
          "Di bawah kelompok RadioButton, tambahkan Row dengan Text(\"Prioritas Tinggi\") dan komponen Switch(checked = ..., onCheckedChange = ...).",
          "Uji di tab Split Preview / Emulator dengan mengetuk teks opsi, lalu salin Prompt AI di bawah ke Gemini.",
        ],
        code: [
          {
            filename: "PilihanKategori.kt",
            language: "kotlin",
            code: `@Composable
fun PilihanKategori(
    daftar: List<String>,
    terpilih: String,
    onPilih: (String) -> Unit
) {
    Column(Modifier.selectableGroup()) {
        daftar.forEach { opsi ->
            Row(
                Modifier
                    .fillMaxWidth()
                    .selectable(
                        selected = (opsi == terpilih),
                        onClick = { onPilih(opsi) },
                        role = Role.RadioButton
                    )
                    .padding(vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                RadioButton(selected = (opsi == terpilih), onClick = null)
                Text(text = opsi, modifier = Modifier.padding(start = 12.dp))
            }
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami alasan onClick = null pada RadioButton saat baris Row sudah memakai Modifier.selectable.",
        promptKonteks:
          "Saya berada di Modul 4, Materi 4.2 untuk proyek CatatanBelajar (com.belajar.catatan). FormInputMateri.kt (Materi 4.1) sudah ada, dan sekarang saya membangun PilihanKategori.kt dengan RadioButton + Switch.",
        promptInstruksi: [
          "Jelaskan kenapa menaruh onClick = null di RadioButton dan menaruhnya di Row (via Modifier.selectable) lebih baik untuk aksesibilitas dan UX.",
        ],
        promptBatasan: [
          "Fokus hanya pada RadioButton, Modifier.selectable, dan Switch.",
          "Jangan tambahkan ViewModel atau Room dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman pola seleksi baris Material 3.",
        promptValidasi: "Mengetuk teks kategori langsung memindahkan pilihan RadioButton.",
        expectedResult: "Pengguna dapat memilih kategori dengan nyaman di area baris yang luas.",
        validationCheck: ["Hanya 1 kategori terpilih dalam satu waktu.", "Seluruh baris dapat diklik."],
      }),
      makeLesson({
        id: "m4-l3",
        moduleId: "modul-4",
        num: 3,
        title: "Validasi Form: isError, supportingText, dan Pesan Kesalahan",
        slug: "validasi-form-iserror-supportingtext",
        description:
          "Menampilkan indikator merah dan pesan kesalahan di bawah OutlinedTextField apabila input masih kosong atau tidak valid.",
        objective: "Mampu memvalidasi input form saat tombol Simpan ditekan dan menampilkan pesan error yang ramah.",
        concept: `## Validasi yang Membantu Pengguna
Jangan langsung membiarkan data kosong tersimpan. Gunakan state \`judulError: Boolean\` bersama parameter:
- \`isError = judulError\` (mengubah garis kotak jadi merah)
- \`supportingText = { if (judulError) Text("Judul tidak boleh kosong") }\`
- \`trailingIcon\` ikon peringatan saat \`isError = true\`.`,
        thinkingSteps: [
          "Cek kondisi validasi di handler tombol Simpan: judulError = judul.isBlank().",
          "Jika judulError bernilai true, batalkan penyimpanan dan tampilkan supportingText.",
        ],
        instructions: [
          "Buka FormInputMateri.kt dan tambahkan state var judulError by remember { mutableStateOf(false) }.",
          "Tambahkan parameter isError = judulError, supportingText = { if (judulError) Text(\"Judul materi wajib diisi!\") }, dan trailingIcon peringatan di OutlinedTextField.",
          "Di dalam onValueChange = { judul = it; judulError = false }, pastikan error otomatis hilang saat pengguna mengetik ulang.",
          "Tambahkan Button('Simpan') yang mengecek if (judul.isBlank()) { judulError = true; return@Button } sebelum memproses penyimpanan.",
          "Jalankan di Emulator: tekan Simpan dalam keadaan kosong (harus muncul garis merah), lalu ketik 1 huruf untuk memastikan merahnya hilang.",
          "Salin Prompt AI di bawah ke Gemini untuk memvalidasi pola UX error form Anda.",
        ],
        code: [
          {
            filename: "ValidasiInput.kt",
            language: "kotlin",
            code: `OutlinedTextField(
    value = judul,
    onValueChange = {
        judul = it
        judulError = false
    },
    label = { Text("Judul Materi") },
    isError = judulError,
    supportingText = {
        if (judulError) Text("Judul materi wajib diisi!")
    },
    trailingIcon = {
        if (judulError) Icon(Icons.Default.Warning, contentDescription = "Error")
    },
    modifier = Modifier.fillMaxWidth()
)`,
          },
        ],
        promptTujuan: "Memahami alur reset error saat pengguna mengetik ulang di Compose.",
        promptKonteks:
          "Saya berada di Modul 4, Materi 4.3 untuk proyek CatatanBelajar (com.belajar.catatan). KolomJudul dan PilihanKategori sudah ada, dan sekarang saya menambahkan validasi isError + supportingText pada OutlinedTextField.",
        promptInstruksi: [
          "Jelaskan kenapa penting mengubah judulError = false di dalam onValueChange dan bagaimana alur validasi saat tombol Simpan ditekan.",
        ],
        promptBatasan: [
          "Fokus hanya pada validasi state lokal di OutlinedTextField.",
          "Jangan gunakan ViewModel atau Snackbar/Dialog dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman UX validasi form yang responsif.",
        promptValidasi: "Menekan Simpan saat kosong memunculkan pesan merah; mengetik huruf langsung menghilangkan merahnya.",
        expectedResult: "Form menolak input kosong dan memberi tahu pengguna apa yang kurang.",
        validationCheck: ["Garis merah dan pesan tampil saat submit kosong.", "Error hilang saat kolom diisi."],
      }),
      makeLesson({
        id: "m4-l4",
        moduleId: "modul-4",
        num: 4,
        title: "Merapikan Komponen dengan Pola State Hoisting",
        slug: "pola-state-hoisting-compose",
        description:
          "Memindahkan state dari komponen kecil ke komponen induk agar komponen lebih mudah diuji dan dipakai ulang.",
        objective: "Mampu menerapkan State Hoisting (mengalirkan data ke bawah, event ke atas).",
        concept: `## Prinsip *State Hoisting*
Komponen yang tidak menyimpan \`remember\` di dalamnya (*stateless*) jauh lebih fleksibel dan mudah di-Preview. Caranya, angkat \`var nilai\` ke layar induk, lalu kirim dua hal ke komponen anak:
1. **\`nilai: String\`** (data yang mengalir ke bawah)
2. **\`onNilaiUbah: (String) -> Unit\`** (event yang mengalir ke atas).`,
        thinkingSteps: [
          "Identifikasi komponen form yang sebelumnya menyimpan remember sendiri.",
          "Ubah menjadi parameter (value, onValueChange) dan simpan state-nya di layar induk.",
        ],
        instructions: [
          "Periksa kembali KolomJudul dan PilihanKategori Anda: pastikan tidak ada remember { mutableStateOf(...) } di dalam komponen anak tersebut.",
          "Buat layar induk FormCatatanScreen.kt di package ui.screen yang menyimpan state judul, kategori, prioritas, dan judulError.",
          "Kirimkan nilai (value) dan callback (onValueChange / onPilih) dari FormCatatanScreen ke KolomJudul dan PilihanKategori.",
          "Tambahkan @Preview terpisah untuk KolomJudul dengan data dummy tanpa perlu state internal.",
          "Jalankan FormCatatanScreen di MainActivity.kt untuk memastikan seluruh input tetap bekerja persis seperti sebelumnya.",
          "Salin Prompt AI di bawah ke Gemini untuk mereview pemahaman Anda tentang pola State Hoisting.",
        ],
        promptTujuan: "Memahami manfaat State Hoisting pada komponen Jetpack Compose.",
        promptKonteks:
          "Saya berada di Modul 4, Materi 4.4 untuk proyek CatatanBelajar (com.belajar.catatan). Komponen form dari Materi 4.1–4.3 sudah lengkap, dan sekarang saya merapikannya dengan pola State Hoisting ke FormCatatanScreen.kt.",
        promptInstruksi: [
          "Sebutkan 2 keuntungan utama membuat komponen form (KolomJudul, PilihanKategori) menjadi stateless dengan pola State Hoisting.",
        ],
        promptBatasan: [
          "Gunakan remember di FormCatatanScreen saja.",
          "Belum masuk ke Navigation Compose (Modul 5) atau ViewModel (Modul 6).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman pola arsitektur Compose yang bersih.",
        promptValidasi: "Komponen form bisa di-Preview dengan data dummy tanpa state internal.",
        expectedResult: "Komponen input bersih, modular, dan siap dipakai di berbagai layar.",
        validationCheck: ["Komponen anak menerima value dan onChange callback.", "Preview tetap berjalan lancar."],
      }),
    ],
  },

  // =========================================================================
  // MODUL 5: NAVIGASI ANTAR LAYAR DENGAN NAVIGATION COMPOSE
  // =========================================================================
  {
    id: "modul-5",
    course_id: COURSE_INFO.id,
    module_number: 5,
    title: "Navigasi Antar Layar (Navigation Compose)",
    slug: "modul-5-navigation-compose",
    description:
      "Menambahkan Navigation Compose, mendefinisikan rute layar yang aman, membangun NavHost, dan memasang tombol Back di TopAppBar.",
    estimated_minutes: 65,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 5,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m5-l1",
        moduleId: "modul-5",
        num: 1,
        title: "Menambahkan Dependensi navigation-compose di Gradle",
        slug: "dependensi-navigation-compose",
        description:
          "Menambahkan library androidx.navigation:navigation-compose melalui Version Catalog libs.versions.toml.",
        objective: "Mampu menambahkan library resmi Navigation Compose dan melakukan Sync Gradle.",
        concept: `## Mengapa Pakai Navigation Compose?
Untuk aplikasi multi-layar nyata, Jetpack **Navigation Compose** otomatis mengatur tumpukan layar (*back stack*), tombol Back bawaan HP Android, dan animasi transisi antar halaman.`,
        thinkingSteps: [
          "Tambahkan versi navigationCompose di [versions] pada libs.versions.toml.",
          "Tambahkan definisi library di [libraries], lalu panggil implementation(libs.androidx.navigation.compose) di app/build.gradle.kts.",
        ],
        instructions: [
          "Buka file gradle/libs.versions.toml di panel Project (Gradle Scripts).",
          "Di bawah bagian [versions], tambahkan baris: navigationCompose = \"2.9.0\" (atau versi stabil terbaru yang disarankan Android Studio).",
          "Di bawah bagian [libraries], tambahkan: androidx-navigation-compose = { group = \"androidx.navigation\", name = \"navigation-compose\", version.ref = \"navigationCompose\" }.",
          "Buka file app/build.gradle.kts, lalu di dalam blok dependencies { ... } tambahkan implementation(libs.androidx.navigation.compose).",
          "Klik tombol biru 'Sync Now' di banner kuning atas editor dan tunggu proses Gradle Sync selesai tanpa error.",
          "Jika muncul error sinkronisasi atau Unresolved reference, salin Prompt AI di bawah ke Gemini untuk mengatasinya.",
        ],
        code: [
          {
            filename: "gradle/libs.versions.toml",
            language: "toml",
            code: `[versions]
navigationCompose = "2.9.0"

[libraries]
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }`,
          },
          {
            filename: "app/build.gradle.kts",
            language: "kotlin",
            code: `dependencies {
    implementation(libs.androidx.navigation.compose)
}`,
          },
        ],
        promptTujuan: "Memahami cara menambah library baru dengan aman lewat Gradle Version Catalog.",
        promptKonteks:
          "Saya berada di Modul 5, Materi 5.1 untuk proyek CatatanBelajar (com.belajar.catatan). Semua layar form & state lokal dari Modul 1–4 sudah selesai, dan sekarang saya menambahkan library androidx-navigation-compose di gradle/libs.versions.toml serta app/build.gradle.kts.",
        promptInstruksi: [
          "Jelaskan urutan langkah jika muncul error 'Unresolved reference: navigation' atau Gradle Sync gagal setelah mengedit libs.versions.toml.",
        ],
        promptBatasan: [
          "Fokus hanya pada konfigurasi Gradle Navigation Compose.",
          "Jangan ubah atau tambahkan library ViewModel atau Room dulu.",
          "Maksimal 3 poin singkat.",
        ],
        promptHasilAkhir: "Library Navigation Compose terpasang dan siap dipakai.",
        promptValidasi: "Sync Gradle selesai tanpa error.",
        expectedResult: "rememberNavController() dapat di-import di file Kotlin.",
        validationCheck: ["Sync Now berhasil.", "NavHost dikenali oleh Android Studio."],
      }),
      makeLesson({
        id: "m5-l2",
        moduleId: "modul-5",
        num: 2,
        title: "Mendefinisikan Rute Layar (Screen) & Membangun NavHost",
        slug: "definisi-screen-dan-navhost",
        description:
          "Membuat daftar rute layar dengan sealed class dan menyusun peta navigasi NavHost.",
        objective: "Mampu membuat Screen routes yang terstruktur dan NavHost dengan startDestination.",
        concept: `## Peta Jalan Aplikasi: \`NavHost\`
- **\`NavController\`:** Pengemudi yang memindahkan kita dari satu layar ke layar lain.
- **\`NavHost\`:** Peta jalan yang mendaftarkan setiap alamat (\`route\`) dan layar Composable mana yang harus tampil.`,
        thinkingSteps: [
          "Buat sealed class Screen(val route: String) agar nama rute tidak salah ketik.",
          "Daftarkan composable(Screen.Utama.route) dan composable(Screen.Tentang.route) di dalam NavHost.",
        ],
        instructions: [
          "Di bawah package com.belajar.catatan, buat package baru bernama 'navigation'.",
          "Di dalam package navigation, buat file Screen.kt berisi sealed class Screen(val route: String) dengan data object Utama dan Tentang.",
          "Buat file kedua navigation/NavGraph.kt berisi @Composable fun SetupNavGraph(navController: NavHostController = rememberNavController()).",
          "Di dalam NavHost(navController, startDestination = Screen.Utama.route), daftarkan composable(Screen.Utama.route) dan composable(Screen.Tentang.route).",
          "Buka MainActivity.kt dan panggil SetupNavGraph() di dalam CatatanBelajarTheme { ... }.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami kenapa sealed class lebih aman daripada string rute biasa.",
        ],
        code: [
          {
            filename: "navigation/Screen.kt",
            language: "kotlin",
            code: `sealed class Screen(val route: String) {
    data object Utama : Screen("utama")
    data object Tentang : Screen("tentang")
}`,
          },
          {
            filename: "navigation/NavGraph.kt",
            language: "kotlin",
            code: `@Composable
fun SetupNavGraph(navController: NavHostController = rememberNavController()) {
    NavHost(
        navController = navController,
        startDestination = Screen.Utama.route
    ) {
        composable(Screen.Utama.route) {
            HalamanUtama(onBukaTentang = { navController.navigate(Screen.Tentang.route) })
        }
        composable(Screen.Tentang.route) {
            HalamanTentang(onKembali = { navController.popBackStack() })
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan sealed class Screen dengan menulis string rute langsung.",
        promptKonteks:
          "Saya berada di Modul 5, Materi 5.2 untuk proyek CatatanBelajar (com.belajar.catatan). Dependensi navigation-compose sudah terpasang (Materi 5.1), dan sekarang saya membuat navigation/Screen.kt serta navigation/NavGraph.kt.",
        promptInstruksi: [
          "Jelaskan kenapa lebih aman membungkus string rute di sealed class Screen daripada mengetik \"tentang\" berulang kali di NavHost dan navigate().",
        ],
        promptBatasan: [
          "Fokus hanya pada rute statis Utama dan Tentang tanpa argumen ID dulu (argumen dibahas di Modul 8).",
          "Jangan tambahkan ViewModel atau Room dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Peta navigasi NavHost siap digunakan di MainActivity.",
        promptValidasi: "SetupNavGraph() dapat dipanggil dari setContent di MainActivity.kt.",
        expectedResult: "Layar Utama tampil sebagai halaman pertama saat aplikasi dibuka.",
        validationCheck: ["Screen.kt dan NavGraph.kt tidak memiliki error merah."],
      }),
      makeLesson({
        id: "m5-l3",
        moduleId: "modul-5",
        num: 3,
        title: "Berpindah Layar dengan navigate() dan popBackStack()",
        slug: "navigate-dan-popbackstack",
        description:
          "Memahami tumpukan layar (back stack) saat berpindah ke halaman baru dan kembali ke halaman sebelumnya.",
        objective: "Mampu berpindah antar layar tanpa menumpuk halaman ganda di back stack.",
        concept: `## Cara Kerja Back Stack
- \`navController.navigate(rute)\`: Menaruh layar baru di atas tumpukan.
- \`navController.popBackStack()\`: Menutup layar paling atas dan kembali ke layar sebelumnya (sama seperti menekan tombol Back HP).
- Jangan pernah memanggil \`popBackStack()\` jika tumpukan sudah di layar awal agar layar tidak menjadi putih kosong! Gunakan \`navigateUp()\`.`,
        thinkingSteps: [
          "Sambungkan aksi tombol Info di TopAppBar ke navController.navigate(Screen.Tentang.route).",
          "Uji tombol Back fisik/gestur Android saat berada di Halaman Tentang.",
        ],
        instructions: [
          "Buat file baru ui/screen/HalamanTentang.kt di package com.belajar.catatan.",
          "Tambahkan parameter onKembali: () -> Unit pada @Composable fun HalamanTentang(onKembali: () -> Unit).",
          "Di dalam HalamanTentang, tampilkan teks deskripsi singkat aplikasi CatatanBelajar dan sebuah Button('Kembali') yang memanggil onKembali().",
          "Sambungkan tombol Info di HalamanUtama agar memanggil navController.navigate(Screen.Tentang.route).",
          "Jalankan di Emulator: buka Halaman Tentang, coba tekan tombol Kembali di layar maupun tombol Back sistem Android.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami perbedaan popBackStack() dan navigateUp().",
        ],
        promptTujuan: "Memahami perbedaan popBackStack() dan navigateUp() di Navigation Compose.",
        promptKonteks:
          "Saya berada di Modul 5, Materi 5.3 untuk proyek CatatanBelajar (com.belajar.catatan). Screen.kt dan NavGraph.kt sudah dibuat (Materi 5.2), dan sekarang saya menguji perpindahan antar layar HalamanUtama dan HalamanTentang.",
        promptInstruksi: [
          "Jelaskan risiko memanggil popBackStack() terlalu cepat (misal saat pengguna mengetuk tombol kembali 2x) dan bagaimana navigateUp() membantu mencegah layar kosong.",
        ],
        promptBatasan: [
          "Fokus hanya pada NavController navigate, popBackStack, dan navigateUp.",
          "Belum menggunakan route arguments (Modul 8) atau ViewModel (Modul 6).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Navigasi maju dan mundur berjalan mulus tanpa layar kosong.",
        promptValidasi: "Tombol Back HP dan tombol Kembali di layar berfungsi identik.",
        expectedResult: "Berpindah antara Layar Utama dan Layar Tentang berjalan mulus.",
        validationCheck: ["Bisa membuka Halaman Tentang dan kembali ke Halaman Utama."],
      }),
      makeLesson({
        id: "m5-l4",
        moduleId: "modul-5",
        num: 4,
        title: "Memasang Tombol Back (navigationIcon) di TopAppBar",
        slug: "tombol-back-di-topappbar",
        description:
          "Menambahkan ikon panah kembali di pojok kiri atas TopAppBar pada halaman sekunder sesuai standar Material 3.",
        objective: "Mampu memasang navigationIcon dengan Icons.AutoMirrored.Filled.ArrowBack.",
        concept: `## Standar Tombol Kembali Material 3
Di halaman kedua (seperti \`HalamanTentang\` atau \`HalamanDetail\`), pengguna berharap ada panah kembali di kiri atas \`TopAppBar\`. Gunakan \`Icons.AutoMirrored.Filled.ArrowBack\` di slot \`navigationIcon\` milik \`TopAppBar\`.`,
        thinkingSteps: [
          "Tambahkan parameter navigationIcon = { IconButton(onClick = onKembali) { ... } } di TopAppBar halaman kedua.",
        ],
        instructions: [
          "Buka kembali file ui/screen/HalamanTentang.kt dari materi sebelumnya.",
          "Bungkus isi HalamanTentang dengan Scaffold(topBar = { TopAppBar(...) }) dan tambahkan @OptIn(ExperimentalMaterial3Api::class).",
          "Di dalam TopAppBar, tambahkan parameter navigationIcon = { IconButton(onClick = onKembali) { ... } }.",
          "Gunakan ikon Icons.AutoMirrored.Filled.ArrowBack dengan contentDescription = \"Kembali\".",
          "Pastikan innerPadding dari Scaffold diteruskan ke konten Text di bawahnya, lalu Run di Emulator dan uji klik panah kiri atas.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami mengapa Material 3 menyarankan Icons.AutoMirrored.",
        ],
        code: [
          {
            filename: "HalamanTentang.kt",
            language: "kotlin",
            code: `@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HalamanTentang(onKembali: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Tentang Aplikasi") },
                navigationIcon = {
                    IconButton(onClick = onKembali) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Kembali"
                        )
                    }
                }
            )
        }
    ) { innerPadding ->
        Text(
            text = "CatatanBelajar membantu mencatat materi dan target harian.",
            modifier = Modifier.padding(innerPadding).padding(16.dp)
        )
    }
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan Icons.Default.ArrowBack dan Icons.AutoMirrored.Filled.ArrowBack.",
        promptKonteks:
          "Saya berada di Modul 5, Materi 5.4 untuk proyek CatatanBelajar (com.belajar.catatan). Navigasi HalamanUtama <-> HalamanTentang sudah berjalan (Materi 5.3), dan sekarang saya memasang navigationIcon di TopAppBar pada HalamanTentang.kt.",
        promptInstruksi: [
          "Jelaskan kenapa versi terbaru Android Material 3 menyarankan Icons.AutoMirrored.Filled.ArrowBack dibanding Icons.Default.ArrowBack.",
        ],
        promptBatasan: [
          "Fokus hanya pada TopAppBar navigationIcon dan ikon AutoMirrored.",
          "Jangan tambahkan ViewModel dulu (dimulai di Modul 6).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "TopAppBar halaman kedua tampil sesuai standar Material 3.",
        promptValidasi: "Ikon panah kiri tampil di kiri atas dan mengembalikan ke layar utama saat diklik.",
        expectedResult: "Navigasi antar layar lengkap dengan header Material 3.",
        validationCheck: ["Panah kembali muncul di Halaman Tentang.", "Klik panah kembali menutup Halaman Tentang."],
      }),
    ],
  },

  // =========================================================================
  // MODUL 6: JEMBATAN ARSITEKTUR: VIEWMODEL, STATEFLOW & DEBUGGING LOGCAT
  // =========================================================================
  {
    id: "modul-6",
    course_id: COURSE_INFO.id,
    module_number: 6,
    title: "ViewModel, StateFlow & Debugging Logcat",
    slug: "modul-6-viewmodel-stateflow-dan-logcat",
    description:
      "Memisahkan logika aplikasi ke ViewModel, mengelola state reaktif dengan StateFlow, merapikan struktur paket proyek, dan membaca error di Logcat bersama Gemini.",
    estimated_minutes: 65,
    difficulty_level: "Menengah",
    is_published: true,
    order_index: 6,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m6-l1",
        moduleId: "modul-6",
        num: 1,
        title: "Memisahkan Logika Data ke ViewModel",
        slug: "memisahkan-logika-ke-viewmodel",
        description:
          "Menambahkan lifecycle-viewmodel-compose dan memindahkan data daftar catatan dari UI Composable ke ViewModel.",
        objective: "Mampu membuat kelas ViewModel agar data tidak hilang saat layar HP diputar (rotate).",
        concept: `## Mengapa \`remember\` Saja Tidak Cukup?
\`remember\` akan ter-reset ketika konfigurasi berubah (misal layar HP diputar *landscape*). **\`ViewModel\`** dirancang khusus untuk bertahan melampaui rotasi layar dan memisahkan logika bisnis dari UI.

Tambahkan \`androidx.lifecycle:lifecycle-viewmodel-compose\` ke \`libs.versions.toml\`, lalu panggil \`val viewModel: CatatanViewModel = viewModel()\` di Composable.`,
        thinkingSteps: [
          "Tambahkan lifecycle-viewmodel-compose di libs.versions.toml dan build.gradle.kts.",
          "Buat package model/ dan ui/screen/ agar struktur proyek rapi sebelum masuk daftar data besar.",
        ],
        instructions: [
          "Buka gradle/libs.versions.toml dan pastikan library androidx-lifecycle-viewmodel-compose sudah terdaftar di bawah [libraries].",
          "Buka app/build.gradle.kts, tambahkan implementation(libs.androidx.lifecycle.viewmodel.compose) di dalam dependencies, lalu klik Sync Now.",
          "Buat file baru CatatanViewModel.kt di package ui.screen (atau ui.viewmodel) dengan deklarasi class CatatanViewModel : ViewModel().",
          "Di dalam layar Compose Anda, tambahkan parameter viewModel: CatatanViewModel = viewModel() untuk menginstansiasinya.",
          "Lakukan build proyek untuk memastikan ViewModel() ter-import dari androidx.lifecycle.viewmodel.compose.viewModel tanpa error.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami kapan memakai rememberSaveable vs ViewModel.",
        ],
        code: [
          {
            filename: "gradle/libs.versions.toml",
            language: "toml",
            code: `[libraries]
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycleRuntimeKtx" }`,
          },
          {
            filename: "CatatanViewModel.kt",
            language: "kotlin",
            code: `class CatatanViewModel : ViewModel() {
    // Logika tambah/ubah/hapus akan dikelola di sini
}`,
          },
        ],
        promptTujuan: "Memahami siklus hidup ViewModel dibanding remember di Jetpack Compose.",
        promptKonteks:
          "Saya berada di Modul 6, Materi 6.1 untuk proyek CatatanBelajar (com.belajar.catatan). Navigasi 2 layar dari Modul 5 sudah berjalan, dan sekarang saya memasang lifecycle-viewmodel-compose serta membuat kerangka CatatanViewModel.kt.",
        promptInstruksi: [
          "Jelaskan perbedaan remember, rememberSaveable, dan ViewModel saat layar HP diputar (rotate), serta kapan kita wajib memakai ViewModel.",
        ],
        promptBatasan: [
          "Fokus hanya pada setup dan siklus hidup ViewModel.",
          "Belum menggunakan Room Database atau Repository (Room dibahas di Modul 9).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman arsitektur pemisahan UI dan state.",
        promptValidasi: "CatatanViewModel dapat diinstansiasi dengan viewModel().",
        expectedResult: "Dependensi ViewModel terpasang dan siap menampung data daftar.",
        validationCheck: ["Sync Gradle sukses.", "CatatanViewModel berhasil dibuat."],
      }),
      makeLesson({
        id: "m6-l2",
        moduleId: "modul-6",
        num: 2,
        title: "Mengamati Data Reaktif dengan StateFlow & collectAsState",
        slug: "stateflow-dan-collectasstate",
        description:
          "Menggunakan MutableStateFlow di ViewModel dan collectAsState() di Compose agar UI otomatis terbarui saat data berubah.",
        objective: "Mampu mengekspos StateFlow baca-saja ke UI Compose.",
        concept: `## Pola \`MutableStateFlow\` + \`StateFlow\`
Di dalam \`ViewModel\`, kita menjaga data tetap aman dengan dua properti:
- \`private val _daftar = MutableStateFlow<List<Catatan>>(emptyList())\` (hanya boleh diubah oleh ViewModel).
- \`val daftar: StateFlow<List<Catatan>> = _daftar.asStateFlow()\` (hanya boleh dibaca oleh UI Compose).
Di layar Compose, baca nilainya lewat \`val daftar by viewModel.daftar.collectAsState()\`.`,
        thinkingSteps: [
          "Biasakan pola private MutableStateFlow dan public StateFlow agar UI tidak mengubah list secara sembarangan.",
        ],
        instructions: [
          "Buka file CatatanViewModel.kt yang sudah dibuat di Materi 6.1.",
          "Deklarasikan private val _daftar = MutableStateFlow<List<String>>(emptyList()) di dalam CatatanViewModel.",
          "Ekspos versi baca-saja ke UI dengan val daftar: StateFlow<List<String>> = _daftar.asStateFlow().",
          "Tambahkan fungsi fun tambah(teks: String) yang memperbarui _daftar.value = listOf(teks.trim()) + _daftar.value saat teks tidak kosong.",
          "Di layar Compose Anda, amati data dengan val daftar by viewModel.daftar.collectAsState(), lalu uji memanggil viewModel.tambah(\"Belajar Compose\") saat tombol ditekan.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami kenapa StateFlow membutuhkan list baru (immutable update).",
        ],
        code: [
          {
            filename: "CatatanViewModel.kt",
            language: "kotlin",
            code: `class CatatanViewModel : ViewModel() {
    private val _daftar = MutableStateFlow<List<String>>(emptyList())
    val daftar: StateFlow<List<String>> = _daftar.asStateFlow()

    fun tambah(teks: String) {
        if (teks.isNotBlank()) {
            _daftar.value = listOf(teks.trim()) + _daftar.value
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami mengapa _daftar.value harus diganti dengan List baru (immutable update) di StateFlow.",
        promptKonteks:
          "Saya berada di Modul 6, Materi 6.2 untuk proyek CatatanBelajar (com.belajar.catatan). CatatanViewModel.kt sudah dibuat (Materi 6.1), dan sekarang saya menambahkan MutableStateFlow + asStateFlow() serta mengamatinya lewat collectAsState() di Compose.",
        promptInstruksi: [
          "Jelaskan kenapa memanggil list.add() pada MutableList di dalam StateFlow sering gagal memicu pembaruan UI di Compose dibanding membuat List baru seperti listOf(...) + _daftar.value.",
        ],
        promptBatasan: [
          "Gunakan MutableStateFlow<List<String>> di memori saja, belum memakai Room atau Flow dari DAO.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman pembaruan state immutable pada StateFlow.",
        promptValidasi: "UI langsung menampilkan item baru saat viewModel.tambah() dipanggil.",
        expectedResult: "Perubahan state di ViewModel otomatis memperbarui layar Compose.",
        validationCheck: ["StateFlow terhubung dengan collectAsState()."],
      }),
      makeLesson({
        id: "m6-l3",
        moduleId: "modul-6",
        num: 3,
        title: "Membaca Error Merah & Caused by: di Logcat Bersama Gemini",
        slug: "debugging-logcat-bersama-gemini",
        description:
          "Cara cepat menemukan akar penyebab crash di tab Logcat Android Studio dan meminta diagnosis akurat ke Gemini.",
        objective: "Mampu menyaring Logcat dan membedah pesan Caused by: dengan Gemini.",
        concept: `## Teknik 3 Langkah Membaca Logcat
Saat aplikasi *Force Close*:
1. Buka tab **Logcat** di bawah Android Studio dan pilih level **Error**.
2. Cari baris bertuliskan **\`Caused by:\`** diikuti tautan biru nama file dan nomor barismu (misal \`MainActivity.kt:42\`).
3. Salin 5–10 baris tersebut dan tanyakan ke Gemini dengan menyertakan konteks file terkait.`,
        thinkingSteps: [
          "Filter Logcat dengan package:mine agar log sistem Android lain tersembunyi.",
          "Klik tautan biru di stack trace untuk langsung melompat ke baris penyebabnya.",
        ],
        instructions: [
          "Buka panel Logcat di bagian bawah Android Studio (atau tekan Alt+6 / Cmd+6).",
          "Di kotak filter Logcat, ketik: package:mine level:error agar log sistem Android lainnya tidak mengganggu.",
          "Amati contoh stack trace pada kode referensi di bawah ini dan temukan baris yang menyebut package com.belajar.catatan (tautan file dan nomor baris).",
          "Biasakan mengecek baris paling atas setelah kata 'Caused by:' atau pesan Exception sebelum menebak-nebak kode.",
          "Salin Prompt AI di bawah ke sesi Gemini Anda dan lihat bagaimana Gemini mendiagnosis penyebab error rute navigasi tersebut.",
        ],
        code: [
          {
            filename: "ContohStackTrace.txt",
            language: "text",
            code: `FATAL EXCEPTION: main
java.lang.IllegalArgumentException: Navigation destination that matches route detail/5 cannot be found
    at androidx.navigation.NavController.navigate(...)
    at com.belajar.catatan.ui.MainScreenKt.MainScreen(MainScreen.kt:64)`,
          },
        ],
        promptTujuan: "Mendiagnosis penyebab crash dari cuplikan Logcat bersama Gemini.",
        promptKonteks:
          "Saya berada di Modul 6, Materi 6.3 untuk proyek CatatanBelajar (com.belajar.catatan). Saya sedang belajar membaca stack trace error merah di Logcat agar siap melakukan debugging saat membangun daftar & navigasi detail.",
        promptInstruksi: [
          "Jelaskan arti pesan 'Navigation destination that matches route detail/5 cannot be found' pada contoh stack trace di atas.",
          "Sebutkan 2 kemungkinan kesalahan penulisan di NavHost atau Screen.kt yang menyebabkannya.",
        ],
        promptBatasan: [
          "Berikan penjelasan dengan bahasa pemula dan fokus pada cara membaca stack trace Logcat.",
          "Maksimal 3 poin singkat.",
        ],
        promptHasilAkhir: "Diagnosis cepat error navigasi atau null pointer dari Logcat.",
        promptValidasi: "Bisa menemukan baris error pada file sendiri di stack trace.",
        expectedResult: "Siap menghadapi dan memperbaiki crash di modul-modul berikutnya.",
        validationCheck: ["Tahu cara menyaring Logcat dengan package:mine."],
      }),
      makeLesson({
        id: "m6-l4",
        moduleId: "modul-6",
        num: 4,
        title: "Menambahkan FloatingActionButton & Merapikan Struktur Paket",
        slug: "floating-action-button-dan-struktur-paket",
        description:
          "Menambahkan tombol aksi mengambang (+) di Scaffold serta menata folder model, ui/screen, dan navigation.",
        objective: "Mampu memasang FloatingActionButton di Scaffold dan menyusun paket proyek yang rapi.",
        concept: `## Struktur Paket Proyek yang Bersih
Sebelum membangun daftar data besar di Modul 7–10, rapikan folder di bawah \`com.belajar.catatan\`:
- \`model/\`: \`data class\`
- \`database/\`: Room Entity, DAO, Database (Modul 9)
- \`navigation/\`: \`Screen.kt\`, \`NavGraph.kt\`
- \`ui/screen/\`: Layar-layar Compose & \`ViewModel\``,
        thinkingSteps: [
          "Pasang floatingActionButton = { FloatingActionButton(onClick = ...) { Icon(...) } } di Scaffold layar utama.",
        ],
        instructions: [
          "Di panel Project Android Studio, pastikan struktur package di bawah com.belajar.catatan sudah terbagi rapi menjadi: model, navigation, dan ui.screen.",
          "Pindahkan file Screen.kt dan NavGraph.kt ke package navigation jika masih di root package.",
          "Buka layar utama Anda (yang memakai Scaffold) dan tambahkan parameter floatingActionButton = { ... }.",
          "Di dalamnya pasang FloatingActionButton(onClick = onTambahBaru) dengan Icon(Icons.Default.Add, contentDescription = \"Tambah catatan\").",
          "Jalankan di Emulator untuk memastikan FAB muncul mengambang di pojok kanan bawah dan tidak menutupi TopAppBar.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami kenapa FAB diletakkan di slot Scaffold.",
        ],
        code: [
          {
            filename: "FabScaffold.kt",
            language: "kotlin",
            code: `Scaffold(
    topBar = { /* TopAppBar */ },
    floatingActionButton = {
        FloatingActionButton(onClick = onTambahBaru) {
            Icon(Icons.Default.Add, contentDescription = "Tambah catatan")
        }
    }
) { innerPadding ->
    // Konten utama
}`,
          },
        ],
        promptTujuan: "Memahami tata letak standar FloatingActionButton pada Scaffold.",
        promptKonteks:
          "Saya berada di Modul 6, Materi 6.4 untuk proyek CatatanBelajar (com.belajar.catatan). ViewModel dan StateFlow sudah siap (Materi 6.2), dan sekarang saya merapikan paket (model, navigation, ui/screen) serta memasang FloatingActionButton di Scaffold layar utama.",
        promptInstruksi: [
          "Jelaskan kenapa FloatingActionButton diletakkan di parameter slot floatingActionButton milik Scaffold, bukan ditaruh manual di dalam Column.",
        ],
        promptBatasan: [
          "Fokus hanya pada Scaffold dan penataan paket proyek.",
          "Belum membuat LazyColumn (Modul 7) atau Room Database (Modul 9).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Struktur paket bersih dan FAB tampil di pojok kanan bawah.",
        promptValidasi: "FAB muncul mengambang rapi di kanan bawah layar.",
        expectedResult: "Kerangka proyek siap memasuki Modul 7 (Scrollable List).",
        validationCheck: ["Folder paket tertata rapi.", "FAB muncul di kanan bawah."],
      }),
    ],
  },

  // =========================================================================
  // MODUL 7: DAFTAR DAPAT DIGULIR (LAZYCOLUMN, LAZYVERTICALGRID, & CARD)
  // =========================================================================
  {
    id: "modul-7",
    course_id: COURSE_INFO.id,
    module_number: 7,
    title: "Daftar Dapat Digulir (Scrollable List & Grid)",
    slug: "modul-7-scrollable-list-dan-grid",
    description:
      "Membuat model data Catatan, merancang Card item responsif, menampilkan daftar dengan LazyColumn dan LazyVerticalGrid, serta tombol toggle tampilan List/Grid.",
    estimated_minutes: 65,
    difficulty_level: "Menengah",
    is_published: true,
    order_index: 7,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m7-l1",
        moduleId: "modul-7",
        num: 1,
        title: "Membuat Model data class Catatan & Daftar Sampel Awal",
        slug: "model-data-class-catatan",
        description:
          "Mendefinisikan struktur data Catatan (id, judul, isi, kategori) serta menyiapkan daftar data awal di ViewModel.",
        objective: "Mampu membuat data class terstruktur untuk menampung item daftar.",
        concept: `## Cetakan Data \`Catatan\`
Setiap item di daftar membutuhkan \`id\` unik (penting untuk navigasi detail di Modul 8 dan Room di Modul 9), \`judul\`, \`isi\`, dan \`kategori\`.`,
        thinkingSteps: [
          "Buat data class Catatan di dalam paket model/.",
          "Sertakan nilai id: Long sebagai pengenal unik setiap baris.",
        ],
        instructions: [
          "Di package model/ (di bawah com.belajar.catatan), buat file Kotlin baru bernama Catatan.kt.",
          "Tuliskan data class Catatan dengan 4 properti: val id: Long, val judul: String, val isi: String, dan val kategori: String.",
          "Buka kembali CatatanViewModel.kt dan ubah MutableStateFlow<List<String>> menjadi MutableStateFlow<List<Catatan>>.",
          "Isi nilai awal _daftar di CatatanViewModel dengan 3 data sampel Catatan (id 1L, 2L, 3L) agar daftar langsung terlihat saat diuji.",
          "Perbarui fungsi tambah(judul, isi, kategori) di CatatanViewModel untuk membuat objek Catatan baru dengan id unik.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami kenapa setiap item daftar wajib memiliki id unik.",
        ],
        code: [
          {
            filename: "model/Catatan.kt",
            language: "kotlin",
            code: `data class Catatan(
    val id: Long,
    val judul: String,
    val isi: String,
    val kategori: String
)`,
          },
        ],
        promptTujuan: "Memahami pentingnya properti id unik pada model data daftar Compose.",
        promptKonteks:
          "Saya berada di Modul 7, Materi 7.1 untuk proyek CatatanBelajar (com.belajar.catatan). CatatanViewModel + StateFlow (Modul 6) sudah aktif dengan List<String>, dan sekarang saya menggantinya ke model/Catatan.kt.",
        promptInstruksi: [
          "Jelaskan kenapa setiap item di daftar Compose sebaiknya punya id unik (Long/Int) daripada hanya mengandalkan urutan index list.",
        ],
        promptBatasan: [
          "Gunakan data class Kotlin biasa dulu.",
          "Jangan tambahkan anotasi @Entity atau @PrimaryKey milik Room dulu (dibahas di Modul 9).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Model Catatan siap dipakai di daftar dan navigasi.",
        promptValidasi: "Data sampel muncul di ViewModel tanpa error.",
        expectedResult: "Struktur model data aplikasi sudah seragam.",
        validationCheck: ["model/Catatan.kt berhasil dibuat."],
      }),
      makeLesson({
        id: "m7-l2",
        moduleId: "modul-7",
        num: 2,
        title: "Merancang Komponen Card Item Daftar yang Rapi",
        slug: "komponen-card-item-daftar",
        description:
          "Mendesain tampilan satu baris catatan memakai Card, Column, TextOverflow.Ellipsis, dan event onClick.",
        objective: "Mampu membuat Card Material 3 yang tidak berantakan ketika judul atau isi catatan sangat panjang.",
        concept: `## Membatasi Teks Panjang di Kartu
Gunakan \`maxLines = 2\` dan \`overflow = TextOverflow.Ellipsis\` agar kartu di daftar tetap seragam tingginya meski isi catatan panjang. Pasang \`onClick\` langsung pada \`Card(onClick = onClick)\`.`,
        thinkingSteps: [
          "Gunakan Card(onClick = onClick, modifier = Modifier.fillMaxWidth()) agar kartu langsung punya efek ripple saat ditekan.",
        ],
        instructions: [
          "Di dalam package ui.component, buat file baru bernama KartuCatatan.kt.",
          "Buat @Composable fun KartuCatatan(catatan: Catatan, onClick: () -> Unit) memakai Card(onClick = onClick, modifier = Modifier.fillMaxWidth()).",
          "Di dalam Card, susun Column dengan Modifier.padding(16.dp) dan verticalArrangement = Arrangement.spacedBy(4.dp).",
          "Tampilkan catatan.judul dengan maxLines = 1, catatan.isi dengan maxLines = 2, dan keduanya memakai overflow = TextOverflow.Ellipsis.",
          "Tambahkan Text(text = catatan.kategori, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.primary) di bagian bawah kartu.",
          "Tambahkan @Preview dengan teks isi yang sangat panjang untuk menguji pemotongan elipsis (...), lalu salin Prompt AI di bawah ke Gemini.",
        ],
        code: [
          {
            filename: "ui/component/KartuCatatan.kt",
            language: "kotlin",
            code: `@Composable
fun KartuCatatan(catatan: Catatan, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = catatan.judul,
                style = MaterialTheme.typography.titleMedium,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = catatan.isi,
                style = MaterialTheme.typography.bodyMedium,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = catatan.kategori,
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.primary
            )
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami penanganan teks panjang dengan TextOverflow.Ellipsis di Compose.",
        promptKonteks:
          "Saya berada di Modul 7, Materi 7.2 untuk proyek CatatanBelajar (com.belajar.catatan). Model data class Catatan (Materi 7.1) sudah ada, dan sekarang saya mendesain ui/component/KartuCatatan.kt.",
        promptInstruksi: [
          "Jelaskan perbedaan TextOverflow.Clip dan TextOverflow.Ellipsis pada Card item daftar agar tinggi kartu tetap seragam.",
        ],
        promptBatasan: [
          "Fokus hanya pada komponen Card dan TextOverflow di KartuCatatan.kt.",
          "Jangan tambahkan menu hapus atau navigasi argumen dulu.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Komponen kartu daftar tampil rapi dan dapat diklik.",
        promptValidasi: "Teks panjang terpotong rapi dengan tanda '...' di Preview.",
        expectedResult: "Satu kartu item yang bersih dan siap dirender di LazyColumn.",
        validationCheck: ["Card dapat diklik.", "Teks panjang tidak meluber keluar kartu."],
      }),
      makeLesson({
        id: "m7-l3",
        moduleId: "modul-7",
        num: 3,
        title: "Menampilkan Daftar Hemat Memori dengan LazyColumn",
        slug: "daftar-lazycolumn-dan-empty-state",
        description:
          "Menampilkan ratusan data secara efisien dengan LazyColumn, parameter key, serta tampilan Empty State ketika daftar masih kosong.",
        objective: "Mampu merender daftar catatan dengan LazyColumn dan menangani kondisi daftar kosong.",
        concept: `## \`LazyColumn\` + Kondisi Kosong (*Empty State*)
\`LazyColumn\` hanya menggambar item yang tampak di layar. Selalu tambahkan:
- \`items(daftar, key = { it.id }) { ... }\`
- \`contentPadding = PaddingValues(bottom = 84.dp)\` agar item paling bawah tidak tertutup \`FloatingActionButton\`!
- Tampilan teks ramah *"Belum ada catatan"* jika \`daftar.isEmpty()\`.`,
        thinkingSteps: [
          "Cek if (daftar.isEmpty()) sebelum merender LazyColumn.",
          "Tambahkan PaddingValues di LazyColumn agar tidak tertutup FAB.",
        ],
        instructions: [
          "Buka layar utama (HalamanUtama.kt) dan ambil val daftar by viewModel.daftar.collectAsState().",
          "Tambahkan pengecekan if (daftar.isEmpty()) yang menampilkan Box(Modifier.fillMaxSize(), Alignment.Center) berisi teks ajakan menambah catatan.",
          "Pada blok else, pasang LazyColumn dengan contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 16.dp, bottom = 84.dp) dan verticalArrangement = Arrangement.spacedBy(12.dp).",
          "Di dalam LazyColumn, panggil items(daftar, key = { it.id }) { item -> KartuCatatan(catatan = item, onClick = { ... }) }.",
          "Jalankan di Emulator dengan 10+ data sampel, lalu gulir ke item paling bawah untuk memastikan kartu terakhir tidak tertutup FAB.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami perbedaan Modifier.padding vs contentPadding di LazyColumn.",
        ],
        code: [
          {
            filename: "DaftarLazyColumn.kt",
            language: "kotlin",
            code: `if (daftar.isEmpty()) {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text("Belum ada catatan. Tekan + untuk menambah.")
    }
} else {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 16.dp, bottom = 84.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(daftar, key = { it.id }) { item ->
            KartuCatatan(catatan = item, onClick = { onKlikCatatan(item.id) })
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami pentingnya parameter key dan contentPadding bottom pada LazyColumn.",
        promptKonteks:
          "Saya berada di Modul 7, Materi 7.3 untuk proyek CatatanBelajar (com.belajar.catatan). KartuCatatan (Materi 7.2) sudah siap, dan sekarang saya merendernya di HalamanUtama memakai LazyColumn dan Empty State.",
        promptInstruksi: [
          "Jelaskan perbedaan memberi jarak lewat Modifier.padding(bottom = 84.dp) vs contentPadding = PaddingValues(bottom = 84.dp) pada LazyColumn agar tidak tertutup FloatingActionButton.",
        ],
        promptBatasan: [
          "Fokus hanya pada LazyColumn, items(key = ...), dan Empty State.",
          "Belum menggunakan LazyVerticalGrid (Materi 7.4) atau Room (Modul 9).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Daftar dapat di-scroll penuh tanpa terpotong FAB.",
        promptValidasi: "Item terbawah bisa digulir ke atas melewati posisi FAB.",
        expectedResult: "Daftar catatan tampil mulus dan mendukung scroll.",
        validationCheck: ["Empty state muncul saat daftar kosong.", "Daftar bisa digulir lancar."],
      }),
      makeLesson({
        id: "m7-l4",
        moduleId: "modul-7",
        num: 4,
        title: "Menampilkan Grid dengan LazyVerticalGrid & Toggle List/Grid",
        slug: "lazyverticalgrid-dan-toggle-tampilan",
        description:
          "Mengubah tata letak daftar menjadi 2 kolom (Grid) menggunakan LazyVerticalGrid serta tombol switch di TopAppBar.",
        objective: "Mampu menyediakan pilihan tampilan List (1 kolom) dan Grid (2 kolom) secara dinamis.",
        concept: `## \`LazyVerticalGrid\` 2 Kolom
Compose menyediakan \`LazyVerticalGrid(columns = GridCells.Fixed(2))\` atau \`GridCells.Adaptive(160.dp)\`. Dengan satu state \`var tampilList by remember { mutableStateOf(true) }\`, tombol ikon di \`TopAppBar\` bisa langsung mengganti tata letak dari List ke Grid!`,
        thinkingSteps: [
          "Tambahkan IconButton di actions = { ... } milik TopAppBar.",
          "Gunakan if (tampilList) LazyColumn(...) else LazyVerticalGrid(...).",
        ],
        instructions: [
          "Di HalamanUtama.kt, tambahkan state sementara var tampilList by remember { mutableStateOf(true) }.",
          "Di dalam TopAppBar, tambahkan IconButton pada parameter actions = { ... } yang membalik nilai tampilList = !tampilList saat diklik.",
          "Ubah ikon tombol toggle sesuai status (misal ikon Grid saat mode List, dan ikon List saat mode Grid).",
          "Di konten utama, pasang percabangan if (tampilList) { LazyColumn(...) } else { LazyVerticalGrid(columns = GridCells.Fixed(2), ...) }.",
          "Jalankan di Emulator dan ketuk ikon di TopAppBar untuk memastikan tampilan berpindah mulus antara 1 kolom dan 2 kolom.",
          "Salin Prompt AI di bawah ke Gemini untuk membandingkan GridCells.Fixed vs GridCells.Adaptive.",
        ],
        code: [
          {
            filename: "DaftarGrid.kt",
            language: "kotlin",
            code: `LazyVerticalGrid(
    columns = GridCells.Fixed(2),
    modifier = Modifier.fillMaxSize(),
    contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 16.dp, bottom = 84.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp),
    horizontalArrangement = Arrangement.spacedBy(12.dp)
) {
    items(daftar, key = { it.id }) { item ->
        KartuCatatan(catatan = item, onClick = { onKlikCatatan(item.id) })
    }
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan GridCells.Fixed(2) dan GridCells.Adaptive(minSize).",
        promptKonteks:
          "Saya berada di Modul 7, Materi 7.4 untuk proyek CatatanBelajar (com.belajar.catatan). LazyColumn sudah berjalan (Materi 7.3), dan sekarang saya menambahkan LazyVerticalGrid + toggle List/Grid di TopAppBar.",
        promptInstruksi: [
          "Jelaskan kapan lebih baik memakai GridCells.Adaptive(160.dp) dibanding GridCells.Fixed(2) saat aplikasi dibuka di HP vs tablet.",
        ],
        promptBatasan: [
          "Simpan preferensi List/Grid dengan remember saja dulu (penyimpanan permanen DataStore dibahas di Modul 10).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Tampilan dapat beralih mulus antara List dan Grid.",
        promptValidasi: "Menekan tombol di TopAppBar langsung mengubah 1 kolom menjadi 2 kolom.",
        expectedResult: "Layar utama mendukung mode List dan mode Grid.",
        validationCheck: ["Mode List dan Grid sama-sama bisa digulir rapi."],
      }),
    ],
  },

  // =========================================================================
  // MODUL 8: NAVIGASI DENGAN MENGIRIM DATA (ROUTE ARGUMENTS)
  // =========================================================================
  {
    id: "modul-8",
    course_id: COURSE_INFO.id,
    module_number: 8,
    title: "Navigasi dengan Mengirim Data (Route Arguments)",
    slug: "modul-8-navigasi-dengan-data",
    description:
      "Mengirim ID item dari daftar ke halaman Detail/Form Edit menggunakan Navigation Arguments (navArgument), serta menangani tambah baru vs edit.",
    estimated_minutes: 65,
    difficulty_level: "Menengah",
    is_published: true,
    order_index: 8,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m8-l1",
        moduleId: "modul-8",
        num: 1,
        title: "Merancang Rute dengan Argumen ID di Screen.kt",
        slug: "rute-dengan-argumen-id",
        description:
          "Menambahkan parameter opsional atau wajib pada rute Navigation Compose untuk membuka detail/edit catatan tertentu.",
        objective: "Mampu mendefinisikan pola rute dengan placeholder {id} dan helper fungsi pembuat rutenya.",
        concept: `## Mengirim ID Lewat Alamat Rute
Jangan kirim seluruh objek \`Catatan\` besar lewat URL rute—cukup kirim **ID-nya** saja (misal \`"form?id={id}"\` atau \`"form/{id}"\`), lalu halaman tujuan mengambil data lengkapnya dari ViewModel / Database!`,
        thinkingSteps: [
          "Definisikan konstanta KEY_ID = \"idCatatan\".",
          "Buat fungsi helper withId(id: Long) agar pemanggil tidak salah format string rute.",
        ],
        instructions: [
          "Buka file navigation/Screen.kt yang sudah dibuat pada Modul 5.",
          "Tambahkan konstanta const val KEY_ID_CATATAN = \"idCatatan\" di bagian atas file.",
          "Tambahkan data object FormBaru : Screen(\"form\") untuk rute menambah catatan baru.",
          "Tambahkan data object FormEdit : Screen(\"form/{$KEY_ID_CATATAN}\") beserta fungsi helper fun withId(id: Long) = \"form/$id\".",
          "Pastikan tidak ada garis merah dan rute lama (Utama, Tentang) tetap dipertahankan.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami alasan hanya mengirim ID (Long) di URL rute.",
        ],
        code: [
          {
            filename: "navigation/Screen.kt",
            language: "kotlin",
            code: `const val KEY_ID_CATATAN = "idCatatan"

sealed class Screen(val route: String) {
    data object Utama : Screen("utama")
    data object FormBaru : Screen("form")
    data object FormEdit : Screen("form/{$KEY_ID_CATATAN}") {
        fun withId(id: Long) = "form/$id"
    }
}`,
          },
        ],
        promptTujuan: "Memahami alasan hanya mengirim ID (Long) antar layar di Navigation Compose.",
        promptKonteks:
          "Saya berada di Modul 8, Materi 8.1 untuk proyek CatatanBelajar (com.belajar.catatan). Daftar LazyColumn/Grid (Modul 7) sudah tampil, dan sekarang saya memperbarui navigation/Screen.kt untuk menambah rute FormBaru dan FormEdit({idCatatan}).",
        promptInstruksi: [
          "Jelaskan kenapa mengirim ID (Long) lewat rute navigasi jauh lebih disarankan daripada mengirim seluruh objek Catatan.",
        ],
        promptBatasan: [
          "Fokus hanya pada definisi rute di Screen.kt.",
          "Belum memakai Room Database (Modul 9).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Definisi rute dinamis siap didaftarkan di NavHost.",
        promptValidasi: "Screen.FormEdit.withId(5) menghasilkan \"form/5\".",
        expectedResult: "Rute FormBaru dan FormEdit siap dipakai.",
        validationCheck: ["Screen.kt terkompilasi tanpa error."],
      }),
      makeLesson({
        id: "m8-l2",
        moduleId: "modul-8",
        num: 2,
        title: "Membaca navArgument di NavHost",
        slug: "membaca-nav-argument-di-navhost",
        description:
          "Mendaftarkan tipe argumen NavType.LongType di NavHost dan mengekstrak nilainya dari backStackEntry.arguments.",
        objective: "Mampu mendeklarasikan arguments = listOf(navArgument(...)) dan membaca nilai Long dengan aman.",
        concept: `## Menangkap Argumen di \`NavHost\`
Pada \`composable(route = Screen.FormEdit.route, arguments = ...)\`, beri tahu Navigation bahwa \`KEY_ID_CATATAN\` bertipe \`NavType.LongType\`. Lalu baca lewat \`backStackEntry.arguments?.getLong(KEY_ID_CATATAN)\`.`,
        thinkingSteps: [
          "Daftarkan Screen.FormBaru.route (tanpa id / id = null) dan Screen.FormEdit.route (dengan LongType).",
        ],
        instructions: [
          "Buka file navigation/NavGraph.kt yang sudah dibuat di Modul 5.",
          "Tambahkan composable(Screen.FormBaru.route) yang memanggil DetailCatatanScreen(id = null, navController = navController).",
          "Tambahkan composable(route = Screen.FormEdit.route, arguments = listOf(navArgument(KEY_ID_CATATAN) { type = NavType.LongType })) { backStackEntry -> ... }.",
          "Di dalam lambda backStackEntry, ekstrak val id = backStackEntry.arguments?.getLong(KEY_ID_CATATAN) dan teruskan ke DetailCatatanScreen.",
          "Sambungkan klik FAB di HalamanUtama ke navController.navigate(Screen.FormBaru.route) dan klik KartuCatatan ke navController.navigate(Screen.FormEdit.withId(id)).",
          "Salin Prompt AI di bawah ke Gemini untuk memahami fungsi NavType.LongType.",
        ],
        code: [
          {
            filename: "navigation/NavGraph.kt",
            language: "kotlin",
            code: `composable(Screen.FormBaru.route) {
    DetailCatatanScreen(id = null, navController = navController)
}
composable(
    route = Screen.FormEdit.route,
    arguments = listOf(navArgument(KEY_ID_CATATAN) { type = NavType.LongType })
) { backStackEntry ->
    val id = backStackEntry.arguments?.getLong(KEY_ID_CATATAN)
    DetailCatatanScreen(id = id, navController = navController)
}`,
          },
        ],
        promptTujuan: "Memahami cara kerja NavType dan arguments di NavHost.",
        promptKonteks:
          "Saya berada di Modul 8, Materi 8.2 untuk proyek CatatanBelajar (com.belajar.catatan). Screen.kt sudah punya FormBaru dan FormEdit (Materi 8.1), dan sekarang saya mendaftarkan navArgument(KEY_ID_CATATAN) bertipe NavType.LongType di NavGraph.kt.",
        promptInstruksi: [
          "Jelaskan apa yang terjadi jika kita lupa menuliskan type = NavType.LongType pada navArgument lalu memanggil backStackEntry.arguments?.getLong(KEY_ID_CATATAN).",
        ],
        promptBatasan: [
          "Fokus hanya pada NavGraph.kt dan pembacaan navArgument.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "NavHost berhasil meneruskan ID catatan ke layar tujuan.",
        promptValidasi: "Nilai id diterima dengan benar saat kartu diklik.",
        expectedResult: "Klik FAB membuka form kosong (id = null); klik kartu membuka form terisi (id != null).",
        validationCheck: ["Klik kartu mengirim ID yang sesuai.", "Klik FAB membuka form tambah baru."],
      }),
      makeLesson({
        id: "m8-l3",
        moduleId: "modul-8",
        num: 3,
        title: "Membangun DetailCatatanScreen (Tambah Baru vs Edit)",
        slug: "membangun-detail-catatan-screen",
        description:
          "Membuat satu layar form serbaguna yang mengisi kolom otomatis saat id != null, dan menampilkan tombol Simpan serta Hapus.",
        objective: "Mampu memuat data catatan berdasarkan ID menggunakan LaunchedEffect dan menyimpannya kembali.",
        concept: `## Memuat Data Awal dengan \`LaunchedEffect(id)\`
Saat \`DetailCatatanScreen(id)\` dibuka untuk mengedit (\`id != null\`), panggil fungsi \`viewModel.ambilById(id)\` di dalam \`LaunchedEffect(id)\` agar kolom \`judul\`, \`isi\`, dan \`kategori\` langsung terisi nilai lama!`,
        thinkingSteps: [
          "Gunakan LaunchedEffect(id) agar pengambilan data hanya berjalan sekali saat layar dibuka.",
          "Tampilkan judul TopAppBar 'Tambah Catatan' jika id == null, dan 'Edit Catatan' jika id != null.",
        ],
        instructions: [
          "Di CatatanViewModel.kt, tambahkan 3 fungsi: ambilById(id: Long): Catatan?, ubah(id: Long, judul: String, isi: String, kategori: String), dan hapus(id: Long).",
          "Buat file baru ui/screen/DetailCatatanScreen.kt yang menerima parameter id: Long?, navController: NavHostController, dan viewModel: CatatanViewModel.",
          "Pasang judul TopAppBar dinamis: if (id == null) \"Tambah Catatan\" else \"Edit Catatan\".",
          "Tambahkan blok LaunchedEffect(id) untuk memuat data lama dari viewModel.ambilById(id) ke state judul, isi, dan kategori saat id != null.",
          "Tambahkan IconButton(Icons.Default.Check) di TopAppBar yang memanggil viewModel.tambah(...) jika id == null atau viewModel.ubah(...) jika id != null, lalu navController.popBackStack().",
          "Uji di Emulator: tambah catatan baru lewat FAB, lalu klik salah satu kartu untuk mengedit dan menyimpannya kembali.",
        ],
        code: [
          {
            filename: "DetailCatatanScreen.kt (cuplikan)",
            language: "kotlin",
            code: `LaunchedEffect(id) {
    if (id != null) {
        val data = viewModel.ambilById(id)
        if (data != null) {
            judul = data.judul
            isi = data.isi
            kategori = data.kategori
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami mengapa pengambilan data awal harus ditaruh di LaunchedEffect.",
        promptKonteks:
          "Saya berada di Modul 8, Materi 8.3 untuk proyek CatatanBelajar (com.belajar.catatan). NavGraph sudah meneruskan id: Long? (Materi 8.2), dan sekarang saya membangun ui/screen/DetailCatatanScreen.kt dengan LaunchedEffect(id).",
        promptInstruksi: [
          "Jelaskan masalah yang muncul jika viewModel.ambilById(id) dipanggil langsung di body Composable tanpa LaunchedEffect(id).",
        ],
        promptBatasan: [
          "Gunakan data in-memory di CatatanViewModel dulu (Room Database dimulai di Modul 9).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Form edit terisi data lama dan bisa memperbarui daftar.",
        promptValidasi: "Mengklik catatan membuka form dengan teks lama yang siap diedit.",
        expectedResult: "Layar form mendukung mode Tambah maupun Edit dalam satu file rapi.",
        validationCheck: ["Mode Tambah dan Edit berfungsi penuh.", "Perubahan terlihat di daftar setelah kembali."],
      }),
      makeLesson({
        id: "m8-l4",
        moduleId: "modul-8",
        num: 4,
        title: "Menghubungkan Menu Hapus & Navigasi Kembali yang Aman",
        slug: "menu-hapus-dan-navigasi-aman",
        description:
          "Menambahkan menu opsi (DropdownMenu) di TopAppBar halaman edit untuk aksi Hapus, lalu kembali ke daftar dengan popBackStack().",
        objective: "Mampu memasang DropdownMenu tiga-titik di TopAppBar saat mengedit catatan.",
        concept: `## Aksi Hapus di \`TopAppBar\`
Saat \`id != null\`, tampilkan tombol ikon tiga-titik (\`Icons.Default.MoreVert\`) yang membuka \`DropdownMenu\` berisi pilihan **Hapus**. Setelah menghapus, panggil \`navController.popBackStack()\`.`,
        thinkingSteps: [
          "Sembunyikan tombol Hapus apabila id == null (mode tambah baru).",
        ],
        instructions: [
          "Buka file ui/screen/DetailCatatanScreen.kt yang sudah dibuat di Materi 8.3.",
          "Di dalam slot actions = { ... } milik TopAppBar, tambahkan kondisi if (id != null) agar menu Hapus hanya tampil saat mode Edit.",
          "Buat state var bukaMenu by remember { mutableStateOf(false) } dan IconButton dengan Icons.Default.MoreVert.",
          "Di dalam IconButton, pasang DropdownMenu(expanded = bukaMenu, onDismissRequest = { bukaMenu = false }) berisi DropdownMenuItem('Hapus').",
          "Saat 'Hapus' diklik, tutup menu (bukaMenu = false), panggil viewModel.hapus(id), lalu panggil navController.popBackStack().",
          "Jalankan di Emulator: buka salah satu catatan → klik ikon tiga-titik → Hapus, lalu pastikan item hilang dari daftar.",
        ],
        code: [
          {
            filename: "MenuHapusTopBar.kt",
            language: "kotlin",
            code: `if (id != null) {
    var bukaMenu by remember { mutableStateOf(false) }
    IconButton(onClick = { bukaMenu = true }) {
        Icon(Icons.Default.MoreVert, contentDescription = "Lainnya")
        DropdownMenu(expanded = bukaMenu, onDismissRequest = { bukaMenu = false }) {
            DropdownMenuItem(
                text = { Text("Hapus") },
                onClick = {
                    bukaMenu = false
                    viewModel.hapus(id)
                    navController.popBackStack()
                }
            )
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami manajemen state bukaMenu pada DropdownMenu di Jetpack Compose.",
        promptKonteks:
          "Saya berada di Modul 8, Materi 8.4 untuk proyek CatatanBelajar (com.belajar.catatan). DetailCatatanScreen sudah mendukung Tambah & Edit (Materi 8.3), dan sekarang saya menambahkan DropdownMenu Hapus di TopAppBar.",
        promptInstruksi: [
          "Jelaskan fungsi onDismissRequest pada DropdownMenu dan kenapa kita perlu mengubah bukaMenu = false sebelum memanggil popBackStack().",
        ],
        promptBatasan: [
          "Belum menggunakan AlertDialog konfirmasi (AlertDialog dibahas di Modul 10).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Aksi Tambah, Baca, Edit, dan Hapus bekerja di memori.",
        promptValidasi: "Menekan Hapus menghilangkan item dari daftar dan kembali ke Layar Utama.",
        expectedResult: "CRUD lengkap sudah berjalan di memori sebelum disambungkan ke Room Database.",
        validationCheck: ["DropdownMenu hanya muncul di mode Edit.", "Item terhapus dari daftar."],
      }),
    ],
  },

  // =========================================================================
  // MODUL 9: PENYIMPANAN PERMANEN DENGAN ROOM DATABASE (KSP)
  // =========================================================================
  {
    id: "modul-9",
    course_id: COURSE_INFO.id,
    module_number: 9,
    title: "Penyimpanan Permanen Room Database (KSP)",
    slug: "modul-9-room-database-ksp",
    description:
      "Mengonfigurasi Room Database dengan KSP, membuat @Entity, @Dao dengan Flow, @Database Singleton, ViewModelFactory, dan CRUD SQLite lokal permanen.",
    estimated_minutes: 80,
    difficulty_level: "Menengah",
    is_published: true,
    order_index: 9,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m9-l1",
        moduleId: "modul-9",
        num: 1,
        title: "Konfigurasi Plugin KSP & Dependensi Room di Gradle",
        slug: "konfigurasi-ksp-dan-room-gradle",
        description:
          "Menambahkan plugin dev.google.devtools.ksp dan library room-runtime, room-ktx, serta room-compiler ke Version Catalog.",
        objective: "Mampu memasang Room Database dengan KSP (bukan kapt lama) tanpa error kompilasi.",
        concept: `## Mengapa Pakai KSP (*Kotlin Symbol Processing*)?
Room membaca anotasi \`@Entity\`, \`@Dao\`, dan \`@Database\` untuk membuatkan kode SQLite otomatis saat build. Di Kotlin modern, gunakan **KSP** (jauh lebih cepat dari \`kapt\`):
- Daftarkan plugin \`com.google.devtools.ksp\` di root \`build.gradle.kts\` (\`apply false\`) dan di \`app/build.gradle.kts\`.
- Gunakan \`ksp(libs.androidx.room.compiler)\` untuk memproses anotasi.`,
        thinkingSteps: [
          "Pastikan versi KSP cocok dengan versi Kotlin yang dipakai di libs.versions.toml.",
        ],
        instructions: [
          "Buka gradle/libs.versions.toml dan periksa versi kotlin yang terpasang di [versions].",
          "Tambahkan room = \"2.7.1\" dan ksp dengan prefix yang sama dengan versi Kotlin (misal ksp = \"2.3.10-1.0.30\") di [versions].",
          "Daftarkan androidx-room-runtime, androidx-room-ktx, dan androidx-room-compiler di [libraries], serta plugin devtools-ksp di [plugins].",
          "Di root build.gradle.kts, tambahkan alias(libs.plugins.devtools.ksp) apply false, lalu aktifkan alias(libs.plugins.devtools.ksp) di app/build.gradle.kts.",
          "Di dependencies app/build.gradle.kts, tambahkan implementation(libs.androidx.room.runtime), implementation(libs.androidx.room.ktx), dan ksp(libs.androidx.room.compiler).",
          "Klik Sync Now dan tunggu hingga Gradle Sync hijau; jika muncul error versi KSP, salin Prompt AI di bawah ke Gemini.",
        ],
        code: [
          {
            filename: "gradle/libs.versions.toml",
            language: "toml",
            code: `[versions]
room = "2.7.1"
ksp = "2.3.10-1.0.30"

[libraries]
androidx-room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room" }
androidx-room-ktx = { group = "androidx.room", name = "room-ktx", version.ref = "room" }
androidx-room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "room" }

[plugins]
devtools-ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }`,
          },
          {
            filename: "app/build.gradle.kts",
            language: "kotlin",
            code: `dependencies {
    implementation(libs.androidx.room.runtime)
    implementation(libs.androidx.room.ktx)
    ksp(libs.androidx.room.compiler)
}`,
          },
        ],
        promptTujuan: "Menyesuaikan versi KSP dengan versi Kotlin di proyek Android.",
        promptKonteks:
          "Saya berada di Modul 9, Materi 9.1 untuk proyek CatatanBelajar (com.belajar.catatan). Seluruh UI CRUD in-memory (Modul 1–8) sudah selesai, dan sekarang saya memasang plugin KSP serta library Room Database di gradle/libs.versions.toml dan build.gradle.kts.",
        promptInstruksi: [
          "Jelaskan aturan pencocokan prefix versi KSP dengan versi Kotlin di libs.versions.toml dan langkah mengecek jika terjadi error versi KSP saat Gradle Sync.",
        ],
        promptBatasan: [
          "Gunakan KSP (jangan sarankan kapt).",
          "Fokus hanya pada konfigurasi Gradle Room + KSP.",
          "Maksimal 3 poin singkat.",
        ],
        promptHasilAkhir: "Room dan KSP terpasang rapi di Gradle.",
        promptValidasi: "Gradle Sync sukses tanpa pesan versi KSP tidak cocok.",
        expectedResult: "Anotasi @Entity, @Dao, dan @Database siap digunakan.",
        validationCheck: ["Sync Gradle berhasil."],
      }),
      makeLesson({
        id: "m9-l2",
        moduleId: "modul-9",
        num: 2,
        title: "Membuat Tabel @Entity (Catatan) & @Dao (CatatanDao)",
        slug: "membuat-entity-dan-dao-room",
        description:
          "Menjadikan data class Catatan sebagai tabel SQLite dengan @Entity dan membuat query CRUD reaktif di interface @Dao.",
        objective: "Mampu menulis @Entity dengan PrimaryKey autoGenerate dan @Dao memakai suspend fun + Flow.",
        concept: `## Entity & DAO
- **\`@Entity(tableName = "catatan")\`:** Mengubah \`data class Catatan\` menjadi tabel database, dengan \`@PrimaryKey(autoGenerate = true) val id: Long = 0L\`.
- **\`@Dao\`:** Interface berisi perintah SQL:
  - \`@Insert\`, \`@Update\`, \`@DeleteById\` memakai \`suspend fun\` (berjalan di background thread agar UI tidak macet).
  - \`@Query("SELECT * FROM catatan ORDER BY id DESC")\` mengembalikan \`Flow<List<Catatan>>\` agar daftar otomatis terbarui saat ada perubahan data!`,
        thinkingSteps: [
          "Gunakan suspend fun untuk operasi tulis (@Insert, @Update, @Query DELETE).",
          "Jangan pakai suspend pada fungsi yang mengembalikan Flow<...>.",
        ],
        instructions: [
          "Buka model/Catatan.kt dan tambahkan anotasi @Entity(tableName = \"catatan\") di atas data class Catatan.",
          "Tambahkan @PrimaryKey(autoGenerate = true) di atas val id: Long = 0L agar SQLite otomatis membuat ID unik.",
          "Buat package baru bernama 'database' di bawah com.belajar.catatan, lalu buat file interface CatatanDao.kt dengan anotasi @Dao.",
          "Tambahkan fungsi tulis suspend fun insert(catatan: Catatan), suspend fun update(catatan: Catatan), dan suspend fun deleteById(id: Long).",
          "Tambahkan fungsi baca fun getCatatan(): Flow<List<Catatan>> (tanpa suspend) dan suspend fun getCatatanById(id: Long): Catatan?.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami perbedaan fungsi suspend fun dan Flow di Room DAO.",
        ],
        code: [
          {
            filename: "model/Catatan.kt",
            language: "kotlin",
            code: `@Entity(tableName = "catatan")
data class Catatan(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0L,
    val judul: String,
    val isi: String,
    val kategori: String
)`,
          },
          {
            filename: "database/CatatanDao.kt",
            language: "kotlin",
            code: `@Dao
interface CatatanDao {
    @Insert
    suspend fun insert(catatan: Catatan)

    @Update
    suspend fun update(catatan: Catatan)

    @Query("SELECT * FROM catatan ORDER BY id DESC")
    fun getCatatan(): Flow<List<Catatan>>

    @Query("SELECT * FROM catatan WHERE id = :id")
    suspend fun getCatatanById(id: Long): Catatan?

    @Query("DELETE FROM catatan WHERE id = :id")
    suspend fun deleteById(id: Long)
}`,
          },
        ],
        promptTujuan: "Memahami kenapa query getCatatan(): Flow<List<Catatan>> tidak memakai kata kunci suspend.",
        promptKonteks:
          "Saya berada di Modul 9, Materi 9.2 untuk proyek CatatanBelajar (com.belajar.catatan). Dependensi Room + KSP sudah terpasang (Materi 9.1), dan sekarang saya menambahkan @Entity pada model/Catatan.kt serta membuat database/CatatanDao.kt.",
        promptInstruksi: [
          "Jelaskan perbedaan fungsi suspend fun (satu kali panggil untuk insert/update/delete) dengan Flow<List<Catatan>> (aliran data berkelanjutan) di Room DAO.",
        ],
        promptBatasan: [
          "Fokus hanya pada @Entity dan @Dao di Catatan.kt dan CatatanDao.kt.",
          "Belum membuat RoomDatabase Singleton (Materi 9.3).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "CatatanEntity dan CatatanDao siap dihubungkan ke AppDatabase.",
        promptValidasi: "Query @Dao terbaca tanpa warning SQL merah.",
        expectedResult: "Lapisan tabel dan query SQLite selesai dibuat.",
        validationCheck: ["PrimaryKey autoGenerate = true terpasang.", "Semua query tulis memakai suspend."],
      }),
      makeLesson({
        id: "m9-l3",
        moduleId: "modul-9",
        num: 3,
        title: "Membuat @Database Singleton & ViewModelFactory",
        slug: "appdatabase-singleton-dan-viewmodelfactory",
        description:
          "Membuat kelas abstrak RoomDatabase dengan pola Singleton (1 koneksi untuk seluruh app) dan ViewModelFactory untuk menyuntikkan DAO.",
        objective: "Mampu membuat AppDatabase.getInstance(context) dan ViewModelFactory agar ViewModel bisa mengakses DAO.",
        concept: `## Pola Singleton & Factory
Membuka banyak koneksi database sekaligus boros memori. Gunakan \`@Volatile private var INSTANCE: AppDatabase?\` dengan \`synchronized(this)\` agar hanya ada **1 objek database** di seluruh aplikasi.

Karena \`ViewModel\` tidak boleh langsung memegang \`Context\`, kita meneruskan \`CatatanDao\` lewat constructor ViewModel menggunakan **\`ViewModelProvider.Factory\`**.`,
        thinkingSteps: [
          "Daftarkan Catatan::class di @Database(entities = [Catatan::class], version = 1, exportSchema = false).",
          "Buat kelas util/ViewModelFactory.kt untuk meneruskan CatatanDao ke ViewModel.",
        ],
        instructions: [
          "Di dalam package database/, buat file CatatanDb.kt berisi abstract class CatatanDb : RoomDatabase().",
          "Tambahkan anotasi @Database(entities = [Catatan::class], version = 1, exportSchema = false) dan abstract val dao: CatatanDao.",
          "Tambahkan companion object dengan @Volatile private var INSTANCE: CatatanDb? = null dan fun getInstance(context: Context): CatatanDb memakai synchronized(this).",
          "Buat package util/ lalu buat file ViewModelFactory.kt yang menerima dao: CatatanDao untuk menginstansiasi CatatanViewModel(dao).",
          "Klik Build → Rebuild Project di Android Studio untuk memastikan KSP berhasil men-generate kelas CatatanDb_Impl tanpa error.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami kenapa Room.databaseBuilder memakai context.applicationContext.",
        ],
        code: [
          {
            filename: "database/CatatanDb.kt",
            language: "kotlin",
            code: `@Database(entities = [Catatan::class], version = 1, exportSchema = false)
abstract class CatatanDb : RoomDatabase() {
    abstract val dao: CatatanDao

    companion object {
        @Volatile
        private var INSTANCE: CatatanDb? = null

        fun getInstance(context: Context): CatatanDb {
            synchronized(this) {
                var instance = INSTANCE
                if (instance == null) {
                    instance = Room.databaseBuilder(
                        context.applicationContext,
                        CatatanDb::class.java,
                        "catatan.db"
                    ).build()
                    INSTANCE = instance
                }
                return instance
            }
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami fungsi @Volatile dan synchronized(this) pada Singleton RoomDatabase.",
        promptKonteks:
          "Saya berada di Modul 9, Materi 9.3 untuk proyek CatatanBelajar (com.belajar.catatan). Catatan @Entity dan CatatanDao sudah dibuat (Materi 9.2), dan sekarang saya membuat database/CatatanDb.kt (Singleton) serta util/ViewModelFactory.kt.",
        promptInstruksi: [
          "Jelaskan dengan singkat kenapa kita memakai context.applicationContext alih-alih Activity context di Room.databaseBuilder serta fungsi @Volatile.",
        ],
        promptBatasan: [
          "Jangan sarankan Hilt/Dagger, tetap gunakan ViewModelProvider.Factory sederhana.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Database lokal aman dari memory leak dan siap dipanggil dari UI.",
        promptValidasi: "Build APK / Rebuild Project berhasil men-generate CatatanDb_Impl oleh KSP.",
        expectedResult: "Koneksi SQLite lokal lewat Room sudah siap digunakan ViewModel.",
        validationCheck: ["CatatanDb.kt dan ViewModelFactory.kt terkompilasi bersih."],
      }),
      makeLesson({
        id: "m9-l4",
        moduleId: "modul-9",
        num: 4,
        title: "Menghubungkan CRUD Room ke ViewModel & Layar Compose",
        slug: "crud-room-viewmodel-dan-compose",
        description:
          "Menjalankan operasi insert, update, delete di viewModelScope.launch(Dispatchers.IO) dan menampilkan Flow Room ke layar Compose.",
        objective: "Mampu menyimpan, mengubah, dan menghapus catatan secara permanen di database HP.",
        concept: `## Coroutines di \`ViewModel\`
Operasi tulis ke database tidak boleh berjalan di *Main Thread* (UI Thread). Di dalam \`ViewModel\`, jalankan \`dao.insert(...)\`, \`dao.update(...)\`, dan \`dao.deleteById(...)\` di dalam \`viewModelScope.launch(Dispatchers.IO) { ... }\`.

Untuk membaca \`Flow<List<Catatan>>\`, ubah menjadi \`StateFlow\` memakai \`.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000L), emptyList())\`.`,
        thinkingSteps: [
          "Gunakan viewModelScope.launch(Dispatchers.IO) untuk setiap operasi tulis database.",
          "Uji menutup aplikasi penuh lalu membuka ulang untuk membuktikan data tersimpan di SQLite.",
        ],
        instructions: [
          "Buka CatatanViewModel.kt dan ubah constructor-nya menjadi class CatatanViewModel(private val dao: CatatanDao) : ViewModel().",
          "Ubah properti daftar agar membaca dao.getCatatan().stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000L), emptyList()).",
          "Perbarui fungsi insert, update, dan delete agar menjalankan dao.insert(...), dao.update(...), dan dao.deleteById(...) di dalam viewModelScope.launch(Dispatchers.IO).",
          "Di layar Compose (HalamanUtama & DetailCatatanScreen), ambil context = LocalContext.current, db = CatatanDb.getInstance(context), lalu buat viewModel(factory = ViewModelFactory(db.dao)).",
          "Jalankan di Emulator: tambah 2 catatan baru, tutup paksa aplikasi dari Recent Apps, lalu buka lagi untuk memastikan data tetap ada.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami angka 5000L pada SharingStarted.WhileSubscribed.",
        ],
        code: [
          {
            filename: "CatatanViewModel.kt",
            language: "kotlin",
            code: `class CatatanViewModel(private val dao: CatatanDao) : ViewModel() {
    val daftar: StateFlow<List<Catatan>> = dao.getCatatan().stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000L),
        initialValue = emptyList()
    )

    fun insert(judul: String, isi: String, kategori: String) {
        viewModelScope.launch(Dispatchers.IO) {
            dao.insert(Catatan(judul = judul, isi = isi, kategori = kategori))
        }
    }

    fun update(id: Long, judul: String, isi: String, kategori: String) {
        viewModelScope.launch(Dispatchers.IO) {
            dao.update(Catatan(id = id, judul = judul, isi = isi, kategori = kategori))
        }
    }

    fun delete(id: Long) {
        viewModelScope.launch(Dispatchers.IO) {
            dao.deleteById(id)
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami parameter SharingStarted.WhileSubscribed(5000L) pada stateIn.",
        promptKonteks:
          "Saya berada di Modul 9, Materi 9.4 untuk proyek CatatanBelajar (com.belajar.catatan). CatatanDb dan ViewModelFactory sudah selesai (Materi 9.3), dan sekarang saya menghubungkan CRUD Room ke CatatanViewModel serta layar Compose.",
        promptInstruksi: [
          "Jelaskan kenapa angka 5000L (5 detik) sering dipakai pada SharingStarted.WhileSubscribed(5000L) saat layar HP diputar.",
        ],
        promptBatasan: [
          "Fokus pada stateIn, viewModelScope.launch(Dispatchers.IO), dan ViewModelFactory.",
          "Belum menambahkan AlertDialog atau DataStore (Modul 10).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "CRUD penuh berjalan permanen menggunakan Room Database.",
        promptValidasi: "Data catatan tetap ada setelah aplikasi ditutup paksa dan dibuka lagi.",
        expectedResult: "Aplikasi CatatanBelajar menyimpan seluruh data secara permanen di HP.",
        validationCheck: ["Tambah, Edit, dan Hapus tersimpan permanen di Room SQLite."],
      }),
    ],
  },

  // =========================================================================
  // MODUL 10: DIALOG KONFIRMASI (ALERTDIALOG) & PREFERENSI (DATASTORE)
  // =========================================================================
  {
    id: "modul-10",
    course_id: COURSE_INFO.id,
    module_number: 10,
    title: "Dialog Konfirmasi & Preferensi (AlertDialog & DataStore)",
    slug: "modul-10-dialog-dan-preferences",
    description:
      "Menambahkan AlertDialog konfirmasi sebelum menghapus data, menyimpan preferensi tampilan List/Grid dengan Jetpack DataStore, membangun APK, dan merilis ke GitHub.",
    estimated_minutes: 70,
    difficulty_level: "Menengah",
    is_published: true,
    order_index: 10,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m10-l1",
        moduleId: "modul-10",
        num: 1,
        title: "Membuat AlertDialog Konfirmasi Sebelum Menghapus Data",
        slug: "alertdialog-konfirmasi-hapus",
        description:
          "Mencegah pengguna menghapus catatan secara tidak sengaja dengan memunculkan AlertDialog Material 3.",
        objective: "Mampu mengendalikan tampil/sembunyinya AlertDialog memakai state Boolean.",
        concept: `## Pola \`AlertDialog\` di Compose
Saat pengguna menekan menu **Hapus**, jangan langsung memanggil \`viewModel.delete(id)\`. Ubah state \`tampilDialog = true\` terlebih dahulu:
- \`onDismissRequest\`: Tutup dialog saat pengguna mengetuk luar dialog (\`tampilDialog = false\`).
- \`confirmButton\`: Tombol **Hapus** yang benar-benar menghapus data dan kembali.
- \`dismissButton\`: Tombol **Batal** yang hanya menutup dialog.`,
        thinkingSteps: [
          "Tambahkan state var tampilDialog by remember { mutableStateOf(false) } di DetailCatatanScreen.",
        ],
        instructions: [
          "Di package ui.component, buat file baru bernama DisplayAlertDialog.kt sesuai kode referensi.",
          "Buka DetailCatatanScreen.kt dan tambahkan state var tampilDialog by remember { mutableStateOf(false) }.",
          "Ubah aksi menu 'Hapus' pada DropdownMenu TopAppBar agar hanya menyetel tampilDialog = true (jangan langsung memanggil viewModel.delete).",
          "Di dalam DetailCatatanScreen, tambahkan blok if (tampilDialog) { DisplayAlertDialog(onDismissRequest = { tampilDialog = false }, onConfirmation = { ... }) }.",
          "Di dalam onConfirmation, tutup dialog (tampilDialog = false), panggil viewModel.delete(id), lalu navController.popBackStack().",
          "Uji di Emulator: klik Hapus → pilih Batal (data tetap aman), lalu klik Hapus lagi → pilih Hapus (data terhapus dari Room).",
        ],
        code: [
          {
            filename: "DisplayAlertDialog.kt",
            language: "kotlin",
            code: `@Composable
fun DisplayAlertDialog(
    onDismissRequest: () -> Unit,
    onConfirmation: () -> Unit
) {
    AlertDialog(
        text = { Text("Yakin ingin menghapus catatan ini?") },
        confirmButton = {
            TextButton(onClick = onConfirmation) { Text("Hapus") }
        },
        dismissButton = {
            TextButton(onClick = onDismissRequest) { Text("Batal") }
        },
        onDismissRequest = onDismissRequest
    )
}`,
          },
        ],
        promptTujuan: "Memahami kontrol state Boolean untuk menampilkan dialog di Jetpack Compose.",
        promptKonteks:
          "Saya berada di Modul 10, Materi 10.1 untuk proyek CatatanBelajar (com.belajar.catatan). CRUD Room Database sudah berjalan penuh (Modul 9), dan sekarang saya menambahkan DisplayAlertDialog.kt sebelum aksi hapus di DetailCatatanScreen.",
        promptInstruksi: [
          "Jelaskan kenapa di Compose kita memakai 'if (tampilDialog) { AlertDialog(...) }' berbasis state Boolean alih-alih memanggil fungsi dialog.show() seperti di Android XML lama.",
        ],
        promptBatasan: [
          "Fokus hanya pada AlertDialog Material 3 berbasis state Boolean.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Penghapusan data aman dari klik tidak sengaja.",
        promptValidasi: "Dialog muncul sebelum hapus; Batal tidak menghapus data.",
        expectedResult: "Pengguna mendapat konfirmasi sebelum catatan dihapus permanen.",
        validationCheck: ["Tombol Batal menutup dialog.", "Tombol Hapus menghapus data dari Room."],
      }),
      makeLesson({
        id: "m10-l2",
        moduleId: "modul-10",
        num: 2,
        title: "Menambahkan Dependensi Jetpack DataStore Preferences",
        slug: "dependensi-datastore-preferences",
        description:
          "Memasang library androidx.datastore:datastore-preferences untuk menggantikan SharedPreferences dengan dukungan Kotlin Coroutines & Flow.",
        objective: "Mampu menambahkan DataStore Preferences ke Version Catalog Gradle.",
        concept: `## Mengapa DataStore Lebih Baik dari SharedPreferences?
**Jetpack DataStore** menyimpan preferensi kecil (seperti pilihan tampilan List vs Grid) secara **asinkron** memakai \`Flow\` dan \`Coroutines\`, sehingga aman dari macet (*ANR*) di *Main Thread*.`,
        thinkingSteps: [
          "Tambahkan datastore-preferences ke gradle/libs.versions.toml dan app/build.gradle.kts.",
        ],
        instructions: [
          "Buka file gradle/libs.versions.toml pada proyek CatatanBelajar.",
          "Di bawah bagian [versions], tambahkan datastore = \"1.1.4\" (atau versi stabil terbaru).",
          "Di bawah bagian [libraries], tambahkan androidx-datastore-preferences = { group = \"androidx.datastore\", name = \"datastore-preferences\", version.ref = \"datastore\" }.",
          "Buka app/build.gradle.kts dan tambahkan implementation(libs.androidx.datastore.preferences) di blok dependencies.",
          "Klik 'Sync Now' dan pastikan Gradle Sync selesai tanpa error.",
          "Salin Prompt AI di bawah ke Gemini untuk memahami keunggulan DataStore dibanding SharedPreferences.",
        ],
        code: [
          {
            filename: "gradle/libs.versions.toml",
            language: "toml",
            code: `[versions]
datastore = "1.1.4"

[libraries]
androidx-datastore-preferences = { group = "androidx.datastore", name = "datastore-preferences", version.ref = "datastore" }`,
          },
        ],
        promptTujuan: "Memahami keunggulan DataStore Preferences dibanding SharedPreferences.",
        promptKonteks:
          "Saya berada di Modul 10, Materi 10.2 untuk proyek CatatanBelajar (com.belajar.catatan). AlertDialog konfirmasi hapus sudah selesai (Materi 10.1), dan sekarang saya menambahkan library androidx-datastore-preferences ke Gradle.",
        promptInstruksi: [
          "Sebutkan 2 keunggulan utama Jetpack DataStore Preferences dibanding SharedPreferences lama saat dipakai bersama Kotlin Coroutines dan Compose.",
        ],
        promptBatasan: [
          "Gunakan Preferences DataStore (bukan Proto DataStore).",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Library DataStore siap digunakan.",
        promptValidasi: "Gradle Sync selesai tanpa error.",
        expectedResult: "DataStore Preferences tersedia di proyek.",
        validationCheck: ["Sync Gradle berhasil."],
      }),
      makeLesson({
        id: "m10-l3",
        moduleId: "modul-10",
        num: 3,
        title: "Menyimpan Preferensi Tampilan List/Grid dengan DataStore",
        slug: "menyimpan-preferensi-dengan-datastore",
        description:
          "Membuat kelas SettingsDataStore untuk menyimpan pilihan mode tampilan (List atau Grid) agar diingat saat aplikasi dibuka kembali.",
        objective: "Mampu membaca Flow<Boolean> dan menulis Preferences di DataStore.",
        concept: `## Membaca & Menulis \`DataStore\`
Buat ekstensi \`val Context.dataStore by preferencesDataStore(name = "settings_pref")\` sekali saja di tingkat top-level file.
- **Membaca:** \`context.dataStore.data.map { prefs -> prefs[IS_LIST_KEY] ?: true }\`
- **Menulis:** \`context.dataStore.edit { prefs -> prefs[IS_LIST_KEY] = isList }\` (di dalam \`CoroutineScope\`).`,
        thinkingSteps: [
          "Pastikan preferencesDataStore hanya dideklarasikan SATU kali untuk nama file yang sama.",
        ],
        instructions: [
          "Di dalam package util/, buat file baru bernama SettingsDataStore.kt.",
          "Deklarasikan val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = \"settings_pref\") di tingkat paling atas file (top-level, di luar class).",
          "Buat class SettingsDataStore(private val context: Context) dengan layoutFlow: Flow<Boolean> dan suspend fun saveLayout(isList: Boolean).",
          "Buka HalamanUtama.kt: ganti state remember { mutableStateOf(true) } menjadi val showList by settingsDataStore.layoutFlow.collectAsState(initial = true).",
          "Di aksi tombol toggle List/Grid TopAppBar, panggil CoroutineScope.launch { settingsDataStore.saveLayout(!showList) }.",
          "Jalankan di Emulator: ubah ke mode Grid, tutup aplikasi penuh, lalu buka ulang — pastikan mode Grid tetap aktif!",
        ],
        code: [
          {
            filename: "util/SettingsDataStore.kt",
            language: "kotlin",
            code: `val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings_pref")

class SettingsDataStore(private val context: Context) {
    companion object {
        private val IS_LIST = booleanPreferencesKey("is_list")
    }

    val layoutFlow: Flow<Boolean> = context.dataStore.data.map { preferences ->
        preferences[IS_LIST] ?: true
    }

    suspend fun saveLayout(isList: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[IS_LIST] = isList
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami aturan singleton preferencesDataStore di Kotlin Android.",
        promptKonteks:
          "Saya berada di Modul 10, Materi 10.3 untuk proyek CatatanBelajar (com.belajar.catatan). Library DataStore sudah terpasang (Materi 10.2), dan sekarang saya membuat util/SettingsDataStore.kt serta menghubungkannya ke toggle List/Grid di HalamanUtama.",
        promptInstruksi: [
          "Jelaskan error apa yang muncul jika 'by preferencesDataStore(...)' dideklarasikan di dalam body Composable yang dipanggil berkali-kali, bukan di top-level file.",
        ],
        promptBatasan: [
          "Fokus pada Preferences DataStore + Flow + collectAsState.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Preferensi List/Grid tersimpan permanen di perangkat.",
        promptValidasi: "Mode Grid tetap aktif setelah aplikasi ditutup dan dibuka kembali.",
        expectedResult: "Preferensi tampilan pengguna tersimpan dengan DataStore.",
        validationCheck: ["Mode tampilan tersimpan lintas sesi aplikasi."],
      }),
      makeLesson({
        id: "m10-l4",
        moduleId: "modul-10",
        num: 4,
        title: "Uji Akhir, Build APK & Push Proyek ke GitHub",
        slug: "uji-akhir-build-apk-dan-github",
        description:
          "Melakukan pengujian menyeluruh, membangun file APK rilis uji (Build APK), menulis README.md, dan mengunggah ke GitHub.",
        objective: "Mampu membungkus proyek menjadi file .apk dan mempublikasikannya ke repository GitHub publik.",
        concept: `## Finalisasi & Publikasi Karya
1. **Uji Alur Lengkap:** Tambah catatan, lihat di List & Grid, tutup/buka aplikasi, edit catatan, coba Batal di AlertDialog, lalu Hapus catatan.
2. **Build APK:** Menu **Build → Build Bundle(s) / APK(s) → Build APK(s)** → klik **locate** untuk mengambil \`app-debug.apk\`.
3. **Push ke GitHub:** Buat repository publik di GitHub, sertakan \`README.md\`, lalu kirim link repository, screenshot aplikasi, dan link APK di halaman **Kumpulan Karya**.`,
        thinkingSteps: [
          "Pastikan repository GitHub berstatus Public dan berisi build.gradle.kts serta folder app/.",
        ],
        instructions: [
          "Lakukan uji menyeluruh aplikasi CatatanBelajar di Emulator/HP: Tambah catatan → Toggle List/Grid → Tutup & buka ulang app → Edit catatan → Batal hapus di AlertDialog → Hapus permanen.",
          "Di Android Studio, klik menu Build → Build Bundle(s) / APK(s) → Build APK(s), lalu klik 'locate' pada notifikasi selesai untuk menemukan app-debug.apk.",
          "Salin Prompt AI di bawah ke Gemini untuk membantu menyusun draf README.md proyek CatatanBelajar yang merangkum fitur Modul 1–10.",
          "Buat repository GitHub baru berstatus Public, lalu push seluruh kode proyek (termasuk build.gradle.kts, folder app/, dan README.md).",
          "Ambil screenshot aplikasi dari Emulator/HP dan unggah link repository GitHub beserta file/link APK ke halaman Kumpulan Karya ComposeLab.",
        ],
        promptTujuan: "Menyusun README.md rapi yang merangkum fitur yang sudah dibangun di Modul 1–10.",
        promptKonteks:
          "Saya berada di Modul 10, Materi 10.4 (Finalisasi) untuk proyek CatatanBelajar (com.belajar.catatan). Seluruh fitur dari Modul 1–10 (Jetpack Compose, Navigation, ViewModel, LazyColumn/Grid, Room KSP, AlertDialog, dan DataStore) sudah selesai dan teruji.",
        promptInstruksi: [
          "Buat draf README.md singkat dan profesional berisi judul proyek CatatanBelajar, daftar fitur utama, dan teknologi Android yang digunakan.",
        ],
        promptBatasan: [
          "Gunakan format Markdown bersih siap tempel ke README.md GitHub.",
          "Jangan mengarang fitur yang tidak dibangun di Modul 1–10 (misal login server atau cloud sync).",
        ],
        promptHasilAkhir: "Dokumentasi README.md dan karya siap dikumpulkan.",
        promptValidasi: "Repository GitHub publik, file APK teruji, dan form Kumpulan Karya terkirim.",
        expectedResult: "Seluruh proyek Modul 1–10 selesai dibangun dan dipublikasikan.",
        validationCheck: ["Build APK berhasil.", "Repository GitHub berstatus Public.", "Formulir Kumpulan Karya terkirim."],
      }),
    ],
  },
];
