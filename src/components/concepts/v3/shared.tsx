"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRightIcon, MenuIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Brand } from "@/components/layout/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { siteSettings } from "@/lib/content"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#capabilities", label: "Services" },
  { href: "#company", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function ConceptHeader({ tone = "solid" }: { tone?: "solid" | "transparent" }) {
  const [open, setOpen] = useState(false)
  return (
    <header className={cn("absolute inset-x-0 top-0 z-40", tone === "solid" && "border-b border-border bg-background/90 backdrop-blur-xl")}>
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Brand className="font-[family-name:var(--font-v3-display)]" />
        <nav aria-label="Concept navigation" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => <Link key={item.label} href={item.href} className="rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.div className="hidden sm:block" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-lg px-5")}>Start a project</Link>
          </motion.div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="outline" size="icon-lg" className="rounded-lg lg:hidden" aria-label="Open navigation" />}><MenuIcon aria-hidden="true" /></SheetTrigger>
            <SheetContent className="w-[min(90vw,420px)]">
              <SheetHeader className="border-b border-border px-6 py-6">
                <SheetTitle>Explore Nexveins</SheetTitle>
                <SheetDescription>Services, company information, and project enquiries.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile concept navigation" className="flex flex-col px-5 py-4">
                {navItems.map((item) => <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="border-b border-border py-5 font-[family-name:var(--font-v3-display)] text-2xl font-semibold tracking-[-0.04em]">{item.label}</Link>)}
              </nav>
              <SheetFooter><Link href="/contact" onClick={() => setOpen(false)} className={cn(buttonVariants({ size: "lg" }), "h-12 w-full rounded-lg")}>Start a project <ArrowUpRightIcon aria-hidden="true" /></Link></SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export function PhotoDirectionSlot({ title, brief, ratio = "wide", className }: { title: string; brief: string; ratio?: "wide" | "portrait"; className?: string }) {
  return (
    <div className={cn("relative isolate overflow-hidden rounded-xl border border-border bg-card", ratio === "wide" ? "aspect-[16/10]" : "aspect-[4/5]", className)}>
      <div aria-hidden="true" className="absolute inset-0 opacity-55 [background:linear-gradient(115deg,transparent_0_42%,color-mix(in_srgb,var(--primary)_9%,transparent)_42%_58%,transparent_58%),linear-gradient(to_right,color-mix(in_srgb,var(--border)_65%,transparent)_1px,transparent_1px)] [background-size:auto,20%_100%]" />
      <div className="absolute inset-x-5 bottom-5 max-w-xl rounded-lg border border-border bg-background/92 p-5 backdrop-blur-md sm:inset-x-auto sm:left-7 sm:bottom-7 sm:p-6">
        <p className="text-sm font-semibold text-primary">Authentic photography required</p>
        <h3 className="mt-2 font-[family-name:var(--font-v3-display)] text-xl font-semibold tracking-[-0.035em]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{brief}</p>
      </div>
    </div>
  )
}

export function ProjectCta({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion()
  return (
    <section className="bg-primary text-primary-foreground">
      <div className={cn("mx-auto flex max-w-[1480px] flex-col justify-between px-5 py-16 sm:px-8 lg:px-12", compact ? "min-h-[58vh]" : "min-h-[70vh]")}>
        <span className="font-[family-name:var(--font-v3-display)] text-lg font-semibold">Nexveins</span>
        <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="text-balance font-[family-name:var(--font-v3-display)] text-[clamp(3.2rem,7vw,7.8rem)] leading-[0.9] font-semibold tracking-[-0.075em] lg:col-span-9">Tell us what you need to build.</h2>
          <div className="flex flex-col items-start gap-5 lg:col-span-3">
            <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
              <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-lg bg-background px-6 font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">Start a project <ArrowUpRightIcon aria-hidden="true" /></Link>
            </motion.div>
            <a href={`mailto:${siteSettings.email}`} className="rounded-sm underline decoration-primary-foreground/45 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{siteSettings.email}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ConceptBackLink() {
  return <Link href="/concepts/v3" className="fixed right-4 bottom-4 z-50 hidden rounded-lg border border-border bg-background/92 px-4 py-2 text-xs font-semibold shadow-sm backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:block">Compare all four</Link>
}
