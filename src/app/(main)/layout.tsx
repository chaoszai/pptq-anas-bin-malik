import { TopUtilityBar } from "@/components/layout/TopUtilityBar"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { sanityClient } from "@/lib/sanity/client"
import { siteSettingsQuery } from "@/lib/sanity/queries"
import type { SiteSettings } from "@/types/siteSettings"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings: SiteSettings = await sanityClient
    .fetch(siteSettingsQuery)
    .catch(() => ({}))

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <TopUtilityBar settings={settings} />
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <WhatsAppFloat settings={settings} />
      </div>
    </SmoothScroll>
  )
}
