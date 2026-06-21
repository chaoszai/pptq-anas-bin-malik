"use server"

import pool from "@/lib/db"
import { requireAdmin } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import slugify from "slugify"
import type { PsbWave } from "@/types/siteSettings"

function slug(input: string): string {
  return slugify(input, { lower: true, strict: true, locale: "id" })
}

function revalidateAll() {
  revalidatePath("/", "layout")
}

// ============ Site Settings ============
export async function saveSiteSettings(data: Record<string, unknown>) {
  await requireAdmin()
  const waves = Array.isArray(data.psbWaves) ? (data.psbWaves as PsbWave[]) : []
  await pool.query(
    `UPDATE site_settings SET
      site_name=$1, site_full_name=$2, tagline=$3, logo_url=$4,
      tahun_berdiri=$5, pengasuh=$6, sk_yayasan=$7, npsn=$8,
      phone=$9, whatsapp=$10, email=$11, address=$12, city=$13, maps_url=$14,
      instagram=$15, youtube=$16, facebook=$17, tiktok=$18,
      total_santri=$19, alumni_huffazh=$20, program_count=$21,
      hero_heading=$22, hero_subheading=$23, hero_image_url=$24,
      about_text=$25, about_image_url=$26, psb_waves=$27, poster_psb=$28, updated_at=now()
     WHERE id = 1`,
    [
      data.siteName ?? null, data.siteFullName ?? null, data.tagline ?? null, data.logo ?? null,
      data.tahunBerdiri ?? null, data.pengasuh ?? null, data.skYayasan ?? null, data.npsn ?? null,
      data.phone ?? null, data.whatsapp ?? null, data.email ?? null, data.address ?? null, data.city ?? null, data.mapsUrl ?? null,
      data.instagram ?? null, data.youtube ?? null, data.facebook ?? null, data.tiktok ?? null,
      data.totalSantri ?? null, data.alumniHuffazh ?? null, data.programCount ?? null,
      data.heroHeading ?? null, data.heroSubheading ?? null, data.heroImage ?? null,
      data.aboutText ?? null, data.aboutImage ?? null, JSON.stringify(waves), data.posterPsb ?? null,
    ]
  )
  revalidateAll()
}

// ============ Page Content ============
export async function savePageContent(key: string, data: Record<string, unknown>) {
  await requireAdmin()
  await pool.query(
    `INSERT INTO page_content (key, data, updated_at) VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [key, JSON.stringify(data)]
  )
  revalidateAll()
}

// ============ Kategori ============
export async function saveKategori(input: { id?: string; title: string; color?: string }) {
  await requireAdmin()
  const s = slug(input.title)
  if (input.id) {
    await pool.query("UPDATE kategori SET title=$1, slug=$2, color=$3 WHERE id=$4", [
      input.title, s, input.color ?? null, input.id,
    ])
  } else {
    await pool.query("INSERT INTO kategori (title, slug, color) VALUES ($1,$2,$3)", [
      input.title, s, input.color ?? null,
    ])
  }
  revalidateAll()
}
export async function deleteKategori(id: string) {
  await requireAdmin()
  await pool.query("DELETE FROM kategori WHERE id=$1", [id])
  revalidateAll()
}

// ============ Artikel ============
export async function saveArtikel(input: {
  id?: string
  title: string
  excerpt?: string
  bodyHtml?: string
  thumbnailUrl?: string
  kategoriId?: string | null
  published?: boolean
  featured?: boolean
  seo?: { title?: string; description?: string }
}) {
  await requireAdmin()
  const s = slug(input.title)
  const publishedAt = input.published ? new Date() : null
  if (input.id) {
    await pool.query(
      `UPDATE artikel SET title=$1, slug=$2, excerpt=$3, body_html=$4, thumbnail_url=$5,
        kategori_id=$6, featured=$7, seo=$8,
        published_at = CASE WHEN $9::boolean THEN COALESCE(published_at, now()) ELSE NULL END
       WHERE id=$10`,
      [
        input.title, s, input.excerpt ?? null, input.bodyHtml ?? null, input.thumbnailUrl ?? null,
        input.kategoriId || null, !!input.featured, JSON.stringify(input.seo ?? {}),
        !!input.published, input.id,
      ]
    )
  } else {
    await pool.query(
      `INSERT INTO artikel (title, slug, excerpt, body_html, thumbnail_url, kategori_id, featured, seo, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        input.title, s, input.excerpt ?? null, input.bodyHtml ?? null, input.thumbnailUrl ?? null,
        input.kategoriId || null, !!input.featured, JSON.stringify(input.seo ?? {}), publishedAt,
      ]
    )
  }
  revalidateAll()
}
export async function deleteArtikel(id: string) {
  await requireAdmin()
  await pool.query("DELETE FROM artikel WHERE id=$1", [id])
  revalidateAll()
}

