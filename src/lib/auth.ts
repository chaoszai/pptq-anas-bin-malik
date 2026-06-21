import "server-only"
import { cookies } from "next/headers"

export async function isAdmin(): Promise<boolean> {
  const token = process.env.ADMIN_TOKEN
  if (!token) return false
  const cookieStore = await cookies()
  return cookieStore.get("admin_token")?.value === token
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("Tidak diizinkan")
}
