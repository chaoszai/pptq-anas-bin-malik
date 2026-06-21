"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { savePageContent } from "@/app/actions/content"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { Btn, PageHeader } from "@/components/admin/ui"

export interface HalamanDef {
  key: string
  label: string
}

export function HalamanForm({
  pages,
  initial,
}: {
  pages: HalamanDef[]
  initial: Record<string, string>
}) {
  const router = useRouter()
  const [active, setActive] = useState(pages[0]?.key ?? "")
  const [html, setHtml] = useState<Record<string, string>>(initial)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function submit() {
    setSaving(true)
    setSaved(false)
    try {
      await savePageContent(active, { html: html[active] ?? "" })
      setSaved(true)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <PageHeader
        title="Halaman Statis"
        action={
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-emerald-600">Tersimpan ✓</span>}
            <Btn onClick={submit} disabled={saving}>{saving ? "Menyimpan..." : "Simpan halaman ini"}</Btn>
          </div>
        }
      />
      <p className="text-sm text-gray-500 mb-4">
        Teks di bawah akan menggantikan isi default halaman publik. Kosongkan untuk pakai bawaan.
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {pages.map((p) => (
          <button
            key={p.key}
            onClick={() => setActive(p.key)}
            className={`px-3 py-1.5 text-sm rounded-lg border ${
              active === p.key ? "bg-emerald-700 text-white border-emerald-700" : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <RichTextEditor
        value={html[active] ?? ""}
        onChange={(v) => setHtml((prev) => ({ ...prev, [active]: v }))}
      />
    </div>
  )
}
