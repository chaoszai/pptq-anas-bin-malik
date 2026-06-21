"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { logoutAdmin } from "@/app/actions/admin"

const navItems = [
  { href: "/admin/pendaftar", label: "Pendaftar", icon: "👥" },
  { href: "/admin/konten", label: "Konten Web", icon: "⚙️" },
  { href: "/admin/halaman", label: "Halaman Statis", icon: "📄" },
  { href: "/admin/artikel", label: "Artikel", icon: "📝" },
  { href: "/admin/kategori", label: "Kategori", icon: "🏷️" },
  { href: "/admin/galeri", label: "Galeri", icon: "🖼️" },
  { href: "/admin/program", label: "Program", icon: "📚" },
  { href: "/admin/pengurus", label: "Pengurus", icon: "👤" },
  { href: "/admin/fasilitas", label: "Fasilitas", icon: "🏛️" },
  { href: "/admin/testimoni", label: "Testimoni", icon: "💬" },
  { href: "/admin/event", label: "Event", icon: "📅" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 flex-shrink-0 bg-emerald-deep text-white flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-emerald-deep)" }}>
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
            <span className="font-arabic text-lg">أ</span>
          </div>
          <div>
            <p className="font-semibold text-sm leading-tight">PPTQ ABM</p>
            <p className="text-white/50 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/8 transition-colors text-left"
          >
            <span>🚪</span>
            Keluar
          </button>
        </form>
      </div>
    </aside>
  )
}
