"use client"

import { useState } from "react"
import { loginAdmin } from "@/app/actions/admin"

export default function LoginForm() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value
    const result = await loginAdmin(password)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Password Admin</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-shadow"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg text-white font-medium transition-colors disabled:opacity-60"
        style={{ backgroundColor: "var(--color-emerald-deep)" }}
      >
        {loading ? "Memverifikasi..." : "Masuk"}
      </button>
    </form>
  )
}
