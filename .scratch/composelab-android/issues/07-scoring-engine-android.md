# 07: Adaptasi Mesin Penilaian Otomatis (`scoring/engine.ts`) untuk Project Android

**What to build:** Menyesuaikan mesin penilaian otomatis agar tidak lagi mengecek live URL Vercel atau Lighthouse, melainkan memeriksa struktur project Android di repository GitHub (`build.gradle.kts`, penggunaan Jetpack Compose, Room Database, Credential Manager, `README.md`) serta memperbarui prompt `ai-evaluator.ts` agar Gemini menilai kualitas kode Kotlin/Compose/Room/CRUD/Google Auth.

**Blocked by:** 06: Adaptasi Form Pengumpulan Karya Android (`/kumpulan-karya`) & Schema Database

**Status:** ready-for-agent

- [ ] `github-check.ts` mendeteksi file dan dependensi Android Kotlin/Compose/Room/Credential Manager pada repo siswa
- [ ] `engine.ts` menghapus ketergantungan wajib ke Vercel/Lighthouse dan menghitung skor teknis + AI secara akurat untuk project Android
- [ ] `ai-evaluator.ts` memberikan umpan balik yang relevan dengan arsitektur Android (Room, CRUD, Google Login, Compose)

