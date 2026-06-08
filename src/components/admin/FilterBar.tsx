"use client"

import { useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"

const GELOMBANG = ["Gelombang 1", "Gelombang 2", "Gelombang 3"]
const STATUS_OPTIONS = [
  { value: "menunggu", label: "Menunggu" },
  { value: "verifikasi", label: "Diverifikasi" },
  { value: "seleksi", label: "Seleksi" },
  { value: "diterima", label: "Diterima" },
  { value: "ditolak", label: "Ditolak" },
  { value: "cadangan", label: "Cadangan" },
]

interface FilterBarProps {
  current: { gelombang?: string; status?: string; search?: string }
}

export default function FilterBar({ current }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams({
        ...(current.gelombang ? { gelombang: current.gelombang } : {}),
        ...(current.status ? { status: current.status } : {}),
        ...(current.search ? { search: current.search } : {}),
        [key]: value,
      })
      if (!value) params.delete(key)
      router.push(`${pathname}?${params.toString()}`)
    },
    [current, pathname, router]
  )

  const clearAll = () => router.push(pathname)

  const hasFilters = !!(current.gelombang || current.status || current.search)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Cari nama / no. pendaftaran..."
        defaultValue={current.search ?? ""}
        onChange={(e) => update("search", e.target.value)}
        className="border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 w-64"
      />

      <select
        value={current.gelombang ?? ""}
        onChange={(e) => update("gelombang", e.target.value)}
        className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
      >
        <option value="">Semua Gelombang</option>
        {GELOMBANG.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <select
        value={current.status ?? ""}
        onChange={(e) => update("status", e.target.value)}
        className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
      >
        <option value="">Semua Status</option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Reset
        </button>
      )}
    </div>
  )
}
