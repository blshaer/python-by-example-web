import { getProjects } from "@/lib/content";
import { pageContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className={cn(pageContainerClass, "py-12")}>
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Four builds, in order. Try each one yourself, then open the solution.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} titleAs="h2" />
        ))}
      </div>
    </main>
  );
}
