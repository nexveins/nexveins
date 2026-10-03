"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { ArrowDownRightIcon, ArrowUpRightIcon, MenuIcon } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useReducedMotion } from "motion/react"
import { Brand } from "@/components/layout/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { HeroSystemPoster } from "@/components/concept/hero-system-poster"
import { principles, processSteps, services, siteSettings } from "@/lib/content"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HeroSystemScene = dynamic(
  () => import("@/components/concept/hero-system-scene").then((module) => module.HeroSystemScene),
  { ssr: false, loading: () => <HeroSystemPoster /> },
)

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const capabilityRail = ["Web platforms", "Mobile products", "Cloud systems", "Applied AI"]

function canUseInteractiveScene() {
  if (typeof window === "undefined") return false
  if (window.innerWidth < 1024) return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) return false
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  if ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || (memory && memory <= 2)) return false
  const canvas = document.createElement("canvas")
  return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))
}

export function CinematicSystemShell() {
  const scope = useRef<HTMLDivElement>(null)
  const sceneFrame = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [mobileOpen, setMobileOpen] = useState(false)
  const sceneEnabled = useSyncExternalStore(
    () => () => undefined,
    canUseInteractiveScene,
    () => false,
  )
  const [sceneActive, setSceneActive] = useState(true)
  const [contextLost, setContextLost] = useState(false)

  useEffect(() => {
    const frame = sceneFrame.current
    if (!frame || !sceneEnabled) return
    const observer = new IntersectionObserver(([entry]) => setSceneActive(entry.isIntersecting && !document.hidden), { threshold: 0.05 })
    const onVisibility = () => setSceneActive(!document.hidden && frame.getBoundingClientRect().bottom > 0)
    observer.observe(frame)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [sceneEnabled])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })
      timeline
        .from("[data-concept-nav]", { opacity: 0, y: -14, duration: 0.55 })
        .from("[data-hero-line]", { opacity: 0, yPercent: 32, duration: 0.78, stagger: 0.08 }, "-=0.18")
        .from("[data-hero-support]", { opacity: 0, y: 18, duration: 0.58, stagger: 0.07 }, "-=0.42")
        .from("[data-system-frame]", { opacity: 0, scale: 0.965, duration: 0.9 }, "-=0.62")
    })
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const visual = scope.current?.querySelector<HTMLElement>("[data-capability-visual]")
      const section = scope.current?.querySelector<HTMLElement>("[data-capability-section]")
      const steps = gsap.utils.toArray<HTMLElement>("[data-capability-step]")
      const nodes = gsap.utils.toArray<HTMLElement>("[data-capability-node]")
      if (!visual || !section) return

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: visual,
        pinSpacing: false,
      })

      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onToggle: ({ isActive }) => {
            if (!isActive) return
            gsap.to(nodes, { opacity: 0.28, scale: 0.92, duration: 0.35, overwrite: true })
            gsap.to(`[data-capability-node="${index}"]`, { opacity: 1, scale: 1, duration: 0.45, overwrite: true })
          },
        })
      })
    })
    return () => mm.revert()
  }, { scope })

  const renderScene = sceneEnabled && !contextLost && !reduceMotion

  return (
    <div ref={scope} className="concept-shell min-h-[100dvh] overflow-x-clip bg-background font-[family-name:var(--font-concept-body)] text-foreground">
      <header data-concept-nav className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-20 w-full max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Brand className="font-[family-name:var(--font-concept-display)]" />
          <nav aria-label="Concept navigation" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "hidden h-11 rounded-full px-5 sm:inline-flex")}>Start a project</Link>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger render={<Button variant="outline" size="icon-lg" className="rounded-full lg:hidden" aria-label="Open navigation" />}>
                <MenuIcon aria-hidden="true" />
              </SheetTrigger>
              <SheetContent className="w-[min(90vw,420px)]">
                <SheetHeader className="border-b border-border px-6 py-6">
                  <SheetTitle>Explore Nexveins</SheetTitle>
                  <SheetDescription>Services, company information, and project enquiries.</SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile concept navigation" className="flex flex-col px-5 py-4">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="border-b border-border py-5 font-[family-name:var(--font-concept-display)] text-2xl font-medium tracking-[-0.03em]">
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <SheetFooter>
                  <Link href="/contact" onClick={() => setMobileOpen(false)} className={cn(buttonVariants({ size: "lg" }), "h-12 w-full rounded-full")}>Start a project<ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" /></Link>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative isolate min-h-[100dvh] overflow-hidden border-b border-border pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--border)_42%,transparent)_1px,transparent_1px)] bg-[size:20vw_100%] opacity-35" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100dvh-5rem)] w-full max-w-[1480px] grid-cols-1 px-5 pb-8 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="relative z-10 flex flex-col justify-end pb-8 pt-[31vh] sm:justify-start sm:pb-12 sm:pt-[42vh] lg:col-span-6 lg:justify-end lg:pb-16 lg:pt-24">
            <p data-hero-support className="mb-5 max-w-max rounded-full border border-border bg-background/78 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
              Product engineering from Sahiwal, Pakistan
            </p>
            <h1 className="max-w-[690px] font-[family-name:var(--font-concept-display)] text-[clamp(2.55rem,6.2vw,6.8rem)] leading-[0.91] font-medium tracking-[-0.07em]">
              <span data-hero-line className="block">Software built</span>
              <span data-hero-line className="block">in Sahiwal for</span>
              <span data-hero-line className="block text-primary">businesses moving forward.</span>
            </h1>
            <div className="mt-8 flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p data-hero-support className="max-w-md text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Nexveins designs and engineers web, mobile, cloud, and AI systems for growing businesses.
              </p>
              <div data-hero-support className="flex shrink-0 items-center gap-3">
                <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                  <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-6")}>Start a project<ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" /></Link>
                </motion.div>
                <Link href="#system-introduction" aria-label="See what Nexveins builds" className="flex size-12 items-center justify-center rounded-full border border-border bg-background/70 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                  <ArrowDownRightIcon aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div ref={sceneFrame} data-system-frame className="absolute inset-x-3 top-20 h-[29vh] min-h-56 max-h-64 overflow-hidden rounded-xl border border-border bg-card/45 sm:inset-x-8 sm:h-[34vh] sm:max-h-80 lg:inset-y-24 lg:right-12 lg:left-[50%] lg:h-auto lg:max-h-none">
            {renderScene ? <HeroSystemScene active={sceneActive} onContextLost={() => setContextLost(true)} /> : <HeroSystemPoster />}
            <div className="absolute top-4 right-4 rounded-full border border-border bg-background/80 px-3 py-1.5 text-[0.65rem] font-medium text-muted-foreground backdrop-blur-md">
              {renderScene ? "Interactive system" : "Static system"}
            </div>
          </div>
        </div>
      </section>

      <section id="system-introduction" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="mx-auto grid w-full max-w-[1480px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-8">
            <p className="max-w-5xl font-[family-name:var(--font-concept-display)] text-[clamp(2.5rem,5.4vw,5.8rem)] leading-[0.98] font-medium tracking-[-0.06em]">
              Strategy, design, and engineering connected as one delivery system.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:pl-8">
            <p className="max-w-md text-pretty text-lg leading-8 text-muted-foreground">
              We work with growing teams that need useful software, direct technical thinking, and a clear route from uncertainty to release.
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border pt-6">
              {capabilityRail.map((capability) => (
                <span key={capability} className="text-sm font-medium text-foreground">{capability}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-capability-section id="capabilities" className="relative border-y border-border bg-card/45">
        <div className="mx-auto grid w-full max-w-[1480px] lg:grid-cols-12 lg:px-12">
          <div data-capability-visual className="relative flex min-h-[72vh] items-center overflow-hidden border-b border-border px-5 py-20 sm:px-8 lg:col-span-7 lg:h-[100dvh] lg:border-r lg:border-b-0 lg:px-0 lg:py-0">
            <div className="relative mx-auto aspect-square w-full max-w-[640px]">
              <div className="absolute inset-[12%] rounded-full border border-border" />
              <div className="absolute inset-[28%] rounded-full border border-border" />
              <div className="absolute top-1/2 left-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm sm:size-36">
                <Image src="/nexveins-mark-64.png" width={54} height={54} alt="" className="size-12 object-contain" />
              </div>
              {services.map((service, index) => {
                const positions = ["top-[7%] left-[8%]", "top-[16%] right-[1%]", "right-[8%] bottom-[8%]"]
                return (
                  <div key={service.slug} data-capability-node={index} className={cn("absolute max-w-48 rounded-xl border border-border bg-background p-4 shadow-sm", positions[index])}>
                    <span className="text-xs font-medium text-primary">{service.shortTitle}</span>
                    <p className="mt-2 font-[family-name:var(--font-concept-display)] text-lg font-medium tracking-[-0.03em]">{service.title}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-12">
            {services.map((service) => (
              <article key={service.slug} data-capability-step className="flex min-h-[68vh] flex-col justify-center border-b border-border px-5 py-20 last:border-b-0 sm:px-8 lg:min-h-[100dvh] lg:px-0 lg:pr-4">
                <p className="text-sm font-medium text-primary">{service.shortTitle}</p>
                <h2 className="mt-5 max-w-xl font-[family-name:var(--font-concept-display)] text-4xl leading-[1.02] font-medium tracking-[-0.055em] sm:text-5xl">{service.title}</h2>
                <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">{service.description}</p>
                <Link href={`/services/${service.slug}`} className="mt-9 inline-flex w-max items-center gap-2 font-medium text-foreground underline decoration-border underline-offset-8 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                  Explore the practice <ArrowUpRightIcon aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto grid w-full max-w-[1480px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-12">
          <div className="lg:col-span-7">
            <div className="relative flex aspect-[4/3] min-h-96 items-end overflow-hidden rounded-xl border border-dashed border-border bg-card p-6 sm:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--border)_45%,transparent)_1px,transparent_1px)] bg-[size:25%_100%] opacity-45" />
              <div className="relative max-w-md">
                <p className="text-sm font-medium text-primary">Photography art direction</p>
                <p className="mt-3 font-[family-name:var(--font-concept-display)] text-2xl font-medium tracking-[-0.04em]">Real Nexveins delivery team in a working review</p>
                <p className="mt-3 leading-7 text-muted-foreground">Use a wide candid frame with an active product or architecture discussion. No staged poses or generated people.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pl-8">
            <h2 className="max-w-xl font-[family-name:var(--font-concept-display)] text-4xl leading-[1.02] font-medium tracking-[-0.055em] sm:text-6xl">Built for clear working relationships.</h2>
            <div className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle.title} className="border-t border-border py-6">
                  <h3 className="font-[family-name:var(--font-concept-display)] text-lg font-medium tracking-[-0.025em]">{principle.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{principle.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/45 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <p className="font-[family-name:var(--font-concept-display)] text-[clamp(2.7rem,5.6vw,6.2rem)] leading-[0.98] font-medium tracking-[-0.06em]">A project moves forward when every decision has a clear next step.</p>
          </div>
          <ol className="relative mt-20 grid gap-10 lg:grid-cols-6 lg:gap-5">
            <span className="absolute top-3 right-0 left-0 hidden h-px bg-border lg:block" aria-hidden="true" />
            {processSteps.map((step, index) => (
              <li key={step.number} className="relative grid grid-cols-[24px_1fr] gap-4 lg:block">
                <span className="relative z-10 mt-1 block size-6 rounded-full border border-primary bg-background lg:mb-8" aria-hidden="true">
                  <span className="absolute inset-1.5 rounded-full bg-primary" />
                </span>
                <div>
                  <p className="font-[family-name:var(--font-concept-display)] text-xl font-medium tracking-[-0.03em]">{step.title}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p>
                </div>
                {index < processSteps.length - 1 ? <span className="absolute top-7 bottom-[-2.5rem] left-[0.7rem] w-px bg-border lg:hidden" aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto grid w-full max-w-[1480px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12">
          <div className="lg:col-span-5">
            <h2 className="font-[family-name:var(--font-concept-display)] text-5xl leading-[0.98] font-medium tracking-[-0.06em] sm:text-7xl">Rooted in Sahiwal. Built to work across distance.</h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">Nexveins is building a focused engineering company in Sahiwal with the standards, communication, and technical discipline required by growing teams anywhere.</p>
            <Link href="/about" className="mt-9 inline-flex items-center gap-2 font-medium text-foreground underline decoration-border underline-offset-8 transition-colors hover:text-primary">Read our company story <ArrowUpRightIcon aria-hidden="true" /></Link>
          </div>
          <div className="lg:col-span-7 lg:pl-10">
            <div className="relative flex aspect-[16/10] min-h-96 items-end overflow-hidden rounded-xl border border-dashed border-border bg-card p-6 sm:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,color-mix(in_srgb,var(--foreground)_7%,transparent))]" />
              <div className="relative max-w-md rounded-lg border border-border bg-background/90 p-5 backdrop-blur-sm">
                <p className="text-sm font-medium text-primary">Photography art direction</p>
                <p className="mt-2 leading-7 text-muted-foreground">A genuine Nexveins workplace frame showing the environment, equipment, and people naturally at work in Sahiwal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex min-h-[72vh] w-full max-w-[1480px] flex-col justify-between px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <Image src="/nexveins-mark-64.png" width={56} height={56} alt="" className="size-12 object-contain" />
          <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:items-end">
            <h2 className="font-[family-name:var(--font-concept-display)] text-[clamp(3.2rem,7vw,7.8rem)] leading-[0.88] font-medium tracking-[-0.075em] lg:col-span-9">Tell us what you need to build.</h2>
            <div className="flex flex-col items-start gap-5 lg:col-span-3">
              <Link href="/contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-background px-6 font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">Start a project <ArrowUpRightIcon aria-hidden="true" /></Link>
              <a href={`mailto:${siteSettings.email}`} className="underline decoration-primary-foreground/40 underline-offset-8 hover:decoration-primary-foreground">{siteSettings.email}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
