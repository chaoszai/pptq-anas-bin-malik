import { HeroSection } from "@/components/sections/HeroSection"
import { StatsBar } from "@/components/sections/StatsBar"
import { AboutSection } from "@/components/sections/AboutSection"
import { ProgramsSection } from "@/components/sections/ProgramsSection"
import { GalleryPreview } from "@/components/sections/GalleryPreview"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { LatestArticles } from "@/components/sections/LatestArticles"
import { FinalCTA } from "@/components/sections/FinalCTA"

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ProgramsSection />
      <GalleryPreview />
      <TestimonialsSection />
      <LatestArticles />
      <FinalCTA />
    </>
  )
}
