import Link from "next/link"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { FadeIn } from "@/components/motion/FadeIn"
import { PSB_WAVES, CONTACT, BISMILLAH } from "@/lib/constants"

export function FinalCTA() {
  const activeWave = PSB_WAVES[1]

  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "var(--color-emerald-darker)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.4), transparent)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Bismillah */}
        <FadeIn>
          <p
            className="font-arabic text-2xl md:text-3xl mb-8"
            dir="rtl"
            style={{ color: "var(--color-gold-antique)" }}
          >
            {BISMILLAH}
          </p>
        </FadeIn>

        {/* Badge: gelombang aktif */}
        <FadeIn delay={0.1}>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 font-sans text-xs tracking-widest"
            style={{
              border: "0.5px solid rgba(201,169,97,0.35)",
              color: "var(--color-gold-antique)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            PSB {activeWave.label} — {activeWave.period}
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.2}>
          <h2
            className="font-display italic font-semibold leading-tight mb-6"
            style={{ color: "var(--color-cream)", fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Titipkan Putra-Putri Anda<br />
            Bersama Al-Qur&apos;an
          </h2>
        </FadeIn>

        {/* Subtext */}
        <FadeIn delay={0.3}>
          <p
            className="font-sans text-base leading-relaxed mb-10 max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Bersama PPTQ Anas Bin Malik, investasikan masa depan akhirat mereka dengan hafalan
            Al-Qur'an, ilmu agama, dan akhlak mulia yang akan menjadi bekal seumur hidup.
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/psb"
              className="inline-flex items-center justify-center px-10 py-4 font-sans text-sm font-medium tracking-wider transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "var(--color-gold-antique)",
                color: "var(--color-emerald-darker)",
              }}
            >
              Daftar PSB Online
            </Link>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 font-sans text-sm font-medium tracking-wider transition-all duration-300 hover:bg-white/10"
              style={{
                border: "1px solid rgba(255,255,255,0.25)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hubungi via WhatsApp
            </a>
          </div>
        </FadeIn>

        {/* Gelombang info */}
        <FadeIn delay={0.5}>
          <GeometricDivider color="rgba(201,169,97,0.2)" className="mb-8" />
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {PSB_WAVES.map((wave) => (
              <div key={wave.id} className="text-center">
                <p
                  className="font-sans font-semibold text-sm tracking-wider"
                  style={{
                    color: wave.id === activeWave.id ? "var(--color-gold-antique)" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {wave.label}
                </p>
                <p
                  className="font-sans text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {wave.period}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
