import { defineField, defineType } from "sanity"

export const homepageSettings = defineType({
  name: "homepageSettings",
  title: "Pengaturan Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroHeading", title: "Heading Hero", type: "string" }),
    defineField({ name: "heroSubheading", title: "Subheading Hero", type: "text", rows: 2 }),
    defineField({ name: "heroImage", title: "Foto Hero", type: "image", options: { hotspot: true } }),
    defineField({ name: "ctaText", title: "Teks Tombol CTA", type: "string" }),
  ],
  preview: { select: { title: "heroHeading" }, prepare() { return { title: "Pengaturan Homepage" } } },
})
