-- ==============================================================================
-- DATABASE LATIHAN SISWA: KATALOG UMKM DIGITAL (PROJECT LATIHAN SISWA)
-- File: supabase/umkm-exercise-schema.sql
-- PERHATIAN: Skrip SQL ini dijalankan oleh peserta di Supabase proyek latihan
-- mereka masing-masing (bukan di database platform utama).
-- ==============================================================================

-- 1. Tabel Kategori Produk
-- Pastikan fungsi extension (uuid_generate_v4, gen_random_uuid) tersedia
SET search_path TO public, extensions;

CREATE TABLE IF NOT EXISTS public.kategori (
    id SERIAL PRIMARY KEY,
    nama TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    deskripsi TEXT,
    urutan INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Produk UMKM
CREATE TABLE IF NOT EXISTS public.produk (
    id SERIAL PRIMARY KEY,
    kategori_id INT REFERENCES public.kategori(id) ON DELETE SET NULL,
    nama TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    deskripsi TEXT,
    harga NUMERIC(12, 2) NOT NULL DEFAULT 0,
    stok INT NOT NULL DEFAULT 0,
    gambar_url TEXT,
    is_tersedia BOOLEAN DEFAULT true,
    is_unggulan BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Pengaturan Toko
CREATE TABLE IF NOT EXISTS public.pengaturan_toko (
    id INT PRIMARY KEY DEFAULT 1,
    nama_toko TEXT NOT NULL DEFAULT 'Toko UMKM Berkah',
    tagline TEXT DEFAULT 'Katalog Produk Berkualitas',
    nomor_whatsapp TEXT NOT NULL DEFAULT '6281234567890',
    alamat TEXT DEFAULT 'Jl. Merdeka No. 45',
    jam_operasional TEXT DEFAULT 'Senin - Sabtu: 08.00 - 17.00 WIB',
    catatan_pesanan TEXT DEFAULT 'Pesanan akan dikonfirmasi lewat WhatsApp',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel Pesanan / Leads WhatsApp (US-40: Pelacakan Pesanan)
CREATE TABLE IF NOT EXISTS public.pesanan (
    id SERIAL PRIMARY KEY,
    nomor_pesanan TEXT NOT NULL UNIQUE,
    nama_pelanggan TEXT NOT NULL,
    nomor_whatsapp TEXT NOT NULL,
    alamat_pengiriman TEXT,
    total_harga NUMERIC(12, 2) NOT NULL,
    status TEXT DEFAULT 'menunggu_konfirmasi', -- 'menunggu_konfirmasi', 'diproses', 'selesai', 'dibatalkan'
    item_pesanan JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Data Awal Contoh (Seed Toko Latihan)
INSERT INTO public.kategori (id, nama, slug, deskripsi, urutan)
VALUES
    (1, 'Makanan & Minuman', 'makanan-minuman', 'Kuliner lezat olahan rumahan khas nusantara', 1),
    (2, 'Kerajinan Tangan', 'kerajinan-tangan', 'Kriya seni etnik buatan tangan pengrajin lokal', 2),
    (3, 'Fashion & Tekstil', 'fashion-tekstil', 'Batik, tenun, dan busana kasual modern', 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.produk (kategori_id, nama, slug, deskripsi, harga, stok, gambar_url, is_tersedia, is_unggulan)
VALUES
    (1, 'Sambal Bawang Istimewa 200g', 'sambal-bawang-istimewa-200g', 'Sambal rumahan pedas gurih dibuat dari cabai segar pilihan dan bawang merah Brebes.', 28000, 45, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600', true, true),
    (1, 'Kripik Tempe Renyah Original', 'kripik-tempe-renyah-original', 'Kripik tempe renyah tanpa pengawet dengan rempah ketumbar gurih menggugah selera.', 18000, 60, 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600', true, true),
    (2, 'Tas Anyaman Rotan Etnik', 'tas-anyaman-rotan-etnik', 'Tas jinjing tangan rotan khas handmade dengan lining furing batik halus.', 125000, 15, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600', true, true),
    (2, 'Kotak Tisu Kayu Jati Ukir', 'kotak-tisu-kayu-jati-ukir', 'Kotak tisu kayu jati perhutani dengan finishing natural beeswax yang ramah lingkungan.', 65000, 20, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600', true, false),
    (3, 'Kemeja Batik Katun Parang', 'kemeja-batik-katun-parang', 'Kemeja pria batik motif parang bahan katun prima dingin dan nyaman untuk kerja.', 145000, 25, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600', true, true),
    (3, 'Syal Tenun Troso Jepara', 'syal-tenun-troso-jepara', 'Syal motif etnik tenun ATBM benang katun lembut serbaguna.', 75000, 30, 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600', true, false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.pengaturan_toko (id, nama_toko, tagline, nomor_whatsapp, alamat, jam_operasional)
VALUES (1, 'Toko Berkah UMKM', 'Produk Lokal Berkualitas Langsung dari Pengrajin', '6281234567890', 'Jl. Merdeka No. 45, Yogyakarta', 'Senin - Sabtu: 08.00 - 17.00 WIB')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS untuk keamanan data siswa
ALTER TABLE public.kategori ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengaturan_toko ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pesanan ENABLE ROW LEVEL SECURITY;

-- Pengunjung umum dapat melihat produk dan toko
CREATE POLICY "Publik dapat melihat kategori" ON public.kategori FOR SELECT USING (true);
CREATE POLICY "Publik dapat melihat produk tersedia" ON public.produk FOR SELECT USING (is_tersedia = true);
CREATE POLICY "Publik dapat melihat pengaturan toko" ON public.pengaturan_toko FOR SELECT USING (true);
CREATE POLICY "Publik dapat membuat pesanan" ON public.pesanan FOR INSERT WITH CHECK (true);

-- Catatan: Admin autentikasi menggunakan Supabase Auth untuk mengelola produk & pesanan.
