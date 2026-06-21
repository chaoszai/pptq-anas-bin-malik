"use client"

import { useState } from "react"
import { FadeIn } from "@/components/motion/FadeIn"
import type { GaleriAlbum, GaleriImage } from "@/types/content"

interface Props {
  albums: GaleriAlbum[]
}

const SEMUA = "Semua"

type FlatImage = GaleriImage & { albumTitle: string; albumKategori?: string }

export function GaleriGrid({ albums }: Props) {
  const [aktif, setAktif] = useState(SEMUA)
  const [lightbox, setLightbox] = useState<FlatImage | null>(null)

  const kategoriList = [SEMUA, ...Array.from(new Set(albums.map((a) => a.kategori).filter(Boolean) as string[]))]
  const filteredAlbums = aktif === SEMUA ? albums : albums.filter((a) => a.kategori === aktif)
  const allImages: FlatImage[] = filteredAlbums.flatMap((album) =>
    (album.images ?? []).map((img) => ({ ...img, albumTitle: album.title, albumKategori: album.kategori }))
  )

  return (
    <>
      <FadeIn>
        <div className="flex flex-wrap gap-2 mb-10">
          {kategoriList.map((kat) => (
            <button
              key={kat}
              onClick={() => setAktif(kat)}
              className="px-4 py-2 font-sans text-xs tracking-wider transition-all duration-200"
              style={{
                background: aktif === kat ? "var(--color-emerald-deep)" : "var(--color-ivory)",
                color: aktif === kat ? "var(--color-cream)" : "var(--color-walnut)",
                border: `0.5px solid ${aktif === kat ? "var(--color-emerald-deep)" : "var(--color-sand)"}`,
              }}
            >
              {kat}
            </button>
          ))}
        </div>
      </FadeIn>

      {allImages.length === 0 ? (
        <FadeIn>
          <div
            className="py-24 flex flex-col items-center gap-4"
            style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
          >
            <p className="font-arabic text-3xl" dir="rtl" style={{ color: "var(--color-emerald-deep)", opacity: 0.3 }}>
              لَا صُوَر
            </p>
            <p className="font-sans text-sm" style={{ color: "var(--color-walnut)" }}>
              Belum ada foto dalam kategori ini.
            </p>
          </div>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {allImages.map((img, i) => (
            <FadeIn key={img.id} delay={i * 0.03}>
              <div
                className="group relative aspect-square overflow-hidden cursor-pointer"
                style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
                onClick={() => setLightbox(img)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt ?? img.caption ?? img.albumTitle}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: "linear-gradient(to top, rgba(17,29,107,0.9) 0%, transparent 55%)" }}
                >
                  <div className="p-3">
                    <p className="font-sans text-xs font-medium leading-snug" style={{ color: "var(--color-cream)" }}>
                      {img.caption ?? img.albumTitle}
                    </p>
                    {img.albumKategori && (
                      <p className="font-sans text-[10px] mt-0.5" style={{ color: "var(--color-gold-antique)" }}>
                        {img.albumKategori}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 font-sans text-sm"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              ✕ Tutup
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.url}
              alt={lightbox.alt ?? lightbox.caption ?? ""}
              className="w-full h-full object-contain max-h-[80vh]"
            />
            {lightbox.caption && (
              <p className="font-sans text-sm text-center" style={{ color: "rgba(255,255,255,0.7)" }}>
                {lightbox.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
