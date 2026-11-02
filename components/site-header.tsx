import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { HeaderNav } from "@/components/header-nav";
import { HeaderSearch } from "@/components/header-search";
import { MageIcon } from "@/components/mage-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSearchItems } from "@/lib/content";
import { headerIconClass, pageContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const searchItems = getSearchItems();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:shadow-sm"
      >
        Skip to content
      </a>
      <div className={cn(pageContainerClass, "relative flex h-16 items-center gap-2 sm:gap-4")}>
        <MobileNav />
        <Link
          href="/"
          className="min-w-0 truncate font-semibold tracking-tight hover:text-foreground"
        >
          Python by Example
        </Link>
        <HeaderNav />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <HeaderSearch items={searchItems} />
          <ThemeToggle />
          <a
            href="https://github.com/blshaer/python-by-example"
            aria-label="GitHub"
            title="GitHub"
            className={cn(headerIconClass, "hidden md:inline-flex")}
          >
            <MageIcon name="github" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
