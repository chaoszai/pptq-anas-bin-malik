// Path DOM stabil untuk identifikasi elemen teks lintas render (editor & situs publik).
// Menghasilkan selector CSS dari <body> memakai nth-of-type, deterministik
// selama struktur DOM sama (React merender output identik di kedua sisi).

export function getNodePath(el: Element): string {
  if (!el || el === document.body || !el.parentElement) return "body"
  const parent = el.parentElement
  const tag = el.tagName.toLowerCase()
  const sameTag = Array.from(parent.children).filter((c) => c.tagName === el.tagName)
  const idx = sameTag.indexOf(el) + 1
  return `${getNodePath(parent)}>${tag}:nth-of-type(${idx})`
}

export function queryByPath(path: string): HTMLElement | null {
  try {
    return document.querySelector<HTMLElement>(path)
  } catch {
    return null
  }
}

// Hanya elemen "daun teks": punya teks, dan anaknya cuma inline formatting.
const INLINE_OK = new Set(["EM", "B", "I", "STRONG", "SPAN", "BR", "U", "SMALL", "MARK", "A"])
const BLOCK_OR_INTERACTIVE = ["DIV", "SECTION", "BUTTON", "IMG", "SVG", "INPUT", "UL", "OL", "LI", "NAV", "HEADER", "FOOTER", "FORM", "IFRAME"]

export function isEditableText(el: Element): boolean {
  if (!(el instanceof HTMLElement)) return false
  if (!el.textContent?.trim()) return false
  if (el.closest("[data-cms-field]")) return false
  if (el.closest("[data-cms-skip]")) return false
  // ada anak block/interaktif? lewati
  if (el.querySelector(BLOCK_OR_INTERACTIVE.join(","))) return false
  // semua anak elemen harus inline
  for (const c of Array.from(el.children)) {
    if (!INLINE_OK.has(c.tagName)) return false
  }
  return true
}
