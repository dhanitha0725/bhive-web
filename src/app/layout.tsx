import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteConfig } from "@/config/site";
import { ConsultationProvider } from "@/components/providers/consultation-provider";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  alternates: siteConfig.url ? { canonical: "/" } : undefined,
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontInter.variable} ${fontMono.variable}`}>
      <body className="min-h-screen bg-white text-[#1d1d1f] antialiased">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-50 rounded-full bg-[#0066cc] px-[22px] py-[11px] text-[15px] font-normal text-white focus:not-sr-only"
        >
          Skip to content
        </a>
        <ConsultationProvider>
          <Header />
          <SmoothScroll />
          <main id="main-content" className="flex min-h-[60vh] flex-col">
            {children}
          </main>
          <Footer />
        </ConsultationProvider>
      </body>
    </html>
  );
}
