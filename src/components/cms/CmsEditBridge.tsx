"use client"

import { useEffect } from "react"
import { CMS_FIELDS } from "@/lib/cmsFields"

// Aktif hanya saat halaman dibuka di dalam iframe editor (?edit=1).
// Menyorot elemen ber-[data-cms-field], mengirim klik ke parent (dashboard),
// dan menerima update untuk preview real-time tanpa reload.
export function CmsEditBridge() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("edit") !== "1") return

    const root = document.documentElement
    root.setAttribute("data-cms-edit", "1")

    const style = document.createElement("style")
    style.textContent = `
      [data-cms-edit] [data-cms-field] {
        cursor: pointer;
        outline: 2px dashed transparent;
        outline-offset: 3px;
        border-radius: 3px;
        transition: outline-color .12s, background-color .12s;
      }
      [data-cms-edit] [data-cms-field]:hover {
        outline-color: #047857;
        background-color: rgba(4,120,87,0.06);
      }
      [data-cms-edit] [data-cms-field].cms-active {
        outline: 2px solid #047857 !important;
        background-color: rgba(4,120,87,0.08);
      }
      [data-cms-edit] [data-cms-field]::after {
        content: "✏️";
        position: absolute;
        transform: translate(4px,-14px);
        font-size: 12px;
        opacity: 0;
        transition: opacity .12s;
        pointer-events: none;
      }
      [data-cms-edit] [data-cms-field]:hover::after { opacity: .9; }
      [data-cms-edit] [data-cms-field] { position: relative; }
    `
    document.head.appendChild(style)

    let active: HTMLElement | null = null

    function findField(target: EventTarget | null): HTMLElement | null {
      const el = target as HTMLElement | null
      return el?.closest?.("[data-cms-field]") as HTMLElement | null
    }

    function onClick(e: MouseEvent) {
      const field = findField(e.target)
      // Cegah navigasi link saat mode edit
      const anchor = (e.target as HTMLElement)?.closest?.("a")
      if (anchor && !field) {
        e.preventDefault()
        return
      }
      if (!field) return
      e.preventDefault()
      e.stopPropagation()
      const key = field.getAttribute("data-cms-field")!
      if (!CMS_FIELDS[key]) return
      if (active) active.classList.remove("cms-active")
      active = field
      field.classList.add("cms-active")
      window.parent.postMessage({ __cms: true, type: "select", field: key }, "*")
    }

    function applyUpdate(key: string, value: string) {
      const def = CMS_FIELDS[key]
      const el = document.querySelector<HTMLElement>(`[data-cms-field="${key}"]`)
      if (!el || !def) return
      if (def.kind === "image") {
        const img = el.tagName === "IMG" ? (el as HTMLImageElement) : el.querySelector("img")
        if (img) (img as HTMLImageElement).src = value
        else el.style.backgroundImage = `url(${value})`
      } else {
        el.textContent = value
      }
    }

    function onMessage(e: MessageEvent) {
      const d = e.data
      if (!d || !d.__cms) return
      if (d.type === "update") applyUpdate(d.field, String(d.value ?? ""))
      if (d.type === "deselect" && active) {
        active.classList.remove("cms-active")
        active = null
      }
    }

    document.addEventListener("click", onClick, true)
    window.addEventListener("message", onMessage)
    window.parent.postMessage({ __cms: true, type: "ready" }, "*")

    return () => {
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("message", onMessage)
      style.remove()
      root.removeAttribute("data-cms-edit")
    }
  }, [])

  return null
}
