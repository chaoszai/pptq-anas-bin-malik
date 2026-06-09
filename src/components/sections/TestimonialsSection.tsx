import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { FadeIn } from "@/components/motion/FadeIn"

const TESTIMONIALS = [
  {
    arabic: "اللَّهُ يَحْفَظُهُ",
    quote:
      "Alhamdulillah, putra kami yang tadinya belum bisa membaca Al-Qur'an dengan baik, setelah satu tahun di sini sudah hafal 5 juz. Metode talaqqi-nya sangat efektif dan para ustadz sangat perhatian.",
    name: "Bapak Ahmad Ridwan",
    from: "Wali Santri, Sukoharjo",
    stars: 5,
  },
  {
    arabic: "بَارَكَ اللَّهُ فِيكُم",
    quote:
      "Kami merasa tenang menitipkan anak di sini. Lingkungannya kondusif, jauh dari pengaruh negatif. Anak kami makin mandiri, disiplin, dan akhlaknya sungguh terjaga.",
    name: "Ibu Siti Rahayu",
    from: "Wali Santri, Yogyakarta",
    stars: 5,
  },
  {
    arabic: "جَزَاكُمُ اللَّهُ خَيْرًا",
    quote:
      "Program tarbiyah syakhsiyah di sini luar biasa. Bukan hanya hafalan, tapi karakter anak juga dibentuk. Putra kami jadi lebih bertanggung jawab dan punya jiwa kepemimpinan.",
    name: "Bapak Haryono",
    from: "Wali Santri, Klaten",
    stars: 5,
  },
]

interface SanityTestimoni { _id: string; name: string; role?: string; quote: string; rating?: number }

export function TestimonialsSection({ testimoni }: { testimoni?: SanityTestimoni[] }) {
  const items = testimoni?.map((t) => ({
    arabic: "جَزَاكُمُ اللَّهُ خَيْرًا",
    quote: t.quote,
    name: t.name,
    from: t.role ?? "",
    stars: t.rating ?? 5,
    _id: t._id,
  })) ?? TESTIMONIALS
  return (
    <section className="py-24 px-6" style={{ background: "var(--color-cream)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <p
            className="font-sans text-xs tracking-[0.22em] uppercase mb-4"
            style={{ color: "var(--color-gold-muted)" }}
          >
            Kepercayaan Orang Tua
          </p>
          <GeometricDivider label="Testimoni" className="max-w-sm mx-auto mb-6" />
          <p
            className="font-arabic text-3xl md:text-4xl"
            dir="rtl"
            style={{ color: "var(--color-emerald-deep)" }}
          >
            شَهَادَاتُ الْأَوْلِيَاء
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <FadeIn key={String("_id" in item ? (item as { _id: string })._id : i)} delay={i * 0.12}>
              <div
                className="relative p-8 h-full flex flex-col"
                style={{
                  background: "var(--color-ivory)",
                  border: "0.5px solid var(--color-sand)",
                }}
              >
                {/* Arabic quote (top-right decorative) */}
                <p
                  className="font-arabic text-sm text-right mb-5"
                  dir="rtl"
                  style={{ color: "var(--color-gold-antique)" }}
                >
                  {item.arabic}
                </p>

                {/* Big open quote */}
                <span
                  className="font-display text-7xl leading-none absolute top-4 left-6"
                  style={{ color: "var(--color-sand)" }}
                >
                  &ldquo;
                </span>

                {/* Quote text */}
                <p
                  className="font-sans text-sm leading-relaxed flex-1 mb-6 relative z-10"
                  style={{ color: "var(--color-walnut)" }}
                >
                  {item.quote}
                </p>

                {/* Divider */}
                <div className="w-8 h-px mb-4" style={{ background: "var(--color-gold-antique)" }} />

                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: item.stars }).map((_, si) => (
                    <span key={si} style={{ color: "var(--color-gold-antique)" }}>★</span>
                  ))}
                </div>

                {/* Name */}
                <p
                  className="font-sans font-semibold text-sm"
                  style={{ color: "var(--color-ink)" }}
                >
                  {item.name}
                </p>
                <p
                  className="font-sans text-xs mt-0.5"
                  style={{ color: "var(--color-gold-muted)" }}
                >
                  {item.from}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
