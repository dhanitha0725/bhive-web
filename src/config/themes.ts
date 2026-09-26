export interface ThemeDefinition {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  surfaceColor: string;
  textColor: string;
  fontDisplay: string;
  fontBody: string;
  displayWeight: string;
  radiusStyle: string;
  isDark?: boolean;
}

// Single corporate light theme: corporate blue, white, black.
// The multi-brand theme switcher was removed. This export is kept so
// existing imports keep working; the site always uses "corporate".
export const designSystems: ThemeDefinition[] = [
  {
    id: "corporate",
    name: "BHive Corporate",
    brand: "BHive",
    tagline: "Connected Growth System",
    description:
      "Corporate light theme: corporate blue (#0b4cc4), white surfaces, near-black text. Inter throughout.",
    primaryColor: "#0b4cc4",
    accentColor: "#0a0a0b",
    surfaceColor: "#ffffff",
    textColor: "#0a0a0b",
    fontDisplay: "Inter",
    fontBody: "Inter",
    displayWeight: "700",
    radiusStyle: "Compact (6px / 12px)",
    isDark: false,
  },
];

export const corporateTheme = designSystems[0];
