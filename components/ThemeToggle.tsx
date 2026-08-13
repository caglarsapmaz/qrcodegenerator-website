"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import type { Theme } from "@/types/qr";
import { getStoredTheme, saveTheme } from "@/lib/storage/storage";
import { useI18n } from "@/lib/i18n/store";

// Tiny external store so the toggle works with useSyncExternalStore
// (avoiding setState-in-effect and hydration-mismatch pitfalls).
let currentTheme: Theme = "dark";
const listeners = new Set<() => void>();

function applyTheme(theme: Theme) {
  currentTheme = theme;
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }
  saveTheme(theme);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const t = useI18n();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // After hydration, adopt the stored preference (the inline head script
  // already applied the matching html class before first paint).
  useEffect(() => {
    const stored = getStoredTheme();
    if (stored !== currentTheme) applyTheme(stored);
  }, []);

  const isDark = theme === "dark";
  const label = isDark ? t.ariaThemeDark : t.ariaThemeLight;

  return (
    <button
      type="button"
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-secondary transition-colors duration-150 hover:bg-fg/5 hover:text-fg"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
