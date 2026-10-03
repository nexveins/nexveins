"use client"

import { FormEvent, useRef, useState } from "react"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRightIcon, CheckCircle2Icon, SendIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { leadSchema } from "@/lib/lead-schema"
import { siteSettings } from "@/lib/content"

type Errors = Record<string, string>

export function LeadForm() {
  const [service, setService] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")
  const formRef = useRef<HTMLFormElement>(null)
  const turnstileRef = useRef<TurnstileInstance | null>(null)
  const reduceMotion = useReducedMotion()
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      website: form.get("website"),
      service,
      budget,
      timeline,
      summary: form.get("summary"),
      consent,
      website_confirm: form.get("website_confirm"),
      turnstileToken: turnstileRef.current?.getResponse() || undefined,
    }
    const parsed = leadSchema.safeParse(payload)
    if (!parsed.success) {
      const nextErrors: Errors = {}
      parsed.error.issues.forEach((issue) => { nextErrors[String(issue.path[0])] = issue.message })
      setErrors(nextErrors)
      window.setTimeout(() => {
        const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")
        firstInvalid?.focus()
        firstInvalid?.scrollIntoView({ block: "center" })
      }, 50)
      return
    }

    setErrors({})
    setStatus("submitting")
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) })
      const result = await response.json() as { message?: string }
      if (!response.ok) throw new Error(result.message || "Your inquiry could not be sent.")
      setStatus("success")
      formRef.current?.reset()
      turnstileRef.current?.reset()
    } catch (error) {
      setStatus("idle")
      toast.error(error instanceof Error ? error.message : "Your inquiry could not be sent.")
    }
  }

  if (status === "success") {
    return (
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-8 sm:p-10" aria-live="polite">
        <CheckCircle2Icon className="text-primary" aria-hidden="true" />
        <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">Your brief is on its way.</h2>
        <p className="mt-4 max-w-md leading-7 text-muted-foreground">We will review the context before replying. If you are ready, choose a time for the first conversation.</p>
        {siteSettings.calUrl ? <a href={siteSettings.calUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-6">Choose a call time<ArrowUpRightIcon aria-hidden="true" /></a> : null}
      </motion.div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="rounded-xl border border-border bg-card p-5 sm:p-8">
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.name)}><FieldLabel htmlFor="name">Name</FieldLabel><Input id="name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} /><FieldError id="name-error">{errors.name}</FieldError></Field>
          <Field data-invalid={Boolean(errors.email)}><FieldLabel htmlFor="email">Work email</FieldLabel><Input id="email" name="email" type="email" autoComplete="email" spellCheck={false} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} /><FieldError id="email-error">{errors.email}</FieldError></Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={Boolean(errors.company)}><FieldLabel htmlFor="company">Company</FieldLabel><Input id="company" name="company" autoComplete="organization" aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} /><FieldError id="company-error">{errors.company}</FieldError></Field>
          <Field data-invalid={Boolean(errors.website)}><FieldLabel htmlFor="website">Website <span className="text-muted-foreground">Optional</span></FieldLabel><Input id="website" name="website" type="url" inputMode="url" autoComplete="url" placeholder="https://example.com" aria-invalid={Boolean(errors.website)} aria-describedby={errors.website ? "website-error" : undefined} /><FieldError id="website-error">{errors.website}</FieldError></Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field data-invalid={Boolean(errors.service)}><FieldLabel htmlFor="service">What do you need?</FieldLabel><Select name="service" value={service} onValueChange={(value) => setService(value ?? "")}><SelectTrigger id="service" className="h-11 w-full" aria-invalid={Boolean(errors.service)}><SelectValue placeholder="Choose a practice" /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="product-engineering">Product engineering</SelectItem><SelectItem value="digital-experiences-growth">Digital experience & growth</SelectItem><SelectItem value="ai-cloud-solutions">AI & cloud solutions</SelectItem><SelectItem value="not-sure">Not sure yet</SelectItem></SelectGroup></SelectContent></Select><FieldError>{errors.service}</FieldError></Field>
          <Field data-invalid={Boolean(errors.budget)}><FieldLabel htmlFor="budget">Budget range</FieldLabel><Select name="budget" value={budget} onValueChange={(value) => setBudget(value ?? "")}><SelectTrigger id="budget" className="h-11 w-full" aria-invalid={Boolean(errors.budget)}><SelectValue placeholder="Choose a range" /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="under-10k">Under $10k</SelectItem><SelectItem value="10k-25k">$10k to $25k</SelectItem><SelectItem value="25k-50k">$25k to $50k</SelectItem><SelectItem value="50k-plus">$50k+</SelectItem><SelectItem value="not-sure">Not sure</SelectItem></SelectGroup></SelectContent></Select><FieldError>{errors.budget}</FieldError></Field>
          <Field data-invalid={Boolean(errors.timeline)}><FieldLabel htmlFor="timeline">Timeline</FieldLabel><Select name="timeline" value={timeline} onValueChange={(value) => setTimeline(value ?? "")}><SelectTrigger id="timeline" className="h-11 w-full" aria-invalid={Boolean(errors.timeline)}><SelectValue placeholder="Choose timing" /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="asap">As soon as possible</SelectItem><SelectItem value="1-3-months">1 to 3 months</SelectItem><SelectItem value="3-6-months">3 to 6 months</SelectItem><SelectItem value="exploring">Still exploring</SelectItem></SelectGroup></SelectContent></Select><FieldError>{errors.timeline}</FieldError></Field>
        </div>
        <Field data-invalid={Boolean(errors.summary)}><FieldLabel htmlFor="summary">What are you trying to change?</FieldLabel><Textarea id="summary" name="summary" rows={6} placeholder="Tell us what is blocked, what needs to exist, and what a useful result would change…" aria-invalid={Boolean(errors.summary)} aria-describedby={errors.summary ? "summary-error" : "summary-help"} /><FieldDescription id="summary-help">Please do not include passwords, private keys, or regulated personal data.</FieldDescription><FieldError id="summary-error">{errors.summary}</FieldError></Field>
        <Field orientation="horizontal" data-invalid={Boolean(errors.consent)}><Checkbox id="consent" checked={consent} onCheckedChange={setConsent} aria-invalid={Boolean(errors.consent)} /><FieldLabel htmlFor="consent" className="font-normal">Nexveins may use this information to respond to my inquiry.</FieldLabel></Field>
        <AnimatePresence>{errors.consent ? <motion.p role="alert" initial={reduceMotion ? false : { opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-destructive">{errors.consent}</motion.p> : null}</AnimatePresence>
        <div className="sr-only" aria-hidden="true"><label htmlFor="website_confirm">Leave this field empty</label><input id="website_confirm" name="website_confirm" tabIndex={-1} autoComplete="off" /></div>
        {siteKey ? <Turnstile ref={turnstileRef} siteKey={siteKey} options={{ theme: "auto", size: "flexible" }} /> : null}
        <Button type="submit" size="lg" className="h-12 w-full rounded-full sm:w-auto sm:px-7" disabled={status === "submitting"}>{status === "submitting" ? <Spinner data-icon="inline-start" /> : <SendIcon data-icon="inline-start" aria-hidden="true" />}{status === "submitting" ? "Sending…" : "Send project brief"}</Button>
      </FieldGroup>
    </form>
  )
}
