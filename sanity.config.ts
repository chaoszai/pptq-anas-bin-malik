import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemas"

export default defineConfig({
  name: "pptq-anas-bin-malik",
  title: "PPTQ Anas Bin Malik",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Konten")
          .items([
            S.listItem()
              .title("🏠 Pengaturan Homepage")
              .child(S.document().schemaType("homepageSettings").documentId("homepageSettings")),
            S.divider(),
            S.listItem().title("📝 Artikel").child(S.documentTypeList("artikel")),
            S.listItem().title("🏷️ Kategori Artikel").child(S.documentTypeList("kategori")),
            S.divider(),
            S.listItem().title("🖼️ Galeri").child(S.documentTypeList("galeri")),
            S.listItem().title("📅 Event / Pengumuman").child(S.documentTypeList("event")),
            S.divider(),
            S.listItem().title("📚 Program").child(S.documentTypeList("program")),
            S.listItem().title("👥 Pengurus").child(S.documentTypeList("pengurus")),
            S.listItem().title("🏛️ Fasilitas").child(S.documentTypeList("fasilitas")),
            S.listItem().title("⭐ Testimoni").child(S.documentTypeList("testimoni")),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
