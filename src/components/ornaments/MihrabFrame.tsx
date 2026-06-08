import { cn } from "@/lib/utils"
import Image from "next/image"

interface MihrabFrameProps {
  src?: string
  alt?: string
  width?: number
  height?: number
  className?: string
  borderColor?: string
  children?: React.ReactNode
}

export function MihrabFrame({
  src,
  alt = "",
  width = 480,
  height = 560,
  className,
  borderColor = "var(--color-gold-antique)",
  children,
}: MihrabFrameProps) {
  const archHeight = 160
  const rx = width / 2

  // SVG clip path for mihrab arch shape
  const clipId = `mihrab-clip-${Math.random().toString(36).slice(2, 7)}`

  // Path: top arch + rectangular body
  // Start bottom-left, go up, arch over top, come down right, back to bottom
  const path = `
    M 0,${archHeight}
    Q 0,0 ${rx},0
    Q ${width},0 ${width},${archHeight}
    L ${width},${height}
    L 0,${height}
    Z
  `

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width, height }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={path} />
          </clipPath>
        </defs>

        {/* Gold border stroke following the arch */}
        <path
          d={path}
          fill="none"
          stroke={borderColor}
          strokeWidth="1.5"
        />
        {/* Inner inset border */}
        <path
          d={`
            M 8,${archHeight + 2}
            Q 8,8 ${rx},8
            Q ${width - 8},8 ${width - 8},${archHeight + 2}
            L ${width - 8},${height - 8}
            L 8,${height - 8}
            Z
          `}
          fill="none"
          stroke={borderColor}
          strokeWidth="0.5"
          opacity="0.5"
        />
        {/* Keystone ornament at arch apex */}
        <circle
          cx={rx}
          cy={6}
          r={4}
          fill={borderColor}
          opacity="0.8"
        />
        <circle
          cx={rx}
          cy={6}
          r={2}
          fill="var(--color-emerald-deep)"
        />
      </svg>

      {/* Content clipped to mihrab shape */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `url(#${clipId})` }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={`${width}px`}
            priority
          />
        ) : children ? (
          children
        ) : (
          /* Placeholder */
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "var(--color-ivory)" }}
          >
            <span
              className="font-arabic text-6xl opacity-20"
              style={{ color: "var(--color-emerald-deep)" }}
              dir="rtl"
            >
              أ
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
