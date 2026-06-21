"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Program } from "@/types/content"
import { saveProgram, deleteProgram } from "@/app/actions/content"
import { Input, Textarea, Btn, PageHeader } from "@/components/admin/ui"
import { ImageUpload } from "@/components/admin/ImageUpload"

type Draft = { id?: string; title: string; arabicTitle: string; roman: string; description: string; iconUrl: string; order: number }
const empty: Draft = { title: "", arabicTitle: "", roman: "", description: "", iconUrl: "", order: 0 }

export function ProgramManager({ items }: { items: Program[] }) {
  const router = useRouter()
  const [draft, setDraft] = useState<Draft | null>(null)
  const [saving, setSaving] = useState(false)

  async function save() {
    if (!draft) return
    setSaving(true)
    try { await saveProgram(draft); setDraft(null); router.refresh() } finally { setSaving(false) }
  }
  async function remove(id: string) { if (confirm("Hapus program?")) { await deleteProgram(id); router.refresh() } }

  if (draft) return (
    <div className="p-8 max-w-2xl">
      <PageHeader title={draft.id ? "Edit Program" : "Program Baru"} action={
        <div className="flex gap-2"><Btn variant="ghost" onClick={() => setDraft(null)}>Batal</Btn><Btn onClick={save} disabled={saving || !draft.title}>Simpan</Btn></div>
      } />
      <div className="space-y-4 bg-white rounded-xl border border-gray-100 p-6">
        <Input label="Judul" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Judul Arab" value={draft.arabicTitle} onChange={(e) => setDraft({ ...draft, arabicTitle: e.target.value })} />
          <Input label="Roman (i, ii, ...)" value={draft.roman} onChange={(e) => setDraft({ ...draft, roman: e.target.value })} />
        </div>
        <Textarea label="Deskripsi" rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        <ImageUpload label="Ikon/Gambar" value={draft.iconUrl} onChange={(v) => setDraft({ ...draft, iconUrl: v })} />
        <Input label="Urutan" type="number" value={draft.order} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} />
      </div>
    </div>
  )

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title="Program" action={<Btn onClick={() => setDraft({ ...empty })}>+ Program</Btn>} />
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        {items.length === 0 && <p className="p-6 text-center text-gray-400 text-sm">Belum ada program.</p>}
        {items.map((p) => (
          <div key={p.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm"><span className="text-gray-400 mr-2">{p.order}</span>{p.title}</span>
            <span className="text-sm">
              <button onClick={() => setDraft({ id: p.id, title: p.title, arabicTitle: p.arabicTitle ?? "", roman: p.roman ?? "", description: p.description ?? "", iconUrl: p.iconUrl ?? "", order: p.order })} className="text-emerald-700 hover:underline mr-3">Edit</button>
              <button onClick={() => remove(p.id)} className="text-red-600 hover:underline">Hapus</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
