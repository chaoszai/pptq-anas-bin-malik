"use client"

import { useState } from "react"
import type { PsbFormData } from "@/types/santri"
import { PSB_WAVES } from "@/lib/constants"

interface Props {
  data: Partial<PsbFormData>
  onChange: (data: Partial<PsbFormData>) => void
  onSubmit: () => void
  onBack: () => void
  loading: boolean
}

function ReviewRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="flex gap-3 py-2" style={{ borderBottom: "0.5px solid var(--color-sand)" }}>
      <span className="font-sans text-xs w-40 shrink-0" style={{ color: "var(--color-gold-muted)" }}>
        {label}
      </span>
      <span className="font-sans text-sm" style={{ color: "var(--color-ink)" }}>
        {value}
      </span>
    </div>
  )
}

export function StepKonfirmasi({ data, onChange, onSubmit, onBack, loading }: Props) {
  const [setuju, setSetuju] = useState(false)

  const selectedWave = PSB_WAVES.find((w) => w.id === data.gelombang)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!data.gelombang) return
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <p className="font-arabic text-lg mb-1" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
          التَّأْكِيد وَالْمُرَاجَعَة
        </p>
        <h2 className="font-display italic font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
          Konfirmasi & Kirim Pendaftaran
        </h2>
      </div>

      {/* Pilih Gelombang */}
      <div>
        <p
          className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 pb-2"
          style={{ color: "var(--color-emerald-mid)", borderBottom: "1px solid var(--color-sand)" }}
        >
          Pilih Gelombang PSB
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PSB_WAVES.map((wave) => {
            const isSelected = data.gelombang === wave.id
            return (
              <button
                key={wave.id}
                type="button"
                onClick={() => onChange({ ...data, gelombang: wave.id })}
                className="p-4 text-left transition-all"
                style={{
                  background: isSelected ? "var(--color-emerald-deep)" : "var(--color-ivory)",
                  border: `1px solid ${isSelected ? "var(--color-emerald-deep)" : "var(--color-sand)"}`,
                }}
              >
                <p
                  className="font-display italic font-semibold text-base mb-0.5"
                  style={{ color: isSelected ? "var(--color-cream)" : "var(--color-ink)" }}
                >
                  {wave.label}
                </p>
                <p
                  className="font-sans text-xs"
                  style={{ color: isSelected ? "rgba(255,255,255,0.6)" : "var(--color-walnut)" }}
                >
                  {wave.period}
                </p>
              </button>
            )
          })}
        </div>
        {!data.gelombang && (
          <p className="font-sans text-xs mt-2" style={{ color: "var(--color-gold-antique)" }}>
            Pilih gelombang pendaftaran terlebih dahulu.
          </p>
        )}
      </div>

      {/* Review Data */}
      <div>
        <p
          className="font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 pb-2"
          style={{ color: "var(--color-emerald-mid)", borderBottom: "1px solid var(--color-sand)" }}
        >
          Ringkasan Data Pendaftaran
        </p>

        <div className="mb-4">
          <p className="font-sans text-xs font-semibold mb-2" style={{ color: "var(--color-walnut)" }}>
            Data Calon Santri
          </p>
          <ReviewRow label="Nama Lengkap" value={data.nama_lengkap} />
          <ReviewRow label="Nama Panggilan" value={data.nama_panggilan} />
          <ReviewRow label="NIK" value={data.nik} />
          <ReviewRow
            label="Tempat, Tgl Lahir"
            value={
              data.tempat_lahir && data.tanggal_lahir
                ? `${data.tempat_lahir}, ${new Date(data.tanggal_lahir).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`
                : undefined
            }
          />
          <ReviewRow label="Jenis Kelamin" value={data.jenis_kelamin === "L" ? "Laki-laki" : data.jenis_kelamin === "P" ? "Perempuan" : undefined} />
          <ReviewRow label="Alamat" value={data.alamat} />
          <ReviewRow label="Kota/Kab." value={data.kota} />
          <ReviewRow label="Provinsi" value={data.provinsi} />
          <ReviewRow label="Sekolah Asal" value={data.sekolah_asal} />
          <ReviewRow label="Hafalan" value={data.hafalan_saat_ini} />
          <ReviewRow label="No. HP Santri" value={data.no_hp_santri} />
        </div>

        <div>
          <p className="font-sans text-xs font-semibold mb-2" style={{ color: "var(--color-walnut)" }}>
            Data Orang Tua / Wali
          </p>
          <ReviewRow label="Nama Ayah" value={data.nama_ayah} />
          <ReviewRow label="Pekerjaan Ayah" value={data.pekerjaan_ayah} />
          <ReviewRow label="No. HP Ayah" value={data.no_hp_ayah} />
          <ReviewRow label="Penghasilan Ayah" value={data.penghasilan_ayah} />
          <ReviewRow label="Nama Ibu" value={data.nama_ibu} />
          <ReviewRow label="Pekerjaan Ibu" value={data.pekerjaan_ibu} />
          <ReviewRow label="No. HP Ibu" value={data.no_hp_ibu} />
        </div>
      </div>

      {/* Pernyataan Persetujuan */}
      <label className="flex gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={setuju}
          onChange={(e) => setSetuju(e.target.checked)}
          className="mt-0.5 accent-[var(--color-emerald-deep)] w-4 h-4 shrink-0"
        />
        <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-walnut)" }}>
          Saya menyatakan bahwa data yang saya isi adalah <strong>benar dan valid</strong>,
          serta bersedia mengikuti seluruh proses seleksi dan peraturan Pondok Pesantren
          Tahfidzul Qur'an Anas Bin Malik.
        </p>
      </label>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 font-sans text-sm font-medium tracking-wider transition-colors hover:bg-[var(--color-sand)] disabled:opacity-50"
          style={{ border: "1px solid var(--color-sand)", color: "var(--color-walnut)" }}
        >
          <span>←</span> Kembali
        </button>
        <button
          type="submit"
          disabled={loading || !data.gelombang || !setuju}
          className="inline-flex items-center gap-2 px-8 py-3 font-sans text-sm font-medium tracking-wider transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "var(--color-gold-antique)", color: "var(--color-emerald-darker)" }}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Mengirim...
            </>
          ) : (
            <>Kirim Pendaftaran</>
          )}
        </button>
      </div>
    </form>
  )
}
