import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.nrapken.dev",
      },
    ],
  },
}

export default nextConfig
