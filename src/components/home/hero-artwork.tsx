"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"

const ease = [0.16, 1, 0.3, 1] as const

export function HeroArtwork() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 0.96 }}
      animate={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.82, delay: 0.08, ease }}
      className="absolute inset-[-8%_-18%_-6%_-14%] sm:inset-[4%_-28%_2%_-24%] md:inset-[-3%_-12%_-4%_-10%] lg:inset-[-2%_-12%_-2%_-18%]"
    >
      <div aria-hidden="true" className="absolute inset-[22%_16%_14%_22%] rounded-full bg-primary/15 blur-3xl dark:bg-primary/10" />
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/home/nexveins-device-hero.png"
          alt="Laptop and phone displaying abstract product dashboards, surrounded by flowing blue forms"
          fill
          priority
          sizes="(min-width: 1280px) 66vw, (min-width: 1024px) 62vw, (min-width: 640px) 70vw, 110vw"
          className="object-contain drop-shadow-[0_34px_50px_color-mix(in_srgb,var(--primary)_19%,transparent)]"
        />
      </motion.div>
    </motion.div>
  )
}
