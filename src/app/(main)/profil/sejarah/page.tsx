import { PageHero } from "@/components/ui/PageHero"
import { ProfilSidebar } from "@/components/ui/ProfilSidebar"
import { FadeIn } from "@/components/motion/FadeIn"

export const metadata = {
  title: "Sejarah — PPTQ Anas Bin Malik",
}

const TIMELINE = [
  {
    year: "2015",
    title: "Pendirian Pondok",
    desc: "PPTQ Anas Bin Malik resmi didirikan dengan santri perdana berjumlah 12 orang. Kegiatan belajar dimulai dari sebuah rumah sederhana di Cawas, Klaten.",
  },
  {
    year: "2017",
    title: "Pembangunan Gedung Pertama",
    desc: "Dengan dukungan donatur dan wakaf dari masyarakat, dibangunlah gedung asrama pertama yang mampu menampung 40 santri.",
  },
  {
    year: "2018",
    title: "Wisuda Huffazh Pertama",
    desc: "Untuk pertama kalinya, PPTQ Anas Bin Malik meluluskan 7 santri hafidz 30 juz. Momen bersejarah yang meneguhkan semangat seluruh civitas pondok.",
  },
  {
    year: "2020",
    title: "Legalisasi & Akreditasi",
    desc: "Pondok mendapat pengakuan resmi dari Kemenag dan Yayasan. Program pendidikan formal mulai diintegrasikan dengan kurikulum tahfidz.",
  },
  {
    year: "2022",
    title: "Pengembangan Fasilitas",
    desc: "Pembangunan masjid pondok, laboratorium bahasa Arab, dan perpustakaan Al-Qur'an. Kapasitas santri meningkat hingga 100 orang.",
  },
  {
    year: "2025",
    title: "Dekade Berkiprah",
    desc: "Genap 10 tahun berdiri, PPTQ Anas Bin Malik telah melahirkan 48+ alumni huffazh dan menjadi salah satu pondok tahfidz terpercaya di Klaten.",
  },
]

export default function SejarahPage() {
  return (
    <>
      <PageHero
        arabicTitle="تَارِيخُ الْمَعْهَد"
        title="Sejarah Pondok"
        subtitle="Perjalanan panjang PPTQ Anas Bin Malik dari sebuah rumah sederhana hingga menjadi lembaga tahfidz yang dipercaya."
        breadcrumbs={[{ label: "Beranda" }, { label: "Profil" }, { label: "Sejarah" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          <ProfilSidebar />

          <main className="flex-1 min-w-0">
            <FadeIn>
              <p
                className="font-sans text-base leading-relaxed mb-12"
                style={{ color: "var(--color-walnut)" }}
              >
                Berawal dari keinginan tulus untuk menjaga dan menyebarkan Al-Qur&apos;an,
                PPTQ Anas Bin Malik lahir dari sebuah langkah kecil yang penuh keyakinan.
                Berikut adalah jejak perjalanan pondok dari tahun ke tahun.
              </p>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-[52px] top-0 bottom-0 w-px hidden md:block"
                  style={{ background: "var(--color-sand)" }}
                />

                <div className="space-y-10">
                  {TIMELINE.map((item, i) => (
                    <div key={i} className="flex gap-6 md:gap-8">
                      {/* Year badge */}
                      <div className="shrink-0 flex flex-col items-center gap-2">
                        <div
                          className="w-[72px] h-[72px] flex items-center justify-center font-display italic font-semibold text-sm z-10"
                          style={{
                            background: i === TIMELINE.length - 1 ? "var(--color-emerald-deep)" : "var(--color-ivory)",
                            border: `1px solid ${i === TIMELINE.length - 1 ? "var(--color-emerald-deep)" : "var(--color-sand)"}`,
                            color: i === TIMELINE.length - 1 ? "var(--color-gold-antique)" : "var(--color-emerald-deep)",
                          }}
                        >
                          {item.year}
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className="flex-1 p-6 mb-0"
                        style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                      >
                        <h3
                          className="font-display italic font-semibold text-lg mb-2"
                          style={{ color: "var(--color-ink)" }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="font-sans text-sm leading-relaxed"
                          style={{ color: "var(--color-walnut)" }}
                        >
                          {item.desc}
                        </p>
                      </div>
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
