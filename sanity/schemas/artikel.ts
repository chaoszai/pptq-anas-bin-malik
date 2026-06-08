import { defineField, defineType } from "sanity"

export const artikel = defineType({
  name: "artikel",
  title: "Artikel",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Judul", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Ringkasan", type: "text", rows: 3, validation: (r) => r.required().max(200) }),
    defineField({ name: "thumbnail", title: "Foto Cover", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Tanggal Terbit", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "featured", title: "Artikel Unggulan?", type: "boolean", initialValue: false }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "reference",
      to: [{ type: "kategori" }],
    }),
    defineField({
      name: "body",
      title: "Isi Artikel",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "caption", title: "Keterangan Foto", type: "string" },
            { name: "alt", title: "Alt Text", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", title: "SEO Title", type: "string" },
        { name: "description", title: "Meta Description", type: "text", rows: 2 },
      ],
    }),
  ],
  orderings: [{ title: "Terbaru", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "thumbnail" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? new Date(subtitle).toLocaleDateString("id-ID") : "Draft", media }
    },
  },
})
