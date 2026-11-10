-- ==============================================================================
-- MIGRATION: AUTOMATED SCORING & LEADERBOARD
-- Platform Pembelajaran Development Terintegrasi
-- File: supabase/ai-scoring-migration.sql
-- Jalankan SETELAH schema.sql
-- ==============================================================================

-- ==============================================================================
-- 1. PERLUAS TABEL work_submissions DENGAN KOLOM PENILAIAN OTOMATIS
-- ==============================================================================

-- Pastikan fungsi extension (uuid_generate_v4, gen_random_uuid) tersedia
SET search_path TO public, extensions;

ALTER TABLE public.work_submissions
    ADD COLUMN IF NOT EXISTS submission_code TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS is_github_public BOOLEAN,
    ADD COLUMN IF NOT EXISTS is_deployment_live BOOLEAN,
    ADD COLUMN IF NOT EXISTS deployment_http_status INT,
    ADD COLUMN IF NOT EXISTS lighthouse_performance NUMERIC(5,2),
    ADD COLUMN IF NOT EXISTS lighthouse_accessibility NUMERIC(5,2),
    ADD COLUMN IF NOT EXISTS lighthouse_best_practices NUMERIC(5,2),
    ADD COLUMN IF NOT EXISTS lighthouse_seo NUMERIC(5,2),
    ADD COLUMN IF NOT EXISTS repo_file_count INT,
    ADD COLUMN IF NOT EXISTS repo_language TEXT,
    ADD COLUMN IF NOT EXISTS repo_has_readme BOOLEAN,
    ADD COLUMN IF NOT EXISTS repo_last_commit TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS technical_score NUMERIC(5,2),
    ADD COLUMN IF NOT EXISTS ai_score NUMERIC(5,2),
    ADD COLUMN IF NOT EXISTS final_score NUMERIC(5,2),
    ADD COLUMN IF NOT EXISTS ai_summary TEXT,
    ADD COLUMN IF NOT EXISTS ai_strengths TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS ai_improvements TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS penalty_applied NUMERIC(5,2) DEFAULT 0,
    ADD COLUMN IF NOT EXISTS penalty_reason TEXT,
    ADD COLUMN IF NOT EXISTS scoring_status TEXT DEFAULT 'pending',
    ADD COLUMN IF NOT EXISTS scoring_error TEXT,
    ADD COLUMN IF NOT EXISTS scored_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS scoring_duration_ms INT;

-- Batasi nilai scoring_status ke nilai yang dikenal
DO $$ BEGIN
    ALTER TABLE public.work_submissions
        ADD CONSTRAINT work_submissions_scoring_status_check
        CHECK (scoring_status IN ('pending', 'processing', 'completed', 'failed', 'skipped'));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Index untuk leaderboard: skor tertinggi dulu, lalu yang submit lebih awal
CREATE INDEX IF NOT EXISTS idx_submissions_leaderboard
    ON public.work_submissions(final_score DESC NULLS LAST, submitted_at ASC);

CREATE INDEX IF NOT EXISTS idx_submissions_scoring_status
    ON public.work_submissions(scoring_status);

-- ==============================================================================
-- 2. TABEL DETAIL PENILAIAN AI (Satu submission = satu record penilaian)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.submission_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL UNIQUE REFERENCES public.work_submissions(id) ON DELETE CASCADE,

    -- Breakdown skor teknis (0-100 masing-masing)
    score_github_reachable NUMERIC(5,2),
    score_deployment_live NUMERIC(5,2),
    score_lighthouse NUMERIC(5,2),

    -- Breakdown skor AI (0-100 masing-masing)
    score_code_quality NUMERIC(5,2),
    score_feature_completeness NUMERIC(5,2),
    score_ui_ux NUMERIC(5,2),
    score_documentation NUMERIC(5,2),

    -- Bobot yang dipakai saat penilaian (disimpan agar hasil bisa diaudit)
    weights JSONB DEFAULT '{}'::jsonb,

    -- Output AI mentah & terstruktur
    ai_model TEXT,
    ai_raw_response JSONB,
    ai_verdict TEXT,

    -- Detail pemeriksaan teknis
    technical_checks JSONB DEFAULT '{}'::jsonb,
    lighthouse_json JSONB,

    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_submission_scores_submission
    ON public.submission_scores(submission_id);

