import Link from "next/link";

const OUTPUT = `Hello, World!
Welcome to Python!
Name: Baraa | Age: 25
2025-01-15`;

function Fn({ children }: { children: string }) {
  return <span className="text-[#dcbdfb]">{children}</span>;
}

function Str({ children }: { children: string }) {
  return <span className="text-[#96d0ff]">{children}</span>;
}

function Num({ children }: { children: string }) {
  return <span className="text-[#6cb6ff]">{children}</span>;
}

function Key({ children }: { children: string }) {
  return <span className="text-[#f69d50]">{children}</span>;
}

export function HeroCode({
  href,
  filename,
}: {
  href: string;
  filename: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Open the print() lesson"
      className="group block min-w-0 w-full cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <figure className="overflow-hidden rounded-2xl border border-border bg-code shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md">
        <figcaption className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
          <span className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="min-w-0 truncate font-mono text-xs text-code-foreground/70">
            {filename}
          </span>
          <span className="ml-auto shrink-0 font-mono text-[11px] text-code-foreground/55 transition group-hover:text-primary">
            Open lesson →
          </span>
        </figcaption>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-7 text-code-foreground">
          <code>
            <Fn>print</Fn>(<Str>&quot;Hello, World!&quot;</Str>)
            {"\n"}
            <Fn>print</Fn>(<Str>&quot;Welcome to Python!&quot;</Str>)
            {"\n"}
            <Fn>print</Fn>(<Str>&quot;Name:&quot;</Str>, <Str>&quot;Baraa&quot;</Str>,{" "}
            <Str>&quot;| Age:&quot;</Str>, <Num>25</Num>)
            {"\n"}
            <Fn>print</Fn>(<Str>&quot;2025&quot;</Str>, <Str>&quot;01&quot;</Str>,{" "}
            <Str>&quot;15&quot;</Str>, <Key>sep</Key>=<Str>&quot;-&quot;</Str>)
          </code>
        </pre>
        <div className="border-t border-white/10 bg-black/25 px-4 py-3">
          <p className="mb-1.5 font-mono text-[10px] tracking-[0.14em] text-code-foreground/40 uppercase">
            Output
          </p>
          <pre className="font-mono text-[13px] leading-6 text-code-foreground/90">
            {OUTPUT}
          </pre>
        </div>
      </figure>
    </Link>
  );
}
