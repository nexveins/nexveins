"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRightIcon, MenuIcon } from "lucide-react"
import { Brand } from "@/components/layout/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants, Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { navItems } from "@/lib/content"
import { cn } from "@/lib/utils"

const headerItems = [
  navItems[0],
  navItems[1],
  { href: "/#process", label: "Process" },
  navItems[2],
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="site-header sticky top-0 z-40 border-b border-border/75 bg-background/88 backdrop-blur-2xl">
      <div className="site-container flex h-20 items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <Brand className="lg:justify-self-start" />
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex lg:justify-self-center">
          {headerItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative rounded-md px-1 py-3 text-sm font-semibold text-muted-foreground transition-colors duration-200 after:absolute after:right-1 after:bottom-1 after:left-1 after:h-px after:origin-center after:scale-x-0 after:bg-primary after:transition-transform hover:text-primary hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 lg:justify-self-end">
          <ThemeToggle />
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "hidden h-11 rounded-xl px-5 shadow-[0_10px_24px_color-mix(in_srgb,var(--primary)_22%,transparent)] sm:inline-flex")}>Get started <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" /></Link>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<Button className="lg:hidden" variant="outline" size="icon-lg" aria-label="Open navigation" />}>
              <MenuIcon aria-hidden="true" />
            </SheetTrigger>
            <SheetContent className="w-[min(88vw,390px)]">
              <SheetHeader className="border-b border-border px-6 py-5">
                <SheetTitle>Navigate Nexveins</SheetTitle>
                <SheetDescription>Explore our services and company, or start a project.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col px-4 py-4">
                {headerItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    <span className="flex min-h-12 items-center border-b border-border px-2 text-lg font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Link href="/contact" onClick={() => setMobileOpen(false)} className={cn(buttonVariants({ size: "lg" }), "w-full")}>Start a project</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
