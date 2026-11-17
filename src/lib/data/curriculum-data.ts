import type { Module, Lesson } from "../../types/database.ts";

export interface FullModule extends Module {
  lessons: Lesson[];
}

export const COURSE_INFO = {
  id: "course-android-compose-pemula",
  slug: "android-kotlin-jetpack-compose-pemula",
  title: "Pemrograman Android Kotlin & Jetpack Compose untuk Pemula Bersama Gemini",
  description:
    "Kurikulum bertahap dari nol (7 modul ringan) untuk belajar Android Kotlin dan Jetpack Compose menggunakan pendekatan PRIMM dan LLM Gemini sebagai partner belajar—bukan vibecoding.",
  cover_image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=1200",
  total_modules: 7,
  total_estimated_hours: 12,
  target_audience: [
    "Programmer Pemula Total",
    "Pelajar yang Baru Mengenal Kotlin & Android",
    "Pembelajar Mandiri yang Ingin Memakai Gemini Secara Tepat",
  ],
};

interface BeginnerLessonInput {
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
  exercise?: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const CREATED_AT = "2026-11-17T00:00:00.000Z";

function makeLesson(input: BeginnerLessonInput): Lesson {
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
    exercise: input.exercise,
    quiz: input.quiz ? [input.quiz] : undefined,
  };
}

