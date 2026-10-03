import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import { articles } from "@/lib/content"

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })) }

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const article = articles.find((item) => item.slug === slug)
  return article ? { title: article.title, description: article.excerpt } : { title: "Insight not found" }
}

const dateFormatter = new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })

export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params
  const article = articles.find((item) => item.slug === slug)
  if (!article) notFound()
  const articleJsonLd = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, datePublished: article.publishedAt, author: { "@type": "Organization", name: "Nexveins" } }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
      <header className="site-container max-w-5xl pt-16 pb-14 md:pt-24 md:pb-20">
        <Link href="/insights" className="text-link text-sm"><ArrowLeftIcon aria-hidden="true" />All insights</Link>
        <div className="mt-14 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground"><span>{article.topic}</span><time dateTime={article.publishedAt}>{dateFormatter.format(new Date(article.publishedAt))}</time><span>{article.readingTime}</span></div>
        <h1 className="mt-6 text-balance text-5xl leading-[0.98] font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">{article.title}</h1>
        <p className="mt-7 max-w-2xl text-pretty text-xl leading-8 text-muted-foreground">{article.excerpt}</p>
      </header>
      <div className="border-t border-border bg-card"><div className="site-container max-w-3xl py-16 md:py-24">{article.sections.map((section) => <section key={section.heading} className="mb-14 last:mb-0"><h2 className="text-3xl font-semibold tracking-[-0.04em]">{section.heading}</h2><div className="mt-6 flex flex-col gap-5 text-pretty text-lg leading-8 text-muted-foreground">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div></div>
    </article>
  )
}
