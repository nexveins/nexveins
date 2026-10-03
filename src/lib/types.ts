export type ThemeMode = "light" | "dark"
export type MotionMode = "full" | "reduced" | "static"

export type HeroSystemNode = {
  id: "core" | "product" | "experience" | "ai" | "cloud"
  label: string
  position: [number, number, number]
  accent: "primary" | "cyan" | "neutral"
}

export type HeroSystemEdge = {
  from: HeroSystemNode["id"]
  to: HeroSystemNode["id"]
  emphasis: "primary" | "secondary"
}

export type HeroSceneMode = "interactive" | "reduced" | "static"

export type BrandImage = {
  asset: string | { _ref: string; _type: "reference" }
  alt: string
  sourceType: "real" | "representative"
  visibleDisclosure?: string
  focalPoint?: { x: number; y: number }
  usage: "hero" | "culture" | "service" | "case-study" | "team"
}

export type ServicePractice = {
  slug: string
  index: string
  title: string
  shortTitle: string
  promise: string
  description: string
  capabilities: string[]
  outcomes: string[]
}

export type ServiceSpoke = {
  id: string
  label: string
  shortLabel: string
  summary: string
  parentSlug:
    | "product-engineering"
    | "digital-experiences-growth"
    | "ai-cloud-solutions"
  outcomes: string[]
}

export type CaseStudy = {
  slug: string
  title: string
  client?: string
  summary: string
  services: string[]
  image?: string
  approved: boolean
  featured: boolean
  clientApproved: boolean
  publishReady: boolean
  role?: string
  verifiedOutcomes?: string[]
}

export type ProjectSceneItem = {
  slug: string
  title: string
  texture?: string
  order: number
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  topic: string
  readingTime: string
  publishedAt: string
  sections: Array<{ heading: string; body: string[] }>
  publicationState: "draft" | "review" | "published"
}

export type Job = {
  slug: string
  title: string
  department: string
  location: string
  employmentType: string
  active: boolean
  publicationState: "draft" | "review" | "published"
}

export type Person = {
  name: string
  role: string
  biography: string
  image?: string
  consentStatus: "pending" | "approved" | "withdrawn"
  publicationState: "draft" | "review" | "published"
}

export type LeadSubmission = {
  name: string
  email: string
  company: string
  website?: string
  service: string
  budget: string
  timeline: string
  summary: string
  consent: boolean
  turnstileToken?: string
  website_confirm?: string
}

export type SiteSettings = {
  title: string
  description: string
  email: string
  calUrl: string
  location: string
  address?: string
  contactMethods: Array<{ label: string; value: string; href: string }>
  socialLinks: Array<{ label: string; href: string }>
  representativeImageDisclosure: string
}
