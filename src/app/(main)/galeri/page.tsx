import { PageHero } from "@/components/ui/PageHero"
import { getGaleriAlbums } from "@/lib/content"
import { GaleriGrid } from "@/components/galeri/GaleriGrid"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Galeri — PPTQ Anas Bin Malik",
}

export default async function GaleriPage() {
  const albums = await getGaleriAlbums()

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
