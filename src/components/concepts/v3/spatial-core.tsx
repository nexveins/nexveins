"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useRef } from "react"
import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "motion/react"
import { buttonVariants } from "@/components/ui/button"
import { HeroSystemPoster } from "@/components/concept/hero-system-poster"
import { principles, processSteps, services } from "@/lib/content"
import { cn } from "@/lib/utils"
import { ConceptBackLink, ConceptHeader, PhotoDirectionSlot, ProjectCta } from "./shared"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HeroSystemScene = dynamic(() => import("@/components/concept/hero-system-scene").then((module) => module.HeroSystemScene), { ssr: false, loading: () => <HeroSystemPoster /> })

export function SpatialCoreConcept() {
  const root = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from("[data-spatial-hero] > *", { y: 30, opacity: 0, duration: 0.7, stagger: 0.08 })
        .from("[data-spatial-scene]", { opacity: 0, scale: 0.97, duration: 0.9 }, "-=0.55")
    })
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const visual = root.current?.querySelector<HTMLElement>("[data-spatial-visual]")
      const section = root.current?.querySelector<HTMLElement>("[data-spatial-capabilities]")
      if (!visual || !section) return
      ScrollTrigger.create({ trigger: section, start: "top top", end: "bottom bottom", pin: visual, pinSpacing: false })
      gsap.utils.toArray<HTMLElement>("[data-spatial-step]").forEach((step, index) => {
        ScrollTrigger.create({ trigger: step, start: "top center", end: "bottom center", toggleClass: { targets: `[data-spatial-node=\"${index}\"]`, className: "is-active" } })
      })
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <div ref={root} className="concept-shell concept-v3 min-h-[100dvh] overflow-x-clip bg-background font-[family-name:var(--font-v3-body)] text-foreground">
      <ConceptHeader />
      <section className="relative min-h-[100dvh] overflow-hidden border-b border-border pt-20">
        <div aria-hidden="true" className="absolute inset-0 opacity-40 [background:linear-gradient(to_right,color-mix(in_srgb,var(--border)_55%,transparent)_1px,transparent_1px)] [background-size:16.66%_100%]" />
        <div className="relative mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[1480px] px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div data-spatial-hero className="relative z-10 flex flex-col justify-end pb-8 pt-[35vh] sm:pb-12 sm:pt-[43vh] lg:col-span-7 lg:pb-16 lg:pt-24">
            <p className="mb-5 text-sm font-semibold text-primary">Product engineering from Sahiwal, Pakistan</p>
            <h1 className="max-w-[790px] text-balance font-[family-name:var(--font-v3-display)] text-[clamp(2.65rem,6.5vw,7rem)] leading-[0.9] font-semibold tracking-[-0.075em]">Software built in Sahiwal for businesses moving forward.</h1>
            <div className="mt-8 flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-lg leading-8 text-muted-foreground">Web, mobile, cloud, and AI systems shaped around useful business outcomes.</p>
              <div className="flex items-center gap-3">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-lg px-6")}>Start a project <ArrowUpRightIcon aria-hidden="true" /></Link>
                <Link href="#capabilities" aria-label="See capabilities" className="flex size-12 items-center justify-center rounded-lg border border-border bg-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"><ArrowDownRightIcon aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
          <div data-spatial-scene className="absolute inset-x-5 top-24 h-[27vh] min-h-48 overflow-hidden rounded-xl border border-border bg-card sm:inset-x-8 sm:h-[34vh] sm:min-h-64 lg:inset-y-24 lg:right-12 lg:left-[54%] lg:h-auto">
            {reduceMotion ? <HeroSystemPoster /> : <HeroSystemScene active />}
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36 lg:py-44">
        <div className="mx-auto grid max-w-[1480px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <h2 className="text-balance font-[family-name:var(--font-v3-display)] text-[clamp(2.7rem,5.8vw,6.2rem)] leading-[0.96] font-semibold tracking-[-0.065em] lg:col-span-9">Strategy, design, and engineering connected as one working system.</h2>
          <div className="flex flex-col justify-end gap-8 lg:col-span-3">
            <p className="text-lg leading-8 text-muted-foreground">We help growing teams turn a real constraint into dependable software and a clear next release.</p>
            <div className="grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm font-semibold"><span>Web</span><span>Mobile</span><span>Cloud</span><span>Applied AI</span></div>
          </div>
        </div>
      </section>

      <section id="capabilities" data-spatial-capabilities className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-[1480px] lg:grid-cols-12 lg:px-12">
          <div data-spatial-visual className="flex min-h-[70vh] items-center border-b border-border px-5 py-20 sm:px-8 lg:col-span-7 lg:h-[100dvh] lg:border-r lg:border-b-0">
            <div className="relative mx-auto aspect-square w-full max-w-[620px]">
              <div className="absolute inset-[10%] rounded-full border border-border" />
              <div className="absolute inset-[30%] rounded-full border border-border" />
              <div className="absolute top-1/2 left-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-primary text-center font-[family-name:var(--font-v3-display)] text-xl font-semibold text-primary-foreground">Nexveins<br />core</div>
              {services.map((service, index) => {
                const positions = ["top-[4%] left-[5%]", "top-[18%] right-[0%]", "right-[9%] bottom-[7%]"]
                return <div key={service.slug} data-spatial-node={index} className={cn("absolute max-w-48 rounded-xl border border-border bg-background p-4 opacity-35 transition-[opacity,transform] duration-500 [&.is-active]:scale-105 [&.is-active]:border-primary [&.is-active]:opacity-100", positions[index])}><p className="font-[family-name:var(--font-v3-display)] text-lg font-semibold tracking-[-0.03em]">{service.title}</p></div>
              })}
            </div>
          </div>
          <div className="lg:col-span-5 lg:pl-12">
            {services.map((service) => <article key={service.slug} data-spatial-step className="flex min-h-[72vh] flex-col justify-center border-b border-border px-5 py-20 last:border-b-0 sm:px-8 lg:min-h-[100dvh] lg:px-0 lg:pr-8"><h2 className="font-[family-name:var(--font-v3-display)] text-4xl leading-[1] font-semibold tracking-[-0.055em] sm:text-6xl">{service.title}</h2><p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">{service.description}</p><Link href={`/services/${service.slug}`} className="mt-9 inline-flex w-max items-center gap-2 font-semibold underline decoration-border underline-offset-8 hover:text-primary">Explore the practice <ArrowUpRightIcon aria-hidden="true" /></Link></article>)}
          </div>
        </div>
      </section>

      <section id="company" className="py-28 sm:py-36 lg:py-44">
        <div className="mx-auto grid max-w-[1480px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-12">
          <PhotoDirectionSlot className="lg:col-span-7" title="Working product review" brief="A real Nexveins team reviewing a product flow or architecture decision. Natural daylight, active conversation, no posed eye contact." />
          <div className="lg:col-span-5 lg:pl-8"><h2 className="font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em]">Clear working relationships produce better software.</h2><div className="mt-10 grid gap-x-8 sm:grid-cols-2">{principles.map((item) => <div key={item.title} className="py-5"><h3 className="font-[family-name:var(--font-v3-display)] text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p></div>)}</div></div>
        </div>
      </section>

      <section className="border-y border-border bg-card/50 py-28 sm:py-36"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12"><h2 className="max-w-4xl font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">A clear route from uncertainty to release.</h2><ol className="mt-20 grid gap-8 md:grid-cols-3 lg:grid-cols-6">{processSteps.map((step) => <li key={step.number}><span className="block h-px bg-primary" /><h3 className="mt-6 font-[family-name:var(--font-v3-display)] text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p></li>)}</ol></div></section>
      <section className="py-28 sm:py-36 lg:py-44"><div className="mx-auto grid max-w-[1480px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12"><div className="lg:col-span-5"><h2 className="font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">Rooted in Sahiwal. Built to work across distance.</h2><p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">Nexveins is building a focused engineering company in Sahiwal with the discipline required by growing teams anywhere.</p></div><PhotoDirectionSlot className="lg:col-span-7" title="The real Sahiwal workplace" brief="A wide environmental frame that shows the actual Nexveins workspace, everyday equipment, and people naturally at work." /></div></section>
      <ProjectCta />
      <ConceptBackLink />
    </div>
  )
}
