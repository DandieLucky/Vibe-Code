-- ==============================================================================
-- SUPABASE STORAGE BUCKET CONFIGURATION: work-submissions
-- File: supabase/storage-setup.sql
-- ==============================================================================

-- 1. Buat bucket 'work-submissions' jika belum ada
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'work-submissions',
    'work-submissions',
    true, -- public readable agar reviewer dan screenshot preview tampil instan
    5242880, -- 5 MB batas maksimal ukuran file per unggahan
    ARRAY[
        'image/png',
        'image/jpeg',
        'image/webp',
        'application/pdf',
        'application/zip',
        'application/x-zip-compressed'
    ]
)
ON CONFLICT (id) DO UPDATE SET
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types,
    public = EXCLUDED.public;

-- 2. Kebijakan Keamanan Storage (Storage RLS)
-- Izinkan siapapun (publik atau siswa) membaca file karya
CREATE POLICY "Public & Reviewer can read submission files"
ON storage.objects FOR SELECT
USING (bucket_id = 'work-submissions');

-- Izinkan peserta login mengunggah file ke foldernya sendiri (auth.uid()/filename)
CREATE POLICY "Authenticated users can upload submission files"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'work-submissions'
    AND auth.role() = 'authenticated'
);

-- Izinkan pemilik file atau Admin menghapus / memperbarui file miliknya
CREATE POLICY "Users can update or delete own uploaded submission files"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'work-submissions'
    AND (
        (storage.foldername(name))[1] = auth.uid()::text
        OR public.is_admin()
    )
);

CREATE POLICY "Users can delete own uploaded submission files"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'work-submissions'
    AND (
        (storage.foldername(name))[1] = auth.uid()::text
        OR public.is_admin()
    )
);
