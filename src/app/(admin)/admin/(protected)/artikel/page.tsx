import { getArtikelList, getKategoriList } from "@/lib/content"
import { ArtikelManager } from "@/components/admin/ArtikelManager"

export const metadata = { title: "Artikel | Admin PPTQ" }
export const dynamic = "force-dynamic"

export default async function AdminArtikelPage() {
  const [items, kategori] = await Promise.all([getArtikelList(), getKategoriList()])
  return <ArtikelManager items={items} kategori={kategori} />
}
