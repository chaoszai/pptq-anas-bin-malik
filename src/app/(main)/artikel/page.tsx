import Link from "next/link"
import { PageHero } from "@/components/ui/PageHero"
import { FadeIn } from "@/components/motion/FadeIn"
import { getArtikelList } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Artikel — PPTQ Anas Bin Malik",
}

export default async function ArtikelPage() {
  const articles = await getArtikelList()
  const isEmpty = articles.length === 0
  const kategoriSet = ["Semua", ...Array.from(new Set(articles.map((a) => a.kategori?.title).filter(Boolean) as string[]))]

  return (
    <>
      <PageHero
        arabicTitle="الْمَقَالَاتُ وَالأَخْبَار"
        title="Artikel & Informasi"
        subtitle="Wawasan Islam, kabar pondok, dan informasi penting seputar PPTQ Anas Bin Malik."
        breadcrumbs={[{ label: "Beranda" }, { label: "Artikel" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-5xl mx-auto">

          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-10">
              {kategoriSet.map((kat, i) => (
                <span
                  key={kat}
                  className="px-4 py-2 font-sans text-xs tracking-wider"
                  style={{
                    background: i === 0 ? "var(--color-emerald-deep)" : "var(--color-ivory)",
                    color: i === 0 ? "var(--color-cream)" : "var(--color-walnut)",
                    border: `0.5px solid ${i === 0 ? "var(--color-emerald-deep)" : "var(--color-sand)"}`,
                  }}
                >
                  {kat}
                </span>
              ))}
            </div>
          </FadeIn>

          {isEmpty ? (
            <FadeIn>
              <div
                className="py-24 flex flex-col items-center gap-4"
                style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
              >
                <p className="font-arabic text-3xl" dir="rtl" style={{ color: "var(--color-emerald-deep)", opacity: 0.3 }}>
                  لَا مَقَالَات
                </p>
                <p className="font-sans text-sm" style={{ color: "var(--color-walnut)" }}>
                  Belum ada artikel.
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="space-y-6">
              {articles.map((article, i) => (
                <FadeIn key={article.id} delay={i * 0.07}>
                  <Link
                    href={`/artikel/${article.slug}`}
                    className="group flex flex-col sm:flex-row gap-5 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                  >
                    <div className="shrink-0 w-full sm:w-40 aspect-video sm:aspect-auto sm:h-28 overflow-hidden"
                      style={{ background: "var(--color-cream)", border: "0.5px solid var(--color-sand)" }}
                    >
                      {article.thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={article.thumbnailUrl} alt={article.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="font-sans text-[10px]" style={{ color: "var(--color-sand)" }}>Foto</p>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {article.kategori && (
                          <span
                            className="font-sans text-[10px] tracking-widest uppercase px-2 py-0.5"
                            style={{ background: "var(--color-emerald-50)", color: "var(--color-emerald-deep)" }}
                          >
                            {article.kategori.title}
                          </span>
                        )}
                        {article.publishedAt && (
                          <span className="font-sans text-xs" style={{ color: "var(--color-gold-muted)" }}>
                            {new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        )}
                      </div>
                      <h2
                        className="font-display italic font-semibold text-lg leading-snug mb-2 group-hover:underline underline-offset-2"
                        style={{ color: "var(--color-ink)" }}
                      >
                        {article.title}
                      </h2>
                      <p className="font-sans text-sm leading-relaxed line-clamp-2" style={{ color: "var(--color-walnut)" }}>
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
