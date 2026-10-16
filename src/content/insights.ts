export type Pillar =
  "business-architecture" | "brand-strategy" | "modern-marketing" | "entrepreneurial-leadership" | "sustainable-growth";
export type Insight = {
  slug: string;
  pillar: Pillar;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  content: string[];
  relatedService: string;
  published: boolean;
};
export const pillars: Record<Pillar, string> = {
  "business-architecture": "Business Architecture",
  "brand-strategy": "Brand Strategy",
  "modern-marketing": "Modern Marketing",
  "entrepreneurial-leadership": "Entrepreneurial Leadership",
  "sustainable-growth": "Sustainable Growth",
};
export const insights: Insight[] = [
  {
    slug: "why-businesses-outgrow-their-marketing",
    pillar: "business-architecture",
    title: "Why businesses outgrow the marketing that got them started",
    excerpt: "Growth changes the offer, customer journey and decisions marketing needs to support.",
    date: "2026-09-07",
    readingTime: "5 min read",
    relatedService: "business-strategy",
    content: [
      "Early marketing is often built around speed. As a business grows, more people need a clearer way to explain the offer.",
      "The answer is not automatically more content. Establish the decisions, messages and journeys every channel should reinforce.",
      "That makes growth easier to coordinate and easier to improve.",
    ],
    published: true,
  },
  {
    slug: "brand-is-a-decision-system",
    pillar: "brand-strategy",
    title: "A brand is a decision system, not a visual wrapper",
    excerpt: "Identity becomes more useful when it helps teams make consistent decisions at every customer touchpoint.",
    date: "2026-09-02",
    readingTime: "4 min read",
    relatedService: "brand-strategy-identity",
    content: [
      "Identity creates recognition. It works harder when it expresses a clear value, voice and point of view.",
      "A useful test is simple: does each customer touchpoint make the same promise as the business?",
      "A brand system reduces the decisions that have to be reinvented every week.",
    ],
    published: true,
  },
  {
    slug: "marketing-needs-a-job",
    pillar: "modern-marketing",
    title: "Marketing needs a job beyond staying visible",
    excerpt: "Every channel and campaign should support a customer decision or commercial priority.",
    date: "2026-08-28",
    readingTime: "4 min read",
    relatedService: "marketing-strategy",
    content: [
      "Visibility can be useful, but it is not a strategy. Know what attention should lead to.",
      "Assign roles to channels, content and campaigns. Measure whether each moves a useful decision forward.",
      "Stop activity that looks busy but does not strengthen the system.",
    ],
    published: true,
  },
  {
    slug: "launch-in-the-right-order",
    pillar: "entrepreneurial-leadership",
    title: "Launch in the right order: clarity before channels",
    excerpt: "A clear proposition and customer path make brand, website and launch decisions more coherent.",
    date: "2026-08-20",
    readingTime: "6 min read",
    relatedService: "business-strategy",
    content: [
      "New businesses can buy a logo, website and social accounts quickly. That does not make those pieces say the same thing.",
      "Start with the customer, problem, commercial proposition and reason to choose the offer.",
      "That work upfront creates fewer rebuilds later.",
    ],
    published: true,
  },
];
export const getInsight = (slug: string) => insights.find((item) => item.slug === slug && item.published);
