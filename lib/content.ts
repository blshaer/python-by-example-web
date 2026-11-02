import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "curriculum");

export type Lesson = {
  title: string;
  section: string;
  sectionSlug: string;
  sectionSummary: string;
  order: number;
  sourceFile: string;
  slug: string;
  body: string;
};

export type Project = {
  title: string;
  slug: string;
  sourceDir: string;
  body: string;
};

export type LessonSection = {
  slug: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

function readMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(dir, file));
}

export function getLessons(): Lesson[] {
  const files = readMdxFiles(path.join(CONTENT_DIR, "lessons"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);
      const slug = path.basename(file, ".mdx");
      return {
        title: String(data.title),
        section: String(data.section),
        sectionSlug: String(data.sectionSlug),
        sectionSummary: String(data.sectionSummary ?? ""),
        order: Number(data.order ?? 0),
        sourceFile: String(data.sourceFile ?? ""),
        slug,
        body: content,
      } satisfies Lesson;
    })
    .sort((a, b) => {
      const section = a.sectionSlug.localeCompare(b.sectionSlug);
      if (section !== 0) return section;
      return a.order - b.order;
    });
}

export function getSections(): LessonSection[] {
  const lessons = getLessons();
  const order = [
    "basics",
    "control-flow",
    "loops",
    "data-structures",
    "functions",
    "modules-packages",
    "error-handling",
    "oop",
    "advanced-python",
    "best-practices",
    "testing",
  ];
  const grouped = new Map<string, LessonSection>();
  for (const lesson of lessons) {
    const existing = grouped.get(lesson.sectionSlug);
    if (existing) {
      existing.lessons.push(lesson);
    } else {
      grouped.set(lesson.sectionSlug, {
        slug: lesson.sectionSlug,
        title: lesson.section,
        summary: lesson.sectionSummary,
        lessons: [lesson],
      });
    }
  }
  for (const section of grouped.values()) {
    section.lessons.sort((a, b) => a.order - b.order);
  }
  return order
    .map((slug) => grouped.get(slug))
    .filter((section): section is LessonSection => Boolean(section));
}

export function getLesson(sectionSlug: string, slug: string): Lesson | undefined {
  return getLessons().find(
    (lesson) => lesson.sectionSlug === sectionSlug && lesson.slug === slug,
  );
}

export function getAdjacentLessons(sectionSlug: string, slug: string) {
  const lessons = getSections().flatMap((section) => section.lessons);
  const index = lessons.findIndex(
    (lesson) => lesson.sectionSlug === sectionSlug && lesson.slug === slug,
  );
  return {
    previous: index > 0 ? lessons[index - 1] : undefined,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined,
  };
}

export function getProjects(): Project[] {
  return readMdxFiles(path.join(CONTENT_DIR, "projects"))
    .map((file) => {
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);
      return {
        title: String(data.title),
        slug: String(data.slug ?? path.basename(file, ".mdx")),
        sourceDir: String(data.sourceDir ?? ""),
        body: content,
      } satisfies Project;
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function firstLessonHref() {
  const [section] = getSections();
  const lesson = section?.lessons[0];
  if (!lesson) return "/learn";
  return `/learn/${lesson.sectionSlug}/${lesson.slug}`;
}
