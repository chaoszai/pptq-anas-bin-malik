import { TopUtilityBar } from "@/components/layout/TopUtilityBar"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { SmoothScroll } from "@/components/layout/SmoothScroll"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <TopUtilityBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </SmoothScroll>
  )
}
