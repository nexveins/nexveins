"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { processSteps, siteSettings } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ProcessTimeline() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((step) => {
        gsap.from(step, { opacity: 0.35, y: 12, duration: 0.45, ease: "power2.out", scrollTrigger: { trigger: step, start: "top 86%", once: true } })
      })
    })
    return () => mm.revert()
  }, { scope })

  return (
    <section ref={scope} className="section-space">
      <div className="site-container grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div>
          <p className="eyebrow">How projects move</p>
          <h2 className="mt-5 max-w-xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">A clear route from first conversation to support.</h2>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-8 text-muted-foreground">The plan stays visible, decisions happen with the right people, and each stage produces something useful for the next.</p>
          <figure className="mt-10">
            <div className="photo-frame relative aspect-[4/3]"><Image src="/images/campaign/product-workshop.avif" alt="A focused product planning workshop with Pakistani software professionals" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" /></div>
            <figcaption className="image-disclosure">{siteSettings.representativeImageDisclosure}</figcaption>
          </figure>
        </div>
        <ol className="border-t border-border">
          {processSteps.map((step) => (
            <li key={step.number} data-process-step className="grid grid-cols-[54px_1fr] gap-4 border-b border-border py-7 sm:grid-cols-[72px_0.65fr_1fr] sm:gap-6 sm:py-8">
              <span className="font-mono text-xs text-primary">{step.number}</span>
              <h3 className="font-heading text-xl font-semibold tracking-[-0.025em]">{step.title}</h3>
              <p className="col-start-2 leading-7 text-muted-foreground sm:col-start-auto">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
