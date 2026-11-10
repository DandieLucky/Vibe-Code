# Dokumentasi Database & Arsitektur Relasi Tabel

Dokumen ini menjelaskan rancangan skema basis data PostgreSQL platform pembelajaran yang di-host pada cloud Supabase, kebijakan keamanan tingkat baris (Row Level Security), dan pemisahan arsitektur antara database platform dengan database proyek latihan siswa.

---

## 1. Prinsip Pemisahan Database

Sesuai spesifikasi arsitektur standar industri:
- **Database Platform Pembelajaran (`supabase/schema.sql`)**: Digunakan secara terpusat oleh platform ini untuk menyimpan data pengguna, riwayat progres 12 modul, catatan belajar, antrean pengumpulan karya (`work_submissions`), dan log integrasi.
- **Database Proyek Latihan UMKM Siswa (`supabase/umkm-exercise-schema.sql`)**: Skrip terpisah yang dijalankan oleh peserta workshop di akun Supabase proyek latihan milik mereka sendiri (tabel `kategori`, `produk`, `pengaturan_toko`, dan `pesanan`).

Kedua skema tidak pernah dicampur aduk agar keamanan dan isolasi data tetap terjaga 100%.

---

## 2. Struktur 12 Tabel Relasional Platform

### 1. `profiles`
Menyimpan identitas profil pengguna yang tertaut langsung ke `auth.users`.
- `id` (UUID, PK, FK `auth.users.id` ON DELETE CASCADE)
- `full_name` (TEXT)
- `email` (TEXT, UNIQUE)
- `whatsapp` (TEXT)
- `institution` (TEXT)
- `avatar_url` (TEXT)
- `role` (ENUM: `'student'`, `'admin'`, `'instructor'`)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### 2. `user_roles`
Tabel pendukung Role-Based Access Control (RBAC) yang aman.
- `id` (UUID, PK)
- `user_id` (UUID, FK `profiles.id`)
- `role` (ENUM)
- `created_at` (TIMESTAMPTZ)

### 3. `courses`
Metadata program pembelajaran.
- `id` (UUID, PK)
- `slug` (TEXT, UNIQUE)
- `title` (TEXT)
- `description` (TEXT)
- `is_published` (BOOLEAN)

### 4. `modules`
Daftar 12 modul pembelajaran terstruktur.
- `id` (UUID, PK)
- `course_id` (UUID, FK `courses.id`)
- `module_number` (INT)
- `title` (TEXT)
- `slug` (TEXT, UNIQUE)
- `description` (TEXT)
- `estimated_minutes` (INT)
- `difficulty_level` (TEXT)
- `is_published` (BOOLEAN)
- `order_index` (INT)

### 5. `lessons`
Daftar materi praktik di dalam setiap modul.
- `id` (UUID, PK)
- `module_id` (UUID, FK `modules.id`)
- `lesson_number` (INT)
- `title` (TEXT)
- `slug` (TEXT)
- `description` (TEXT)
- `estimated_minutes` (INT)
- `order_index` (INT)

### 6. `lesson_blocks`
Blok-blok konten detail materi (tujuan, konsep, prompt, kode, FAQ error).
- `id` (UUID, PK)
- `lesson_id` (UUID, FK `lessons.id`)
- `block_type` (TEXT)
- `title` (TEXT)
- `content` (TEXT)
- `metadata` (JSONB)
- `order_index` (INT)

### 7. `user_progress`
Pencatatan status penyelesaian materi oleh peserta.
- `id` (UUID, PK)
- `user_id` (UUID, FK `profiles.id`)
- `lesson_id` (UUID, FK `lessons.id`)
- `status` (ENUM: `'not_started'`, `'in_progress'`, `'completed'`)
- `completed_at` (TIMESTAMPTZ)

### 8. `bookmarks`
Materi yang disimpan oleh siswa untuk dipelajari kembali.
- `id` (UUID, PK)
- `user_id` (UUID, FK `profiles.id`)
- `lesson_id` (UUID, FK `lessons.id`)

### 9. `learning_notes`
Catatan pribadi peserta untuk setiap materi.
- `id` (UUID, PK)
- `user_id` (UUID, FK `profiles.id`)
- `lesson_id` (UUID, FK `lessons.id`)
- `note_text` (TEXT)

### 10. `work_submissions`
Kumpulan karya proyek peserta yang dikumpulkan untuk dinilai.
- `id` (UUID, PK)
- `user_id` (UUID, FK `profiles.id`)
- `full_name` (TEXT)
- `email` (TEXT)
- `whatsapp` (TEXT)
- `institution` (TEXT)
- `project_title` (TEXT)
- `project_description` (TEXT)
- `completed_modules` (TEXT[])
- `github_url` (TEXT)
- `deployment_url` (TEXT)
- `screenshot_url` (TEXT)
- `attachment_url` (TEXT)
- `submission_status` (ENUM: `'pending'`, `'accepted'`, `'revision_needed'`, `'rejected'`)
- `score` (INT)
- `admin_notes` (TEXT)
- `submitted_at`, `updated_at` (TIMESTAMPTZ)

### 11. `submission_attachments`
Berkas lampiran tambahan (screenshot, PDF pendukung).
- `id` (UUID, PK)
- `submission_id` (UUID, FK `work_submissions.id`)
- `file_name`, `file_url`, `file_size`, `mime_type` (BIGINT / TEXT)

### 12. `integration_logs`
Riwayat pencatatan sinkronisasi Google Sheets atau webhook eksternal.
- `id` (UUID, PK)
- `service_name` (TEXT)
- `event_type` (TEXT)
- `status` (TEXT: `'success'`, `'failed'`, `'pending'`)
- `payload` (JSONB)
- `error_message` (TEXT)

---

## 3. Kebijakan Row Level Security (RLS)

1. **Akses Publik**: Pengunjung dapat membaca modul dan materi yang berstatus `is_published = true`.
2. **Akses Peserta**: Peserta terautentikasi hanya dapat mengelola data miliknya sendiri (`auth.uid() = user_id`) pada tabel `user_progress`, `bookmarks`, `learning_notes`, dan `work_submissions`.
3. **Akses Administrator**: Administrator yang terverifikasi melalui fungsi keamanan `public.is_admin()` memiliki hak baca dan kelola penuh pada seluruh tabel, materi kurikulum, dan penilaian karya seluruh siswa.
