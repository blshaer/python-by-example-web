"use client";

import { useRef, useState, type ComponentProps } from "react";
import { MageIcon } from "@/components/mage-icon";
import { cn } from "@/lib/utils";

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    return copied;
  }
}

export function Pre({ className, children, ...props }: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const code = preRef.current?.querySelector("code")?.textContent ?? "";
    const text = code.replace(/\n$/, "");
    if (!text || !(await writeClipboard(text))) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="code-block relative my-5 [&_pre]:my-0">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={cn(
          "absolute top-2.5 right-2.5 z-10 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-code-foreground/70 transition-colors",
          "hover:bg-white/10 hover:text-code-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          copied && "text-primary hover:text-primary",
        )}
      >
        <MageIcon name={copied ? "check" : "copy"} className="h-4 w-4" />
      </button>
      <pre ref={preRef} className={cn(className, "pr-12")} {...props}>
        {children}
      </pre>
    </div>
  );
}
