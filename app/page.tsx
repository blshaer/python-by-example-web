import Link from "next/link";
import { firstLessonHref, getProjects, getSections } from "@/lib/content";
import { buttonVariants } from "@/components/ui/button";
import { Curriculum } from "@/components/curriculum";
import { HeroCode } from "@/components/hero-code";
import { ProjectCard } from "@/components/project-card";
import { pageContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export default function Home() {
  const sections = getSections();
  const projects = getProjects();
  const lessonCount = sections.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );
  const startHref = firstLessonHref();
  const firstLesson = sections[0]?.lessons[0];

  return (
    <main className={cn(pageContainerClass, "py-12 sm:py-16")}>
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Python 3.10+</span>
            <span className="h-1 w-1 rounded-full bg-foreground/30" aria-hidden />
            <span>{sections.length} sections</span>
            <span className="h-1 w-1 rounded-full bg-foreground/30" aria-hidden />
            <span>{lessonCount} lessons</span>
            <span className="h-1 w-1 rounded-full bg-foreground/30" aria-hidden />
            <span>{projects.length} projects</span>
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Learn Python by reading code you can actually run.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            A structured path from print statements to APIs, tests, and CLI apps.
            Each lesson is a single file with comments, then a project that puts
            the idea to work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={startHref}
              className={cn(buttonVariants({ size: "lg" }), "rounded-lg")}
            >
              Start with print()
            </Link>
            <a
              href="#curriculum"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-lg",
              )}
            >
              See the curriculum
            </a>
          </div>
        </div>
        <HeroCode
          href={startHref}
          filename={firstLesson?.sourceFile ?? "01_basics/01_print.py"}
        />
      </section>

      <Curriculum />

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Four builds, in order. Try each one yourself, then open the solution.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-border py-16 text-center">
        <p className="text-lg text-muted-foreground">
          {lessonCount} lessons. Begin at print().
        </p>
        <Link
          href={startHref}
          className={cn(buttonVariants({ size: "lg" }), "mt-6 rounded-lg")}
        >
          Start with print()
        </Link>
      </section>
    </main>
  );
}
