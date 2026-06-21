import { PageHero } from "@/components/ui/PageHero"
import { FadeIn } from "@/components/motion/FadeIn"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { CONTACT, SOCIAL, BISMILLAH } from "@/lib/constants"
import { getSiteSettings } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Kontak — PPTQ Anas Bin Malik",
}

export default async function KontakPage() {
  const s = await getSiteSettings()

  const address = s.address ?? CONTACT.address
  const phone = s.phone ?? CONTACT.phone
  const email = s.email ?? CONTACT.email
  const whatsapp = s.whatsapp ?? CONTACT.phone
  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}`
    : CONTACT.whatsappUrl
  const instagram = s.instagram ?? SOCIAL.instagram
  const youtube = s.youtube ?? SOCIAL.youtube

  return (
    <>
      <PageHero
        arabicTitle="تَوَاصَل مَعَنَا"
        title="Hubungi Kami"
        subtitle="Kami siap menjawab pertanyaan Anda seputar pondok, program, dan pendaftaran santri baru."
        breadcrumbs={[{ label: "Beranda" }, { label: "Kontak" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left: info */}
            <FadeIn>
              <div className="space-y-6">
                <div>
                  <p className="font-arabic text-xl mb-3" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                    {BISMILLAH}
                  </p>
                  <p className="font-sans text-base leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                    Silakan hubungi kami melalui saluran komunikasi di bawah ini.
                    Tim kami siap merespons pertanyaan Anda pada hari kerja pukul 08.00–16.00 WIB.
                  </p>
                </div>

                <GeometricDivider />

                <div className="space-y-4">
                  {[
                    { arabic: "الْعُنْوَان", label: "Alamat", value: address },
                    { arabic: "الْهَاتِف", label: "Telepon / WhatsApp", value: phone, href: whatsappUrl },
                    { arabic: "الْبَرِيد", label: "Email", value: email, href: `mailto:${email}` },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-5"
                      style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                    >
                      <p className="font-arabic text-sm mb-1" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                        {item.arabic}
                      </p>
                      <p className="font-sans text-[10px] tracking-widest uppercase mb-1" style={{ color: "var(--color-gold-muted)" }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans text-sm font-medium hover:underline"
                          style={{ color: "var(--color-emerald-deep)" }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-sans text-sm" style={{ color: "var(--color-ink)" }}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="font-sans text-xs tracking-widest uppercase mb-3" style={{ color: "var(--color-gold-muted)" }}>
                    Media Sosial
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { label: "Instagram", href: instagram },
                      { label: "YouTube", href: youtube },
                      ...(s.facebook ? [{ label: "Facebook", href: s.facebook }] : []),
                      ...(s.tiktok ? [{ label: "TikTok", href: s.tiktok }] : []),
                    ].filter((x) => x.href).map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 font-sans text-xs tracking-wider transition-opacity hover:opacity-75"
                        style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)", color: "var(--color-walnut)" }}
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right: contact form (static — belum ada backend) */}
            <FadeIn delay={0.15}>
              <div
                className="p-8"
                style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
              >
                <p className="font-arabic text-xl mb-1" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                  أَرْسِل رِسَالَة
                </p>
                <h2 className="font-display italic font-semibold text-xl mb-6" style={{ color: "var(--color-ink)" }}>
                  Kirim Pesan
                </h2>

                <form className="space-y-5">
                  {[
                    { id: "nama", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama Anda" },
                    { id: "email", label: "Email", type: "email", placeholder: "nama@email.com" },
                    { id: "phone", label: "No. Telepon / WhatsApp", type: "tel", placeholder: "08xxxxxxxxxx" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block font-sans text-xs tracking-wider uppercase mb-2"
                        style={{ color: "var(--color-walnut)" }}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 font-sans text-sm outline-none transition-all duration-200"
                        style={{ background: "var(--color-cream)", border: "0.5px solid var(--color-sand)", color: "var(--color-ink)" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="pesan" className="block font-sans text-xs tracking-wider uppercase mb-2" style={{ color: "var(--color-walnut)" }}>
                      Pesan
                    </label>
                    <textarea
                      id="pesan"
                      rows={5}
                      placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                      className="w-full px-4 py-3 font-sans text-sm outline-none transition-all duration-200 resize-none"
                      style={{ background: "var(--color-cream)", border: "0.5px solid var(--color-sand)", color: "var(--color-ink)" }}
                    />
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3.5 font-sans text-sm font-medium tracking-wider text-center transition-opacity hover:opacity-90"
                    style={{ background: "var(--color-emerald-deep)", color: "var(--color-cream)" }}
                  >
                    Hubungi via WhatsApp →
                  </a>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  )
}
