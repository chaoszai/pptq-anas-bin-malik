"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Fasilitas } from "@/types/content"
import { saveFasilitas, deleteFasilitas } from "@/app/actions/content"
import { Input, Textarea, Btn, PageHeader, Field } from "@/components/admin/ui"
import { ImageUpload } from "@/components/admin/ImageUpload"

type Draft = { id?: string; title: string; description: string; icon: string; photos: string[]; order: number }
const empty: Draft = { title: "", description: "", icon: "", photos: [], order: 0 }

export function FasilitasManager({ items }: { items: Fasilitas[] }) {
  const router = useRouter()
  const [draft, setDraft] = useState<Draft | null>(null)
  const [saving, setSaving] = useState(false)

  async function save() {
    if (!draft) return
    setSaving(true)
    try { await saveFasilitas(draft); setDraft(null); router.refresh() } finally { setSaving(false) }
  }
  async function remove(id: string) { if (confirm("Hapus fasilitas?")) { await deleteFasilitas(id); router.refresh() } }

  if (draft) return (
    <div className="p-8 max-w-2xl">
      <PageHeader title={draft.id ? "Edit Fasilitas" : "Fasilitas Baru"} action={
        <div className="flex gap-2"><Btn variant="ghost" onClick={() => setDraft(null)}>Batal</Btn><Btn onClick={save} disabled={saving || !draft.title}>Simpan</Btn></div>
      } />
      <div className="space-y-4 bg-white rounded-xl border border-gray-100 p-6">
        <Input label="Nama Fasilitas" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        <Textarea label="Deskripsi" rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        <Input label="Ikon (emoji/nama)" value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} />
        <Field label="Foto">
          <div className="space-y-3">
            {draft.photos.map((url, i) => (
              <div key={i} className="flex gap-2 items-center">
                <ImageUpload label="" value={url} onChange={(v) => setDraft({ ...draft, photos: draft.photos.map((x, j) => j === i ? v : x) })} />
                <Btn variant="danger" onClick={() => setDraft({ ...draft, photos: draft.photos.filter((_, j) => j !== i) })}>×</Btn>
              </div>
            ))}
            <Btn variant="ghost" onClick={() => setDraft({ ...draft, photos: [...draft.photos, ""] })}>+ Foto</Btn>
          </div>
        </Field>
        <Input label="Urutan" type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
      </div>
    </div>
  )

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title="Fasilitas" action={<Btn onClick={() => setDraft({ ...empty })}>+ Fasilitas</Btn>} />
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        {items.length === 0 && <p className="p-6 text-center text-gray-400 text-sm">Belum ada fasilitas.</p>}
        {items.map((f) => (
          <div key={f.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">{f.icon} {f.title} <span className="text-gray-400">· {f.photos.length} foto</span></span>
            <span className="text-sm">
              <button onClick={() => setDraft({ id: f.id, title: f.title, description: f.description ?? "", icon: f.icon ?? "", photos: f.photos, order: f.order })} className="text-emerald-700 hover:underline mr-3">Edit</button>
              <button onClick={() => remove(f.id)} className="text-red-600 hover:underline">Hapus</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
