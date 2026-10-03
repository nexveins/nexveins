import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, CheckIcon } from "lucide-react"
import { ClosingCta } from "@/components/sections/closing-cta"
import { services } from "@/lib/content"

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })) }

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const service = services.find((item) => item.slug === slug)
  return service ? { title: service.title, description: service.description } : { title: "Service not found" }
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params
  const service = services.find((item) => item.slug === slug)
  if (!service) notFound()
  const serviceJsonLd = { "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.description, provider: { "@type": "Organization", name: "Nexveins" } }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c") }} />
      <section className="site-container pt-16 pb-20 md:pt-24 md:pb-28">
        <Link href="/services" className="text-link text-sm"><ArrowLeftIcon aria-hidden="true" />All services</Link>
        <p className="eyebrow mt-14">Practice {service.index}</p>
        <h1 className="mt-5 max-w-5xl text-balance text-5xl leading-[0.98] font-semibold tracking-[-0.055em] sm:text-6xl lg:text-8xl">{service.title}</h1>
        <p className="mt-8 max-w-2xl text-pretty text-xl leading-8 text-muted-foreground">{service.promise}</p>
      </section>
      <section className="border-y border-border bg-card">
        <div className="site-container grid gap-14 py-20 md:grid-cols-2 md:py-28">
          <div><p className="eyebrow">What we do</p><p className="mt-6 max-w-xl text-pretty text-lg leading-8">{service.description}</p></div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.capabilities.map((item) => <li key={item} className="flex min-h-16 items-start gap-3 rounded-lg border border-border bg-background p-4 text-sm font-medium"><CheckIcon className="mt-0.5 text-primary" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
      </section>
      <section className="section-space"><div className="site-container"><p className="eyebrow">What the engagement should leave behind</p><div className="mt-10 grid gap-8 md:grid-cols-3">{service.outcomes.map((outcome, index) => <div key={outcome} className="border-t border-border pt-5"><span className="font-mono text-xs text-primary">0{index + 1}</span><p className="mt-5 text-xl font-semibold tracking-[-0.025em]">{outcome}</p></div>)}</div></div></section>
      <ClosingCta />
    </>
  )
}
