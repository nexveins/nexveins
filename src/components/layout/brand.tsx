import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Brand({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Nexveins home" className={cn("inline-flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring", className)}>
      <Image src="/nexveins-mark-64.png" width={44} height={44} alt="" preload className="size-9 object-contain sm:size-10" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.08rem] font-extrabold tracking-[-0.045em] uppercase">Nex<span className="text-primary">veins</span></span>
        <span className="mt-1 text-[0.52rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">Software house</span>
      </span>
    </Link>
  )
}
