import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { PageHero } from "@/components/ui/PageHero"
import { FadeIn } from "@/components/motion/FadeIn"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { sanityClient } from "@/lib/sanity/client"
import { artikelBySlugQuery } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"

export const revalidate = 60

interface ArtikelDetail {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  body?: unknown[]
  thumbnail?: { asset: { _ref: string } }
  publishedAt?: string
  kategori?: { title: string }
  seo?: { title?: string; description?: string }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const artikel: ArtikelDetail = await sanityClient.fetch(artikelBySlugQuery, { slug })
    return { title: artikel?.seo?.title ?? artikel?.title ?? "Artikel — PPTQ Anas Bin Malik" }
  } catch {
    return { title: "Artikel — PPTQ Anas Bin Malik" }
  }
}

export default async function ArtikelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let artikel: ArtikelDetail | null = null

  try {
    artikel = await sanityClient.fetch(artikelBySlugQuery, { slug })
  } catch {
    // Sanity not configured yet
  }

  if (!artikel) {
    return (
      <>
        <PageHero arabicTitle="الْمَقَالَة" title="Artikel" breadcrumbs={[{ label: "Beranda" }, { label: "Artikel", href: "/artikel" }, { label: "Detail" }]} />
        <div className="py-24 px-6 text-center" style={{ background: "var(--color-cream)" }}>
          <p className="font-sans text-sm mb-4" style={{ color: "var(--color-walnut)" }}>
            Artikel belum tersedia atau Sanity belum terhubung.
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
            {/* Meta */}
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

            {/* Cover */}
            {artikel.thumbnail && (
              <div className="w-full aspect-video overflow-hidden mb-10">
                <Image
                  src={urlFor(artikel.thumbnail).width(900).height(506).url()}
                  alt={artikel.title}
                  width={900}
                  height={506}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Body */}
            {artikel.body ? (
              <div
                className="font-sans text-base leading-relaxed space-y-5"
                style={{ color: "var(--color-walnut)" }}
              >
                <PortableText value={artikel.body as Parameters<typeof PortableText>[0]["value"]} />
              </div>
            ) : (
              artikel.excerpt && (
                <p className="font-sans text-base leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                  {artikel.excerpt}
                </p>
              )
            )}

            {/* Back */}
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
