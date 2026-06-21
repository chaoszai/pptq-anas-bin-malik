import Link from "next/link"
import { PageHero } from "@/components/ui/PageHero"
import { FadeIn } from "@/components/motion/FadeIn"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { getArtikelBySlug } from "@/lib/content"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artikel = await getArtikelBySlug(slug)
  return { title: artikel?.seo?.title ?? artikel?.title ?? "Artikel — PPTQ Anas Bin Malik" }
}

export default async function ArtikelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artikel = await getArtikelBySlug(slug)

  if (!artikel) {
    return (
      <>
        <PageHero arabicTitle="الْمَقَالَة" title="Artikel" breadcrumbs={[{ label: "Beranda" }, { label: "Artikel", href: "/artikel" }, { label: "Detail" }]} />
        <div className="py-24 px-6 text-center" style={{ background: "var(--color-cream)" }}>
          <p className="font-sans text-sm mb-4" style={{ color: "var(--color-walnut)" }}>
            Artikel tidak ditemukan.
          </p>
          <Link href="/artikel" className="font-sans text-sm underline" style={{ color: "var(--color-emerald-deep)" }}>
            ← Kembali ke Artikel
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHero
        arabicTitle="الْمَقَالَة"
        title={artikel.title}
        subtitle={artikel.publishedAt
          ? `${new Date(artikel.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`
          : undefined}
        breadcrumbs={[{ label: "Beranda" }, { label: "Artikel", href: "/artikel" }, { label: artikel.title }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              {artikel.kategori && (
                <span
                  className="font-sans text-[10px] tracking-widest uppercase px-3 py-1"
                  style={{ background: "var(--color-emerald-50)", color: "var(--color-emerald-deep)" }}
                >
                  {artikel.kategori.title}
                </span>
              )}
              {artikel.publishedAt && (
                <span className="font-sans text-xs" style={{ color: "var(--color-gold-muted)" }}>
                  {new Date(artikel.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              )}
            </div>

            {artikel.thumbnailUrl && (
              <div className="w-full aspect-video overflow-hidden mb-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={artikel.thumbnailUrl} alt={artikel.title} className="w-full h-full object-cover" />
              </div>
            )}

            {artikel.bodyHtml ? (
              <div
                className="prose prose-emerald max-w-none font-sans text-base leading-relaxed"
                style={{ color: "var(--color-walnut)" }}
                dangerouslySetInnerHTML={{ __html: artikel.bodyHtml }}
              />
            ) : (
              artikel.excerpt && (
                <p className="font-sans text-base leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                  {artikel.excerpt}
                </p>
              )
            )}

            <div className="mt-12 pt-8" style={{ borderTop: "0.5px solid var(--color-sand)" }}>
              <GeometricDivider className="mb-8" />
              <Link
                href="/artikel"
                className="inline-flex items-center gap-2 font-sans text-sm group"
                style={{ color: "var(--color-emerald-deep)" }}
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                Kembali ke Artikel
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
