-- Migrasi dukungan pengumpulan karya Android (ComposeLab SMKN 1)
-- Membuat deployment_url opsional dan menambahkan apk_url serta demo_video_url

ALTER TABLE public.work_submissions
  ALTER COLUMN deployment_url DROP NOT NULL;

ALTER TABLE public.work_submissions
  ADD COLUMN IF NOT EXISTS apk_url text,
  ADD COLUMN IF NOT EXISTS demo_video_url text;