export const MODULES_DATA: FullModule[] = [
  // =========================================================================
  // MODUL 1: CARA KERJA APLIKASI & BERPIKIR TERSTRUKTUR BERSAMA GEMINI
  // =========================================================================
  {
    id: "modul-1",
    course_id: COURSE_INFO.id,
    module_number: 1,
    title: "Cara Kerja Aplikasi & Berpikir Terstruktur Bersama Gemini",
    slug: "modul-1-berpikir-terstruktur-dan-gemini",
    description:
      "Mengenal pola Input-Proses-Output, perbedaan vibecoding vs belajar terstruktur bersama Gemini, 3 mode prompt anti-salin-buta, dan persiapan Android Studio.",
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
        title: "Memahami Input–Proses–Output di Balik Setiap Aplikasi",
        slug: "memahami-input-proses-output",
        description:
          "Menguraikan fitur aplikasi yang terlihat rumit menjadi tiga langkah sederhana: data masuk, pengolahan, dan tampilan hasil.",
        objective:
          "Pemula mampu memecah ide fitur aplikasi menjadi alur Input, Proses, dan Output sebelum menyentuh kode atau AI.",
        concept: `## Analogi Dapur Restoran

Sebelum menulis satu baris kode pun, programmer pemula perlu tahu satu rahasia sederhana: **semua aplikasi di dunia bekerja dengan 3 langkah yang sama**, yaitu **Input → Proses → Output**.

Bayangkan kamu memesan kopi di kedai:
- **Input (Bahan Masuk):** Kamu menyebutkan pesanan (*Es Kopi Susu, gula sedikit*).
- **Proses (Pengolahan):** Barista mencampur espresso, susu, dan es sesuai takaran.
- **Output (Hasil Keluar):** Segelas kopi tersaji di meja.

Di aplikasi Android:
- **Input:** Pengguna mengetik nama di kotak teks atau menekan tombol.
- **Proses:** Aplikasi mengecek apakah teksnya kosong, lalu menyimpannya.
- **Output:** Nama pengguna muncul di layar atau pesan berhasil tampil.`,
        thinkingSteps: [
          "Tentukan satu fitur kecil yang ingin dibuat (misalnya: tombol sapaan).",
          "Tulis apa Input-nya (teks nama yang diketik pengguna).",
          "Tulis apa Proses-nya (gabungkan kata 'Halo, ' dengan nama).",
          "Tulis apa Output-nya (teks sapaan tampil di layar).",
        ],
        instructions: [
          "Ambil buku catatan atau buka teks kosong.",
          "Pilih 1 aplikasi yang sering kamu pakai (misalnya kalkulator atau daftar belanja).",
          "Tuliskan alur Input → Proses → Output untuk satu tombol di aplikasi tersebut.",
          "Uji pemahamanmu dengan meminta Gemini mengecek alur yang sudah kamu tulis.",
        ],
        code: [
          {
            filename: "AlurSapaan.txt",
            language: "markdown",
            code: `# Rancangan Sebelum Membuka Kode
Input  : Pengguna mengetik nama "Rina" lalu klik tombol Sapa
Proses : Cek nama tidak kosong -> gabungkan "Halo, " + nama
Output : Muncul tulisan "Halo, Rina!" di layar`,
          },
        ],
        promptTujuan: "Memeriksa apakah rancangan Input-Proses-Output fitur sederhana saya sudah logis.",
        promptKonteks: "Saya pemula total yang baru belajar merancang alur aplikasi Android sebelum menulis kode.",
        promptInstruksi: [
          "Baca rancangan Input-Proses-Output yang saya tulis.",
          "Sebutkan 1 hal yang sudah bagus dari rancangan saya.",
          "Sebutkan 1 skenario aneh (edge case) yang mungkin terjadi jika pengguna salah klik atau membiarkan input kosong.",
        ],
        promptBatasan: [
          "JANGAN menulis kode Kotlin atau Compose dulu.",
          "Gunakan bahasa Indonesia sederhana maksimal 3 paragraf.",
        ],
        promptHasilAkhir: "Umpan balik singkat tentang kejelasan alur Input-Proses-Output.",
        promptValidasi: "Saya bisa menjelaskan ulang alur fitur tanpa bingung istilah teknis.",
        expectedResult: "Kamu memiliki rancangan Input–Proses–Output yang jelas sebelum meminta kode apa pun.",
        validationCheck: [
          "Sudah menuliskan Input, Proses, dan Output secara terpisah.",
          "Sudah memikirkan kasus jika input dibiarkan kosong.",
        ],
        quiz: {
          question: "Jika pengguna menekan tombol 'Simpan' pada catatan kosong lalu muncul pesan 'Judul tidak boleh kosong', bagian pengecekan tersebut termasuk tahap apa?",
          options: ["Input", "Proses", "Output", "Database"],
          correctIndex: 1,
          explanation: "Pengecekan apakah teks kosong adalah langkah pengolahan logika sebelum menentukan hasil yang ditampilkan (Proses).",
        },
      }),
      makeLesson({
        id: "m1-l2",
        moduleId: "modul-1",
        num: 2,
        title: "Vibecoding vs Belajar Cepat dengan Gemini",
        slug: "vibecoding-vs-belajar-terstruktur-gemini",
        description:
          "Mengapa asal menyalin kode dari AI justru memperlambat belajar, dan bagaimana memakai Gemini sebagai mentor Socratic.",
        objective:
          "Pemula memahami bahaya vibecoding dan mampu menerapkan aturan PRIMM sebelum menyalin kode dari Gemini.",
        concept: `## Jebakan *Vibecoding*

*Vibecoding* adalah kebiasaan mengetik *"Buatkan saya aplikasi lengkap"*, lalu menyalin semua hasilnya tanpa tahu cara kerjanya. Riset pendidikan pemrograman menunjukkan pola ini menimbulkan **ilusi paham**: aplikasi tampak jalan sebentar, tetapi begitu muncul 1 error merah atau diminta mengubah warna tombol saja, kamu langsung buntu.

### Solusinya: Siklus PRIMM Bersama Gemini
Alih-alih meminta AI mengerjakan semuanya, kita memakai siklus 5 langkah:
1. **Predict (Tebak):** Baca potongan kode pendek (5–15 baris) dan tebak hasilnya dulu.
2. **Run (Jalankan):** Uji tebakanmu di Android Studio atau Kotlin Playground.
3. **Investigate (Bedah):** Tanya Gemini arti baris tertentu dengan analogi.
4. **Modify (Ubah):** Ubah sendiri teks, angka, atau logikanya.
5. **Make (Buat):** Baru buat fitur kecil sendiri setelah paham polanya.`,
        thinkingSteps: [
          "Berhenti sejenak sebelum menekan tombol Copy pada jawaban Gemini.",
          "Tanyakan pada diri sendiri: 'Apakah saya tahu apa fungsi tiap baris di kode ini?'",
          "Jika belum tahu, minta Gemini menjelaskan barisnya dulu, bukan menulis kode baru.",
        ],
        instructions: [
          "Bandingkan contoh prompt buruk (vibecoding) vs prompt baik di bawah ini.",
          "Buka Gemini Chat (gemini.google.com) atau Gemini di Android Studio.",
          "Uji coba menanyakan satu konsep kecil menggunakan aturan PRIMM.",
        ],
        code: [
          {
            filename: "PerbandinganPrompt.txt",
            language: "markdown",
            code: `# BURUK (Vibecoding):
"Buatkan aplikasi catatan Android lengkap sekarang."

# BAIK (Belajar Cepat Anti-Vibecoding):
"Saya pemula. Jelaskan fungsi 5 baris kode ini dengan analogi,
lalu beri 1 pertanyaan untuk mengecek pemahaman saya."`,
          },
        ],
        promptTujuan: "Melatih cara meminta penjelasan terstruktur ke Gemini tanpa diberi jawaban kode utuh.",
        promptKonteks: "Saya pemula total yang ingin cepat paham cara kerja kode Android, bukan sekadar copy-paste.",
        promptInstruksi: [
          "Jelaskan dengan 1 analogi sehari-hari mengapa menyalin kode tanpa paham berbahaya saat aplikasi mulai membesar.",
          "Ajukan 1 pertanyaan pendek untuk saya jawab.",
        ],
        promptBatasan: [
          "Jangan berikan potongan kode apa pun.",
          "Maksimal 150 kata.",
        ],
        promptHasilAkhir: "Penjelasan ringkas dan 1 pertanyaan refleksi dari Gemini.",
        promptValidasi: "Saya bisa membedakan mana prompt yang membuat bergantung dan mana prompt yang mempercepat pemahaman.",
        expectedResult: "Kamu siap menggunakan Gemini sebagai mentor pribadi, bukan mesin copy-paste.",
        validationCheck: [
          "Mengetahui kepanjangan dan urutan PRIMM (Predict, Run, Investigate, Modify, Make).",
          "Sudah mencoba mengirim 1 prompt berpagar ke Gemini.",
        ],
        quiz: {
          question: "Apa langkah pertama dalam metode PRIMM sebelum menjalankan kode?",
          options: ["Langsung menyalin kode baru", "Predict (menebak hasil kode)", "Menghapus error", "Membuat proyek baru"],
          correctIndex: 1,
          explanation: "Predict melatih otak membaca alur kode lebih dulu sebelum melihat output asli.",
        },
      }),
      makeLesson({
        id: "m1-l3",
        moduleId: "modul-1",
        num: 3,
        title: "Tiga Jurus Bertanya ke Gemini (Analogi, PRIMM, & Bedah Error)",
        slug: "tiga-jurus-bertanya-ke-gemini",
        description:
          "Menguasai 3 template prompt siap pakai menggunakan tag struktural agar jawaban Gemini ringkas, jelas, dan mendidik.",
        objective:
          "Pemula mampu memakai 3 mode prompt Gemini: Tanya Konsep, Bedah Kode PRIMM, dan Bedah Error Logcat.",
        concept: `## Kenapa Harus Pakai Tag \`<aturan>\`, \`<kode>\`, dan \`<tugas>\`?

Gemini jauh lebih akurat dan patuh saat instruksimu dipisahkan rapi dengan tag pembatas:
- **\`<aturan>\`:** Mengatur gaya bahasa Gemini (*pakai bahasa sederhana, jangan beri kode jawaban utuh*).
- **\`<kode>\` / \`<error>\`:** Tempat menempel potongan kode atau pesan error yang sedang kamu hadapi.
- **\`<tugas>\`:** Pertanyaan spesifik atau tebakanmu sendiri.

Dengan memisahkan ketiga bagian ini, Gemini tidak akan mencampuradukkan kode milikmu dengan instruksi yang kamu minta.`,
        thinkingSteps: [
          "Pilih mode sesuai kebutuhan: baru kenal istilah (Mode 1), sedang baca kode (Mode 2), atau ketemu error merah (Mode 3).",
          "Isi tag <aturan> agar Gemini menahan diri tidak membuang kode utuh.",
          "Selalu tuliskan tebakanmu sendiri di bagian <tugas>.",
        ],
        instructions: [
          "Simpan ketiga template pada cuplikan kode ke catatan pribadimu.",
          "Coba jalankan Mode 1 di Gemini untuk menanyakan istilah 'Compiler' atau 'APK'.",
        ],
        code: [
          {
            filename: "3-Template-Prompt-Gemini.md",
            language: "markdown",
            code: `# MODE 1: TANYA KONSEP & ANALOGI
<aturan>
Saya programmer pemula total. Jelaskan dengan bahasa sederhana,
maksimal 3 paragraf, 1 analogi sehari-hari, tanpa kode proyek utuh.
</aturan>
<tugas>Jelaskan apa itu [ISTILAH] dan kenapa dibutuhkan.</tugas>

# MODE 2: BEDAH KODE PRIMM
<aturan>
JANGAN tulis ulang kode secara utuh. Jelaskan baris per baris,
lalu ajukan 1 pertanyaan untuk menguji pemahaman saya.
</aturan>
<kode>[TEMPEL 5-15 BARIS KODE]</kode>
<tugas>Prediksi saya: [TEBAKAN SAYA]. Apakah tepat?</tugas>

# MODE 3: BEDAH ERROR LOGCAT
<aturan>
JANGAN langsung memberi kode perbaikan siap salin.
1) Jelaskan arti error dengan bahasa manusia.
2) Tunjuk baris penyebabnya.
3) Beri 1 petunjuk agar saya perbaiki sendiri.
</aturan>
<error>[TEMPEL ERROR MERAH]</error>`,
          },
        ],
        promptTujuan: "Menguji Mode 1 untuk memahami istilah teknis Android dalam bahasa manusia.",
        promptKonteks: "Saya baru pertama kali mendengar istilah 'Gradle' dan 'Emulator' di Android Studio.",
        promptInstruksi: [
          "Jelaskan perbedaan singkat antara Gradle dan Emulator memakai analogi dapur atau bengkel.",
          "Akhiri dengan 1 pertanyaan cek pemahaman.",
        ],
        promptBatasan: [
          "Maksimal 3 paragraf pendek.",
          "Jangan gunakan istilah teknis lain tanpa menjelaskannya.",
        ],
        promptHasilAkhir: "Analogi mudah dipahami tentang Gradle dan Emulator.",
        promptValidasi: "Saya bisa menjelaskan fungsi Gradle dan Emulator kepada teman dengan bahasa sendiri.",
        expectedResult: "Kamu memiliki 3 template prompt Gemini yang bisa dipakai berulang di seluruh modul.",
        validationCheck: [
          "Sudah memahami fungsi tag <aturan>, <kode>, dan <tugas>.",
          "Sudah mencoba Mode 1 di Gemini.",
        ],
      }),
      makeLesson({
        id: "m1-l4",
        moduleId: "modul-1",
        num: 4,
        title: "Mengenal Android Studio & Menjalankan Proyek Pertama",
        slug: "mengenal-android-studio-dan-proyek-pertama",
        description:
          "Membuat proyek Empty Activity Jetpack Compose, mengenal 3 file utama, dan menjalankannya tanpa panik melihat banyak folder.",
        objective:
          "Pemula mampu membuat proyek Jetpack Compose baru dan mengenali lokasi file MainActivity.kt.",
        concept: `## Jangan Panik Melihat Banyak Folder!

Saat pertama membuka **Android Studio**, kamu akan melihat puluhan folder. Untuk pemula, **90% folder itu tidak perlu disentuh**. Fokus saja pada 3 tempat ini:
1. **\`MainActivity.kt\`:** Titik awal aplikasi menyala dan tempat kita mulai menggambar layar.
2. **\`AndroidManifest.xml\`:** KTP aplikasi (berisi nama aplikasi, ikon, dan izin seperti internet).
3. **\`build.gradle.kts (Module :app)\`:** Daftar bahan tambahan (*library*) yang dipakai proyek.

### Langkah Membuat Proyek Baru
1. Buka Android Studio → **New Project** → pilih **Empty Activity** (ikon Compose).
2. Beri nama proyek (misal \`BelajarPertama\`), pilih bahasa **Kotlin**.
3. Tunggu proses *Gradle Sync* di pojok kanan bawah selesai (pastikan internet aktif).
4. Tekan tombol **Run (▶)** untuk melihat tulisan \`Hello Android!\` di Emulator atau HP.`,
        thinkingSteps: [
          "Identifikasi folder app -> kotlin+java untuk mencari MainActivity.kt.",
          "Tunggu Gradle selesai mengunduh kebutuhan awal sebelum menekan tombol Run.",
        ],
        instructions: [
          "Buat proyek baru Empty Activity di Android Studio.",
          "Buka file MainActivity.kt dan temukan tulisan Greeting(\"Android\").",
          "Ubah teks \"Android\" menjadi namamu sendiri (Modify!), lalu klik Run atau Split Preview.",
        ],
        code: [
          {
            filename: "MainActivity.kt",
            language: "kotlin",
            code: `// Cari bagian ini di MainActivity.kt, lalu ubah teksnya!
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Halo $name, selamat belajar Kotlin!",
        modifier = modifier
    )
}`,
          },
        ],
        promptTujuan: "Memahami bagian dasar di MainActivity.kt saat proyek baru pertama kali dibuat.",
        promptKonteks: "Saya baru membuat proyek Empty Activity Jetpack Compose di Android Studio.",
        promptInstruksi: [
          "Jelaskan secara singkat apa tugas fungsi onCreate() dan setContent { ... } dengan analogi panggung pertunjukan.",
        ],
        promptBatasan: [
          "Jangan ubah atau tambahkan kode kompleks.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman sederhana tentang titik masuk aplikasi Android.",
        promptValidasi: "Teks sapaan dengan namamu berhasil muncul di layar Emulator atau Preview.",
        expectedResult: "Proyek Android pertamamu berjalan dan menampilkan teks yang sudah kamu ubah sendiri.",
        validationCheck: [
          "Gradle Sync selesai tanpa error merah.",
          "Berhasil mengubah teks Greeting menjadi namamu sendiri.",
        ],
        commonErrors: [
          {
            error: "Gradle sync failed / timeout",
            solution: "Pastikan koneksi internet stabil, lalu klik File → Sync Project with Gradle Files.",
          },
        ],
      }),
    ],
  },

  // =========================================================================
  // MODUL 2: KOTAK DATA KOTLIN (VAL, VAR, TIPE DATA, & IF/ELSE)
  // =========================================================================
  {
    id: "modul-2",
    course_id: COURSE_INFO.id,
    module_number: 2,
    title: "Kotak Data Kotlin (val, var, Tipe Data, & if/else)",
    slug: "modul-2-dasar-kotlin-ringan",
    description:
      "Mengenal cara komputer menyimpan data sementara menggunakan val vs var, tipe teks/angka/boolean, percabangan if/else, dan null-safety dasar.",
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
        title: "Kotak Penyimpanan Bernama Variabel (val vs var)",
        slug: "variabel-kotlin-val-vs-var",
        description:
          "Kenali cara komputer menyimpan data sementara menggunakan val (terkunci) dan var (bisa diubah) tanpa menghafal teori rumit.",
        objective:
          "Pemula mampu membedakan kapan memakai val dan var, serta memprediksi error jika mencoba mengubah nilai val.",
        concept: `## Analogi Loker Terkunci vs Papan Tulis

Bayangkan aplikasi perlu mengingat informasi seperti nama pengguna atau jumlah poin. Di Kotlin, tempat menyimpan satu informasi disebut **variabel**.

Ada dua jenis kotak penyimpanan di Kotlin:
- **\`val\` (Value — Loker Terkunci):** Sekali kamu menaruh barang di dalamnya dan menguncinya, isinya **tidak bisa diganti**. Cocok untuk data tetap seperti \`namaAplikasi\`.
- **\`var\` (Variable — Papan Tulis Kapur):** Isinya bisa dihapus dan ditulis ulang berkali-kali. Cocok untuk data yang berubah seperti \`jumlahPoin\`.

> **Aturan Emas Pemula:** Selalu mulai dengan \`val\`. Baru ganti ke \`var\` jika kamu yakin nilainya perlu berubah di tengah jalan.`,
        thinkingSteps: [
          "Predict: Baca kode di bawah dan tebak apakah baris ke-5 berhasil atau error.",
          "Run: Jalankan di Kotlin Playground (play.kotlinlang.org) untuk melihat hasilnya.",
          "Investigate: Gunakan prompt Gemini untuk memahami pesan error Val cannot be reassigned.",
          "Modify: Ubah poin menjadi var agar bisa bernilai 15.",
        ],
        instructions: [
          "Baca cuplikan kode BelajarVariabel.kt dan tuliskan tebakanmu terlebih dahulu.",
          "Jalankan kode tersebut di play.kotlinlang.org.",
          "Tanyakan arti error-nya ke Gemini jika muncul garis merah, lalu perbaiki sendiri.",
        ],
        code: [
          {
            filename: "BelajarVariabel.kt",
            language: "kotlin",
            code: `fun main() {
    val poin = 10
    var nyawa = 3
    nyawa = 2
    poin = 15 // Tebak: baris ini berhasil atau error?
    println("Poin: $poin, Nyawa: $nyawa")
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan val dan var serta membaca pesan error compiler Kotlin.",
        promptKonteks: "Saya pemula total belajar Kotlin dasar menggunakan pendekatan PRIMM.",
        promptInstruksi: [
          "Baca kode BelajarVariabel.kt yang saya tempel.",
          "Jelaskan arti pesan error 'Val cannot be reassigned' dalam bahasa sehari-hari.",
          "Berikan 1 pertanyaan latihan singkat untuk menguji pemahaman kapan memakai val vs var.",
        ],
        promptBatasan: [
          "JANGAN tulis ulang kode yang sudah diperbaiki.",
          "Gunakan maksimal 3 paragraf pendek.",
        ],
        promptHasilAkhir: "Penjelasan arti error + 1 pertanyaan latihan.",
        promptValidasi: "Saya bisa memperbaiki sendiri kode sehingga mencetak 'Poin: 15, Nyawa: 2'.",
        expectedResult: "Program mencetak Poin: 15, Nyawa: 2 setelah kamu mengganti val menjadi var.",
        validationCheck: [
          "Sudah menebak hasil kode sebelum menekan Run.",
          "Berhasil memperbaiki error tanpa menyalin kode utuh dari AI.",
        ],
        quiz: {
          question: "Untuk menyimpan 'Tanggal Lahir' pengguna yang tidak pernah berubah saat aplikasi berjalan, kata kunci mana yang paling tepat?",
          options: ["var", "val", "fun", "class"],
          correctIndex: 1,
          explanation: "Gunakan val untuk nilai yang tidak berubah agar lebih aman dari perubahan yang tidak disengaja.",
        },
      }),
      makeLesson({
        id: "m2-l2",
        moduleId: "modul-2",
        num: 2,
        title: "Tipe Data Sehari-hari (String, Int, Boolean) & Teks Template",
        slug: "tipe-data-dasar-kotlin",
        description:
          "Memahami 3 jenis isi kotak data paling sering dipakai di aplikasi: teks (String), angka bulat (Int), dan ya/tidak (Boolean).",
        objective:
          "Pemula mampu mendeklarasikan String, Int, dan Boolean serta menggabungkannya dengan String Template ($).",
        concept: `## Tiga Jenis Isi Kotak Data

Setiap kotak variabel di Kotlin punya jenis isi (**Tipe Data**) agar komputer tidak salah menghitung:
1. **\`String\` (Teks):** Selalu diapit tanda kutip ganda, misalnya \`"Belajar Kotlin"\`.
2. **\`Int\` (Angka Bulat):** Angka tanpa koma dan tanpa tanda kutip, misalnya \`25\`.
3. **\`Boolean\` (Status Ya/Tidak):** Hanya punya dua nilai: \`true\` (benar/aktif) atau \`false\` (salah/mati).

Untuk menyisipkan variabel ke dalam teks, Kotlin punya cara praktis bernama **String Template** menggunakan tanda \`$\`: \`"Halo $nama, skormu $skor"\`.`,
        thinkingSteps: [
          "Predict: Perhatikan perbedaan \"10\" + \"5\" (String) dengan 10 + 5 (Int).",
          "Run: Uji di Kotlin Playground.",
          "Modify: Buat variabel nama, umur (Int), dan sudahSarapan (Boolean) milikmu sendiri.",
        ],
        instructions: [
          "Tebak apa yang dicetak oleh baris teksGabung vs angkaJumlah.",
          "Jalankan kode di play.kotlinlang.org dan periksa apakah tebakanmu benar.",
          "Tambahkan 1 variabel Boolean baru bernama siapBelajar = true dan cetak ke layar.",
        ],
        code: [
          {
            filename: "TipeData.kt",
            language: "kotlin",
            code: `fun main() {
    val teksGabung = "10" + "5"
    val angkaJumlah = 10 + 5
    val sudahSelesai: Boolean = false

    println("Hasil teks: $teksGabung")
    println("Hasil angka: $angkaJumlah")
    println("Status selesai: $sudahSelesai")
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan String dan Int saat memakai operator +.",
        promptKonteks: "Saya baru mengenal tipe data String, Int, dan Boolean di Kotlin.",
        promptInstruksi: [
          "Jelaskan kenapa \"10\" + \"5\" menghasilkan \"105\", sedangkan 10 + 5 menghasilkan 15.",
          "Beri 1 contoh kasus nyata di aplikasi HP di mana kita wajib memakai Boolean.",
        ],
        promptBatasan: [
          "Jangan berikan kode proyek lengkap.",
          "Maksimal 3 paragraf.",
        ],
        promptHasilAkhir: "Penjelasan sederhana tentang tipe data dan String Template.",
        promptValidasi: "Saya bisa membedakan String, Int, dan Boolean tanpa tertukar.",
        expectedResult: "Program menampilkan Hasil teks: 105 dan Hasil angka: 15.",
        validationCheck: [
          "Memahami mengapa teks perlu tanda kutip dan angka tidak.",
          "Berhasil memakai $namaVariabel di dalam println().",
        ],
      }),
      makeLesson({
        id: "m2-l3",
        moduleId: "modul-2",
        num: 3,
        title: "Mengambil Keputusan dengan if, else, dan when",
        slug: "percabangan-if-else-when",
        description:
          "Melatih aplikasi mengambil keputusan otomatis berdasarkan kondisi tertentu menggunakan if/else dan when.",
        objective:
          "Pemula mampu menulis logika percabangan sederhana if/else dan when di Kotlin.",
        concept: `## Analogi Lampu Lalu Lintas

Aplikasi terasa pintar karena bisa memilih tindakan berbeda tergantung situasinya:
- **\`if / else\`:** Jika kondisi benar (\`true\`), lakukan A; kalau tidak, lakukan B.
- **\`when\`:** Versi lebih rapi saat pilihannya lebih dari dua (misalnya status: \`"Baru"\`, \`"Proses"\`, \`"Selesai"\`).

Di Kotlin, \`if\` dan \`when\` bahkan bisa langsung mengembalikan nilai ke dalam variabel \`val\`, sehingga kode jadi singkat dan bersih!`,
        thinkingSteps: [
          "Predict: Jika nilaiUjian = 75, apakah statusnya Lulus atau Remedial?",
          "Run: Jalankan kode dan ubah-ubah angka nilaiUjian (misal 69, 70, 95).",
          "Modify: Tambahkan kondisi when untuk memberi predikat A, B, atau C.",
        ],
        instructions: [
          "Tebak output untuk nilaiUjian = 75 dan nilaiUjian = 70.",
          "Jalankan kode di play.kotlinlang.org.",
          "Ubah batas lulus menjadi 75 dan lihat perubahan output-nya.",
        ],
        code: [
          {
            filename: "LogikaKeputusan.kt",
            language: "kotlin",
            code: `fun main() {
    val nilaiUjian = 75
    val status = if (nilaiUjian >= 70) "Lulus" else "Belajar Lagi"
    println("Status: $status")

    val tingkat = when {
        nilaiUjian >= 90 -> "Sangat Baik"
        nilaiUjian >= 70 -> "Baik"
        else -> "Perlu Latihan"
    }
    println("Predikat: $tingkat")
}`,
          },
        ],
        promptTujuan: "Memahami alur kerja if/else dan when sebagai ekspresi di Kotlin.",
        promptKonteks: "Saya pemula yang sedang membedah contoh kode LogikaKeputusan.kt.",
        promptInstruksi: [
          "Jelaskan arti simbol >= dan -> pada blok when di kode saya.",
          "Berikan 1 soal latihan kecil memakai when untuk status baterai HP (misal >80, >20, else).",
        ],
        promptBatasan: [
          "Jangan langsung menuliskan jawaban soal latihan baterainya.",
        ],
        promptHasilAkhir: "Penjelasan simbol percabangan + 1 latihan mandiri.",
        promptValidasi: "Saya bisa menulis 1 blok when sederhana secara mandiri.",
        expectedResult: "Program mencetak status dan predikat sesuai angka nilaiUjian.",
        validationCheck: [
          "Mengerti arti >=, ==, dan else.",
          "Sudah mencoba mengubah angka batas kelulusan dan melihat hasilnya.",
        ],
      }),
      makeLesson({
        id: "m2-l4",
        moduleId: "modul-2",
        num: 4,
        title: "Null-Safety Dasar (? dan ?:) Agar Aplikasi Tidak Crash",
        slug: "null-safety-dasar-kotlin",
        description:
          "Mengenal arti nilai kosong (null) di Kotlin dan cara aman menanganinya dengan operator Elvis (?:).",
        objective:
          "Pemula memahami perbedaan String dan String? serta cara memberi nilai cadangan dengan ?:",
        concept: `## Analogi Kotak Kosong yang Diberi Label

Dalam aplikasi nyata, data kadang belum diisi (misalnya nama panggilan pengguna masih kosong). Keadaan "tidak ada isi sama sekali" di pemrograman disebut **\`null\`**.

Di bahasa lama, menyentuh data \`null\` sering membuat aplikasi mendadak keluar sendiri (*crash*). Kotlin mencegah hal ini:
- **\`String\`:** Dijamin selalu berisi teks, tidak boleh \`null\`.
- **\`String?\`:** Boleh kosong (\`null\`). Tanda tanya \`?\` artinya *"hati-hati, kotak ini bisa saja kosong"*.
- **\`?:\` (Elvis Operator):** Nilai cadangan otomatis kalau ternyata kosong: \`val tampil = nama ?: "Tamu"\`.`,
        thinkingSteps: [
          "Predict: Jika catatan = null, apa yang dicetak oleh baris println?",
          "Run: Jalankan kode dengan catatan = null, lalu ganti jadi \"Bawa buku\".",
          "Investigate: Tanya Gemini apa yang terjadi jika tanda ? di String? dihapus.",
        ],
        instructions: [
          "Tebak hasil eksekusi saat variabel catatan bernilai null.",
          "Jalankan kode, lalu ganti nilai catatan menjadi kalimat biasa.",
          "Coba hapus tanda ? pada String? untuk melihat bagaimana Kotlin melindungimu sebelum aplikasi dijalankan.",
        ],
        code: [
          {
            filename: "AmanDariNull.kt",
            language: "kotlin",
            code: `fun main() {
    val catatan: String? = null
    val teksAman = catatan ?: "Belum ada catatan"
    val panjangHuruf = catatan?.length ?: 0

    println("Isi: $teksAman")
    println("Jumlah huruf: $panjangHuruf")
}`,
          },
        ],
        promptTujuan: "Memahami mengapa Kotlin memisahkan String dan String? serta cara kerja operator ?:",
        promptKonteks: "Saya pemula yang sedang mempelajari file AmanDariNull.kt.",
        promptInstruksi: [
          "Jelaskan perbedaan ?. dan ?: dengan analogi kehidupan sehari-hari.",
          "Beri 1 pertanyaan cek pemahaman singkat.",
        ],
        promptBatasan: [
          "Jangan sarankan memakai operator !! (non-null assertion).",
          "Maksimal 3 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman konsep null-safety dasar yang aman.",
        promptValidasi: "Saya tahu kenapa memakai ?: lebih aman daripada memaksa nilai kosong.",
        expectedResult: "Program tetap berjalan mulus tanpa crash dan mencetak nilai cadangan.",
        validationCheck: [
          "Memahami arti tanda tanya pada String?.",
          "Berhasil memakai ?: untuk memberi nilai default.",
        ],
      }),
    ],
  },

  // =========================================================================
  // MODUL 3: DAFTAR DATA & FUNGSI KECIL (LIST, DATA CLASS, FUN)
  // =========================================================================
  {
    id: "modul-3",
    course_id: COURSE_INFO.id,
    module_number: 3,
    title: "Daftar Data & Fungsi Kecil (List, data class, fun)",
    slug: "modul-3-daftar-data-dan-fungsi",
    description:
      "Membungkus logika berulang menjadi fungsi (fun), mengelompokkan data terkait (data class), dan menyaring daftar (List.filter).",
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
        title: "Membungkus Logika ke Dalam Fungsi (fun)",
        slug: "fungsi-kotlin-reusable",
        description:
          "Membuat blok tugas kecil yang bisa dipanggil berkali-kali dengan input berbeda menggunakan kata kunci fun.",
        objective:
          "Pemula mampu membuat fungsi dengan parameter dan nilai kembali (return value).",
        concept: `## Analogi Mesin Blender

Bayangkan kamu membuat jus 10 kali sehari. Kamu tidak merakit mesin setiap kali butuh jus—kamu cukup memasukkan buah (**parameter**), menekan tombol, dan keluar segelas jus (**return value**).

Di Kotlin, mesin tersebut adalah **fungsi (\`fun\`)**:
\`\`\`kotlin
fun sapa(nama: String): String {
    return "Halo, $nama!"
}
\`\`\`
Dengan fungsi, kode tidak perlu ditulis berulang-ulang dan jauh lebih mudah dibaca.`,
        thinkingSteps: [
          "Predict: Tebak hasil pemanggilan hitungDiskon(100000, 10).",
          "Run: Jalankan dan panggil fungsi tersebut dua kali dengan angka berbeda.",
          "Modify: Buat fungsi baru bernama hitungLuasPersegi(sisi: Int): Int.",
        ],
        instructions: [
          "Baca fungsi hitungTotal pada cuplikan kode dan tebak output-nya.",
          "Jalankan kode di play.kotlinlang.org.",
          "Tambahkan satu pemanggilan fungsi baru di dalam main() dengan angka milikmu sendiri.",
        ],
        code: [
          {
            filename: "BelajarFungsi.kt",
            language: "kotlin",
            code: `fun hitungTotal(harga: Int, jumlah: Int): Int {
    return harga * jumlah
}

fun main() {
    val kopi = hitungTotal(15000, 2)
    val roti = hitungTotal(8000, 3)
    println("Total kopi: Rp$kopi")
    println("Total roti: Rp$roti")
}`,
          },
        ],
        promptTujuan: "Memahami anatomi fungsi Kotlin: nama fungsi, parameter input, dan tipe return.",
        promptKonteks: "Saya pemula mempelajari fungsi hitungTotal di BelajarFungsi.kt.",
        promptInstruksi: [
          "Tunjukkan mana bagian input (parameter) dan mana bagian output (return) pada kode saya.",
          "Berikan 1 ide fungsi kecil lain untuk latihan saya tulis sendiri.",
        ],
        promptBatasan: [
          "Jangan tulis kode jawaban latihan yang kamu berikan.",
        ],
        promptHasilAkhir: "Pemahaman struktur fungsi sederhana di Kotlin.",
        promptValidasi: "Saya bisa memanggil fungsi yang sama dengan nilai input berbeda.",
        expectedResult: "Program mencetak Total kopi: Rp30000 dan Total roti: Rp24000.",
        validationCheck: [
          "Mengetahui arti kata kunci fun dan return.",
          "Berhasil membuat minimal 1 fungsi sederhana sendiri.",
        ],
      }),
      makeLesson({
        id: "m3-l2",
        moduleId: "modul-3",
        num: 2,
        title: "Mengelompokkan Data Terkait dengan data class",
        slug: "mengenal-data-class-kotlin",
        description:
          "Menyatukan beberapa informasi milik satu benda (misalnya judul, kategori, status) ke dalam satu cetakan data class.",
        objective:
          "Pemula mampu membuat data class dan menyalin perubahan data memakai .copy().",
        concept: `## Analogi Kartu Identitas (KTP)

Kalau satu catatan punya 3 data (\`id\`, \`judul\`, \`selesai\`), membuat 30 variabel terpisah untuk 10 catatan pasti merepotkan. Solusinya adalah membuat **cetakan kartu** bernama **\`data class\`**.

Keuntungan \`data class\` di Kotlin:
- Mudah dicetak langsung dengan \`println()\`.
- Punya fungsi **\`.copy()\`** untuk membuat salinan baru dengan hanya mengubah satu bagian tanpa merusak data asli.`,
        thinkingSteps: [
          "Predict: Setelah cat2 = cat1.copy(selesai = true), apakah cat1.selesai ikut berubah?",
          "Run: Jalankan kode dan periksa isi cat1 dan cat2.",
          "Modify: Tambahkan properti baru prioritas: String = \"Normal\" ke dalam data class.",
        ],
        instructions: [
          "Tebak nilai cat1.selesai dan cat2.selesai sebelum menjalankan kode.",
          "Jalankan kode di play.kotlinlang.org.",
          "Ubah isi judul pada cat2 lewat .copy(judul = ..., selesai = true).",
        ],
        code: [
          {
            filename: "BelajarDataClass.kt",
            language: "kotlin",
            code: `data class Catatan(
    val id: Int,
    val judul: String,
    val selesai: Boolean = false
)

fun main() {
    val cat1 = Catatan(1, "Baca Modul Kotlin")
    val cat2 = cat1.copy(selesai = true)
    println("Asli   : $cat1")
    println("Salinan: $cat2")
}`,
          },
        ],
        promptTujuan: "Memahami alasan memakai data class dan fungsi .copy() dibanding mengubah variabel langsung.",
        promptKonteks: "Saya pemula sedang mempelajari BelajarDataClass.kt.",
        promptInstruksi: [
          "Jelaskan kenapa .copy() sangat berguna saat nanti kita membuat tampilan layar di Jetpack Compose.",
        ],
        promptBatasan: [
          "Gunakan bahasa sederhana tanpa istilah arsitektur rumit.",
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman konsep immutability sederhana lewat .copy().",
        promptValidasi: "Saya tahu bahwa .copy() tidak mengubah objek aslinya.",
        expectedResult: "cat1 tetap selesai=false, sedangkan cat2 berubah menjadi selesai=true.",
        validationCheck: [
          "Berhasil membuat 1 data class sendiri.",
          "Memahami cara kerja .copy().",
        ],
      }),
      makeLesson({
        id: "m3-l3",
        moduleId: "modul-3",
        num: 3,
        title: "Menyimpan Banyak Item dengan List dan mutableListOf",
        slug: "menyimpan-daftar-list-kotlin",
        description:
          "Mengenal daftar data berurutan (List) yang bersifat tetap dan daftar yang bisa ditambah atau dihapus (mutableListOf).",
        objective:
          "Pemula mampu membuat List<T>, membaca jumlah item (.size), dan menambah item ke mutableListOf.",
        concept: `## Analogi Rak Buku vs Keranjang Belanja

- **\`listOf(...)\` (Rak Pajangan):** Daftarnya tetap, hanya untuk dibaca (aman dari perubahan tak sengaja).
- **\`mutableListOf(...)\` (Keranjang Belanja):** Bisa ditambah (\`.add(...)\`) dan dihapus (\`.removeAt(...)\`).

Ingat: komputer selalu mulai menghitung urutan (*index*) dari angka **0**, bukan 1! Item pertama berada di posisi \`[0]\`.`,
        thinkingSteps: [
          "Predict: Jika daftar punya 3 item, apa yang dicetak oleh daftar[1]?",
          "Run: Uji tebakanmu di Kotlin Playground.",
          "Modify: Tambah 1 item baru memakai .add() lalu cetak jumlah totalnya dengan .size.",
        ],
        instructions: [
          "Tebak item mana yang muncul dari buah[1].",
          "Jalankan kode di play.kotlinlang.org.",
          "Tambahkan 1 item lagi ke daftar dan cetak seluruh isinya memakai perulangan for.",
        ],
        code: [
          {
            filename: "BelajarList.kt",
            language: "kotlin",
            code: `fun main() {
    val daftarBelanja = mutableListOf("Buku", "Pulpen", "Penggaris")
    println("Item index 1: \${daftarBelanja[1]}")

    daftarBelanja.add("Penghapus")
    println("Total item: \${daftarBelanja.size}")
    for (item in daftarBelanja) {
        println("- $item")
    }
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan listOf vs mutableListOf dan index dimulai dari 0.",
        promptKonteks: "Saya pemula sedang mempelajari BelajarList.kt.",
        promptInstruksi: [
          "Jelaskan apa yang terjadi jika saya memanggil daftarBelanja[10] padahal isinya hanya 4 item.",
          "Berikan 1 tips cara aman mengecek isi List sebelum mengakses index-nya.",
        ],
        promptBatasan: [
          "Jangan berikan kode program panjang.",
        ],
        promptHasilAkhir: "Pemahaman index 0 dan pencegahan IndexOutOfBoundsException.",
        promptValidasi: "Saya tahu item pertama ada di index 0 dan bisa menambah item ke mutableListOf.",
        expectedResult: "Program mencetak Item index 1: Pulpen dan Total item: 4.",
        validationCheck: [
          "Tahu perbedaan listOf dan mutableListOf.",
          "Mengerti cara kerja perulangan for (item in daftar).",
        ],
      }),
      makeLesson({
        id: "m3-l4",
        moduleId: "modul-3",
        num: 4,
        title: "Menyaring & Mengolah Daftar Data (filter & map) dengan PRIMM",
        slug: "menyaring-daftar-filter-map",
        description:
          "Mengolah List data class dengan cara ringkas memakai .filter untuk menyaring dan .map untuk mengambil bagian tertentu.",
        objective:
          "Pemula mampu memakai List.filter dengan variabel implisit it untuk mencari data sesuai kondisi.",
        concept: `## Analogi Menyaring Biji Kopi

Di aplikasi nyata, pengguna sering ingin melihat *"daftar yang belum selesai saja"* atau *"cari yang mengandung kata tertentu"*. Kotlin menyediakan fungsi ajaib:
- **\`.filter { syarat }\`:** Memilih item yang memenuhi syarat. Di dalam kurung kurawal, kata **\`it\`** mewakili *"satu item yang sedang diperiksa saat ini"*.
- **\`.map { ubah }\`:** Mengubah tiap item menjadi bentuk lain (misalnya mengambil judulnya saja).`,
        thinkingSteps: [
          "Predict: Dari 3 item catatan, berapa item yang lolos dari filter { !it.selesai }?",
          "Run: Jalankan kode dan periksa hasilnya.",
          "Investigate: Tanya Gemini arti tanda seru ! pada !it.selesai.",
          "Modify: Ubah filter agar hanya mencari catatan yang mengandung kata 'Kotlin'.",
        ],
        instructions: [
          "Tebak jumlah dan isi daftar belumSelesai.",
          "Jalankan kode di play.kotlinlang.org.",
          "Modifikasi filter untuk mencari judul dengan .contains(\"Kotlin\", ignoreCase = true).",
        ],
        code: [
          {
            filename: "SaringCatatan.kt",
            language: "kotlin",
            code: `data class Item(val judul: String, val selesai: Boolean)

fun main() {
    val semua = listOf(
        Item("Install Android Studio", true),
        Item("Belajar Kotlin val/var", false),
        Item("Coba Jetpack Compose", false)
    )
    val belumSelesai = semua.filter { !it.selesai }
    val daftarJudul = belumSelesai.map { it.judul }
    println("Belum selesai: $daftarJudul")
}`,
          },
        ],
        promptTujuan: "Memahami cara kerja kata kunci it di dalam .filter dan .map.",
        promptKonteks: "Saya pemula sedang mempelajari kode SaringCatatan.kt dengan metode PRIMM.",
        promptInstruksi: [
          "Jelaskan apa arti 'it' dan tanda '!' pada baris semua.filter { !it.selesai }.",
          "Ajukan 1 pertanyaan singkat untuk menguji pemahaman saya tentang .filter.",
        ],
        promptBatasan: [
          "Jangan ubah kode saya secara utuh.",
          "Maksimal 3 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman jelas tentang lambda filter dan variabel it.",
        promptValidasi: "Saya bisa menulis filter baru tanpa bingung arti kata kunci it.",
        expectedResult: "Program mencetak daftar judul yang belum selesai saja.",
        validationCheck: [
          "Memahami bahwa it berarti item saat ini.",
          "Berhasil memodifikasi syarat filter sendiri.",
        ],
      }),
    ],
  },

  // =========================================================================
  // MODUL 4: LAYAR PERTAMA DENGAN JETPACK COMPOSE
  // =========================================================================
  {
    id: "modul-4",
    course_id: COURSE_INFO.id,
    module_number: 4,
    title: "Layar Pertama dengan Jetpack Compose",
    slug: "modul-4-layar-pertama-jetpack-compose",
    description:
      "Mengenal @Composable dan @Preview, menyusun tata letak Column & Row, mempercantik tampilan dengan Modifier, serta membuat Card Material 3.",
    estimated_minutes: 60,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 4,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m4-l1",
        moduleId: "modul-4",
        num: 1,
        title: "Mengenal @Composable & Cara Kerja @Preview",
        slug: "mengenal-composable-dan-preview",
        description:
          "Memahami bagaimana fungsi Kotlin berubah menjadi komponen tampilan layar dan melihat hasilnya instan lewat @Preview.",
        objective:
          "Pemula mampu membuat satu fungsi @Composable dan menampilkannya di panel Preview Android Studio.",
        concept: `## Analogi Balok LEGO Digital

Dulu, membuat tampilan Android harus menulis file XML terpisah. Sekarang dengan **Jetpack Compose**, tampilan ditulis langsung memakai fungsi Kotlin yang diberi label **\`@Composable\`**.

Setiap \`@Composable\` seperti satu balok LEGO (\`Text\`, \`Button\`, \`Icon\`) yang bisa disusun dan dipakai ulang. Tambahkan label **\`@Preview(showBackground = true)\`** di atas fungsi agar kamu bisa melihat hasilnya di Android Studio tanpa harus menunggu Emulator menyala.`,
        thinkingSteps: [
          "Perhatikan huruf awal nama fungsi @Composable (selalu diawali Huruf Kapital, misal KartuSalam).",
          "Jalankan Preview di tab Split / Design di Android Studio.",
          "Modify: Ubah fontSize dan warna teks pada Text().",
        ],
        instructions: [
          "Buat file baru atau tambahkan fungsi KartuSalam di MainActivity.kt.",
          "Tambahkan @Preview(showBackground = true) di atas fungsi preview.",
          "Klik ikon Build & Refresh di panel Preview sebelah kanan.",
        ],
        code: [
          {
            filename: "KartuSalam.kt",
            language: "kotlin",
            code: `@Composable
fun KartuSalam(nama: String) {
    Text(
        text = "Selamat datang, $nama!",
        style = MaterialTheme.typography.headlineSmall
    )
}

@Preview(showBackground = true)
@Composable
fun PreviewKartuSalam() {
    KartuSalam(nama = "Rina")
}`,
          },
        ],
        promptTujuan: "Memahami syarat fungsi @Composable dan fungsi @Preview.",
        promptKonteks: "Saya pemula sedang mencoba membuat @Composable pertama di Android Studio.",
        promptInstruksi: [
          "Jelaskan kenapa fungsi @Composable diawali huruf kapital sedangkan fungsi biasa diawali huruf kecil.",
          "Jelaskan kenapa fungsi @Preview tidak boleh punya parameter wajib.",
        ],
        promptBatasan: [
          "Penjelasan ringkas maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman aturan dasar @Composable dan @Preview.",
        promptValidasi: "Preview KartuSalam muncul di panel sebelah kanan Android Studio.",
        expectedResult: "Teks Selamat datang tampil di panel Preview tanpa menjalankan emulator.",
        validationCheck: [
          "Fungsi memiliki anotasi @Composable.",
          "Preview berhasil tampil di Android Studio.",
        ],
      }),
      makeLesson({
        id: "m4-l2",
        moduleId: "modul-4",
        num: 2,
        title: "Menyusun Tata Letak dengan Column & Row",
        slug: "tata-letak-column-dan-row",
        description:
          "Menyusun elemen layar secara ke bawah (Column) dan ke samping (Row) dengan jarak rapi.",
        objective:
          "Pemula mampu menggabungkan Column dan Row untuk menyusun tata letak layar yang teratur.",
        concept: `## Dua Arah Dasar Penyusunan Layar

Jika kamu menaruh dua \`Text()\` tanpa wadah, keduanya akan saling bertumpuk di tempat yang sama! Untuk merapikannya, gunakan dua wadah utama:
- **\`Column\`:** Menyusun komponen **ke bawah** (vertikal, seperti daftar menu).
- **\`Row\`:** Menyusun komponen **ke samping** (horizontal, seperti ikon di sebelah judul).

Gunakan \`verticalArrangement = Arrangement.spacedBy(8.dp)\` pada \`Column\` atau \`horizontalArrangement\` pada \`Row\` agar otomatis ada jarak antar komponen.`,
        thinkingSteps: [
          "Predict: Gambar sketsa kotak sederhana di kertas sebelum menyusun Column & Row.",
          "Run: Lihat hasil Preview susunan Column dan Row.",
          "Modify: Tambahkan 1 Row lagi di bawahnya untuk menampilkan tanggal dan status.",
        ],
        instructions: [
          "Ketik atau salin contoh ProfilRingkas ke Android Studio.",
          "Lihat hasil Preview-nya.",
          "Ubah jarak spacedBy(8.dp) menjadi 16.dp dan amati perubahannya.",
        ],
        code: [
          {
            filename: "ProfilRingkas.kt",
            language: "kotlin",
            code: `@Composable
fun ProfilRingkas(nama: String, peran: String) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Person, contentDescription = null)
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(text = nama, style = MaterialTheme.typography.titleMedium)
            Text(text = peran, style = MaterialTheme.typography.bodySmall)
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan susunan Column vs Row dan pengaturan Alignment.",
        promptKonteks: "Saya pemula sedang menyusun tampilan profil dengan Row dan Column di Jetpack Compose.",
        promptInstruksi: [
          "Jelaskan perbedaan verticalArrangement pada Column vs verticalAlignment pada Row dengan bahasa sederhana.",
        ],
        promptBatasan: [
          "Jangan berikan kode layar lengkap.",
          "Gunakan maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman intuisi tata letak 2 arah di Jetpack Compose.",
        promptValidasi: "Ikon dan dua baris teks tersusun rapi berdampingan di Preview.",
        expectedResult: "Ikon orang berada di sebelah kiri nama dan peran yang tersusun atas-bawah.",
        validationCheck: [
          "Komponen tidak lagi saling bertumpuk.",
          "Memahami kapan memakai Column dan kapan memakai Row.",
        ],
      }),
      makeLesson({
        id: "m4-l3",
        moduleId: "modul-4",
        num: 3,
        title: "Mempercantik Tampilan dengan Modifier",
        slug: "mempercantik-dengan-modifier",
        description:
          "Mengatur ruang napas (padding), ukuran lebar (fillMaxWidth), warna latar, dan sudut membulat memakai Modifier.",
        objective:
          "Pemula memahami cara merangkai Modifier dan mengapa urutan Modifier memengaruhi tampilan akhir.",
        concept: `## Analogi Membungkus Kado (Urutan Itu Penting!)

**\`Modifier\`** adalah alat rias untuk komponen Compose. Kamu bisa merangkainya berurutan dari atas ke bawah:
\`\`\`kotlin
Modifier
    .fillMaxWidth()
    .padding(16.dp)
    .background(Color.LightGray)
\`\`\`
**Hati-hati dengan urutan!**
- \`.padding(16.dp).background(Color)\` → memberi jarak luar dulu (margin), baru mewarnai bagian dalam.
- \`.background(Color).padding(16.dp)\` → mewarnai seluruh kotak dulu, baru memberi jarak di dalam kotak.`,
        thinkingSteps: [
          "Predict: Bandingkan hasil saat .padding() ditaruh sebelum vs sesudah .background().",
          "Run: Tukar urutan keduanya dan lihat langsung di Preview.",
          "Modify: Tambahkan .clip(RoundedCornerShape(12.dp)) sebelum .background().",
        ],
        instructions: [
          "Pasang Modifier.fillMaxWidth().padding(16.dp) pada komponen Column.",
          "Coba tukar posisi .background() dan .padding() lalu lihat bedanya di Preview.",
        ],
        code: [
          {
            filename: "KotakRapi.kt",
            language: "kotlin",
            code: `@Composable
fun KotakRapi(judul: String) {
    Text(
        text = judul,
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(MaterialTheme.colorScheme.primaryContainer)
            .padding(16.dp)
    )
}`,
          },
        ],
        promptTujuan: "Memahami kenapa urutan pemanggilan fungsi pada Modifier mengubah tampilan.",
        promptKonteks: "Saya pemula sedang bereksperimen menukar urutan .padding() dan .background() di Compose.",
        promptInstruksi: [
          "Jelaskan kenapa .padding() di awal bertindak seperti margin luar, sedangkan .padding() setelah .background() bertindak seperti padding dalam.",
        ],
        promptBatasan: [
          "Gunakan analogi pembungkus kado atau bingkai foto.",
        ],
        promptHasilAkhir: "Pemahaman visual urutan Modifier di Compose.",
        promptValidasi: "Bisa mengatur jarak dalam dan jarak luar kotak secara tepat.",
        expectedResult: "Teks berada di dalam kotak berwarna dengan sudut membulat dan ruang napas rapi.",
        validationCheck: [
          "Memahami pengaruh urutan Modifier.",
          "Kotak tampil dengan sudut membulat dan padding nyaman dibaca.",
        ],
      }),
      makeLesson({
        id: "m4-l4",
        moduleId: "modul-4",
        num: 4,
        title: "Membuat Kartu Data Rapi dengan Card Material 3",
        slug: "membuat-kartu-material-3",
        description:
          "Menggabungkan Card, Row, Column, dan Icon untuk membangun satu kartu daftar item bergaya aplikasi modern.",
        objective:
          "Pemula mampu merancang komponen Card reusable yang menerima data sebagai parameter.",
        concept: `## Prinsip Komponen Reusable

Dalam aplikasi modern, kita tidak menulis desain kartu satu per satu untuk 50 item. Kita membuat **1 cetakan \`@Composable\`** (misalnya \`KartuItem\`) yang menerima data sebagai parameter:
- \`judul: String\`
- \`subjudul: String\`
- \`selesai: Boolean\`

Komponen \`Card\` dari Material 3 otomatis memberi sudut membulat, warna permukaan yang lembut, dan garis batas/bayangan tipis.`,
        thinkingSteps: [
          "Rancang struktur di dalam Card: Row -> Column (Modifier.weight(1f)) -> Badge/Status di kanan.",
          "Tanya diri sendiri: kenapa Column teks perlu Modifier.weight(1f)? (Supaya judul panjang tidak mendorong ikon di kanan keluar layar!).",
        ],
        instructions: [
          "Buat komponen KartuItem dengan parameter judul, kategori, dan selesai.",
          "Bungkus isi kartu dengan Card(modifier = Modifier.fillMaxWidth()).",
          "Uji di Preview dengan satu judul pendek dan satu judul sangat panjang.",
        ],
        code: [
          {
            filename: "KartuItem.kt",
            language: "kotlin",
            code: `@Composable
fun KartuItem(judul: String, kategori: String) {
    Card(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp)) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(text = kategori, style = MaterialTheme.typography.labelSmall)
                Text(text = judul, style = MaterialTheme.typography.titleMedium)
            }
            Icon(Icons.Default.ChevronRight, contentDescription = null)
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami fungsi Modifier.weight(1f) pada Row agar teks panjang tidak merusak tata letak.",
        promptKonteks: "Saya pemula membuat komponen KartuItem.kt di Jetpack Compose Material 3.",
        promptInstruksi: [
          "Jelaskan apa yang terjadi pada ikon kanan jika Modifier.weight(1f) dihapus saat teks judul sangat panjang.",
        ],
        promptBatasan: [
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman tata letak responsif sederhana di dalam Row.",
        promptValidasi: "Kartu tetap rapi meskipun judulnya 2 baris.",
        expectedResult: "Satu komponen Card Material 3 rapi yang siap dipakai berulang di daftar.",
        validationCheck: [
          "Komponen Card menerima parameter dinamis (bukan teks statis).",
          "Sudah diuji dengan teks panjang di Preview.",
        ],
      }),
    ],
  },

  // =========================================================================
  // MODUL 5: MEMBUAT APLIKASI HIDUP (BUTTON, STATE, & TEXTFIELD)
  // =========================================================================
  {
    id: "modul-5",
    course_id: COURSE_INFO.id,
    module_number: 5,
    title: "Membuat Aplikasi Hidup (Button, State, & TextField)",
    slug: "modul-5-state-dan-interaksi",
    description:
      "Memahami kenapa layar berubah saat tombol diklik (State & Recomposition), remember { mutableStateOf(...) }, form ketikan TextField, dan LazyColumn.",
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
        title: "Kenapa Layar Tidak Berubah? Mengenal State & Recomposition",
        slug: "state-dan-recomposition-dasar",
        description:
          "Memecahkan kebingungan klasik pemula: mengapa variabel var biasa tidak membuat teks di layar Compose ikut berubah saat tombol diklik.",
        objective:
          "Pemula memahami konsep State dan Recomposition secara intuitif.",
        concept: `## Analogi Papan Skor Stadion

Jika kamu menulis \`var skor = 0\` biasa di dalam \`@Composable\` dan menambahkannya saat tombol diklik (\`skor++\`), angka di layar **tidak akan berubah**! Mengapa? Karena Jetpack Compose tidak tahu bahwa variabel biasa itu baru saja diubah.

Agar layar otomatis digambar ulang (**Recomposition**) saat data berubah, data tersebut harus dibungkus sebagai **State** (\`mutableStateOf\`). Begitu isi State berubah, Compose otomatis menyegarkan komponen yang membacanya.`,
        thinkingSteps: [
          "Predict: Apa yang terjadi jika variabel penghitung memakai var biasa tanpa mutableStateOf?",
          "Run: Bandingkan sebelum dan sesudah memakai mutableStateOf.",
          "Investigate: Tanya Gemini apa arti kata Recomposition dengan analogi sederhana.",
        ],
        instructions: [
          "Baca kode PenghitungKlik di bawah ini.",
          "Jalankan di Emulator atau Interactive Preview di Android Studio.",
          "Klik tombol Tambah beberapa kali dan amati angka di layar.",
        ],
        code: [
          {
            filename: "PenghitungKlik.kt",
            language: "kotlin",
            code: `@Composable
fun PenghitungKlik() {
    var jumlah by remember { mutableStateOf(0) }

    Column(modifier = Modifier.padding(24.dp)) {
        Text(text = "Tombol ditekan: $jumlah kali")
        Spacer(modifier = Modifier.height(12.dp))
        Button(onClick = { jumlah++ }) {
            Text("Tambah +1")
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan var biasa dan remember { mutableStateOf(...) } di Jetpack Compose.",
        promptKonteks: "Saya pemula yang baru mencoba PenghitungKlik.kt.",
        promptInstruksi: [
          "Jelaskan kenapa tanpa 'remember', angka 'jumlah' akan kembali menjadi 0 setiap kali layar digambar ulang.",
          "Beri 1 pertanyaan cek pemahaman.",
        ],
        promptBatasan: [
          "Gunakan bahasa non-akademis yang ramah pemula.",
        ],
        promptHasilAkhir: "Pemahaman jelas mengapa State dan remember selalu berpasangan.",
        promptValidasi: "Angka di layar bertambah setiap kali tombol diklik.",
        expectedResult: "Tombol interaktif pertama berfungsi dan memperbarui angka di layar secara real-time.",
        validationCheck: [
          "Mengetahui fungsi mutableStateOf (memicu gambar ulang).",
          "Mengetahui fungsi remember (menjaga nilai agar tidak reset ke awal).",
        ],
      }),
      makeLesson({
        id: "m5-l2",
        moduleId: "modul-5",
        num: 2,
        title: "Mengenal Tombol & Umpan Balik Visual (Toggle State)",
        slug: "tombol-dan-toggle-state",
        description:
          "Mengubah status Boolean (aktif/nonaktif atau selesai/belum) lewat tombol dan Checkbox dengan umpan balik visual langsung.",
        objective:
          "Pemula mampu membuat state Boolean untuk mengubah teks, warna, atau garis coret di layar.",
        concept: `## Mengubah Tampilan Berdasarkan State

Begitu kamu menguasai \`Boolean\` state (\`true\`/\`false\`), layar bisa langsung merespons pengguna:
- Teks berubah: *"Belum Selesai"* ↔ *"Sudah Tuntas"*
- Gaya teks berubah: \`TextDecoration.LineThrough\` (garis coret) saat \`selesai == true\`.

Ini adalah fondasi semua fitur interaktif seperti tombol suka (*Like*), tandai selesai (*Checklist*), atau mode gelap.`,
        thinkingSteps: [
          "Predict: Apa efek tanda seru !selesai saat Checkbox diklik?",
          "Modify: Tambahkan warna teks yang berbeda saat selesai == true vs false.",
        ],
        instructions: [
          "Buat komponen BarisChecklist sederhana dengan Checkbox dan Text.",
          "Hubungkan onCheckedChange dengan perubahan state Boolean.",
          "Uji dengan mengklik kotak centang beberapa kali di Interactive Preview.",
        ],
        code: [
          {
            filename: "BarisChecklist.kt",
            language: "kotlin",
            code: `@Composable
fun BarisChecklist(judul: String) {
    var selesai by remember { mutableStateOf(false) }

    Row(verticalAlignment = Alignment.CenterVertically) {
        Checkbox(checked = selesai, onCheckedChange = { selesai = it })
        Text(
            text = judul,
            textDecoration = if (selesai) TextDecoration.LineThrough else TextDecoration.None
        )
    }
}`,
          },
        ],
        promptTujuan: "Memahami bagaimana satu state Boolean mengendalikan beberapa properti visual sekaligus.",
        promptKonteks: "Saya pemula sedang melatih BarisChecklist.kt.",
        promptInstruksi: [
          "Jelaskan apa isi variabel 'it' di dalam onCheckedChange = { selesai = it }.",
        ],
        promptBatasan: [
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman alur event onCheckedChange di Compose.",
        promptValidasi: "Teks otomatis tercoret saat Checkbox dicentang.",
        expectedResult: "Klik Checkbox mencoret dan menghapus coretan teks secara mulus.",
        validationCheck: [
          "Checkbox dapat dicentang dan dibatalkan.",
          "Teks merespons perubahan state.",
        ],
      }),
      makeLesson({
        id: "m5-l3",
        moduleId: "modul-5",
        num: 3,
        title: "Menerima Ketikan Pengguna dengan OutlinedTextField",
        slug: "form-input-outlined-textfield",
        description:
          "Menghubungkan kotak ketikan pengguna dengan state String serta menonaktifkan tombol Simpan jika input masih kosong.",
        objective:
          "Pemula mampu membuat input teks terkontrol dan melakukan validasi sederhana sebelum submit.",
        concept: `## Pola Dua Arah pada Input Teks

Di Jetpack Compose, kotak ketikan (\`OutlinedTextField\`) tidak menyimpan teksnya sendiri. Kamu harus menyediakan:
1. **\`value\`:** Teks yang sedang tampil (diambil dari \`remember { mutableStateOf("") }\`).
2. **\`onValueChange\`:** Aksi setiap kali pengguna menekan 1 huruf di keyboard.

Untuk mencegah pengguna menyimpan teks kosong (atau hanya spasi), gunakan **\`enabled = teks.isNotBlank()\`** pada tombol Simpan!`,
        thinkingSteps: [
          "Predict: Apa yang terjadi jika onValueChange = {} dibiarkan kosong?",
          "Run: Uji mengetik di OutlinedTextField dan lihat tombol Tambah aktif saat teks terisi.",
          "Modify: Tambahkan tombol Reset untuk mengosongkan kembali kotak teks.",
        ],
        instructions: [
          "Buat komponen InputCatatan dengan OutlinedTextField dan Button.",
          "Tambahkan enabled = inputTeks.isNotBlank() pada Button.",
          "Uji mengetik spasi saja — pastikan tombol tetap nonaktif.",
        ],
        code: [
          {
            filename: "InputCatatan.kt",
            language: "kotlin",
            code: `@Composable
fun InputCatatan(onTambah: (String) -> Unit) {
    var teks by remember { mutableStateOf("") }

    Row(verticalAlignment = Alignment.CenterVertically) {
        OutlinedTextField(
            value = teks,
            onValueChange = { teks = it },
            label = { Text("Tulis catatan") },
            modifier = Modifier.weight(1f)
        )
        Spacer(Modifier.width(8.dp))
        Button(
            onClick = { onTambah(teks.trim()); teks = "" },
            enabled = teks.isNotBlank()
        ) {
            Text("Tambah")
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan .isNotEmpty() dan .isNotBlank() untuk validasi form pemula.",
        promptKonteks: "Saya membuat form input di Jetpack Compose dengan OutlinedTextField.",
        promptInstruksi: [
          "Jelaskan perbedaan teks.isNotEmpty() dengan teks.isNotBlank() jika pengguna mengetik 3 spasi.",
        ],
        promptBatasan: [
          "Jawab singkat maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman validasi teks kosong dan whitespace.",
        promptValidasi: "Tombol tidak bisa diklik saat input kosong atau hanya berisi spasi.",
        expectedResult: "Kotak input bisa diketik, tombol aktif saat ada huruf, dan kotak kosong kembali setelah diklik.",
        validationCheck: [
          "Tombol nonaktif saat input kosong/spasi.",
          "Input otomatis bersih setelah tombol Tambah diklik.",
        ],
      }),
      makeLesson({
        id: "m5-l4",
        moduleId: "modul-5",
        num: 4,
        title: "Menampilkan Daftar Dinamis di Layar dengan LazyColumn",
        slug: "daftar-dinamis-lazycolumn",
        description:
          "Menampilkan daftar item yang panjang dan bisa di-scroll dengan hemat memori menggunakan LazyColumn.",
        objective:
          "Pemula mampu menggabungkan Input + State List + LazyColumn menjadi satu layar interaktif utuh.",
        concept: `## Analogi Memuat Foto di Galeri

Kalau kamu punya 1.000 item dan memasukkannya ke \`Column\`, HP akan menggambar semuanya sekaligus dan terasa lambat. **\`LazyColumn\`** lebih pintar: ia hanya menggambar item yang sedang terlihat di layar saat di-scroll!

Tambahkan parameter \`key = { it }\` atau \`key = { item -> item.id }\` agar Compose mengenali tiap baris dengan akurat saat ada item yang ditambah atau dihapus.`,
        thinkingSteps: [
          "Gabungkan state daftar item (mutableStateListOf) dengan komponen InputCatatan dari materi sebelumnya.",
          "Tampilkan daftarnya menggunakan LazyColumn { items(daftar) { ... } }.",
        ],
        instructions: [
          "Buat layar mini CatatanSederhana menggunakan remember { mutableStateListOf<String>() }.",
          "Sambungkan InputCatatan agar menambahkan teks baru ke daftar.",
          "Uji menambahkan 5 item berbeda dan scroll daftarnya.",
        ],
        code: [
          {
            filename: "LayarCatatanMini.kt",
            language: "kotlin",
            code: `@Composable
fun LayarCatatanMini() {
    val daftar = remember { mutableStateListOf("Contoh catatan pertama") }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        InputCatatan(onTambah = { baru -> daftar.add(0, baru) })
        Spacer(Modifier.height(16.dp))
        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(daftar) { teks ->
                KartuItem(judul = teks, kategori = "Catatan")
            }
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami perbedaan Column biasa dan LazyColumn serta kapan memakai mutableStateListOf.",
        promptKonteks: "Saya menggabungkan InputCatatan dan LazyColumn di LayarCatatanMini.kt.",
        promptInstruksi: [
          "Jelaskan apa arti daftar.add(0, baru) dibanding daftar.add(baru).",
          "Beri 1 ide bagaimana cara menambahkan tombol hapus di samping tiap item.",
        ],
        promptBatasan: [
          "Jangan langsung menulis kode solusi tombol hapusnya.",
        ],
        promptHasilAkhir: "Layar daftar interaktif pertama berjalan di Emulator.",
        promptValidasi: "Menambah catatan baru langsung memunculkannya di paling atas daftar.",
        expectedResult: "Aplikasi catatan mini di memori sudah bisa menambah dan menggulir daftar secara langsung.",
        validationCheck: [
          "Item baru muncul di daftar begitu tombol Tambah diklik.",
          "Daftar dapat di-scroll dengan lancar.",
        ],
      }),
    ],
  },

  // =========================================================================
  // MODUL 6: MENYIMPAN DATA & BERPINDAH HALAMAN
  // =========================================================================
  {
    id: "modul-6",
    course_id: COURSE_INFO.id,
    module_number: 6,
    title: "Menyimpan Data & Berpindah Halaman",
    slug: "modul-6-simpan-data-dan-navigasi",
    description:
      "Menjaga agar data tidak hilang saat aplikasi ditutup dengan penyimpanan lokal sederhana, berpindah 2 layar, dan memisahkan logika ke ViewModel.",
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
        title: "Mengenal Penyimpanan Lokal Sederhana (SharedPreferences)",
        slug: "penyimpanan-lokal-sharedpreferences",
        description:
          "Menyimpan pengaturan atau teks sederhana ke memori HP sehingga datanya tetap ada meski aplikasi ditutup.",
        objective:
          "Pemula memahami perbedaan memori sementara (RAM / remember) dengan memori permanen HP.",
        concept: `## Analogi Catatan di Kertas vs Papan Tulis

Sejauh ini semua data kita memakai \`remember\`. Begitu aplikasi ditutup penuh (*force close*), semua catatan hilang karena \`remember\` hanya hidup di RAM.

Untuk menyimpan data ringan agar bertahan di memori HP (seperti nama pengguna, preferensi tema, atau catatan ringkas), Android menyediakan **\`SharedPreferences\`** yang menyimpan data dalam bentuk pasangan **Kunci → Nilai** (*Key–Value*), mirip kamus kecil.`,
        thinkingSteps: [
          "Identifikasi data mana yang cukup disimpan lokal sebagai Key-Value.",
          "Pahami 2 operasi utamanya: edit().putString(kunci, nilai).apply() dan getString(kunci, default).",
        ],
        instructions: [
          "Pelajari fungsi simpanNama dan bacaNama di cuplikan kode.",
          "Tanyakan ke Gemini perbedaan .apply() dan .commit() pada SharedPreferences.",
        ],
        code: [
          {
            filename: "PenyimpananSederhana.kt",
            language: "kotlin",
            code: `fun simpanNama(context: Context, nama: String) {
    val prefs = context.getSharedPreferences("pengaturan_app", Context.MODE_PRIVATE)
    prefs.edit().putString("nama_pengguna", nama).apply()
}

fun bacaNama(context: Context): String {
    val prefs = context.getSharedPreferences("pengaturan_app", Context.MODE_PRIVATE)
    return prefs.getString("nama_pengguna", "Tamu") ?: "Tamu"
}`,
          },
        ],
        promptTujuan: "Memahami cara kerja penyimpanan Key-Value di SharedPreferences.",
        promptKonteks: "Saya pemula sedang mempelajari PenyimpananSederhana.kt.",
        promptInstruksi: [
          "Jelaskan fungsi parameter kedua pada getString(\"nama_pengguna\", \"Tamu\") dengan bahasa sederhana.",
        ],
        promptBatasan: [
          "Jangan perkenalkan library database kompleks dulu.",
        ],
        promptHasilAkhir: "Pemahaman jelas tentang baca/tulis Key-Value lokal.",
        promptValidasi: "Tahu di mana data disimpan saat aplikasi ditutup.",
        expectedResult: "Fungsi baca/tulis nama pengguna ke memori HP siap dipanggil dari UI.",
        validationCheck: [
          "Memahami perbedaan RAM (remember) dan Storage (SharedPreferences).",
          "Memahami peran kunci (key) saat membaca dan menyimpan.",
        ],
      }),
      makeLesson({
        id: "m6-l2",
        moduleId: "modul-6",
        num: 2,
        title: "Menyimpan & Membaca Daftar Data Saat Aplikasi Dibuka Ulang",
        slug: "membaca-data-saat-aplikasi-dibuka",
        description:
          "Menggunakan remember + LocalContext untuk langsung memuat data tersimpan begitu layar pertama kali tampil.",
        objective:
          "Pemula mampu memuat data tersimpan dari penyimpanan lokal ke state layar Compose saat pertama dibuka.",
        concept: `## Menghubungkan Storage ke State Layar

Di Jetpack Compose, kita bisa mengambil \`Context\` Android dengan satu baris:
\`val context = LocalContext.current\`

Lalu kita langsung mengisi nilai awal \`remember\` dengan data yang dibaca dari \`SharedPreferences\`, dan setiap kali pengguna menekan tombol Simpan, kita memperbarui **keduanya**: State layar *dan* \`SharedPreferences\`.`,
        thinkingSteps: [
          "Predict: Jika pengguna menyimpan nama 'Andi', menutup aplikasi, lalu membukanya lagi, nilai apa yang muncul pertama kali?",
          "Modify: Tambahkan tombol Hapus Nama yang mengembalikan nilainya ke string kosong.",
        ],
        instructions: [
          "Tambahkan komponen ProfilTersimpan ke proyek Android-mu.",
          "Jalankan di Emulator, ketik namamu, lalu klik Simpan.",
          "Tutup paksa aplikasi dari Recent Apps Emulator dan buka lagi — pastikan namamu masih ada!",
        ],
        code: [
          {
            filename: "ProfilTersimpan.kt",
            language: "kotlin",
            code: `@Composable
fun ProfilTersimpan() {
    val context = LocalContext.current
    var nama by remember { mutableStateOf(bacaNama(context)) }
    var input by remember { mutableStateOf(nama) }

    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Halo, $nama!")
        OutlinedTextField(value = input, onValueChange = { input = it })
        Button(onClick = { nama = input; simpanNama(context, input) }) {
            Text("Simpan ke Memori HP")
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami pola sinkronisasi antara UI State dan penyimpanan lokal HP.",
        promptKonteks: "Saya menguji ProfilTersimpan.kt di Emulator Android.",
        promptInstruksi: [
          "Jelaskan kenapa kita perlu memperbarui 'nama = input' sekaligus memanggil 'simpanNama(context, input)'.",
        ],
        promptBatasan: [
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Pemahaman alur baca saat start dan tulis saat aksi tombol.",
        promptValidasi: "Data tetap bertahan setelah aplikasi ditutup dan dibuka ulang.",
        expectedResult: "Nama yang disimpan tetap muncul saat aplikasi dibuka kembali.",
        validationCheck: [
          "Sudah menguji menutup dan membuka ulang aplikasi di Emulator/HP.",
        ],
      }),
      makeLesson({
        id: "m6-l3",
        moduleId: "modul-6",
        num: 3,
        title: "Berpindah Antar Dua Layar Secara Aman",
        slug: "berpindah-antar-dua-layar",
        description:
          "Mengenal cara sederhana berpindah antara Layar Daftar dan Layar Detail/Pengaturan menggunakan state halaman.",
        objective:
          "Pemula mampu membuat navigasi 2 layar yang bersih tanpa tersesat dengan library navigasi rumit.",
        concept: `## Navigasi Berbasis State untuk Pemula

Sebelum belajar library navigasi yang panjang, pemula bisa membuat navigasi 2 layar dengan sangat mudah hanya memakai sebuah \`var halamanAktif by remember { mutableStateOf("utama") }\` dan blok \`when\`:
- Jika \`"utama"\` → tampilkan \`LayarUtama(onBukaPengaturan = { halamanAktif = "pengaturan" })\`
- Jika \`"pengaturan"\` → tampilkan \`LayarPengaturan(onKembali = { halamanAktif = "utama" })\`

Pola ini mengajarkan konsep terpenting di Compose: **layar adalah fungsi dari state saat ini**.`,
        thinkingSteps: [
          "Rancang 2 nama halaman: \"utama\" dan \"pengaturan\".",
          "Berikan callback onBukaPengaturan dan onKembali ke masing-masing layar.",
        ],
        instructions: [
          "Buat enum atau string halamanAktif di komponen induk.",
          "Tambahkan tombol Pengaturan di layar utama dan tombol Kembali di layar kedua.",
          "Uji bolak-balik antar dua layar di Emulator.",
        ],
        code: [
          {
            filename: "NavigasiSederhana.kt",
            language: "kotlin",
            code: `@Composable
fun AplikasiDuaLayar() {
    var halaman by remember { mutableStateOf("utama") }

    when (halaman) {
        "utama" -> Column(Modifier.padding(24.dp)) {
            Text("Halaman Utama")
            Button(onClick = { halaman = "detail" }) { Text("Buka Detail") }
        }
        "detail" -> Column(Modifier.padding(24.dp)) {
            Text("Halaman Detail")
            Button(onClick = { halaman = "utama" }) { Text("Kembali") }
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami konsep navigasi berbasis state di Jetpack Compose.",
        promptKonteks: "Saya pemula yang baru mencoba AplikasiDuaLayar() di NavigasiSederhana.kt.",
        promptInstruksi: [
          "Jelaskan keunggulan membuat callback onKembali: () -> Unit daripada langsung mengubah state di dalam layar anak.",
        ],
        promptBatasan: [
          "Jangan memaksa saya langsung memasang Navigation Compose library jika konsep dasarnya belum diminta.",
        ],
        promptHasilAkhir: "Pemahaman state hoisting sederhana untuk navigasi.",
        promptValidasi: "Berhasil berpindah maju dan kembali antar dua layar.",
        expectedResult: "Tombol membuka layar kedua dan tombol kembali membawa ke layar utama.",
        validationCheck: [
          "Kedua layar tampil bergantian sesuai state.",
        ],
      }),
      makeLesson({
        id: "m6-l4",
        moduleId: "modul-6",
        num: 4,
        title: "Memisahkan Logika Aplikasi ke Kelas Pengelola (ViewModel)",
        slug: "memisahkan-logika-ke-viewmodel",
        description:
          "Merapikan kode agar layar Compose hanya mengurus tampilan, sedangkan data dan aturan bisnis tinggal di ViewModel.",
        objective:
          "Pemula mampu memindahkan daftar state dari layar Compose ke sebuah kelas ViewModel sederhana.",
        concept: `## Analogi Kasir vs Koki

Kalau satu file Compose mengurus warna tombol, tata letak, validasi teks, *dan* daftar data sekaligus, kodenya cepat berantakan. Kita pisahkan tugasnya:
- **Layar Compose (Kasir):** Hanya menampilkan apa yang ada dan melaporkan klik tombol.
- **ViewModel (Koki):** Menyimpan daftar data (\`mutableStateListOf\`) dan mengolah logika tambah/hapus.

Bonusnya: saat layar HP diputar (*rotate*), data di dalam \`ViewModel\` tidak ikut ter-reset!`,
        thinkingSteps: [
          "Pindahkan daftar catatan ke dalam class CatatanViewModel : ViewModel().",
          "Pindahkan fungsi tambahCatatan(judul: String) ke dalam ViewModel.",
          "Di Compose, cukup panggil viewModel.tambahCatatan(...).",
        ],
        instructions: [
          "Buat file CatatanViewModel.kt.",
          "Pindahkan logika validasi .isNotBlank() ke dalam fungsi ViewModel.",
          "Sambungkan CatatanViewModel ke layar utamamu.",
        ],
        code: [
          {
            filename: "CatatanViewModel.kt",
            language: "kotlin",
            code: `class CatatanViewModel : ViewModel() {
    val daftarCatatan = mutableStateListOf<String>()

    fun tambah(judul: String) {
        val bersih = judul.trim()
        if (bersih.isNotEmpty()) {
            daftarCatatan.add(0, bersih)
        }
    }

    fun hapus(index: Int) {
        if (index in daftarCatatan.indices) {
            daftarCatatan.removeAt(index)
        }
    }
}`,
          },
        ],
        promptTujuan: "Memahami pemisahan tugas antara UI Compose dan ViewModel.",
        promptKonteks: "Saya pemula yang baru memindahkan logika tambah dan hapus daftar ke CatatanViewModel.kt.",
        promptInstruksi: [
          "Jelaskan kenapa pengecekan 'if (index in daftarCatatan.indices)' penting sebelum menghapus item.",
        ],
        promptBatasan: [
          "Maksimal 2 paragraf.",
        ],
        promptHasilAkhir: "Kode proyek lebih bersih dan aman dari bug index.",
        promptValidasi: "Layar Compose tinggal memanggil viewModel.tambah() dan viewModel.hapus().",
        expectedResult: "Struktur kode rapi: logika berada di ViewModel, tampilan berada di Composable.",
        validationCheck: [
          "Fitur tambah dan hapus berjalan lewat ViewModel.",
          "Memahami alasan memisahkan UI dan logika.",
        ],
      }),
    ],
  },

  // =========================================================================
  // MODUL 7: MEMBACA ERROR LOGCAT, MODIFIKASI MANDIRI & RILIS KE GITHUB
  // =========================================================================
  {
    id: "modul-7",
    course_id: COURSE_INFO.id,
    module_number: 7,
    title: "Membaca Error Logcat, Modifikasi Mandiri & Rilis ke GitHub",
    slug: "modul-7-debugging-modifikasi-dan-rilis",
    description:
      "Cara membaca pesan error merah di Logcat bersama Gemini Mode 3, menambah 1 fitur kreasi sendiri, membangun file APK, dan mengunggah proyek ke GitHub.",
    estimated_minutes: 70,
    difficulty_level: "Pemula",
    is_published: true,
    order_index: 7,
    created_at: CREATED_AT,
    lessons: [
      makeLesson({
        id: "m7-l1",
        moduleId: "modul-7",
        num: 1,
        title: "Cara Membaca Error Merah & Caused by di Logcat Bersama Gemini",
        slug: "membaca-error-logcat-bersama-gemini",
        description:
          "Tidak lagi panik melihat ratusan baris log merah: temukan baris Caused by: dan bedah bersama Gemini Mode 3.",
        objective:
          "Pemula mampu menemukan baris penyebab crash di Logcat dan meminta petunjuk perbaikan tanpa salin buta.",
        concept: `## Jurus 3 Detik Membaca Logcat

Saat aplikasi crash, **Logcat** memang menampilkan puluhan baris teks merah. Jangan dibaca semua! Cari saja 2 kata kunci ini:
1. **Filter \`Error\`** di bilah atas Logcat Android Studio.
2. Cari baris yang diawali **\`Caused by:\`** lalu lihat tautan biru nama file & nomor barismu sendiri (misal \`MainActivity.kt:42\`).

Setelah ketemu, tempel 5–10 baris tersebut ke Gemini menggunakan **Mode 3 (Bedah Error Logcat)** agar kamu mengerti akar masalahnya, bukan sekadar menempel tambalan.`,
        thinkingSteps: [
          "Buka tab Logcat di bawah Android Studio.",
          "Ketik package aplikasi atau pilih level Error.",
          "Salin bagian Exception / Caused by, lalu tempel ke prompt Mode 3 Gemini.",
        ],
        instructions: [
          "Pelajari contoh log error pada cuplikan kode.",
          "Temukan file dan baris penyebab error pada contoh tersebut.",
          "Uji menempelkannya ke Gemini menggunakan aturan Mode 3.",
        ],
        code: [
          {
            filename: "ContohLogcatError.txt",
            language: "text",
            code: `FATAL EXCEPTION: main
java.lang.IndexOutOfBoundsException: Index 5 out of bounds for length 3
    at com.belajar.app.MainActivityKt.LayarCatatan(MainActivity.kt:48)`,
          },
        ],
        promptTujuan: "Mendiagnosis penyebab crash dari cuplikan Logcat dengan panduan Socratic Gemini.",
        promptKonteks: "Saya pemula Android dan baru menemukan error IndexOutOfBoundsException di Logcat.",
        promptInstruksi: [
          "Jelaskan arti error tersebut dengan bahasa manusia.",
          "Tunjuk baris dan file mana yang harus saya buka.",
          "Beri 1 petunjuk pengecekan yang harus saya tambahkan agar error ini tidak terulang.",
        ],
        promptBatasan: [
          "JANGAN langsung memberi kode perbaikan siap salin.",
        ],
        promptHasilAkhir: "Pemahaman cara membaca stack trace Logcat secara mandiri.",
        promptValidasi: "Saya bisa menemukan nama file dan nomor baris penyebab error dalam 10 detik.",
        expectedResult: "Kamu tidak lagi takut saat melihat error merah di Android Studio.",
        validationCheck: [
          "Tahu cara membuka tab Logcat dan mencari 'Caused by:'.",
          "Sudah mencoba Mode 3 ke Gemini.",
        ],
      }),
      makeLesson({
        id: "m7-l2",
        moduleId: "modul-7",
        num: 2,
        title: "Latihan Modifikasi Mandiri: Tambah 1 Fitur Pembeda",
        slug: "latihan-modifikasi-mandiri-fitur-pembeda",
        description:
          "Menerapkan tahap Make pada siklus PRIMM dengan merancang dan membangun sendiri minimal 1 fitur tambahan.",
        objective:
          "Pemula mampu merancang alur Input-Proses-Output untuk 1 fitur baru dan mengimplementasikannya bersama Gemini.",
        concept: `## Saatnya Tahap *Make* (Karya Milikmu Sendiri)

Sekarang kamu sudah punya fondasi lengkap: variabel, list, Compose UI, state, penyimpanan lokal, dan debugging. Pilih **1 fitur tambahan** untuk memperkaya aplikasimu, misalnya:
- Kotak pencarian kata kunci di atas daftar catatan (memakai \`.filter\`).
- Penanda kategori warna (Penting / Belajar / Pribadi).
- Penghitung jumlah item aktif di judul atas.
- Dialog konfirmasi *"Yakin ingin menghapus?"* sebelum item terhapus.

Wajib tulis rancangan **Input → Proses → Output** lebih dulu sebelum membuka Gemini!`,
        thinkingSteps: [
          "Pilih 1 fitur pembeda yang paling kamu suka.",
          "Tulis Input -> Proses -> Output-nya dalam 3 baris.",
          "Gunakan Gemini untuk menanyakan konsep bagian yang belum kamu kuasai, lalu rakit sendiri.",
        ],
        instructions: [
          "Pilih salah satu ide fitur tambahan di atas.",
          "Implementasikan di proyek Android-mu.",
          "Uji langsung di Emulator atau HP untuk memastikan fitur berjalan tanpa crash.",
        ],
        code: [
          {
            filename: "RancanganFiturMandiri.md",
            language: "markdown",
            code: `# Contoh Rancangan Fitur Pencarian
Input  : Pengguna mengetik kata kunci di kotak Cari
Proses : Saring daftarCatatan dengan .filter { it.contains(kataKunci, true) }
Output : LazyColumn hanya menampilkan item yang cocok`,
          },
        ],
        promptTujuan: "Mendapatkan bimbingan langkah demi langkah untuk menambahkan fitur pencarian di daftar catatan.",
        promptKonteks: "Saya sudah punya LayarCatatanMini dengan ViewModel dan ingin menambah kotak pencarian.",
        promptInstruksi: [
          "Baca rancangan Input-Proses-Output saya.",
          "Sebutkan state baru apa saja yang saya butuhkan.",
          "Berikan langkah bertahap (tanpa kode proyek penuh) cara menyambungkan kotak pencarian ke daftar.",
        ],
        promptBatasan: [
          "Jangan menulis ulang seluruh file MainActivity saya.",
        ],
        promptHasilAkhir: "Panduan implementasi fitur pembeda yang tetap dipahami pemula.",
        promptValidasi: "Fitur tambahan berfungsi dan saya bisa menjelaskan cara kerjanya.",
        expectedResult: "Aplikasimu memiliki ciri khas fitur buatanmu sendiri.",
        validationCheck: [
          "Menulis rancangan Input-Proses-Output sebelum coding.",
          "Minimal 1 fitur tambahan berjalan lancar saat diuji.",
        ],
      }),
      makeLesson({
        id: "m7-l3",
        moduleId: "modul-7",
        num: 3,
        title: "Membangun File APK & Menguji Aplikasi di HP Android",
        slug: "membangun-file-apk-dan-uji-hp",
        description:
          "Menghasilkan file installer .apk dari Android Studio agar aplikasimu bisa dipasang langsung di HP Android.",
        objective:
          "Pemula mampu mengekspor Build APK dan menguji seluruh alur aplikasi di perangkat nyata atau emulator.",
        concept: `## Mengubah Kode Menjadi Aplikasi Nyata (.apk)

Supaya teman atau guru bisa mencoba aplikasimu di HP mereka, kita perlu membungkus proyek menjadi satu file installer **\`.apk\`**:
1. Di menu atas Android Studio, klik **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
2. Tunggu beberapa saat sampai muncul notifikasi **Build APK(s) generated successfully** di pojok kanan bawah.
3. Klik tulisan **locate** untuk langsung membuka folder berisi file \`app-debug.apk\`.

Sebelum dibagikan, selalu uji ulang semua tombol: tambah, hapus, tutup aplikasi lalu buka lagi!`,
        thinkingSteps: [
          "Pastikan tidak ada error merah di proyek sebelum Build APK.",
          "Uji skenario ekstrem (input kosong, teks panjang, tutup dan buka ulang app).",
        ],
        instructions: [
          "Klik Build → Build Bundle(s) / APK(s) → Build APK(s).",
          "Temukan file app-debug.apk lewat tombol locate.",
          "Ubah namanya menjadi nama-aplikasi-kamu.apk lalu pasang di Emulator atau HP.",
        ],
        promptTujuan: "Mengatasi kendala jika Build APK gagal di Android Studio.",
        promptKonteks: "Saya mencoba Build APK(s) di Android Studio untuk pertama kalinya.",
        promptInstruksi: [
          "Sebutkan 3 hal paling umum yang membuat Build APK gagal bagi pemula dan cara mengeceknya di tab Build Output.",
        ],
        promptBatasan: [
          "Jawab ringkas dalam bentuk daftar bernomor.",
        ],
        promptHasilAkhir: "Daftar cek cepat apabila proses build APK menemui kendala.",
        promptValidasi: "File .apk terbentuk dan aplikasi dapat dipasang tanpa error.",
        expectedResult: "File .apk siap diuji dan dilampirkan pada rilis proyek.",
        validationCheck: [
          "File app-debug.apk berhasil dibuat.",
          "Seluruh fitur utama sudah diuji setelah instalasi.",
        ],
      }),
      makeLesson({
        id: "m7-l4",
        moduleId: "modul-7",
        num: 4,
        title: "Mengunggah ke GitHub, Menulis README.md & Mengumpulkan Karya",
        slug: "unggah-github-readme-dan-kumpulkan-karya",
        description:
          "Mempublikasikan proyek ke repository GitHub publik, menulis dokumentasi singkat yang jujur, dan mengumpulkan karya di ComposeLab.",
        objective:
          "Pemula mampu push proyek ke GitHub, menulis README.md, dan mengirim karya melalui halaman Kumpulan Karya.",
        concept: `## Menutup Proyek Layaknya Engineer Profesional

Kode yang bagus perlu **dokumentasi (\`README.md\`)** agar orang lain tahu apa yang kamu buat dan apa yang kamu pelajari.

Isi minimal \`README.md\` untuk pemula:
1. **Nama & Tujuan Aplikasi:** 1–2 kalimat penjelasan singkat.
2. **Fitur yang Dibuat:** Daftar fitur utama + fitur pembeda buatanmu sendiri.
3. **Refleksi Belajar Bersama Gemini:** 1 paragraf singkat tentang error atau konsep tersulit yang berhasil kamu pahami lewat PRIMM!`,
        thinkingSteps: [
          "Pastikan repository GitHub berstatus Public (bukan Private).",
          "Ambil 1 screenshot layar aplikasimu yang paling rapi.",
          "Kumpulkan link GitHub, link APK (opsional), dan screenshot di halaman Kumpulan Karya.",
        ],
        instructions: [
          "Buat repository publik baru di github.com.",
          "Push proyek Android Studio-mu ke repository tersebut (atau unggah lewat menu Git di Android Studio).",
          "Buat file README.md di root proyek dan unggah screenshot aplikasimu.",
          "Buka halaman Kumpulan Karya di ComposeLab untuk mengirim karyamu!",
        ],
        code: [
          {
            filename: "README.md",
            language: "markdown",
            code: `# Proyek Android Pertamaku

Aplikasi catatan & daftar tugas sederhana yang dibangun bertahap dengan Kotlin & Jetpack Compose.

## Fitur Utama
- Menambah dan menandai item selesai
- Penyimpanan lokal agar data tidak hilang
- Fitur kreasi mandiri: [Tulis fitur buatanmu]

## Yang Saya Pelajari
Memahami perbedaan val/var, State/Recomposition, serta cara membedah error Logcat menggunakan Gemini tanpa asal salin kode.`,
          },
        ],
        promptTujuan: "Menyusun draf README.md singkat dan rapi berdasarkan fitur yang benar-benar saya buat.",
        promptKonteks: "Saya sudah menyelesaikan aplikasi Android pertama saya dan ingin mengunggahnya ke GitHub.",
        promptInstruksi: [
          "Bantu saya merapikan teks README.md berdasarkan daftar fitur yang saya sebutkan.",
          "Jangan mengarang fitur yang tidak saya kerjakan.",
        ],
        promptBatasan: [
          "Gunakan format Markdown sederhana yang mudah dibaca.",
        ],
        promptHasilAkhir: "File README.md siap salin ke repository GitHub.",
        promptValidasi: "Link repository GitHub bisa dibuka publik dan berisi file build.gradle.kts serta README.md.",
        expectedResult: "Karya terpublikasi di GitHub dan berhasil dikirim di halaman Kumpulan Karya.",
        validationCheck: [
          "Repository GitHub berstatus Public.",
          "README.md sudah terisi rapi.",
          "Formulir Kumpulan Karya sudah dikirim.",
        ],
      }),
    ],
  },
];
