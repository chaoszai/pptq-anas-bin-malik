import { getPageContent } from "@/lib/content"
import { HalamanForm, type HalamanDef } from "@/components/admin/HalamanForm"

export const metadata = { title: "Halaman Statis | Admin PPTQ" }
export const dynamic = "force-dynamic"

export const STATIC_PAGES: HalamanDef[] = [
  { key: "profil", label: "Profil / Tentang" },
  { key: "sejarah", label: "Sejarah" },
  { key: "visi_misi", label: "Visi & Misi" },
  { key: "kurikulum", label: "Kurikulum" },
]

export default async function HalamanPage() {
  const entries = await Promise.all(
    STATIC_PAGES.map(async (p) => {
      const data = await getPageContent<{ html?: string }>(p.key)
      return [p.key, data?.html ?? ""] as const
    })
  )
  const initial = Object.fromEntries(entries)
  return <HalamanForm pages={STATIC_PAGES} initial={initial} />
}
