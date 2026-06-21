import { getFasilitasList } from "@/lib/content"
import { FasilitasManager } from "@/components/admin/FasilitasManager"

export const metadata = { title: "Fasilitas | Admin PPTQ" }
export const dynamic = "force-dynamic"

export default async function AdminFasilitasPage() {
  const items = await getFasilitasList()
  return <FasilitasManager items={items} />
}
