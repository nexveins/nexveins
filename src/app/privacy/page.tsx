import type { Metadata } from "next"
import { PageIntro } from "@/components/sections/page-intro"

export const metadata: Metadata = { title: "Privacy" }

export default function PrivacyPage() {
  return (
    <><PageIntro eyebrow="Legal" title="Privacy" description="How information submitted through this website is handled." /><div className="site-container max-w-3xl pb-24"><div className="flex flex-col gap-10 border-t border-border pt-10 text-pretty leading-7 text-muted-foreground"><section><h2 className="text-xl font-semibold text-foreground">Information you provide</h2><p className="mt-3">When you submit a project inquiry, Nexveins receives the contact and project information you enter so the team can respond. Do not include confidential credentials, private keys, or regulated personal data.</p></section><section><h2 className="text-xl font-semibold text-foreground">Service providers</h2><p className="mt-3">The website may use managed providers for hosting, email delivery, scheduling, content management, spam prevention, and privacy-conscious analytics. Their use is limited to operating the website and responding to requests.</p></section><section><h2 className="text-xl font-semibold text-foreground">Retention and requests</h2><p className="mt-3">Inquiry data is retained only as long as needed for the business conversation and related legal obligations. Contact Nexveins to request access, correction, or deletion.</p></section><p className="text-sm">This operational notice must be reviewed against the company’s registered jurisdiction and final vendor configuration before public launch.</p></div></div></>
  )
}
