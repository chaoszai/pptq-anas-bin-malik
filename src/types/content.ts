export interface SeoFields {
  title?: string
  description?: string
  ogImage?: string
}

export interface Kategori {
  id: string
  title: string
  slug: string
  color?: string
}

export interface Artikel {
  id: string
  title: string
  slug: string
  excerpt?: string
  bodyHtml?: string
  thumbnailUrl?: string
  kategoriId?: string | null
  kategori?: Kategori | null
  publishedAt?: string | null
  featured: boolean
  seo?: SeoFields
  createdAt: string
}

export interface GaleriImage {
  id: string
  galeriId: string
  url: string
  caption?: string
  alt?: string
  order: number
}

export interface GaleriAlbum {
  id: string
  title: string
  slug?: string
  kategori?: string
  date?: string | null
  images: GaleriImage[]
}

export interface Program {
  id: string
  title: string
  arabicTitle?: string
  roman?: string
  slug?: string
  description?: string
  bodyHtml?: string
  iconUrl?: string
  order: number
}

export interface Pengurus {
  id: string
  name: string
  jabatan: string
  photoUrl?: string
  order: number
}

export interface Fasilitas {
  id: string
  title: string
  description?: string
  icon?: string
  photos: string[]
  order: number
}

export interface Testimoni {
  id: string
  name: string
  role?: string
  photoUrl?: string
  quote: string
  rating: number
  order: number
}

export interface EventItem {
  id: string
  title: string
  slug?: string
  description?: string
  thumbnailUrl?: string
  startDate?: string | null
  endDate?: string | null
  location?: string
  isOnline: boolean
  registrationUrl?: string
  createdAt: string
}
