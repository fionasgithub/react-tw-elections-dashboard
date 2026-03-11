import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
    } catch {
      return true; // fallback to dark mode if localStorage is not accessible (e.g., in private mode)
    }
    return (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches // default to system preference if no stored theme is found
    );
  });

  useEffect(() => {
    try {
      if (isDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
      }
    }
  }, [isDark]);

  return (
    <Button
      className="hover:bg-muted rounded-full"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "切換到淺色模式" : "切換到深色模式"}
      onClick={() => setIsDark((s) => !s)}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
