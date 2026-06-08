"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface DrawSVGProps {
  d: string
  width?: number
  height?: number
  viewBox?: string
  strokeColor?: string
  strokeWidth?: number
  duration?: number
  delay?: number
  className?: string
}

export function DrawSVG({
  d,
  width = 200,
  height = 40,
  viewBox,
  strokeColor = "var(--color-gold-antique)",
  strokeWidth = 1,
  duration = 1.5,
  delay = 0,
  className,
}: DrawSVGProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={viewBox ?? `0 0 ${width} ${height}`}
      className={cn(className)}
      aria-hidden="true"
    >
      <motion.path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration, delay, ease: "easeInOut" }}
      />
    </svg>
  )
}
