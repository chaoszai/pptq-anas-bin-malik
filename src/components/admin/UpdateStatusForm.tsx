"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateStatus } from "@/app/actions/admin"
import { STATUS_LABELS, type StatusPendaftaran } from "@/types/santri"

const ALL_STATUS = Object.entries(STATUS_LABELS) as [StatusPendaftaran, string][]

interface Props {
  id: string
  currentStatus: StatusPendaftaran
  currentCatatan: string
}

export default function UpdateStatusForm({ id, currentStatus, currentCatatan }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState<StatusPendaftaran>(currentStatus)
  const [catatan, setCatatan] = useState(currentCatatan)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const result = await updateStatus(id, status, catatan)
    setLoading(false)
    if (result.success) {
      setMessage({ type: "ok", text: "Status berhasil diupdate" })
      router.refresh()
    } else {
      setMessage({ type: "err", text: result.error ?? "Terjadi kesalahan" })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusPendaftaran)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          {ALL_STATUS.map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Catatan Admin</label>
        <textarea
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          rows={4}
          placeholder="Catatan untuk pendaftar (opsional)..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
      </div>

      {message && (
        <p
          className={`text-sm rounded-lg px-3 py-2 ${
            message.type === "ok"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-60"
        style={{ backgroundColor: "var(--color-emerald-deep)" }}
      >
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  )
}
