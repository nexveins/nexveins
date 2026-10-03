import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="site-container flex min-h-[70dvh] items-center py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">404 / Route not found</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">This path ends here.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          The page may have moved, or the link may be incomplete. Start again from the homepage.
        </p>
        <Button className="mt-9" size="lg" render={<Link href="/" />}>
          Return home <ArrowUpRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}

