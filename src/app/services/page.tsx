import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { PageIntro } from "@/components/sections/page-intro"
import { ClosingCta } from "@/components/sections/closing-cta"
import { services } from "@/lib/content"

export const metadata: Metadata = { title: "Services", description: "Product engineering, digital experiences, AI, automation, and cloud systems from one connected team." }

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title="One team across product, experience, and systems." description="Choose a focused engagement or bring us a problem that crosses disciplines. We shape the team around the decision that needs to move." />
      <section className="site-container pb-24 md:pb-32">
        <div className="divide-y divide-border border-y border-border">
          {services.map((service) => (
            <article key={service.slug} className="grid gap-8 py-10 md:grid-cols-[90px_1fr_0.8fr] md:py-14">
              <span className="font-mono text-xs text-primary">{service.index}</span>
              <div><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{service.title}</h2><p className="mt-5 max-w-xl text-pretty leading-7 text-muted-foreground">{service.description}</p><Link href={`/services/${service.slug}`} className="text-link mt-7">Explore this practice<ArrowUpRightIcon aria-hidden="true" /></Link></div>
              <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 md:grid-cols-1">
                {service.capabilities.map((capability) => <li key={capability} className="border-t border-border pt-3">{capability}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <ClosingCta />
    </>
  )
}
