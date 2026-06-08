export const SITE_NAME = "PPTQ Anas Bin Malik"
export const SITE_FULL_NAME = "Pondok Pesantren Tahfidzul Qur'an Anas Bin Malik"
export const SITE_TAGLINE = "Mencetak Generasi Ḥuffāẓ Berakhlakul Karimah"

export const CONTACT = {
  address: "Posakan Barat 01/10, Dusun II, Cawas, Kec. Cawas, Kabupaten Klaten, Jawa Tengah 57463",
  city: "Klaten, Jawa Tengah",
  phone: "08123456789",
  email: "pptqabm@gmail.com",
  whatsapp: "08123456789",
  whatsappUrl: "https://wa.me/628123456789",
  mapsUrl: "https://maps.google.com/?q=Cawas,Klaten,Jawa+Tengah",
}

export const SOCIAL = {
  instagram: "https://instagram.com/pptqanasbinmalik",
  youtube: "https://youtube.com/@pptqanasbinmalik",
  facebook: "",
}

export const PONDOK_INFO = {
  tahunBerdiri: "2015",
  pengasuh: "Ust. [Nama Pengasuh]",
  skYayasan: "SK Yayasan No. [XXX]",
  npsn: "[NPSN]",
  totalSantri: 120,
  alumniHuffazh: 48,
  programCount: 5,
  tahunBerkiprah: new Date().getFullYear() - 2015,
}

export const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    href: "/profil",
    children: [
      { label: "Tentang Kami", href: "/profil" },
      { label: "Sejarah", href: "/profil/sejarah" },
      { label: "Visi & Misi", href: "/profil/visi-misi" },
      { label: "Struktur", href: "/profil/struktur" },
      { label: "Fasilitas", href: "/profil/fasilitas" },
      { label: "Lokasi", href: "/profil/lokasi" },
    ],
  },
  { label: "Kurikulum", href: "/kurikulum" },
  { label: "Galeri", href: "/galeri" },
  { label: "Artikel", href: "/artikel" },
  { label: "Kontak", href: "/kontak" },
] as const

export const PROGRAMS = [
  {
    id: 1,
    roman: "i",
    arabicTitle: "تَحْفِيظُ الْقُرْآن",
    title: "Tahfidz Al-Qur'an",
    description:
      "Program hafalan 30 juz dengan metode talaqqi langsung kepada ustadz bersanad. Target hafalan terstruktur per jenjang.",
    slug: "tahfidz",
  },
  {
    id: 2,
    roman: "ii",
    arabicTitle: "عُلُومُ الْقُرْآن",
    title: "Ilmu Al-Qur'an",
    description:
      "Kajian mendalam tentang tajwid, qira'at, asbabun nuzul, tafsir, dan ilmu-ilmu yang berkaitan dengan Al-Qur'an.",
    slug: "ilmu-quran",
  },
  {
    id: 3,
    roman: "iii",
    arabicTitle: "اللُّغَةُ الْعَرَبِيَّة",
    title: "Bahasa Arab",
    description:
      "Penguasaan bahasa Arab aktif dan pasif melalui nahwu, shorof, muhadatsah, dan qira'atul kutub.",
    slug: "bahasa-arab",
  },
  {
    id: 4,
    roman: "iv",
    arabicTitle: "الْفِقْهُ وَالْعَقِيدَة",
    title: "Fiqih & Aqidah",
    description:
      "Pemahaman dasar-dasar fiqih ibadah, muamalah, dan aqidah ahlussunnah wal jamaah.",
    slug: "fiqih-aqidah",
  },
  {
    id: 5,
    roman: "v",
    arabicTitle: "التَّرْبِيَةُ الشَّخْصِيَّة",
    title: "Tarbiyah Syakhsiyah",
    description:
      "Pembinaan karakter, adab, kepemimpinan, dan pengembangan diri santri secara holistik.",
    slug: "tarbiyah",
  },
] as const

export const STATS = [
  { value: 120, label: "Santri Aktif", suffix: "+", arabicLabel: "طَالِب" },
  { value: 48, label: "Alumni Huffazh", suffix: "+", arabicLabel: "حَافِظ" },
  { value: 30, label: "Target Hafalan", suffix: " Juz", arabicLabel: "جُزْء" },
  { value: new Date().getFullYear() - 2015, label: "Tahun Berkiprah", suffix: "+", arabicLabel: "سَنَة" },
] as const

export const PSB_WAVES = [
  { id: "1", label: "Gelombang I", period: "Januari – Maret 2026" },
  { id: "2", label: "Gelombang II", period: "April – Juni 2026" },
  { id: "3", label: "Gelombang III", period: "Juli – September 2026" },
] as const

export const BISMILLAH = "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ"
export const HADITS_HERO = "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ"
export const HADITS_HERO_TRANS = "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya"
export const HADITS_HERO_RAWI = "HR. Bukhari No. 5027"
