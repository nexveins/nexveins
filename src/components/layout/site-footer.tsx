import Link from "next/link"
import { MailIcon, MapPinIcon } from "lucide-react"
import { Brand } from "@/components/layout/brand"
import { navItems, siteSettings } from "@/lib/content"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="site-container py-9">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <Brand />
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm lg:justify-center">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="min-h-11 content-center text-muted-foreground transition-colors hover:text-primary">{item.label}</Link>)}
            <Link href="/#process" className="min-h-11 content-center text-muted-foreground transition-colors hover:text-primary">Process</Link>
          </nav>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground lg:items-end">
            <a href={`mailto:${siteSettings.email}`} className="inline-flex min-h-11 items-center gap-2 font-semibold transition-colors hover:text-primary"><MailIcon className="size-4 text-primary" aria-hidden="true" />{siteSettings.email}</a>
            <span className="inline-flex items-center gap-2"><MapPinIcon className="size-4 text-primary" aria-hidden="true" />Sahiwal, Pakistan</span>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Nexveins. All rights reserved.</p>
          <div className="flex gap-5"><Link href="/privacy" className="hover:text-primary">Privacy</Link><Link href="/terms" className="hover:text-primary">Terms</Link></div>
          <p>Technology in every vein.</p>
        </div>
      </div>
    </footer>
  )
}
