"use client"

import Link from "next/link"
import { CONTACT } from "@/lib/constants"

interface Props {
  noPendaftaran: string
  namaLengkap: string
}

export function StepSukses({ noPendaftaran, namaLengkap }: Props) {
  return (
    <div className="text-center py-8 space-y-8">
      {/* Icon sukses */}
      <div className="flex justify-center">
        <div
          className="w-20 h-20 flex items-center justify-center"
          style={{
            background: "var(--color-emerald-deep)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-antique)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <div>
        <p className="font-arabic text-2xl mb-3" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
          بَارَكَ اللهُ فِيكُم
        </p>
        <h2 className="font-display italic font-semibold text-2xl mb-2" style={{ color: "var(--color-ink)" }}>
          Pendaftaran Berhasil Dikirim!
        </h2>
        <p className="font-sans text-sm" style={{ color: "var(--color-walnut)" }}>
          Assalamu'alaikum, <strong>{namaLengkap}</strong>
        </p>
      </div>

      {/* Nomor Pendaftaran */}
      <div
        className="inline-block px-8 py-5 mx-auto"
        style={{ background: "var(--color-ivory)", border: "1px solid var(--color-sand)" }}
      >
        <p className="font-sans text-xs tracking-widest uppercase mb-2" style={{ color: "var(--color-gold-muted)" }}>
          Nomor Pendaftaran Anda
        </p>
        <p className="font-display italic font-bold text-2xl tracking-wider" style={{ color: "var(--color-emerald-deep)" }}>
          {noPendaftaran}
        </p>
        <p className="font-sans text-xs mt-2" style={{ color: "var(--color-walnut)" }}>
          Simpan nomor ini untuk melacak status pendaftaran
        </p>
      </div>

      {/* Info next steps */}
      <div
        className="p-6 text-left space-y-3"
        style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
      >
        <p className="font-sans text-xs font-semibold tracking-wider uppercase" style={{ color: "var(--color-emerald-mid)" }}>
          Langkah Selanjutnya
        </p>
        {[
          "Panitia PSB akan memverifikasi data Anda dalam 3 hari kerja.",
          "Hasil verifikasi akan dikirim via WhatsApp ke nomor orang tua yang terdaftar.",
          "Calon santri yang lolos verifikasi akan dijadwalkan untuk tes seleksi.",
          "Pantau terus informasi resmi di website dan media sosial pondok.",
        ].map((item, i) => (
          <div key={i} className="flex gap-3">
            <span
              className="font-display italic text-lg leading-none w-5 shrink-0"
              style={{ color: "var(--color-sand)" }}
            >
              {i + 1}.
            </span>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-walnut)" }}>
              {item}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-7 py-3 font-sans text-sm font-medium tracking-wider transition-opacity hover:opacity-90"
          style={{ background: "var(--color-emerald-deep)", color: "var(--color-cream)" }}
        >
          Hubungi via WhatsApp
        </a>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-7 py-3 font-sans text-sm font-medium tracking-wider transition-colors hover:bg-[var(--color-sand)]"
          style={{ border: "1px solid var(--color-sand)", color: "var(--color-walnut)" }}
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
