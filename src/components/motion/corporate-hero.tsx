"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { buttonVariants } from "@/components/ui/button"
import { siteSettings } from "@/lib/content"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

export function CorporateHero() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-copy] > *", { opacity: 0, y: 18, duration: 0.62, stagger: 0.08, ease: "power2.out" })
      gsap.from("[data-hero-image]", { opacity: 0, y: 20, scale: 0.985, duration: 0.78, delay: 0.1, ease: "power2.out" })
    })
    return () => mm.revert()
  }, { scope })

  return (
    <section ref={scope} className="border-b border-border bg-card">
      <div className="site-container min-h-[calc(100dvh-72px)] py-12 lg:py-16">
        <div data-hero-copy>
          <p className="eyebrow">Software development company</p>
          <h1 className="display-title mt-6 max-w-[1240px] lg:text-[clamp(4rem,6.4vw,5.75rem)]">Software built in Sahiwal for businesses moving forward.</h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:gap-14">
            <div className="pb-1">
              <p className="max-w-lg text-pretty text-lg leading-8 text-muted-foreground">Nexveins designs and engineers web, mobile, cloud, and AI systems for growing businesses.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:items-start">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-6")}>Start a project<ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" /></Link>
                <Link href="#capabilities" className="text-link px-1">See our capabilities<ArrowDownIcon aria-hidden="true" /></Link>
              </div>
            </div>
            <figure data-hero-image className="min-w-0">
              <div className="photo-frame relative aspect-[16/8.5]">
                <Image src="/images/campaign/hero-office.avif" alt="Pakistani software professionals collaborating in a practical contemporary office" fill preload fetchPriority="high" sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover object-center" />
                <Image src="/nexveins-mark-512.png" alt="" width={110} height={110} className="absolute top-[13%] right-[5%] hidden h-auto w-[10%] min-w-16 object-contain lg:block" aria-hidden="true" />
              </div>
              <figcaption className="image-disclosure">{siteSettings.representativeImageDisclosure}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
