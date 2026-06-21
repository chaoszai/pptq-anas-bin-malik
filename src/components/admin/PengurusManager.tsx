"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Pengurus } from "@/types/content"
import { savePengurus, deletePengurus } from "@/app/actions/content"
import { Input, Btn, PageHeader } from "@/components/admin/ui"
import { ImageUpload } from "@/components/admin/ImageUpload"

type Draft = { id?: string; name: string; jabatan: string; photoUrl: string; order: number }
const empty: Draft = { name: "", jabatan: "", photoUrl: "", order: 0 }

export function PengurusManager({ items }: { items: Pengurus[] }) {
  const router = useRouter()
  const [draft, setDraft] = useState<Draft | null>(null)
  const [saving, setSaving] = useState(false)

  async function save() {
    if (!draft) return
    setSaving(true)
    try { await savePengurus(draft); setDraft(null); router.refresh() } finally { setSaving(false) }
  }
  async function remove(id: string) { if (confirm("Hapus pengurus?")) { await deletePengurus(id); router.refresh() } }

  if (draft) return (
    <div className="p-8 max-w-xl">
      <PageHeader title={draft.id ? "Edit Pengurus" : "Pengurus Baru"} action={
        <div className="flex gap-2"><Btn variant="ghost" onClick={() => setDraft(null)}>Batal</Btn><Btn onClick={save} disabled={saving || !draft.name}>Simpan</Btn></div>
      } />
      <div className="space-y-4 bg-white rounded-xl border border-gray-100 p-6">
        <Input label="Nama" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        <Input label="Jabatan" value={draft.jabatan} onChange={(e) => setDraft({ ...draft, jabatan: e.target.value })} />
        <ImageUpload label="Foto" value={draft.photoUrl} onChange={(v) => setDraft({ ...draft, photoUrl: v })} />
        <Input label="Urutan" type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
      </div>
    </div>
  )

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title="Pengurus" action={<Btn onClick={() => setDraft({ ...empty })}>+ Pengurus</Btn>} />
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        {items.length === 0 && <p className="p-6 text-center text-gray-400 text-sm">Belum ada pengurus.</p>}
        {items.map((p) => (
          <div key={p.id} className="flex items-center justify-between px-4 py-3">
            <span className="flex items-center gap-3 text-sm">
              {p.photoUrl
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={p.photoUrl} alt="" className="w-9 h-9 rounded-full object-cover" />
                : <span className="w-9 h-9 rounded-full bg-gray-100" />}
              <span>{p.name}<span className="text-gray-400 ml-2">{p.jabatan}</span></span>
            </span>
            <span className="text-sm">
              <button onClick={() => setDraft({ id: p.id, name: p.name, jabatan: p.jabatan, photoUrl: p.photoUrl ?? "", order: p.order })} className="text-emerald-700 hover:underline mr-3">Edit</button>
              <button onClick={() => remove(p.id)} className="text-red-600 hover:underline">Hapus</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
