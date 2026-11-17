-- ==============================================================================
-- CUSTOMIZABLE CURRICULUM CMS (Blogspot-like Module & Lesson Management)
-- ==============================================================================

ALTER TABLE public.modules
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL;

ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS content_json JSONB DEFAULT '{}'::jsonb NOT NULL,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL;

-- Hapus katalog referensi lama (12 modul web) jika masih ada dari migrasi awal
-- agar CMS langsung melakukan seed awal dari modul kurikulum aktif saat ini.
DELETE FROM public.lessons
WHERE module_id IN (
  SELECT id FROM public.modules
  WHERE course_id = 'b319caba-00e0-534e-874c-c75238f99baf'
    AND description LIKE 'Katalog referensi%'
);

DELETE FROM public.modules
WHERE course_id = 'b319caba-00e0-534e-874c-c75238f99baf'
  AND description LIKE 'Katalog referensi%';

