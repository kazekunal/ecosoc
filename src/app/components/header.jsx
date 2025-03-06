import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <span className="text-xl font-extrabold tracking-tighter text-primary">
            IQTISADIYYAT
          </span>
          <span className="text-sm font-medium">by The Economics Society</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="#speakers" className="text-sm font-medium hover:text-primary">
            Speakers
          </Link>
          <Link
            href="#experience"
            className="text-sm font-medium hover:text-primary"
          >
            Experience
          </Link>
          <Link href="#schedule" className="text-sm font-medium hover:text-primary">
            Schedule
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </Link>
        </nav>
        <Button asChild size="sm" className="hidden md:inline-flex">
          <Link href="#tickets">Buy Tickets</Link>
        </Button>
      </div>
    </header>
  );
}