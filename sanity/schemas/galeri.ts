import { defineField, defineType } from "sanity"

export const galeri = defineType({
  name: "galeri",
  title: "Galeri",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Judul Album", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Kegiatan Tahfidz", value: "Kegiatan Tahfidz" },
          { title: "Fasilitas", value: "Fasilitas" },
          { title: "Wisuda Huffazh", value: "Wisuda Huffazh" },
          { title: "Kegiatan Harian", value: "Kegiatan Harian" },
          { title: "Alam Pondok", value: "Alam Pondok" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Tanggal", type: "date" }),
    defineField({
      name: "images",
      title: "Foto-foto",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "caption", title: "Keterangan", type: "string" },
            { name: "alt", title: "Alt Text", type: "string" },
          ],
        },
      ],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "kategori", media: "images.0" },
  },
})
