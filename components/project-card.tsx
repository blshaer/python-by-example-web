import Link from "next/link";
import { MageIcon, type MageIconName } from "@/components/mage-icon";
import {
  formatProjectTitle,
  getProjectLessonLinks,
  type Project,
} from "@/lib/content";
import { cn } from "@/lib/utils";

const PROJECT_ICONS: Record<string, MageIconName> = {
  "expense-tracker": "dollar",
  "library-management": "book",
  "number-guessing-game": "goals",
  "weather-cli": "water-drop",
};

export function ProjectCard({
  project,
  titleAs: Title = "h3",
  className,
}: {
  project: Project;
  titleAs?: "h2" | "h3";
  className?: string;
}) {
  const title = formatProjectTitle(project.title);
  const lessons = getProjectLessonLinks(project.slug);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-sm",
        className,
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={title}
        className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <div className="pointer-events-none relative flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
          <MageIcon
            name={PROJECT_ICONS[project.slug] ?? "folder"}
            className="h-5 w-5"
          />
        </span>
        <p className="font-mono text-xs text-muted-foreground">
          P{project.order}
        </p>
        {project.order === 1 ? (
          <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium">
            First project
          </span>
        ) : null}
        {project.level ? (
          <span className="ml-auto rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {project.level}
          </span>
        ) : null}
      </div>
      <Title className="pointer-events-none relative mt-4 text-lg font-medium tracking-tight">
        {title}
      </Title>
      {project.summary ? (
        <p className="pointer-events-none relative mt-2 flex-1 text-sm leading-6 text-muted-foreground">
          {project.summary}
        </p>
      ) : null}
      {lessons.length > 0 ? (
        <p className="relative z-10 mt-4 text-xs text-muted-foreground">
          {lessons.map((lesson, index) => (
            <span key={lesson.href}>
              {index > 0 ? <span aria-hidden> · </span> : null}
              <Link
                href={lesson.href}
                className="rounded-sm text-link underline decoration-link/40 underline-offset-2 hover:decoration-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {lesson.label}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
    </article>
  );
}
