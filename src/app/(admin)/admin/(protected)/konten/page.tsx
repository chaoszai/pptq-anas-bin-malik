import { getSiteSettings, getTextOverrides } from "@/lib/content"
import { KontenForm } from "@/components/admin/KontenForm"

export const metadata = { title: "Konten Web | Admin PPTQ" }
export const dynamic = "force-dynamic"

export default async function KontenPage() {
  const [settings, overrides] = await Promise.all([
    getSiteSettings(),
    getTextOverrides(),
  ])
  return <KontenForm initial={settings} initialOverrides={overrides} />
}
