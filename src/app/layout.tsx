import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  JetBrains_Mono,
  IBM_Plex_Sans,
  DM_Sans,
  Plus_Jakarta_Sans,
  Inter,
} from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { FloatingThemeDock } from "@/components/theme/theme-selector";
import { siteConfig } from "@/config/site";

const fontBricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const fontGeist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fontIbm = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm",
  display: "swap",
});

const fontDmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

const fontPlusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plusjakarta",
  display: "swap",
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  alternates: siteConfig.url ? { canonical: "/" } : undefined,
  robots: { index: true, follow: true },
};

const themeInitScript = `
  (function() {
    try {
      var saved = localStorage.getItem('bhive_active_design_system');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        document.documentElement.setAttribute('data-theme', 'bhive');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontBricolage.variable} ${fontGeist.variable} ${fontMono.variable} ${fontIbm.variable} ${fontDmSans.variable} ${fontPlusJakarta.variable} ${fontInter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-200">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only fixed left-4 top-4 z-50 rounded-md bg-navy-600 px-4 py-3 text-sm font-semibold text-white focus:not-sr-only"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex min-h-[60vh] flex-col">
            {children}
          </main>
          <Footer />
          <FloatingThemeDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
