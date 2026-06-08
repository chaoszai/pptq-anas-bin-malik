import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Cormorant_Garamond, Amiri } from "next/font/google"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "PPTQ Anas Bin Malik — Pondok Pesantren Tahfidzul Qur'an",
    template: "%s | PPTQ Anas Bin Malik",
  },
  description:
    "Pondok Pesantren Tahfidzul Qur'an Anas Bin Malik — Mencetak generasi huffazh berakhlakul karimah di Klaten, Jawa Tengah.",
  keywords: ["pesantren tahfidz", "pondok pesantren", "klaten", "tahfidz quran", "PPTQ Anas Bin Malik"],
  authors: [{ name: "PPTQ Anas Bin Malik" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "PPTQ Anas Bin Malik",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${cormorant.variable} ${amiri.variable}`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  )
}
