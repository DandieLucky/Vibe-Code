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
          "Pastikan Android Studio versi terbaru sudah terpasang beserta Android SDK.",
          "Siapkan akun Google untuk mengakses Gemini saat butuh menjelaskan pesan error atau API baru.",
        ],
        promptTujuan: "Memahami peran komponen utama dalam proyek Android Jetpack Compose.",
        promptKonteks: "Saya pemula yang baru mulai membangun aplikasi Android dengan Kotlin dan Jetpack Compose.",
        promptInstruksi: [
          "Jelaskan secara ringkas hubungan antara Activity, Composable function, dan MaterialTheme.",
        ],
        promptBatasan: ["Jawab maksimal 3 paragraf dengan contoh sederhana."],
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
          "Buat proyek CatatanBelajar dengan template Empty Activity.",
          "Buka gradle/libs.versions.toml dan amati bagian [versions] serta [libraries].",
          "Buka app/build.gradle.kts untuk melihat bagaimana alias(libs.plugins.kotlin.compose) dipanggil.",
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
        promptKonteks: "Saya baru membuat proyek Android Compose dan melihat androidx-compose-bom di libs.versions.toml.",
        promptInstruksi: ["Jelaskan fungsi Compose BOM agar saya tahu kenapa library material3 tidak perlu ditulis versinya satu per satu."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buka MainActivity.kt dan ubah fungsi Greeting menjadi SalamPembuka.",
          "Klik tab Split di kanan atas untuk melihat panel Preview.",
          "Klik Build & Refresh jika preview belum muncul.",
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
        promptKonteks: "Di MainActivity.kt ada parameter innerPadding yang diteruskan ke Modifier.padding(innerPadding).",
        promptInstruksi: ["Jelaskan apa yang terjadi di layar HP jika Modifier.padding(innerPadding) dihapus saat enableEdgeToEdge() aktif."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buat 1 Emulator di Device Manager (atau sambungkan HP dengan USB Debugging aktif).",
          "Klik Run (▶) dan tunggu aplikasi terpasang dan terbuka otomatis.",
        ],
        promptTujuan: "Mengatasi kendala perangkat tidak terdeteksi saat akan Run aplikasi.",
        promptKonteks: "Saya ingin menjalankan proyek Jetpack Compose di Android Studio.",
        promptInstruksi: ["Berikan daftar cek singkat jika emulator lambat atau HP Android tidak muncul di daftar perangkat."],
        promptBatasan: ["Format daftar bernomor maksimal 5 poin."],
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
          "Buat file baru ui/screen/HalamanUtama.kt.",
          "Tambahkan Text dengan padding 16.dp dan style titleLarge.",
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
        promptKonteks: "Saya sedang mengatur padding dan ukuran font pada komponen Text di Compose.",
        promptInstruksi: ["Jelaskan secara singkat kapan memakai dp dan kapan memakai sp di Android."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Susun teks judul, deskripsi, dan dua tombol sejajar di dalam Column dan Row.",
          "Periksa tampilannya di Preview.",
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
        promptKonteks: "Saya menyusun tombol di dalam Row dan Column pada LayoutDasar.kt.",
        promptInstruksi: ["Jelaskan perbedaan Arrangement dan Alignment pada Row dengan contoh sederhana."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buat komponen PenghitungTarget menggunakan var jumlah by remember { mutableStateOf(0) }.",
          "Hubungkan tombol +1 dan Reset ke variabel jumlah.",
          "Jalankan aplikasi di Emulator dan uji klik tombol berkali-kali.",
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
        promptKonteks: "Saya menambahkan var jumlah by remember { mutableStateOf(0) } di Compose.",
        promptInstruksi: ["Jelaskan perbedaan memakai '=' (mengakses .value) dengan memakai 'by' di Kotlin Compose."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Bungkus PenghitungTarget di dalam Scaffold dengan TopAppBar berjudul 'CatatanBelajar'.",
          "Atur warna containerColor TopAppBar menggunakan MaterialTheme.colorScheme.primaryContainer.",
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
        promptKonteks: "Saya menggunakan TopAppBar di dalam Scaffold Jetpack Compose.",
        promptInstruksi: ["Jelaskan fungsi @OptIn(ExperimentalMaterial3Api::class) saat memakai TopAppBar."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Salin gambar bernama ilustrasi_belajar.png ke folder res/drawable melalui Resource Manager.",
          "Pastikan Gradle mengenali ID R.drawable.ilustrasi_belajar.",
        ],
        promptTujuan: "Memahami aturan penamaan file resource Android di folder res/drawable.",
        promptKonteks: "Saya memasukkan gambar ke folder res/drawable di Android Studio.",
        promptInstruksi: ["Jelaskan kenapa nama file 'Banner-Belajar 1.png' menyebabkan build error di Android."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Tambahkan komponen Image menggunakan painterResource(id = R.drawable.ilustrasi_belajar).",
          "Pasang contentScale = ContentScale.Crop dan Modifier.clip(RoundedCornerShape(12.dp)).",
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
        promptKonteks: "Saya menampilkan gambar di BannerIlustrasi.kt dengan ukuran 160.dp.",
        promptInstruksi: ["Jelaskan kapan sebaiknya memakai ContentScale.Crop dibanding ContentScale.Fit."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Tambahkan IconButton pada TopAppBar (misalnya tombol Tentang/Info).",
          "Atur contentDescription dengan stringResource atau deskripsi singkat.",
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
        promptKonteks: "Saya menambahkan tombol ikon di Jetpack Compose.",
        promptInstruksi: ["Jelaskan keuntungan aksesibilitas dan area sentuh (touch target) saat memakai IconButton."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Tambahkan <string name=\"judul_app\">CatatanBelajar</string> dan <string name=\"tombol_simpan\">Simpan</string> ke strings.xml.",
          "Ganti string hardcoded di Composable dengan stringResource(R.string.judul_app).",
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
        promptKonteks: "Saya memindahkan teks aplikasi ke strings.xml di Android Studio.",
        promptInstruksi: ["Tunjukkan cara memanggil string 'sapa_pengguna' yang memiliki placeholder %1$s menggunakan stringResource()."],
        promptBatasan: ["Tunjukkan maksimal 3 baris contoh pemanggilan."],
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
          "Buat form input Judul Materi dan Target Menit memakai OutlinedTextField.",
          "Atur singleLine = true pada kolom Judul Materi.",
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
        promptKonteks: "Saya membuat beberapa OutlinedTextField untuk form tambah catatan.",
        promptInstruksi: ["Jelaskan fungsi KeyboardType.Number dan ImeAction.Done pada form input Android."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buat daftar RadioButton untuk memilih kategori belajar.",
          "Tambahkan Switch untuk menandai 'Prioritas Tinggi'.",
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
        promptKonteks: "Saya membangun PilihanKategori dengan RadioButton di Jetpack Compose.",
        promptInstruksi: ["Jelaskan kenapa menaruh onClick = null di RadioButton dan menaruhnya di Row lebih baik untuk pengalaman pengguna."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Tambahkan state judulError by remember { mutableStateOf(false) }.",
          "Reset judulError = false begitu pengguna mulai mengetik ulang di onValueChange.",
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
        promptKonteks: "Saya menambahkan validasi isError pada OutlinedTextField.",
        promptInstruksi: ["Jelaskan kenapa penting mengubah judulError = false di dalam onValueChange."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Refaktor KolomJudul dan PilihanKategori agar bersifat stateless.",
          "Satukan seluruh state form di dalam layar FormCatatanScreen.",
        ],
        promptTujuan: "Memahami manfaat State Hoisting pada komponen Jetpack Compose.",
        promptKonteks: "Saya memindahkan remember { mutableStateOf(...) } dari komponen anak ke layar induk.",
        promptInstruksi: ["Sebutkan 2 keuntungan utama membuat komponen form menjadi stateless."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Edit gradle/libs.versions.toml untuk menambahkan androidx-navigation-compose.",
          "Tambahkan ke dependencies di app/build.gradle.kts dan klik Sync Now.",
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
        promptKonteks: "Saya menambahkan androidx-navigation-compose ke libs.versions.toml.",
        promptInstruksi: ["Jelaskan urutan langkah jika muncul error 'Unresolved reference: navigation' setelah mengedit toml."],
        promptBatasan: ["Maksimal 3 poin singkat."],
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
          "Buat file navigation/Screen.kt berisi rute Utama dan Tentang.",
          "Buat file navigation/NavGraph.kt berisi NavHost(navController, startDestination = Screen.Utama.route).",
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
        promptKonteks: "Saya membuat Screen.kt dan NavGraph.kt dengan Navigation Compose.",
        promptInstruksi: ["Jelaskan kenapa lebih aman membungkus string rute di sealed class Screen daripada mengetik \"tentang\" berulang kali."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buat HalamanTentang.kt sederhana berisi deskripsi aplikasi CatatanBelajar.",
          "Uji navigasi dari HalamanUtama ke HalamanTentang lalu kembali.",
        ],
        promptTujuan: "Memahami perbedaan popBackStack() dan navigateUp() di Navigation Compose.",
        promptKonteks: "Saya memasang tombol kembali di HalamanTentang.",
        promptInstruksi: ["Jelaskan risiko memanggil popBackStack() terlalu cepat (misal double click) dan cara aman memakai navigateUp()."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buka HalamanTentang.kt dan bungkus dengan Scaffold + TopAppBar.",
          "Pasang navigationIcon yang memanggil onKembali.",
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
        promptKonteks: "Saya memasang tombol kembali pada TopAppBar di Compose Material 3.",
        promptInstruksi: ["Jelaskan kenapa versi terbaru Android menyarankan Icons.AutoMirrored.Filled.ArrowBack."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Tambahkan dependensi androidx-lifecycle-viewmodel-compose dan Sync Gradle.",
          "Buat CatatanViewModel : ViewModel() yang menyimpan daftar catatan.",
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
        promptKonteks: "Saya menambahkan ViewModel ke proyek Android Compose.",
        promptInstruksi: ["Jelaskan kapan rememberSaveable cukup dan kapan kita wajib memakai ViewModel."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Tambahkan _daftar dan daftar di CatatanViewModel.",
          "Tambahkan fungsi tambahCatatan(judul: String, kategori: String).",
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
        promptKonteks: "Saya memakai StateFlow<List<String>> di CatatanViewModel.",
        promptInstruksi: ["Jelaskan kenapa memanggil list.add() pada MutableList di dalam StateFlow sering gagal memicu pembaruan UI di Compose."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buka tab Logcat di Android Studio dan aktifkan filter package:mine level:error.",
          "Pelajari contoh stack trace di bawah ini dan temukan file penyebabnya.",
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
        promptKonteks: "Aplikasi Compose saya crash saat tombol navigasi diklik.",
        promptInstruksi: [
          "Jelaskan arti pesan 'Navigation destination that matches route ... cannot be found'.",
          "Sebutkan 2 kemungkinan kesalahan penulisan di NavHost atau Screen.kt.",
        ],
        promptBatasan: ["Maksimal 3 poin singkat."],
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
          "Buat folder model, navigation, dan ui/screen di Android Studio.",
          "Tambahkan FloatingActionButton(+) pada Scaffold layar utama untuk membuka halaman tambah/dialog.",
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
        promptKonteks: "Saya menambahkan FloatingActionButton pada Scaffold halaman utama.",
        promptInstruksi: ["Jelaskan kenapa FloatingActionButton diletakkan di slot Scaffold, bukan ditaruh manual di dalam Column."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buat file model/Catatan.kt.",
          "Perbarui CatatanViewModel agar menyimpan List<Catatan> beserta beberapa data sampel awal.",
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
        promptKonteks: "Saya membuat data class Catatan untuk ditampilkan di LazyColumn.",
        promptInstruksi: ["Jelaskan kenapa setiap item di daftar Compose sebaiknya punya id unik (Long/Int) daripada hanya mengandalkan urutan index."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buat Composable KartuCatatan(catatan: Catatan, onClick: () -> Unit).",
          "Tambahkan maxLines = 1 pada judul dan maxLines = 2 pada isi catatan.",
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
        promptKonteks: "Saya mendesain KartuCatatan.kt untuk daftar item.",
        promptInstruksi: ["Jelaskan perbedaan TextOverflow.Clip dan TextOverflow.Ellipsis."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Gunakan LazyColumn di LayarUtama untuk merender daftar catatan dari ViewModel.",
          "Tambahkan tampilan teks tengah apabila daftar kosong.",
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
        promptKonteks: "Saya menampilkan daftar catatan memakai LazyColumn di LayarUtama.",
        promptInstruksi: ["Jelaskan perbedaan memberi padding di Modifier.padding(bottom = 84.dp) vs contentPadding = PaddingValues(bottom = 84.dp) pada LazyColumn."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Tambahkan tombol toggle List/Grid pada actions di TopAppBar LayarUtama.",
          "Tambahkan LazyVerticalGrid(columns = GridCells.Fixed(2)) untuk mode Grid.",
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
        promptKonteks: "Saya menambahkan LazyVerticalGrid agar pengguna bisa melihat catatan dalam 2 kolom.",
        promptInstruksi: ["Jelaskan kapan lebih baik memakai GridCells.Adaptive(160.dp) dibanding GridCells.Fixed(2) untuk tablet."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Perbarui navigation/Screen.kt dengan rute FormTambah dan FormEdit(\"form/{$KEY_ID}\").",
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
        promptKonteks: "Saya memperbarui Screen.kt untuk rute FormEdit yang membawa idCatatan.",
        promptInstruksi: ["Jelaskan kenapa mengirim ID lebih disarankan daripada mengirim objek data penuh lewat argumen rute."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Perbarui NavGraph.kt untuk mendaftarkan FormBaru dan FormEdit beserta navArgument.",
          "Teruskan parameter id: Long? ke DetailCatatanScreen.",
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
        promptKonteks: "Saya mendaftarkan navArgument bertipe LongType di NavGraph.kt.",
        promptInstruksi: ["Jelaskan apa yang terjadi jika lupa menuliskan type = NavType.LongType saat memanggil getLong()."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buat ui/screen/DetailCatatanScreen.kt lengkap dengan form input dan tombol Simpan di TopAppBar (Check icon).",
          "Tambahkan fungsi ambilById, ubah, dan hapus di CatatanViewModel.",
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
        promptKonteks: "Saya mengisi state awal kolom edit di DetailCatatanScreen memakai LaunchedEffect(id).",
        promptInstruksi: ["Jelaskan masalah yang muncul jika viewModel.ambilById(id) dipanggil langsung di body Composable tanpa LaunchedEffect."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Tambahkan IconButton(MoreVert) dan DropdownMenu pada TopAppBar di DetailCatatanScreen.",
          "Hubungkan aksi Hapus ke viewModel.hapus(id) lalu navController.popBackStack().",
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
        promptKonteks: "Saya menambahkan DropdownMenu hapus di TopAppBar halaman detail.",
        promptInstruksi: ["Jelaskan fungsi onDismissRequest pada DropdownMenu."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Tambahkan room dan ksp ke gradle/libs.versions.toml.",
          "Aktifkan alias(libs.plugins.devtools.ksp) di app/build.gradle.kts dan tambahkan 3 dependensi Room.",
          "Klik Sync Now dan pastikan tidak ada error versi KSP.",
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
        promptKonteks: "Saya memasang Room Database dengan KSP di libs.versions.toml.",
        promptInstruksi: ["Jelaskan aturan pencocokan prefix versi KSP dengan versi Kotlin dan cara mengecek jika terjadi error versi KSP."],
        promptBatasan: ["Maksimal 3 poin singkat."],
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
          "Tambahkan anotasi @Entity dan @PrimaryKey pada model/Catatan.kt.",
          "Buat interface database/CatatanDao.kt berisi insert, update, getAll(), getById(), dan deleteById().",
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
        promptKonteks: "Saya menulis CatatanDao.kt di Room Database.",
        promptInstruksi: ["Jelaskan perbedaan fungsi suspend fun (satu kali panggil) dengan Flow (aliran data berkelanjutan) di Room DAO."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buat file database/CatatanDb.kt dengan pola Singleton.",
          "Buat util/ViewModelFactory.kt untuk menginstansiasi MainViewModel(dao) dan DetailViewModel(dao).",
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
        promptKonteks: "Saya membuat kelas CatatanDb : RoomDatabase() di Android.",
        promptInstruksi: ["Jelaskan dengan singkat kenapa kita memakai context.applicationContext alih-alih Activity context di Room.databaseBuilder."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Perbarui CatatanViewModel agar menerima dao: CatatanDao dan memakai stateIn + Dispatchers.IO.",
          "Sambungkan ViewModelFactory ke viewModel(factory = ...) di layar Compose.",
          "Jalankan di Emulator, tambah/edit/hapus catatan, lalu tutup dan buka ulang aplikasi.",
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
        promptKonteks: "Saya menghubungkan Flow dari Room DAO ke StateFlow di CatatanViewModel.",
        promptInstruksi: ["Jelaskan kenapa angka 5000L (5 detik) sering dipakai pada WhileSubscribed saat layar HP diputar."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buat komponen DisplayAlertDialog(onDismiss, onConfirm) di ui/component/.",
          "Hubungkan menu Hapus di TopAppBar agar menyetel tampilDialog = true.",
          "Uji menekan Batal (data tetap ada) dan menekan Hapus (data terhapus).",
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
        promptKonteks: "Saya menambahkan AlertDialog konfirmasi hapus di DetailCatatanScreen.",
        promptInstruksi: ["Jelaskan kenapa di Compose kita memakai 'if (tampilDialog) { AlertDialog(...) }' alih-alih memanggil fungsi dialog.show()."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Tambahkan androidx-datastore-preferences ke libs.versions.toml dan build.gradle.kts.",
          "Klik Sync Now.",
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
        promptKonteks: "Saya menambahkan androidx-datastore-preferences ke proyek Android Compose.",
        promptInstruksi: ["Sebutkan 2 keunggulan DataStore Preferences dibanding SharedPreferences lama."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Buat kelas util/SettingsDataStore.kt.",
          "Hubungkan layoutFlow.collectAsState(true) ke LayarUtama.",
          "Uji ubah ke mode Grid, tutup aplikasi penuh, lalu buka lagi — mode Grid tetap bertahan!",
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
        promptKonteks: "Saya membuat SettingsDataStore.kt memakai by preferencesDataStore.",
        promptInstruksi: ["Jelaskan error apa yang muncul jika preferencesDataStore dideklarasikan di dalam body Composable yang dipanggil berkali-kali."],
        promptBatasan: ["Maksimal 2 paragraf."],
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
          "Uji seluruh fitur Modul 1–10 di Emulator atau HP fisik.",
          "Bangun file .apk lewat menu Build APK(s).",
          "Push proyek ke GitHub dan kirimkan karya melalui halaman Kumpulan Karya ComposeLab.",
        ],
        promptTujuan: "Menyusun README.md rapi yang merangkum fitur yang sudah dibangun di Modul 1–10.",
        promptKonteks: "Saya telah menyelesaikan aplikasi CatatanBelajar dengan Jetpack Compose, Navigation, Room, AlertDialog, dan DataStore.",
        promptInstruksi: ["Buat draf README.md singkat berisi judul, daftar fitur, dan teknologi yang dipakai."],
        promptBatasan: ["Gunakan format Markdown bersih."],
        promptHasilAkhir: "Dokumentasi README.md dan karya siap dikumpulkan.",
        promptValidasi: "Repository GitHub publik, file APK teruji, dan form Kumpulan Karya terkirim.",
        expectedResult: "Seluruh proyek Modul 1–10 selesai dibangun dan dipublikasikan.",
        validationCheck: ["Build APK berhasil.", "Repository GitHub berstatus Public.", "Formulir Kumpulan Karya terkirim."],
      }),
    ],
  },
];
