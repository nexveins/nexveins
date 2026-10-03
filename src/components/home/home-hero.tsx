import Link from "next/link"
import { ArrowDownIcon, ArrowUpRightIcon, BracesIcon, CloudCogIcon, SmartphoneIcon } from "lucide-react"
import { HeroArtwork } from "@/components/home/hero-artwork"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const capabilities = [
  { label: "Web platforms", detail: "Fast, maintainable experiences", icon: BracesIcon },
  { label: "Mobile products", detail: "Useful flows across devices", icon: SmartphoneIcon },
  { label: "Connected systems", detail: "Cloud and automation foundations", icon: CloudCogIcon },
]

export function HomeHero() {
  return (
    <section className="home-hero relative overflow-hidden">
      <div aria-hidden="true" className="home-hero__wash absolute inset-0" />
      <div aria-hidden="true" className="home-hero__line home-hero__line--one" />
      <div aria-hidden="true" className="home-hero__line home-hero__line--two" />

      <div className="site-container relative grid items-center gap-3 pb-8 pt-8 sm:min-h-[520px] sm:grid-cols-12 sm:grid-rows-[1fr_auto] sm:gap-x-0 sm:gap-y-0 sm:py-8 md:min-h-[580px] md:py-10 lg:min-h-[650px] lg:py-8">
        <div className="relative z-10 sm:col-span-5 sm:row-start-1 xl:col-span-5">
          <p className="hero-kicker">
            <span aria-hidden="true" className="size-2 rounded-full bg-primary shadow-[0_0_0_5px_color-mix(in_srgb,var(--primary)_10%,transparent)]" />
            Custom software solutions
          </p>
          <h1 className="mt-5 max-w-[10ch] text-balance font-heading text-[clamp(3.35rem,6.1vw,6.25rem)] leading-[0.9] font-extrabold tracking-[-0.075em] sm:mt-4 sm:max-w-none sm:text-[clamp(2.45rem,5.8vw,3.25rem)] sm:tracking-[-0.065em] lg:mt-5 lg:max-w-[10ch] lg:text-[clamp(3.35rem,6.1vw,6.25rem)] lg:tracking-[-0.075em]">
            Technology in every <span className="text-primary">vein.</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-8 text-muted-foreground sm:mt-4 sm:text-sm sm:leading-6 md:text-base md:leading-7 lg:mt-6 lg:text-xl lg:leading-8">
            We design and build dependable digital products that help growing businesses work with greater clarity.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-5 lg:mt-8 lg:flex lg:gap-3">
            <Link href="/contact" aria-label="Start your project" className={cn(buttonVariants({ size: "lg" }), "h-11 min-w-0 rounded-xl px-2.5 text-sm shadow-[0_12px_28px_color-mix(in_srgb,var(--primary)_22%,transparent)] lg:h-12 lg:px-6 lg:text-base lg:shadow-[0_14px_34px_color-mix(in_srgb,var(--primary)_24%,transparent)]")}>
              <span className="lg:hidden">Start project</span><span className="hidden lg:inline">Start your project</span> <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
            </Link>
            <Link href="#capabilities" aria-label="Explore services" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 min-w-0 rounded-xl bg-card/80 px-2.5 text-sm backdrop-blur-sm lg:h-12 lg:px-6 lg:text-base")}>
              <span className="lg:hidden">Services</span><span className="hidden lg:inline">Explore services</span> <ArrowDownIcon data-icon="inline-end" aria-hidden="true" />
            </Link>
          </div>

        </div>

        <div className="relative min-h-[20rem] sm:col-span-7 sm:row-span-2 sm:row-start-1 sm:min-h-[30rem] md:min-h-[34rem] lg:min-h-[610px]">
          <HeroArtwork />
        </div>

        <div aria-label="Core capabilities" className="grid max-w-2xl gap-0 border-y border-border sm:col-span-5 sm:row-start-2 sm:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <div key={capability.label} className={cn("flex min-h-20 items-center gap-3 py-4 sm:flex-col sm:items-start sm:justify-center sm:gap-1.5 sm:px-2 sm:py-3 lg:flex-row lg:items-center lg:justify-start lg:gap-3 lg:py-4", index > 0 && "border-t border-border sm:border-t-0 sm:border-l", index > 0 && "lg:pl-5", index < capabilities.length - 1 && "lg:pr-5")}>
                <Icon className="size-5 shrink-0 text-primary" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <p className="font-heading text-sm font-bold tracking-[-0.02em] sm:text-xs lg:text-sm">{capability.label}</p>
                  <p className="mt-0.5 text-xs leading-4 text-muted-foreground sm:hidden lg:block">{capability.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
