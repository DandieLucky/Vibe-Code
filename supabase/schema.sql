-- ==============================================================================
-- DATABASE SCHEMA: PLATFORM PEMBELAJARAN DEVELOPMENT TERINTEGRASI
-- Target Engine: Supabase PostgreSQL (Postgres 15+)
-- File: supabase/schema.sql
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('student', 'admin', 'instructor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE submission_status_type AS ENUM ('pending', 'accepted', 'revision_needed', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE progress_status_type AS ENUM ('not_started', 'in_progress', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Tautkan dengan auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    whatsapp TEXT,
    institution TEXT,
    avatar_url TEXT,
    role user_role_type DEFAULT 'student'::user_role_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. USER ROLES TABLE (Tabel Khusus RBAC yang Aman)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role user_role_type DEFAULT 'student'::user_role_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, role)
);

-- 5. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. MODULES TABLE (12 Modul Terstruktur)
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    module_number INT NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    estimated_minutes INT DEFAULT 45,
    difficulty_level TEXT DEFAULT 'Pemula',
    is_published BOOLEAN DEFAULT true NOT NULL,
    order_index INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    lesson_number INT NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    estimated_minutes INT DEFAULT 15,
    order_index INT NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(module_id, slug)
);

-- 8. LESSON BLOCKS TABLE (Detail Blok Materi)
CREATE TABLE IF NOT EXISTS public.lesson_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    block_type TEXT NOT NULL, -- 'concept', 'prompt', 'code', 'validation', 'error_faq', etc.
    title TEXT,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    order_index INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. USER PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    status progress_status_type DEFAULT 'not_started'::progress_status_type NOT NULL,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, lesson_id)
);

-- 10. BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, lesson_id)
);

-- 11. LEARNING NOTES TABLE (Catatan Pribadi Peserta)
CREATE TABLE IF NOT EXISTS public.learning_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    note_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, lesson_id)
);

-- 12. WORK SUBMISSIONS TABLE (Kumpulan Karya Peserta)
CREATE TABLE IF NOT EXISTS public.work_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    institution TEXT NOT NULL,
    project_title TEXT NOT NULL,
    project_description TEXT NOT NULL,
    completed_modules TEXT[] DEFAULT ARRAY[]::TEXT[],
    github_url TEXT NOT NULL,
    deployment_url TEXT NOT NULL,
    screenshot_url TEXT,
    attachment_url TEXT,
    submission_status submission_status_type DEFAULT 'pending'::submission_status_type NOT NULL,
    score INT,
    admin_notes TEXT,
    submitted_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 13. SUBMISSION ATTACHMENTS TABLE
CREATE TABLE IF NOT EXISTS public.submission_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES public.work_submissions(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 14. INTEGRATION LOGS TABLE (Google Sheets, Webhooks, dsb.)
CREATE TABLE IF NOT EXISTS public.integration_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_name TEXT NOT NULL,
    event_type TEXT NOT NULL,
    status TEXT NOT NULL, -- 'success', 'failed', 'pending'
    payload JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 15. SITE SETTINGS TABLE (Pengaturan Pendaftaran & Integrasi)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    registration_mode TEXT DEFAULT 'open' NOT NULL, -- 'open' or 'invite_only'
    allow_submissions BOOLEAN DEFAULT true NOT NULL,
    submission_deadline TIMESTAMPTZ,
    google_sheets_enabled BOOLEAN DEFAULT false NOT NULL,
    google_sheet_id TEXT,
    last_sheets_sync TIMESTAMPTZ,
    site_announcement TEXT,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_modules_course ON public.modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_notes_user ON public.learning_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON public.work_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.work_submissions(submission_status);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Helper Function: Check if currently authenticated user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = 'admin'::user_role_type
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Courses, Modules, Lessons (Public can read published, Admin can do all)
CREATE POLICY "Public read published courses" 
ON public.courses FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Admin manage courses" 
ON public.courses FOR ALL USING (public.is_admin());

CREATE POLICY "Public read published modules" 
ON public.modules FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Admin manage modules" 
ON public.modules FOR ALL USING (public.is_admin());

CREATE POLICY "Public read published lessons" 
ON public.lessons FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Admin manage lessons" 
ON public.lessons FOR ALL USING (public.is_admin());

CREATE POLICY "Public read lesson blocks" 
ON public.lesson_blocks FOR SELECT USING (true);

CREATE POLICY "Admin manage lesson blocks" 
ON public.lesson_blocks FOR ALL USING (public.is_admin());

-- User Progress Policies
CREATE POLICY "Users view own progress" 
ON public.user_progress FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users insert/update own progress" 
ON public.user_progress FOR ALL USING (auth.uid() = user_id);

-- Bookmarks Policies
CREATE POLICY "Users manage own bookmarks" 
ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

-- Learning Notes Policies
CREATE POLICY "Users manage own notes" 
ON public.learning_notes FOR ALL USING (auth.uid() = user_id);

-- Work Submissions Policies
CREATE POLICY "Users view own submissions, Admin views all" 
ON public.work_submissions FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create their own submission" 
ON public.work_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update pending submission, Admin can update all" 
ON public.work_submissions FOR UPDATE USING (
    (auth.uid() = user_id AND submission_status = 'pending') OR public.is_admin()
);

-- Site Settings Policies
CREATE POLICY "Anyone can read site settings" 
ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Only admin can update site settings" 
ON public.site_settings FOR ALL USING (public.is_admin());

-- Integration Logs (Admin only)
CREATE POLICY "Admin manage logs" 
ON public.integration_logs FOR ALL USING (public.is_admin());
