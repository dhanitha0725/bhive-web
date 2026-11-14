import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Caveat } from "next/font/google";
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

const fontCaveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const siteUrl = siteConfig.url || "https://bhive.lk";
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const plausibleScriptUrl =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL ||
  "https://plausible.io/js/script.js";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Marketing for Sri Lankan Businesses`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Marketing for Sri Lankan Businesses`,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Marketing for Sri Lankan Businesses`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.whatsappNumber}`,
      contactType: "customer support",
      availableLanguage: ["English", "Sinhala"],
    },
  };

  return (
    <html lang="en" className={`${fontInter.variable} ${fontMono.variable} ${fontCaveat.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src={plausibleScriptUrl}
            strategy="afterInteractive"
          />
        )}
      </head>
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
