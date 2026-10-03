import type { Metadata, Viewport } from "next"
import { Geist_Mono, Manrope, Source_Sans_3 } from "next/font/google"
import Script from "next/script"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { siteSettings } from "@/lib/content"
import "./globals.css"

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" })
const sourceSans = Source_Sans_3({ variable: "--font-source-sans", subsets: ["latin"], display: "swap" })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nexveins.com"),
  title: { default: "Nexveins | Software development company in Sahiwal", template: "%s | Nexveins" },
  description: siteSettings.description,
  applicationName: "Nexveins",
  openGraph: {
    type: "website",
    title: "Nexveins | Software development company in Sahiwal",
    description: siteSettings.description,
    siteName: "Nexveins",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexveins | Software development company in Sahiwal",
    description: siteSettings.description,
  },
  icons: { icon: "/nexveins-mark.png", apple: "/nexveins-mark.png" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f17" },
  ],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${sourceSans.variable} ${geistMono.variable}`}>
      <body className="min-h-[100dvh] bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <Toaster richColors position="bottom-right" />
          {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
            <Script
              defer
              data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
              src="https://plausible.io/js/script.js"
              strategy="afterInteractive"
            />
          ) : null}
        </ThemeProvider>
      </body>
    </html>
  )
}
