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
  order: number;
  level: string;
  summary: string;
  concepts: string[];
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

function projectOrder(title: string, sourceDir: string, fromFrontmatter: unknown) {
  const explicit = Number(fromFrontmatter);
  if (Number.isFinite(explicit) && explicit > 0) return explicit;
  const match = sourceDir.match(/(\d+)/) ?? title.match(/Project\s+(\d+)/i);
  return match ? Number(match[1]) : 99;
}

function projectLevel(body: string, fromFrontmatter: unknown) {
  const explicit = String(fromFrontmatter ?? "").trim();
  if (explicit) return explicit;
  const line = body.match(/## Difficulty:\s*(.+)/)?.[1] ?? "";
  return line.replace(/\p{Extended_Pictographic}|\uFE0F/gu, "").trim();
}

function projectSummary(body: string, fromFrontmatter: unknown) {
  const explicit = String(fromFrontmatter ?? "").trim();
  if (explicit) return explicit;
  const description =
    body
      .split("## Description")[1]
      ?.split(/\n## /)[0]
      ?.replace(/\s+/g, " ")
      .trim() ?? "";
  const sentence = description.split(/(?<=\.)\s/)[0] ?? "";
  if (sentence.length <= 140) return sentence;
  return `${sentence.slice(0, 137).replace(/\s+\S*$/, "")}…`;
}

function projectConcepts(body: string) {
  const block = body.split("## Concepts You'll Practice")[1]?.split(/\n## /)[0] ?? "";
  return block
    .split("\n")
    .map((line) =>
      line
        .replace(/^- /, "")
        .replace(/`/g, "")
        .replace(/\s*\([^)]*\)/g, "")
        .trim()
        .replace(/^./, (letter) => letter.toUpperCase()),
    )
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .slice(0, 3);
}

export function getProjects(): Project[] {
  return readMdxFiles(path.join(CONTENT_DIR, "projects"))
    .map((file) => {
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);
      const title = String(data.title);
      const sourceDir = String(data.sourceDir ?? "");
      return {
        title,
        slug: String(data.slug ?? path.basename(file, ".mdx")),
        sourceDir,
        body: content,
        order: projectOrder(title, sourceDir, data.order),
        level: projectLevel(content, data.level),
        summary: projectSummary(content, data.summary),
        concepts: projectConcepts(content),
      } satisfies Project;
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export type ProjectLessonLink = {
  label: string;
  href: string;
};

/** Lessons a project assumes. Labels match the curriculum cards. */
const PROJECT_LESSON_LINKS: Record<string, ProjectLessonLink[]> = {
  "number-guessing-game": [
    { label: "while loops", href: "/learn/loops/while-loop" },
    { label: "if / else", href: "/learn/control-flow/if-else" },
    { label: "try / except", href: "/learn/error-handling/try-except" },
  ],
  "expense-tracker": [
    { label: "Lists", href: "/learn/data-structures/lists" },
    { label: "Dictionaries", href: "/learn/data-structures/dictionaries" },
    { label: "Arguments", href: "/learn/functions/arguments" },
  ],
  "library-management": [
    { label: "Classes", href: "/learn/oop/classes-objects" },
    { label: "Inheritance", href: "/learn/oop/inheritance" },
    { label: "Custom exceptions", href: "/learn/error-handling/custom-exceptions" },
  ],
  "weather-cli": [
    { label: "Decorators", href: "/learn/advanced-python/decorators" },
    { label: "Type hints", href: "/learn/best-practices/type-hinting" },
    { label: "try / except", href: "/learn/error-handling/try-except" },
  ],
};

export function getProjectLessonLinks(slug: string): ProjectLessonLink[] {
  return PROJECT_LESSON_LINKS[slug] ?? [];
}

export function formatProjectTitle(title: string) {
  return title
    .replace(/\p{Extended_Pictographic}|\uFE0F/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^Project\s+\d+\s*[-:]\s*/i, "")
    .trim();
}

const LESSON_SHORT_TITLE: Record<string, string> = {
  print: "print()",
  comments: "Comments",
  variables: "Variables",
  "data-types": "Data types",
  "if-else": "if / else",
  elif: "elif",
  "match-case": "match / case",
  "for-loop": "for loops",
  "while-loop": "while loops",
  "break-continue": "break / continue",
  lists: "Lists",
  tuples: "Tuples",
  sets: "Sets",
  dictionaries: "Dictionaries",
  "function-basics": "Defining functions",
  arguments: "Arguments",
  "return-values": "Return values",
  "lambda-functions": "lambda",
  imports: "import",
  "custom-modules": "Custom modules",
  "try-except": "try / except",
  "custom-exceptions": "Custom exceptions",
  "classes-objects": "Classes",
  "init-methods": "__init__",
  inheritance: "Inheritance",
  polymorphism: "Polymorphism",
  "list-comprehensions": "Comprehensions",
  generators: "Generators",
  decorators: "Decorators",
  "context-managers": "Context managers",
  pep8: "PEP 8",
  "type-hinting": "Type hints",
  "virtual-envs": "Virtual envs",
  "test-basics": "pytest",
  "test-weather": "test_weather",
};

/** Short label for curriculum maps. Full titles stay on the lesson page. */
export function formatLessonTitle(title: string, slug?: string) {
  if (slug && LESSON_SHORT_TITLE[slug]) return LESSON_SHORT_TITLE[slug];

  let value = title
    .replace(/\s*\(Python 3\.10\+\)$/i, "")
    .replace(/^Introduction to\s+/i, "")
    .replace(/\s+in Python$/i, "")
    .replace(/^The\s+/i, "")
    .replace(/^Python\s+/i, "")
    .trim();

  const dash = value.indexOf(" - ");
  if (dash !== -1) {
    const left = value.slice(0, dash).trim();
    const right = value.slice(dash + 3).trim();
    value = right.length > 0 && right.length <= left.length ? right : left;
  }

  value = value.replace(/\s+Function$/i, "").trim();
  if (/^[a-z0-9_]+$/.test(value)) {
    return value.replace(/_/g, " ");
  }
  return value || title;
}

export type CurriculumStage = {
  id: string;
  label: string;
  description: string;
  sections: LessonSection[];
};

export function getCurriculumStages(): CurriculumStage[] {
  const sections = getSections();
  return [
    {
      id: "foundation",
      label: "Foundation",
      description: "Syntax, control flow, and the data you print.",
      sections: sections.slice(0, 4),
    },
    {
      id: "core",
      label: "Core",
      description: "Functions, modules, errors, and objects.",
      sections: sections.slice(4, 8),
    },
    {
      id: "practice",
      label: "Practice",
      description: "Write it clearly, then prove it with tests.",
      sections: sections.slice(8),
    },
  ];
}

export function firstLessonHref() {
  const [section] = getSections();
  const lesson = section?.lessons[0];
  if (!lesson) return "/";
  return `/learn/${lesson.sectionSlug}/${lesson.slug}`;
}

export type SearchItem = {
  title: string;
  href: string;
  kind: "Lesson" | "Project";
  group: string;
};

export function getSearchItems(): SearchItem[] {
  const lessons = getLessons().map((lesson) => ({
    title: lesson.title,
    href: `/learn/${lesson.sectionSlug}/${lesson.slug}`,
    kind: "Lesson" as const,
    group: lesson.section,
  }));
  const projects = getProjects().map((project) => ({
    title: formatProjectTitle(project.title),
    href: `/projects/${project.slug}`,
    kind: "Project" as const,
    group: "Projects",
  }));
  return [...lessons, ...projects];
}
