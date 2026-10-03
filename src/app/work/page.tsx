import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = { title: "Work", robots: { index: false, follow: false } }

export default function WorkPage() {
  notFound()
}
