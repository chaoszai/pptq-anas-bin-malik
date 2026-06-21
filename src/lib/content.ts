import "server-only"
import pool from "@/lib/db"
import type { SiteSettings, PsbWave } from "@/types/siteSettings"
import type {
  Artikel,
  Kategori,
  GaleriAlbum,
  GaleriImage,
  Program,
  Pengurus,
  Fasilitas,
  Testimoni,
  EventItem,
  SeoFields,
} from "@/types/content"

/* eslint-disable @typescript-eslint/no-explicit-any */

// ============ Site Settings ============
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { rows } = await pool.query("SELECT * FROM site_settings WHERE id = 1")
    const r = rows[0]
    if (!r) return {}
    return {
      siteName: r.site_name ?? undefined,
      siteFullName: r.site_full_name ?? undefined,
      tagline: r.tagline ?? undefined,
      logo: r.logo_url ?? undefined,
      tahunBerdiri: r.tahun_berdiri ?? undefined,
      pengasuh: r.pengasuh ?? undefined,
      skYayasan: r.sk_yayasan ?? undefined,
      npsn: r.npsn ?? undefined,
      phone: r.phone ?? undefined,
      whatsapp: r.whatsapp ?? undefined,
      email: r.email ?? undefined,
      address: r.address ?? undefined,
      city: r.city ?? undefined,
      mapsUrl: r.maps_url ?? undefined,
      instagram: r.instagram ?? undefined,
      youtube: r.youtube ?? undefined,
      facebook: r.facebook ?? undefined,
      tiktok: r.tiktok ?? undefined,
      totalSantri: r.total_santri ?? undefined,
      alumniHuffazh: r.alumni_huffazh ?? undefined,
      programCount: r.program_count ?? undefined,
      heroHeading: r.hero_heading ?? undefined,
      heroSubheading: r.hero_subheading ?? undefined,
      heroImage: r.hero_image_url ?? undefined,
      aboutText: r.about_text ?? undefined,
      aboutImage: r.about_image_url ?? undefined,
      psbWaves: (r.psb_waves as PsbWave[]) ?? [],
      posterPsb: r.poster_psb ?? undefined,
    }
  } catch {
    return {}
  }
}

// ============ Page Content (key-value) ============
export async function getPageContent<T = Record<string, any>>(
  key: string
): Promise<T | null> {
  try {
    const { rows } = await pool.query("SELECT data FROM page_content WHERE key = $1", [key])
    return (rows[0]?.data as T) ?? null
  } catch {
    return null
  }
}

// ============ Text Overrides (editor visual) ============
export async function getTextOverrides(): Promise<Record<string, string>> {
  const data = await getPageContent<Record<string, string>>("text-overrides")
  return data ?? {}
}

// ============ Kategori ============
function mapKategori(r: any): Kategori {
  return { id: r.id, title: r.title, slug: r.slug, color: r.color ?? undefined }
}
export async function getKategoriList(): Promise<Kategori[]> {
  try {
    const { rows } = await pool.query("SELECT * FROM kategori ORDER BY title ASC")
    return rows.map(mapKategori)
  } catch {
    return []
  }
}

// ============ Artikel ============
function mapArtikel(r: any): Artikel {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt ?? undefined,
    bodyHtml: r.body_html ?? undefined,
    thumbnailUrl: r.thumbnail_url ?? undefined,
    kategoriId: r.kategori_id ?? null,
    kategori: r.kategori_title
      ? { id: r.kategori_id, title: r.kategori_title, slug: r.kategori_slug, color: r.kategori_color ?? undefined }
      : null,
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : null,
    featured: !!r.featured,
    seo: (r.seo as SeoFields) ?? {},
    createdAt: new Date(r.created_at).toISOString(),
  }
}
const ARTIKEL_SELECT = `
  SELECT a.*, k.title AS kategori_title, k.slug AS kategori_slug, k.color AS kategori_color
  FROM artikel a LEFT JOIN kategori k ON k.id = a.kategori_id
`
export async function getArtikelList(): Promise<Artikel[]> {
  try {
    const { rows } = await pool.query(
      `${ARTIKEL_SELECT} ORDER BY COALESCE(a.published_at, a.created_at) DESC`
    )
    return rows.map(mapArtikel)
  } catch {
    return []
  }
}
export async function getLatestArtikel(limit = 3): Promise<Artikel[]> {
  try {
    const { rows } = await pool.query(
      `${ARTIKEL_SELECT} WHERE a.published_at IS NOT NULL ORDER BY a.published_at DESC LIMIT $1`,
      [limit]
    )
    return rows.map(mapArtikel)
  } catch {
    return []
  }
}
export async function getArtikelBySlug(slug: string): Promise<Artikel | null> {
  try {
    const { rows } = await pool.query(`${ARTIKEL_SELECT} WHERE a.slug = $1 LIMIT 1`, [slug])
    return rows[0] ? mapArtikel(rows[0]) : null
  } catch {
    return null
  }
}
export async function getArtikelById(id: string): Promise<Artikel | null> {
  try {
    const { rows } = await pool.query(`${ARTIKEL_SELECT} WHERE a.id = $1 LIMIT 1`, [id])
    return rows[0] ? mapArtikel(rows[0]) : null
  } catch {
    return null
  }
}

