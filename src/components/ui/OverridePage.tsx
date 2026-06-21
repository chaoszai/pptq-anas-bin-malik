import { PageHero } from "@/components/ui/PageHero"
import { ProfilSidebar } from "@/components/ui/ProfilSidebar"
import { FadeIn } from "@/components/motion/FadeIn"

interface Crumb {
  label: string
  href?: string
}

export function OverridePage({
  arabicTitle,
  title,
  subtitle,
  breadcrumbs,
  html,
  withSidebar = false,
}: {
  arabicTitle: string
  title: string
  subtitle?: string
  breadcrumbs?: Crumb[]
  html: string
  withSidebar?: boolean
}) {
  const body = (
    <FadeIn>
      <div
        className="prose prose-emerald max-w-none font-sans leading-relaxed"
        style={{ color: "var(--color-walnut)" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </FadeIn>
  )

  return (
    <>
      <PageHero arabicTitle={arabicTitle} title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />
      <div className="py-16 px-6" style={{ background: "var(--color-cream)" }}>
        {withSidebar ? (
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
            <ProfilSidebar />
            <main className="flex-1 min-w-0">{body}</main>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">{body}</div>
        )}
      </div>
    </>
  )
}
