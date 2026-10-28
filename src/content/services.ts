export type ServiceSlug =
  | "business-strategy"
  | "brand-identity"
  | "marketing-strategy"
  | "website"
  | "content-social";

export type Service = {
  slug: ServiceSlug;
  name: string;
  problemSolved: string;
  scope: string[];
  outcome: string;
  published: boolean;
};

export const services: Service[] = [
  {
    slug: "business-strategy",
    name: "Business Strategy",
    problemSolved:
      "Stops you from spending time and money before knowing who your best buyers are and what they really want.",
    scope: [
      "Target customer & buyer profile",
      "Competitor and market check",
      "Pricing and offer packaging",
      "Step-by-step growth roadmap",
    ],
    outcome: "Total clarity on what you sell, who buys it, and how to price it profitably.",
    published: true,
  },
  {
    slug: "brand-identity",
    name: "Brand & Identity",
    problemSolved:
      "Stops your business from looking like an amateur hobby or blending into a crowd of cheap competitors.",
    scope: [
      "Memorable logo design & visual system",
      "Clear brand colors and typography",
      "Simple tagline & messaging guidelines",
      "Social media and print templates",
    ],
    outcome: "A professional, trustworthy brand look that makes customers respect your business.",
    published: true,
  },
  {
    slug: "marketing-strategy",
    name: "Marketing Strategy",
    problemSolved:
      "Replaces random 'boosting' and guessing with a predictable plan for getting steady enquiries.",
    scope: [
      "Lead generation roadmap",
      "Selecting the right channels for your industry",
      "Budget and campaign planning",
      "Simple tracking to know what works",
    ],
    outcome: "A realistic marketing plan that directs your money only to channels that bring real buyers.",
    published: true,
  },
  {
    slug: "website",
    name: "Website",
    problemSolved:
      "Fixes websites that look pretty but don't load fast on Sri Lankan mobile networks or convert visitors into calls.",
    scope: [
      "Mobile-first, lightning-fast design",
      "Direct WhatsApp & click-to-call integration",
      "Clear product/service showcases",
      "Local Google Search (SEO) setup",
    ],
    outcome: "A high-speed website that acts as a 24/7 salesperson guiding visitors to message you.",
    published: true,
  },
  {
    slug: "content-social",
    name: "Content & Social",
    problemSolved:
      "Ends the headache of wondering 'what should we post today?' that produces likes without sales.",
    scope: [
      "Monthly content calendar & topics",
      "High-converting video and photo creative",
      "Direct-response caption copywriting",
      "Customer enquiry management tips",
    ],
    outcome: "Consistent, engaging posts that build authority and attract customers who are ready to buy.",
    published: true,
  },
];

export const getService = (slug: string) =>
  services.find((item) => item.slug === slug);
