-- Pastikan fungsi extension tersedia
SET search_path TO public, extensions;

-- ==============================================================================
-- FIX: lesson_id harus TEXT (merujuk ID di kode), bukan FK UUID
-- ==============================================================================
-- Keputusan arsitektur: kurikulum tinggal di src/lib/data/curriculum-data.ts
-- (Opsi A). ID pelajaran di kode berformat "m1-l1", BUKAN UUID, dan tabel
-- public.lessons kosong. FK UUID ke lessons membuat SEMUA penulisan progres
-- gagal dengan error 23503.
--
-- Solusi: lepas FK, ubah kolom jadi TEXT, isi modules+lessons sebagai
-- katalog referensi ID (bukan sumber materi).

-- 1. Konversi tipe id katalog ke TEXT (urutan: lepas FK dulu)
ALTER TABLE public.lessons        DROP CONSTRAINT IF EXISTS lessons_module_id_fkey;
ALTER TABLE public.modules        DROP CONSTRAINT IF EXISTS modules_course_id_fkey;
ALTER TABLE public.user_progress  DROP CONSTRAINT IF EXISTS user_progress_lesson_id_fkey;
ALTER TABLE public.bookmarks      DROP CONSTRAINT IF EXISTS bookmarks_lesson_id_fkey;
ALTER TABLE public.learning_notes DROP CONSTRAINT IF EXISTS learning_notes_lesson_id_fkey;
ALTER TABLE public.lesson_blocks  DROP CONSTRAINT IF EXISTS lesson_blocks_lesson_id_fkey;

ALTER TABLE public.courses  ALTER COLUMN id TYPE TEXT USING id::TEXT;
ALTER TABLE public.modules  ALTER COLUMN id TYPE TEXT USING id::TEXT;
ALTER TABLE public.modules  ALTER COLUMN course_id TYPE TEXT USING course_id::TEXT;
ALTER TABLE public.lessons  ALTER COLUMN id TYPE TEXT USING id::TEXT;
ALTER TABLE public.lessons  ALTER COLUMN module_id TYPE TEXT USING module_id::TEXT;

-- 2. Kolom progres peserta jadi TEXT (menyimpan ID kode seperti "m1-l1")
ALTER TABLE public.user_progress  ALTER COLUMN lesson_id TYPE TEXT USING lesson_id::TEXT;
ALTER TABLE public.bookmarks      ALTER COLUMN lesson_id TYPE TEXT USING lesson_id::TEXT;
ALTER TABLE public.learning_notes ALTER COLUMN lesson_id TYPE TEXT USING lesson_id::TEXT;
ALTER TABLE public.lesson_blocks  ALTER COLUMN lesson_id TYPE TEXT USING lesson_id::TEXT;

-- 3. Kosongkan katalog lama.
-- Perubahan tipe kolom UUID -> TEXT membuat baris seed sebelumnya tidak
-- bisa di-upsert berdasarkan id (slug-nya bentrok dengan baris baru).
-- Tabel ini murni katalog referensi tanpa data peserta, jadi aman dikosongkan.
DELETE FROM public.lesson_blocks;
DELETE FROM public.lessons;
DELETE FROM public.modules;
DELETE FROM public.courses;

-- 4. Isi ulang kursus
INSERT INTO public.courses (id, slug, title, description, is_published)
VALUES (
    'b319caba-00e0-534e-874c-c75238f99baf',
    'web-development-antigravity',
    'Full-Stack Web Development Modern dengan Google Antigravity & Supabase',
    'Pelatihan pembuatan aplikasi web modern dari nol dengan AI coding agent, Next.js, dan Supabase.',
    true
)
ON CONFLICT (id) DO NOTHING;

