-- ==============================================================================
-- DATABASE SEED DATA: PLATFORM PEMBELAJARAN DEVELOPMENT TERINTEGRASI
-- File: supabase/seed.sql
--
-- CATATAN: ID menggunakan UUID v5 deterministik (namespace DNS + "vibecode:*")
-- sehingga seed ini idempotent — bisa dijalankan ulang tanpa duplikasi,
-- dan ID-nya tetap sama di setiap environment.
-- ==============================================================================

-- 1. Kursus Utama
-- Pastikan fungsi extension (uuid_generate_v4, gen_random_uuid) tersedia
SET search_path TO public, extensions;

INSERT INTO public.courses (id, slug, title, description, is_published)
VALUES (
    'b319caba-00e0-534e-874c-c75238f99baf',
    'web-development-antigravity',
    'Full-Stack Web Development Modern dengan Google Antigravity & Supabase',
    'Pelajari pembuatan aplikasi web modern berskala produksi dari nol tanpa harus menguasai coding konvensional, dipandu langsung oleh AI Coding Agent Google Antigravity, Next.js, dan Supabase.',
    true
)
ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    is_published = EXCLUDED.is_published;

-- 2. Seed 12 Modul Pembelajaran
INSERT INTO public.modules (id, course_id, module_number, title, slug, description, estimated_minutes, difficulty_level, is_published, order_index)
VALUES
    ('4d439e0b-66c5-5060-84d3-24e388097ba1', 'b319caba-00e0-534e-874c-c75238f99baf', 1, 'Pengenalan Web Development & AI Coding Agent', 'modul-1-pengenalan-web-development', 'Memahami anatomi aplikasi web modern, pemisahan Frontend, Backend, dan Database, serta revolusi pengembangan software dengan AI coding agent.', 60, 'Pemula', true, 1),
    ('663f8296-3565-5200-9404-048b630e2932', 'b319caba-00e0-534e-874c-c75238f99baf', 2, 'Persiapan Lingkungan Pengembangan', 'modul-2-persiapan-lingkungan-pengembangan', 'Instalasi dan konfigurasi perangkat lunak wajib: Node.js 24 LTS, Git, VS Code, Google Antigravity, serta pembuatan akun GitHub, Supabase, dan Vercel.', 75, 'Pemula', true, 2),
    ('8191ec08-d12b-5010-8104-2fb35b77183c', 'b319caba-00e0-534e-874c-c75238f99baf', 3, 'Membuat Proyek Pertama Next.js & App Router', 'modul-3-membuat-proyek-pertama', 'Inisialisasi proyek Next.js dengan TypeScript, Tailwind CSS, memahami hierarki App Router, menjalankan server lokal, dan debugging dasar.', 90, 'Pemula', true, 3),
    ('983b0aba-cafb-530d-87f2-ba57e79def4e', 'b319caba-00e0-534e-874c-c75238f99baf', 4, 'Menguasai Google Antigravity & Agentic Coding', 'modul-4-menguasai-google-antigravity', 'Mendalami antarmuka Antigravity, teknik menyusun prompt 6-bagian yang presisi, mengelola konteks proyek, mereviu diff kode, dan memperbaiki kesalahan AI.', 90, 'Pemula', true, 4),
    ('2c7d39a9-37d2-506c-885e-913e3a159c64', 'b319caba-00e0-534e-874c-c75238f99baf', 5, 'Membangun Frontend Modern dengan Tailwind CSS', 'modul-5-membangun-frontend', 'Mendesain layout responsif, navbar profesional, sidebar, sistem komponen UI, tipografi, palet warna Navy-Blue-Teal, dan optimasi mobile.', 100, 'Pemula', true, 5),
    ('32a35a33-0c43-5d82-b34f-932cbbb0140e', 'b319caba-00e0-534e-874c-c75238f99baf', 6, 'Membangun Database Cloud dengan Supabase PostgreSQL', 'modul-6-membangun-database-supabase', 'Merancang tabel relasional, primary key, foreign key, menjalankan skrip schema.sql di SQL Editor, mengatur environment variable, dan memahami Row Level Security.', 110, 'Menengah', true, 6),
    ('ea2500f6-12d2-57fd-b5f1-17fb737683eb', 'b319caba-00e0-534e-874c-c75238f99baf', 7, 'Membangun Aplikasi Katalog UMKM (Studi Kasus Nyata)', 'modul-7-membangun-aplikasi-katalog-umkm', 'Mengembangkan fitur inti US-01 sampai US-06 sesuai lembar kerja referensi: katalog database, detail dinamis, pemesanan WhatsApp, autentikasi admin, dan proteksi middleware.', 180, 'Menengah', true, 7),
    ('f391c6bf-4b93-50b5-8829-cb80447851f9', 'b319caba-00e0-534e-874c-c75238f99baf', 8, 'Membangun Admin Dashboard & Manajemen Produk', 'modul-8-membangun-admin-dashboard', 'Membangun dashboard manajemen katalog UMKM: formulir tambah produk, edit produk, hapus produk (CRUD), pengelolaan stok, dan ringkasan metrik penjualan.', 120, 'Menengah', true, 8),
    ('156c32a2-e982-5702-b1e9-ef54729654de', 'b319caba-00e0-534e-874c-c75238f99baf', 9, 'Keamanan Aplikasi Web & Proteksi Data', 'modul-9-keamanan-aplikasi', 'Memenuhi kriteria keamanan lanjutan K-6 hingga K-13: perlindungan environment variables, pencegahan XSS, header keamanan, proteksi route admin, rate limiting, dan audit kerentanan dependensi.', 80, 'Lanjutan', true, 9),
    ('a99a36d2-fc62-5cce-83a9-627c15ca1ffc', 'b319caba-00e0-534e-874c-c75238f99baf', 10, 'Testing Otomatis & Debugging Komprehensif', 'modul-10-testing-dan-debugging', 'Pengujian menyeluruh: script npm run test, typecheck, build validation, membaca pesan error terminal, dan memperbaiki bug sebelum rilis.', 90, 'Menengah', true, 10),
    ('c6914cb2-44d3-580b-90c8-8462c48401bd', 'b319caba-00e0-534e-874c-c75238f99baf', 11, 'Version Control GitHub & Deployment Cloud Vercel', 'modul-11-github-dan-deployment', 'Alur kerja profesional: git add, commit, push ke repository GitHub, menghubungkan ke Vercel, deployment otomatis, custom domain, dan pembaruan aplikasi.', 80, 'Pemula', true, 11),
    ('5ee33117-23d6-5484-a134-74be82b0c1b0', 'b319caba-00e0-534e-874c-c75238f99baf', 12, 'Finalisasi Proyek & Pengumpulan Karya', 'modul-12-finalisasi-proyek', 'Checklist publikasi akhir, optimasi performa gambar & SEO, pencatatan PROMPTS.md, serta pengumpulan karya peserta ke database platform.', 60, 'Pemula', true, 12)
ON CONFLICT (id) DO UPDATE SET
    course_id = EXCLUDED.course_id,
    module_number = EXCLUDED.module_number,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    estimated_minutes = EXCLUDED.estimated_minutes,
    difficulty_level = EXCLUDED.difficulty_level,
    order_index = EXCLUDED.order_index,
    is_published = EXCLUDED.is_published;

-- 3. Seed Pengaturan Awal Platform (Site Settings)
INSERT INTO public.site_settings (id, registration_mode, allow_submissions, site_announcement)
VALUES (
    'default',
    'open',
    true,
    'Selamat datang di Platform Pembelajaran Development Terintegrasi. Selesaikan 12 modul dan kumpulkan karya Anda sebelum batas waktu yang ditentukan.'
)
ON CONFLICT (id) DO NOTHING;