-- ==============================================================================
-- 3. TABEL KONFIGURASI PENILAIAN (Bobot & aturan bisa diubah admin)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.scoring_config (
    id TEXT PRIMARY KEY DEFAULT 'default',

    -- Bobot komponen utama (total harus 100)
    weight_technical NUMERIC(5,2) DEFAULT 40 NOT NULL,
    weight_ai NUMERIC(5,2) DEFAULT 60 NOT NULL,

    -- Bobot di dalam komponen teknis (total 100)
    weight_tc_github NUMERIC(5,2) DEFAULT 30 NOT NULL,
    weight_tc_deployment NUMERIC(5,2) DEFAULT 40 NOT NULL,
    weight_tc_lighthouse NUMERIC(5,2) DEFAULT 30 NOT NULL,

    -- Bobot di dalam komponen AI (total 100)
    weight_ai_code NUMERIC(5,2) DEFAULT 35 NOT NULL,
    weight_ai_features NUMERIC(5,2) DEFAULT 30 NOT NULL,
    weight_ai_ui NUMERIC(5,2) DEFAULT 20 NOT NULL,
    weight_ai_docs NUMERIC(5,2) DEFAULT 15 NOT NULL,

    -- Aturan penalti
    penalty_deployment_down NUMERIC(5,2) DEFAULT 20 NOT NULL,
    penalty_github_private NUMERIC(5,2) DEFAULT 25 NOT NULL,
    penalty_no_readme NUMERIC(5,2) DEFAULT 5 NOT NULL,

    -- Penilaian otomatis aktif?
    auto_scoring_enabled BOOLEAN DEFAULT true NOT NULL,

    -- Batas kuota harian AI (untuk menjaga free tier tidak jebol)
    ai_daily_quota INT DEFAULT 200 NOT NULL,
    ai_used_today INT DEFAULT 0 NOT NULL,
    ai_quota_reset_at DATE DEFAULT CURRENT_DATE,

    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

INSERT INTO public.scoring_config (id)
VALUES ('default')
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 4. TABEL LOG PENILAIAN (Audit trail tiap pemanggilan API eksternal)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.scoring_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID REFERENCES public.work_submissions(id) ON DELETE CASCADE,
    step TEXT NOT NULL,          -- 'github_check', 'deployment_check', 'lighthouse', 'ai_eval'
    status TEXT NOT NULL,        -- 'success', 'failed', 'skipped'
    http_status INT,
    duration_ms INT,
    detail JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_scoring_logs_submission
    ON public.scoring_logs(submission_id);

CREATE INDEX IF NOT EXISTS idx_scoring_logs_created
    ON public.scoring_logs(created_at DESC);

-- ==============================================================================
-- 5. AUTO-GENERATE submission_code (kode unik peserta, mis. VC-2026-0001)
-- ==============================================================================

CREATE SEQUENCE IF NOT EXISTS public.submission_code_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_submission_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.submission_code IS NULL THEN
        NEW.submission_code := 'VC-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
            LPAD(NEXTVAL('public.submission_code_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_generate_submission_code ON public.work_submissions;
CREATE TRIGGER trg_generate_submission_code
    BEFORE INSERT ON public.work_submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.generate_submission_code();

-- ==============================================================================
-- 6. AUTO-UPDATE updated_at
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_work_submissions_updated_at ON public.work_submissions;
CREATE TRIGGER trg_work_submissions_updated_at
    BEFORE UPDATE ON public.work_submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_submission_scores_updated_at ON public.submission_scores;
CREATE TRIGGER trg_submission_scores_updated_at
    BEFORE UPDATE ON public.submission_scores
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- ==============================================================================
-- 7. VIEW LEADERBOARD (Top 10 + data yang dibutuhkan admin)
-- ==============================================================================

CREATE OR REPLACE VIEW public.leaderboard AS
SELECT
    ws.id,
    ws.submission_code,
    ws.full_name,
    ws.institution,
    ws.project_title,
    ws.github_url,
    ws.deployment_url,
    ws.submitted_at,
    ws.technical_score,
    ws.ai_score,
    ws.final_score,
    ws.penalty_applied,
    ws.penalty_reason,
    ws.lighthouse_performance,
    ws.is_deployment_live,
    ws.scoring_status,
    RANK() OVER (
        ORDER BY ws.final_score DESC NULLS LAST, ws.submitted_at ASC
    ) AS rank_position
FROM public.work_submissions ws
WHERE ws.scoring_status = 'completed';

COMMENT ON VIEW public.leaderboard IS
    'Peringkat karya peserta. Diurutkan skor tertinggi, tie-breaker waktu submit lebih awal.';

-- ==============================================================================
-- 8. ROW LEVEL SECURITY UNTUK TABEL BARU
-- ==============================================================================

ALTER TABLE public.submission_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scoring_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scoring_logs ENABLE ROW LEVEL SECURITY;

-- Peserta hanya lihat skor dirinya sendiri; admin lihat semua
CREATE POLICY "Users view own score, admin views all"
ON public.submission_scores FOR SELECT
USING (
    public.is_admin()
    OR EXISTS (
        SELECT 1 FROM public.work_submissions ws
        WHERE ws.id = submission_scores.submission_id
          AND ws.user_id = auth.uid()
    )
);

CREATE POLICY "Admin manage scores"
ON public.submission_scores FOR ALL
USING (public.is_admin());

-- Konfigurasi penilaian: semua boleh baca, hanya admin boleh ubah
CREATE POLICY "Anyone can read scoring config"
ON public.scoring_config FOR SELECT USING (true);

CREATE POLICY "Admin manage scoring config"
ON public.scoring_config FOR ALL USING (public.is_admin());

-- Log penilaian: admin saja
CREATE POLICY "Admin manage scoring logs"
ON public.scoring_logs FOR ALL USING (public.is_admin());

-- ==============================================================================
-- 9. GRANT UNTUK SUPABASE API
-- ==============================================================================

GRANT SELECT ON public.leaderboard TO authenticated, anon;
GRANT SELECT ON public.submission_scores TO authenticated;
GRANT SELECT ON public.scoring_config TO authenticated, anon;

-- ==============================================================================
-- SELESAI. Verifikasi dengan query berikut:
--   SELECT column_name, data_type FROM information_schema.columns
--   WHERE table_name = 'work_submissions' AND column_name LIKE '%score%';
--   SELECT * FROM public.scoring_config;
-- ==============================================================================
