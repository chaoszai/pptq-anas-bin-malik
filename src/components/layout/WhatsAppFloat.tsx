"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle } from "lucide-react"
import { CONTACT, SITE_NAME } from "@/lib/constants"
import type { SiteSettings } from "@/types/siteSettings"

export function WhatsAppFloat({ settings }: { settings?: SiteSettings }) {
  const [open, setOpen] = useState(false)

  const siteName = settings?.siteName ?? SITE_NAME
  const waNumber = settings?.whatsapp
    ? `62${settings.whatsapp.replace(/^0/, "")}`
    : "628123456789"
  const waBase = `https://wa.me/${waNumber}`
  const message = encodeURIComponent(
    `Assalamu'alaikum, saya ingin bertanya tentang ${siteName}.`
  )
  const waUrl = `${waBase}?text=${message}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-72 shadow-xl border border-[0.5px] overflow-hidden"
            style={{
              background: "var(--color-cream)",
              borderColor: "var(--color-sand)",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ background: "#25D366" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">WhatsApp</p>
                  <p className="text-white/80 text-xs">{siteName}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Tutup"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-4 py-4">
              <div
                className="rounded p-3 mb-4 text-xs leading-relaxed"
                style={{
                  background: "var(--color-ivory)",
                  color: "var(--color-walnut)",
                  border: "0.5px solid var(--color-sand)",
                }}
              >
                Assalamu'alaikum! Ada yang bisa kami bantu? Tanya seputar program, pendaftaran, atau info pondok — kami siap membantu. 🌿
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold tracking-wider transition-opacity hover:opacity-90"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  letterSpacing: "0.06em",
                }}
              >
                <MessageCircle size={14} />
                Mulai Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center relative"
        style={{ background: "#25D366" }}
        aria-label="Chat WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* WhatsApp SVG icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.85L.057 23.8a.5.5 0 0 0 .614.614l5.95-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.837-.57-5.4-1.555l-.387-.232-4.007.987.988-3.896-.252-.4A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: "#25D366" }}
          />
        )}
      </motion.button>
    </div>
  )
}
