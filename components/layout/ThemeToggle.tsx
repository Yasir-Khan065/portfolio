"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

// Server renders `false`, and React reuses that snapshot for the hydration pass,
// so the first client paint always matches the HTML. It flips to `true` right
// after — the same guarantee as a `mounted` flag, without a setState-in-effect.
function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useIsHydrated();

  // The theme is unknowable on the server, so reserve the same footprint until
  // we're on the client to avoid a layout shift.
  if (!hydrated) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="rounded p-2 text-sidebar-muted transition-colors hover:bg-sidebar-border hover:text-sidebar-fg"
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
