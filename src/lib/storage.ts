import "server-only"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { randomUUID } from "crypto"

const endpoint = process.env.S3_ENDPOINT
const region = process.env.S3_REGION ?? "us-east-1"
const accessKeyId = process.env.S3_KEY
const secretAccessKey = process.env.S3_SECRET
const bucket = process.env.S3_BUCKET
const publicUrl = process.env.S3_PUBLIC_URL // e.g. https://storage.nrapken.dev/org-...-pptq-uploads

export const storageConfigured = Boolean(
  endpoint && accessKeyId && secretAccessKey && bucket && publicUrl
)

let client: S3Client | null = null
function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      endpoint,
      region,
      credentials: { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! },
      forcePathStyle: true,
    })
  }
  return client
}

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]

export async function uploadImage(file: File): Promise<string> {
  if (!storageConfigured) throw new Error("Object storage belum dikonfigurasi (env S3_*)")
  if (!ALLOWED.includes(file.type)) throw new Error("Tipe file tidak didukung")

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin"
  const key = `uploads/${new Date().getFullYear()}/${randomUUID()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket!,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    })
  )

  return `${publicUrl!.replace(/\/$/, "")}/${key}`
}
