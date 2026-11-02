import Link from "next/link";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Build these yourself from the challenge README, then compare with the
        included solution.
      </p>
      <div className="mt-8 grid gap-4">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="rounded-2xl border border-border bg-card p-5 hover:bg-muted/40"
          >
            <h2 className="text-lg font-medium">{project.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{project.sourceDir}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
