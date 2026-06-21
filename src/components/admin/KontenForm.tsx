"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { SiteSettings, PsbWave } from "@/types/siteSettings"
import { saveSiteSettings } from "@/app/actions/content"
import { Input, Textarea, Btn, PageHeader } from "@/components/admin/ui"
import { ImageUpload } from "@/components/admin/ImageUpload"

export function KontenForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter()
  const [s, setS] = useState<SiteSettings>(initial)
  const [waves, setWaves] = useState<PsbWave[]>(initial.psbWaves ?? [])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

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
    <div className="p-8 max-w-3xl">
      <PageHeader
        title="Konten Web"
        action={
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-emerald-600">Tersimpan ✓</span>}
            <Btn onClick={submit} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Btn>
          </div>
        }
      />

      <div className="space-y-6">
        <Section title="Identitas">
          <Input label="Nama Singkat" value={s.siteName ?? ""} onChange={(e) => set("siteName", e.target.value)} />
          <Input label="Nama Lengkap" value={s.siteFullName ?? ""} onChange={(e) => set("siteFullName", e.target.value)} />
          <Input label="Tagline" value={s.tagline ?? ""} onChange={(e) => set("tagline", e.target.value)} />
          <ImageUpload label="Logo" value={s.logo} onChange={(v) => set("logo", v)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Tahun Berdiri" value={s.tahunBerdiri ?? ""} onChange={(e) => set("tahunBerdiri", e.target.value)} />
            <Input label="Pengasuh" value={s.pengasuh ?? ""} onChange={(e) => set("pengasuh", e.target.value)} />
            <Input label="SK Yayasan" value={s.skYayasan ?? ""} onChange={(e) => set("skYayasan", e.target.value)} />
            <Input label="NPSN" value={s.npsn ?? ""} onChange={(e) => set("npsn", e.target.value)} />
          </div>
        </Section>

        <Section title="Kontak">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Telepon" value={s.phone ?? ""} onChange={(e) => set("phone", e.target.value)} />
            <Input label="WhatsApp" value={s.whatsapp ?? ""} onChange={(e) => set("whatsapp", e.target.value)} />
            <Input label="Email" value={s.email ?? ""} onChange={(e) => set("email", e.target.value)} />
            <Input label="Kota" value={s.city ?? ""} onChange={(e) => set("city", e.target.value)} />
          </div>
          <Textarea label="Alamat" rows={2} value={s.address ?? ""} onChange={(e) => set("address", e.target.value)} />
          <Input label="Google Maps URL" value={s.mapsUrl ?? ""} onChange={(e) => set("mapsUrl", e.target.value)} />
        </Section>

        <Section title="Media Sosial">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Instagram" value={s.instagram ?? ""} onChange={(e) => set("instagram", e.target.value)} />
            <Input label="YouTube" value={s.youtube ?? ""} onChange={(e) => set("youtube", e.target.value)} />
            <Input label="Facebook" value={s.facebook ?? ""} onChange={(e) => set("facebook", e.target.value)} />
            <Input label="TikTok" value={s.tiktok ?? ""} onChange={(e) => set("tiktok", e.target.value)} />
          </div>
        </Section>

        <Section title="Statistik">
          <div className="grid grid-cols-3 gap-4">
            <Input label="Total Santri" type="number" value={s.totalSantri ?? ""} onChange={(e) => set("totalSantri", num(e.target.value))} />
            <Input label="Alumni Huffazh" type="number" value={s.alumniHuffazh ?? ""} onChange={(e) => set("alumniHuffazh", num(e.target.value))} />
            <Input label="Jumlah Program" type="number" value={s.programCount ?? ""} onChange={(e) => set("programCount", num(e.target.value))} />
          </div>
        </Section>

        <Section title="Hero (Beranda)">
          <Input label="Judul Hero" value={s.heroHeading ?? ""} onChange={(e) => set("heroHeading", e.target.value)} />
          <Textarea label="Subjudul Hero" rows={2} value={s.heroSubheading ?? ""} onChange={(e) => set("heroSubheading", e.target.value)} />
          <ImageUpload label="Gambar Hero" value={s.heroImage} onChange={(v) => set("heroImage", v)} />
        </Section>

        <Section title="Tentang (Beranda)">
          <Textarea label="Teks Tentang" rows={4} value={s.aboutText ?? ""} onChange={(e) => set("aboutText", e.target.value)} />
          <ImageUpload label="Gambar Tentang" value={s.aboutImage} onChange={(v) => set("aboutImage", v)} />
        </Section>

        <Section title="Gelombang PSB">
          {waves.map((w, i) => (
            <div key={i} className="flex gap-2 items-end">
              <Input label="ID" value={w.id} onChange={(e) => setWaves(waves.map((x, j) => j === i ? { ...x, id: e.target.value } : x))} />
              <Input label="Label" value={w.label} onChange={(e) => setWaves(waves.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
              <Input label="Periode" value={w.period} onChange={(e) => setWaves(waves.map((x, j) => j === i ? { ...x, period: e.target.value } : x))} />
              <Btn variant="danger" onClick={() => setWaves(waves.filter((_, j) => j !== i))}>Hapus</Btn>
            </div>
          ))}
          <Btn variant="ghost" onClick={() => setWaves([...waves, { id: "", label: "", period: "" }])}>+ Gelombang</Btn>
        </Section>
      </div>
    </div>
  )
}
