"use client"

import Link from "next/link"
import { ArrowUpRightIcon, MailIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { buttonVariants } from "@/components/ui/button"
import { siteSettings } from "@/lib/content"
import { cn } from "@/lib/utils"

export function ClosingCta() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="pb-10 md:pb-12">
      <div className="site-container">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="closing-cta relative overflow-hidden rounded-2xl bg-[#04152f] px-6 py-10 text-white shadow-[0_28px_80px_rgba(0,77,181,0.22)] sm:px-10 lg:px-12 lg:py-11">
          <div aria-hidden="true" className="cta-flow absolute inset-0" />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold tracking-[0.12em] text-[#55d8ff] uppercase">Let&apos;s build together</p>
              <h2 className="mt-3 max-w-3xl text-balance text-3xl font-extrabold tracking-[-0.05em] sm:text-5xl">Turn your ideas <span className="text-[#37c7ff]">into reality.</span></h2>
              <p className="mt-3 max-w-2xl leading-7 text-white/70">Share the business problem, what already exists, and where an experienced software team can help.</p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
              <motion.div whileTap={reduceMotion ? undefined : { scale: 0.97 }}>
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-xl bg-white px-6 text-[#071934] shadow-lg hover:bg-white/90")}>Start a project <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" /></Link>
              </motion.div>
              <a href={`mailto:${siteSettings.email}`} className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-white/72 underline decoration-white/25 underline-offset-6 transition-colors hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"><MailIcon className="size-4" aria-hidden="true" />{siteSettings.email}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
