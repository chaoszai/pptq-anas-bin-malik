"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import type { SiteSettings, PsbWave } from "@/types/siteSettings"
import { saveSiteSettings, saveTextOverrides } from "@/app/actions/content"
import { Input, Textarea, Btn } from "@/components/admin/ui"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { CMS_FIELDS } from "@/lib/cmsFields"

const PREVIEW_PAGES = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/profil" },
  { label: "PSB", path: "/psb" },
  { label: "Kontak", path: "/kontak" },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <h2 className="font-semibold text-gray-900">{title}</h2>
      {children}
    </div>
  )
}

export function KontenForm({
  initial,
  initialOverrides = {},
}: {
  initial: SiteSettings
  initialOverrides?: Record<string, string>
}) {
  const router = useRouter()
  const [s, setS] = useState<SiteSettings>(initial)
  const [waves, setWaves] = useState<PsbWave[]>(initial.psbWaves ?? [])
  const [overrides, setOverrides] = useState<Record<string, string>>(initialOverrides)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [previewPage, setPreviewPage] = useState("/")
  const [selected, setSelected] = useState<string | null>(null)
  const [showFull, setShowFull] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  function set<K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) {
    setS((prev) => ({ ...prev, [k]: v }))
  }
  function num(v: string): number | undefined {
    return v === "" ? undefined : Number(v)
  }

  const postToPreview = useCallback((field: string, value: unknown) => {
    iframeRef.current?.contentWindow?.postMessage(
      { __cms: true, type: "update", field, value },
      "*"
    )
  }, [])

  // Dengarkan klik elemen di dalam preview
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const d = e.data
      if (!d || !d.__cms) return
      if (d.type === "select" && CMS_FIELDS[d.field]) {
        setSelected(d.field)
        setShowFull(false)
      }
      if (d.type === "text-edit" && d.path) {
        setOverrides((prev) => ({ ...prev, [d.path]: d.value }))
        setSaved(false)
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  // Ubah nilai field terpilih → update state + preview real-time
  function editField(field: string, value: unknown) {
    setS((prev) => ({ ...prev, [field]: value }))
    postToPreview(field, value)
  }

  function reloadPreview() {
    if (iframeRef.current) {
      iframeRef.current.src = `${previewPage}?edit=1`
    }
  }

  async function submit() {
    setSaving(true)
    setSaved(false)
    try {
      await Promise.all([
        saveSiteSettings({ ...s, psbWaves: waves }),
        saveTextOverrides(overrides),
      ])
      setSaved(true)
      router.refresh()
      reloadPreview()
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  const def = selected ? CMS_FIELDS[selected] : null

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Toolbar atas */}
      <div className="shrink-0 flex items-center gap-3 px-5 py-3 bg-white border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900">Editor Visual</h1>
        <div className="flex items-center gap-1.5 ml-2">
          {PREVIEW_PAGES.map((p) => (
            <button
              key={p.path}
              onClick={() => {
                setPreviewPage(p.path)
                setSelected(null)
              }}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                previewPage === p.path
                  ? "bg-emerald-700 text-white border-emerald-700"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          {saved && <span className="text-sm text-emerald-600">✓ Tersimpan</span>}
          <button
            onClick={() => {
              setShowFull(true)
              setSelected(null)
            }}
            className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg border border-gray-200"
          >
            Edit Lengkap
          </button>
          <Btn onClick={submit} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Btn>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {/* Preview iframe */}
        <iframe
          ref={iframeRef}
          key={previewPage}
          src={`${previewPage}?edit=1`}
          className="w-full h-full border-0 bg-white"
        />

        {/* Hint awal */}
        {!selected && !showFull && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-sm px-4 py-2 rounded-full shadow-lg pointer-events-none">
            👆 Klik teks apa saja untuk langsung mengetik · klik gambar/angka untuk ganti
          </div>
        )}

        {/* Panel editor field terpilih */}
        {def && selected && (
          <div className="absolute top-4 right-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{def.label}</h3>
                {def.hint && <p className="text-xs text-gray-400 mt-0.5">{def.hint}</p>}
              </div>
              <button
                onClick={() => {
                  setSelected(null)
                  iframeRef.current?.contentWindow?.postMessage({ __cms: true, type: "deselect" }, "*")
                }}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {def.kind === "text" && (
              <Input
                autoFocus
                value={(s[selected as keyof SiteSettings] as string) ?? ""}
                onChange={(e) => editField(selected, e.target.value)}
              />
            )}
            {def.kind === "number" && (
              <Input
                type="number"
                autoFocus
                value={(s[selected as keyof SiteSettings] as number) ?? ""}
                onChange={(e) => editField(selected, num(e.target.value))}
              />
            )}
            {def.kind === "textarea" && (
              <Textarea
                autoFocus
                rows={4}
                value={(s[selected as keyof SiteSettings] as string) ?? ""}
                onChange={(e) => editField(selected, e.target.value)}
              />
            )}
            {def.kind === "image" && (
              <ImageUpload
                aspect="wide"
                value={s[selected as keyof SiteSettings] as string | undefined}
                onChange={(v) => editField(selected, v)}
              />
            )}

            <div className="flex items-center gap-2 pt-1">
              <Btn onClick={submit} disabled={saving} className="flex-1">
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </Btn>
            </div>
            <p className="text-[11px] text-gray-400">Perubahan tampil langsung di preview. Klik <strong>Simpan</strong> agar permanen.</p>
          </div>
        )}
      </div>

      {/* Drawer Edit Lengkap — semua kolom termasuk yg tak bisa diklik */}
      {showFull && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setShowFull(false)} />
          <div className="w-full max-w-xl bg-gray-50 h-full overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-900">Edit Lengkap</h2>
              <div className="flex items-center gap-3">
                {saved && <span className="text-sm text-emerald-600">✓ Tersimpan</span>}
                <Btn onClick={submit} disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Btn>
                <button onClick={() => setShowFull(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>
            </div>

            <div className="space-y-6">
              <Section title="🏫 Identitas Pondok">
                <Input label="Nama Singkat (misal: PPTQ ABM)" value={s.siteName ?? ""} onChange={(e) => set("siteName", e.target.value)} />
                <Input label="Nama Lengkap" value={s.siteFullName ?? ""} onChange={(e) => set("siteFullName", e.target.value)} />
                <Input label="Tagline / Slogan" value={s.tagline ?? ""} onChange={(e) => set("tagline", e.target.value)} />
                <ImageUpload label="Logo Pondok" hint="Muncul di pojok kiri atas navbar semua halaman" value={s.logo} onChange={(v) => set("logo", v)} />
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
              </Section>

              <Section title="🖼️ Hero (Banner Utama Beranda)">
                <Input label="Judul Utama (Headline)" value={s.heroHeading ?? ""} onChange={(e) => set("heroHeading", e.target.value)} />
                <Textarea label="Kalimat di bawah judul (Subheading)" rows={2} value={s.heroSubheading ?? ""} onChange={(e) => set("heroSubheading", e.target.value)} />
                <ImageUpload label="Foto/Gambar Latar Hero" aspect="wide" value={s.heroImage} onChange={(v) => set("heroImage", v)} />
              </Section>

              <Section title="📖 Tentang Pondok (Bagian About Beranda)">
                <Textarea label="Teks Tentang Pondok" rows={4} value={s.aboutText ?? ""} onChange={(e) => set("aboutText", e.target.value)} />
                <ImageUpload label="Foto Pondok (bagian About)" aspect="wide" value={s.aboutImage} onChange={(v) => set("aboutImage", v)} />
              </Section>

              <Section title="📋 PSB / Pendaftaran Santri Baru">
                <ImageUpload label="Poster PPDB (Brosur/Flyer Pendaftaran)" aspect="tall" value={s.posterPsb} onChange={(v) => set("posterPsb", v)} />
                <p className="text-xs text-gray-400 bg-amber-50 px-3 py-2 rounded-lg">💡 Untuk mengubah teks syarat pendaftaran → buka menu <strong>Halaman Statis → PSB</strong></p>
              </Section>

              <Section title="🌊 Gelombang PSB (Jadwal Penerimaan)">
                {waves.map((w, i) => (
                  <div key={i} className="flex gap-2 items-end p-3 bg-gray-50 rounded-lg">
                    <Input label={`Gelombang ${i + 1} — ID`} value={w.id} onChange={(e) => setWaves(waves.map((x, j) => j === i ? { ...x, id: e.target.value } : x))} />
                    <Input label="Label" value={w.label} onChange={(e) => setWaves(waves.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
                    <Input label="Periode" value={w.period} onChange={(e) => setWaves(waves.map((x, j) => j === i ? { ...x, period: e.target.value } : x))} />
                    <Btn variant="danger" onClick={() => setWaves(waves.filter((_, j) => j !== i))}>Hapus</Btn>
                  </div>
                ))}
                <Btn variant="ghost" onClick={() => setWaves([...waves, { id: `gel${waves.length + 1}`, label: "", period: "" }])}>+ Tambah Gelombang</Btn>
              </Section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
