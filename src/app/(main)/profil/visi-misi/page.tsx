import { PageHero } from "@/components/ui/PageHero"
import { ProfilSidebar } from "@/components/ui/ProfilSidebar"
import { FadeIn } from "@/components/motion/FadeIn"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { getPageContent } from "@/lib/content"
import { OverridePage } from "@/components/ui/OverridePage"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Visi & Misi — PPTQ Anas Bin Malik",
}

const MISI = [
  "Menyelenggarakan pendidikan tahfidz Al-Qur'an dengan metode talaqqi bersanad.",
  "Mengintegrasikan hafalan Al-Qur'an dengan ilmu-ilmu agama Islam secara komprehensif.",
  "Membentuk karakter santri yang berakhlakul karimah, mandiri, dan bertanggung jawab.",
  "Menciptakan lingkungan belajar yang kondusif, aman, dan menyenangkan bagi santri.",
  "Membangun kemitraan dengan orang tua dan masyarakat dalam proses pendidikan santri.",
  "Melahirkan alumni yang siap berkontribusi nyata bagi agama, bangsa, dan masyarakat.",
]

const NILAI = [
  { arabic: "إِخْلَاص", latin: "Ikhlas", desc: "Mengerjakan segala sesuatu semata-mata karena Allah ﷻ." },
  { arabic: "انْضِبَاط", latin: "Disiplin", desc: "Menjaga waktu, aturan, dan komitmen dengan penuh tanggung jawab." },
  { arabic: "أُخُوَّة", latin: "Ukhuwah", desc: "Membangun persaudaraan yang tulus di antara seluruh warga pondok." },
  { arabic: "تَوَاضُع", latin: "Tawadhu", desc: "Bersikap rendah hati dan menghormati sesama, terutama guru." },
  { arabic: "اسْتِقَامَة", latin: "Istiqomah", desc: "Konsisten dan teguh dalam menghafal, belajar, dan beribadah." },
]

export default async function VisiMisiPage() {
  const override = await getPageContent<{ html?: string }>("visi_misi")
  if (override?.html) {
    return (
      <OverridePage
        arabicTitle="الرُّؤْيَةُ وَالرِّسَالَة"
        title="Visi & Misi"
        subtitle="Landasan filosofis dan arah gerak PPTQ Anas Bin Malik."
        breadcrumbs={[{ label: "Beranda" }, { label: "Profil" }, { label: "Visi & Misi" }]}
        html={override.html}
        withSidebar
      />
    )
  }
  return (
    <>
      <PageHero
        arabicTitle="الرُّؤْيَةُ وَالرِّسَالَة"
        title="Visi & Misi"
        subtitle="Landasan filosofis dan arah gerak PPTQ Anas Bin Malik dalam mendidik generasi penghafal Al-Qur'an."
        breadcrumbs={[{ label: "Beranda" }, { label: "Profil" }, { label: "Visi & Misi" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          <ProfilSidebar />

          <main className="flex-1 min-w-0 space-y-14">
            <FadeIn>
              {/* Visi */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <p className="font-arabic text-xl" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                    رُؤْيَتُنَا
                  </p>
                  <h2 className="font-display italic font-semibold text-2xl" style={{ color: "var(--color-ink)" }}>
                    Visi
                  </h2>
                </div>
                <div
                  className="p-8 relative"
                  style={{ background: "var(--color-emerald-deep)", border: "0.5px solid var(--color-emerald-deep)" }}
                >
                  <p
                    className="font-arabic text-2xl leading-relaxed text-center mb-4"
                    dir="rtl"
                    style={{ color: "var(--color-gold-antique)" }}
                  >
                    خَيْرُ الْأُمَّة — جِيلٌ حَافِظٌ عَالِمٌ عَامِل
                  </p>
                  <p
                    className="font-display italic text-xl text-center leading-relaxed"
                    style={{ color: "var(--color-cream)" }}
                  >
                    &ldquo;Menjadi lembaga tahfidz terdepan yang melahirkan generasi
                    penghafal Al-Qur&apos;an yang berilmu, berakhlak, dan berkontribusi
                    nyata bagi kejayaan Islam dan bangsa.&rdquo;
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <GeometricDivider />
            </FadeIn>

            {/* Misi */}
            <FadeIn delay={0.15}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <p className="font-arabic text-xl" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                    رِسَالَتُنَا
                  </p>
                  <h2 className="font-display italic font-semibold text-2xl" style={{ color: "var(--color-ink)" }}>
                    Misi
                  </h2>
                </div>
                <div className="space-y-3">
                  {MISI.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-5"
                      style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                    >
                      <span
                        className="shrink-0 font-display italic text-2xl leading-none"
                        style={{ color: "var(--color-gold-antique)" }}
                      >
                        {i + 1}.
                      </span>
                      <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <GeometricDivider />
            </FadeIn>

            {/* Nilai */}
            <FadeIn delay={0.25}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <p className="font-arabic text-xl" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                    قِيَمُنَا
                  </p>
                  <h2 className="font-display italic font-semibold text-2xl" style={{ color: "var(--color-ink)" }}>
                    Nilai-Nilai Pondok
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {NILAI.map((item, i) => (
                    <div
                      key={i}
                      className="p-6 text-center"
                      style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                    >
                      <p className="font-arabic text-3xl mb-2" dir="rtl" style={{ color: "var(--color-emerald-deep)" }}>
                        {item.arabic}
                      </p>
                      <p className="font-display italic font-semibold text-lg mb-2" style={{ color: "var(--color-ink)" }}>
                        {item.latin}
                      </p>
                      <p className="font-sans text-xs leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </main>
        </div>
      </div>
    </>
  )
}
