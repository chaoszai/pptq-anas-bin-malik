import { cn } from "@/lib/utils"

interface HexagonalLogoProps {
  size?: number
  className?: string
  variant?: "full" | "mini"
}

export function HexagonalLogo({ size = 64, className, variant = "full" }: HexagonalLogoProps) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.42
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30)
    return `${(cx + r * Math.cos(angle)).toFixed(4)},${(cy + r * Math.sin(angle)).toFixed(4)}`
  }).join(" ")

  const innerR = r * 0.82
  const innerPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30)
    return `${(cx + innerR * Math.cos(angle)).toFixed(4)},${(cy + innerR * Math.sin(angle)).toFixed(4)}`
  }).join(" ")

  const fontSize = variant === "mini" ? size * 0.38 : size * 0.42

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("shrink-0", className)}
      aria-label="Logo PPTQ Anas Bin Malik"
    >
      {/* Outer gold hexagon */}
      <polygon
        points={points}
        fill="none"
        stroke="var(--color-gold-antique)"
        strokeWidth={size * 0.025}
      />
      {/* Inner emerald fill */}
      <polygon
        points={innerPoints}
        fill="var(--color-emerald-deep)"
      />
      {/* Arabic letter أ */}
      <text
        x={cx}
        y={cy + fontSize * 0.38}
        textAnchor="middle"
        fontSize={fontSize}
        fontFamily="var(--font-arabic)"
        fontWeight="700"
        fill="var(--color-gold-antique)"
        direction="rtl"
      >
        أ
      </text>
    </svg>
  )
}
