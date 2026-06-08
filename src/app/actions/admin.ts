"use server"

import pool from "@/lib/db"
import type { Pendaftaran, StatusPendaftaran } from "@/types/santri"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAdmin(password: string): Promise<{ error?: string }> {
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Password salah" }
  }
  const cookieStore = await cookies()
  cookieStore.set("admin_token", process.env.ADMIN_TOKEN!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
  redirect("/admin/pendaftar")
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_token")
  redirect("/admin/login")
}

export async function getPendaftar(filters?: {
  gelombang?: string
  status?: string
  search?: string
}): Promise<Pendaftaran[]> {
  const conditions: string[] = []
  const params: unknown[] = []
  let i = 1

  if (filters?.gelombang) {
    conditions.push(`gelombang = $${i++}`)
    params.push(filters.gelombang)
  }
  if (filters?.status) {
    conditions.push(`status = $${i++}`)
    params.push(filters.status)
  }
  if (filters?.search) {
    conditions.push(`(nama_lengkap ILIKE $${i} OR no_pendaftaran ILIKE $${i})`)
    params.push(`%${filters.search}%`)
    i++
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""
  const { rows } = await pool.query<Pendaftaran>(
    `SELECT * FROM pendaftaran ${where} ORDER BY created_at DESC`,
    params
  )
  return rows
}

export async function getPendaftarById(id: string): Promise<Pendaftaran | null> {
  const { rows } = await pool.query<Pendaftaran>(
    "SELECT * FROM pendaftaran WHERE id = $1",
    [id]
  )
  return rows[0] ?? null
}

export async function updateStatus(
  id: string,
  status: StatusPendaftaran,
  catatan?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await pool.query(
      "UPDATE pendaftaran SET status = $1, catatan_admin = $2 WHERE id = $3",
      [status, catatan ?? null, id]
    )
    return { success: true }
  } catch (err) {
    console.error("[Admin] Update status error:", err)
    return { success: false, error: "Gagal update status" }
  }
}
