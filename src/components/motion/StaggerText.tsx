"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StaggerTextProps {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  duration?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

export function StaggerText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.1,
  duration = 0.7,
  as: Tag = "h1",
}: StaggerTextProps) {
  const words = text.split(" ")

  return (
    <Tag className={cn("overflow-hidden", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * stagger,
            duration,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className={cn("inline-block mr-[0.25em]", wordClassName)}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  delay?: number
  stagger?: number
  className?: string
}

export function StaggerContainer({
  children,
  delay = 0,
  stagger = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
