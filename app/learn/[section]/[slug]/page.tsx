import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { Sidebar } from "@/components/sidebar";
import { Badge } from "@/components/ui/badge";
import {
  getAdjacentLessons,
  getLesson,
  getSections,
} from "@/lib/content";

type Params = { section: string; slug: string };

export function generateStaticParams() {
  return getSections().flatMap((section) =>
    section.lessons.map((lesson) => ({
      section: section.slug,
      slug: lesson.slug,
    })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  const lesson = getLesson(resolved.section, resolved.slug);
  return {
    title: lesson?.title ?? "Lesson",
    description: lesson?.sectionSummary,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { section, slug } = await params;
  const lesson = getLesson(section, slug);
  if (!lesson) notFound();
  const { previous, next } = getAdjacentLessons(section, slug);

  return (
    <>
      <Sidebar activeSection={section} activeSlug={slug} />
      <article
        className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8"
        data-pagefind-body
      >
        <p className="text-sm text-muted-foreground">{lesson.section}</p>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight"
          data-pagefind-meta="title"
        >
          {lesson.title}
        </h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">{lesson.sourceFile}</Badge>
        </div>
        <div className="mt-8">
          <Mdx source={lesson.body} />
        </div>
        <nav className="mt-12 flex justify-between gap-4 border-t border-border pt-6 text-sm">
          {previous ? (
            <Link
              href={`/learn/${previous.sectionSlug}/${previous.slug}`}
              className="text-muted-foreground hover:text-foreground"
            >
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/learn/${next.sectionSlug}/${next.slug}`}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              {next.title} →
            </Link>
          ) : null}
        </nav>
      </article>
    </>
  );
}
