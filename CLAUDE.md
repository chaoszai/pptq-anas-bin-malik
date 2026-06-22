# PPTQ Anas Bin Malik — Website Pesantren Tahfidz

Website profil + PSB (Pendaftaran Santri Baru) untuk Pondok Pesantren Tahfidzul Qur'an Anas Bin Malik, dengan CMS admin custom.

## Stack

- **Next.js 16** (App Router, Turbopack) + React + TypeScript
- **PostgreSQL** via `pg` (pool di `src/lib/db.ts`) — bukan ORM, query SQL langsung
- **Tailwind CSS** + Radix UI + framer-motion + lenis (smooth scroll)
- **TipTap** untuk rich text editor admin
- **S3-compatible object storage** (nrapken/MinIO) untuk upload gambar
- Sanity **sudah dibuang** — CMS sekarang custom (jangan pakai Sanity lagi)

## Menjalankan

```bash
npm run dev      # localhost:3000
npm run build
```

DB lokal sering kosong (env placeholder) → halaman bisa error koneksi DB saat dev; itu normal, data asli ada di produksi.

## Deploy

- Hosting: **nrapken Quick Apps**, slug `pptq-anas-bin-malik-3`, org `ajiasdasdsa-1758891816`
- Live: https://pptq-anas-bin-malik-3.quick.nrapken.dev
- Repo: github.com/chaoszai/pptq-anas-bin-malik (branch `main`)
- Alur deploy: `git push main` → trigger build via MCP `quick_apps_builds_create` (deploy_after_build: true). Auto-deploy dari push kadang tidak jalan, jadi trigger manual.
- Env produksi diatur lewat `quick_apps_update` (`runtime_environment`). Setelah ubah env butuh build/restart baru.

## Struktur

- `src/app/(main)/` — halaman publik (beranda, profil, kurikulum, galeri, artikel, psb, kontak)
- `src/app/(admin)/admin/` — dashboard admin (login via password `ADMIN_PASSWORD`, cookie `admin_token` = `ADMIN_TOKEN`)
- `src/app/actions/` — Server Actions (mutasi DB, semua pakai `requireAdmin()`)
- `src/lib/content.ts` — semua query baca (getSiteSettings, getPageContent, dll)
- `src/components/sections/` — section beranda; `src/components/layout/` — Navbar/Footer/dll
- `src/components/admin/` — form & manager dashboard

### Tabel DB
`site_settings` (1 row, id=1), `page_content` (key-value JSON), `pendaftaran`, `artikel`, `kategori`, `galeri`, `galeri_image`, `program`, `pengurus`, `fasilitas`, `testimoni`, `event`.

## Editor Visual (WYSIWYG) — penting

Dashboard **Konten Web** (`/admin/konten`) = editor ala edit PPT: preview situs di-iframe (`?edit=1`), klik elemen langsung edit.

- `src/components/cms/CmsEditBridge.tsx` — script di dalam iframe: highlight + tangani klik. Teks biasa → `contentEditable` inline; elemen ber-`data-cms-field` → kirim ke panel dashboard.
- `src/lib/cmsFields.ts` — registry field "khusus" (gambar, angka, teks hero animasi) yang pakai panel.
- Teks biasa disimpan sebagai **override per-elemen** (key = path DOM dari `src/lib/domPath.ts`) di `page_content` key `text-overrides`, diterapkan di situs publik oleh `src/components/cms/TextOverridesApplier.tsx`.
- Menandai elemen editable lewat panel: tambah `data-cms-field="namaField"` (harus ada di `CMS_FIELDS`). Untuk skip dari edit inline generik: `data-cms-skip`.

Saat tambah field konten baru: tambah kolom di `site_settings`, map di `getSiteSettings` + `saveSiteSettings`, render di komponen dengan fallback ke default, lalu (opsional) tag `data-cms-field`.

## Object Storage

- Upload via `POST /api/upload` → `src/lib/storage.ts` (env `S3_*`). File masuk prefix `pptq/`.
- **Sementara berbagi bucket** `titikseduh-uploads` (bucket dedicated `pptq-uploads` gagal dibuat — bug provisioning service-account MinIO di nrapken, error 403). Ganti ke bucket sendiri kalau sudah bisa.
- Gambar yang diupload HARUS benar-benar dirender (logo/hero sempat tidak ke-wire). `next.config` sudah allowlist `storage.nrapken.dev` untuk next/image.

## Konvensi

- Bahasa Indonesia untuk UI & copy.
- Commit hanya saat diminta; deploy = push + trigger build manual.
- Jangan re-introduce Sanity.
