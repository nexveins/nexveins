import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { ConceptHeader } from "@/components/concepts/v3/shared"

const directions = [
  { href: "/concepts/v3/spatial-core", name: "Spatial Core", summary: "A cinematic engineering system with a restrained interactive Three.js core.", motion: "Three.js plus one pinned GSAP narrative", media: "Two authentic photography slots" },
  { href: "/concepts/v3/engineering-blueprint", name: "Engineering Blueprint", summary: "A precise architectural direction using diagrams, strong type, and visible relationships.", motion: "SVG line progression and restrained reveals", media: "Two authentic photography slots" },
  { href: "/concepts/v3/documentary-studio", name: "Documentary Studio", summary: "A human editorial direction designed around genuine Nexveins workplace photography.", motion: "Masked media entrances and typographic pacing", media: "Two essential authentic photographs" },
  { href: "/concepts/v3/delivery-network", name: "Delivery Network", summary: "A connected delivery model that follows work from the first question through support.", motion: "Sticky service network with active states", media: "One authentic environmental photograph" },
]

export default function ConceptComparisonPage() {
  return (
    <div className="concept-shell concept-v3 min-h-[100dvh] bg-background font-[family-name:var(--font-v3-body)] text-foreground">
      <ConceptHeader />
      <main className="pt-20">
        <section className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <p className="text-sm font-semibold text-primary">Private design review</p>
          <h1 className="mt-6 max-w-5xl text-balance font-[family-name:var(--font-v3-display)] text-[clamp(3.4rem,7vw,7.8rem)] leading-[0.9] font-semibold tracking-[-0.08em]">Four credible ways Nexveins can feel next.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">Each direction uses the same factual content, brand accent, routes, and conversion intent. Compare composition, interaction, and character.</p>
        </section>
        <section className="border-t border-border">
          {directions.map((direction, index) => (
            <Link key={direction.href} href={direction.href} className="group block border-b border-border focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring">
              <article className="mx-auto grid min-h-80 max-w-[1480px] gap-8 px-5 py-12 transition-colors group-hover:bg-card/55 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12">
                <span className="font-[family-name:var(--font-v3-display)] text-6xl font-semibold text-border lg:col-span-2">0{index + 1}</span>
                <div className="lg:col-span-5"><h2 className="font-[family-name:var(--font-v3-display)] text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">{direction.name}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{direction.summary}</p></div>
                <div className="grid gap-4 text-sm lg:col-span-4"><p><span className="font-semibold text-foreground">Motion:</span> <span className="text-muted-foreground">{direction.motion}</span></p><p><span className="font-semibold text-foreground">Photography:</span> <span className="text-muted-foreground">{direction.media}</span></p></div>
                <ArrowUpRightIcon className="size-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 lg:col-span-1" aria-hidden="true" />
              </article>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