// ============ Galeri ============
export async function saveGaleriAlbum(input: {
  id?: string
  title: string
  kategori?: string
  date?: string | null
  images: { url: string; caption?: string; alt?: string }[]
}) {
  await requireAdmin()
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    let albumId = input.id
    if (albumId) {
      await client.query("UPDATE galeri SET title=$1, slug=$2, kategori=$3, date=$4 WHERE id=$5", [
        input.title, slug(input.title), input.kategori ?? null, input.date || null, albumId,
      ])
      await client.query("DELETE FROM galeri_image WHERE galeri_id=$1", [albumId])
    } else {
      const { rows } = await client.query(
        "INSERT INTO galeri (title, slug, kategori, date) VALUES ($1,$2,$3,$4) RETURNING id",
        [input.title, slug(input.title), input.kategori ?? null, input.date || null]
      )
      albumId = rows[0].id
    }
    for (let i = 0; i < input.images.length; i++) {
      const img = input.images[i]
      await client.query(
        `INSERT INTO galeri_image (galeri_id, url, caption, alt, "order") VALUES ($1,$2,$3,$4,$5)`,
        [albumId, img.url, img.caption ?? null, img.alt ?? null, i]
      )
    }
    await client.query("COMMIT")
  } catch (e) {
    await client.query("ROLLBACK")
    throw e
  } finally {
    client.release()
  }
  revalidateAll()
}
export async function deleteGaleriAlbum(id: string) {
  await requireAdmin()
  await pool.query("DELETE FROM galeri WHERE id=$1", [id])
  revalidateAll()
}

