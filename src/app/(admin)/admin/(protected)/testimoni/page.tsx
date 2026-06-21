import { getTestimoniList } from "@/lib/content"
import { TestimoniManager } from "@/components/admin/TestimoniManager"

export const metadata = { title: "Testimoni | Admin PPTQ" }
export const dynamic = "force-dynamic"

export default async function AdminTestimoniPage() {
  const items = await getTestimoniList()
  return <TestimoniManager items={items} />
}
