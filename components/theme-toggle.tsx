"use client";

import { Classic } from "@/components/ui/classic";
import { useTheme } from "@/components/theme-provider";
import { headerIconClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Classic
      onClick={toggleTheme}
      className={cn(headerIconClass, "[&_svg]:h-5 [&_svg]:w-5")}
    />
  );
}
