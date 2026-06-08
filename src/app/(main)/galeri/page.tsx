import { PageHero } from "@/components/ui/PageHero"
import { sanityClient } from "@/lib/sanity/client"
import { galeriQuery } from "@/lib/sanity/queries"
import { GaleriGrid } from "@/components/galeri/GaleriGrid"

export const revalidate = 60

export const metadata = {
  title: "Galeri — PPTQ Anas Bin Malik",
}

async function getAlbums() {
  try {
    return await sanityClient.fetch(galeriQuery)
  } catch {
    return []
  }
}

export default async function GaleriPage() {
  const albums = await getAlbums()

  return (
    <>
      <PageHero
        arabicTitle="مَعْرَضُ الصُّوَر"
        title="Galeri"
        subtitle="Sekilas kehidupan santri dan kegiatan di PPTQ Anas Bin Malik."
        breadcrumbs={[{ label: "Beranda" }, { label: "Galeri" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto">
          <GaleriGrid albums={albums} />
        </div>
      </div>
    </>
  )
}
