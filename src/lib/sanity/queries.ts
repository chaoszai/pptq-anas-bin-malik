import { groq } from "next-sanity"

export const artikelQuery = groq`
  *[_type == "artikel"] | order(publishedAt desc) {
    _id, _createdAt, title, slug, excerpt, thumbnail, publishedAt, featured,
    kategori->{ _id, title, slug, color }
  }
`

export const artikelBySlugQuery = groq`
  *[_type == "artikel" && slug.current == $slug][0] {
    _id, _createdAt, title, slug, excerpt, body, thumbnail, publishedAt,
    kategori->{ _id, title, slug, color },
    seo
  }
`

export const eventQuery = groq`
  *[_type == "event"] | order(startDate desc) {
    _id, title, slug, description, thumbnail, startDate, endDate, location, isOnline
  }
`

export const galeriQuery = groq`
  *[_type == "galeri"] | order(date desc, _createdAt desc) {
    _id, title, slug, kategori, date,
    images[] {
      _key,
      caption,
      alt,
      asset->{ _id, url, metadata { dimensions } }
    }
  }
`

export const programQuery = groq`
  *[_type == "program"] | order(order asc) {
    _id, title, arabicTitle, roman, slug, description, order
  }
`

export const penggurusQuery = groq`
  *[_type == "pengurus"] | order(order asc) {
    _id, name, jabatan, photo, order
  }
`

export const fasilitasQuery = groq`
  *[_type == "fasilitas"] | order(order asc) {
    _id, title, description, icon, photos, order
  }
`

export const testimoniQuery = groq`
  *[_type == "testimoni"] {
    _id, name, role, photo, quote, rating
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteName, siteFullName, tagline, logo,
    tahunBerdiri, pengasuh, skYayasan, npsn,
    phone, whatsapp, email, address, city, mapsUrl,
    instagram, youtube, facebook, tiktok,
    totalSantri, alumniHuffazh, programCount,
    heroHeading, heroSubheading, heroImage,
    aboutText, aboutImage,
    psbWaves
  }
`
