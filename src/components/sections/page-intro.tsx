import { cn } from "@/lib/utils"

export function PageIntro({ eyebrow, title, description, className }: { eyebrow: string; title: string; description: string; className?: string }) {
  return (
    <section className={cn("site-container pt-20 pb-14 md:pt-28 md:pb-20", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 max-w-5xl text-balance text-5xl leading-[0.98] font-semibold tracking-[-0.055em] sm:text-6xl lg:text-8xl">{title}</h1>
      <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">{description}</p>
    </section>
  )
}
