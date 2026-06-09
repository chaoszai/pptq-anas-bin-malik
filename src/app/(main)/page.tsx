import { HeroSection } from "@/components/sections/HeroSection"
import { StatsBar } from "@/components/sections/StatsBar"
import { AboutSection } from "@/components/sections/AboutSection"
import { ProgramsSection } from "@/components/sections/ProgramsSection"
import { GalleryPreview } from "@/components/sections/GalleryPreview"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { LatestArticles } from "@/components/sections/LatestArticles"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { sanityClient } from "@/lib/sanity/client"
import { programQuery, testimoniQuery, siteSettingsQuery } from "@/lib/sanity/queries"
import type { SiteSettings } from "@/types/siteSettings"

export default async function Home() {
  const [settings, programs, testimoni] = await Promise.all([
    sanityClient.fetch(siteSettingsQuery).catch(() => null) as Promise<SiteSettings | null>,
    sanityClient.fetch(programQuery).catch(() => []),
    sanityClient.fetch(testimoniQuery).catch(() => []),
  ])

  return (
    <>
      <HeroSection settings={settings ?? undefined} />
      <StatsBar settings={settings ?? undefined} />
      <AboutSection settings={settings ?? undefined} />
      <ProgramsSection programs={programs.length > 0 ? programs : undefined} />
      <GalleryPreview />
      <TestimonialsSection testimoni={testimoni.length > 0 ? testimoni : undefined} />
      <LatestArticles />
      <FinalCTA settings={settings ?? undefined} />
    </>
  )
}
