import { GeometricDivider } from "@/components/ornaments/GeometricDivider"

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeroProps {
  arabicTitle: string
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
}

export function PageHero({ arabicTitle, title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section
      className="relative py-20 px-6 overflow-hidden"
      style={{ background: "var(--color-emerald-deep)" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="font-sans text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    /
                  </span>
                )}
                <span
                  className="font-sans text-xs tracking-wider"
                  style={{ color: i === breadcrumbs.length - 1 ? "var(--color-gold-antique)" : "rgba(255,255,255,0.45)" }}
                >
                  {crumb.label}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Arabic title */}
        <p
          className="font-arabic text-2xl md:text-3xl mb-4"
          dir="rtl"
          style={{ color: "var(--color-gold-antique)" }}
        >
          {arabicTitle}
        </p>

        {/* Main title */}
        <h1
          className="font-display italic font-semibold leading-tight mb-4"
          style={{ color: "var(--color-cream)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="font-sans text-base max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <GeometricDivider color="rgba(201,169,97,0.2)" className="px-8 pb-4" />
      </div>
    </section>
  )
}
