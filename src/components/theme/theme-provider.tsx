"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { designSystems, type ThemeDefinition } from "@/config/themes";

interface ThemeContextValue {
  theme: string;
  setTheme: (themeId: string) => void;
  themes: ThemeDefinition[];
  activeThemeMeta: ThemeDefinition;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "bhive_active_design_system";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<string>("bhive");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme && designSystems.some((t) => t.id === savedTheme)) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        const currentAttr = document.documentElement.getAttribute("data-theme");
        if (currentAttr && designSystems.some((t) => t.id === currentAttr)) {
          setThemeState(currentAttr);
        } else {
          document.documentElement.setAttribute("data-theme", "bhive");
        }
      }
    } catch {
      // ignore storage errors
    }
    setMounted(true);
  }, []);

  const setTheme = (themeId: string) => {
    if (!designSystems.some((t) => t.id === themeId)) return;
    setThemeState(themeId);
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute("data-theme", themeId);
  };

  const activeThemeMeta = useMemo(() => {
    return designSystems.find((t) => t.id === theme) || designSystems[0];
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: designSystems, activeThemeMeta }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
