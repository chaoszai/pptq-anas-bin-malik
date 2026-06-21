import { PageHero } from "@/components/ui/PageHero"
import { ProfilSidebar } from "@/components/ui/ProfilSidebar"
import { FadeIn } from "@/components/motion/FadeIn"
import { getFasilitasList } from "@/lib/content"
import type { Fasilitas } from "@/types/content"
import Image from "next/image"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Fasilitas — PPTQ Anas Bin Malik",
}

const DEFAULT_FASILITAS: Fasilitas[] = [
  { id: "1", title: "Masjid Pondok", description: "Masjid berkapasitas 200 jamaah, pusat kegiatan ibadah dan pengajian santri setiap hari.", icon: "🕌", photos: [], order: 1 },
  { id: "2", title: "Perpustakaan", description: "Koleksi ribuan kitab kuning, buku tafsir, terjemahan, dan referensi ilmu Al-Qur'an.", icon: "📚", photos: [], order: 2 },
  { id: "3", title: "Asrama Putra/Putri", description: "Asrama terpisah untuk putra dan putri, bersih, nyaman, dan diawasi oleh musyrif/musyrifah.", icon: "🏠", photos: [], order: 3 },
  { id: "4", title: "Ruang Belajar", description: "8 kelas ber-AC dengan kapasitas 15-20 santri per kelas, kondusif untuk proses talaqqi.", icon: "🎓", photos: [], order: 4 },
  { id: "5", title: "Klinik Kesehatan", description: "Fasilitas kesehatan dasar untuk santri, dengan jadwal kunjungan dokter rutin setiap minggu.", icon: "🏥", photos: [], order: 5 },
  { id: "6", title: "Area Olahraga", description: "Lapangan futsal dan badminton untuk menunjang kesehatan fisik dan kebersamaan santri.", icon: "⚽", photos: [], order: 6 },
  { id: "7", title: "Dapur & Ruang Makan", description: "Katering terjadwal 3x sehari dengan menu bergizi yang dikelola oleh tim memasak pondok.", icon: "🍽️", photos: [], order: 7 },
  { id: "8", title: "Akses Internet Terbatas", description: "Akses internet terfilter untuk keperluan belajar dan komunikasi terjadwal dengan orang tua.", icon: "📶", photos: [], order: 8 },
]

export default async function FasilitasPage() {
  const dbFasilitas = await getFasilitasList()
  const fasilitas = dbFasilitas.length > 0 ? dbFasilitas : DEFAULT_FASILITAS

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
                {fasilitas.map((item, i) => (
                  <div
                    key={item.id ?? i}
                    className="p-6 flex gap-4"
                    style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                  >
                    <div
                      className="shrink-0 w-12 h-12 flex items-center justify-center text-2xl rounded-sm"
                      style={{ background: "var(--color-cream)" }}
                    >
                      {item.icon ?? "🏫"}
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-sm mb-1.5" style={{ color: "var(--color-ink)" }}>
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="font-sans text-xs leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Foto fasilitas dari DB */}
              {fasilitas.some((f) => f.photos.length > 0) && (
                <div className="mt-10">
                  <p className="font-sans text-xs tracking-widest uppercase mb-4" style={{ color: "var(--color-gold-muted)" }}>
                    Foto Fasilitas
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {fasilitas.flatMap((f) => f.photos).slice(0, 9).map((url, i) => (
                      <div key={i} className="relative aspect-video overflow-hidden" style={{ border: "0.5px solid var(--color-sand)" }}>
                        <Image src={url} alt="Foto fasilitas" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </FadeIn>
          </main>
        </div>
      </div>
    </>
  )
}