-- 5. Isi katalog modules (referensi ID saja)
INSERT INTO public.modules (id, course_id, module_number, title, slug, description, estimated_minutes, difficulty_level, is_published, order_index)
VALUES
    ('modul-1', 'b319caba-00e0-534e-874c-c75238f99baf', 1, 'Pengenalan Web Development & AI Coding Agent', 'modul-1-pengenalan-web-development', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 60, 'Pemula', true, 1),
    ('modul-2', 'b319caba-00e0-534e-874c-c75238f99baf', 2, 'Persiapan Lingkungan Pengembangan', 'modul-2-persiapan-lingkungan-pengembangan', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 75, 'Pemula', true, 2),
    ('modul-3', 'b319caba-00e0-534e-874c-c75238f99baf', 3, 'Membuat Proyek Pertama Next.js & App Router', 'modul-3-membuat-proyek-pertama', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 90, 'Pemula', true, 3),
    ('modul-4', 'b319caba-00e0-534e-874c-c75238f99baf', 4, 'Menguasai Google Antigravity & Agentic Coding', 'modul-4-menguasai-google-antigravity', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 90, 'Pemula', true, 4),
    ('modul-5', 'b319caba-00e0-534e-874c-c75238f99baf', 5, 'Membangun Frontend Modern dengan Tailwind CSS', 'modul-5-membangun-frontend', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 100, 'Pemula', true, 5),
    ('modul-6', 'b319caba-00e0-534e-874c-c75238f99baf', 6, 'Membangun Database Cloud dengan Supabase PostgreSQL', 'modul-6-membangun-database-supabase', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 110, 'Menengah', true, 6),
    ('modul-7', 'b319caba-00e0-534e-874c-c75238f99baf', 7, 'Membangun Aplikasi Katalog UMKM (Studi Kasus Nyata)', 'modul-7-membangun-aplikasi-katalog-umkm', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 180, 'Menengah', true, 7),
    ('modul-8', 'b319caba-00e0-534e-874c-c75238f99baf', 8, 'Membangun Admin Dashboard & Manajemen Produk', 'modul-8-membangun-admin-dashboard', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 120, 'Menengah', true, 8),
    ('modul-9', 'b319caba-00e0-534e-874c-c75238f99baf', 9, 'Keamanan Aplikasi Web & Proteksi Data', 'modul-9-keamanan-aplikasi', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 80, 'Lanjutan', true, 9),
    ('modul-10', 'b319caba-00e0-534e-874c-c75238f99baf', 10, 'Testing Otomatis & Debugging Komprehensif', 'modul-10-testing-dan-debugging', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 90, 'Menengah', true, 10),
    ('modul-11', 'b319caba-00e0-534e-874c-c75238f99baf', 11, 'Version Control GitHub & Deployment Cloud Vercel', 'modul-11-github-dan-deployment', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 80, 'Pemula', true, 11),
    ('modul-12', 'b319caba-00e0-534e-874c-c75238f99baf', 12, 'Finalisasi Proyek & Pengumpulan Karya', 'modul-12-finalisasi-proyek', 'Katalog referensi - materi lengkap ada di curriculum-data.ts.', 60, 'Pemula', true, 12)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
    module_number = EXCLUDED.module_number,
    order_index = EXCLUDED.order_index;

