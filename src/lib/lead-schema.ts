import { z } from "zod"

const optionalUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().url("Enter a complete website URL, including https://").optional(),
)

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid work email").max(160),
  company: z.string().trim().min(2, "Enter your company name").max(120),
  website: optionalUrl,
  service: z.enum(["product-engineering", "digital-experiences-growth", "ai-cloud-solutions", "not-sure"], { message: "Choose a service" }),
  budget: z.enum(["under-10k", "10k-25k", "25k-50k", "50k-plus", "not-sure"], { message: "Choose a budget range" }),
  timeline: z.enum(["asap", "1-3-months", "3-6-months", "exploring"], { message: "Choose a timeline" }),
  summary: z.string().trim().min(30, "Tell us a little more so we can prepare").max(2500),
  consent: z.literal(true, { message: "Confirm that we may respond to your inquiry" }),
  turnstileToken: z.string().optional(),
  website_confirm: z.string().max(0).optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
