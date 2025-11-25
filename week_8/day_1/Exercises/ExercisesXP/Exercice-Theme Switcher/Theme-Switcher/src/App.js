import React from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";
import "./App.css"

function PageContent() {
  const { theme } = useTheme();

  return (
    <div>
      <h1>Thème actuel : {theme}</h1>
      <p>Ce texte change de couleur selon le thème.</p>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      <PageContent />
    </ThemeProvider>
  );
}
