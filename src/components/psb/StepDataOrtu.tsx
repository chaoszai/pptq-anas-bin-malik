"use client"

import type { PsbFormData } from "@/types/santri"

interface Props {
  data: Partial<PsbFormData>
  onChange: (data: Partial<PsbFormData>) => void
  onNext: () => void
  onBack: () => void
}

const PENGHASILAN_OPTIONS = [
  "< Rp 1.000.000",
  "Rp 1.000.000 – Rp 2.500.000",
  "Rp 2.500.000 – Rp 5.000.000",
  "Rp 5.000.000 – Rp 10.000.000",
  "> Rp 10.000.000",
]

const inputClass =
  "w-full font-sans text-sm px-3 py-2.5 border outline-none transition-colors focus:border-[var(--color-emerald-mid)]"
const inputStyle = {
  background: "var(--color-cream)",
  borderColor: "var(--color-sand)",
  color: "var(--color-ink)",
}
const labelClass = "block font-sans text-xs font-medium tracking-wide mb-1.5"
const labelStyle = { color: "var(--color-walnut)" }
const requiredMark = <span style={{ color: "var(--color-gold-antique)" }}>*</span>

export function StepDataOrtu({ data, onChange, onNext, onBack }: Props) {
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
          بَيَانَاتُ الْوَالِدَيْن
        </p>
        <h2 className="font-display italic font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
          Data Orang Tua / Wali
        </h2>
      </div>

      {/* Ayah */}
      <div>
        <p
          className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 pb-2"
          style={{ color: "var(--color-emerald-mid)", borderBottom: "1px solid var(--color-sand)" }}
        >
          Data Ayah
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={labelClass} style={labelStyle}>Nama Ayah {requiredMark}</label>
            <input
              type="text"
              required
              value={data.nama_ayah ?? ""}
              onChange={(e) => set("nama_ayah", e.target.value)}
              placeholder="Nama lengkap ayah"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label className={labelClass} style={labelStyle}>Pekerjaan Ayah</label>
            <input
              type="text"
              value={data.pekerjaan_ayah ?? ""}
              onChange={(e) => set("pekerjaan_ayah", e.target.value)}
              placeholder="Pekerjaan/Profesi"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label className={labelClass} style={labelStyle}>No. HP Ayah {requiredMark}</label>
            <input
              type="tel"
              required
              value={data.no_hp_ayah ?? ""}
              onChange={(e) => set("no_hp_ayah", e.target.value)}
              placeholder="08xxxxxxxxxx"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label className={labelClass} style={labelStyle}>Penghasilan Ayah (per bulan)</label>
            <select
              value={data.penghasilan_ayah ?? ""}
              onChange={(e) => set("penghasilan_ayah", e.target.value)}
              className={inputClass}
              style={inputStyle}
            >
              <option value="">— Pilih —</option>
              {PENGHASILAN_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Ibu */}
      <div>
        <p
          className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 pb-2"
          style={{ color: "var(--color-emerald-mid)", borderBottom: "1px solid var(--color-sand)" }}
        >
          Data Ibu
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={labelClass} style={labelStyle}>Nama Ibu {requiredMark}</label>
            <input
              type="text"
              required
              value={data.nama_ibu ?? ""}
              onChange={(e) => set("nama_ibu", e.target.value)}
              placeholder="Nama lengkap ibu"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label className={labelClass} style={labelStyle}>Pekerjaan Ibu</label>
            <input
              type="text"
              value={data.pekerjaan_ibu ?? ""}
              onChange={(e) => set("pekerjaan_ibu", e.target.value)}
              placeholder="Pekerjaan/Profesi"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label className={labelClass} style={labelStyle}>No. HP Ibu</label>
            <input
              type="tel"
              value={data.no_hp_ibu ?? ""}
              onChange={(e) => set("no_hp_ibu", e.target.value)}
              placeholder="08xxxxxxxxxx"
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 font-sans text-sm font-medium tracking-wider transition-colors hover:bg-[var(--color-sand)]"
          style={{ border: "1px solid var(--color-sand)", color: "var(--color-walnut)" }}
        >
          <span>←</span> Kembali
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 font-sans text-sm font-medium tracking-wider transition-opacity hover:opacity-90"
          style={{ background: "var(--color-emerald-deep)", color: "var(--color-cream)" }}
        >
          Lanjut: Konfirmasi
          <span>→</span>
        </button>
      </div>
    </form>
  )
}
