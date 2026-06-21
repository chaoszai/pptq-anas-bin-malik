import { PageHero } from "@/components/ui/PageHero"
import { ProfilSidebar } from "@/components/ui/ProfilSidebar"
import { FadeIn } from "@/components/motion/FadeIn"
import { getPengurusList } from "@/lib/content"
import Image from "next/image"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Struktur Organisasi — PPTQ Anas Bin Malik",
}

export default async function StrukturPage() {
  const pengurus = await getPengurusList()

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
              {pengurus.length === 0 ? (
                <p className="font-sans text-sm text-center py-12" style={{ color: "var(--color-walnut)", opacity: 0.5 }}>
                  Data pengurus belum diisi. Tambahkan melalui panel admin → Pengurus.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {pengurus.map((p, i) => (
                    <div
                      key={p.id ?? i}
                      className="p-5 text-center"
                      style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                    >
                      {p.photoUrl ? (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3" style={{ border: "0.5px solid var(--color-sand)" }}>
                          <Image src={p.photoUrl} alt={p.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div
                          className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center"
                          style={{ background: "var(--color-cream)", border: "0.5px solid var(--color-sand)" }}
                        >
                          <span className="font-display italic text-2xl" style={{ color: "var(--color-sand)" }}>
                            {p.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <p className="font-sans font-semibold text-xs tracking-wide mb-1" style={{ color: "var(--color-emerald-deep)" }}>
                        {p.jabatan}
                      </p>
                      <p className="font-display italic text-base" style={{ color: "var(--color-ink)" }}>
                        {p.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </FadeIn>
          </main>
        </div>
      </div>
    </>
  )
}
