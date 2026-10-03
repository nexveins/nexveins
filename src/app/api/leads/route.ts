import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { Resend } from "resend"
import { leadSchema } from "@/lib/lead-schema"

const rateLimit = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(4, "10 m"), analytics: true, prefix: "nexveins:leads" })
  : null

const localAttempts = new Map<string, number[]>()

function passesLocalRateLimit(ip: string) {
  const now = Date.now()
  const windowStart = now - 10 * 60 * 1000
  const recent = (localAttempts.get(ip) ?? []).filter((attempt) => attempt > windowStart)
  if (recent.length >= 4) return false
  recent.push(now)
  localAttempts.set(ip, recent)
  return true
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  const body = new URLSearchParams({ secret, response: token, remoteip: ip })
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, cache: "no-store" })
  if (!response.ok) return false
  const result = await response.json() as { success?: boolean }
  return result.success === true
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (rateLimit) {
    const limit = await rateLimit.limit(ip)
    if (!limit.success) return Response.json({ message: "Too many attempts. Please wait a few minutes and try again." }, { status: 429 })
  } else if (!passesLocalRateLimit(ip)) {
    return Response.json({ message: "Too many attempts. Please wait a few minutes and try again." }, { status: 429 })
  }

  let body: unknown
  try { body = await request.json() } catch { return Response.json({ message: "The request could not be read." }, { status: 400 }) }
  const parsed = leadSchema.safeParse(body)
  if (!parsed.success || parsed.data.website_confirm) return Response.json({ message: "Review the form and try again." }, { status: 400 })

  const turnstileValid = await verifyTurnstile(parsed.data.turnstileToken, ip)
  if (!turnstileValid) return Response.json({ message: "Spam verification expired. Please refresh and try again." }, { status: 400 })

  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.LEAD_RECIPIENT_EMAIL
  const sender = process.env.LEAD_FROM_EMAIL
  if (!apiKey || !recipient || !sender) return Response.json({ message: "Email delivery is not configured yet. Please contact hello@nexveins.com directly." }, { status: 503 })

  const resend = new Resend(apiKey)
  const lead = parsed.data
  const summary = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    `Website: ${lead.website || "Not provided"}`,
    `Service: ${lead.service}`,
    `Budget: ${lead.budget}`,
    `Timeline: ${lead.timeline}`,
    "",
    lead.summary,
  ].join("\n")

  const [teamEmail, confirmationEmail] = await Promise.all([
    resend.emails.send({ from: sender, to: recipient, replyTo: lead.email, subject: `New project brief from ${lead.company}`, text: summary }),
    resend.emails.send({ from: sender, to: lead.email, subject: "Nexveins received your project brief", text: `Hi ${lead.name},\n\nThanks for sharing the context. The Nexveins team will review it before replying.\n\nNexveins` }),
  ])

  if (teamEmail.error || confirmationEmail.error) return Response.json({ message: "Email delivery failed. Please contact hello@nexveins.com directly." }, { status: 502 })
  return Response.json({ ok: true })
}
