import Link from "next/link"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { FadeIn } from "@/components/motion/FadeIn"
import { PROGRAMS } from "@/lib/constants"
import type { Program } from "@/types/content"

export function ProgramsSection({ programs }: { programs?: Program[] }) {
  const items: Program[] = programs ?? PROGRAMS.map((p) => ({
    id: String(p.id),
    title: p.title,
    arabicTitle: p.arabicTitle,
    roman: p.roman,
    slug: p.slug,
    description: p.description,
    order: p.id,
  }))
  const slugOf = (s?: string) => s ?? ""
  return (
    <section
      className="py-24 px-6"
      style={{ background: "var(--color-ivory)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p
            className="font-sans text-xs tracking-[0.22em] uppercase mb-4"
            style={{ color: "var(--color-gold-muted)" }}
          >
            Kurikulum Unggulan
          </p>
          <GeometricDivider label="Program Kami" className="max-w-sm mx-auto mb-6" />
          <p
            className="font-arabic text-3xl md:text-4xl"
            dir="rtl"
            style={{ color: "var(--color-emerald-deep)" }}
          >
            بَرَامِجُ التَّعْلِيم
          </p>
          <p
            className="font-sans text-base mt-4 max-w-xl mx-auto"
            style={{ color: "var(--color-walnut)" }}
          >
            Lima program terintegrasi yang dirancang untuk membentuk santri yang hafidz,
            berilmu, dan berkarakter.
          </p>
        </FadeIn>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((program, i) => (
            <FadeIn key={program.id} delay={i * 0.1}>
              <Link
                href={`/kurikulum#${slugOf(program.slug)}`}
                className="group block h-full p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "var(--color-cream)",
                  border: "0.5px solid var(--color-sand)",
                }}
              >
                {/* Roman numeral */}
                <span
                  className="font-display italic text-5xl leading-none block mb-4"
                  style={{ color: "var(--color-sand)" }}
                >
                  {program.roman}
                </span>

                {/* Arabic title */}
                <p
                  className="font-arabic text-xl mb-2"
                  dir="rtl"
                  style={{ color: "var(--color-gold-antique)" }}
                >
                  {program.arabicTitle}
                </p>

                {/* Title */}
                <h3
                  className="font-display italic font-semibold text-xl mb-3"
                  style={{ color: "var(--color-ink)" }}
                >
                  {program.title}
                </h3>

                {/* Divider */}
                <div
                  className="w-8 h-px mb-4 transition-all duration-300 group-hover:w-16"
                  style={{ background: "var(--color-gold-antique)" }}
                />

                {/* Description */}
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "var(--color-walnut)" }}
                >
                  {program.description}
                </p>

                {/* Arrow */}
                <p
                  className="font-sans text-xs tracking-wider mt-6 transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: "var(--color-emerald-deep)" }}
                >
                  Pelajari →
                </p>
              </Link>
            </FadeIn>
          ))}

          {/* CTA Card */}
          <FadeIn delay={items.length * 0.1}>
            <Link
              href="/psb"
              className="group block h-full p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--color-emerald-deep)",
                border: "0.5px solid var(--color-emerald-deep)",
                minHeight: "280px",
              }}
            >
              <p
                className="font-arabic text-3xl mb-3"
                dir="rtl"
                style={{ color: "var(--color-gold-antique)" }}
              >
                التَّسْجِيل
              </p>
              <h3
                className="font-display italic font-semibold text-2xl mb-3"
                style={{ color: "var(--color-cream)" }}
              >
                Siap Bergabung?
              </h3>
              <p
                className="font-sans text-sm leading-relaxed mb-6"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Pendaftaran Santri Baru kini dibuka. Daftarkan putra-putri Anda sekarang.
              </p>
              <span
                className="inline-block px-6 py-2.5 font-sans text-sm font-medium tracking-wider transition-all duration-300 group-hover:opacity-90"
                style={{
                  background: "var(--color-gold-antique)",
                  color: "var(--color-emerald-darker)",
                }}
              >
                Daftar Sekarang
              </span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
