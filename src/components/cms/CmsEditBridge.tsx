"use client"

import { useEffect } from "react"
import { CMS_FIELDS } from "@/lib/cmsFields"
import { getNodePath, isEditableText } from "@/lib/domPath"

// Aktif hanya saat halaman dibuka di dalam iframe editor (?edit=1).
// - Elemen ber-[data-cms-field] (gambar/angka) → kirim klik ke dashboard (panel).
// - Teks biasa lainnya → bisa diedit langsung (contentEditable) di tempat.
export function CmsEditBridge() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("edit") !== "1") return

    const root = document.documentElement
    root.setAttribute("data-cms-edit", "1")

    const style = document.createElement("style")
    style.textContent = `
      [data-cms-edit] [data-cms-field],
      [data-cms-edit] [data-cms-text-hot] {
        cursor: pointer;
        outline: 2px dashed transparent;
        outline-offset: 3px;
        border-radius: 3px;
        transition: outline-color .12s, background-color .12s;
      }
      [data-cms-edit] [data-cms-field]:hover,
      [data-cms-edit] [data-cms-text-hot]:hover {
        outline-color: #047857;
        background-color: rgba(4,120,87,0.06);
      }
      [data-cms-edit] [data-cms-field].cms-active {
        outline: 2px solid #047857 !important;
        background-color: rgba(4,120,87,0.08);
      }
      [data-cms-edit] [contenteditable="true"] {
        outline: 2px solid #047857 !important;
        background-color: rgba(4,120,87,0.10);
        cursor: text;
      }
    `
    document.head.appendChild(style)

    let active: HTMLElement | null = null
    let editing: HTMLElement | null = null

    function clearActive() {
      if (active) active.classList.remove("cms-active")
      active = null
    }

    function commitEditing() {
      if (!editing) return
      const el = editing
      el.removeAttribute("contenteditable")
      const path = getNodePath(el)
      window.parent.postMessage(
        { __cms: true, type: "text-edit", path, value: el.innerHTML },
        "*"
      )
      editing = null
    }

    function onMouseOver(e: MouseEvent) {
      const t = e.target as HTMLElement
      if (!t || t === editing) return
      // tandai elemen teks yang bisa diedit agar dapat highlight
      const field = t.closest?.("[data-cms-field]")
      if (!field && isEditableText(t)) t.setAttribute("data-cms-text-hot", "1")
    }

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const field = target?.closest?.("[data-cms-field]") as HTMLElement | null

      // Cegah navigasi link di mode edit
      const anchor = target?.closest?.("a")
      if (anchor) e.preventDefault()

      // 1) Field khusus (gambar/angka) → buka panel di dashboard
      if (field) {
        const key = field.getAttribute("data-cms-field")!
        if (!CMS_FIELDS[key]) return
        e.preventDefault()
        e.stopPropagation()
        commitEditing()
        clearActive()
        active = field
        field.classList.add("cms-active")
        window.parent.postMessage({ __cms: true, type: "select", field: key }, "*")
        return
      }

      // 2) Teks biasa → edit inline
      const hovered = Array.from(document.querySelectorAll<HTMLElement>(":hover")).reverse()
      const textEl: HTMLElement | undefined = isEditableText(target)
        ? target
        : hovered.find(isEditableText)
      if (textEl && isEditableText(textEl)) {
        e.preventDefault()
        e.stopPropagation()
        if (editing && editing !== textEl) commitEditing()
        clearActive()
        editing = textEl
        textEl.setAttribute("contenteditable", "true")
        textEl.focus()
        // taruh kursor di akhir
        const sel = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(textEl)
        range.collapse(false)
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    }

    function onBlur(e: FocusEvent) {
      if (editing && e.target === editing) commitEditing()
    }

    function onKeyDown(e: KeyboardEvent) {
      const el = editing
      if (!el) return
      if (e.key === "Escape") {
        el.removeAttribute("contenteditable")
        editing = null
        return
      }
      // Enter (tanpa shift) selesai edit untuk elemen 1 baris
      if (e.key === "Enter" && !e.shiftKey && el.tagName !== "P") {
        e.preventDefault()
        commitEditing()
      }
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

    function onMessage(ev: MessageEvent) {
      const d = ev.data
      if (!d || !d.__cms) return
      if (d.type === "update") applyUpdate(d.field, String(d.value ?? ""))
      if (d.type === "deselect") {
        commitEditing()
        clearActive()
      }
    }

    document.addEventListener("mouseover", onMouseOver, true)
    document.addEventListener("click", onClick, true)
    document.addEventListener("blur", onBlur, true)
    document.addEventListener("keydown", onKeyDown, true)
    window.addEventListener("message", onMessage)
    window.parent.postMessage({ __cms: true, type: "ready" }, "*")

    return () => {
      document.removeEventListener("mouseover", onMouseOver, true)
      document.removeEventListener("click", onClick, true)
      document.removeEventListener("blur", onBlur, true)
      document.removeEventListener("keydown", onKeyDown, true)
      window.removeEventListener("message", onMessage)
      style.remove()
      root.removeAttribute("data-cms-edit")
    }
  }, [])

  return null
}
