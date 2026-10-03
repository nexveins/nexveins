"use client"

import Link from "next/link"
import { useRef } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { principles, processSteps, services } from "@/lib/content"
import { cn } from "@/lib/utils"
import { ConceptBackLink, ConceptHeader, PhotoDirectionSlot, ProjectCta } from "./shared"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function DeliveryNetworkConcept() {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-network-hero] > *", { opacity: 0, y: 28, duration: 0.7, stagger: 0.08, ease: "power3.out" })
      gsap.utils.toArray<HTMLElement>("[data-network-step]").forEach((step, index) => {
        ScrollTrigger.create({ trigger: step, start: "top 58%", end: "bottom 42%", toggleClass: { targets: `[data-network-node=\"${index}\"]`, className: "is-active" } })
      })
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <div ref={root} className="concept-shell concept-v3 min-h-[100dvh] overflow-x-clip bg-background font-[family-name:var(--font-v3-body)] text-foreground">
      <ConceptHeader />
      <section className="relative min-h-[100dvh] overflow-hidden border-b border-border pt-20">
        <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[1480px] px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div data-network-hero className="flex flex-col justify-end py-12 lg:col-span-7 lg:py-16"><p className="mb-6 text-sm font-semibold text-primary">One connected delivery team</p><h1 className="max-w-4xl text-balance font-[family-name:var(--font-v3-display)] text-[clamp(3.2rem,7vw,7.5rem)] leading-[0.89] font-semibold tracking-[-0.08em]">From the first question to the next useful release.</h1><p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">Nexveins connects product thinking, design, engineering, automation, and support around one visible plan.</p><div className="mt-9 flex flex-wrap items-center gap-5"><Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground">Start a project <ArrowUpRightIcon aria-hidden="true" /></Link><Link href="#capabilities" className="font-semibold underline decoration-border underline-offset-8 hover:text-primary">Follow the delivery flow</Link></div></div>
          <div className="relative flex min-h-[46vh] items-center lg:col-span-5 lg:min-h-0 lg:pl-12"><div className="relative w-full rounded-xl border border-border bg-card p-7 sm:p-10"><div className="absolute top-12 bottom-12 left-[3.2rem] w-px bg-border sm:left-[4.2rem]" />{["Business need", "Product decision", "Working software", "Measured learning"].map((label, index) => <div key={label} className="relative flex items-center gap-6 py-6"><span className={cn("relative z-10 flex size-11 items-center justify-center rounded-lg border border-primary bg-background font-semibold text-primary", index === 2 && "bg-primary text-primary-foreground")}>{index + 1}</span><span className="font-[family-name:var(--font-v3-display)] text-xl font-semibold">{label}</span></div>)}</div></div>
        </div>
      </section>

      <section className="py-28 sm:py-36"><div className="mx-auto grid max-w-[1480px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12"><h2 className="text-balance font-[family-name:var(--font-v3-display)] text-[clamp(2.8rem,5.5vw,6rem)] leading-[0.96] font-semibold tracking-[-0.065em] lg:col-span-8">Good delivery is a chain of clear decisions, not a sequence of handoffs.</h2><div className="flex flex-col justify-end lg:col-span-4"><p className="text-lg leading-8 text-muted-foreground">The same team stays close to the problem while the product moves from definition through release and support.</p></div></div></section>

      <section id="capabilities" className="border-y border-border bg-card/45"><div className="mx-auto grid max-w-[1480px] lg:grid-cols-12 lg:px-12"><div className="border-b border-border px-5 py-20 sm:px-8 lg:sticky lg:top-0 lg:col-span-5 lg:h-[100dvh] lg:border-r lg:border-b-0 lg:px-0 lg:pr-12"><h2 className="font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">Three practices. One delivery network.</h2><div className="relative mt-14"><div className="absolute top-6 bottom-6 left-5 w-px bg-border" />{services.map((service, index) => <div key={service.slug} data-network-node={index} className="relative flex items-center gap-5 py-5 opacity-35 transition-opacity duration-500 [&.is-active]:opacity-100"><span className="relative z-10 size-10 rounded-lg border border-primary bg-background transition-colors [&:is(.is-active_*)]:bg-primary" /><span className="font-[family-name:var(--font-v3-display)] text-lg font-semibold">{service.shortTitle}</span></div>)}</div></div><div className="lg:col-span-7 lg:pl-16">{services.map((service, index) => <article key={service.slug} data-network-step className="flex min-h-[72vh] flex-col justify-center border-b border-border px-5 py-20 last:border-b-0 sm:px-8 lg:min-h-[100dvh] lg:px-0 lg:pr-8"><span className="font-[family-name:var(--font-v3-display)] text-7xl font-semibold leading-none text-border">0{index + 1}</span><h3 className="mt-7 font-[family-name:var(--font-v3-display)] text-4xl leading-[1] font-semibold tracking-[-0.055em] sm:text-6xl">{service.title}</h3><p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{service.description}</p><Link href={`/services/${service.slug}`} className="mt-8 inline-flex w-max items-center gap-2 font-semibold underline decoration-border underline-offset-8 hover:text-primary">Explore the practice <ArrowUpRightIcon aria-hidden="true" /></Link></article>)}</div></div></section>

      <section id="company" className="py-28 sm:py-36 lg:py-44"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12"><h2 className="max-w-5xl font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">The people making decisions stay in the conversation.</h2><div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{principles.map((item, index) => <article key={item.title} className={cn("min-h-64 rounded-xl p-7", index === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card")}><span className="font-[family-name:var(--font-v3-display)] text-4xl font-semibold opacity-55">0{index + 1}</span><h3 className="mt-10 font-[family-name:var(--font-v3-display)] text-2xl font-semibold leading-tight">{item.title}</h3><p className={cn("mt-4 leading-7", index === 0 ? "text-primary-foreground/80" : "text-muted-foreground")}>{item.body}</p></article>)}</div></div></section>

      <section className="border-y border-border bg-card/45 py-28 sm:py-36"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12"><div className="grid gap-14 lg:grid-cols-12"><div className="lg:col-span-4"><h2 className="font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em]">How work moves.</h2></div><ol className="lg:col-span-8">{processSteps.map((step, index) => <li key={step.number} className="grid gap-4 py-8 first:pt-0 last:pb-0 sm:grid-cols-[80px_1fr_1.4fr]"><span className="font-[family-name:var(--font-v3-display)] text-3xl font-semibold text-primary">0{index + 1}</span><h3 className="font-[family-name:var(--font-v3-display)] text-2xl font-semibold">{step.title}</h3><p className="max-w-md leading-7 text-muted-foreground">{step.body}</p></li>)}</ol></div></div></section>

      <section className="py-28 sm:py-36 lg:py-44"><div className="mx-auto grid max-w-[1480px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12"><div className="lg:col-span-5"><h2 className="font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">Sahiwal is where the network begins.</h2><p className="mt-7 text-lg leading-8 text-muted-foreground">Our location shapes a practical, accessible company. Our working standards allow the delivery relationship to travel.</p></div><PhotoDirectionSlot className="lg:col-span-7" title="Real place, real working day" brief="An authentic Nexveins office photograph showing everyday work in Sahiwal. Keep the frame candid, useful, and free of invented scale or luxury." /></div></section>
      <ProjectCta />
      <ConceptBackLink />
    </div>
  )
}
