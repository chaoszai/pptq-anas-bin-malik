import { getGaleriAlbums } from "@/lib/content"
import { GaleriManager } from "@/components/admin/GaleriManager"

export const metadata = { title: "Galeri | Admin PPTQ" }
export const dynamic = "force-dynamic"

export default async function AdminGaleriPage() {
  const items = await getGaleriAlbums()
  return <GaleriManager items={items} />
}
