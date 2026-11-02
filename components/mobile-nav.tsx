"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/learn/basics/print", label: "Lessons" },
  { href: "/projects", label: "Projects" },
  { href: "/search", label: "Search" },
  { href: "https://github.com/blshaer/python-by-example", label: "GitHub" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Button variant="ghost" size="icon" onClick={() => setOpen((value) => !value)}>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle navigation</span>
      </Button>
      {open ? (
        <div className="absolute left-0 right-0 top-16 border-b border-border bg-background p-4">
          <div className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
