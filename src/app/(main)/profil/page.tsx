import { PageHero } from "@/components/ui/PageHero"
import { ProfilSidebar } from "@/components/ui/ProfilSidebar"
import { FadeIn } from "@/components/motion/FadeIn"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { CornerOrnament } from "@/components/ornaments/CornerOrnament"
import { PONDOK_INFO, CONTACT, STATS } from "@/lib/constants"
import { getPageContent } from "@/lib/content"
import { OverridePage } from "@/components/ui/OverridePage"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Tentang Kami — PPTQ Anas Bin Malik",
}

export default async function ProfilPage() {
  const override = await getPageContent<{ html?: string }>("profil")
  if (override?.html) {
    return (
      <OverridePage
        arabicTitle="عَنْ مَعْهَدِنَا"
        title="Tentang Kami"
        subtitle="Mengenal lebih dekat Pondok Pesantren Tahfidzul Qur'an Anas Bin Malik."
        breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Tentang Kami" }]}
        html={override.html}
        withSidebar
      />
    )
  }
  return (
    <>
      <PageHero
        arabicTitle="عَنْ مَعْهَدِنَا"
        title="Tentang Kami"
        subtitle="Mengenal lebih dekat Pondok Pesantren Tahfidzul Qur'an Anas Bin Malik, lembaga pendidikan Islam yang berdedikasi mencetak generasi huffazh."
        breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Tentang Kami" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          <ProfilSidebar />

          <main className="flex-1 min-w-0">
            <FadeIn>
              {/* Intro */}
              <div className="prose-custom mb-12">
                <p
                  className="font-sans text-lg leading-relaxed mb-6"
                  style={{ color: "var(--color-ink)" }}
                >
                  <strong>Pondok Pesantren Tahfidzul Qur&apos;an Anas Bin Malik</strong> adalah
                  lembaga pendidikan Islam yang berdiri sejak tahun {PONDOK_INFO.tahunBerdiri} di
                  Klaten, Jawa Tengah. Dengan fokus utama pada hafalan dan pemahaman Al-Qur&apos;an,
                  kami hadir untuk mencetak generasi huffazh yang tidak hanya hafal 30 juz,
                  tetapi juga berilmu dan berakhlak mulia.
                </p>
                <p
                  className="font-sans text-base leading-relaxed mb-6"
                  style={{ color: "var(--color-walnut)" }}
                >
                  Metode unggulan kami adalah <strong>talaqqi</strong> — penyampaian Al-Qur&apos;an
                  secara langsung dari mulut guru ke telinga murid, sebagaimana cara Rasulullah ﷺ
                  menerima wahyu dari Jibril AS dan mengajarkannya kepada para sahabat. Sanad kami
                  bersambung hingga Rasulullah ﷺ.
                </p>
                <p
                  className="font-sans text-base leading-relaxed"
                  style={{ color: "var(--color-walnut)" }}
                >
                  Selama {PONDOK_INFO.tahunBerkiprah}+ tahun berkiprah, kami telah meluluskan
                  lebih dari {PONDOK_INFO.alumniHuffazh} santri yang telah menyelesaikan hafalan
                  30 juz dan tersebar di berbagai penjuru negeri, menjadi imam masjid, pengajar
                  Al-Qur&apos;an, dan tokoh masyarakat.
                </p>
              </div>

              <GeometricDivider className="mb-12" />

              {/* Stats mini */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-5"
                    style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                  >
                    <p
                      className="font-display font-semibold text-3xl leading-none mb-1"
                      style={{ color: "var(--color-emerald-deep)" }}
                    >
                      {stat.value}{stat.suffix}
                    </p>
                    <p className="font-sans text-xs tracking-wider uppercase" style={{ color: "var(--color-walnut)" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pengasuh */}
              <div className="mb-12">
                <h2
                  className="font-display italic font-semibold text-2xl mb-6"
                  style={{ color: "var(--color-ink)" }}
                >
                  Pengasuh Pondok
                </h2>
                <div className="flex gap-6 items-start">
                  {/* Photo placeholder */}
                  <div
                    className="relative shrink-0 w-32 h-40"
                    style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                  >
                    <CornerOrnament size={10} color="var(--color-gold-antique)" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-sans text-[10px] text-center" style={{ color: "var(--color-sand)" }}>
                        Foto<br />Pengasuh
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      className="font-display italic font-semibold text-xl mb-1"
                      style={{ color: "var(--color-ink)" }}
                    >
                      {PONDOK_INFO.pengasuh}
                    </p>
                    <p
                      className="font-sans text-sm mb-4"
                      style={{ color: "var(--color-gold-muted)" }}
                    >
                      Pengasuh & Pendiri PPTQ Anas Bin Malik
                    </p>
                    <p
                      className="font-sans text-sm leading-relaxed"
                      style={{ color: "var(--color-walnut)" }}
                    >
                      Beliau adalah seorang hafidz 30 juz dengan sanad yang bersambung kepada
                      Rasulullah ﷺ. Dengan pengalaman mengajar Al-Qur&apos;an selama lebih dari
                      satu dekade, beliau mendirikan PPTQ Anas Bin Malik sebagai wujud
                      tanggung jawab terhadap pelestarian Al-Qur&apos;an di tengah masyarakat.
                    </p>
                  </div>
                </div>
              </div>

              <GeometricDivider className="mb-12" />

              {/* Info resmi */}
              <div>
                <h2
                  className="font-display italic font-semibold text-2xl mb-6"
                  style={{ color: "var(--color-ink)" }}
                >
                  Informasi Resmi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Nama Resmi", value: "PPTQ Anas Bin Malik" },
                    { label: "Tahun Berdiri", value: PONDOK_INFO.tahunBerdiri },
                    { label: "SK Yayasan", value: PONDOK_INFO.skYayasan },
                    { label: "NPSN", value: PONDOK_INFO.npsn },
                    { label: "Alamat", value: CONTACT.address },
                    { label: "Email", value: CONTACT.email },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-1 p-4"
                      style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                    >
                      <p className="font-sans text-[10px] tracking-widest uppercase" style={{ color: "var(--color-gold-muted)" }}>
                        {item.label}
                      </p>
                      <p className="font-sans text-sm" style={{ color: "var(--color-ink)" }}>
                        {item.value}
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
