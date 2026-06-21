"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Testimoni } from "@/types/content"
import { saveTestimoni, deleteTestimoni } from "@/app/actions/content"
import { Input, Textarea, Btn, PageHeader } from "@/components/admin/ui"
import { ImageUpload } from "@/components/admin/ImageUpload"

type Draft = { id?: string; name: string; role: string; photoUrl: string; quote: string; rating: number; order: number }
const empty: Draft = { name: "", role: "", photoUrl: "", quote: "", rating: 5, order: 0 }

export function TestimoniManager({ items }: { items: Testimoni[] }) {
  const router = useRouter()
  const [draft, setDraft] = useState<Draft | null>(null)
  const [saving, setSaving] = useState(false)

  async function save() {
    if (!draft) return
    setSaving(true)
    try { await saveTestimoni(draft); setDraft(null); router.refresh() } finally { setSaving(false) }
  }
  async function remove(id: string) { if (confirm("Hapus testimoni?")) { await deleteTestimoni(id); router.refresh() } }

  if (draft) return (
    <div className="p-8 max-w-2xl">
      <PageHeader title={draft.id ? "Edit Testimoni" : "Testimoni Baru"} action={
        <div className="flex gap-2"><Btn variant="ghost" onClick={() => setDraft(null)}>Batal</Btn><Btn onClick={save} disabled={saving || !draft.name || !draft.quote}>Simpan</Btn></div>
      } />
      <div className="space-y-4 bg-white rounded-xl border border-gray-100 p-6">
        <Input label="Nama" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        <Input label="Peran (mis. Wali Santri)" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
        <Textarea label="Kutipan" rows={3} value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} />
        <ImageUpload label="Foto" value={draft.photoUrl} onChange={(v) => setDraft({ ...draft, photoUrl: v })} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Rating (1-5)" type="number" min={1} max={5} value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })} />
          <Input label="Urutan" type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title="Testimoni" action={<Btn onClick={() => setDraft({ ...empty })}>+ Testimoni</Btn>} />
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        {items.length === 0 && <p className="p-6 text-center text-gray-400 text-sm">Belum ada testimoni.</p>}
        {items.map((t) => (
          <div key={t.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">{t.name} <span className="text-gray-400">· {"★".repeat(t.rating)}</span></span>
            <span className="text-sm">
              <button onClick={() => setDraft({ id: t.id, name: t.name, role: t.role ?? "", photoUrl: t.photoUrl ?? "", quote: t.quote, rating: t.rating, order: t.order })} className="text-emerald-700 hover:underline mr-3">Edit</button>
              <button onClick={() => remove(t.id)} className="text-red-600 hover:underline">Hapus</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
