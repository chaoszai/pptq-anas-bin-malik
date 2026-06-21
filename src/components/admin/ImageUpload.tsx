"use client"

import { useState, useRef } from "react"

export function ImageUpload({
  value,
  onChange,
  label = "Gambar",
}: {
  value?: string
  onChange: (url: string) => void
  label?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    setError("")
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Upload gagal")
      onChange(data.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
        ) : (
          <div className="w-20 h-20 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-300 text-2xl">
            🖼️
          </div>
        )}
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-60"
          >
            {uploading ? "Mengunggah..." : value ? "Ganti" : "Unggah"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="px-3 py-1.5 text-sm rounded-lg text-red-600 hover:bg-red-50"
            >
              Hapus
            </button>
          )}
        </div>
      </div>
      <input type="url" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="atau tempel URL gambar"
        className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}
