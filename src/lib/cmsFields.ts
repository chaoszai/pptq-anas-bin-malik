// Registry field "khusus" yang butuh panel: gambar, angka, dan teks
// animasi/terstruktur yang tak cocok diedit inline.
// Teks biasa lainnya ditangani lewat edit inline generik (klik teks apa saja).
export type CmsKind = "text" | "textarea" | "number" | "image"

export interface CmsFieldDef {
  label: string
  kind: CmsKind
  hint?: string
}

export const CMS_FIELDS: Record<string, CmsFieldDef> = {
  logo: { label: "Logo Pondok", kind: "image", hint: "Muncul di navbar, hero, & footer" },
  heroImage: { label: "Gambar Latar Hero", kind: "image", hint: "Background banner paling atas" },
  aboutImage: { label: "Foto Pondok (Tentang)", kind: "image" },
  totalSantri: { label: "Jumlah Santri Aktif", kind: "number" },
  alumniHuffazh: { label: "Jumlah Alumni Huffazh", kind: "number" },
  heroHeading: { label: "Judul Utama (Hero)", kind: "text", hint: "Teks besar di banner paling atas" },
  heroSubheading: { label: "Kalimat di bawah judul", kind: "textarea" },
  siteName: { label: "Nama Singkat Pondok", kind: "text", hint: "Muncul di navbar" },
  aboutText: { label: "Teks Tentang Pondok", kind: "textarea" },
}

export function cmsField(key: string): CmsFieldDef | undefined {
  return CMS_FIELDS[key]
}
