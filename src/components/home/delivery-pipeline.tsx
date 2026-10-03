import { DraftingCompassIcon, LightbulbIcon, RocketIcon, WrenchIcon } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"

const stages = [
  { title: "Discover", body: "Clarify the business constraint, the people affected, and what useful progress looks like.", icon: LightbulbIcon },
  { title: "Plan and design", body: "Shape the release, test important flows, and make tradeoffs visible before production expands.", icon: DraftingCompassIcon },
  { title: "Build", body: "Move design and engineering together through short, reviewable releases with quality built in.", icon: WrenchIcon },
  { title: "Launch and improve", body: "Release carefully, learn from product evidence, and keep reliability and support close.", icon: RocketIcon },
]

export function DeliveryPipeline() {
  return (
    <section id="process" className="scroll-mt-24 border-y border-border bg-muted/70 py-20 md:py-24">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2.2fr] lg:items-start">
          <Reveal>
            <p className="section-label">Our process</p>
            <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl">A clear path to <span className="text-primary">your next release.</span></h2>
          </Reveal>
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <div aria-hidden="true" className="absolute top-7 right-[10%] left-[10%] hidden border-t border-dashed border-primary/35 lg:block" />
            {stages.map((stage, index) => {
              const Icon = stage.icon
              return (
                <li key={stage.title} className="relative">
                  <Reveal delay={index * 0.055} className="h-full">
                    <article className="flex h-full flex-col pt-1">
                      <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-primary/20 bg-card text-primary shadow-[0_8px_24px_color-mix(in_srgb,var(--primary)_9%,transparent)]"><Icon className="size-5" strokeWidth={1.8} aria-hidden="true" /></div>
                      <p className="mt-5 font-mono text-[0.68rem] font-semibold tracking-[0.12em] text-primary">0{index + 1}</p>
                      <h3 className="mt-1 text-lg font-bold tracking-[-0.03em]">{stage.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{stage.body}</p>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
