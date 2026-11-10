-- Pastikan fungsi extension tersedia
SET search_path TO public, extensions;

-- ==============================================================================
-- MIGRATION: Wajib ganti password pada login pertama
-- ==============================================================================
-- Akun admin dibuatkan fasilitator dengan password sementara. Kolom ini
-- menandai bahwa pemilik akun HARUS mengganti password sebelum bisa
-- memakai platform. Middleware memaksa redirect ke /profil?ganti-password=1.

ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN DEFAULT false NOT NULL;

ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS password_changed_at TIMESTAMPTZ;

-- Fungsi: hapus penanda wajib-ganti setelah password berhasil diubah
CREATE OR REPLACE FUNCTION public.clear_must_change_password()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.profiles
    SET must_change_password = false,
        password_changed_at = TIMEZONE('utc'::text, NOW())
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pada auth.users: saat password diperbarui, penanda ikut dibersihkan
CREATE OR REPLACE FUNCTION public.on_password_change()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NEW.encrypted_password IS DISTINCT FROM OLD.encrypted_password THEN
        UPDATE public.profiles
        SET must_change_password = false,
            password_changed_at = TIMEZONE('utc'::text, NOW())
        WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_auth_password_change ON auth.users;
CREATE TRIGGER on_auth_password_change
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.on_password_change();

-- Index untuk middleware (query cepat per request)
CREATE INDEX IF NOT EXISTS idx_profiles_must_change
    ON public.profiles(must_change_password)
    WHERE must_change_password = true;
