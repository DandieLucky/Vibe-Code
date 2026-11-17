# Riset Primer: Implementasi Google Gemini API dan Pedagogi Pemrograman Pemula Tanpa *Vibecoding*

Dokumen ini merangkum temuan dari sumber primer resmi Google Gemini API (`ai.google.dev` / `aistudio.google.com`) dan literatur riset primer pendidikan ilmu komputer (*computing education research*) sebagai landasan teknis dan pedagogis untuk membangun asisten belajar pemrograman pemula yang mencegah ketergantungan *vibecoding* (meminta AI menulis solusi utuh tanpa pemahaman).

---

## Bagian 1: Dokumentasi Resmi Google Gemini API (Status November 2026)

### 1.1 Pemilihan Model & Jadwal Deprecasi

Berdasarkan dokumentasi resmi model dan deprecasi Google Gemini API ([Models](https://ai.google.dev/gemini-api/docs/models), [Latest Models](https://aistudio.google.com/docs/latest-model.md), [Deprecations](https://ai.google.dev/gemini-api/docs/deprecations)):

* **Peringatan Deprecasi `gemini-2.5-flash` & `gemini-2.5-pro`:** Keduanya berstatus **deprecated** dan sudah tidak tersedia di Google AI Studio. Efektif **1 Desember 2026**, seluruh permintaan API ke `gemini-2.5-flash` akan otomatis dirutekan ke `gemini-3.5-flash-lite`, dan `gemini-2.5-pro` ke `gemini-3.8-flash` (ditagih sesuai tarif model pengganti). Untuk proyek baru, jangan gunakan seri 2.5 (kecuali `gemini-2.5-flash-lite` yang belum memiliki jadwal penghentian).
* **Model Rekomendasi Saat Ini untuk Coding & Tutoring:**

| Model | Model ID | Konteks / Max Output | *Thinking Levels* | Harga Paid Tier (per 1M token) | Rekomendasi Penggunaan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Gemini 4 Hydrogen** | `gemini-4-hydrogen` | 1M terpadu / 64K default (1M *long decode*) | `low`, `medium`, `high` (default), `xhigh` | \$1.50 input / \$7.50 output | **Default utama** untuk tutoring interaktif, coding harian, dan *agentic workflows*. Mengurangi klaim fabrikasi >5× dibanding `gemini-3.8-flash` dengan menandai konteks yang kurang ([What's new](https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen.md)). |
| **Gemini 4 Argon** | `gemini-4-argon` | 1M terpadu / 64K default (1M *long decode*) | `low`, `medium` (default), `high` | \$2.00 input / \$10.00 output (intro s/d 30 Nov 2026) | Penalaran frontier efisien; lebih cepat dan hemat *thinking tokens* dibanding Carbon untuk rekayasa perangkat lunak lanjutan ([Latest Models](https://aistudio.google.com/docs/latest-model.md)). |
| **Gemini 4 Carbon** | `gemini-4-carbon` | 1M terpadu / 64K default (1M *long decode*) | `low`, `medium` (default), `high` | \$2.00 input / \$10.00 output (intro s/d 30 Nov 2026) | Penalaran terdalam untuk *root-cause debugging* kompleks, arsitektur sistem, dan verifikasi ketat ([What's new Carbon](https://aistudio.google.com/docs/whats-new-gemini-4-carbon.md)). |
| **Gemini 3.5 Flash-Lite** | `gemini-3.5-flash-lite` | 1M input / 64K output | `minimal` (default), `low`, `medium`, `high` | \$0.30 input / \$2.50 output | Latensi terendah & biaya termurah untuk klasifikasi niat siswa, *routing*, atau evaluasi rubrik ringan. |

> **Catatan Parameter Sampling:** Model **Gemini 4 dan Gemini 3.6+ mengabaikan** nilai kustom `temperature`, `top_p`, dan `top_k` serta mengembalikan header peringatan deprecasi ([Text Generation](https://aistudio.google.com/docs/text-generation.md)). Kendalikan kedalaman penalaran, latensi, dan biaya menggunakan `thinking_level`.

---

### 1.2 SDK Resmi `@google/genai` vs REST & Interactions API vs `generateContent`

Google mewajibkan penggunaan SDK kanonik **`@google/genai`** (JavaScript/TypeScript) atau `google-genai` (Python). Paket lama `@google/generative-ai` berstatus **deprecated** ([llms.txt](https://aistudio.google.com/llms.txt), [Quickstart](https://ai.google.dev/gemini-api/docs/quickstart)).

Terdapat dua antarmuka API:
1. **Interactions API (Direkomendasikan — GA sejak Juni 2026):** Standar baru untuk semua proyek baru (`ai.interactions.create` / `POST /v1beta/interactions`). Mendukung state percakapan sisi server via `previous_interaction_id` (default `store=true`; gunakan `store=false` untuk mode *stateless*), *context caching* multi-turn yang lebih hemat biaya, serta langkah eksekusi terpisah (`thought`, `model_output`, `code_execution_call`) ([Interactions Overview](https://ai.google.dev/gemini-api/docs/interactions-overview), [Migration Guide](https://aistudio.google.com/docs/migrate-to-interactions.md)).
2. **`generateContent` API (Legacy):** Tetap didukung penuh untuk integrasi lama (`ai.models.generateContent` / `POST /v1beta/models/{model}:generateContent`), bersifat *stateless* secara bawaan.

---

### 1.3 `systemInstruction` & *Structured Outputs* (JSON Schema)

#### A. Konfigurasi `systemInstruction`

* **Interactions API (`@google/genai` TypeScript/JS):** menggunakan properti tingkat atas `system_instruction` dan membaca hasil lewat `interaction.output_text`:

```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({}); // Otomatis membaca GEMINI_API_KEY

const interaction = await ai.interactions.create({
  model: "gemini-4-hydrogen",
  system_instruction: "Anda adalah tutor pemrograman Socratic. Jangan pernah memberikan kode solusi utuh.",
  input: "Kenapa loop saya tidak berhenti?",
  generation_config: {
    thinking_level: "medium",
  },
});

console.log(interaction.output_text);
```

* **Interactions API (REST):**

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Api-Revision: 2026-05-20" \
  -d '{
    "model": "gemini-4-hydrogen",
    "system_instruction": "Anda adalah tutor pemrograman Socratic.",
    "input": "Kenapa loop saya tidak berhenti?"
  }'
```

* **`generateContent` API (Legacy `@google/genai` & REST):** Pada SDK JS, parameter bernama `config.systemInstruction` dan output pada `response.text`; pada REST `/v1beta/models/gemini-4-hydrogen:generateContent`, gunakan `"system_instruction": { "parts": [{ "text": "..." }] }` ([Text Generation - generateContent](https://ai.google.dev/gemini-api/docs/text-generation?generate-content=true)).

#### B. *Structured Outputs* (JSON Schema + Zod)

Sangat berguna untuk memaksa tutor mengembalikan respons terstruktur (mis. diagnosis kesalahan siswa, pertanyaan pemantik Socratic, dan status penguasaan konsep tanpa membocorkan kode solusi).

* **Interactions API + Zod v4 (`@google/genai`):** Gunakan `response_format` dengan `type: "text"`, `mime_type: "application/json"`, dan `schema` ([Structured Outputs](https://ai.google.dev/gemini-api/docs/structured-output)):

```typescript
import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

const TutorStepSchema = z.object({
  misconception_detected: z.string().describe("Ringkasan miskonsepsi logika siswa."),
  pedagogical_stage: z.enum(["predict", "investigate", "modify", "debug_hint"]),
  socratic_question: z.string().describe("Satu pertanyaan pemantik tanpa membocorkan kode jawaban."),
  hint_lines: z.array(z.string()).describe("Nomor baris atau konsep yang perlu diperiksa siswa."),
});

const ai = new GoogleGenAI({});
const interaction = await ai.interactions.create({
  model: "gemini-4-hydrogen",
  system_instruction: "Evaluasi kode siswa secara Socratic tanpa memberi kode perbaikan langsung.",
  input: "Kode siswa: ...",
  response_format: {
    type: "text",
    mime_type: "application/json",
    schema: z.toJSONSchema(TutorStepSchema),
  },
});

const parsed = TutorStepSchema.parse(JSON.parse(interaction.output_text ?? "{}"));
```

*(Pada legacy `generateContent`, gunakan `config: { responseMimeType: "application/json", responseJsonSchema: z.toJSONSchema(schema) }` — [Structured Outputs generateContent](https://ai.google.dev/gemini-api/docs/structured-output?generate-content=true)).*

* **Batasan Penting JSON Schema (Sumber: [Structured Outputs](https://ai.google.dev/gemini-api/docs/structured-output)):**
  * Mendukung `string`, `number`, `integer`, `boolean`, `object`, `array`, `null` (via `type: ["string", "null"]`), `enum`, `anyOf`, `required`, `additionalProperties`, `minItems`/`maxItems`, `minimum`/`maximum`.
  * **Constraint tidak ditegakkan oleh server:** `minLength`, `maxLength`, `minProperties`, `maxProperties`, `uniqueItems`, `contains`, `minContains`, dan `maxContains` otomatis dihapus saat normalisasi dan **tidak** ditegakkan selama *constrained decoding*. Selalu jalankan validasi klien (mis. `schema.parse(...)` dengan Zod).
  * **Batas kompleksitas:** Skema yang terlalu dalam/bercabang memicu error `400 INVALID_ARGUMENT`. Jaga struktur tetap datar, pindahkan aturan non-struktural ke `description`, dan hindari `enum`/`anyOf` raksasa.

#### C. *Code Execution Tool* (Khusus Python)

Untuk verifikasi otomatis di backend (mis. menguji apakah *test case* siswa valid), Gemini menyediakan `tools: [{ type: "code_execution" }]` yang menjalankan kode Python di *sandbox* dan membaca hasilnya sebelum merespons ([Code Execution](https://aistudio.google.com/docs/code-execution.md)).

---

### 1.4 Praktik Terbaik Prompting Gemini untuk Kode, Penjelasan & Debugging

Berdasarkan panduan resmi [Prompt Design Strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies):

1. **Delimiter Struktural yang Konsisten:** Pisahkan instruksi, kendala (*constraints*), konteks kode siswa, dan tugas menggunakan tag XML (`<role>`, `<constraints>`, `<context>`, `<task>`) atau heading Markdown (pilih satu gaya secara konsisten).
2. **Penempatan Aturan Kritis & Konteks Panjang:** Letakkan persona, aturan larangan (*guardrails*), dan format output di `system_instruction` atau di paling awal. Saat menyertakan kode/dokumen panjang, taruh seluruh konteks lebih dulu, gunakan frasa transisi (*"Berdasarkan kode di atas..."*), lalu letakkan pertanyaan/tugas spesifik di akhir prompt.
3. **Kontrol Verbositas Eksplisit:** Model Gemini modern secara default menjawab ringkas dan langsung; jika tutor perlu memberikan penjelasan bertahap atau analogi ramah pemula, minta secara eksplisit di instruksi.
4. **Strict Grounding (Anti-Halusinasi):** Tambahkan klausul agar model hanya merujuk pada baris kode dan pesan error yang benar-benar ada di konteks pengguna serta mengakui jika konteks kurang.
5. **Pemanfaatan *Thinking* Bawaan:** Model dengan *thinking* aktif sudah bernalar internal sebelum menjawab, sehingga tidak perlu memaksa model mencetak *chain-of-thought* mentah di output. Gunakan `thinking_level: "low"` atau `"medium"` untuk respons Socratic cepat, dan `"high"` atau `gemini-4-carbon` untuk analisis bug/verifikasi kompleks.
6. **Inhibisi Sebelum Merespons (Template Agentik):** Untuk tutor yang harus mematuhi aturan ketat (mis. tidak boleh membocorkan solusi), instruksikan model mengevaluasi daftar aturan dan *state* pemahaman siswa terlebih dahulu sebelum menghasilkan balasan.

---

## Bagian 2: Bukti Empiris & Pedagogi Pemrograman Pemula Tanpa *Vibecoding*

### 2.1 Mengapa *Vibecoding* (LLM Tanpa Pagar Pembatas) Merugikan Pemula

Riset empiris menunjukkan bahwa akses AI yang langsung menghasilkan solusi utuh (*answer-giving*) menciptakan ilusi kelancaran jangka pendek tetapi merusak penguasaan keterampilan jangka panjang:

* **Efek Penopang (*Crutch Effect*):** Dalam eksperimen lapangan pada hampir 1.000 siswa SMA, **Bastani et al. (2025)** (*PNAS*, [doi:10.1073/pnas.2422633122](https://doi.org/10.1073/pnas.2422633122)) membandingkan antarmuka chatbot standar (`GPT Base`) dan tutor berpagar petunjuk (`GPT Tutor`) melawan kelompok kontrol tanpa AI. Saat latihan berlangsung, `GPT Base` menaikkan skor +48% dan `GPT Tutor` +127%. Namun, **ketika akses AI dicabut pada ujian mandiri**, siswa pengguna `GPT Base` memperoleh nilai **17% lebih rendah** daripada kelompok yang tidak pernah memakai AI, sedangkan `GPT Tutor` mencegah penurunan tersebut.
* **Melebarnya Kesenjangan & *Illusion of Competence*:** Dalam studi observasi lab dengan *eye tracking* dan wawancara (*n*=21) pada pemrogram pemula, **Prather et al. (2024)** (*ICER '24*, [arXiv:2405.17739](https://arxiv.org/abs/2405.17739), [doi:10.1145/3632620.3671116](https://doi.org/10.1145/3632620.3671116)) menemukan bahwa siswa yang sudah kuat memakai GenAI untuk mengakselerasi kode yang memang sudah mereka rancang. Sebaliknya, bagi siswa yang kesulitan, GenAI memperparah defisit metakognitif, memicu disonansi kognitif, dan meninggalkan *illusion of competence* (merasa menguasai materi padahal tidak memahami cara kerjanya).
* **Kecenderungan Bawaan LLM:** Tim **LearnLM Google** ([Jurenka et al., 2024](https://arxiv.org/abs/2407.12687); [Modi et al., 2024](https://arxiv.org/abs/2412.16429)) menegaskan bahwa LLM komersial dilatih untuk langsung menyajikan informasi lengkap alih-alih membimbing pembelajar. Melalui *pedagogical instruction following* (mengarahkan perilaku pedagogis lewat *system-level instructions*), model LearnLM berbasis Gemini memperoleh preferensi pakar +13% di atas model dasar Gemini 1.5 Pro, +11% atas Claude 3.5 Sonnet, dan +31% atas GPT-4o.

---

### 2.2 Strategi Pedagogis Berbasis Bukti untuk Pengajaran Berbantuan LLM

Berikut lima pilar strategi yang terbukti secara empiris menjaga *productive struggle* dan melatih pemahaman pemula:

#### 1. *Socratic Tutoring*, *Rubber-Ducking*, & *Pedagogical Guardrails*
* **CodeHelp** ([Liffiton et al., *Koli Calling '23*, arXiv:2308.06921](https://arxiv.org/abs/2308.06921), [doi:10.1145/3631802.3631830](https://doi.org/10.1145/3631802.3631830)): Diuji selama 12 minggu (*n*=52 mahasiswa, >2.500 kueri). Menggunakan *prompt pipeline* dengan pagar pembatas agar AI menjelaskan konsep dan menunjuk sumber error tanpa menulis kode solusi.
* **CodeAid** ([Kazemitabaar et al., *CHI '24*, arXiv:2401.11314](https://arxiv.org/abs/2401.11314), [doi:10.1145/3613904.3642773](https://doi.org/10.1145/3613904.3642773)): Diuji 12 minggu di kelas berisi 700 mahasiswa (8.000 interaksi). Alih-alih mengeluarkan kode siap salin-tempel, CodeAid menjawab pertanyaan konseptual, menghasilkan *pseudo-code* berpenjelasan baris-per-baris, dan memberi anotasi saran perbaikan pada kode siswa. Menghasilkan 4 pertimbangan desain (D1–D4), termasuk menghindari jawaban langsung sambil menjaga transparansi dan kendali siswa.
* **CS50 Duck (`cs50.ai`)** ([Liu et al., *SIGCSE 2024*, doi:10.1145/3626252.3630938](https://doi.org/10.1145/3626252.3630938)): *Rubber duck debugger* virtual berbasis LLM di Harvard CS50 yang diprogram meniru asisten pengajar manusia saat *office hours*—memberi petunjuk bertahap serta membantu memahami gaya dan logika kode tanpa memberikan solusi tugas.
* **Socratic Rubber-Duck Stateful** ([Thonge & Thakkar, *ITiCSE 2026*, doi:10.1145/3803400.3809368](https://doi.org/10.1145/3803400.3809368)): Tutor editor kode yang memblokir generasi kode langsung dan melacak status progres siswa untuk dialog Socratic adaptif.

#### 2. Kerangka PRIMM (*Predict – Run – Investigate – Modify – Make*)
* Dikembangkan oleh **Sentance & Waite (2017)** (*WiPSCE '17*, [doi:10.1145/3137065.3137084](https://doi.org/10.1145/3137065.3137084)) dan dievaluasi secara empiris di 13 sekolah oleh **Sentance, Waite, & Kallia (2019)** (*Computer Science Education*, [doi:10.1080/08993408.2019.1608781](https://www.tandfonline.com/doi/full/10.1080/08993408.2019.1608781)).
* **Inti pedagogi:** Menunda penulisan kode dari nol (*Make*) sampai pemula mampu memprediksi perilaku kode (*Predict*), menguji prediksinya (*Run*), melacak alur variabel/logika (*Investigate*), dan memodifikasi kode yang sudah ada (*Modify*). Dalam implementasi Gemini, AI bertindak sebagai fasilitator yang **mengunci tahap berikutnya** sebelum siswa menuliskan prediksinya.

#### 3. *Worked Examples* Terstruktur & *Faded Guidance*
* **WorkedGen** ([Jury et al., *ACE '24* Best Paper, doi:10.1145/3636243.3636252](https://doi.org/10.1145/3636243.3636252)): Memanfaatkan *prompt chaining* dan *one-shot prompting* untuk menghasilkan *worked examples* interaktif langkah-demi-langkah guna mengurangi beban kognitif ekstrinsik (*extraneous cognitive load*). Evaluasi pakar dan uji kelas Python tahun pertama (*n* ≈ 400 mahasiswa) menunjukkan efektivitas tinggi untuk pemahaman konsep.
* **Kombinasi Authoring + Modifikasi Manual:** Dalam eksperimen terkontrol (*n*=69 pemula, 45 tugas Python), **Kazemitabaar et al. (2023)** (*CHI '23*, [arXiv:2302.07427](https://arxiv.org/abs/2302.07427), [doi:10.1145/3544548.3580919](https://doi.org/10.1145/3544548.3580919)) menemukan bahwa ketika tugas generasi kode AI selalu diikuti tugas modifikasi kode secara manual tanpa AI, performa modifikasi manual tidak turun, dan siswa dengan dasar awal (mis. Scratch) menunjukkan retensi lebih baik.

#### 4. *Explanation-Before-Code* & *Explain in Plain English* (EiPE)
* **CS1-LLM** ([Vadaparty et al., *ITiCSE 2024*, arXiv:2406.15379](https://arxiv.org/abs/2406.15379), [doi:10.1145/3649217.3653584](https://doi.org/10.1145/3649217.3653584)): Mengubah fokus pembelajaran pemula dari mengetik sintaks dari nol menjadi dekomposisi masalah, membaca serta menjelaskan maksud kode (*Explain in Plain English*), pengujian, dan *debugging*.
* **Prompt Problems (`Promptly`)** ([Denny et al., *SIGCSE 2024*, arXiv:2311.05943](https://arxiv.org/abs/2311.05943), [doi:10.1145/3626252.3630909](https://doi.org/10.1145/3626252.3630909)): Alih-alih menerima solusi instan, siswa harus menganalisis spesifikasi input-output dan merumuskan deskripsi/prompt yang presisi dalam bahasa alami agar kode yang dihasilkan lolos *test suite* tersembunyi—melatih dekomposisi masalah dan *self-explanation*.

#### 5. Verifikasi *Test-First* / *Test-Driven Development* (TDD)
* **Test-Driven Development for Code Generation** ([Mathews & Nagappan, *ASE '24*, arXiv:2402.13521](https://arxiv.org/abs/2402.13521), [doi:10.1145/3691620.3695527](https://doi.org/10.1145/3691620.3695527)): Menyertakan *test cases* sebelum atau bersama deskripsi masalah meningkatkan keandalan kode dan menyediakan mekanisme verifikasi objektif atas perilaku program.
* **Peran bagi Pemula:** Seperti diterapkan pada *Promptly* dan *CS1-LLM*, mewajibkan siswa mendefinisikan contoh input-output / kasus uji (termasuk *edge cases*) **sebelum** meminta bantuan AI mencegah siswa menerima kode secara buta dan melatih keterampilan verifikasi serta *debugging*.

---

## Bagian 3: Sintesis Arsitektur Praktis (Gemini API + Pedagogi Anti-*Vibecoding*)

Untuk platform pembelajaran pemrograman pemula (seperti Next.js + TypeScript + Zod dengan `@google/genai`):

1. **Gunakan `gemini-4-hydrogen` via Interactions API (`ai.interactions.create`):** Manfaatkan `previous_interaction_id` untuk menjaga riwayat dialog Socratic lintas giliran dengan *context caching* efisien, dan `gemini-3.5-flash-lite` bila butuh klasifikasi/routing niat siswa berbiaya rendah.
2. **Tegakkan Pagar Pedagogis di `system_instruction` + *Structured Outputs*:**
   * Gunakan skema JSON (via `response_format` + Zod) yang memisahkan *internal pedagogical check* (miskonsepsi siswa, tahap PRIMM saat ini) dari pesan yang ditampilkan ke siswa (`socratic_question` / `pseudo_code_hint`), sehingga model dipaksa secara struktural tidak membuang kode solusi utuh.
3. **Alur Belajar Terkunci (*Gated Flow*):**
   * **Tahap Predict / Explain:** Siswa wajib mengirim prediksi output atau penjelasan kode (*EiPE*) sebelum Gemini membuka petunjuk berikutnya.
   * **Tahap Test-First:** Sebelum meminta bantuan pembuatan/perbaikan fungsi, siswa menuliskan minimal 2–3 kasus uji (*normal* + *edge case*).
   * **Tahap Modify & Debug:** Gemini hanya memberi petunjuk konseptual/baris (*CodeAid* / *CodeHelp* style) atau *worked example* analog (*WorkedGen*), bukan salinan kode tugas siswa.

---

## Daftar Pustaka Sumber Primer

### Dokumentasi Resmi Google Gemini API
1. Google AI for Developers — *Models*: https://ai.google.dev/gemini-api/docs/models
2. Google AI for Developers — *Latest Gemini models*: https://aistudio.google.com/docs/latest-model.md
3. Google AI for Developers — *What's new in Gemini 4 Hydrogen*: https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen.md
4. Google AI for Developers — *What's new in Gemini 4 Carbon*: https://aistudio.google.com/docs/whats-new-gemini-4-carbon.md
5. Google AI for Developers — *Gemini deprecations*: https://ai.google.dev/gemini-api/docs/deprecations
6. Google AI for Developers — *Getting started / Quickstart*: https://ai.google.dev/gemini-api/docs/quickstart
7. Google AI for Developers — *Interactions API overview*: https://ai.google.dev/gemini-api/docs/interactions-overview
8. Google AI for Developers — *Migrating to the Interactions API*: https://aistudio.google.com/docs/migrate-to-interactions.md
9. Google AI for Developers — *Text generation* (Interactions & `generateContent`): https://ai.google.dev/gemini-api/docs/text-generation & https://ai.google.dev/gemini-api/docs/text-generation?generate-content=true
10. Google AI for Developers — *Structured outputs* (Interactions & `generateContent`): https://ai.google.dev/gemini-api/docs/structured-output & https://ai.google.dev/gemini-api/docs/structured-output?generate-content=true
11. Google AI for Developers — *Prompt design strategies*: https://ai.google.dev/gemini-api/docs/prompting-strategies
12. Google AI for Developers — *Gemini thinking*: https://aistudio.google.com/docs/thinking.md
13. Google AI for Developers — *Code execution*: https://aistudio.google.com/docs/code-execution.md

### Publikasi Riset Primer Pedagogi & AI dalam Pendidikan Pemrograman
14. Bastani, H., Bastani, O., et al. (2025). *Generative AI without guardrails can harm learning: Evidence from high school mathematics*. PNAS. https://doi.org/10.1073/pnas.2422633122
15. Prather, J., Reeves, B., Leinonen, J., MacNeil, S., Randrianasolo, A. S., Becker, B., Kimmel, B., Wright, J., & Briggs, B. (2024). *The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers*. ICER '24, pp. 469–486. https://doi.org/10.1145/3632620.3671116 | https://arxiv.org/abs/2405.17739
16. Jurenka, I., Kunesch, M., McKee, K. R., et al. (2024). *Towards Responsible Development of Generative AI for Education: An Evaluation-Driven Approach*. https://arxiv.org/abs/2407.12687
17. Modi, A., et al. (LearnLM Team Google) (2024). *LearnLM: Improving Gemini for Learning*. https://arxiv.org/abs/2412.16429
18. Liffiton, M. H., Sheese, B. E., Savelka, J., & Denny, P. (2023). *CodeHelp: Using Large Language Models with Guardrails for Scalable Support in Programming Classes*. Koli Calling '23. https://doi.org/10.1145/3631802.3631830 | https://arxiv.org/abs/2308.06921
19. Kazemitabaar, M., Ye, R., Wang, X., Henley, A. Z., Denny, P., Craig, M., & Grossman, T. (2024). *CodeAid: Evaluating a Classroom Deployment of an LLM-based Programming Assistant that Balances Student and Educator Needs*. CHI '24. https://doi.org/10.1145/3613904.3642773 | https://arxiv.org/abs/2401.11314
20. Liu, R., Zenke, C., Liu, C., Holmes, A., Thornton, P., & Malan, D. J. (2024). *Teaching CS50 with AI: Leveraging Generative Artificial Intelligence in Computer Science Education*. SIGCSE 2024, pp. 750–756. https://doi.org/10.1145/3626252.3630938
21. Thonge, A., & Thakkar, A. (2026). *A Good Rubber Duck Does Not Quack: Designing Socratic Scaffolding in AI Tutors*. ITiCSE 2026. https://doi.org/10.1145/3803400.3809368
22. Sentance, S., & Waite, J. (2017). *PRIMM: Exploring pedagogical approaches for teaching text-based programming in school*. WiPSCE '17. https://doi.org/10.1145/3137065.3137084
23. Sentance, S., Waite, J., & Kallia, M. (2019). *Teaching computer programming with PRIMM: a sociocultural perspective*. Computer Science Education. https://www.tandfonline.com/doi/full/10.1080/08993408.2019.1608781
24. Jury, B., Lorusso, A., Leinonen, J., Denny, P., & Luxton-Reilly, A. (2024). *Evaluating LLM-generated Worked Examples in an Introductory Programming Course*. ACE '24, pp. 77–86. https://doi.org/10.1145/3636243.3636252
25. Kazemitabaar, M., Chow, J., Ma, C. K. T., Ericson, B. J., Weintrop, D., & Grossman, T. (2023). *Studying the Effect of AI Code Generators on Supporting Novice Learners in Introductory Programming*. CHI '23. https://doi.org/10.1145/3544548.3580919 | https://arxiv.org/abs/2302.07427
26. Vadaparty, A., Zingaro, D., Smith IV, D. H., Padala, M., Alvarado, C., Benario, J. G., & Porter, L. (2024). *CS1-LLM: Integrating LLMs into CS1 Instruction*. ITiCSE 2024. https://doi.org/10.1145/3649217.3653584 | https://arxiv.org/abs/2406.15379
27. Denny, P., Leinonen, J., Prather, J., Luxton-Reilly, A., Amarouche, T., Becker, B. A., & Reeves, B. N. (2024). *Prompt Problems: A New Programming Exercise for the Generative AI Era*. SIGCSE 2024. https://doi.org/10.1145/3626252.3630909 | https://arxiv.org/abs/2311.05943
28. Mathews, N. S., & Nagappan, M. (2024). *Test-Driven Development for Code Generation*. ASE '24. https://doi.org/10.1145/3691620.3695527 | https://arxiv.org/abs/2402.13521

