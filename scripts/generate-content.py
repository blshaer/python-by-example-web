from pathlib import Path
import re

FENCE = chr(96) * 3
SRC = Path(r"c:\Users\Baraa\python-by-example")
DST = Path(r"C:\Users\Baraa\Desktop\python-by-example-web\content")

SECTIONS = [
    ("01_basics", "Basics", "Print, comments, variables, and data types."),
    ("02_control_flow", "Control Flow", "Conditionals, elif, and match/case."),
    ("03_loops", "Loops", "for, while, break, and continue."),
    ("04_data_structures", "Data Structures", "Lists, tuples, sets, and dictionaries."),
    ("05_functions", "Functions", "Arguments, returns, and lambdas."),
    ("06_modules_packages", "Modules and Packages", "Imports and custom modules."),
    ("07_error_handling", "Error Handling", "try/except and custom exceptions."),
    ("08_oop", "Object-Oriented Programming", "Classes, inheritance, and polymorphism."),
    ("09_advanced_python", "Advanced Python", "Comprehensions, generators, decorators, and context managers."),
    ("10_best_practices", "Best Practices", "PEP 8, type hints, and virtual environments."),
    ("11_testing", "Testing", "Unit tests with pytest."),
]


def slugify(name: str) -> str:
    name = re.sub(r"^\d+_", "", name)
    return name.replace("_", "-").replace(".py", "").replace(".md", "").lower()


def extract_topic(text: str, fallback: str) -> str:
    match = re.search(r"Topic:\s*(.+)", text)
    return match.group(1).strip() if match else fallback


def extract_desc(text: str) -> str:
    parts = text.split("=" * 80)
    if len(parts) >= 3:
        body = parts[2].strip().split("Key Concepts:")[0].strip()
        return " ".join(body.split())
    return ""


def main() -> None:
    lessons_dir = DST / "lessons"
    lessons_dir.mkdir(parents=True, exist_ok=True)
    count = 0

    for folder, title, summary in SECTIONS:
        folder_path = SRC / folder
        for index, path in enumerate(sorted(folder_path.glob("*.py")), 1):
            raw = path.read_text(encoding="utf-8")
            topic = extract_topic(raw, path.stem)
            desc = extract_desc(raw)
            slug = slugify(path.name)
            section_slug = slugify(folder)
            out = lessons_dir / section_slug / f"{slug}.mdx"
            out.parent.mkdir(parents=True, exist_ok=True)
            topic_q = topic.replace('"', '\\"')
            frontmatter = "\n".join(
                [
                    "---",
                    f'title: "{topic_q}"',
                    f'section: "{title}"',
                    f"sectionSlug: {section_slug}",
                    f'sectionSummary: "{summary}"',
                    f"order: {index}",
                    f"sourceFile: {folder}/{path.name}",
                    "---",
                    "",
                    desc,
                    "",
                    f"{FENCE}python",
                    raw.rstrip(),
                    FENCE,
                    "",
                ]
            )
            out.write_text(frontmatter, encoding="utf-8")
            count += 1

    proj_dir = DST / "projects"
    proj_dir.mkdir(parents=True, exist_ok=True)
    for project in sorted((SRC / "projects").iterdir()):
        if not project.is_dir():
            continue
        readme_path = project / "README.md"
        solution_path = project / "solution.py"
        readme = readme_path.read_text(encoding="utf-8") if readme_path.exists() else ""
        solution = solution_path.read_text(encoding="utf-8") if solution_path.exists() else ""
        slug = slugify(project.name)
        title_match = re.search(r"^#\s+(.+)$", readme, re.M)
        title = title_match.group(1) if title_match else project.name
        title = title.replace(":", " -").replace('"', '\\"')
        mdx = "\n".join(
            [
                "---",
                f'title: "{title}"',
                f"slug: {slug}",
                f"sourceDir: projects/{project.name}",
                "---",
                "",
                readme,
                "",
                "## Solution",
                "",
                f"{FENCE}python",
                solution.rstrip(),
                FENCE,
                "",
            ]
        )
        (proj_dir / f"{slug}.mdx").write_text(mdx, encoding="utf-8")
        count += 1

    print(f"wrote {count} files")


if __name__ == "__main__":
    main()
