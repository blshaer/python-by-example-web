import Link from "next/link";
import { getSections } from "@/lib/content";

export const metadata = {
  title: "Lessons",
};

export default function LearnIndex() {
  const sections = getSections();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Lessons</h1>
      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.slug}>
            <h2 className="text-xl font-medium">{section.title}</h2>
            <ul className="mt-3 grid gap-2">
              {section.lessons.map((lesson) => (
                <li key={lesson.slug}>
                  <Link
                    href={`/learn/${lesson.sectionSlug}/${lesson.slug}`}
                    className="text-primary hover:underline"
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
