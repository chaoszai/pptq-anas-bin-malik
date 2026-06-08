import { defineField, defineType } from "sanity"

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nama Program", type: "string", validation: (r) => r.required() }),
    defineField({ name: "arabicTitle", title: "Judul Arab", type: "string" }),
    defineField({
      name: "roman",
      title: "Nomor Romawi",
      type: "string",
      options: { list: ["i", "ii", "iii", "iv", "v"] },
    }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Deskripsi", type: "text", rows: 4 }),
    defineField({ name: "order", title: "Urutan", type: "number", initialValue: 1 }),
  ],
  orderings: [{ title: "Urutan", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "roman" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `No. ${subtitle}` }
    },
  },
})
