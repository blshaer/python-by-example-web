import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { getProject, getProjects } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8" data-pagefind-body>
      <Mdx source={project.body} />
    </article>
  );
}
