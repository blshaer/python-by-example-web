import Link from "next/link";
import {
  formatLessonTitle,
  getCurriculumStages,
  type Lesson,
  type LessonSection,
} from "@/lib/content";
import { cn } from "@/lib/utils";

function lessonHref(lesson: Pick<Lesson, "sectionSlug" | "slug">) {
  return `/learn/${lesson.sectionSlug}/${lesson.slug}`;
}

export function Curriculum() {
  const stages = getCurriculumStages();
  let number = 0;
  const numbered = stages.map((stage) => ({
    ...stage,
    sections: stage.sections.map((section) => {
      number += 1;
      return { section, number };
    }),
  }));

  return (
    <section id="curriculum" className="mt-20 scroll-mt-24">
      <h2 className="text-2xl font-semibold tracking-tight">Curriculum</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Work in order, or jump to a topic. Every lesson is one file you can run.
      </p>

      <div className="mt-10 space-y-12">
        {numbered.map((stage) => {
          const start = stage.sections[0]?.number;
          const end = stage.sections.at(-1)?.number;
          const four = stage.sections.length === 4;

          return (
            <div key={stage.id}>
              <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-medium tracking-tight">
                  {stage.label}
                </h3>
                {start && end ? (
                  <p className="font-mono text-xs text-muted-foreground">
                    {String(start).padStart(2, "0")}–{String(end).padStart(2, "0")}
                  </p>
                ) : null}
              </div>
              <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
                {stage.description}
              </p>
              <div
                className={cn(
                  "grid gap-4 sm:grid-cols-2",
                  four ? "xl:grid-cols-4" : "lg:grid-cols-3",
                )}
              >
                {stage.sections.map(({ section, number: index }) => (
                  <SectionCard
                    key={section.slug}
                    section={section}
                    index={index}
                    last={section.slug === "testing"}
                    wideFinish={section.slug === "testing"}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SectionCard({
  section,
  index,
  last,
  wideFinish,
}: {
  section: LessonSection;
  index: number;
  last: boolean;
  wideFinish: boolean;
}) {
  const first = section.lessons[0];

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-5",
        wideFinish && "sm:col-span-2 lg:col-span-1",
      )}
    >
      <header className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-xs text-muted-foreground">
              {String(index).padStart(2, "0")}
            </p>
            {index === 1 ? (
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium">
                Start here
              </span>
            ) : null}
            {last ? (
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium">
                Finish
              </span>
            ) : null}
          </div>
          <h4 className="mt-2 text-lg font-medium tracking-tight">
            {section.title}
          </h4>
        </div>
        {first ? (
          <Link
            href={lessonHref(first)}
            className="mt-0.5 shrink-0 cursor-pointer text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Start ${section.title} with ${formatLessonTitle(first.title, first.slug)}`}
          >
            Start →
          </Link>
        ) : null}
      </header>

      <ul className="-mx-2 mt-4 flex flex-col gap-0.5">
        {section.lessons.map((lesson, lessonIndex) => (
          <li key={lesson.slug}>
            <Link
              href={lessonHref(lesson)}
              title={lesson.title}
              className={cn(
                "block cursor-pointer rounded-lg px-2 py-1.5 text-sm leading-5 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                lessonIndex === 0
                  ? "text-foreground hover:bg-muted"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {formatLessonTitle(lesson.title, lesson.slug)}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
