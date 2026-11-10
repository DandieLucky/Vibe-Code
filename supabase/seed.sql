-- ==============================================================================
-- DATABASE SEED DATA: PLATFORM PEMBELAJARAN DEVELOPMENT TERINTEGRASI
-- File: supabase/seed.sql
-- ==============================================================================

-- 1. Kursus Utama
INSERT INTO public.courses (id, slug, title, description, is_published)
VALUES (
    'course-web-dev-antigravity',
    'web-development-antigravity',
    'Full-Stack Web Development Modern dengan Google Antigravity & Supabase',
    'Pelajari pembuatan aplikasi web modern berskala produksi dari nol tanpa harus menguasai coding konvensional, dipandu langsung oleh AI Coding Agent Google Antigravity, Next.js, dan Supabase.',
    true
)
ON CONFLICT (id) DO NOTHING;

-- 2. Seed 12 Modul Pembelajaran
INSERT INTO public.modules (id, course_id, module_number, title, slug, description, estimated_minutes, difficulty_level, is_published, order_index)
VALUES
    ('modul-1', 'course-web-dev-antigravity', 1, 'Pengenalan Web Development & AI Coding Agent', 'modul-1-pengenalan-web-development', 'Memahami anatomi aplikasi web modern, pemisahan Frontend, Backend, dan Database, serta revolusi pengembangan software dengan AI coding agent.', 60, 'Pemula', true, 1),
    ('modul-2', 'course-web-dev-antigravity', 2, 'Persiapan Lingkungan Pengembangan', 'modul-2-persiapan-lingkungan-pengembangan', 'Instalasi dan konfigurasi perangkat lunak wajib: Node.js 24 LTS, Git, VS Code, Google Antigravity, serta pembuatan akun GitHub, Supabase, dan Vercel.', 75, 'Pemula', true, 2),
    ('modul-3', 'course-web-dev-antigravity', 3, 'Membuat Proyek Pertama Next.js & App Router', 'modul-3-membuat-proyek-pertama', 'Inisialisasi proyek Next.js dengan TypeScript, Tailwind CSS, memahami hierarki App Router, menjalankan server lokal, dan debugging dasar.', 90, 'Pemula', true, 3),
    ('modul-4', 'course-web-dev-antigravity', 4, 'Menguasai Google Antigravity & Agentic Coding', 'modul-4-menguasai-google-antigravity', 'Mendalami antarmuka Antigravity, teknik menyusun prompt 6-bagian yang presisi, mengelola konteks proyek, mereviu diff kode, dan memperbaiki kesalahan AI.', 90, 'Pemula', true, 4),
    ('modul-5', 'course-web-dev-antigravity', 5, 'Membangun Frontend Modern dengan Tailwind CSS', 'modul-5-membangun-frontend', 'Mendesain layout responsif, navbar profesional, sidebar, sistem komponen UI, tipografi, palet warna Navy-Blue-Teal, dan optimasi mobile.', 100, 'Pemula', true, 5),
    ('modul-6', 'course-web-dev-antigravity', 6, 'Membangun Database Cloud dengan Supabase PostgreSQL', 'modul-6-membangun-database-supabase', 'Merancang tabel relasional, primary key, foreign key, menjalankan skrip schema.sql di SQL Editor, mengatur environment variable, dan memahami Row Level Security.', 110, 'Menengah', true, 6),
    ('modul-7', 'course-web-dev-antigravity', 7, 'Membangun Aplikasi Katalog UMKM (Studi Kasus Nyata)', 'modul-7-membangun-aplikasi-katalog-umkm', 'Mengembangkan fitur inti US-01 sampai US-06 sesuai lembar kerja referensi: katalog database, detail dinamis, pemesanan WhatsApp, autentikasi admin, dan proteksi middleware.', 180, 'Menengah', true, 7),
    ('modul-8', 'course-web-dev-antigravity', 8, 'Membangun Admin Dashboard & Manajemen Produk', 'modul-8-membangun-admin-dashboard', 'Membangun dashboard manajemen katalog UMKM: formulir tambah produk, edit produk, hapus produk (CRUD), pengelolaan stok, dan ringkasan metrik penjualan.', 120, 'Menengah', true, 8),
    ('modul-9', 'course-web-dev-antigravity', 9, 'Keamanan Aplikasi Web & Proteksi Data', 'modul-9-keamanan-aplikasi', 'Memenuhi kriteria keamanan lanjutan K-6 hingga K-13: perlindungan environment variables, pencegahan XSS, header keamanan, proteksi route admin, rate limiting, dan audit kerentanan dependensi.', 80, 'Lanjutan', true, 9),
    ('modul-10', 'course-web-dev-antigravity', 10, 'Testing Otomatis & Debugging Komprehensif', 'modul-10-testing-dan-debugging', 'Pengujian menyeluruh: script npm run test, typecheck, build validation, membaca pesan error terminal, dan memperbaiki bug sebelum rilis.', 90, 'Menengah', true, 10),
    ('modul-11', 'course-web-dev-antigravity', 11, 'Version Control GitHub & Deployment Cloud Vercel', 'modul-11-github-dan-deployment', 'Alur kerja profesional: git add, commit, push ke repository GitHub, menghubungkan ke Vercel, deployment otomatis, custom domain, dan pembaruan aplikasi.', 80, 'Pemula', true, 11),
    ('modul-12', 'course-web-dev-antigravity', 12, 'Finalisasi Proyek & Pengumpulan Karya', 'modul-12-finalisasi-proyek', 'Checklist publikasi akhir, optimasi performa gambar & SEO, pencatatan PROMPTS.md, serta pengumpulan karya peserta ke database platform.', 60, 'Pemula', true, 12)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    estimated_minutes = EXCLUDED.estimated_minutes,
    difficulty_level = EXCLUDED.difficulty_level;

-- 3. Seed Pengaturan Awal Platform (Site Settings)
INSERT INTO public.site_settings (id, registration_mode, allow_submissions, site_announcement)
VALUES (
    'default',
    'open',
    true,
    'Selamat datang di Platform Pembelajaran Development Terintegrasi. Selesaikan 12 modul dan kumpulkan karya Anda sebelum batas waktu yang ditentukan.'
)
ON CONFLICT (id) DO NOTHING;
