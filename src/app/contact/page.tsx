import type { Metadata } from "next"
import { Clock3Icon, MailIcon } from "lucide-react"
import { LeadForm } from "@/components/forms/lead-form"
import { PageIntro } from "@/components/sections/page-intro"
import { siteSettings } from "@/lib/content"

export const metadata: Metadata = { title: "Start a project", description: "Share your project context with Nexveins and schedule a discovery call." }

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Start a project" title="Tell us what you need to build." description="Share the business problem, what already exists, and what a successful first release would change." />
      <section className="site-container grid gap-12 pb-24 lg:grid-cols-[0.65fr_1.35fr] lg:pb-32">
        <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:h-fit">
          <div className="border-t border-border pt-5"><MailIcon className="text-primary" aria-hidden="true" /><p className="mt-4 text-sm text-muted-foreground">Prefer email?</p><a href={`mailto:${siteSettings.email}`} className="text-link mt-2 break-all">{siteSettings.email}</a></div>
          <div className="border-t border-border pt-5"><Clock3Icon className="text-primary" aria-hidden="true" /><p className="mt-4 font-semibold">What happens next</p><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">We review the brief, reply with relevant questions, and offer the booking link immediately after a successful submission.</p></div>
        </aside>
        <LeadForm />
      </section>
    </>
  )
}
