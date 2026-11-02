"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MageIcon } from "@/components/mage-icon";
import { headerIconClass, pageContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

const links = [
  { href: "/learn/", label: "Lessons" },
  { href: "/projects/", label: "Projects" },
  {
    href: "https://github.com/blshaer/python-by-example",
    label: "GitHub",
    external: true,
  },
] as const;

function normalizePath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className={headerIconClass}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <MageIcon name="multiply" className="h-5 w-5" />
        ) : (
          <MageIcon name="dash-menu" className="h-5 w-5" />
        )}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      {mounted && open
        ? createPortal(
            <>
              <button
                type="button"
                aria-label="Close menu"
                className="fixed inset-x-0 top-16 bottom-0 z-40 cursor-pointer bg-foreground/30 backdrop-blur-[2px]"
                onClick={() => setOpen(false)}
              />
              <nav
                id="mobile-navigation"
                className="fixed inset-x-0 top-16 z-50 border-b border-border bg-background shadow-sm"
              >
                <div className={cn(pageContainerClass, "flex flex-col gap-1 py-3")}>
                  {links.map((link) => {
                    const external = "external" in link;
                    const active =
                      !external &&
                      (normalizePath(pathname) === normalizePath(link.href) ||
                        normalizePath(pathname).startsWith(
                          `${normalizePath(link.href)}/`,
                        ));
                    const className = cn(
                      "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                      active
                        ? "bg-muted text-foreground"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground",
                    );
                    if (external) {
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={className}
                        >
                          {link.label}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={className}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
