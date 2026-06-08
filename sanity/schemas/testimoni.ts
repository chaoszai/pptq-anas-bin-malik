import { defineField, defineType } from "sanity"

export const testimoni = defineType({
  name: "testimoni",
  title: "Testimoni",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nama", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Peran", type: "string", description: "Contoh: Wali Santri, Klaten" }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "quote", title: "Kutipan Testimoni", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      validation: (r) => r.min(1).max(5),
      initialValue: 5,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
})
