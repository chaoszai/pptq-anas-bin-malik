import Link from "next/link"
import Image from "next/image"
import { PageHero } from "@/components/ui/PageHero"
import { FadeIn } from "@/components/motion/FadeIn"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { PSB_WAVES, CONTACT, BISMILLAH } from "@/lib/constants"
import { getSiteSettings, getPageContent } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Pendaftaran Santri Baru — PPTQ Anas Bin Malik",
}

const SYARAT_UMUM = [
  "Muslim/Muslimah yang berakhlak baik",
  "Usia minimal 10 tahun (masuk SD/MI kelas 4) s.d. 20 tahun",
  "Sudah lancar membaca Al-Qur'an dengan tajwid yang baik",
  "Sehat jasmani dan rohani, tidak memiliki penyakit kronis",
  "Bersedia tinggal di asrama dan mengikuti seluruh peraturan pondok",
  "Mendapat izin dan dukungan penuh dari orang tua/wali",
]

const DOKUMEN = [
  "Formulir pendaftaran yang telah diisi lengkap",
  "Fotokopi Akta Kelahiran (2 lembar)",
  "Fotokopi Kartu Keluarga (2 lembar)",
  "Pas foto 3×4 berwarna (4 lembar)",
  "Fotokopi Raport/Ijazah terakhir",
  "Surat rekomendasi dari guru mengaji/ustadz",
]

const ALUR = [
  { step: "01", arabic: "التَّسْجِيل", title: "Daftar Online", desc: "Isi formulir pendaftaran online dan unggah dokumen yang diperlukan." },
  { step: "02", arabic: "التَّحَقُّق", title: "Verifikasi Berkas", desc: "Panitia PSB akan memverifikasi kelengkapan berkas dalam 3 hari kerja." },
  { step: "03", arabic: "الامْتِحَان", title: "Tes Seleksi", desc: "Calon santri mengikuti tes membaca Al-Qur'an dan wawancara motivasi." },
  { step: "04", arabic: "الإِعْلَان", title: "Pengumuman", desc: "Hasil seleksi diumumkan via WhatsApp dan website pondok." },
  { step: "05", arabic: "الدَّفْع", title: "Daftar Ulang", desc: "Santri yang diterima melakukan daftar ulang dan pembayaran awal." },
  { step: "06", arabic: "الْقُدُوم", title: "Masuk Pondok", desc: "Santri baru resmi masuk dan mengikuti masa orientasi pondok." },
]

