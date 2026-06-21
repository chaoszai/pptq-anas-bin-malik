import Link from "next/link"
import { ArabesquePattern } from "@/components/ornaments/ArabesquePattern"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { FadeIn } from "@/components/motion/FadeIn"

const ASPECTS = ["aspect-square", "aspect-[4/3]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[3/4]"]

const PLACEHOLDER = [
  { label: "Kegiatan Tahfidz" },
  { label: "Fasilitas Asrama" },
  { label: "Wisuda Huffazh" },
  { label: "Kegiatan Harian" },
  { label: "Masjid & Mushola" },
  { label: "Kegiatan Olahraga" },
]

export function GalleryPreview({ images }: { images?: { url: string; label: string }[] }) {
  const source: { label: string; url?: string }[] = images ?? PLACEHOLDER
  const GALLERY_ITEMS = source.map((it, i) => ({
    label: it.label,
    url: it.url,
    aspect: ASPECTS[i % ASPECTS.length],
  }))
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "var(--color-emerald-deep)" }}
    >
      {/* Background arabesque */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <ArabesquePattern size={700} color="var(--color-cream)" opacity={1} rotate />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <FadeIn className="text-center mb-14">
          <p
            className="font-sans text-xs tracking-[0.22em] uppercase mb-4"
            style={{ color: "var(--color-gold-muted)" }}
          >
            Kehidupan Pondok
          </p>
          <GeometricDivider
            label="Galeri"
            className="max-w-sm mx-auto mb-6"
            color="rgba(201,169,97,0.4)"
          />
          <p
            className="font-arabic text-3xl md:text-4xl"
            dir="rtl"
            style={{ color: "var(--color-gold-antique)" }}
          >
            مَعْرَضُ الصُّوَر
          </p>
        </FadeIn>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className={`relative ${item.aspect} overflow-hidden group cursor-pointer`}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "0.5px solid rgba(201,169,97,0.2)",
                }}
              >
                {/* Image */}
                {item.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
                )}

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(27,40,128,0.7)" }}
                >
                  <p
                    className="font-display italic text-sm"
                    style={{ color: "var(--color-gold-antique)" }}
                  >
                    {item.label}
                  </p>
                </div>

                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 opacity-20">
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ borderColor: "var(--color-gold-antique)" }}
                    />
                    <p
                      className="font-sans text-[10px] tracking-widest"
                      style={{ color: "var(--color-cream)" }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn className="text-center mt-12">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-3 font-sans text-sm tracking-wider transition-all duration-300 hover:opacity-80"
            style={{ color: "var(--color-gold-antique)" }}
          >
            <div className="w-12 h-px" style={{ background: "var(--color-gold-antique)" }} />
            Lihat Semua Galeri
            <div className="w-12 h-px" style={{ background: "var(--color-gold-antique)" }} />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
