"use client"

import { useSyncExternalStore } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(() => () => undefined, () => true, () => false)
  if (!mounted) return <span aria-hidden="true" className="block size-9" />

  const isDark = resolvedTheme === "dark"
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      aria-label={isDark ? "Use light theme" : "Use dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative overflow-hidden rounded-full"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <MoonIcon aria-hidden="true" /> : <SunIcon aria-hidden="true" />}
      </motion.span>
    </Button>
  )
}
