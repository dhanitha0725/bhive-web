export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  whatWeDid: string;
  result: string;
  outcomeMetric?: string;
  results?: CaseStudyMetric[];
  image?: string;
  scope: string[];
  featured: boolean;
  published: boolean;
  isDemo: boolean;
};

// Illustrative examples for UI evaluation. Every record is marked `isDemo` and
// is labelled as an example on the site until owner-verified data replaces it.
export const caseStudies: CaseStudy[] = [
  {
    slug: "halegrove",
    client: "Halegrove",
    industry: "Apparel & Direct-to-Consumer",
    challenge:
      "High advertising spend across fragmented social channels with inconsistent customer acquisition and flatlining conversion rates.",
    whatWeDid:
      "Rebuilt the creative testing engine, consolidated media spend around three validated commercial angles, and built a high-speed mobile checkout experience.",
    result:
      "Tripled monthly revenue within 90 days while lowering blended customer acquisition cost by 28%.",
    outcomeMetric: "3x Sales Growth",
    results: [
      { value: "3x", label: "Monthly revenue" },
      { value: "-28%", label: "Blended CAC" },
      { value: "90 days", label: "Time to result" },
    ],
    image: "/images/figma/case-halegrove.png",
    scope: ["Marketing Strategy", "Brand & Identity", "Website"],
    featured: true,
    published: true,
    isDemo: true,
  },
  {
    slug: "retail-brand-growth",
    client: "Urban Retail Group",
    industry: "Retail & Consumer Goods",
    challenge:
      "Relying heavily on a physical showroom and sporadic Facebook posts with few online enquiries.",
    whatWeDid:
      "Built a fast mobile product showcase website, established a weekly content calendar, and set up direct WhatsApp checkout links.",
    result:
      "Steady stream of weekly WhatsApp enquiries and clear online catalog for customers across Sri Lanka.",
    outcomeMetric: "+180% Inquiries",
    results: [
      { value: "+180%", label: "Online enquiries" },
      { value: "3.2x", label: "Weekly WhatsApp leads" },
      { value: "+24%", label: "Repeat customers" },
    ],
    image: "/images/hero/hero-showcase-1.png",
    scope: ["Brand & Identity", "Website", "Content & Social"],
    featured: true,
    published: true,
    isDemo: true,
  },
  {
    slug: "hospitality-booking-growth",
    client: "Ceylon Haven Boutique",
    industry: "Tourism & Hospitality",
    challenge:
      "High commission fees paid to booking platforms and inconsistent social media presentation.",
    whatWeDid:
      "Refreshed brand photography direction, created a direct booking inquiry funnel, and targeted local weekend travelers.",
    result:
      "Direct guest reservations increased significantly, saving thousands in platform commission fees.",
    outcomeMetric: "35% Commission Saved",
    results: [
      { value: "-35%", label: "Platform commission" },
      { value: "2.4x", label: "Direct bookings" },
      { value: "+18%", label: "Average nightly rate" },
    ],
    image: "/images/hero/hero-showcase-2.png",
    scope: ["Marketing Strategy", "Website", "Brand & Identity"],
    featured: true,
    published: true,
    isDemo: true,
  },
  {
    slug: "b2b-services-growth",
    client: "Apex Commercial Solutions",
    industry: "B2B & Professional Services",
    challenge:
      "Clients did not understand the difference between service tiers, leading to constant price haggling.",
    whatWeDid:
      "Clarified business positioning into distinct packages with clear deliverables, transparent scope, and pricing guidance.",
    result:
      "Faster sales conversations and higher average project value with less client hesitation.",
    outcomeMetric: "+45% Avg Deal Size",
    results: [
      { value: "+45%", label: "Average deal size" },
      { value: "-30%", label: "Sales cycle length" },
      { value: "+22%", label: "Close rate" },
    ],
    image: "/images/hero/hero-showcase-3.png",
    scope: ["Business Strategy", "Marketing Strategy"],
    featured: true,
    published: true,
    isDemo: true,
  },
];
