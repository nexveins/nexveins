"use client"

import Link from "next/link"
import { useRef } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { processSteps, services } from "@/lib/content"
import { ConceptBackLink, ConceptHeader, PhotoDirectionSlot, ProjectCta } from "./shared"

gsap.registerPlugin(ScrollTrigger, useGSAP)

function BlueprintDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 sm:p-8">
      <svg viewBox="0 0 760 500" className={compact ? "w-full" : "min-h-80 w-full"} role="img" aria-label="Diagram showing product, web and mobile, AI, and cloud connected through a shared delivery foundation">
        <g fill="none" stroke="currentColor" className="text-border" strokeWidth="1.5">
          <path data-blueprint-line d="M80 250H680" />
          <path data-blueprint-line d="M220 90V410" />
          <path data-blueprint-line d="M540 90V410" />
          <path data-blueprint-line d="M220 150H540" />
          <path data-blueprint-line d="M220 350H540" />
        </g>
        <g fill="var(--background)" stroke="var(--primary)" strokeWidth="2">
          <rect x="40" y="215" width="150" height="70" rx="10" />
          <rect x="295" y="110" width="170" height="80" rx="10" />
          <rect x="295" y="310" width="170" height="80" rx="10" />
          <rect x="570" y="215" width="150" height="70" rx="10" />
        </g>
        <g fill="currentColor" className="text-foreground" textAnchor="middle" fontFamily="var(--font-v3-body)" fontSize="16" fontWeight="600">
          <text x="115" y="246">Product</text><text x="115" y="267">definition</text>
          <text x="380" y="145">Web and mobile</text><text x="380" y="167">experiences</text>
          <text x="380" y="345">AI and cloud</text><text x="380" y="367">systems</text>
          <text x="645" y="246">Release and</text><text x="645" y="267">improvement</text>
        </g>
      </svg>
      <div className="mt-5 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-xs font-semibold text-muted-foreground"><span>Discovery</span><span>Design</span><span>Engineering</span><span>Launch</span><span>Support</span></div>
    </div>
  )
}

export function EngineeringBlueprintConcept() {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-blueprint-hero] > *", { opacity: 0, y: 28, duration: 0.7, stagger: 0.09, ease: "power3.out" })
      gsap.utils.toArray<SVGPathElement>("[data-blueprint-line]").forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, { strokeDashoffset: 0, duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: path.closest("svg"), start: "top 82%", once: true } })
      })
      gsap.utils.toArray<HTMLElement>("[data-blueprint-reveal]").forEach((item) => gsap.from(item, { opacity: 0, y: 28, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 86%", once: true } }))
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <div ref={root} className="concept-shell concept-v3 min-h-[100dvh] overflow-x-clip bg-background font-[family-name:var(--font-v3-body)] text-foreground">
      <ConceptHeader />
      <section className="relative min-h-[100dvh] border-b border-border pt-20">
        <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[1480px] gap-12 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12">
          <div data-blueprint-hero className="lg:col-span-7">
            <p className="mb-6 text-sm font-semibold text-primary">Software development company in Sahiwal</p>
            <h1 className="max-w-4xl text-balance font-[family-name:var(--font-v3-display)] text-[clamp(3.3rem,7vw,7.6rem)] leading-[0.88] font-semibold tracking-[-0.08em]">Clear systems for ambitious businesses.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">Nexveins turns product ideas and operational problems into software your team can understand, run, and improve.</p>
            <div className="mt-9 flex flex-wrap items-center gap-5"><Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground">Start a project <ArrowUpRightIcon aria-hidden="true" /></Link><Link href="#capabilities" className="font-semibold underline decoration-border underline-offset-8 hover:text-primary">See the system</Link></div>
          </div>
          <div className="lg:col-span-5"><BlueprintDiagram compact /></div>
        </div>
      </section>

      <section className="py-28 sm:py-36"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12"><div className="grid gap-14 lg:grid-cols-12"><p className="font-[family-name:var(--font-v3-display)] text-[clamp(2.8rem,5.2vw,5.8rem)] leading-[0.96] font-semibold tracking-[-0.065em] lg:col-span-8">The useful part of technology is not the technology. It is what the business can do next.</p><div className="flex flex-col justify-end lg:col-span-4"><p className="text-lg leading-8 text-muted-foreground">We join planning, interface design, architecture, and delivery so decisions stay connected from first conversation to release.</p></div></div></div></section>

      <section id="capabilities" className="border-y border-border bg-card/45 py-24 sm:py-32"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12"><BlueprintDiagram /><div className="mt-20">{services.map((service, index) => <article data-blueprint-reveal key={service.slug} className="grid gap-7 py-12 first:pt-0 last:pb-0 md:grid-cols-12"><div className="md:col-span-2"><span className="font-[family-name:var(--font-v3-display)] text-5xl font-semibold text-primary">0{index + 1}</span></div><div className="md:col-span-5"><h2 className="font-[family-name:var(--font-v3-display)] text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{service.title}</h2></div><div className="md:col-span-5"><p className="max-w-lg text-lg leading-8 text-muted-foreground">{service.description}</p><Link href={`/services/${service.slug}`} className="mt-7 inline-flex items-center gap-2 font-semibold underline decoration-border underline-offset-8 hover:text-primary">Explore the practice <ArrowUpRightIcon aria-hidden="true" /></Link></div></article>)}</div></div></section>

      <section id="company" className="py-28 sm:py-36 lg:py-44"><div className="mx-auto grid max-w-[1480px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12"><div className="lg:col-span-5"><h2 className="font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">Built around decisions your team can see.</h2><p className="mt-7 max-w-md text-lg leading-8 text-muted-foreground">Direct access, visible tradeoffs, regular working reviews, and engineering that remains maintainable after launch.</p></div><div className="lg:col-span-7"><PhotoDirectionSlot title="Architecture discussion in progress" brief="An authentic wide frame of the Nexveins team working through a real system diagram or product decision. No readable client information." /></div></div></section>

      <section className="border-y border-border bg-card/45 py-28 sm:py-36"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12"><h2 className="max-w-4xl font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">Six stages. One visible line of responsibility.</h2><ol className="mt-20 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{processSteps.map((step) => <li data-blueprint-reveal key={step.number} className="relative pl-8"><span className="absolute top-1 bottom-0 left-0 w-1 rounded-full bg-primary" /><h3 className="font-[family-name:var(--font-v3-display)] text-2xl font-semibold">{step.title}</h3><p className="mt-3 max-w-sm leading-7 text-muted-foreground">{step.body}</p></li>)}</ol></div></section>

      <section className="py-28 sm:py-36 lg:py-44"><div className="mx-auto grid max-w-[1480px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12"><PhotoDirectionSlot className="lg:col-span-7" title="Nexveins in Sahiwal" brief="A real environmental image of the office and team at work. Show practical scale and everyday details rather than staged corporate theatre." /><div className="lg:col-span-5 lg:pl-8"><h2 className="font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">Local roots. Professional delivery without distance.</h2><p className="mt-7 text-lg leading-8 text-muted-foreground">We are building an engineering company in Sahiwal that communicates clearly and works comfortably with teams beyond Pakistan.</p></div></div></section>
      <ProjectCta />
      <ConceptBackLink />
    </div>
  )
}
