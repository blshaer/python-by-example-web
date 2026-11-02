"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/learn/", label: "Lessons" },
  { href: "/projects/", label: "Projects" },
] as const;

function normalizePath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

function isActive(pathname: string, href: string) {
  const path = normalizePath(pathname);
  const target = normalizePath(href);
  return path === target || path.startsWith(`${target}/`);
}

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden h-16 items-center md:flex">
      {links.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex h-full cursor-pointer items-center px-3 text-sm font-medium transition-colors",
              active
                ? "text-foreground"
                : "text-foreground/65 hover:text-foreground",
            )}
          >
            {link.label}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-foreground transition-opacity",
                active ? "opacity-100" : "opacity-0",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
