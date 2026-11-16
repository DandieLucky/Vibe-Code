# 07: Adaptasi Mesin Penilaian Otomatis (`scoring/engine.ts`) untuk Project Android

**What to build:** Menyesuaikan mesin penilaian otomatis agar tidak lagi mengecek live URL Vercel atau Lighthouse, melainkan memeriksa struktur project Android di repository GitHub (`build.gradle.kts`, penggunaan Jetpack Compose, Room Database, Credential Manager, `README.md`) serta memperbarui prompt `ai-evaluator.ts` agar Gemini menilai kualitas kode Kotlin/Compose/Room/CRUD/Google Auth.

**Blocked by:** 06: Adaptasi Form Pengumpulan Karya Android (`/kumpulan-karya`) & Schema Database

**Status:** done

- [x] `github-check.ts` mendeteksi file dan struktur Android Kotlin/Gradle/Manifest (`kotlinFileCount`, `hasGradleFile`, `hasManifest`, `hasReadme`) pada repo siswa
- [x] `engine.ts` menghapus ketergantungan wajib ke Vercel/Lighthouse dan menghitung skor teknis + AI secara akurat untuk project Android
- [x] `ai-evaluator.ts` memprioritaskan file `.kt` / `build.gradle.kts` / `AndroidManifest.xml` dan memberikan umpan balik yang relevan dengan arsitektur Android (Room, CRUD, Google Login, Compose)

