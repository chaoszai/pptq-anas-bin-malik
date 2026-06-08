import { PageHero } from "@/components/ui/PageHero"
import { ProfilSidebar } from "@/components/ui/ProfilSidebar"
import { FadeIn } from "@/components/motion/FadeIn"
import { CONTACT } from "@/lib/constants"

export const metadata = {
  title: "Lokasi — PPTQ Anas Bin Malik",
}

export default function LokasiPage() {
  return (
    <>
      <PageHero
        arabicTitle="مَوْقِعُ الْمَعْهَد"
        title="Lokasi Pondok"
        subtitle="Temukan kami di jantung Klaten, Jawa Tengah — mudah dijangkau dari berbagai arah."
        breadcrumbs={[{ label: "Beranda" }, { label: "Profil" }, { label: "Lokasi" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          <ProfilSidebar />

          <main className="flex-1 min-w-0">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Info kontak */}
                <div className="space-y-4">
                  {[
                    { label: "Alamat Lengkap", value: CONTACT.address, arabic: "الْعُنْوَان" },
                    { label: "Kota", value: CONTACT.city, arabic: "الْمَدِينَة" },
                    { label: "Telepon / WhatsApp", value: CONTACT.phone, arabic: "الْهَاتِف" },
                    { label: "Email", value: CONTACT.email, arabic: "الْبَرِيد" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-5"
                      style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                    >
                      <p className="font-arabic text-sm mb-1" dir="rtl" style={{ color: "var(--color-gold-muted)" }}>
                        {item.arabic}
                      </p>
                      <p className="font-sans text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--color-gold-muted)" }}>
                        {item.label}
                      </p>
                      <p className="font-sans text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Petunjuk arah */}
                <div
                  className="p-6"
                  style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                >
                  <p className="font-arabic text-lg mb-2" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                    كَيْفَ تَصِل
                  </p>
                  <h3 className="font-display italic font-semibold text-lg mb-4" style={{ color: "var(--color-ink)" }}>
                    Petunjuk Arah
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Dari Solo: Arah Klaten via Jl. Raya Solo–Yogya, lanjut ke Kec. Cawas (±40 menit).",
                      "Dari Yogyakarta: Arah Klaten via Ring Road Timur, lanjut ke Cawas (±45 menit).",
                      "Dari Terminal Klaten: Naik angkutan arah Cawas, turun di pertigaan Posakan.",
                      "Dari Stasiun Klaten: Bisa menggunakan ojek online / taksi online langsung ke lokasi.",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span style={{ color: "var(--color-gold-antique)" }}>•</span>
                        <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="w-full h-80 flex items-center justify-center"
                style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
              >
                <div className="text-center space-y-3">
                  <p className="font-arabic text-2xl" dir="rtl" style={{ color: "var(--color-emerald-deep)", opacity: 0.3 }}>
                    الْخَرِيطَة
                  </p>
                  <p className="font-sans text-sm" style={{ color: "var(--color-sand)" }}>
                    Google Maps Embed
                  </p>
                  <a
                    href={CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-sans text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ background: "var(--color-emerald-deep)", color: "var(--color-cream)" }}
                  >
                    Buka di Google Maps →
                  </a>
                </div>
              </div>
            </FadeIn>
          </main>
        </div>
      </div>
    </>
  )
}
