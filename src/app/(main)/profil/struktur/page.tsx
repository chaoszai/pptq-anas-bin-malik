import { PageHero } from "@/components/ui/PageHero"
import { ProfilSidebar } from "@/components/ui/ProfilSidebar"
import { FadeIn } from "@/components/motion/FadeIn"
import { CornerOrnament } from "@/components/ornaments/CornerOrnament"

export const metadata = {
  title: "Struktur Organisasi — PPTQ Anas Bin Malik",
}

const STRUKTUR = [
  {
    level: 0,
    jabatan: "Pengasuh / Pendiri",
    nama: "Ust. [Nama Pengasuh]",
    arabic: "الْمُؤَسِّس",
  },
  {
    level: 1,
    jabatan: "Ketua Yayasan",
    nama: "[Nama Ketua Yayasan]",
    arabic: "رَئِيسُ الْمُؤَسَّسَة",
  },
  {
    level: 1,
    jabatan: "Kepala Pondok",
    nama: "[Nama Kepala Pondok]",
    arabic: "مُدِيرُ الْمَعْهَد",
  },
  {
    level: 2,
    jabatan: "Koordinator Tahfidz",
    nama: "[Nama]",
    arabic: "مُنَسِّقُ التَّحْفِيظ",
  },
  {
    level: 2,
    jabatan: "Koordinator Pendidikan",
    nama: "[Nama]",
    arabic: "مُنَسِّقُ التَّعْلِيم",
  },
  {
    level: 2,
    jabatan: "Koordinator Keasramaan",
    nama: "[Nama]",
    arabic: "مُنَسِّقُ الإقَامَة",
  },
  {
    level: 2,
    jabatan: "Koordinator Keuangan",
    nama: "[Nama]",
    arabic: "مُنَسِّقُ الْمَالِيَّة",
  },
]

function OrgCard({ item }: { item: typeof STRUKTUR[0] }) {
  return (
    <div
      className="relative p-5 text-center min-w-[160px]"
      style={{
        background: item.level === 0 ? "var(--color-emerald-deep)" : "var(--color-ivory)",
        border: `0.5px solid ${item.level === 0 ? "var(--color-emerald-deep)" : "var(--color-sand)"}`,
      }}
    >
      {item.level === 0 && <CornerOrnament size={10} color="var(--color-gold-antique)" />}
      <p
        className="font-arabic text-sm mb-1"
        dir="rtl"
        style={{ color: item.level === 0 ? "var(--color-gold-antique)" : "var(--color-gold-muted)" }}
      >
        {item.arabic}
      </p>
      <p
        className="font-sans font-semibold text-xs tracking-wide mb-1"
        style={{ color: item.level === 0 ? "var(--color-cream)" : "var(--color-emerald-deep)" }}
      >
        {item.jabatan}
      </p>
      <p
        className="font-display italic text-sm"
        style={{ color: item.level === 0 ? "rgba(255,255,255,0.7)" : "var(--color-walnut)" }}
      >
        {item.nama}
      </p>
    </div>
  )
}

export default function StrukturPage() {
  const top = STRUKTUR.filter((s) => s.level === 0)
  const mid = STRUKTUR.filter((s) => s.level === 1)
  const bottom = STRUKTUR.filter((s) => s.level === 2)

  return (
    <>
      <PageHero
        arabicTitle="الْهَيْكَلُ التَّنْظِيمِي"
        title="Struktur Organisasi"
        subtitle="Susunan kepengurusan PPTQ Anas Bin Malik yang bertanggung jawab dalam pengelolaan pendidikan santri."
        breadcrumbs={[{ label: "Beranda" }, { label: "Profil" }, { label: "Struktur" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          <ProfilSidebar />

          <main className="flex-1 min-w-0">
            <FadeIn>
              <div className="overflow-x-auto">
                <div className="flex flex-col items-center gap-6 min-w-[600px] py-4">
                  {/* Level 0 */}
                  <div className="flex gap-6 justify-center">
                    {top.map((item, i) => <OrgCard key={i} item={item} />)}
                  </div>

                  {/* Connector */}
                  <div className="w-px h-8" style={{ background: "var(--color-sand)" }} />

                  {/* Level 1 */}
                  <div className="relative flex gap-8 justify-center">
                    {/* Horizontal line */}
                    <div
                      className="absolute top-0 left-[80px] right-[80px] h-px"
                      style={{ background: "var(--color-sand)" }}
                    />
                    {mid.map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-0">
                        <div className="w-px h-8" style={{ background: "var(--color-sand)" }} />
                        <OrgCard item={item} />
                      </div>
                    ))}
                  </div>

                  {/* Connector */}
                  <div className="w-px h-8" style={{ background: "var(--color-sand)" }} />

                  {/* Level 2 */}
                  <div className="relative flex gap-4 justify-center flex-wrap">
                    <div
                      className="absolute top-0 left-[80px] right-[80px] h-px"
                      style={{ background: "var(--color-sand)" }}
                    />
                    {bottom.map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-px h-8" style={{ background: "var(--color-sand)" }} />
                        <OrgCard item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p
                className="font-sans text-xs text-center mt-8"
                style={{ color: "var(--color-gold-muted)" }}
              >
                * Nama pengurus bersifat sementara dan akan diperbarui
              </p>
            </FadeIn>
          </main>
        </div>
      </div>
    </>
  )
}
