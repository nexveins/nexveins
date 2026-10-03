import type { Metadata } from "next"
import { Geist, Space_Grotesk } from "next/font/google"
import { CinematicSystemShell } from "@/components/concept/cinematic-system-shell"

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-concept-display",
  display: "swap",
})

const body = Geist({
  subsets: ["latin"],
  variable: "--font-concept-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cinematic system concept",
  description: "Private Nexveins homepage design prototype.",
  robots: { index: false, follow: false, nocache: true },
}

export default function CinematicSystemConceptPage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <CinematicSystemShell />
    </div>
  )
}
