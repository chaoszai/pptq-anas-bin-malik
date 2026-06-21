"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { SiteSettings, PsbWave } from "@/types/siteSettings"
import { saveSiteSettings } from "@/app/actions/content"
import { Input, Textarea, Btn, PageHeader } from "@/components/admin/ui"
import { ImageUpload } from "@/components/admin/ImageUpload"

const PREVIEW_PAGES = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/profil" },
  { label: "PSB", path: "/psb" },
  { label: "Kontak", path: "/kontak" },
]

export function KontenForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter()
  const [s, setS] = useState<SiteSettings>(initial)
  const [waves, setWaves] = useState<PsbWave[]>(initial.psbWaves ?? [])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [previewPage, setPreviewPage] = useState("/")

  function set<K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) {
    setS((prev) => ({ ...prev, [k]: v }))
  }
  function num(v: string): number | undefined {
    return v === "" ? undefined : Number(v)
  }

  async function submit() {
    setSaving(true)
    setSaved(false)
    try {
      await saveSiteSettings({ ...s, psbWaves: waves })
      setSaved(true)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <h2 className="font-semibold text-gray-900">{title}</h2>
      {children}
    </div>
  )

  return (
    <div className="flex h-full min-h-screen">
      {/* Form kiri */}
      <div className="flex-1 p-8 overflow-y-auto max-w-2xl">
        <PageHeader
          title="Konten Web"
          action={
            <div className="flex items-center gap-3">
              {saved && <span className="text-sm text-emerald-600">✓ Tersimpan</span>}
              <Btn onClick={submit} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Btn>
            </div>
          }
        />
        <p className="text-sm text-gray-400 mb-6">Isi form di bawah lalu klik <strong>Simpan</strong>. Lihat hasilnya di panel kanan →</p>

        <div className="space-y-6">
          <Section title="🏫 Identitas Pondok">
            <Input label="Nama Singkat (misal: PPTQ ABM)" value={s.siteName ?? ""} onChange={(e) => set("siteName", e.target.value)} />
            <Input label="Nama Lengkap" value={s.siteFullName ?? ""} onChange={(e) => set("siteFullName", e.target.value)} />
            <Input label="Tagline / Slogan" value={s.tagline ?? ""} onChange={(e) => set("tagline", e.target.value)} />
            <ImageUpload
              label="Logo Pondok"
              hint="Muncul di pojok kiri atas navbar semua halaman"
              value={s.logo}
              onChange={(v) => set("logo", v)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Tahun Berdiri" value={s.tahunBerdiri ?? ""} onChange={(e) => set("tahunBerdiri", e.target.value)} />
              <Input label="Nama Pengasuh" value={s.pengasuh ?? ""} onChange={(e) => set("pengasuh", e.target.value)} />
              <Input label="SK Yayasan" value={s.skYayasan ?? ""} onChange={(e) => set("skYayasan", e.target.value)} />
              <Input label="NPSN" value={s.npsn ?? ""} onChange={(e) => set("npsn", e.target.value)} />
            </div>
          </Section>

          <Section title="📞 Kontak">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Telepon" value={s.phone ?? ""} onChange={(e) => set("phone", e.target.value)} />
              <Input label="WhatsApp (format: 628xxx)" value={s.whatsapp ?? ""} onChange={(e) => set("whatsapp", e.target.value)} />
              <Input label="Email" value={s.email ?? ""} onChange={(e) => set("email", e.target.value)} />
              <Input label="Kota" value={s.city ?? ""} onChange={(e) => set("city", e.target.value)} />
            </div>
            <Textarea label="Alamat Lengkap" rows={2} value={s.address ?? ""} onChange={(e) => set("address", e.target.value)} />
            <Input label="Link Google Maps" value={s.mapsUrl ?? ""} onChange={(e) => set("mapsUrl", e.target.value)} />
            <p className="text-xs text-gray-400">Info kontak ini muncul di halaman <strong>Kontak</strong> dan <strong>Lokasi</strong>.</p>
          </Section>

          <Section title="📱 Media Sosial">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Instagram (URL lengkap)" value={s.instagram ?? ""} onChange={(e) => set("instagram", e.target.value)} />
              <Input label="YouTube (URL lengkap)" value={s.youtube ?? ""} onChange={(e) => set("youtube", e.target.value)} />
              <Input label="Facebook (URL lengkap)" value={s.facebook ?? ""} onChange={(e) => set("facebook", e.target.value)} />
              <Input label="TikTok (URL lengkap)" value={s.tiktok ?? ""} onChange={(e) => set("tiktok", e.target.value)} />
            </div>
          </Section>

          <Section title="📊 Statistik (angka di beranda)">
            <div className="grid grid-cols-3 gap-4">
              <Input label="Total Santri" type="number" value={s.totalSantri ?? ""} onChange={(e) => set("totalSantri", num(e.target.value))} />
              <Input label="Alumni Huffazh" type="number" value={s.alumniHuffazh ?? ""} onChange={(e) => set("alumniHuffazh", num(e.target.value))} />
              <Input label="Jumlah Program" type="number" value={s.programCount ?? ""} onChange={(e) => set("programCount", num(e.target.value))} />
            </div>
            <p className="text-xs text-gray-400">Ditampilkan sebagai angka besar di bagian tengah halaman beranda.</p>
          </Section>

          <Section title="🖼️ Hero (Banner Utama Beranda)">
            <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">Ini adalah bagian paling atas halaman beranda — teks besar dan gambar latar belakang yang pertama dilihat pengunjung.</p>
            <Input label="Judul Utama (Headline)" value={s.heroHeading ?? ""} onChange={(e) => set("heroHeading", e.target.value)} />
            <Textarea label="Kalimat di bawah judul (Subheading)" rows={2} value={s.heroSubheading ?? ""} onChange={(e) => set("heroSubheading", e.target.value)} />
            <ImageUpload
              label="Foto/Gambar Latar Hero"
              hint="Gambar besar di bagian paling atas halaman beranda (disarankan landscape / 16:9)"
              aspect="wide"
              value={s.heroImage}
              onChange={(v) => set("heroImage", v)}
            />
          </Section>

          <Section title="📖 Tentang Pondok (Bagian About Beranda)">
            <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">Teks dan foto di bagian &quot;Tentang Kami&quot; yang muncul di bawah hero halaman beranda.</p>
            <Textarea label="Teks Tentang Pondok" rows={4} value={s.aboutText ?? ""} onChange={(e) => set("aboutText", e.target.value)} />
            <ImageUpload
              label="Foto Pondok (bagian About)"
              hint="Foto yang muncul di samping teks 'Tentang Kami' di halaman beranda"
              aspect="wide"
              value={s.aboutImage}
              onChange={(v) => set("aboutImage", v)}
            />
          </Section>

          <Section title="📋 PSB / Pendaftaran Santri Baru">
            <ImageUpload
              label="Poster PPDB (Brosur/Flyer Pendaftaran)"
              hint="Gambar poster/brosur yang ditampilkan di halaman PSB agar calon santri bisa lihat info lengkap"
              aspect="tall"
              value={s.posterPsb}
              onChange={(v) => set("posterPsb", v)}
            />
            <p className="text-xs text-gray-400 bg-amber-50 px-3 py-2 rounded-lg">
              💡 Untuk mengubah teks syarat pendaftaran, alur, dan dokumen → buka menu <strong>Halaman Statis → PSB</strong>
            </p>
          </Section>

          <Section title="🌊 Gelombang PSB (Jadwal Penerimaan)">
            <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">Daftar gelombang pendaftaran yang tampil di halaman PSB. Gelombang ke-2 (baris tengah) ditandai sebagai &quot;Sedang Berjalan&quot;.</p>
            {waves.map((w, i) => (
              <div key={i} className="flex gap-2 items-end p-3 bg-gray-50 rounded-lg">
                <Input label={`Gelombang ${i + 1} — ID`} value={w.id} onChange={(e) => setWaves(waves.map((x, j) => j === i ? { ...x, id: e.target.value } : x))} />
                <Input label="Label (misal: Gelombang I)" value={w.label} onChange={(e) => setWaves(waves.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
                <Input label="Periode (misal: Jan–Mar 2026)" value={w.period} onChange={(e) => setWaves(waves.map((x, j) => j === i ? { ...x, period: e.target.value } : x))} />
                <Btn variant="danger" onClick={() => setWaves(waves.filter((_, j) => j !== i))}>Hapus</Btn>
              </div>
            ))}
            <Btn variant="ghost" onClick={() => setWaves([...waves, { id: `gel${waves.length + 1}`, label: "", period: "" }])}>+ Tambah Gelombang</Btn>
          </Section>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-emerald-600">✓ Tersimpan</span>}
            <Btn onClick={submit} disabled={saving}>{saving ? "Menyimpan..." : "Simpan Semua"}</Btn>
          </div>
        </div>
      </div>

      {/* Panel preview kanan */}
      <div className="hidden xl:flex flex-col w-[480px] border-l border-gray-100 bg-gray-50 sticky top-0 h-screen">
        <div className="p-3 border-b border-gray-100 bg-white flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-gray-500 mr-1">Preview:</span>
          {PREVIEW_PAGES.map((p) => (
            <button
              key={p.path}
              onClick={() => setPreviewPage(p.path)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                previewPage === p.path
                  ? "bg-emerald-700 text-white border-emerald-700"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => {
              const iframe = document.getElementById("site-preview") as HTMLIFrameElement
              if (iframe) iframe.src = iframe.src
            }}
            className="ml-auto text-xs text-gray-400 hover:text-gray-600 px-2"
            title="Refresh preview setelah simpan"
          >
            🔄
          </button>
        </div>
        <div className="flex-1 relative">
          <iframe
            id="site-preview"
            src={previewPage}
            className="w-full h-full border-0"
            style={{ transform: "scale(0.7)", transformOrigin: "top left", width: "143%", height: "143%" }}
          />
        </div>
        <div className="p-2 text-center border-t border-gray-100 bg-white">
          <p className="text-[10px] text-gray-400">Klik 🔄 setelah simpan untuk melihat perubahan</p>
        </div>
      </div>
    </div>
  )
}
