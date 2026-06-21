"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { EventItem } from "@/types/content"
import { saveEvent, deleteEvent } from "@/app/actions/content"
import { Input, Textarea, Btn, PageHeader } from "@/components/admin/ui"
import { ImageUpload } from "@/components/admin/ImageUpload"

type Draft = {
  id?: string; title: string; description: string; thumbnailUrl: string
  startDate: string; endDate: string; location: string; isOnline: boolean; registrationUrl: string
}
const empty: Draft = { title: "", description: "", thumbnailUrl: "", startDate: "", endDate: "", location: "", isOnline: false, registrationUrl: "" }

export function EventManager({ items }: { items: EventItem[] }) {
  const router = useRouter()
  const [draft, setDraft] = useState<Draft | null>(null)
  const [saving, setSaving] = useState(false)

  async function save() {
    if (!draft) return
    setSaving(true)
    try {
      await saveEvent({ ...draft, startDate: draft.startDate || null, endDate: draft.endDate || null })
      setDraft(null); router.refresh()
    } finally { setSaving(false) }
  }
  async function remove(id: string) { if (confirm("Hapus event?")) { await deleteEvent(id); router.refresh() } }

  if (draft) return (
    <div className="p-8 max-w-2xl">
      <PageHeader title={draft.id ? "Edit Event" : "Event Baru"} action={
        <div className="flex gap-2"><Btn variant="ghost" onClick={() => setDraft(null)}>Batal</Btn><Btn onClick={save} disabled={saving || !draft.title}>Simpan</Btn></div>
      } />
      <div className="space-y-4 bg-white rounded-xl border border-gray-100 p-6">
        <Input label="Judul" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        <Textarea label="Deskripsi" rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        <ImageUpload label="Thumbnail" value={draft.thumbnailUrl} onChange={(v) => setDraft({ ...draft, thumbnailUrl: v })} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Mulai" type="datetime-local" value={draft.startDate} onChange={(e) => setDraft({ ...draft, startDate: e.target.value })} />
          <Input label="Selesai" type="datetime-local" value={draft.endDate} onChange={(e) => setDraft({ ...draft, endDate: e.target.value })} />
        </div>
        <Input label="Lokasi" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
        <Input label="URL Pendaftaran" value={draft.registrationUrl} onChange={(e) => setDraft({ ...draft, registrationUrl: e.target.value })} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={draft.isOnline} onChange={(e) => setDraft({ ...draft, isOnline: e.target.checked })} /> Online
        </label>
      </div>
    </div>
  )

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title="Event" action={<Btn onClick={() => setDraft({ ...empty })}>+ Event</Btn>} />
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        {items.length === 0 && <p className="p-6 text-center text-gray-400 text-sm">Belum ada event.</p>}
        {items.map((ev) => (
          <div key={ev.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">{ev.title} <span className="text-gray-400">{ev.startDate ? `· ${new Date(ev.startDate).toLocaleDateString("id-ID")}` : ""}</span></span>
            <span className="text-sm">
              <button onClick={() => setDraft({
                id: ev.id, title: ev.title, description: ev.description ?? "", thumbnailUrl: ev.thumbnailUrl ?? "",
                startDate: ev.startDate ? ev.startDate.slice(0, 16) : "", endDate: ev.endDate ? ev.endDate.slice(0, 16) : "",
                location: ev.location ?? "", isOnline: ev.isOnline, registrationUrl: ev.registrationUrl ?? "",
              })} className="text-emerald-700 hover:underline mr-3">Edit</button>
              <button onClick={() => remove(ev.id)} className="text-red-600 hover:underline">Hapus</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
