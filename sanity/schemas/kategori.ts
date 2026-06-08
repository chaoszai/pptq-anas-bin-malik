import { defineField, defineType } from "sanity"

export const kategori = defineType({
  name: "kategori",
  title: "Kategori Artikel",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nama Kategori", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "color",
      title: "Warna (Tailwind class)",
      type: "string",
      description: "Contoh: emerald, gold, blue",
    }),
  ],
  preview: { select: { title: "title" } },
})
