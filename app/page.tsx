import Link from "next/link";
import { firstLessonHref, getProjects, getSections } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const sections = getSections();
  const projects = getProjects();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <section className="max-w-3xl">
        <Badge variant="secondary">Python 3.10+ · example-first</Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Learn Python by reading code you can actually run.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          A structured path from print statements to APIs, tests, and CLI apps.
          Each lesson is a single file with comments, then a project that puts
          the idea to work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={firstLessonHref()} className={cn(buttonVariants({ size: "lg" }))}>
            Start with print()
          </Link>
          <Link
            href="/projects"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Browse projects
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <Link
            key={section.slug}
            href={`/learn/${section.slug}/${section.lessons[0]?.slug ?? ""}`}
            className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <p className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-lg font-medium">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {section.summary}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              {section.lessons.length} lessons
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="rounded-2xl border border-border bg-card p-5 hover:bg-muted/40"
            >
              <h3 className="font-medium">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{project.sourceDir}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
