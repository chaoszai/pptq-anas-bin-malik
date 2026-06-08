import { cn } from "@/lib/utils"

interface CornerOrnamentProps {
  size?: number
  className?: string
  color?: string
  all?: boolean
  positions?: Array<"tl" | "tr" | "bl" | "br">
}

function Corner({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {/* Outer L */}
      <path
        d={`M ${size} 4 L 4 4 L 4 ${size}`}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="square"
      />
      {/* Inner dot accent */}
      <circle cx="4" cy="4" r="2" fill={color} />
      {/* Second line inset */}
      <path
        d={`M ${size * 0.6} 8 L 8 8 L 8 ${size * 0.6}`}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        strokeLinecap="square"
        opacity="0.6"
      />
    </svg>
  )
}

export function CornerOrnament({
  size = 28,
  className,
  color = "var(--color-gold-antique)",
  all = true,
  positions = ["tl", "tr", "bl", "br"],
}: CornerOrnamentProps) {
  const show = all
    ? { tl: true, tr: true, bl: true, br: true }
    : {
        tl: positions.includes("tl"),
        tr: positions.includes("tr"),
        bl: positions.includes("bl"),
        br: positions.includes("br"),
      }

  return (
    <>
      {show.tl && (
        <span className={cn("absolute top-3 left-3", className)}>
          <Corner size={size} color={color} />
        </span>
      )}
      {show.tr && (
        <span className={cn("absolute top-3 right-3 rotate-90", className)}>
          <Corner size={size} color={color} />
        </span>
      )}
      {show.bl && (
        <span className={cn("absolute bottom-3 left-3 -rotate-90", className)}>
          <Corner size={size} color={color} />
        </span>
      )}
      {show.br && (
        <span className={cn("absolute bottom-3 right-3 rotate-180", className)}>
          <Corner size={size} color={color} />
        </span>
      )}
    </>
  )
}
