"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { GaleriAlbum } from "@/types/content"
import { saveGaleriAlbum, deleteGaleriAlbum } from "@/app/actions/content"
import { Input, Btn, PageHeader, Field } from "@/components/admin/ui"
import { ImageUpload } from "@/components/admin/ImageUpload"

type ImgDraft = { url: string; caption: string; alt: string }
type Draft = { id?: string; title: string; kategori: string; date: string; images: ImgDraft[] }

const empty: Draft = { title: "", kategori: "", date: "", images: [] }

export function GaleriManager({ items }: { items: GaleriAlbum[] }) {
  const router = useRouter()
  const [draft, setDraft] = useState<Draft | null>(null)
  const [saving, setSaving] = useState(false)

  function edit(a: GaleriAlbum) {
    setDraft({
      id: a.id,
      title: a.title,
      kategori: a.kategori ?? "",
      date: a.date ? a.date.slice(0, 10) : "",
      images: a.images.map((i) => ({ url: i.url, caption: i.caption ?? "", alt: i.alt ?? "" })),
    })
  }
  async function save() {
    if (!draft) return
    setSaving(true)
    try {
      await saveGaleriAlbum({ ...draft, date: draft.date || null })
      setDraft(null); router.refresh()
    } finally { setSaving(false) }
  }
  async function remove(id: string) {
    if (!confirm("Hapus album ini?")) return
    await deleteGaleriAlbum(id); router.refresh()
  }

  if (draft) {
    return (
      <div className="p-8 max-w-3xl">
        <PageHeader title={draft.id ? "Edit Album" : "Album Baru"} action={
          <div className="flex gap-2">
            <Btn variant="ghost" onClick={() => setDraft(null)}>Batal</Btn>
            <Btn onClick={save} disabled={saving || !draft.title}>{saving ? "Menyimpan..." : "Simpan"}</Btn>
          </div>
        } />
        <div className="space-y-4 bg-white rounded-xl border border-gray-100 p-6">
          <Input label="Judul Album" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Kategori" value={draft.kategori} onChange={(e) => setDraft({ ...draft, kategori: e.target.value })} />
            <Input label="Tanggal" type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
          </div>
          <Field label="Foto">
            <div className="space-y-4">
              {draft.images.map((img, i) => (
                <div key={i} className="flex gap-3 items-start border border-gray-100 rounded-lg p-3">
                  <ImageUpload label="" value={img.url} onChange={(v) => setDraft({ ...draft, images: draft.images.map((x, j) => j === i ? { ...x, url: v } : x) })} />
                  <div className="flex-1 space-y-2">
                    <Input placeholder="Caption" value={img.caption} onChange={(e) => setDraft({ ...draft, images: draft.images.map((x, j) => j === i ? { ...x, caption: e.target.value } : x) })} />
                    <Input placeholder="Alt text" value={img.alt} onChange={(e) => setDraft({ ...draft, images: draft.images.map((x, j) => j === i ? { ...x, alt: e.target.value } : x) })} />
                  </div>
                  <Btn variant="danger" onClick={() => setDraft({ ...draft, images: draft.images.filter((_, j) => j !== i) })}>×</Btn>
                </div>
              ))}
              <Btn variant="ghost" onClick={() => setDraft({ ...draft, images: [...draft.images, { url: "", caption: "", alt: "" }] })}>+ Tambah Foto</Btn>
            </div>
          </Field>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <PageHeader title="Galeri" action={<Btn onClick={() => setDraft({ ...empty })}>+ Album Baru</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 && <p className="text-gray-400 text-sm">Belum ada album.</p>}
        {items.map((a) => (
          <div key={a.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="aspect-video bg-gray-100">
              {a.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.images[0].url} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-900 text-sm">{a.title}</p>
              <p className="text-xs text-gray-400 mb-3">{a.kategori} · {a.images.length} foto</p>
              <div className="text-sm">
                <button onClick={() => edit(a)} className="text-emerald-700 hover:underline mr-3">Edit</button>
                <button onClick={() => remove(a.id)} className="text-red-600 hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
