import Link from "next/link";
import { Search } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { firstLessonHref } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <MobileNav />
        <Link href="/" className="font-semibold tracking-tight">
          Python by Example
        </Link>
        <nav className="ml-auto hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <Link href={firstLessonHref()} className="hover:text-foreground">
            Lessons
          </Link>
          <Link href="/projects" className="hover:text-foreground">
            Projects
          </Link>
          <Link href="/search" className="inline-flex items-center gap-2 hover:text-foreground">
            <Search className="h-4 w-4" />
            Search
          </Link>
          <a
            href="https://github.com/blshaer/python-by-example"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
