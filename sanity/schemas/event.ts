import { defineField, defineType } from "sanity"

export const event = defineType({
  name: "event",
  title: "Event / Pengumuman",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Judul Event", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Deskripsi", type: "text", rows: 4 }),
    defineField({ name: "thumbnail", title: "Foto Cover", type: "image", options: { hotspot: true } }),
    defineField({ name: "startDate", title: "Tanggal Mulai", type: "datetime" }),
    defineField({ name: "endDate", title: "Tanggal Selesai", type: "datetime" }),
    defineField({ name: "location", title: "Lokasi", type: "string" }),
    defineField({ name: "isOnline", title: "Event Online?", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Terbaru", name: "startDateDesc", by: [{ field: "startDate", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "startDate", media: "thumbnail" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? new Date(subtitle).toLocaleDateString("id-ID") : "", media }
    },
  },
})
