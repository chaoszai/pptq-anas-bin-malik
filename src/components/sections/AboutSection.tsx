import Link from "next/link"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { ArabesquePattern } from "@/components/ornaments/ArabesquePattern"
import { CornerOrnament } from "@/components/ornaments/CornerOrnament"
import { FadeIn } from "@/components/motion/FadeIn"
import { PONDOK_INFO, BISMILLAH, SITE_NAME } from "@/lib/constants"
import type { SiteSettings } from "@/types/siteSettings"

const HIGHLIGHTS = [
  {
    arabic: "رِسَالَتُنَا",
    label: "Misi",
    text: "Melahirkan penghafal Al-Qur'an yang berakhlak, berilmu, dan siap berkontribusi untuk umat.",
  },
  {
    arabic: "رُؤْيَتُنَا",
    label: "Visi",
    text: "Menjadi lembaga tahfidz terdepan yang mengintegrasikan hafalan, ilmu, dan akhlak secara holistik.",
  },
  {
    arabic: "قِيَمُنَا",
    label: "Nilai",
    text: "Ikhlas, Disiplin, Ukhuwah, Tawadhu, dan Istiqomah dalam setiap aspek kehidupan santri.",
  },
]

export function AboutSection({ settings }: { settings?: SiteSettings }) {
  const tahunBerdiri = settings?.tahunBerdiri ?? PONDOK_INFO.tahunBerdiri
  const tahunBerkiprah = new Date().getFullYear() - parseInt(tahunBerdiri)
  const siteName = settings?.siteName ?? SITE_NAME
  const aboutText =
    settings?.aboutText ??
    `${siteName} berdiri sejak ${tahunBerdiri} dengan tekad melahirkan generasi hafidz yang tidak hanya kuat hafalannya, tetapi juga kokoh ilmu agama dan mulia akhlaknya. Bimbingan langsung dengan sanad bersambung kepada Rasulullah ﷺ menjadi keunggulan metode talaqqi kami.`
  const aboutImage = settings?.aboutImage
  return (
    <section className="py-24 px-6 overflow-hidden" style={{ background: "var(--color-cream)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p
            className="font-sans text-xs tracking-[0.22em] uppercase mb-4"
            style={{ color: "var(--color-gold-muted)" }}
          >
            Mengenal Kami
          </p>
          <GeometricDivider label="Tentang Pondok" className="max-w-sm mx-auto mb-6" />
          <p
            className="font-arabic text-3xl md:text-4xl"
            dir="rtl"
            style={{ color: "var(--color-emerald-deep)" }}
          >
            مَعْهَدُنَا
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: image placeholder */}
          <FadeIn x={-30}>
            <div className="relative">
              {/* Main image (atau placeholder) */}
              <div
                data-cms-field="aboutImage"
                className="relative w-full aspect-[4/5] max-w-md mx-auto overflow-hidden"
                style={{
                  background: "var(--color-ivory)",
                  backgroundImage: aboutImage ? `url(${aboutImage})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <CornerOrnament color="var(--color-gold-antique)" size={20} />
                {!aboutImage && (
                  <>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <ArabesquePattern size={200} opacity={0.12} />
                      <p
                        className="font-arabic text-3xl absolute"
                        dir="rtl"
                        style={{ color: "var(--color-emerald-deep)", opacity: 0.3 }}
                      >
                        {BISMILLAH}
                      </p>
                    </div>
                    <p
                      className="absolute bottom-4 left-0 right-0 text-center font-sans text-xs tracking-widest uppercase"
                      style={{ color: "var(--color-sand)" }}
                    >
                      Foto Pondok
                    </p>
                  </>
                )}
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-6 -right-6 md:-right-10 flex flex-col items-center justify-center w-28 h-28 rounded-full shadow-lg"
                style={{ background: "var(--color-emerald-deep)" }}
              >
                <span
                  className="font-display font-semibold text-3xl leading-none"
                  style={{ color: "var(--color-gold-antique)" }}
                >
                  {tahunBerkiprah}+
                </span>
                <span
                  className="font-sans text-[10px] tracking-wider text-center leading-tight mt-1 px-2"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Tahun Berkiprah
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Right: text content */}
          <FadeIn x={30} delay={0.15}>
            <div className="space-y-6">
              <div>
                <h2
                  className="font-display italic font-semibold leading-tight mb-4"
                  style={{ color: "var(--color-ink)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  Tempat Santri Tumbuh Bersama Al-Qur&apos;an
                </h2>
                <p
                  data-cms-field="aboutText"
                  className="font-sans text-base leading-relaxed"
                  style={{ color: "var(--color-walnut)" }}
                >
                  {aboutText}
                </p>
              </div>

              {/* Highlight points */}
              <div className="space-y-5 pt-4">
                {HIGHLIGHTS.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="shrink-0 w-12 h-12 flex items-center justify-center rounded-sm"
                      style={{ background: "var(--color-ivory)" }}
                    >
                      <span
                        className="font-arabic text-lg"
                        dir="rtl"
                        style={{ color: "var(--color-emerald-deep)" }}
                      >
                        {item.arabic}
                      </span>
                    </div>
                    <div>
                      <p
                        className="font-sans font-semibold text-sm tracking-wider uppercase mb-1"
                        style={{ color: "var(--color-emerald-deep)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="font-sans text-sm leading-relaxed"
                        style={{ color: "var(--color-walnut)" }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/profil"
                className="inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wider mt-6 group"
                style={{ color: "var(--color-emerald-deep)" }}
              >
                Selengkapnya tentang kami
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
