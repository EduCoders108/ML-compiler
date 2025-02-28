"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="size-5 text-yellow-300" />
      ) : (
        <Moon className="size-5 text-white" />
      )}
    </button>
  );
}
