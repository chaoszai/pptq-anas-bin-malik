"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  children?: readonly { label: string; href: string }[]
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false)
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href)

  if (item.children) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className={cn(
            "flex items-center gap-1 text-base tracking-wide uppercase transition-colors py-1",
            isActive
              ? "text-[var(--color-emerald-deep)]"
              : "text-[var(--color-walnut)] hover:text-[var(--color-ink)]"
          )}
          style={{ letterSpacing: "0.1em" }}
        >
          {item.label}
          <ChevronDown
            size={12}
            className={cn("transition-transform", open && "rotate-180")}
          />
        </button>

        {/* Active dot */}
        {isActive && (
          <span
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
            style={{ background: "var(--color-gold-antique)" }}
          />
        )}

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full left-0 mt-3 py-2 min-w-44 border border-[0.5px] shadow-lg z-50"
              style={{
                background: "var(--color-cream)",
                borderColor: "var(--color-sand)",
              }}
            >
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-5 py-2.5 text-base tracking-wide uppercase transition-colors hover:bg-[var(--color-ivory)]"
                  style={{
                    color:
                      pathname === child.href
                        ? "var(--color-emerald-deep)"
                        : "var(--color-walnut)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="relative">
      <Link
        href={item.href}
        className={cn(
          "text-base tracking-wide uppercase transition-colors",
          isActive
            ? "text-[var(--color-emerald-deep)]"
            : "text-[var(--color-walnut)] hover:text-[var(--color-ink)]"
        )}
        style={{ letterSpacing: "0.1em" }}
      >
        {item.label}
      </Link>
      {isActive && (
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: "var(--color-gold-antique)" }}
        />
      )}
    </div>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "shadow-sm backdrop-blur-md"
          : ""
      )}
      style={{
        background: scrolled
          ? "rgba(253,252,248,0.92)"
          : "var(--color-cream)",
        borderBottom: scrolled ? "0.5px solid var(--color-sand)" : "0.5px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18"  style={{ minHeight: "72px" }}>

          {/* Logo + Name */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo-pptq.jpeg"
              alt="Logo PPTQ Anas Bin Malik"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div className="leading-tight">
              <div
                className="font-sans font-semibold text-base"
                style={{ color: "var(--color-ink)", letterSpacing: "0.01em" }}
              >
                {SITE_NAME}
              </div>
              <div
                className="font-sans text-sm"
                style={{ color: "var(--color-gold-muted)", letterSpacing: "0.02em" }}
              >
                Tahfidzul Qur&apos;an
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item as NavItem} pathname={pathname} />
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/psb/daftar"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 text-base font-medium tracking-wide uppercase transition-colors"
              style={{
                border: "1px solid var(--color-gold-antique)",
                color: "var(--color-emerald-deep)",
                letterSpacing: "0.12em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-emerald-deep)"
                e.currentTarget.style.color = "var(--color-cream)"
                e.currentTarget.style.borderColor = "var(--color-emerald-deep)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "var(--color-emerald-deep)"
                e.currentTarget.style.borderColor = "var(--color-gold-antique)"
              }}
            >
              Daftar PSB
            </Link>

            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ color: "var(--color-ink)" }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-[0.5px]"
            style={{
              background: "var(--color-cream)",
              borderColor: "var(--color-sand)",
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm tracking-widest uppercase block",
                      pathname.startsWith(item.href) && item.href !== "/"
                        ? "text-[var(--color-emerald-deep)]"
                        : "text-[var(--color-walnut)]"
                    )}
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {item.label}
                  </Link>
                  {"children" in item && item.children && (
                    <div className="mt-3 ml-4 flex flex-col gap-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-xs tracking-wider"
                          style={{
                            color: "var(--color-gold-muted)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/psb/daftar"
                className="mt-2 inline-flex items-center justify-center px-6 py-3 text-xs tracking-widest uppercase"
                style={{
                  background: "var(--color-emerald-deep)",
                  color: "var(--color-cream)",
                  letterSpacing: "0.12em",
                }}
              >
                Daftar PSB 2026
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
