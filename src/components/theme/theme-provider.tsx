"use client";

import React, { createContext, useContext, useMemo } from "react";
import { corporateTheme, designSystems, type ThemeDefinition } from "@/config/themes";

interface ThemeContextValue {
  theme: string;
  setTheme: (themeId: string) => void;
  themes: ThemeDefinition[];
  activeThemeMeta: ThemeDefinition;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Fixed single corporate light theme. setTheme is a no-op kept for API
// compatibility so existing components do not break.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: corporateTheme.id,
      setTheme: () => {},
      themes: designSystems,
      activeThemeMeta: corporateTheme,
    }),
    []
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
