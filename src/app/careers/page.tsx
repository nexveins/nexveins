import type { Metadata } from "next"
import { MailIcon, UsersIcon } from "lucide-react"
import { PageIntro } from "@/components/sections/page-intro"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { siteSettings } from "@/lib/content"

export const metadata: Metadata = { title: "Careers", description: "Careers and open roles at Nexveins." }

export default function CareersPage() {
  return (
    <>
      <PageIntro eyebrow="Careers" title="Small teams. Direct responsibility. Work that reaches production." description="Open roles will appear here when they are approved and active. We do not keep permanent job listings for positions that do not exist." />
      <section className="site-container pb-24 md:pb-32">
        <Empty className="min-h-[400px] border border-border bg-card"><EmptyHeader><EmptyMedia variant="icon"><UsersIcon aria-hidden="true" /></EmptyMedia><EmptyTitle>No open roles right now</EmptyTitle><EmptyDescription>If your experience closely matches our work, you may still introduce yourself. We will only retain your details with your permission.</EmptyDescription></EmptyHeader><a href={`mailto:${siteSettings.email}?subject=Career%20introduction`} className="text-link"><MailIcon aria-hidden="true" />Introduce yourself</a></Empty>
      </section>
    </>
  )
}