export default async function PSBPage() {
  const [settings, override] = await Promise.all([
    getSiteSettings(),
    getPageContent<{ html?: string }>("psb"),
  ])

  const waves = settings.psbWaves?.length ? settings.psbWaves : PSB_WAVES
  const activeWave = waves[1] ?? waves[0]
  const whatsappUrl = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`
    : CONTACT.whatsappUrl

  return (
    <>
      <PageHero
        arabicTitle="قَبُولُ الطُّلَّاب الْجُدُد"
        title="Pendaftaran Santri Baru"
        subtitle={`PSB ${activeWave.label} Tahun Ajaran 2026/2027 — ${activeWave.period}`}
        breadcrumbs={[{ label: "Beranda" }, { label: "Daftar PSB" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-5xl mx-auto space-y-20">

          {/* Poster PPDB */}
          {settings.posterPsb && (
            <FadeIn>
              <div className="text-center">
                <p className="font-sans text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "var(--color-gold-muted)" }}>
                  Poster Pendaftaran
                </p>
                <div className="max-w-lg mx-auto">
                  <Image
                    src={settings.posterPsb}
                    alt="Poster PPDB"
                    width={600}
                    height={850}
                    className="w-full h-auto object-contain"
                    style={{ border: "0.5px solid var(--color-sand)" }}
                  />
                </div>
              </div>
            </FadeIn>
          )}

          {/* Gelombang */}
          <FadeIn>
            <div className="text-center mb-10">
              <p className="font-sans text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-gold-muted)" }}>
                Jadwal Penerimaan
              </p>
              <GeometricDivider label="Gelombang PSB" className="max-w-xs mx-auto mb-8" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {waves.map((wave) => {
                const isActive = wave.id === activeWave.id
                return (
                  <div
                    key={wave.id}
                    className="p-6 text-center"
                    style={{
                      background: isActive ? "var(--color-emerald-deep)" : "var(--color-ivory)",
                      border: `0.5px solid ${isActive ? "var(--color-emerald-deep)" : "var(--color-sand)"}`,
                    }}
                  >
                    {isActive && (
                      <span
                        className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-widest uppercase px-2 py-1 mb-3"
                        style={{ background: "rgba(201,169,97,0.2)", color: "var(--color-gold-antique)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        Sedang Berjalan
                      </span>
                    )}
                    <p
                      className="font-display italic font-semibold text-xl mb-1"
                      style={{ color: isActive ? "var(--color-cream)" : "var(--color-ink)" }}
                    >
                      {wave.label}
                    </p>
                    <p
                      className="font-sans text-sm"
                      style={{ color: isActive ? "rgba(255,255,255,0.65)" : "var(--color-walnut)" }}
                    >
                      {wave.period}
                    </p>
                  </div>
                )
              })}
            </div>
          </FadeIn>

          <FadeIn>
            <GeometricDivider />
          </FadeIn>

          {/* Konten PSB: override dari admin atau default hardcode */}
          {override?.html ? (
            <FadeIn>
              <div
                className="prose-custom font-sans text-sm leading-relaxed"
                style={{ color: "var(--color-walnut)" }}
                dangerouslySetInnerHTML={{ __html: override.html }}
              />
            </FadeIn>
          ) : (
            <>
              <FadeIn delay={0.1}>
                <div>
                  <div className="text-center mb-10">
                    <p className="font-sans text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-gold-muted)" }}>
                      Langkah demi Langkah
                    </p>
                    <GeometricDivider label="Alur Pendaftaran" className="max-w-xs mx-auto" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {ALUR.map((item, i) => (
                      <div
                        key={i}
                        className="p-6"
                        style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="font-display italic text-4xl leading-none" style={{ color: "var(--color-sand)" }}>
                            {item.step}
                          </span>
                          <p className="font-arabic text-sm" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                            {item.arabic}
                          </p>
                        </div>
                        <h3 className="font-sans font-semibold text-sm mb-2" style={{ color: "var(--color-emerald-deep)" }}>
                          {item.title}
                        </h3>
                        <p className="font-sans text-xs leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <GeometricDivider />
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <p className="font-arabic text-xl mb-2" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                      شُرُوطُ الْقَبُول
                    </p>
                    <h2 className="font-display italic font-semibold text-xl mb-5" style={{ color: "var(--color-ink)" }}>
                      Syarat Umum
                    </h2>
                    <ul className="space-y-3">
                      {SYARAT_UMUM.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span style={{ color: "var(--color-gold-antique)" }}>✓</span>
                          <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-arabic text-xl mb-2" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                      الْوَثَائِقُ الْمَطْلُوبَة
                    </p>
                    <h2 className="font-display italic font-semibold text-xl mb-5" style={{ color: "var(--color-ink)" }}>
                      Dokumen yang Diperlukan
                    </h2>
                    <ul className="space-y-3">
                      {DOKUMEN.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="font-display italic" style={{ color: "var(--color-gold-antique)" }}>
                            {i + 1}.
                          </span>
                          <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </>
          )}

          <FadeIn>
            <GeometricDivider />
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.2}>
            <div className="p-10 text-center" style={{ background: "var(--color-emerald-deep)" }}>
              <p className="font-arabic text-2xl mb-6" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                {BISMILLAH}
              </p>
              <h2 className="font-display italic font-semibold text-2xl mb-3" style={{ color: "var(--color-cream)" }}>
                Siap Mendaftarkan Putra/Putri Anda?
              </h2>
              <p className="font-sans text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
                Daftarkan putra/putri Anda melalui formulir online kami. Proses cepat,
                mudah, dan langsung terhubung dengan panitia PSB.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/psb/daftar"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-sans text-sm font-medium tracking-wider transition-opacity hover:opacity-90"
                  style={{ background: "var(--color-gold-antique)", color: "var(--color-emerald-darker)" }}
                >
                  Daftar Sekarang →
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 font-sans text-sm font-medium tracking-wider transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}
                >
                  Hubungi via WhatsApp
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
