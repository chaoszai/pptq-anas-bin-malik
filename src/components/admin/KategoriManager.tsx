"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Kategori } from "@/types/content"
import { saveKategori, deleteKategori } from "@/app/actions/content"
import { Input, Btn, PageHeader, Field } from "@/components/admin/ui"

export function KategoriManager({ items }: { items: Kategori[] }) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [color, setColor] = useState("#1b7a5a")
  const [editId, setEditId] = useState<string | null>(null)

  async function save() {
    if (!title) return
    await saveKategori({ id: editId ?? undefined, title, color })
    setTitle(""); setColor("#1b7a5a"); setEditId(null)
    router.refresh()
  }
  async function remove(id: string) {
    if (!confirm("Hapus kategori?")) return
    await deleteKategori(id); router.refresh()
  }

  return (
    <div className="p-8 max-w-2xl">
      <PageHeader title="Kategori" />
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 flex gap-3 items-end">
        <div className="flex-1"><Input label="Nama Kategori" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <Field label="Warna"><input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-16 rounded border border-gray-200" /></Field>
        <Btn onClick={save}>{editId ? "Update" : "Tambah"}</Btn>
        {editId && <Btn variant="ghost" onClick={() => { setEditId(null); setTitle(""); }}>Batal</Btn>}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        {items.length === 0 && <p className="p-6 text-center text-gray-400 text-sm">Belum ada kategori.</p>}
        {items.map((k) => (
          <div key={k.id} className="flex items-center justify-between px-4 py-3">
            <span className="flex items-center gap-2 text-sm">
              <span className="w-4 h-4 rounded-full" style={{ background: k.color ?? "#ccc" }} />
              {k.title}
            </span>
            <span className="text-sm">
              <button onClick={() => { setEditId(k.id); setTitle(k.title); setColor(k.color ?? "#1b7a5a") }} className="text-emerald-700 hover:underline mr-3">Edit</button>
              <button onClick={() => remove(k.id)} className="text-red-600 hover:underline">Hapus</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
