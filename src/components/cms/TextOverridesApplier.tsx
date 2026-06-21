"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { queryByPath } from "@/lib/domPath"

// Menerapkan override teks yang disimpan admin ke halaman publik.
// Berjalan setelah hydration; diterapkan ulang saat ganti halaman & setelah animasi.
export function TextOverridesApplier({ overrides }: { overrides: Record<string, string> }) {
  const pathname = usePathname()

  useEffect(() => {
    const entries = Object.entries(overrides ?? {})
    if (entries.length === 0) return

    function apply() {
      for (const [path, html] of entries) {
        const el = queryByPath(path)
        if (el && el.innerHTML !== html) el.innerHTML = html
      }
    }

    apply()
    const t1 = setTimeout(apply, 400)
    const t2 = setTimeout(apply, 1600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [overrides, pathname])

  return null
}
