import Link from "next/link"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { FadeIn } from "@/components/motion/FadeIn"

const PLACEHOLDER_ARTICLES = [
  {
    category: "Tahfidz",
    date: "12 Mei 2026",
    title: "Keutamaan Menghafal Al-Qur'an dan Keutamaan Ahlinya",
    excerpt:
      "Rasulullah ﷺ bersabda bahwa sebaik-baik manusia adalah yang mempelajari Al-Qur'an dan mengajarkannya. Para ulama menjelaskan...",
    slug: "keutamaan-menghafal-quran",
  },
  {
    category: "Metode",
    date: "5 Mei 2026",
    title: "Mengenal Metode Talaqqi: Cara Nabi Mengajarkan Al-Qur'an",
    excerpt:
      "Talaqqi berarti penyampaian langsung dari mulut guru ke telinga murid. Metode ini telah dipakai sejak masa Rasulullah ﷺ hingga...",
    slug: "mengenal-metode-talaqqi",
  },
  {
    category: "PSB",
    date: "1 Mei 2026",
    title: "Panduan Pendaftaran Santri Baru Tahun Ajaran 2026/2027",
    excerpt:
      "Penerimaan Santri Baru (PSB) PPTQ Anas Bin Malik kini telah dibuka. Berikut adalah panduan lengkap prosedur pendaftaran...",
    slug: "panduan-psb-2026",
  },
]

export function LatestArticles() {
  return (
    <section className="py-24 px-6" style={{ background: "var(--color-ivory)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <FadeIn>
            <p
              className="font-sans text-xs tracking-[0.22em] uppercase mb-4"
              style={{ color: "var(--color-gold-muted)" }}
            >
              Wawasan & Informasi
            </p>
            <GeometricDivider label="Artikel Terbaru" className="max-w-xs mb-6" />
            <p
              className="font-arabic text-3xl"
              dir="rtl"
              style={{ color: "var(--color-emerald-deep)" }}
            >
              الْمَقَالَاتُ
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/artikel"
              className="inline-flex items-center gap-2 font-sans text-sm tracking-wider group shrink-0"
              style={{ color: "var(--color-emerald-deep)" }}
            >
              Semua Artikel
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </FadeIn>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLACEHOLDER_ARTICLES.map((article, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Link
                href={`/artikel/${article.slug}`}
                className="group block"
              >
                {/* Image placeholder */}
                <div
                  className="w-full aspect-video mb-5 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-90"
                  style={{
                    background: "var(--color-cream)",
                    border: "0.5px solid var(--color-sand)",
                  }}
                >
                  <span
                    className="font-sans text-xs tracking-widest"
                    style={{ color: "var(--color-sand)" }}
                  >
                    Foto Artikel
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-sans text-[10px] tracking-widest uppercase px-2 py-1"
                    style={{
                      background: "var(--color-emerald-50)",
                      color: "var(--color-emerald-deep)",
                    }}
                  >
                    {article.category}
                  </span>
                  <span
                    className="font-sans text-xs"
                    style={{ color: "var(--color-gold-muted)" }}
                  >
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display italic font-semibold text-lg leading-snug mb-3 group-hover:underline underline-offset-2 transition-all"
                  style={{ color: "var(--color-ink)" }}
                >
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p
                  className="font-sans text-sm leading-relaxed line-clamp-3"
                  style={{ color: "var(--color-walnut)" }}
                >
                  {article.excerpt}
                </p>

                {/* Read more */}
                <p
                  className="font-sans text-xs tracking-wider mt-4 transition-all duration-300 group-hover:translate-x-1 inline-flex"
                  style={{ color: "var(--color-emerald-deep)" }}
                >
                  Baca selengkapnya →
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
