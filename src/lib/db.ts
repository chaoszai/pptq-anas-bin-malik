import { Pool } from "pg"

const globalForPg = globalThis as unknown as { pgPool?: Pool; dbMigrated?: boolean }

export const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  })

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pool

async function migrate() {
  if (globalForPg.dbMigrated) return
  globalForPg.dbMigrated = true
  try {
    await pool.query(`
      -- ============ PSB / Pendaftaran (existing) ============
      CREATE TABLE IF NOT EXISTS pendaftaran (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        no_pendaftaran TEXT UNIQUE NOT NULL,
        nama_lengkap TEXT NOT NULL,
        nama_panggilan TEXT,
        nik TEXT,
        tempat_lahir TEXT NOT NULL,
        tanggal_lahir DATE NOT NULL,
        jenis_kelamin TEXT NOT NULL CHECK (jenis_kelamin IN ('L', 'P')),
        alamat TEXT NOT NULL,
        provinsi TEXT,
        kota TEXT,
        kode_pos TEXT,
        sekolah_asal TEXT,
        hafalan_saat_ini TEXT,
        no_hp_santri TEXT,
        nama_ayah TEXT NOT NULL,
        pekerjaan_ayah TEXT,
        no_hp_ayah TEXT NOT NULL,
        penghasilan_ayah TEXT,
        nama_ibu TEXT NOT NULL,
        pekerjaan_ibu TEXT,
        no_hp_ibu TEXT,
        gelombang TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'menunggu'
          CHECK (status IN ('menunggu','verifikasi','seleksi','diterima','ditolak','cadangan')),
        catatan_admin TEXT,
        ip_address TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE OR REPLACE FUNCTION update_updated_at()
      RETURNS TRIGGER LANGUAGE plpgsql AS $$
      BEGIN NEW.updated_at = now(); RETURN NEW; END;
      $$;
      DROP TRIGGER IF EXISTS set_updated_at ON pendaftaran;
      CREATE TRIGGER set_updated_at
        BEFORE UPDATE ON pendaftaran
        FOR EACH ROW EXECUTE FUNCTION update_updated_at();

      -- ============ Site Settings (singleton) ============
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
        site_name TEXT,
        site_full_name TEXT,
        tagline TEXT,
        logo_url TEXT,
        tahun_berdiri TEXT,
        pengasuh TEXT,
        sk_yayasan TEXT,
        npsn TEXT,
        phone TEXT,
        whatsapp TEXT,
        email TEXT,
        address TEXT,
        city TEXT,
        maps_url TEXT,
        instagram TEXT,
        youtube TEXT,
        facebook TEXT,
        tiktok TEXT,
        total_santri INT,
        alumni_huffazh INT,
        program_count INT,
        hero_heading TEXT,
        hero_subheading TEXT,
        hero_image_url TEXT,
        about_text TEXT,
        about_image_url TEXT,
        psb_waves JSONB NOT NULL DEFAULT '[]'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

      -- ============ Page Content (key-value untuk halaman statis) ============
      CREATE TABLE IF NOT EXISTS page_content (
        key TEXT PRIMARY KEY,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      -- ============ Kategori ============
      CREATE TABLE IF NOT EXISTS kategori (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        color TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      -- ============ Artikel ============
      CREATE TABLE IF NOT EXISTS artikel (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT,
        body_html TEXT,
        thumbnail_url TEXT,
        kategori_id UUID REFERENCES kategori(id) ON DELETE SET NULL,
        published_at TIMESTAMPTZ,
        featured BOOLEAN NOT NULL DEFAULT false,
        seo JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      -- ============ Galeri ============
      CREATE TABLE IF NOT EXISTS galeri (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT,
        kategori TEXT,
        date DATE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS galeri_image (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        galeri_id UUID NOT NULL REFERENCES galeri(id) ON DELETE CASCADE,
        url TEXT NOT NULL,
        caption TEXT,
        alt TEXT,
        "order" INT NOT NULL DEFAULT 0
      );

      -- ============ Program ============
      CREATE TABLE IF NOT EXISTS program (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        arabic_title TEXT,
        roman TEXT,
        slug TEXT,
        description TEXT,
        body_html TEXT,
        icon_url TEXT,
        "order" INT NOT NULL DEFAULT 0
      );

      -- ============ Pengurus ============
      CREATE TABLE IF NOT EXISTS pengurus (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        jabatan TEXT NOT NULL,
        photo_url TEXT,
        "order" INT NOT NULL DEFAULT 0
      );

      -- ============ Fasilitas ============
      CREATE TABLE IF NOT EXISTS fasilitas (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        photos JSONB NOT NULL DEFAULT '[]'::jsonb,
        "order" INT NOT NULL DEFAULT 0
      );

      -- ============ Testimoni ============
      CREATE TABLE IF NOT EXISTS testimoni (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        role TEXT,
        photo_url TEXT,
        quote TEXT NOT NULL,
        rating INT NOT NULL DEFAULT 5,
        "order" INT NOT NULL DEFAULT 0
      );

      -- ============ Event ============
      CREATE TABLE IF NOT EXISTS event (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT,
        description TEXT,
        thumbnail_url TEXT,
        start_date TIMESTAMPTZ,
        end_date TIMESTAMPTZ,
        location TEXT,
        is_online BOOLEAN NOT NULL DEFAULT false,
        registration_url TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `)
  } catch (e) {
    console.error("[DB] Migration failed:", e)
  }
}

migrate()

export default pool
