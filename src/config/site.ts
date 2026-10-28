// BHive Site Configuration & Navigation

export const siteConfig = {
  name: "BHive",
  description:
    "Helping small and medium businesses in Sri Lanka get more customers with planned, practical marketing.",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  contactEmail: "hello@bhive.lk", // TODO: replace with verified business email
  // Sri Lankan WhatsApp format without + for wa.me URL
  whatsappNumber: "94770000000", // TODO: replace with real WhatsApp number
  whatsappDisplayNumber: "+94 77 000 0000", // TODO: replace with real display phone number
  whatsappMessage:
    "Hi BHive, I'd like to get a free growth consultation for my business.",
  // When false: hides stat counters, outcome metrics, case study cards, and testimonials on home;
  // shows a "coming soon" state on /work; adds noindex to demo case studies and excludes from sitemap.
  showProof: false,
  social: [] as Array<{ label: string; href: string }>,
} as const;

export const primaryNavigation = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function getWhatsAppUrl(message?: string): string {
  const text = message || siteConfig.whatsappMessage;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
