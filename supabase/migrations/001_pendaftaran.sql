-- Tabel pendaftaran santri baru PPTQ Anas Bin Malik
CREATE TABLE IF NOT EXISTS pendaftaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  no_pendaftaran TEXT UNIQUE NOT NULL,

  -- Data Calon Santri
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

  -- Data Orang Tua / Wali
  nama_ayah TEXT NOT NULL,
  pekerjaan_ayah TEXT,
  no_hp_ayah TEXT NOT NULL,
  penghasilan_ayah TEXT,
  nama_ibu TEXT NOT NULL,
  pekerjaan_ibu TEXT,
  no_hp_ibu TEXT,

  -- Info PSB
  gelombang TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'menunggu'
    CHECK (status IN ('menunggu','verifikasi','seleksi','diterima','ditolak','cadangan')),
  catatan_admin TEXT,

  -- Meta
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON pendaftaran
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE pendaftaran ENABLE ROW LEVEL SECURITY;

-- Publik boleh insert (form online)
CREATE POLICY "public_insert" ON pendaftaran
  FOR INSERT TO anon WITH CHECK (true);

-- Admin (authenticated) bisa baca & update
CREATE POLICY "admin_select" ON pendaftaran
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "admin_update" ON pendaftaran
  FOR UPDATE TO authenticated USING (true);
