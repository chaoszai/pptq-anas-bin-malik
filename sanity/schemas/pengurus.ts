import { defineField, defineType } from "sanity"

export const pengurus = defineType({
  name: "pengurus",
  title: "Pengurus",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nama Lengkap", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "jabatan",
      title: "Jabatan",
      type: "string",
      options: {
        list: [
          "Pengasuh / Pendiri",
          "Ketua Yayasan",
          "Kepala Pondok",
          "Koordinator Tahfidz",
          "Koordinator Pendidikan",
          "Koordinator Keasramaan",
          "Koordinator Keuangan",
          "Ustadz / Musyrif",
          "Ustadzah / Musyrifah",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Urutan Tampil", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Urutan", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "jabatan", media: "photo" },
  },
})
