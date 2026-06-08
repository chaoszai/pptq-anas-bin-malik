import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import {
  SITE_NAME,
  SITE_FULL_NAME,
  CONTACT,
  SOCIAL,
  NAV_ITEMS,
  PROGRAMS,
  BISMILLAH,
} from "@/lib/constants"

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center border border-[0.5px] transition-colors hover:border-[var(--color-gold-antique)] hover:text-[var(--color-gold-antique)]"
      style={{ borderColor: "rgba(253,252,248,0.2)", color: "rgba(253,252,248,0.5)" }}
      aria-label={label}
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--color-emerald-darker)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo-pptq.jpeg"
                alt="Logo PPTQ Anas Bin Malik"
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
              <div className="leading-tight">
                <div
                  className="font-sans font-semibold text-sm"
                  style={{ color: "var(--color-cream)" }}
                >
                  {SITE_NAME}
                </div>
                <div
                  className="font-sans text-xs"
                  style={{ color: "var(--color-gold-antique)", opacity: 0.8 }}
                >
                  Tahfidzul Qur&apos;an
                </div>
              </div>
            </div>
            <p
              className="font-sans text-xs leading-relaxed mb-5"
              style={{ color: "rgba(253,252,248,0.6)" }}
            >
              {SITE_FULL_NAME} — Mencetak generasi huffazh berakhlakul karimah di Klaten, Jawa Tengah.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.instagram && (
                <SocialLink href={SOCIAL.instagram} label="Instagram">
                  {/* Instagram icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </SocialLink>
              )}
              {SOCIAL.youtube && (
                <SocialLink href={SOCIAL.youtube} label="YouTube">
                  {/* YouTube icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                  </svg>
                </SocialLink>
              )}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4
              className="font-sans text-xs tracking-widest uppercase mb-5"
              style={{ color: "var(--color-gold-antique)", letterSpacing: "0.15em" }}
            >
              Navigasi
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-xs transition-colors hover:text-[var(--color-cream)]"
                    style={{ color: "rgba(253,252,248,0.55)", letterSpacing: "0.04em" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/psb"
                  className="font-sans text-xs transition-colors hover:text-[var(--color-cream)]"
                  style={{ color: "rgba(253,252,248,0.55)", letterSpacing: "0.04em" }}
                >
                  Info PSB
                </Link>
              </li>
            </ul>
          </div>

          {/* Program */}
          <div>
            <h4
              className="font-sans text-xs tracking-widest uppercase mb-5"
              style={{ color: "var(--color-gold-antique)", letterSpacing: "0.15em" }}
            >
              Program
            </h4>
            <ul className="space-y-3">
              {PROGRAMS.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/kurikulum#${p.slug}`}
                    className="font-sans text-xs transition-colors hover:text-[var(--color-cream)]"
                    style={{ color: "rgba(253,252,248,0.55)", letterSpacing: "0.04em" }}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4
              className="font-sans text-xs tracking-widest uppercase mb-5"
              style={{ color: "var(--color-gold-antique)", letterSpacing: "0.15em" }}
            >
              Kontak
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin
                  size={13}
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--color-gold-antique)", opacity: 0.7 }}
                />
                <span
                  className="font-sans text-xs leading-relaxed"
                  style={{ color: "rgba(253,252,248,0.55)" }}
                >
                  {CONTACT.address}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone
                  size={13}
                  className="shrink-0"
                  style={{ color: "var(--color-gold-antique)", opacity: 0.7 }}
                />
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="font-sans text-xs transition-colors hover:text-[var(--color-cream)]"
                  style={{ color: "rgba(253,252,248,0.55)" }}
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail
                  size={13}
                  className="shrink-0"
                  style={{ color: "var(--color-gold-antique)", opacity: 0.7 }}
                />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-sans text-xs transition-colors hover:text-[var(--color-cream)]"
                  style={{ color: "rgba(253,252,248,0.55)" }}
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <GeometricDivider color="rgba(253,252,248,0.12)" className="mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="font-sans text-xs"
            style={{ color: "rgba(253,252,248,0.35)", letterSpacing: "0.04em" }}
          >
            © {new Date().getFullYear()} {SITE_FULL_NAME}. Hak cipta dilindungi.
          </p>
          <p
            className="font-arabic text-base"
            dir="rtl"
            style={{ color: "rgba(253,252,248,0.4)" }}
          >
            {BISMILLAH}
          </p>
        </div>
      </div>
    </footer>
  )
}
