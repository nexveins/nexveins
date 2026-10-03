import Link from "next/link"
import { ArrowUpRightIcon, BotIcon, BracesIcon, CloudCogIcon, DatabaseIcon, LayoutTemplateIcon, ServerCogIcon } from "lucide-react"
import { CulturePhoto } from "@/components/home/culture-photo"
import { DeliveryPipeline } from "@/components/home/delivery-pipeline"
import { HomeHero } from "@/components/home/home-hero"
import { ServiceBento } from "@/components/home/service-bento"
import { Reveal } from "@/components/motion/reveal"
import { ClosingCta } from "@/components/sections/closing-cta"
import { buttonVariants } from "@/components/ui/button"
import { principles, siteSettings } from "@/lib/content"
import { cn } from "@/lib/utils"

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexveins",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nexveins.com",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nexveins.com"}/nexveins-mark.png`,
  description: siteSettings.description,
  address: { "@type": "PostalAddress", addressLocality: "Sahiwal", addressCountry: "PK" },
}

const technologies = [
  { name: "Next.js", detail: "Web platforms", icon: LayoutTemplateIcon },
  { name: "React", detail: "Product interfaces", icon: BracesIcon },
  { name: "Node.js", detail: "Application services", icon: ServerCogIcon },
  { name: "Sanity", detail: "Content systems", icon: DatabaseIcon },
  { name: "Cloud", detail: "Reliable delivery", icon: CloudCogIcon },
  { name: "AI automation", detail: "Practical workflows", icon: BotIcon },
]

export default function Home() {
  return (
    <div className="home-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
      <HomeHero />

      <section className="mission-band relative overflow-hidden py-16 text-center md:py-20">
        <div aria-hidden="true" className="mission-band__wave mission-band__wave--left" />
        <div aria-hidden="true" className="mission-band__wave mission-band__wave--right" />
        <div className="site-container relative">
          <Reveal className="mx-auto max-w-4xl">
            <p className="section-label justify-center">Our mission</p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Custom solutions for a <span className="text-primary">smarter tomorrow.</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">We connect product thinking, design, and engineering so useful ideas become dependable software.</p>
          </Reveal>
        </div>
      </section>

      <ServiceBento />

      <section className="pb-20 md:pb-24">
        <div className="site-container">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <Reveal className="max-w-3xl">
              <p className="section-label">Technical foundation</p>
              <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl">Modern tools. <span className="text-primary">Practical choices.</span></h2>
            </Reveal>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">Technology is selected around the product, the operating team, and the work that must remain maintainable.</p>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {technologies.map((technology, index) => {
              const Icon = technology.icon
              return (
                <Reveal key={technology.name} delay={index * 0.035}>
                  <div className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-border bg-card p-4 text-center shadow-[0_10px_28px_color-mix(in_srgb,var(--foreground)_5%,transparent)]">
                    <Icon className="size-7 text-primary" strokeWidth={1.8} aria-hidden="true" />
                    <p className="mt-4 font-heading text-sm font-bold">{technology.name}</p>
                    <p className="mt-1 text-[0.7rem] leading-4 text-muted-foreground">{technology.detail}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <DeliveryPipeline />

      <section className="py-20 md:py-24">
        <div className="site-container grid overflow-hidden border-y border-border bg-card lg:grid-cols-12">
          <CulturePhoto />
          <div className="flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12">
            <Reveal>
              <p className="section-label">About Nexveins</p>
              <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl">We build <span className="text-primary">what matters.</span></h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">Nexveins brings product, design, and engineering decisions closer together so businesses can move with clarity and build on a sound foundation.</p>
            </Reveal>
            <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-9 h-12 w-fit rounded-xl px-6")}>How we work <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-4 border-t border-border bg-muted/55 p-6 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:p-7">
            {principles.slice(0, 3).map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.04} className="border-t border-border pt-5 first:border-t-0 first:pt-0">
                <h3 className="font-heading text-sm font-bold tracking-[-0.025em]">{principle.title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{principle.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </div>
  )
}
