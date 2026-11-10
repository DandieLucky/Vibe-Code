-- Pastikan fungsi extension tersedia
SET search_path TO public, extensions;

-- ==============================================================================
-- TRIGGER: Auto-create profil & role saat user baru mendaftar
-- ==============================================================================
-- Tanpa trigger ini, user bisa sign up tapi tidak punya row di public.profiles,
-- sehingga RLS memblokir hampir semua operasi (progress, submission, dll).

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, whatsapp, institution, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
        NEW.email,
        NULLIF(NEW.raw_user_meta_data->>'whatsapp', ''),
        NULLIF(NEW.raw_user_meta_data->>'institution', ''),
        'student'::user_role_type
    )
    ON CONFLICT (id) DO NOTHING;

    -- Daftarkan role default di tabel RBAC
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'student'::user_role_type)
    ON CONFLICT (user_id, role) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- BACKFILL: Buat profil untuk user yang sudah terlanjur daftar tanpa profil
-- ==============================================================================
INSERT INTO public.profiles (id, full_name, email, role)
SELECT
    u.id,
    COALESCE(u.raw_user_meta_data->>'full_name', SPLIT_PART(u.email, '@', 1)),
    u.email,
    'student'::user_role_type
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
SELECT p.id, 'student'::user_role_type
FROM public.profiles p
LEFT JOIN public.user_roles ur ON ur.user_id = p.id
WHERE ur.user_id IS NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- ==============================================================================
-- HELPER: Jadikan user sebagai admin
-- Jalankan manual setelah user mendaftar, contoh:
--   SELECT public.promote_to_admin('email@anda.com');
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.promote_to_admin(target_email TEXT)
RETURNS TEXT
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_id UUID;
BEGIN
    SELECT id INTO target_id FROM public.profiles WHERE email = target_email;

    IF target_id IS NULL THEN
        RETURN 'ERROR: user dengan email ' || target_email || ' tidak ditemukan';
    END IF;

    UPDATE public.profiles SET role = 'admin'::user_role_type WHERE id = target_id;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_id, 'admin'::user_role_type)
    ON CONFLICT (user_id, role) DO NOTHING;

    RETURN 'OK: ' || target_email || ' sekarang admin';
END;
$$ LANGUAGE plpgsql;
