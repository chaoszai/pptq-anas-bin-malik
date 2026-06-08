"use client"

import { useState } from "react"
import type { PsbFormData } from "@/types/santri"
import { submitPendaftaran } from "@/app/actions/psb"
import { StepDataSantri } from "./StepDataSantri"
import { StepDataOrtu } from "./StepDataOrtu"
import { StepKonfirmasi } from "./StepKonfirmasi"
import { StepSukses } from "./StepSukses"

type Step = 1 | 2 | 3

const STEPS = [
  { num: 1, label: "Data Santri" },
  { num: 2, label: "Data Orang Tua" },
  { num: 3, label: "Konfirmasi" },
]

export function PSBForm() {
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState<Partial<PsbFormData>>({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ noPendaftaran: string; namaLengkap: string } | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit() {
    setLoading(true)
    setErrorMsg(null)

    const res = await submitPendaftaran(formData as PsbFormData)

    setLoading(false)
    if (res.success && res.noPendaftaran) {
      setResult({ noPendaftaran: res.noPendaftaran, namaLengkap: formData.nama_lengkap ?? "" })
    } else {
      setErrorMsg(res.error ?? "Terjadi kesalahan.")
    }
  }

  if (result) {
    return <StepSukses noPendaftaran={result.noPendaftaran} namaLengkap={result.namaLengkap} />
  }

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {STEPS.map((s, i) => {
          const isActive = step === s.num
          const isDone = step > s.num
          return (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-8 h-8 flex items-center justify-center text-xs font-sans font-semibold transition-colors"
                  style={{
                    background: isDone
                      ? "var(--color-emerald-mid)"
                      : isActive
                      ? "var(--color-emerald-deep)"
                      : "var(--color-ivory)",
                    border: `1px solid ${
                      isDone || isActive ? "transparent" : "var(--color-sand)"
                    }`,
                    color: isDone || isActive ? "var(--color-cream)" : "var(--color-walnut)",
                  }}
                >
                  {isDone ? "✓" : s.num}
                </div>
                <span
                  className="font-sans text-[10px] tracking-wide hidden sm:block"
                  style={{ color: isActive ? "var(--color-emerald-deep)" : "var(--color-gold-muted)" }}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="w-16 h-px mx-2 mb-5"
                  style={{ background: step > s.num ? "var(--color-emerald-mid)" : "var(--color-sand)" }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div
          className="mb-6 px-4 py-3 font-sans text-sm"
          style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}
        >
          {errorMsg}
        </div>
      )}

      {/* Steps */}
      {step === 1 && (
        <StepDataSantri
          data={formData}
          onChange={setFormData}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepDataOrtu
          data={formData}
          onChange={setFormData}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepKonfirmasi
          data={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onBack={() => setStep(2)}
          loading={loading}
        />
      )}
    </div>
  )
}
