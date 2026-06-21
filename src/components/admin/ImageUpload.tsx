"use client"

import { useState, useRef } from "react"

export function ImageUpload({
  value,
  onChange,
  label = "Gambar",
  hint,
  aspect = "square",
}: {
  value?: string
  onChange: (url: string) => void
  label?: string
  hint?: string
  aspect?: "square" | "wide" | "tall"
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

  const previewClass =
    aspect === "wide"
      ? "w-full h-40 object-cover rounded-lg border border-gray-200"
      : aspect === "tall"
      ? "w-32 h-48 object-cover rounded-lg border border-gray-200"
      : "w-32 h-32 object-cover rounded-lg border border-gray-200"

  const emptyClass =
    aspect === "wide"
      ? "w-full h-40 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-300"
      : aspect === "tall"
      ? "w-32 h-48 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-300"
      : "w-32 h-32 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-300"

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {hint && (
        <p className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
          📍 {hint}
        </p>
      )}

      <div className={aspect === "wide" ? "w-full" : "flex items-start gap-4"}>
        {/* Preview */}
        <div className={aspect === "wide" ? "mb-3" : ""}>
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className={previewClass} />
          ) : (
            <div className={emptyClass}>
              <span className="text-3xl">🖼️</span>
              <span className="text-xs text-center px-2">Belum ada gambar</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2 pt-1">
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
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-60 font-medium"
          >
            {uploading ? "⏳ Mengunggah..." : value ? "🔄 Ganti Gambar" : "⬆️ Unggah Gambar"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="px-4 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 border border-red-100"
            >
              🗑️ Hapus
            </button>
          )}
          {value && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm rounded-lg text-gray-500 hover:bg-gray-50 border border-gray-100 text-center"
            >
              🔗 Lihat full
            </a>
          )}
        </div>
      </div>

      <input
        type="url"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="atau tempel URL gambar dari internet"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