// ============ Galeri ============
function mapGaleriImage(r: any): GaleriImage {
  return {
    id: r.id,
    galeriId: r.galeri_id,
    url: r.url,
    caption: r.caption ?? undefined,
    alt: r.alt ?? undefined,
    order: r.order ?? 0,
  }
}
export async function getGaleriAlbums(): Promise<GaleriAlbum[]> {
  try {
    const { rows: albums } = await pool.query(
      "SELECT * FROM galeri ORDER BY date DESC NULLS LAST, created_at DESC"
    )
    if (albums.length === 0) return []
    const ids = albums.map((a) => a.id)
    const { rows: imgs } = await pool.query(
      `SELECT * FROM galeri_image WHERE galeri_id = ANY($1::uuid[]) ORDER BY "order" ASC`,
      [ids]
    )
    return albums.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug ?? undefined,
      kategori: a.kategori ?? undefined,
      date: a.date ? new Date(a.date).toISOString() : null,
      images: imgs.filter((i) => i.galeri_id === a.id).map(mapGaleriImage),
    }))
  } catch {
    return []
  }
}
export async function getGaleriById(id: string): Promise<GaleriAlbum | null> {
  try {
    const { rows } = await pool.query("SELECT * FROM galeri WHERE id = $1", [id])
    const a = rows[0]
    if (!a) return null
    const { rows: imgs } = await pool.query(
      `SELECT * FROM galeri_image WHERE galeri_id = $1 ORDER BY "order" ASC`,
      [id]
    )
    return {
      id: a.id,
      title: a.title,
      slug: a.slug ?? undefined,
      kategori: a.kategori ?? undefined,
      date: a.date ? new Date(a.date).toISOString() : null,
      images: imgs.map(mapGaleriImage),
    }
  } catch {
    return null
  }
}

// ============ Program ============
function mapProgram(r: any): Program {
  return {
    id: r.id,
    title: r.title,
    arabicTitle: r.arabic_title ?? undefined,
    roman: r.roman ?? undefined,
    slug: r.slug ?? undefined,
    description: r.description ?? undefined,
    bodyHtml: r.body_html ?? undefined,
    iconUrl: r.icon_url ?? undefined,
    order: r.order ?? 0,
  }
}
export async function getProgramList(): Promise<Program[]> {
  try {
    const { rows } = await pool.query(`SELECT * FROM program ORDER BY "order" ASC`)
    return rows.map(mapProgram)
  } catch {
    return []
  }
}

// ============ Pengurus ============
function mapPengurus(r: any): Pengurus {
  return {
    id: r.id,
    name: r.name,
    jabatan: r.jabatan,
    photoUrl: r.photo_url ?? undefined,
    order: r.order ?? 0,
  }
}
export async function getPengurusList(): Promise<Pengurus[]> {
  try {
    const { rows } = await pool.query(`SELECT * FROM pengurus ORDER BY "order" ASC`)
    return rows.map(mapPengurus)
  } catch {
    return []
  }
}

// ============ Fasilitas ============
function mapFasilitas(r: any): Fasilitas {
  return {
    id: r.id,
    title: r.title,
    description: r.description ?? undefined,
    icon: r.icon ?? undefined,
    photos: (r.photos as string[]) ?? [],
    order: r.order ?? 0,
  }
}
export async function getFasilitasList(): Promise<Fasilitas[]> {
  try {
    const { rows } = await pool.query(`SELECT * FROM fasilitas ORDER BY "order" ASC`)
    return rows.map(mapFasilitas)
  } catch {
    return []
  }
}

// ============ Testimoni ============
function mapTestimoni(r: any): Testimoni {
  return {
    id: r.id,
    name: r.name,
    role: r.role ?? undefined,
    photoUrl: r.photo_url ?? undefined,
    quote: r.quote,
    rating: r.rating ?? 5,
    order: r.order ?? 0,
  }
}
export async function getTestimoniList(): Promise<Testimoni[]> {
  try {
    const { rows } = await pool.query(`SELECT * FROM testimoni ORDER BY "order" ASC`)
    return rows.map(mapTestimoni)
  } catch {
    return []
  }
}

// ============ Event ============
function mapEvent(r: any): EventItem {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug ?? undefined,
    description: r.description ?? undefined,
    thumbnailUrl: r.thumbnail_url ?? undefined,
    startDate: r.start_date ? new Date(r.start_date).toISOString() : null,
    endDate: r.end_date ? new Date(r.end_date).toISOString() : null,
    location: r.location ?? undefined,
    isOnline: !!r.is_online,
    registrationUrl: r.registration_url ?? undefined,
    createdAt: new Date(r.created_at).toISOString(),
  }
}
export async function getEventList(): Promise<EventItem[]> {
  try {
    const { rows } = await pool.query("SELECT * FROM event ORDER BY start_date DESC NULLS LAST")
    return rows.map(mapEvent)
  } catch {
    return []
  }
}
export async function getEventById(id: string): Promise<EventItem | null> {
  try {
    const { rows } = await pool.query("SELECT * FROM event WHERE id = $1", [id])
    return rows[0] ? mapEvent(rows[0]) : null
  } catch {
    return null
  }
}
