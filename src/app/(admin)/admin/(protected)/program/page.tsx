import { getProgramList } from "@/lib/content"
import { ProgramManager } from "@/components/admin/ProgramManager"

export const metadata = { title: "Program | Admin PPTQ" }
export const dynamic = "force-dynamic"

export default async function AdminProgramPage() {
  const items = await getProgramList()
  return <ProgramManager items={items} />
}