// ============ Program ============
export async function saveProgram(input: {
  id?: string
  title: string
  arabicTitle?: string
  roman?: string
  description?: string
  bodyHtml?: string
  iconUrl?: string
  order?: number
}) {
  await requireAdmin()
  const s = slug(input.title)
  if (input.id) {
    await pool.query(
      `UPDATE program SET title=$1, arabic_title=$2, roman=$3, slug=$4, description=$5, body_html=$6, icon_url=$7, "order"=$8 WHERE id=$9`,
      [input.title, input.arabicTitle ?? null, input.roman ?? null, s, input.description ?? null, input.bodyHtml ?? null, input.iconUrl ?? null, input.order ?? 0, input.id]
    )
  } else {
    await pool.query(
      `INSERT INTO program (title, arabic_title, roman, slug, description, body_html, icon_url, "order") VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [input.title, input.arabicTitle ?? null, input.roman ?? null, s, input.description ?? null, input.bodyHtml ?? null, input.iconUrl ?? null, input.order ?? 0]
    )
  }
  revalidateAll()
}
export async function deleteProgram(id: string) {
  await requireAdmin()
  await pool.query("DELETE FROM program WHERE id=$1", [id])
  revalidateAll()
}

// ============ Pengurus ============
export async function savePengurus(input: { id?: string; name: string; jabatan: string; photoUrl?: string; order?: number }) {
  await requireAdmin()
  if (input.id) {
    await pool.query(`UPDATE pengurus SET name=$1, jabatan=$2, photo_url=$3, "order"=$4 WHERE id=$5`, [
      input.name, input.jabatan, input.photoUrl ?? null, input.order ?? 0, input.id,
    ])
  } else {
    await pool.query(`INSERT INTO pengurus (name, jabatan, photo_url, "order") VALUES ($1,$2,$3,$4)`, [
      input.name, input.jabatan, input.photoUrl ?? null, input.order ?? 0,
    ])
  }
  revalidateAll()
}
export async function deletePengurus(id: string) {
  await requireAdmin()
  await pool.query("DELETE FROM pengurus WHERE id=$1", [id])
  revalidateAll()
}

// ============ Fasilitas ============
export async function saveFasilitas(input: { id?: string; title: string; description?: string; icon?: string; photos?: string[]; order?: number }) {
  await requireAdmin()
  const photos = JSON.stringify(input.photos ?? [])
  if (input.id) {
    await pool.query(`UPDATE fasilitas SET title=$1, description=$2, icon=$3, photos=$4, "order"=$5 WHERE id=$6`, [
      input.title, input.description ?? null, input.icon ?? null, photos, input.order ?? 0, input.id,
    ])
  } else {
    await pool.query(`INSERT INTO fasilitas (title, description, icon, photos, "order") VALUES ($1,$2,$3,$4,$5)`, [
      input.title, input.description ?? null, input.icon ?? null, photos, input.order ?? 0,
    ])
  }
  revalidateAll()
}
export async function deleteFasilitas(id: string) {
  await requireAdmin()
  await pool.query("DELETE FROM fasilitas WHERE id=$1", [id])
  revalidateAll()
}

// ============ Testimoni ============
export async function saveTestimoni(input: { id?: string; name: string; role?: string; photoUrl?: string; quote: string; rating?: number; order?: number }) {
  await requireAdmin()
  if (input.id) {
    await pool.query(`UPDATE testimoni SET name=$1, role=$2, photo_url=$3, quote=$4, rating=$5, "order"=$6 WHERE id=$7`, [
      input.name, input.role ?? null, input.photoUrl ?? null, input.quote, input.rating ?? 5, input.order ?? 0, input.id,
    ])
  } else {
    await pool.query(`INSERT INTO testimoni (name, role, photo_url, quote, rating, "order") VALUES ($1,$2,$3,$4,$5,$6)`, [
      input.name, input.role ?? null, input.photoUrl ?? null, input.quote, input.rating ?? 5, input.order ?? 0,
    ])
  }
  revalidateAll()
}
export async function deleteTestimoni(id: string) {
  await requireAdmin()
  await pool.query("DELETE FROM testimoni WHERE id=$1", [id])
  revalidateAll()
}

// ============ Event ============
export async function saveEvent(input: {
  id?: string
  title: string
  description?: string
  thumbnailUrl?: string
  startDate?: string | null
  endDate?: string | null
  location?: string
  isOnline?: boolean
  registrationUrl?: string
}) {
  await requireAdmin()
  const s = slug(input.title)
  if (input.id) {
    await pool.query(
      `UPDATE event SET title=$1, slug=$2, description=$3, thumbnail_url=$4, start_date=$5, end_date=$6, location=$7, is_online=$8, registration_url=$9 WHERE id=$10`,
      [input.title, s, input.description ?? null, input.thumbnailUrl ?? null, input.startDate || null, input.endDate || null, input.location ?? null, !!input.isOnline, input.registrationUrl ?? null, input.id]
    )
  } else {
    await pool.query(
      `INSERT INTO event (title, slug, description, thumbnail_url, start_date, end_date, location, is_online, registration_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [input.title, s, input.description ?? null, input.thumbnailUrl ?? null, input.startDate || null, input.endDate || null, input.location ?? null, !!input.isOnline, input.registrationUrl ?? null]
    )
  }
  revalidateAll()
}
export async function deleteEvent(id: string) {
  await requireAdmin()
  await pool.query("DELETE FROM event WHERE id=$1", [id])
  revalidateAll()
}
