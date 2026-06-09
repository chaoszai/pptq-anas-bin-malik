export interface SiteSettings {
  _id?: string
  siteName?: string
  siteFullName?: string
  tagline?: string
  logo?: { asset?: { url?: string } }
  tahunBerdiri?: string
  pengasuh?: string
  skYayasan?: string
  npsn?: string
  phone?: string
  whatsapp?: string
  email?: string
  address?: string
  city?: string
  mapsUrl?: string
  instagram?: string
  youtube?: string
  facebook?: string
  tiktok?: string
  totalSantri?: number
  alumniHuffazh?: number
  programCount?: number
  heroHeading?: string
  heroSubheading?: string
  heroImage?: { asset?: { url?: string } }
  aboutText?: string
  aboutImage?: { asset?: { url?: string } }
  psbWaves?: Array<{ id: string; label: string; period: string }>
}
