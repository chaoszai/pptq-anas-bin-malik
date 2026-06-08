"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const PROFIL_NAV = [
  { label: "Tentang Kami", href: "/profil" },
  { label: "Sejarah", href: "/profil/sejarah" },
  { label: "Visi & Misi", href: "/profil/visi-misi" },
  { label: "Struktur Organisasi", href: "/profil/struktur" },
  { label: "Fasilitas", href: "/profil/fasilitas" },
  { label: "Lokasi", href: "/profil/lokasi" },
]

export function ProfilSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div
        className="sticky top-28 p-6"
        style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
      >
        <p
          className="font-sans text-[10px] tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-gold-muted)" }}
        >
          Profil Pondok
        </p>
        <nav className="space-y-1">
          {PROFIL_NAV.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 font-sans text-sm transition-all duration-200"
                style={{
                  color: isActive ? "var(--color-emerald-deep)" : "var(--color-walnut)",
                  background: isActive ? "var(--color-emerald-50)" : "transparent",
                  borderLeft: isActive ? "2px solid var(--color-emerald-deep)" : "2px solid transparent",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
