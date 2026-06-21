import { getKategoriList } from "@/lib/content"
import { KategoriManager } from "@/components/admin/KategoriManager"

export const metadata = { title: "Kategori | Admin PPTQ" }
export const dynamic = "force-dynamic"

export default async function AdminKategoriPage() {
  const items = await getKategoriList()
  return <KategoriManager items={items} />
}
