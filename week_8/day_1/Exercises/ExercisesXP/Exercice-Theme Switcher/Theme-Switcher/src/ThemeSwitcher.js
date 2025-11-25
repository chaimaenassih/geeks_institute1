import React from "react";
import { useTheme } from "./ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Passer en mode {theme === "light" ? "sombre" : "clair"}
    </button>
  );
}
