import { SearchBox } from "@/components/search-box";
import { pageContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <main className={cn(pageContainerClass, "py-12")}>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
        <p className="mt-3 mb-8 text-muted-foreground">
          Find a lesson, project, or snippet. Search is powered by Pagefind after
          the site is built.
        </p>
        <SearchBox />
      </div>
    </main>
  );
}
