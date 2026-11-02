import { SearchBox } from "@/components/search-box";

export const metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
      <p className="mt-3 mb-8 text-muted-foreground">
        Find a lesson, project, or snippet. Search is powered by Pagefind after
        the site is built.
      </p>
      <SearchBox />
    </main>
  );
}
