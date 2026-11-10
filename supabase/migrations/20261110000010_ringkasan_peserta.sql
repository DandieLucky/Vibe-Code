-- View ringkasan peserta untuk dashboard admin.
-- Menyatukan progres belajar (user_progress) dengan status pengumpulan karya.
SET search_path TO public, extensions;

DROP VIEW IF EXISTS public.v_ringkasan_peserta;
CREATE VIEW public.v_ringkasan_peserta AS
SELECT
    p.id,
    p.full_name,
    p.email,
    p.created_at,
    COALESCE(pr.jumlah, 0) AS jumlah_pelajaran_selesai,
    (ws.id IS NOT NULL) AS sudah_kumpul,
    ws.score AS skor_akhir,
    ws.submission_code,
    ws.github_url,
    ws.deployment_url,
    ws.submitted_at
FROM public.profiles p
LEFT JOIN (
    SELECT user_id, count(*) AS jumlah
    FROM public.user_progress WHERE status = 'completed' GROUP BY user_id
) pr ON pr.user_id = p.id
LEFT JOIN public.work_submissions ws ON ws.user_id = p.id
WHERE p.role <> 'admin';

GRANT SELECT ON public.v_ringkasan_peserta TO authenticated;
