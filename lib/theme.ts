export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export const THEME_SCRIPT = `(function(){try{var stored=localStorage.getItem("${THEME_STORAGE_KEY}");var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var theme=stored==="light"||stored==="dark"?stored:(prefersDark?"dark":"light");var root=document.documentElement;root.classList.toggle("dark",theme==="dark");root.style.colorScheme=theme;}catch(e){}})();`;

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function readStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
