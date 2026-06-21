// Registry field yang bisa di-edit langsung lewat klik di preview (WYSIWYG).
// key harus sama dengan key di SiteSettings.
export type CmsKind = "text" | "textarea" | "number" | "image"

export interface CmsFieldDef {
  label: string
  kind: CmsKind
  hint?: string
}

export const CMS_FIELDS: Record<string, CmsFieldDef> = {
  siteName: { label: "Nama Singkat Pondok", kind: "text", hint: "Muncul di navbar & beberapa bagian beranda" },
  tagline: { label: "Tagline / Slogan", kind: "text" },
  heroHeading: { label: "Judul Utama (Hero)", kind: "text", hint: "Teks besar di banner paling atas" },
  heroSubheading: { label: "Kalimat di bawah judul", kind: "textarea" },
  totalSantri: { label: "Jumlah Santri Aktif", kind: "number" },
  alumniHuffazh: { label: "Jumlah Alumni Huffazh", kind: "number" },
  aboutText: { label: "Teks Tentang Pondok", kind: "textarea", hint: "Paragraf di bagian 'Tentang Kami'" },
  aboutImage: { label: "Foto Pondok (Tentang)", kind: "image" },
}

export function cmsField(key: string): CmsFieldDef | undefined {
  return CMS_FIELDS[key]
}
