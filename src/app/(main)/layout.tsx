import { TopUtilityBar } from "@/components/layout/TopUtilityBar"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { CmsEditBridge } from "@/components/cms/CmsEditBridge"
import { TextOverridesApplier } from "@/components/cms/TextOverridesApplier"
import { getSiteSettings, getTextOverrides } from "@/lib/content"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [settings, textOverrides] = await Promise.all([
    getSiteSettings(),
    getTextOverrides(),
  ])

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <TopUtilityBar settings={settings} />
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <WhatsAppFloat settings={settings} />
      </div>
      <TextOverridesApplier overrides={textOverrides} />
      <CmsEditBridge />
    </SmoothScroll>
  )
}
