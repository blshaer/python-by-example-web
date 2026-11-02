import { CurriculumSidebar } from "@/components/curriculum-sidebar";
import { getSections } from "@/lib/content";

export function Sidebar({
  activeSection,
  activeSlug,
}: {
  activeSection?: string;
  activeSlug?: string;
}) {
  const sections = getSections().map((section) => ({
    slug: section.slug,
    title: section.title,
    lessons: section.lessons.map((lesson) => ({
      slug: lesson.slug,
      title: lesson.title,
      sectionSlug: lesson.sectionSlug,
    })),
  }));

  return (
    <CurriculumSidebar
      sections={sections}
      activeSection={activeSection}
      activeSlug={activeSlug}
    />
  );
}
