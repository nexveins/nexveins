import type { HeroSystemEdge, HeroSystemNode } from "@/lib/types"

export const heroSystemNodes: HeroSystemNode[] = [
  { id: "core", label: "Nexveins", position: [0, 0, 0.25], accent: "primary" },
  { id: "product", label: "Product", position: [-2.7, 1.5, -0.55], accent: "neutral" },
  { id: "experience", label: "Web + mobile", position: [2.75, 1.35, -0.7], accent: "neutral" },
  { id: "ai", label: "AI systems", position: [-2.45, -1.55, -0.9], accent: "cyan" },
  { id: "cloud", label: "Cloud", position: [2.65, -1.45, -0.65], accent: "neutral" },
]

export const heroSystemEdges: HeroSystemEdge[] = [
  { from: "core", to: "product", emphasis: "primary" },
  { from: "core", to: "experience", emphasis: "secondary" },
  { from: "core", to: "ai", emphasis: "secondary" },
  { from: "core", to: "cloud", emphasis: "primary" },
  { from: "product", to: "experience", emphasis: "secondary" },
  { from: "ai", to: "cloud", emphasis: "secondary" },
]
