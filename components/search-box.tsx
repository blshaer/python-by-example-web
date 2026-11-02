"use client";

import { useEffect, useRef, useState } from "react";

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export function SearchBox() {
  const host = useRef<HTMLDivElement>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const cssHref = "/pagefind/pagefind-ui.css";
        if (!document.querySelector(`link[href="${cssHref}"]`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssHref;
          document.head.appendChild(link);
        }

        await loadScript("/pagefind/pagefind-ui.js");
        const PagefindUI = (
          window as unknown as {
            PagefindUI?: new (options: Record<string, unknown>) => unknown;
          }
        ).PagefindUI;
        if (!PagefindUI || !host.current || cancelled) {
          setMissing(true);
          return;
        }
        new PagefindUI({
          element: host.current,
          showImages: false,
          excerptLength: 30,
          resetStyles: false,
        });
      } catch {
        if (!cancelled) setMissing(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      {missing ? (
        <p className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
          Pagefind search is generated during <code>npm run build</code>. In local
          development, build the static site once, or use the lesson sidebar to
          browse.
        </p>
      ) : null}
      <div ref={host} id="search" />
    </div>
  );
}
