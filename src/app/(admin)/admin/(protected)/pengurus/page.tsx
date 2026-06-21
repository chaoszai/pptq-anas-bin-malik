import { getPengurusList } from "@/lib/content"
import { PengurusManager } from "@/components/admin/PengurusManager"

export const metadata = { title: "Pengurus | Admin PPTQ" }
export const dynamic = "force-dynamic"

export default async function AdminPengurusPage() {
  const items = await getPengurusList()
  return <PengurusManager items={items} />
}