-- 4. Isi katalog lessons (50 pelajaran)
INSERT INTO public.lessons (id, module_id, lesson_number, title, slug, description, estimated_minutes, is_published, order_index)
VALUES
    ('m1-l1', 'modul-1', 1, 'Pengertian Website dan Aplikasi Web Modern', 'pengertian-website-dan-aplikasi-web', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m1-l2', 'modul-1', 2, 'Cara Kerja Frontend, Backend, dan Database', 'cara-kerja-frontend-backend-database', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m1-l3', 'modul-1', 3, 'Pengenalan Ekosistem Web Modern: Next.js, Supabase, Vercel', 'pengenalan-teknologi-web-modern', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m1-l4', 'modul-1', 4, 'Pengenalan AI Coding Agent & Google Antigravity', 'pengenalan-ai-coding-agent-google-antigravity', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m2-l1', 'modul-2', 1, 'Instalasi Node.js 24 LTS dan Terminal', 'instalasi-nodejs-dan-terminal', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m2-l2', 'modul-2', 2, 'Instalasi Git dan Membuat Akun GitHub', 'instalasi-git-dan-akun-github', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m2-l3', 'modul-2', 3, 'Membuat Akun Supabase dan Organisasi Proyek', 'membuat-akun-supabase-dan-organisasi', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m2-l4', 'modul-2', 4, 'Membuat Akun Vercel dan Menghubungkan GitHub', 'membuat-akun-vercel-dan-koneksi-github', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m3-l1', 'modul-3', 1, 'Membuat Folder dan Inisialisasi Proyek Next.js', 'membuat-folder-dan-proyek-nextjs', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m3-l2', 'modul-3', 2, 'Memahami Struktur Folder dan App Router', 'memahami-struktur-folder-dan-app-router', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m3-l3', 'modul-3', 3, 'Menjalankan Server Lokal dan Hot Reload', 'menjalankan-server-lokal-dan-hot-reload', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m3-l4', 'modul-3', 4, 'Mengenal React Components dan TypeScript Dasar', 'mengenal-react-components-dan-typescript', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m4-l1', 'modul-4', 1, 'Mengenal Antarmuka dan Agent Mode Antigravity', 'mengenal-antarmuka-dan-agent-mode-antigravity', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m4-l2', 'modul-4', 2, 'Menulis Prompt 6-Bagian yang Efektif dan Anti-Gagal', 'menulis-prompt-6-bagian-efektif', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m4-l3', 'modul-4', 3, 'Memeriksa Diff Kode dan Rollback Jika Terjadi Kesalahan', 'memeriksa-diff-kode-dan-rollback', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m4-l4', 'modul-4', 4, 'Mengatur Konteks Proyek & Aturan AGENTS.md', 'mengatur-konteks-proyek-dan-aturan-agents-md', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m5-l1', 'modul-5', 1, 'Konsep Desain UI/UX & Palet Warna Profesional', 'konsep-desain-uiux-dan-palet-warna', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m5-l2', 'modul-5', 2, 'Membuat Navbar Responsif dan Menu Navigasi', 'membuat-navbar-responsif', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m5-l3', 'modul-5', 3, 'Membuat Komponen Reusable: Button, Card, Badge, Modal', 'membuat-komponen-reusable-ui', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m5-l4', 'modul-5', 4, 'Optimasi Tampilan Mobile dan Tipografi', 'optimasi-tampilan-mobile-dan-tipografi', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m6-l1', 'modul-6', 1, 'Pengenalan PostgreSQL & Struktur Tabel Relasional', 'pengenalan-postgresql-dan-tabel-relasional', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m6-l2', 'modul-6', 2, 'Menjalankan Skrip Schema SQL di Supabase', 'menjalankan-skrip-schema-sql-supabase', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m6-l3', 'modul-6', 3, 'Konfigurasi Environment Variable: Lokal & Vercel', 'konfigurasi-environment-variable-lokal-dan-vercel', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m6-l4', 'modul-6', 4, 'Memahami dan Mengonfigurasi Row Level Security (RLS)', 'memahami-dan-mengonfigurasi-rls', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m7-l1', 'modul-7', 1, 'US-01: Menghubungkan Halaman Katalog ke Database Supabase', 'us-01-katalog-dari-database', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m7-l2', 'modul-7', 2, 'US-02: Membuat Halaman Detail Produk Dinamis', 'us-02-detail-produk-dari-database', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m7-l3', 'modul-7', 3, 'US-03: Integrasi Tombol Pemesanan Otomatis WhatsApp (wa.me)', 'us-03-tombol-pesan-whatsapp', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m7-l4', 'modul-7', 4, 'US-04: Membangun Sistem Autentikasi Admin Toko', 'us-04-login-admin-supabase-auth', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m7-l5', 'modul-7', 5, 'US-05: Server Action Ganti Password & Logout Admin', 'us-05-ganti-password-dan-logout', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 5),
    ('m7-l6', 'modul-7', 6, 'US-06: Proteksi Rute Admin dengan Middleware / Proxy', 'us-06-proteksi-halaman-admin', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 6),
    ('m8-l1', 'modul-8', 1, 'US-07: Halaman Tabel Manajemen Produk Admin', 'us-07-tabel-manajemen-produk', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m8-l2', 'modul-8', 2, 'US-08 & US-09: Formulir Tambah & Edit Produk via Server Actions', 'us-08-us-09-tambah-dan-edit-produk', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m8-l3', 'modul-8', 3, 'US-10: Fitur Hapus Produk dengan Konfirmasi Dialog', 'us-10-hapus-produk-dialog-konfirmasi', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m8-l4', 'modul-8', 4, 'US-11: Pencarian dan Filter Kategori Real-Time', 'us-11-pencarian-dan-filter-kategori', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m9-l1', 'modul-9', 1, 'K-06 & K-08: Header Keamanan Live & Proteksi Mesin Pencari (/admin)', 'k06-k08-header-keamanan-dan-noindex-admin', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m9-l2', 'modul-9', 2, 'K-07 & K-09: Pencegahan XSS & Penanganan Error Tanpa Stack Trace', 'k07-k09-pencegahan-xss-dan-error-handling', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m9-l3', 'modul-9', 3, 'K-10 & K-13: Audit Kerentanan Dependensi & Pembersihan Console Log', 'k10-k13-audit-dependensi-dan-bersihkan-console', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m9-l4', 'modul-9', 4, 'K-12: Rate Limiting & Proteksi Brute-Force Form Login', 'k12-rate-limiting-proteksi-brute-force', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m10-l1', 'modul-10', 1, 'Menjalankan Skrip Pengujian Otomatis (npm run test)', 'menjalankan-pengujian-otomatis-npm-test', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m10-l2', 'modul-10', 2, 'Pemeriksaan Typecheck & Build Production Lokal', 'typecheck-dan-build-production-lokal', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m10-l3', 'modul-10', 3, 'Membaca Pesan Error Terminal & Panduan Troubleshooting', 'membaca-error-terminal-dan-troubleshooting', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m10-l4', 'modul-10', 4, 'Pengujian Antarmuka Pengguna & Uji Coba Responsif', 'pengujian-antarmuka-dan-responsif', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m11-l1', 'modul-11', 1, 'Membuat Commit Bersih & Push Proyek ke GitHub', 'commit-bersih-dan-push-ke-github', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m11-l2', 'modul-11', 2, 'Deploying Proyek ke Vercel & Mengatur Domain', 'deploying-proyek-ke-vercel-dan-domain', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m11-l3', 'modul-11', 3, 'Mengatasi Vercel Build Error & Redeploying', 'mengatasi-vercel-build-error-dan-redeploying', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m11-l4', 'modul-11', 4, 'Alur Pembaruan Aplikasi Berkelanjutan (CI/CD)', 'alur-pembaruan-aplikasi-berkelanjutan-cicd', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4),
    ('m12-l1', 'modul-12', 1, 'Checklist Kelulusan Fitur Wajib (US-01 s/d US-06)', 'checklist-kelulusan-fitur-wajib', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 1),
    ('m12-l2', 'modul-12', 2, 'Optimasi Gambar, SEO, dan Meta Tag OpenGraph', 'optimasi-gambar-dan-seo-opengraph', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 2),
    ('m12-l3', 'modul-12', 3, 'Mengenal Fitur Bonus (US-07 hingga US-50)', 'mengenal-fitur-bonus-user-stories', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 3),
    ('m12-l4', 'modul-12', 4, 'Kumpulkan Karya di Formulir Kumpulan Karya Peserta', 'kumpulkan-karya-di-formulir-kumpulan-karya', 'Katalog referensi ID untuk relasi progres peserta.', 15, true, 4)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
    module_id = EXCLUDED.module_id,
    lesson_number = EXCLUDED.lesson_number;

CREATE INDEX IF NOT EXISTS idx_user_progress_lesson ON public.user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_lesson ON public.bookmarks(lesson_id);
CREATE INDEX IF NOT EXISTS idx_notes_lesson ON public.learning_notes(lesson_id);
