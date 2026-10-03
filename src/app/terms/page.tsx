import type { Metadata } from "next"
import { PageIntro } from "@/components/sections/page-intro"

export const metadata: Metadata = { title: "Terms" }

export default function TermsPage() {
  return (
    <><PageIntro eyebrow="Legal" title="Website terms" description="Basic conditions for using the Nexveins website." /><div className="site-container max-w-3xl pb-24"><div className="flex flex-col gap-10 border-t border-border pt-10 text-pretty leading-7 text-muted-foreground"><section><h2 className="text-xl font-semibold text-foreground">Website content</h2><p className="mt-3">The website provides general information about Nexveins and does not create a client relationship, project commitment, warranty, or professional advice.</p></section><section><h2 className="text-xl font-semibold text-foreground">Intellectual property</h2><p className="mt-3">Nexveins branding, writing, and original website materials may not be reproduced or presented as another company’s work without written permission. Client materials remain subject to their respective ownership terms.</p></section><section><h2 className="text-xl font-semibold text-foreground">Availability</h2><p className="mt-3">The website may change or become temporarily unavailable. Nexveins is not responsible for third-party services or websites reached through external links.</p></section><p className="text-sm">These terms must be reviewed against the company’s registered jurisdiction and contracting practices before public launch.</p></div></div></>
  )
}
