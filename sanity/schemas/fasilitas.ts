import { defineField, defineType } from "sanity"

export const fasilitas = defineType({
  name: "fasilitas",
  title: "Fasilitas",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nama Fasilitas", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Deskripsi", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
    defineField({
      name: "photos",
      title: "Foto Fasilitas",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "order", title: "Urutan Tampil", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Urutan", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "icon" },
  },
})
