import type { Article, ServicePractice, ServiceSpoke, SiteSettings } from "@/lib/types"

export const siteSettings: SiteSettings = {
  title: "Nexveins",
  description:
    "Nexveins is a Sahiwal software company building dependable web, mobile, cloud, and AI systems for growing businesses.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@nexveins.com",
  calUrl: process.env.NEXT_PUBLIC_CAL_URL || "",
  location: "Sahiwal, Pakistan",
  contactMethods: [],
  socialLinks: [],
  representativeImageDisclosure: "Representative campaign imagery. Nexveins is based in Sahiwal, Pakistan.",
}

export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export const services: ServicePractice[] = [
  {
    slug: "product-engineering",
    index: "01",
    title: "Custom Software Development",
    shortTitle: "Product",
    promise: "Build dependable business software around the way your teams actually work.",
    description:
      "We work from product definition through interface design, architecture, development, quality, and the decisions that follow launch.",
    capabilities: [
      "Product discovery and definition",
      "UX and interface design",
      "Web and mobile applications",
      "APIs and platform architecture",
      "Quality engineering",
      "Continuous product delivery",
    ],
    outcomes: [
      "A product scope the team can defend",
      "A maintainable technical foundation",
      "A release process built for learning",
    ],
  },
  {
    slug: "digital-experiences-growth",
    index: "02",
    title: "Web and Mobile Product Development",
    shortTitle: "Growth",
    promise: "Take a web or mobile product from a clear plan to a maintainable release.",
    description:
      "We connect brand, content, interface, and measurement so websites and commerce experiences do useful work after launch.",
    capabilities: [
      "Marketing and company websites",
      "E-commerce experiences",
      "Design systems",
      "Content platforms",
      "Technical SEO foundations",
      "Conversion improvement",
    ],
    outcomes: [
      "A distinctive and coherent digital presence",
      "Faster publishing and iteration",
      "A measurable path from attention to action",
    ],
  },
  {
    slug: "ai-cloud-solutions",
    index: "03",
    title: "AI Automation and Cloud",
    shortTitle: "Systems",
    promise: "Connect systems, reduce manual work, and modernize the infrastructure behind growth.",
    description:
      "We design practical automation, integrations, and cloud systems around a real operational constraint, not a technology demo.",
    capabilities: [
      "Workflow automation",
      "AI-assisted product features",
      "System and data integrations",
      "Cloud architecture",
      "Platform modernization",
      "Observability and reliability",
    ],
    outcomes: [
      "Less repetitive operational work",
      "Connected data and tools",
      "Infrastructure ready for responsible growth",
    ],
  },
]

export const serviceSpokes: ServiceSpoke[] = [
  {
    id: "strategy",
    label: "Product Strategy & UX",
    shortLabel: "Strategy",
    summary: "Clarify the product, the people it serves, and the decisions that matter before delivery begins.",
    parentSlug: "product-engineering",
    outcomes: ["Product discovery and definition", "UX and interface design", "A focused first release"],
  },
  {
    id: "software",
    label: "Custom Software",
    shortLabel: "Software",
    summary: "Build dependable business software around the way your teams actually work.",
    parentSlug: "product-engineering",
    outcomes: ["APIs and platform architecture", "Quality engineering", "Continuous product delivery"],
  },
  {
    id: "web",
    label: "Web Platforms",
    shortLabel: "Web",
    summary: "Create fast, maintainable websites and commerce experiences that support publishing and growth.",
    parentSlug: "digital-experiences-growth",
    outcomes: ["Marketing and company websites", "E-commerce experiences", "Content platforms"],
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    shortLabel: "Mobile",
    summary: "Take a mobile product from a clear plan to a maintainable release across the devices your customers use.",
    parentSlug: "digital-experiences-growth",
    outcomes: ["Product flows and prototypes", "Mobile application engineering", "Release and iteration"],
  },
  {
    id: "ai",
    label: "AI & Automation",
    shortLabel: "AI",
    summary: "Reduce repetitive work and add bounded AI capabilities around a real operational constraint.",
    parentSlug: "ai-cloud-solutions",
    outcomes: ["Workflow automation", "AI-assisted product features", "System and data integrations"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    shortLabel: "Cloud",
    summary: "Modernize the infrastructure behind growth with reliable cloud architecture and operational visibility.",
    parentSlug: "ai-cloud-solutions",
    outcomes: ["Cloud architecture", "Platform modernization", "Observability and reliability"],
  },
]

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    body: "We map the business constraint, the users affected, and what evidence will count as progress.",
  },
  {
    number: "02",
    title: "Planning",
    body: "We turn ambiguity into a focused release, visible tradeoffs, and a delivery plan the team understands.",
  },
  {
    number: "03",
    title: "Design",
    body: "We prototype the important decisions early, test the flow, and establish a system before polishing screens.",
  },
  {
    number: "04",
    title: "Engineering",
    body: "Design and engineering move together through short, reviewable releases with quality built into the work.",
  },
  {
    number: "05",
    title: "Launch",
    body: "After launch, we use product evidence to decide what to refine, automate, remove, or build next.",
  },
  {
    number: "06",
    title: "Support",
    body: "We stay close after release to improve reliability, respond to evidence, and plan what comes next.",
  },
]

