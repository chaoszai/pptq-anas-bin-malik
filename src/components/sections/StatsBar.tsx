"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import CountUp from "react-countup"
import { GeometricDivider } from "@/components/ornaments/GeometricDivider"
import { STATS } from "@/lib/constants"

export function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      ref={ref}
      className="py-16 px-6"
      style={{ background: "var(--color-ivory)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x"
          style={{ "--tw-divide-opacity": "1", borderColor: "var(--color-sand)" } as React.CSSProperties}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1 md:px-8">
              <p
                className="font-arabic text-base leading-none mb-1"
                dir="rtl"
                style={{ color: "var(--color-gold-muted)" }}
              >
                {stat.arabicLabel}
              </p>
              <p
                className="font-display font-semibold leading-none"
                style={{ color: "var(--color-emerald-deep)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
              >
                {isInView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.2}
                    delay={i * 0.15}
                    separator="."
                  />
                ) : "0"}
                <span
                  className="font-sans font-light text-xl ml-0.5"
                  style={{ color: "var(--color-gold-antique)" }}
                >
                  {stat.suffix}
                </span>
              </p>
              <p
                className="font-sans text-xs tracking-widest uppercase mt-1"
                style={{ color: "var(--color-walnut)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <GeometricDivider />
        </div>
      </div>
    </section>
  )
}
