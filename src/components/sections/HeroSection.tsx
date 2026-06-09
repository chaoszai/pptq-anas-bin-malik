"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { StaggerText, StaggerContainer, StaggerItem } from "@/components/motion/StaggerText"
import {
  BISMILLAH,
  HADITS_HERO,
  HADITS_HERO_TRANS,
  HADITS_HERO_RAWI,
  CONTACT,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants"
import type { SiteSettings } from "@/types/siteSettings"

export function HeroSection({ settings }: { settings?: SiteSettings }) {
  const siteName = settings?.siteName ?? SITE_NAME
  const tagline = settings?.tagline ?? SITE_TAGLINE
  const waNumber = settings?.whatsapp
    ? `62${settings.whatsapp.replace(/^0/, "")}`
    : "628123456789"
  const waUrl = `https://wa.me/${waNumber}`
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-emerald-deeper, var(--color-emerald-darker))" }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
        style={{ background: "linear-gradient(to right, transparent, var(--color-gold-antique), transparent)" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">

        {/* Bismillah */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-arabic text-3xl md:text-4xl mb-8"
          dir="rtl"
          style={{ color: "var(--color-gold-antique)" }}
        >
          {BISMILLAH}
        </motion.p>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-8"
        >
          <Image
            src="/logo-pptq.jpeg"
            alt="Logo PPTQ Anas Bin Malik"
            width={100}
            height={100}
            className="rounded-full object-cover ring-2 ring-gold-antique"
            style={{ boxShadow: "0 0 0 2px var(--color-gold-antique), 0 8px 32px rgba(0,0,0,0.3)" }}
            priority
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-sans text-sm md:text-base tracking-[0.18em] uppercase mb-4"
          style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em" }}
        >
          Pondok Pesantren Tahfidzul Qur&apos;an
        </motion.p>

        {/* Main heading */}
        <StaggerText
          text="Anas Bin Malik"
          as="h1"
          delay={0.85}
          stagger={0.12}
          duration={0.9}
          className="font-display font-semibold italic leading-tight mb-2"
          wordClassName="text-[3.2rem] md:text-[4.8rem] lg:text-[6rem] text-white"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="font-sans font-light text-lg md:text-xl mt-3 mb-10 max-w-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Mencetak Generasi{" "}
          <em className="font-display italic not-italic" style={{ color: "var(--color-gold-antique)" }}>Ḥuffāẓ</em>{" "}
          Berakhlakul Karimah
        </motion.p>

        {/* Hadits box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="w-full max-w-md mb-12 px-6 py-5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(201,162,39,0.25)",
            borderRadius: "2px",
          }}
        >
          <p className="font-arabic text-2xl md:text-3xl leading-relaxed mb-3" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
            {HADITS_HERO}
          </p>
          <p className="font-sans text-sm md:text-base italic mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
            &ldquo;{HADITS_HERO_TRANS}&rdquo;
          </p>
          <p className="font-sans text-xs md:text-sm tracking-wider" style={{ color: "var(--color-gold-muted)", opacity: 0.9 }}>
            {HADITS_HERO_RAWI}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <StaggerContainer delay={1.7} stagger={0.12} className="flex flex-col sm:flex-row gap-3 justify-center">
          <StaggerItem>
            <Link
              href="/psb"
              className="inline-flex items-center gap-2 px-9 py-4 font-sans text-base font-medium tracking-wider transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                background: "var(--color-gold-antique)",
                color: "var(--color-emerald-darker)",
              }}
            >
              Daftar Santri Baru
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link
              href="/kurikulum"
              className="inline-flex items-center gap-2 px-9 py-4 font-sans text-base font-medium tracking-wider transition-all duration-200 hover:bg-white/10"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Pelajari Program
            </Link>
          </StaggerItem>
        </StaggerContainer>

        {/* Lokasi */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.1 }}
          className="mt-8 font-sans text-xs"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          📍 {settings?.city ?? CONTACT.city}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 mx-auto"
          style={{ background: "linear-gradient(to bottom, rgba(201,162,39,0.5), transparent)" }}
        />
      </motion.div>
    </section>
  )
}
