import { HeroSection } from "@/components/sections/HeroSection"
import { StatsBar } from "@/components/sections/StatsBar"
import { AboutSection } from "@/components/sections/AboutSection"
import { ProgramsSection } from "@/components/sections/ProgramsSection"
import { GalleryPreview } from "@/components/sections/GalleryPreview"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { LatestArticles } from "@/components/sections/LatestArticles"
import { FinalCTA } from "@/components/sections/FinalCTA"
import {
  getSiteSettings,
  getProgramList,
  getTestimoniList,
  getGaleriAlbums,
  getLatestArtikel,
} from "@/lib/content"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [settings, programs, testimoni, albums, articles] = await Promise.all([
    getSiteSettings(),
    getProgramList(),
    getTestimoniList(),
    getGaleriAlbums(),
    getLatestArtikel(3),
  ])

  const galleryImages = albums.flatMap((a) => a.images.map((img) => ({ url: img.url, label: img.caption ?? a.title })))

  return (
    <>
      <HeroSection settings={settings} />
      <StatsBar settings={settings} />
      <AboutSection settings={settings} />
      <ProgramsSection programs={programs.length > 0 ? programs : undefined} />
      <GalleryPreview images={galleryImages.length > 0 ? galleryImages.slice(0, 6) : undefined} />
      <TestimonialsSection testimoni={testimoni.length > 0 ? testimoni : undefined} />
      <LatestArticles articles={articles.length > 0 ? articles : undefined} />
      <FinalCTA settings={settings} />
    </>
  )
}
