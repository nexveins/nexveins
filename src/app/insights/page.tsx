import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRightIcon } from "lucide-react"
import { PageIntro } from "@/components/sections/page-intro"
import { articles } from "@/lib/content"

export const metadata: Metadata = { title: "Insights", description: "Practical notes on product strategy, delivery, AI, automation, and digital systems." }

const dateFormatter = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })

export default function InsightsPage() {
  if (articles.length === 0) notFound()
  return (
    <>
      <PageIntro eyebrow="Insights" title="Notes for teams making difficult product decisions." description="Practical thinking from the work: product definition, delivery, connected systems, and responsible automation." />
      <section className="site-container pb-24 md:pb-32">
        <div className="divide-y divide-border border-y border-border">
          {articles.map((article) => (
            <Link key={article.slug} href={`/insights/${article.slug}`} className="group grid gap-5 py-9 outline-none focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[180px_1fr_auto] md:items-start">
              <div className="font-mono text-xs text-muted-foreground"><p>{article.topic}</p><p className="mt-2">{dateFormatter.format(new Date(article.publishedAt))}</p></div>
              <div><h2 className="text-3xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-primary">{article.title}</h2><p className="mt-4 max-w-2xl text-pretty leading-7 text-muted-foreground">{article.excerpt}</p><p className="mt-4 font-mono text-xs text-muted-foreground">{article.readingTime}</p></div>
              <ArrowUpRightIcon className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
