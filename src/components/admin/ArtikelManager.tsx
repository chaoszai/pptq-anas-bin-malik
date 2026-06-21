"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Artikel, Kategori } from "@/types/content"
import { saveArtikel, deleteArtikel } from "@/app/actions/content"
import { Input, Textarea, Btn, PageHeader, Field } from "@/components/admin/ui"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { RichTextEditor } from "@/components/admin/RichTextEditor"

type Draft = {
  id?: string
  title: string
  excerpt: string
  bodyHtml: string
  thumbnailUrl: string
  kategoriId: string
  published: boolean
  featured: boolean
}

const empty: Draft = { title: "", excerpt: "", bodyHtml: "", thumbnailUrl: "", kategoriId: "", published: true, featured: false }

export function ArtikelManager({ items, kategori }: { items: Artikel[]; kategori: Kategori[] }) {
  const router = useRouter()
  const [draft, setDraft] = useState<Draft | null>(null)
  const [saving, setSaving] = useState(false)

  function edit(a: Artikel) {
    setDraft({
      id: a.id,
      title: a.title,
      excerpt: a.excerpt ?? "",
      bodyHtml: a.bodyHtml ?? "",
      thumbnailUrl: a.thumbnailUrl ?? "",
      kategoriId: a.kategoriId ?? "",
      published: !!a.publishedAt,
      featured: a.featured,
    })
  }

  async function save() {
    if (!draft) return
    setSaving(true)
    try {
      await saveArtikel({ ...draft, kategoriId: draft.kategoriId || null })
      setDraft(null)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  async function remove(id: string) {
    if (!confirm("Hapus artikel ini?")) return
    await deleteArtikel(id)
    router.refresh()
  }

  if (draft) {
    return (
      <div className="p-8 max-w-3xl">
        <PageHeader
          title={draft.id ? "Edit Artikel" : "Artikel Baru"}
          action={
            <div className="flex gap-2">
              <Btn variant="ghost" onClick={() => setDraft(null)}>Batal</Btn>
              <Btn onClick={save} disabled={saving || !draft.title}>{saving ? "Menyimpan..." : "Simpan"}</Btn>
            </div>
          }
        />
        <div className="space-y-4 bg-white rounded-xl border border-gray-100 p-6">
          <Input label="Judul" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <Textarea label="Ringkasan" rows={2} value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
          <Field label="Kategori">
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={draft.kategoriId} onChange={(e) => setDraft({ ...draft, kategoriId: e.target.value })}>
              <option value="">— Tanpa kategori —</option>
              {kategori.map((k) => <option key={k.id} value={k.id}>{k.title}</option>)}
            </select>
          </Field>
          <ImageUpload label="Thumbnail" value={draft.thumbnailUrl} onChange={(v) => setDraft({ ...draft, thumbnailUrl: v })} />
          <Field label="Isi Artikel">
            <RichTextEditor value={draft.bodyHtml} onChange={(v) => setDraft({ ...draft, bodyHtml: v })} />
          </Field>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} />
              Terbitkan
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} />
              Unggulan
            </label>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <PageHeader title="Artikel" action={<Btn onClick={() => setDraft({ ...empty })}>+ Artikel Baru</Btn>} />
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {items.length === 0 ? (
          <p className="p-8 text-center text-gray-400 text-sm">Belum ada artikel.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Judul</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">{a.title}</td>
                  <td className="px-4 py-3 text-gray-500">{a.kategori?.title ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${a.publishedAt ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                      {a.publishedAt ? "Terbit" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => edit(a)} className="text-emerald-700 hover:underline mr-3">Edit</button>
                    <button onClick={() => remove(a.id)} className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
