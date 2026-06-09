import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Situs",
  type: "document",
  groups: [
    { name: "identity", title: "Identitas Pondok" },
    { name: "contact", title: "Kontak & Lokasi" },
    { name: "social", title: "Media Sosial" },
    { name: "stats", title: "Statistik" },
    { name: "hero", title: "Halaman Beranda" },
    { name: "psb", title: "PSB / Pendaftaran" },
  ],
  fields: [
    // Identity
    defineField({ name: "siteName", title: "Nama Pondok (Pendek)", type: "string", group: "identity", initialValue: "PPTQ Anas Bin Malik" }),
    defineField({ name: "siteFullName", title: "Nama Pondok (Lengkap)", type: "string", group: "identity", initialValue: "Pondok Pesantren Tahfidzul Qur'an Anas Bin Malik" }),
    defineField({ name: "tagline", title: "Tagline / Motto", type: "string", group: "identity" }),
    defineField({ name: "logo", title: "Logo Pondok", type: "image", group: "identity", options: { hotspot: true } }),
    defineField({ name: "tahunBerdiri", title: "Tahun Berdiri", type: "string", group: "identity", initialValue: "2015" }),
    defineField({ name: "pengasuh", title: "Nama Pengasuh / Pendiri", type: "string", group: "identity" }),
    defineField({ name: "skYayasan", title: "SK Yayasan", type: "string", group: "identity" }),
    defineField({ name: "npsn", title: "NPSN", type: "string", group: "identity" }),

    // Contact
    defineField({ name: "phone", title: "Nomor Telepon", type: "string", group: "contact" }),
    defineField({ name: "whatsapp", title: "Nomor WhatsApp (tanpa +62)", type: "string", group: "contact", description: "Contoh: 081234567890" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "address", title: "Alamat Lengkap", type: "text", rows: 3, group: "contact" }),
    defineField({ name: "city", title: "Kota / Kabupaten", type: "string", group: "contact", initialValue: "Klaten, Jawa Tengah" }),
    defineField({ name: "mapsUrl", title: "Link Google Maps", type: "url", group: "contact" }),

    // Social
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "social" }),
    defineField({ name: "youtube", title: "YouTube URL", type: "url", group: "social" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url", group: "social" }),
    defineField({ name: "tiktok", title: "TikTok URL", type: "url", group: "social" }),

    // Stats
    defineField({ name: "totalSantri", title: "Total Santri Aktif", type: "number", group: "stats", initialValue: 120 }),
    defineField({ name: "alumniHuffazh", title: "Jumlah Alumni Huffazh", type: "number", group: "stats", initialValue: 48 }),
    defineField({ name: "programCount", title: "Jumlah Program", type: "number", group: "stats", initialValue: 5 }),

    // Hero
    defineField({ name: "heroHeading", title: "Heading Utama Hero", type: "string", group: "hero" }),
    defineField({ name: "heroSubheading", title: "Subheading Hero", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroImage", title: "Foto Background Hero", type: "image", group: "hero", options: { hotspot: true } }),
    defineField({ name: "aboutText", title: "Teks Tentang Kami (About Section)", type: "text", rows: 5, group: "hero" }),
    defineField({ name: "aboutImage", title: "Foto Tentang Kami", type: "image", group: "hero", options: { hotspot: true } }),

    // PSB
    defineField({
      name: "psbWaves",
      title: "Gelombang PSB",
      type: "array",
      group: "psb",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID Gelombang", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "period", title: "Periode", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "period" } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Pengaturan Situs" }
    },
  },
})
