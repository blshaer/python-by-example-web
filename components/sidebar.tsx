import Link from "next/link";
import { getSections } from "@/lib/content";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function Sidebar({
  activeSection,
  activeSlug,
}: {
  activeSection?: string;
  activeSlug?: string;
}) {
  const sections = getSections();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-border lg:block">
      <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                          active && "bg-muted font-medium text-foreground",
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
  );
}
