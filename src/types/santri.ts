export type JenisKelamin = "L" | "P"

export type StatusPendaftaran =
  | "menunggu"
  | "verifikasi"
  | "seleksi"
  | "diterima"
  | "ditolak"
  | "cadangan"

export interface DataSantri {
  nama_lengkap: string
  nama_panggilan?: string
  nik?: string
  tempat_lahir: string
  tanggal_lahir: string
  jenis_kelamin: JenisKelamin
  alamat: string
  provinsi?: string
  kota?: string
  kode_pos?: string
  sekolah_asal?: string
  hafalan_saat_ini?: string
  no_hp_santri?: string
}

export interface DataOrangTua {
  nama_ayah: string
  pekerjaan_ayah?: string
  no_hp_ayah: string
  penghasilan_ayah?: string
  nama_ibu: string
  pekerjaan_ibu?: string
  no_hp_ibu?: string
}

export interface DokumenPendaftaran {
  file_kk?: string
  file_akta?: string
  file_foto?: string
  file_raport?: string
  file_surat_sehat?: string
}

export interface Pendaftaran extends DataSantri, DataOrangTua, DokumenPendaftaran {
  id: string
  no_pendaftaran: string
  status: StatusPendaftaran
  catatan_admin?: string
  gelombang?: string
  ip_address?: string
  user_agent?: string
  created_at: string
  updated_at: string
}

export interface PsbFormData extends DataSantri, DataOrangTua {
  gelombang: string
}

export const STATUS_LABELS: Record<StatusPendaftaran, string> = {
  menunggu: "Menunggu Verifikasi",
  verifikasi: "Sedang Diverifikasi",
  seleksi: "Tahap Seleksi",
  diterima: "Diterima",
  ditolak: "Ditolak",
  cadangan: "Daftar Cadangan",
}

export const STATUS_COLORS: Record<StatusPendaftaran, string> = {
  menunggu: "bg-amber-100 text-amber-800",
  verifikasi: "bg-blue-100 text-blue-800",
  seleksi: "bg-purple-100 text-purple-800",
  diterima: "bg-emerald-100 text-emerald-800",
  ditolak: "bg-red-100 text-red-800",
  cadangan: "bg-gray-100 text-gray-800",
}
