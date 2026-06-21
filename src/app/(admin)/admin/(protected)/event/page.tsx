import { getEventList } from "@/lib/content"
import { EventManager } from "@/components/admin/EventManager"

export const metadata = { title: "Event | Admin PPTQ" }
export const dynamic = "force-dynamic"

export default async function AdminEventPage() {
  const items = await getEventList()
  return <EventManager items={items} />
}
