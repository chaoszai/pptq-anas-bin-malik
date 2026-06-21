import { PageHero } from "@/components/ui/PageHero"
import { FadeIn } from "@/components/motion/FadeIn"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { PROGRAMS } from "@/lib/constants"
import { getPageContent } from "@/lib/content"
import { OverridePage } from "@/components/ui/OverridePage"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Kurikulum — PPTQ Anas Bin Malik",
}

const JADWAL_HARIAN = [
  { waktu: "03.30", kegiatan: "Shalat Tahajud & Qiyamul Lail" },
  { waktu: "04.30", kegiatan: "Shalat Subuh Berjamaah & Tilawah" },
  { waktu: "05.00", kegiatan: "Setoran Hafalan Pagi (Talaqqi)" },
  { waktu: "07.00", kegiatan: "Sarapan & Persiapan Belajar" },
  { waktu: "07.30", kegiatan: "KBM Pagi (Ilmu Agama & Bahasa Arab)" },
  { waktu: "11.30", kegiatan: "Shalat Dzuhur Berjamaah" },
  { waktu: "12.00", kegiatan: "Makan Siang & Istirahat" },
  { waktu: "13.00", kegiatan: "Murajaah (Mengulang Hafalan)" },
  { waktu: "15.30", kegiatan: "Shalat Ashar Berjamaah" },
  { waktu: "16.00", kegiatan: "Olahraga & Kegiatan Ekstrakurikuler" },
  { waktu: "18.00", kegiatan: "Shalat Maghrib & Pengajian Kitab" },
  { waktu: "19.00", kegiatan: "Shalat Isya Berjamaah" },
  { waktu: "19.30", kegiatan: "Setoran Hafalan Malam & Belajar Mandiri" },
  { waktu: "21.30", kegiatan: "Istirahat (Jam Tidur)" },
]

const JENJANG = [
  { level: "I'dad (Persiapan)", duration: "6 Bulan", target: "Kelancaran tajwid dan tartil, hafalan Juz 30 dan Juz 29" },
  { level: "Marhalah Ula (Tingkat I)", duration: "1 Tahun", target: "Hafalan 5 juz (Juz 26–30) dengan murajaah lancar" },
  { level: "Marhalah Tsaniyah (Tingkat II)", duration: "1 Tahun", target: "Hafalan 10 juz dengan murajaah 5 juz sebelumnya" },
  { level: "Marhalah Tsalitsah (Tingkat III)", duration: "1 Tahun", target: "Hafalan 15 juz dengan murajaah 10 juz" },
  { level: "Marhalah Rabi'ah (Tingkat IV)", duration: "1 Tahun", target: "Hafalan 20 juz dengan murajaah 15 juz" },
  { level: "Marhalah Khamisah (Tingkat V)", duration: "1 Tahun", target: "Hafalan 30 juz — wisuda huffazh" },
]

export default async function KurikulumPage() {
  const override = await getPageContent<{ html?: string }>("kurikulum")
  if (override?.html) {
    return (
      <OverridePage
        arabicTitle="الْمَنْهَجُ الدِّرَاسِي"
        title="Kurikulum"
        subtitle="Program pendidikan komprehensif PPTQ Anas Bin Malik."
        breadcrumbs={[{ label: "Beranda" }, { label: "Kurikulum" }]}
        html={override.html}
      />
    )
  }
  return (
    <>
      <PageHero
        arabicTitle="الْمَنْهَجُ الدِّرَاسِي"
        title="Kurikulum"
        subtitle="Program pendidikan komprehensif yang memadukan hafalan Al-Qur'an dengan ilmu-ilmu agama Islam."
        breadcrumbs={[{ label: "Beranda" }, { label: "Kurikulum" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-5xl mx-auto space-y-20">

          {/* Program Unggulan */}
          <FadeIn>
            <div>
              <div className="text-center mb-10">
                <p className="font-sans text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-gold-muted)" }}>
                  Lima Pilar Kurikulum
                </p>
                <GeometricDivider label="Program Unggulan" className="max-w-xs mx-auto mb-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PROGRAMS.map((program, i) => (
                  <div
                    key={i}
                    id={program.slug}
                    className="p-6 flex gap-5"
                    style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                  >
                    <span
                      className="font-display italic text-4xl leading-none shrink-0"
                      style={{ color: "var(--color-gold-antique)" }}
                    >
                      {program.roman}
                    </span>
                    <div>
                      <p className="font-arabic text-lg mb-1" dir="rtl" style={{ color: "var(--color-emerald-deep)" }}>
                        {program.arabicTitle}
                      </p>
                      <h3 className="font-display italic font-semibold text-lg mb-2" style={{ color: "var(--color-ink)" }}>
                        {program.title}
                      </h3>
                      <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                        {program.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <GeometricDivider />
          </FadeIn>

          {/* Jenjang Hafalan */}
          <FadeIn delay={0.1}>
            <div>
              <div className="text-center mb-10">
                <p className="font-sans text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-gold-muted)" }}>
                  Tahapan Menghafal
                </p>
                <GeometricDivider label="Jenjang Hafalan" className="max-w-xs mx-auto mb-4" />
              </div>
              <div className="space-y-3">
                {JENJANG.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-[1fr_120px_2fr] gap-4 p-5 items-start"
                    style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                  >
                    <div>
                      <span
                        className="font-display italic font-semibold text-base"
                        style={{ color: "var(--color-ink)" }}
                      >
                        {item.level}
                      </span>
                    </div>
                    <div
                      className="font-sans text-xs px-3 py-1 text-center"
                      style={{ background: "var(--color-emerald-deep)", color: "var(--color-gold-antique)" }}
                    >
                      {item.duration}
                    </div>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                      {item.target}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <GeometricDivider />
          </FadeIn>

          {/* Jadwal Harian */}
          <FadeIn delay={0.15}>
            <div>
              <div className="text-center mb-10">
                <p className="font-sans text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-gold-muted)" }}>
                  Rutinitas Santri
                </p>
                <GeometricDivider label="Jadwal Harian" className="max-w-xs mx-auto mb-4" />
              </div>
              <div className="overflow-hidden" style={{ border: "0.5px solid var(--color-sand)" }}>
                {JADWAL_HARIAN.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-0"
                    style={{
                      borderBottom: i < JADWAL_HARIAN.length - 1 ? "0.5px solid var(--color-sand)" : "none",
                      background: i % 2 === 0 ? "var(--color-ivory)" : "var(--color-cream)",
                    }}
                  >
                    <div
                      className="w-24 shrink-0 px-4 py-3 flex items-center"
                      style={{ borderRight: "0.5px solid var(--color-sand)" }}
                    >
                      <span
                        className="font-display italic text-base"
                        style={{ color: "var(--color-emerald-deep)" }}
                      >
                        {item.waktu}
                      </span>
                    </div>
                    <div className="px-5 py-3 flex items-center">
                      <p className="font-sans text-sm" style={{ color: "var(--color-ink)" }}>
                        {item.kegiatan}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
