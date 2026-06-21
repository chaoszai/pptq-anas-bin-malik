import { TopUtilityBar } from "@/components/layout/TopUtilityBar"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { getSiteSettings } from "@/lib/content"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

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
