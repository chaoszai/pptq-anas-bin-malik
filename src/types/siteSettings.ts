export interface PsbWave {
  id: string
  label: string
  period: string
}

export interface SiteSettings {
  siteName?: string
  siteFullName?: string
  tagline?: string
  logo?: string
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
  heroImage?: string
  aboutText?: string
  aboutImage?: string
  psbWaves?: PsbWave[]
  posterPsb?: string
}
