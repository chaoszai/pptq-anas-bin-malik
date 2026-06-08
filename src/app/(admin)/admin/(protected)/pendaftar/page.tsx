import { getPendaftar } from "@/app/actions/admin"
import { STATUS_LABELS, STATUS_COLORS } from "@/types/santri"
import FilterBar from "@/components/admin/FilterBar"
import Link from "next/link"

interface PageProps {
  searchParams: Promise<{ gelombang?: string; status?: string; search?: string }>
}

export const metadata = { title: "Pendaftar | Admin PPTQ" }

export default async function PendaftarPage({ searchParams }: PageProps) {
  const params = await searchParams
  const data = await getPendaftar(params)

  const stats = {
    total: data.length,
    menunggu: data.filter((d) => d.status === "menunggu").length,
    diterima: data.filter((d) => d.status === "diterima").length,
    ditolak: data.filter((d) => d.status === "ditolak").length,
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Pendaftar</h1>
        <p className="text-gray-500 text-sm mt-1">Penerimaan Santri Baru PPTQ Anas Bin Malik</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: stats.total, color: "bg-blue-50 text-blue-700 border-blue-200" },
          { label: "Menunggu", value: stats.menunggu, color: "bg-amber-50 text-amber-700 border-amber-200" },
          { label: "Diterima", value: stats.diterima, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
          { label: "Ditolak", value: stats.ditolak, color: "bg-red-50 text-red-700 border-red-200" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl border p-4 ${stat.color}`}>
            <p className="text-sm font-medium opacity-70">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <FilterBar current={params} />

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-4">
        {data.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p>Belum ada data pendaftar</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">No. Pendaftaran</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Nama Calon Santri</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Gelombang</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Tanggal Daftar</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.no_pendaftaran}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{p.nama_lengkap}</p>
                      <p className="text-xs text-gray-400">{p.nama_panggilan || "—"}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.gelombang}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[p.status]}`}>
                        {STATUS_LABELS[p.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(p.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/pendaftar/${p.id}`}
                        className="text-emerald-700 hover:text-emerald-900 font-medium text-xs"
                      >
                        Detail →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
