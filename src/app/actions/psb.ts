"use server"

import pool from "@/lib/db"
import type { PsbFormData } from "@/types/santri"

function generateNoPendaftaran(gelombang: string): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  const gl = gelombang.replace(/\D/g, "") || "1"
  return `PSB-${year}-G${gl}-${rand}`
}

export interface PsbResult {
  success: boolean
  noPendaftaran?: string
  error?: string
}

export async function submitPendaftaran(data: PsbFormData): Promise<PsbResult> {
  const no_pendaftaran = generateNoPendaftaran(data.gelombang)

  try {
    await pool.query(
      `INSERT INTO pendaftaran (
        no_pendaftaran, nama_lengkap, nama_panggilan, nik,
        tempat_lahir, tanggal_lahir, jenis_kelamin, alamat,
        provinsi, kota, kode_pos, sekolah_asal, hafalan_saat_ini, no_hp_santri,
        nama_ayah, pekerjaan_ayah, no_hp_ayah, penghasilan_ayah,
        nama_ibu, pekerjaan_ibu, no_hp_ibu,
        gelombang, status
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,
        $15,$16,$17,$18,$19,$20,$21,$22,$23
      )`,
      [
        no_pendaftaran,
        data.nama_lengkap.trim(),
        data.nama_panggilan?.trim() || null,
        data.nik?.trim() || null,
        data.tempat_lahir.trim(),
        data.tanggal_lahir,
        data.jenis_kelamin,
        data.alamat.trim(),
        data.provinsi?.trim() || null,
        data.kota?.trim() || null,
        data.kode_pos?.trim() || null,
        data.sekolah_asal?.trim() || null,
        data.hafalan_saat_ini?.trim() || null,
        data.no_hp_santri?.trim() || null,
        data.nama_ayah.trim(),
        data.pekerjaan_ayah?.trim() || null,
        data.no_hp_ayah.trim(),
        data.penghasilan_ayah?.trim() || null,
        data.nama_ibu.trim(),
        data.pekerjaan_ibu?.trim() || null,
        data.no_hp_ibu?.trim() || null,
        data.gelombang,
        "menunggu",
      ]
    )
    return { success: true, noPendaftaran: no_pendaftaran }
  } catch (err) {
    console.error("[PSB] DB insert error:", err)
    return { success: false, error: "Gagal menyimpan data. Coba lagi atau hubungi admin." }
  }
}
