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
    `)
  } catch (e) {
    console.error("[DB] Migration failed:", e)
  }
}

migrate()

export default pool
