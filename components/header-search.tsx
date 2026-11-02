"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MageIcon } from "@/components/mage-icon";
import { headerIconClass } from "@/lib/layout";
import type { SearchItem } from "@/lib/content";

const MAX_RESULTS = 8;

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function scoreItem(item: SearchItem, query: string) {
  const title = normalize(item.title);
  const group = normalize(item.group);
  const href = normalize(item.href);
  const slugQuery = query.replace(/\s+/g, "-");

  if (title === query) return 100;
  if (title.startsWith(query)) return 90;
  if (title.includes(query)) return 70;
  if (group.startsWith(query)) return 50;
  if (group.includes(query)) return 40;
  if (href.includes(slugQuery)) return 30;
  return 0;
}

function Highlight({ text, query }: { text: string; query: string }) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-accent/80 text-accent-foreground">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  );
}

export function HeaderSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [shortcut, setShortcut] = useState("⌘K");

  const results = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return [];
    return items
      .map((item) => ({ item, score: scoreItem(item, needle) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, MAX_RESULTS)
      .map((entry) => entry.item);
  }, [items, query]);

  function reset() {
    setQuery("");
    setActiveIndex(0);
  }

  function closeMobile() {
    setMobileOpen(false);
    reset();
  }

  function goTo(href: string) {
    closeMobile();
    reset();
    inputRef.current?.blur();
    router.push(href);
  }

  useEffect(() => {
    const mac = /Mac|iPhone|iPad/.test(navigator.platform);
    setShortcut(mac ? "⌘K" : "Ctrl K");
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const id = window.requestAnimationFrame(() => inputRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
  }, [mobileOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    closeMobile();
    reset();
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        if (mobileOpen) closeMobile();
        else reset();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [mobileOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMobileOpen(true);
        inputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      if (query) {
        reset();
        return;
      }
      closeMobile();
      inputRef.current?.blur();
      return;
    }

    if (!results.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = results[activeIndex];
      if (item) goTo(item.href);
    }
  }

  const listId = "header-search-results";
  const showPanel = query.trim().length > 0;

  const field = (
    <div className="relative flex h-9 w-full items-center md:w-56 lg:w-64">
      <MageIcon
        name="search"
        className="pointer-events-none absolute left-2.5 h-4 w-4 text-muted-foreground"
      />
      <input
        ref={inputRef}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={onInputKeyDown}
        type="search"
        role="combobox"
        aria-label="Search lessons and projects"
        aria-autocomplete="list"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-activedescendant={
          showPanel && results[activeIndex]
            ? `header-search-option-${activeIndex}`
            : undefined
        }
        placeholder="Search"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className="h-9 w-full rounded-lg border border-border bg-card py-0 pr-12 pl-9 text-sm text-foreground outline-none transition-[box-shadow,border-color] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 [&::-webkit-search-cancel-button]:hidden"
      />
      <kbd className="pointer-events-none absolute right-1.5 hidden h-5 min-w-6 items-center justify-center rounded-md border border-border bg-muted px-1.5 font-sans text-[10px] font-medium text-muted-foreground md:inline-flex">
        {shortcut}
      </kbd>
      <button
        type="button"
        onClick={closeMobile}
        className="absolute right-1.5 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
        aria-label="Close search"
      >
        <MageIcon name="multiply" className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative",
        mobileOpen &&
          "max-md:absolute max-md:inset-y-0 max-md:left-14 max-md:right-3 max-md:z-50 max-md:flex max-md:items-center",
      )}
    >
      <div className={cn(mobileOpen ? "block w-full md:w-auto" : "hidden md:block")}>
        {field}
      </div>
      {mobileOpen ? null : (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className={cn(headerIconClass, "md:hidden")}
          aria-label="Open search"
          title="Search"
        >
          <MageIcon name="search" className="h-5 w-5" />
        </button>
      )}

      {showPanel ? (
        <div
          className="absolute top-full right-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg max-md:min-w-0 md:min-w-[18rem]"
          id={listId}
          role="listbox"
          aria-label="Search suggestions"
        >
          {results.length ? (
            <ul className="max-h-80 overflow-auto py-1">
              {results.map((item, index) => {
                const active = index === activeIndex;
                return (
                  <li key={item.href} role="presentation">
                    <Link
                      id={`header-search-option-${index}`}
                      role="option"
                      aria-selected={active}
                      href={item.href}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "flex items-start gap-3 px-3 py-2.5 text-sm text-foreground",
                        active && "bg-muted",
                      )}
                    >
                      <MageIcon
                        name={item.kind === "Project" ? "folder" : "book"}
                        className="mt-0.5 text-muted-foreground"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">
                          <Highlight text={item.title} query={query.trim()} />
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {item.kind} · {item.group}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-3 py-4 text-sm text-muted-foreground">
              No matches for “{query.trim()}”
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
