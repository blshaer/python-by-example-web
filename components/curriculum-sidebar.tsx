"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MageIcon } from "@/components/mage-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { headerIconClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export type CurriculumSection = {
  slug: string;
  title: string;
  lessons: { slug: string; title: string; sectionSlug: string }[];
};

export function CurriculumSidebar({
  sections,
  activeSection,
  activeSlug,
}: {
  sections: CurriculumSection[];
  activeSection?: string;
  activeSlug?: string;
}) {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      {open ? null : (
        <button
          type="button"
          className={cn(headerIconClass, "mt-4 w-auto gap-2 self-start px-2 lg:hidden")}
          aria-expanded={false}
          aria-controls={panelId}
          onClick={() => setOpen(true)}
        >
          <MageIcon name="book" className="h-5 w-5" />
          <span className="text-sm font-medium">Curriculum</span>
        </button>
      )}
      {open ? (
        <button
          type="button"
          aria-label="Close curriculum"
          className="fixed inset-x-0 top-16 bottom-0 z-30 cursor-pointer bg-foreground/20 backdrop-blur-[2px] lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside
        id={panelId}
        className={cn(
          "z-30 w-72 shrink-0 flex-col overflow-hidden border-r border-border bg-background",
          open ? "fixed top-16 bottom-0 flex max-w-[85vw] shadow-lg" : "hidden",
          "lg:sticky lg:top-16 lg:bottom-auto lg:flex lg:h-[calc(100vh-4rem)] lg:max-w-none lg:self-start lg:overflow-hidden lg:shadow-none",
        )}
      >
        <div className="flex items-center justify-between py-3 pr-2 pl-4 sm:pl-6 lg:hidden">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Curriculum
          </p>
          <button
            type="button"
            className={headerIconClass}
            onClick={() => setOpen(false)}
          >
            <MageIcon name="multiply" className="h-5 w-5" />
            <span className="sr-only">Close curriculum</span>
          </button>
        </div>
        <ScrollArea className="min-h-0 flex-1 overflow-y-auto py-6 pr-4 pl-4 sm:pr-6 sm:pl-6 lg:py-6 lg:pl-0">
          <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:block">
            Curriculum
          </p>
          <div className="space-y-5">
            {sections.map((section, index) => (
              <div key={section.slug}>
                <p className="mb-2 text-sm font-medium">
                  <span className="mr-2 font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </p>
                <ul className="space-y-1 border-l border-border pl-3">
                  {section.lessons.map((lesson) => {
                    const href = `/learn/${lesson.sectionSlug}/${lesson.slug}`;
                    const active =
                      lesson.sectionSlug === activeSection && lesson.slug === activeSlug;
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                            active &&
                              "bg-secondary font-medium text-foreground dark:bg-accent dark:text-accent-foreground",
                          )}
                        >
                          {lesson.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
