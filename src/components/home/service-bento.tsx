import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon, BlocksIcon, BrainCircuitIcon, Globe2Icon, SmartphoneIcon } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { serviceSpokes } from "@/lib/content"
import { cn } from "@/lib/utils"

const featuredIds = ["web", "software", "mobile", "ai"]
const icons = [Globe2Icon, BlocksIcon, SmartphoneIcon, BrainCircuitIcon]

export function ServiceBento() {
  const featuredServices = featuredIds.map((id) => serviceSpokes.find((service) => service.id === id)).filter((service) => service !== undefined)

  return (
    <section id="capabilities" className="scroll-mt-24 py-20 md:py-24">
      <div className="site-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-3xl">
            <p className="section-label">What we do</p>
            <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl">Services built for <span className="text-primary">useful growth.</span></h2>
          </Reveal>
          <Link href="/services" className="text-link shrink-0">View all services <ArrowUpRightIcon className="size-4" aria-hidden="true" /></Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map((service, index) => {
            const Icon = icons[index]
            const featured = index === 0
            return (
              <Reveal key={service.id} delay={index * 0.045} className="h-full">
                <article className={cn("service-card group relative flex h-full min-h-[19rem] overflow-hidden rounded-2xl border p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1", featured ? "border-[#0b56c7] bg-[#061b3b] text-white shadow-[0_24px_62px_rgba(0,77,181,0.22)]" : "border-border bg-card shadow-[0_14px_38px_color-mix(in_srgb,var(--foreground)_5%,transparent)] hover:border-primary/30 hover:shadow-[0_20px_46px_color-mix(in_srgb,var(--primary)_10%,transparent)]")}>
                  {featured ? <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(31,177,255,0.34),transparent_30%),linear-gradient(145deg,transparent_35%,rgba(0,101,255,0.28))]" /> : null}
                  <div className="relative flex w-full flex-col">
                    <div className={cn("flex size-12 items-center justify-center rounded-xl border", featured ? "border-white/20 bg-white/10 text-[#4bd3ff]" : "border-primary/12 bg-primary/8 text-primary")}>
                      <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3 className="mt-7 max-w-[16ch] text-balance text-2xl font-bold leading-tight tracking-[-0.04em]">{service.label}</h3>
                    <p className={cn("mt-4 leading-7", featured ? "text-white/70" : "text-muted-foreground")}>{service.summary}</p>
                    <Link href={`/services/${service.parentSlug}`} aria-label={`Explore ${service.label}`} className={cn("mt-auto flex size-11 items-center justify-center self-end rounded-full border transition-colors", featured ? "border-white/25 text-white hover:border-[#4bd3ff] hover:text-[#4bd3ff]" : "border-border text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground")}>
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