export const articles: Article[] = [
  /* Articles remain unpublished until Nexveins approves and owns the editorial content.
  {
    slug: "strong-product-handoff",
    title: "A strong product handoff is not a handoff",
    excerpt:
      "How design and engineering can share decisions instead of passing files across a wall.",
    topic: "Product delivery",
    readingTime: "5 min read",
    publishedAt: "2026-09-18",
    sections: [
      {
        heading: "Share decisions, not just screens",
        body: [
          "A screen rarely explains why a flow exists, which tradeoff won, or what must remain flexible. The useful unit of collaboration is the decision: its context, evidence, constraints, and open questions.",
          "When engineers join those decisions early, feasibility becomes design material. When designers stay through implementation, details do not evaporate between tools.",
        ],
      },
      {
        heading: "Build one working language",
        body: [
          "A small design system, shared acceptance criteria, and named states give the team a vocabulary that survives changing screens. Loading, empty, failure, and recovery states belong in that language from the start.",
          "The goal is not perfect documentation. It is fewer assumptions hiding inside the work.",
        ],
      },
    ],
  },
  {
    slug: "automation-before-ai",
    title: "Map the workflow before adding AI",
    excerpt:
      "The quickest way to waste an AI budget is to automate a process nobody has made explicit.",
    topic: "AI & operations",
    readingTime: "4 min read",
    publishedAt: "2026-09-08",
    sections: [
      {
        heading: "Start with the queue",
        body: [
          "Before selecting a model, write down what enters the workflow, who decides, where work waits, and what a useful result looks like. This exposes whether the real problem is retrieval, routing, validation, or judgment.",
          "Automation works best where inputs are observable and mistakes are recoverable. AI can then support a bounded decision instead of pretending to own the whole process.",
        ],
      },
      {
        heading: "Keep the exit visible",
        body: [
          "Every automated path needs a human-readable result, a confidence boundary, and a clear route back to a person. Reliability comes from the surrounding system as much as the model inside it.",
        ],
      },
    ],
  },
  {
    slug: "fewer-better-metrics",
    title: "Fewer metrics, better product conversations",
    excerpt:
      "Choose measures that change a decision, not numbers that decorate a dashboard.",
    topic: "Product strategy",
    readingTime: "3 min read",
    publishedAt: "2026-08-26",
    sections: [
      {
        heading: "A metric needs a consequence",
        body: [
          "A useful measure answers a question the team is willing to act on. If no result would change the next release, the metric is reporting rather than learning.",
          "Start with one behavior that represents delivered value, one signal of friction, and one operational constraint. Add detail only when it explains a decision those measures cannot.",
        ],
      },
    ],
  }, */
]

export const principles = [
  {
    title: "Direct access to the delivery team",
    body: "You work with the people making product and engineering decisions, not a chain of account handoffs.",
  },
  {
    title: "Practical planning",
    body: "We define a useful first release, make tradeoffs visible, and keep the plan connected to business priorities.",
  },
  {
    title: "Transparent communication",
    body: "Regular working reviews make progress, questions, and risks clear while there is still time to respond.",
  },
  {
    title: "Maintainable engineering",
    body: "We build for the team that will operate and extend the software after the first release.",
  },
]
