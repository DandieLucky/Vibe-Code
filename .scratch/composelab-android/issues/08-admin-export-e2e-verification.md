# 08: Penyesuaian Admin Dashboard, Ekspor, & Verifikasi End-to-End

**What to build:** Memperbarui tampilan detail submission di `/admin/submissions`, format ekspor Excel/CSV (`/admin/export`) dan Google Sheets (`/admin/google-sheets`) agar menampilkan kolom karya Android (Repo GitHub, Link APK, Video Demo, Skor Android), serta memperbarui `test/platform.test.mjs` dan memverifikasi seluruh aplikasi berjalan bersih.

**Blocked by:** 06: Adaptasi Form Pengumpulan Karya Android (`/kumpulan-karya`) & Schema Database, 07: Adaptasi Mesin Penilaian Otomatis (`scoring/engine.ts`) untuk Project Android

**Status:** done

- [x] Admin dapat meninjau link GitHub, screenshot, link APK, dan video demo di `/admin/submissions` dan `/admin`
- [x] Ekspor Excel/CSV dan sinkronisasi Google Sheets menyertakan kolom karya Android tanpa error
- [x] `supabase/schema.sql` dan `supabase/migrations/20261117000001_android_submission_fields.sql` sinkron
- [x] `npm run typecheck`, `npm run test`, dan `npm run build` semuanya lulus tanpa error

