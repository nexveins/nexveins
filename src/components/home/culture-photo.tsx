"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { siteSettings } from "@/lib/content"

export function CulturePhoto() {
  const reduceMotion = useReducedMotion()

  return (
    <figure className="relative min-h-[360px] overflow-hidden lg:col-span-5 lg:min-h-[500px]">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 overflow-hidden bg-muted"
      >
        <Image
          src="/images/campaign/culture.avif"
          alt="A group of Pakistani software professionals working together in a contemporary Sahiwal office"
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <figcaption className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/30 bg-background/90 px-3 py-2 text-xs leading-5 text-muted-foreground backdrop-blur-md sm:right-auto sm:max-w-md">{siteSettings.representativeImageDisclosure}</figcaption>
    </figure>
  )
}
