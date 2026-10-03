"use client"

import Link from "next/link"
import { useRef } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { principles, processSteps, services } from "@/lib/content"
import { ConceptBackLink, ConceptHeader, PhotoDirectionSlot, ProjectCta } from "./shared"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function DocumentaryStudioConcept() {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-doc-hero] > *", { opacity: 0, y: 34, duration: 0.75, stagger: 0.09, ease: "power3.out" })
      gsap.utils.toArray<HTMLElement>("[data-doc-reveal]").forEach((item) => gsap.from(item, { opacity: 0, y: 32, duration: 0.65, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 86%", once: true } }))
      gsap.utils.toArray<HTMLElement>("[data-doc-media]").forEach((item) => gsap.from(item, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power3.inOut", scrollTrigger: { trigger: item, start: "top 82%", once: true } }))
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <div ref={root} className="concept-shell concept-v3 min-h-[100dvh] overflow-x-clip bg-background font-[family-name:var(--font-v3-body)] text-foreground">
      <ConceptHeader />
      <section className="min-h-[100dvh] pt-20">
        <div data-doc-hero className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-[1480px] flex-col justify-between px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div className="flex items-center justify-between border-b border-border pb-5 text-sm font-semibold text-muted-foreground"><span>Software development company</span><span className="hidden sm:block">Sahiwal, Pakistan</span></div>
          <h1 className="max-w-[1240px] text-balance font-[family-name:var(--font-v3-display)] text-[clamp(3.4rem,8vw,9rem)] leading-[0.86] font-semibold tracking-[-0.085em]">Software built close to the people making it.</h1>
          <div className="grid gap-7 border-t border-border pt-7 lg:grid-cols-12 lg:items-end"><p className="max-w-xl text-lg leading-8 text-muted-foreground lg:col-span-6">Nexveins works directly with growing businesses to design and engineer useful web, mobile, cloud, and AI systems.</p><div className="flex flex-wrap items-center gap-5 lg:col-span-6 lg:justify-end"><Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground">Start a project <ArrowUpRightIcon aria-hidden="true" /></Link><Link href="#capabilities" className="font-semibold underline decoration-border underline-offset-8 hover:text-primary">See our capabilities</Link></div></div>
        </div>
      </section>

      <section className="border-y border-border bg-card/45 py-28 sm:py-36"><div className="mx-auto grid max-w-[1480px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12"><div className="lg:col-span-4"><p className="text-lg font-semibold text-primary">How we work</p></div><p data-doc-reveal className="text-balance font-[family-name:var(--font-v3-display)] text-[clamp(2.8rem,5.4vw,6rem)] leading-[0.96] font-semibold tracking-[-0.065em] lg:col-span-8">A focused team, direct conversations, and enough structure to keep difficult work understandable.</p></div></section>

      <section id="capabilities" className="py-28 sm:py-36 lg:py-44"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12"><h2 className="max-w-4xl font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">What Nexveins builds.</h2><div className="mt-20 grid gap-16 lg:grid-cols-12">{services.map((service, index) => <article data-doc-reveal key={service.slug} className={index === 1 ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-7"}><div className="flex items-start gap-6"><span className="font-[family-name:var(--font-v3-display)] text-6xl font-semibold leading-none text-primary">0{index + 1}</span><div><h3 className="font-[family-name:var(--font-v3-display)] text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{service.title}</h3><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{service.description}</p><Link href={`/services/${service.slug}`} className="mt-7 inline-flex items-center gap-2 font-semibold underline decoration-border underline-offset-8 hover:text-primary">Explore the practice <ArrowUpRightIcon aria-hidden="true" /></Link></div></div></article>)}</div></div></section>

      <section id="company" className="border-y border-border bg-card/45 py-28 sm:py-36"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12"><div data-doc-media><PhotoDirectionSlot title="The team doing the work" brief="A real candid photograph of Nexveins people planning, reviewing, or pairing. Use natural daylight and include environmental context instead of a tight staged portrait." /></div><div className="relative z-10 -mt-8 ml-auto max-w-4xl rounded-xl border border-border bg-background p-7 sm:-mt-16 sm:p-12 lg:mr-16"><h2 className="font-[family-name:var(--font-v3-display)] text-4xl leading-[0.98] font-semibold tracking-[-0.055em] sm:text-6xl">The relationship should feel as clear as the work.</h2><div className="mt-10 grid gap-8 sm:grid-cols-2">{principles.map((item) => <div key={item.title}><h3 className="font-[family-name:var(--font-v3-display)] text-xl font-semibold">{item.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{item.body}</p></div>)}</div></div></div></section>

      <section className="py-28 sm:py-36 lg:py-44"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12"><div className="max-w-3xl"><h2 className="font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">How a project moves.</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">Each stage leaves the next one clearer than it found it.</p></div><ol className="mt-20 grid gap-y-12 md:grid-cols-2 lg:grid-cols-3">{processSteps.map((step, index) => <li data-doc-reveal key={step.number} className="relative min-h-56 pr-8 lg:pr-12"><span className="font-[family-name:var(--font-v3-display)] text-7xl font-semibold leading-none text-border">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 font-[family-name:var(--font-v3-display)] text-2xl font-semibold">{step.title}</h3><p className="mt-3 max-w-sm leading-7 text-muted-foreground">{step.body}</p></li>)}</ol></div></section>

      <section className="border-t border-border py-28 sm:py-36"><div className="mx-auto grid max-w-[1480px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12"><div className="lg:col-span-5"><p className="text-lg font-semibold text-primary">A company being built in Sahiwal</p><h2 className="mt-6 font-[family-name:var(--font-v3-display)] text-5xl leading-[0.96] font-semibold tracking-[-0.06em] sm:text-7xl">Local perspective. Professional work without theatre.</h2><p className="mt-7 text-lg leading-8 text-muted-foreground">Nexveins is creating opportunities for focused engineering work in Sahiwal while serving businesses wherever clear collaboration can happen.</p></div><div data-doc-media className="lg:col-span-7 lg:pl-8"><PhotoDirectionSlot title="The actual Nexveins environment" brief="A genuine wide workplace frame showing the office as it is used. Include desks, equipment, daylight, and real spatial character without artificial luxury styling." /></div></div></section>
      <ProjectCta />
      <ConceptBackLink />
    </div>
  )
}
