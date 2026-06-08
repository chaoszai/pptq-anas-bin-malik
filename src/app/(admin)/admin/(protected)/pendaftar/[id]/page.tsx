import { getPendaftarById } from "@/app/actions/admin"
import { STATUS_LABELS, STATUS_COLORS } from "@/types/santri"
import UpdateStatusForm from "@/components/admin/UpdateStatusForm"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const data = await getPendaftarById(id)
  return { title: data ? `${data.nama_lengkap} | Admin PPTQ` : "Tidak Ditemukan" }
}

export default async function DetailPendaftarPage({ params }: PageProps) {
  const { id } = await params
  const data = await getPendaftarById(id)

  if (!data) notFound()

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/pendaftar" className="text-sm text-gray-500 hover:text-gray-700">
          ← Kembali
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">{data.nama_lengkap}</span>
      </div>

      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{data.nama_lengkap}</h1>
          <p className="font-mono text-sm text-gray-400 mt-1">{data.no_pendaftaran}</p>
        </div>
        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[data.status]}`}>
          {STATUS_LABELS[data.status]}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Data Utama */}
        <div className="lg:col-span-2 space-y-6">
          {/* Data Santri */}
          <Section title="Data Calon Santri">
            <Row label="Nama Lengkap" value={data.nama_lengkap} />
            <Row label="Nama Panggilan" value={data.nama_panggilan} />
            <Row label="NIK" value={data.nik} />
            <Row label="Tempat Lahir" value={data.tempat_lahir} />
            <Row label="Tanggal Lahir" value={data.tanggal_lahir ? new Date(data.tanggal_lahir).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : undefined} />
            <Row label="Jenis Kelamin" value={data.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"} />
            <Row label="Alamat" value={data.alamat} />
            <Row label="Kota" value={[data.kota, data.provinsi].filter(Boolean).join(", ")} />
            <Row label="Kode Pos" value={data.kode_pos} />
            <Row label="Sekolah Asal" value={data.sekolah_asal} />
            <Row label="Hafalan Saat Ini" value={data.hafalan_saat_ini} />
            <Row label="HP Santri" value={data.no_hp_santri} />
          </Section>

          {/* Data Ortu */}
          <Section title="Data Orang Tua / Wali">
            <Row label="Nama Ayah" value={data.nama_ayah} />
            <Row label="Pekerjaan Ayah" value={data.pekerjaan_ayah} />
            <Row label="HP Ayah" value={data.no_hp_ayah} />
            <Row label="Penghasilan Ayah" value={data.penghasilan_ayah} />
            <Row label="Nama Ibu" value={data.nama_ibu} />
            <Row label="Pekerjaan Ibu" value={data.pekerjaan_ibu} />
            <Row label="HP Ibu" value={data.no_hp_ibu} />
          </Section>
        </div>

        {/* Sidebar: Update Status */}
        <div className="space-y-6">
          <Section title="PSB">
            <Row label="Gelombang" value={data.gelombang} />
            <Row
              label="Tanggal Daftar"
              value={new Date(data.created_at).toLocaleDateString("id-ID", {
                day: "numeric", month: "long", year: "numeric",
              })}
            />
          </Section>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Update Status</h2>
            <UpdateStatusForm
              id={data.id}
              currentStatus={data.status}
              currentCatatan={data.catatan_admin ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">{title}</h2>
      <dl className="space-y-3">{children}</dl>
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex gap-2 text-sm">
      <dt className="w-36 flex-shrink-0 text-gray-400">{label}</dt>
      <dd className="text-gray-800 font-medium">{value || <span className="text-gray-300 font-normal">—</span>}</dd>
    </div>
  )
}
