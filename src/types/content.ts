export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
  caption?: string
}

export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
}

export interface Artikel {
  _id: string
  _createdAt: string
  title: string
  slug: { current: string }
  excerpt?: string
  body: unknown[]
  thumbnail?: SanityImage
  kategori?: Kategori
  publishedAt: string
  featured?: boolean
  seo?: SeoFields
}

export interface Kategori {
  _id: string
  title: string
  slug: { current: string }
  color?: string
}

export interface Event {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  body?: unknown[]
  thumbnail?: SanityImage
  startDate: string
  endDate?: string
  location?: string
  isOnline?: boolean
  registrationUrl?: string
  seo?: SeoFields
}

export interface GaleriItem {
  _id: string
  title: string
  slug: { current: string }
  images: SanityImage[]
  kategori?: string
  date?: string
}

export interface Program {
  _id: string
  title: string
  arabicTitle?: string
  roman?: string
  slug: { current: string }
  description: string
  body?: unknown[]
  icon?: SanityImage
  order?: number
}

export interface Pengurus {
  _id: string
  name: string
  jabatan: string
  photo?: SanityImage
  order?: number
}

export interface Fasilitas {
  _id: string
  title: string
  description?: string
  icon?: string
  photos?: SanityImage[]
  order?: number
}

export interface Testimoni {
  _id: string
  name: string
  role?: string
  photo?: SanityImage
  quote: string
  rating?: number
}

export interface HomepageSettings {
  _id: string
  heroHeading?: string
  heroSubheading?: string
  heroImage?: SanityImage
  ctaText?: string
}
