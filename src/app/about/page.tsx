import type { Metadata } from "next"
import Image from "next/image"
import { ClosingCta } from "@/components/sections/closing-cta"
import { PageIntro } from "@/components/sections/page-intro"
import { principles, siteSettings } from "@/lib/content"

export const metadata: Metadata = { title: "About", description: "Nexveins is a software company rooted in Sahiwal, Pakistan, serving growing businesses." }

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About Nexveins" title="A software company being built for the long term." description="From Sahiwal, we help growing businesses turn important operational and product needs into dependable software." />
      <section className="border-y border-border bg-card"><div className="site-container grid gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center md:py-28"><figure><div className="photo-frame relative aspect-[3/2]"><Image src="/images/campaign/culture.avif" alt="Pakistani software professionals collaborating in a contemporary office environment" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" /></div><figcaption className="image-disclosure">{siteSettings.representativeImageDisclosure}</figcaption></figure><div><h2 className="text-4xl font-semibold tracking-[-0.045em]">Serious delivery without agency theatre.</h2><div className="mt-6 space-y-5 text-pretty text-lg leading-8 text-muted-foreground"><p>We believe a strong software partner should make difficult decisions easier to understand. That starts with direct conversations, grounded planning, and work that can be reviewed while it is still taking shape.</p><p>Sahiwal is not a marketing label for us. It is where Nexveins is building an engineering culture with the ambition to serve companies beyond Pakistan through disciplined remote delivery.</p></div></div></div></section>
      <section className="section-space"><div className="site-container"><h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">How we intend to work with clients.</h2><div className="mt-12 divide-y divide-border border-y border-border">{principles.map((principle, index) => <div key={principle.title} className="grid gap-4 py-8 sm:grid-cols-[90px_1fr_1fr]"><span className="font-mono text-xs text-primary">0{index + 1}</span><h3 className="text-2xl font-semibold tracking-[-0.035em]">{principle.title}</h3><p className="leading-7 text-muted-foreground">{principle.body}</p></div>)}</div></div></section>
      <ClosingCta />
    </>
  )
}
