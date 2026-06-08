"use client"

import type { PsbFormData } from "@/types/santri"

interface Props {
  data: Partial<PsbFormData>
  onChange: (data: Partial<PsbFormData>) => void
  onNext: () => void
}

const HAFALAN_OPTIONS = [
  "Belum hafal",
  "Juz 30 (Juz Amma)",
  "1–5 Juz",
  "6–10 Juz",
  "11–15 Juz",
  "16–20 Juz",
  "21–25 Juz",
  "26–30 Juz",
  "30 Juz (Khatam)",
]

const inputClass =
  "w-full font-sans text-sm px-3 py-2.5 border outline-none focus:ring-0 transition-colors"
const inputStyle = {
  background: "var(--color-cream)",
  borderColor: "var(--color-sand)",
  color: "var(--color-ink)",
}
const inputFocusStyle = "focus:border-[var(--color-emerald-mid)]"

const labelClass = "block font-sans text-xs font-medium tracking-wide mb-1.5"
const labelStyle = { color: "var(--color-walnut)" }

const requiredMark = <span style={{ color: "var(--color-gold-antique)" }}>*</span>

export function StepDataSantri({ data, onChange, onNext }: Props) {
  function set(key: keyof PsbFormData, value: string) {
    onChange({ ...data, [key]: value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="font-arabic text-lg mb-1" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
          بَيَانَاتُ الطَّالِب
        </p>
        <h2 className="font-display italic font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
          Data Calon Santri
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Nama Lengkap */}
        <div className="sm:col-span-2">
          <label className={labelClass} style={labelStyle}>
            Nama Lengkap {requiredMark}
          </label>
          <input
            type="text"
            required
            value={data.nama_lengkap ?? ""}
            onChange={(e) => set("nama_lengkap", e.target.value)}
            placeholder="Sesuai Akta Kelahiran"
            className={`${inputClass} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </div>

        {/* Nama Panggilan */}
        <div>
          <label className={labelClass} style={labelStyle}>Nama Panggilan</label>
          <input
            type="text"
            value={data.nama_panggilan ?? ""}
            onChange={(e) => set("nama_panggilan", e.target.value)}
            placeholder="Nama sehari-hari"
            className={`${inputClass} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </div>

        {/* NIK */}
        <div>
          <label className={labelClass} style={labelStyle}>NIK (No. Induk Kependudukan)</label>
          <input
            type="text"
            value={data.nik ?? ""}
            onChange={(e) => set("nik", e.target.value)}
            placeholder="16 digit NIK"
            maxLength={16}
            className={`${inputClass} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </div>

        {/* Tempat Lahir */}
        <div>
          <label className={labelClass} style={labelStyle}>
            Tempat Lahir {requiredMark}
          </label>
          <input
            type="text"
            required
            value={data.tempat_lahir ?? ""}
            onChange={(e) => set("tempat_lahir", e.target.value)}
            placeholder="Kota/Kabupaten"
            className={`${inputClass} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </div>

        {/* Tanggal Lahir */}
        <div>
          <label className={labelClass} style={labelStyle}>
            Tanggal Lahir {requiredMark}
          </label>
          <input
            type="date"
            required
            value={data.tanggal_lahir ?? ""}
            onChange={(e) => set("tanggal_lahir", e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className={`${inputClass} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className={labelClass} style={labelStyle}>
            Jenis Kelamin {requiredMark}
          </label>
          <div className="flex gap-4 mt-1">
            {(["L", "P"] as const).map((jk) => (
              <label key={jk} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="jenis_kelamin"
                  required
                  checked={data.jenis_kelamin === jk}
                  onChange={() => set("jenis_kelamin", jk)}
                  className="accent-[var(--color-emerald-deep)]"
                />
                <span className="font-sans text-sm" style={{ color: "var(--color-ink)" }}>
                  {jk === "L" ? "Laki-laki" : "Perempuan"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Hafalan */}
        <div>
          <label className={labelClass} style={labelStyle}>Hafalan Saat Ini</label>
          <select
            value={data.hafalan_saat_ini ?? ""}
            onChange={(e) => set("hafalan_saat_ini", e.target.value)}
            className={`${inputClass} ${inputFocusStyle}`}
            style={inputStyle}
          >
            <option value="">— Pilih —</option>
            {HAFALAN_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Alamat */}
        <div className="sm:col-span-2">
          <label className={labelClass} style={labelStyle}>
            Alamat Lengkap {requiredMark}
          </label>
          <textarea
            required
            rows={3}
            value={data.alamat ?? ""}
            onChange={(e) => set("alamat", e.target.value)}
            placeholder="Jalan, RT/RW, Desa/Kelurahan, Kecamatan"
            className={`${inputClass} ${inputFocusStyle} resize-none`}
            style={inputStyle}
          />
        </div>

        {/* Kota */}
        <div>
          <label className={labelClass} style={labelStyle}>Kota/Kabupaten</label>
          <input
            type="text"
            value={data.kota ?? ""}
            onChange={(e) => set("kota", e.target.value)}
            placeholder="Kota/Kabupaten"
            className={`${inputClass} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </div>

        {/* Provinsi */}
        <div>
          <label className={labelClass} style={labelStyle}>Provinsi</label>
          <input
            type="text"
            value={data.provinsi ?? ""}
            onChange={(e) => set("provinsi", e.target.value)}
            placeholder="Provinsi"
            className={`${inputClass} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </div>

        {/* Sekolah Asal */}
        <div>
          <label className={labelClass} style={labelStyle}>Sekolah/Madrasah Asal</label>
          <input
            type="text"
            value={data.sekolah_asal ?? ""}
            onChange={(e) => set("sekolah_asal", e.target.value)}
            placeholder="Nama sekolah asal"
            className={`${inputClass} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </div>

        {/* HP Santri */}
        <div>
          <label className={labelClass} style={labelStyle}>No. HP Santri (opsional)</label>
          <input
            type="tel"
            value={data.no_hp_santri ?? ""}
            onChange={(e) => set("no_hp_santri", e.target.value)}
            placeholder="08xxxxxxxxxx"
            className={`${inputClass} ${inputFocusStyle}`}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 font-sans text-sm font-medium tracking-wider transition-opacity hover:opacity-90"
          style={{ background: "var(--color-emerald-deep)", color: "var(--color-cream)" }}
        >
          Lanjut: Data Orang Tua
          <span>→</span>
        </button>
      </div>
    </form>
  )
}
