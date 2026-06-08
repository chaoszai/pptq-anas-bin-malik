import { PageHero } from "@/components/ui/PageHero"
import { FadeIn } from "@/components/motion/FadeIn"
import { PSBForm } from "@/components/psb/PSBForm"

export const metadata = {
  title: "Form Pendaftaran Santri Baru — PPTQ Anas Bin Malik",
}

export default function PSBDaftarPage() {
  return (
    <>
      <PageHero
        arabicTitle="اسْتِمَارَةُ الْقَبُول"
        title="Form Pendaftaran Online"
        subtitle="Pendaftaran Santri Baru Tahun Ajaran 2026/2027"
        breadcrumbs={[
          { label: "Beranda" },
          { label: "Pendaftaran Santri Baru", href: "/psb" },
          { label: "Form Pendaftaran" },
        ]}
      />

      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            {/* Info banner */}
            <div
              className="mb-10 p-5 flex gap-4"
              style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
            >
              <span className="text-xl shrink-0" style={{ color: "var(--color-gold-antique)" }}>ℹ</span>
              <div className="space-y-1">
                <p className="font-sans text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                  Petunjuk Pengisian
                </p>
                <p className="font-sans text-xs leading-relaxed" style={{ color: "var(--color-walnut)" }}>
                  Isi formulir ini dengan data yang <strong>benar dan lengkap</strong> sesuai
                  dokumen resmi. Tanda{" "}
                  <span style={{ color: "var(--color-gold-antique)" }}>*</span>{" "}
                  menandakan kolom wajib diisi. Pastikan nomor HP orang tua aktif karena
                  notifikasi akan dikirim via WhatsApp.
                </p>
              </div>
            </div>

            {/* Form */}
            <div
              className="p-8"
              style={{ background: "var(--color-ivory)", border: "0.5px solid var(--color-sand)" }}
            >
              <PSBForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  )
}
