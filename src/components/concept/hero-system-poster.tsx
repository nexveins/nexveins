import { heroSystemEdges, heroSystemNodes } from "@/lib/hero-system"

const posterPositions = {
  core: { left: "50%", top: "50%" },
  product: { left: "19%", top: "22%" },
  experience: { left: "79%", top: "24%" },
  ai: { left: "22%", top: "78%" },
  cloud: { left: "78%", top: "76%" },
} as const

export function HeroSystemPoster() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {heroSystemEdges.map((edge) => {
          const from = posterPositions[edge.from]
          const to = posterPositions[edge.to]
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.left}
              y1={from.top}
              x2={to.left}
              y2={to.top}
              vectorEffect="non-scaling-stroke"
              className={edge.emphasis === "primary" ? "stroke-primary/55" : "stroke-border"}
            />
          )
        })}
      </svg>
      {heroSystemNodes.map((node) => (
        <span
          key={node.id}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-border bg-card/90 px-3 py-2 text-[0.65rem] font-medium text-foreground shadow-sm backdrop-blur-sm"
          style={posterPositions[node.id]}
        >
          {node.label}
        </span>
      ))}
    </div>
  )
}
