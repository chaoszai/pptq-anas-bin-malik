import { NextRequest, NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"
import { uploadImage, storageConfigured } from "@/lib/storage"

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 })
  }
  if (!storageConfigured) {
    return NextResponse.json(
      { error: "Object storage belum dikonfigurasi" },
      { status: 503 }
    )
  }
  try {
    const form = await req.formData()
    const file = form.get("file")
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 })
    }
    const url = await uploadImage(file)
    return NextResponse.json({ url })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload gagal"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
