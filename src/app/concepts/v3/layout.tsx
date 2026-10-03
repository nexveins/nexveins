import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Inter, Sora } from "next/font/google"

const display = Sora({ subsets: ["latin"], variable: "--font-v3-display", display: "swap" })
const body = Inter({ subsets: ["latin"], variable: "--font-v3-body", display: "swap" })

export const metadata: Metadata = {
  title: { default: "Four homepage directions", template: "%s | Nexveins concepts" },
  description: "Private Nexveins homepage design exploration.",
  robots: { index: false, follow: false, nocache: true },
}

export default function V3ConceptLayout({ children }: { children: ReactNode }) {
  return <div className={`${display.variable} ${body.variable}`}>{children}</div>
}
