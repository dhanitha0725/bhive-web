export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  whatWeDid: string;
  result: string;
  scope: string[];
  featured: boolean;
  published: boolean;
  isDemo: boolean;
};

// TODO: replace with real verified client case studies once approved by owner
export const caseStudies: CaseStudy[] = [
  {
    slug: "retail-brand-growth",
    client: "Local Retailer (Example Case)", // TODO: replace with real client name
    industry: "Retail & Consumer Goods",
    challenge:
      "Relying heavily on a physical showroom and sporadic Facebook posts with few online enquiries.",
    whatWeDid:
      "Built a fast mobile product showcase website, established a weekly content calendar, and set up direct WhatsApp checkout links.",
    result:
      "Steady stream of weekly WhatsApp enquiries and clear online catalog for customers across Sri Lanka.",
    scope: ["Brand & Identity", "Website", "Content & Social"],
    featured: true,
    published: true,
    isDemo: true,
  },
  {
    slug: "hospitality-booking-growth",
    client: "Boutique Stay (Example Case)", // TODO: replace with real client name
    industry: "Tourism & Hospitality",
    challenge:
      "High commission fees paid to booking platforms and inconsistent social media presentation.",
    whatWeDid:
      "Refreshed brand photography direction, created a direct booking inquiry funnel, and targeted local weekend travelers.",
    result:
      "Direct guest reservations increased significantly, saving thousands in platform commission fees.",
    scope: ["Marketing Strategy", "Website", "Brand & Identity"],
    featured: true,
    published: true,
    isDemo: true,
  },
  {
    slug: "b2b-services-growth",
    client: "Commercial Services Firm (Example Case)", // TODO: replace with real client name
    industry: "B2B & Professional Services",
    challenge:
      "Clients did not understand the difference between service tiers, leading to constant price haggling.",
    whatWeDid:
      "Clarified business positioning into 3 distinct packages with clear deliverables and pricing guidance.",
    result:
      "Faster sales conversations and higher average project value with less client hesitation.",
    scope: ["Business Strategy", "Marketing Strategy"],
    featured: true,
    published: true,
    isDemo: true,
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((item) => item.slug === slug && item.published);
