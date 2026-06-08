import { PageHero } from "@/components/ui/PageHero"
import { ProfilSidebar } from "@/components/ui/ProfilSidebar"
import { FadeIn } from "@/components/motion/FadeIn"

export const metadata = {
  title: "Fasilitas — PPTQ Anas Bin Malik",
}

const FASILITAS = [
  { arabic: "الْمَسْجِد", name: "Masjid Pondok", desc: "Masjid berkapasitas 200 jamaah, pusat kegiatan ibadah dan pengajian santri setiap hari.", icon: "🕌" },
  { arabic: "الْمَكْتَبَة", name: "Perpustakaan", desc: "Koleksi ribuan kitab kuning, buku tafsir, terjemahan, dan referensi ilmu Al-Qur'an.", icon: "📚" },
  { arabic: "السَّكَن", name: "Asrama Putra/Putri", desc: "Asrama terpisah untuk putra dan putri, bersih, nyaman, dan diawasi oleh musyrif/musyrifah.", icon: "🏠" },
  { arabic: "الْفَصْل", name: "Ruang Belajar", desc: "8 kelas ber-AC dengan kapasitas 15-20 santri per kelas, kondusif untuk proses talaqqi.", icon: "🎓" },
  { arabic: "الصِّحَّة", name: "Klinik Kesehatan", desc: "Fasilitas kesehatan dasar untuk santri, dengan jadwal kunjungan dokter rutin setiap minggu.", icon: "🏥" },
  { arabic: "الرِّيَاضَة", name: "Area Olahraga", desc: "Lapangan futsal dan badminton untuk menunjang kesehatan fisik dan kebersamaan santri.", icon: "⚽" },
  { arabic: "الطَّعَام", name: "Dapur & Ruang Makan", desc: "Katering terjadwal 3x sehari dengan menu bergizi yang dikelola oleh tim memasak pondok.", icon: "🍽️" },
  { arabic: "الإِنْتَرْنِت", name: "Akses Internet Terbatas", desc: "Akses internet terfilter untuk keperluan belajar dan komunikasi terjadwal dengan orang tua.", icon: "📶" },
]

export default function FasilitasPage() {
  return (
    <>
      <PageHero
        arabicTitle="مَرَافِقُ الْمَعْهَد"
        title="Fasilitas Pondok"
        subtitle="Sarana dan prasarana yang mendukung kenyamanan dan kelancaran proses belajar para santri."
        breadcrumbs={[{ label: "Beranda" }, { label: "Profil" }, { label: "Fasilitas" }]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          <ProfilSidebar />

          <main className="flex-1 min-w-0">
            <FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {FASILITAS.map((item, i) => (
                  <div
                    key={i}
                    className="p-6 flex gap-4"
                    style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                  >
                    <div
                      className="shrink-0 w-12 h-12 flex items-center justify-center text-2xl rounded-sm"
                      style={{ background: "var(--color-cream)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-arabic text-sm mb-1" dir="rtl" style={{ color: "var(--color-gold-antique)" }}>
                        {item.arabic}
                      </p>
                      <h3 className="font-sans font-semibold text-sm mb-1.5" style={{ color: "var(--color-ink)" }}>
                        {item.name}
                      </h3>
                      <p className="font-sans text-xs leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Photo placeholder */}
              <div className="mt-10">
                <p className="font-sans text-xs tracking-widest uppercase mb-4" style={{ color: "var(--color-gold-muted)" }}>
                  Foto Fasilitas
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-video flex items-center justify-center"
                      style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                    >
                      <p className="font-sans text-[10px]" style={{ color: "var(--color-sand)" }}>
                        Foto Fasilitas
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
