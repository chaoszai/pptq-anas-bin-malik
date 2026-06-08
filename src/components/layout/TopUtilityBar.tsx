import { MapPin, Phone } from "lucide-react"
import { BISMILLAH, CONTACT } from "@/lib/constants"

export function TopUtilityBar() {
  return (
    <div
      className="w-full h-10 flex items-center"
      style={{ background: "var(--color-emerald-darker)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Bismillah */}
        <span
          className="font-arabic text-base hidden sm:block"
          dir="rtl"
          style={{ color: "rgba(253,252,248,0.8)" }}
        >
          {BISMILLAH}
        </span>

        {/* Contact info */}
        <div className="flex items-center gap-6 ml-auto">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT.city)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-100"
            style={{ color: "rgba(253,252,248,0.75)" }}
          >
            <MapPin size={13} strokeWidth={1.5} />
            <span className="hidden md:inline">{CONTACT.city}</span>
            <span className="md:hidden">Klaten, Jateng</span>
          </a>
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-100"
            style={{ color: "rgba(253,252,248,0.75)" }}
          >
            <Phone size={13} strokeWidth={1.5} />
            {CONTACT.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
