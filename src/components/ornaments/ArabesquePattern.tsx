import { cn } from "@/lib/utils"

interface ArabesquePatternProps {
  size?: number
  opacity?: number
  color?: string
  className?: string
  rotate?: boolean
}

export function ArabesquePattern({
  size = 320,
  opacity = 0.06,
  color = "var(--color-emerald-deep)",
  className,
  rotate = false,
}: ArabesquePatternProps) {
  const cx = size / 2
  const cy = size / 2

  const rings = [
    { r: size * 0.45, strokeW: 0.8 },
    { r: size * 0.36, strokeW: 0.6 },
    { r: size * 0.27, strokeW: 0.5 },
  ]

  const stars = [8, 12, 16]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn(rotate && "animate-[spin_120s_linear_infinite]", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Concentric circles */}
      {rings.map((ring, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={ring.r}
          fill="none"
          stroke={color}
          strokeWidth={ring.strokeW}
        />
      ))}

      {/* Multi-point stars */}
      {stars.map((points, si) => {
        const outerR = rings[si]?.r ?? size * 0.2
        const innerR = outerR * 0.5
        const starPoints = Array.from({ length: points * 2 }, (_, i) => {
          const angle = (Math.PI / points) * i - Math.PI / 2
          const r = i % 2 === 0 ? outerR : innerR
          return `${(cx + r * Math.cos(angle)).toFixed(4)},${(cy + r * Math.sin(angle)).toFixed(4)}`
        }).join(" ")
        return (
          <polygon
            key={si}
            points={starPoints}
            fill="none"
            stroke={color}
            strokeWidth={0.5}
          />
        )
      })}

      {/* Cross lines */}
      {[0, 45, 90, 135].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const len = size * 0.48
        return (
          <line
            key={deg}
            x1={(cx + len * Math.cos(rad)).toFixed(4)}
            y1={(cy + len * Math.sin(rad)).toFixed(4)}
            x2={(cx - len * Math.cos(rad)).toFixed(4)}
            y2={(cy - len * Math.sin(rad)).toFixed(4)}
            stroke={color}
            strokeWidth={0.4}
          />
        )
      })}

      {/* Corner dots */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (Math.PI / 8) * i
        const r = size * 0.46
        return (
          <circle
            key={i}
            cx={(cx + r * Math.cos(angle)).toFixed(4)}
            cy={(cy + r * Math.sin(angle)).toFixed(4)}
            r={size * 0.008}
            fill={color}
          />
        )
      })}
    </svg>
  )
}
