"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

 function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      {mounted && (
        <button
          onClick={() =>
            setTheme(currentTheme === "dark" ? "light" : "dark")
          }
        >
          {currentTheme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      )}
    </div>
  );
}

export default ThemeToggle;
