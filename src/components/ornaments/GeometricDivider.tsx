import { cn } from "@/lib/utils"

interface GeometricDividerProps {
  label?: string
  className?: string
  color?: string
  size?: "sm" | "md" | "lg"
}

export function GeometricDivider({
  label,
  className,
  color = "var(--color-sand)",
  size = "md",
}: GeometricDividerProps) {
  const diamondSize = size === "sm" ? 5 : size === "lg" ? 9 : 7

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Left line */}
      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 h-px" style={{ background: color }} />
        <svg width={diamondSize} height={diamondSize} viewBox="0 0 10 10" aria-hidden="true">
          <rect
            x="1"
            y="1"
            width="8"
            height="8"
            transform="rotate(45 5 5)"
            fill="none"
            stroke={color}
            strokeWidth="1.2"
          />
        </svg>
        <div className="flex-1 h-px" style={{ background: color }} />
      </div>

      {/* Center element */}
      {label ? (
        <span
          className="font-display italic text-sm shrink-0 px-2"
          style={{ color: "var(--color-gold-muted)" }}
        >
          {label}
        </span>
      ) : (
        <svg
          width={diamondSize * 2.4}
          height={diamondSize * 2.4}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {/* Center diamond */}
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            transform="rotate(45 12 12)"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
          />
          <rect
            x="6"
            y="6"
            width="12"
            height="12"
            transform="rotate(45 12 12)"
            fill="var(--color-gold-antique)"
            opacity="0.6"
          />
        </svg>
      )}

      {/* Right line */}
      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 h-px" style={{ background: color }} />
        <svg width={diamondSize} height={diamondSize} viewBox="0 0 10 10" aria-hidden="true">
          <rect
            x="1"
            y="1"
            width="8"
            height="8"
            transform="rotate(45 5 5)"
            fill="none"
            stroke={color}
            strokeWidth="1.2"
          />
        </svg>
        <div className="flex-1 h-px" style={{ background: color }} />
      </div>
    </div>
  )
}
