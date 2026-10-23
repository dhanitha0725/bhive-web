import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FinalCta, PageHero, SectionTitle } from "@/components/sections/marketing";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "About BHive | Practical Marketing in Sri Lanka",
  description:
    "Learn about BHive. We are business builders who help Sri Lankan businesses grow with planned, practical marketing.",
  path: "/about",
});

// TODO: replace with real team member names, photos, and roles once provided
const TEAM_MEMBERS = [
  {
    name: "Lead Strategist", // TODO: replace with real name
    role: "Founder & Commercial Lead",
    placeholderInitials: "LS",
    bio: "Over 8 years helping small and medium enterprises clarify their offer, brand, and customer pipeline.",
  },
  {
    name: "Brand & Creative Lead", // TODO: replace with real name
    role: "Head of Design",
    placeholderInitials: "BC",
    bio: "Specializing in visual identities, typography, and mobile-first websites that look professional.",
  },
  {
    name: "Digital Growth Lead", // TODO: replace with real name
    role: "Head of Marketing",
    placeholderInitials: "DG",
    bio: "Expert in Sri Lankan social media platforms, direct-response campaigns, and WhatsApp conversion funnels.",
  },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Plan before spending",
    body: "Never boost posts or run ads until you know exactly who is buying and why they should choose you.",
  },
  {
    number: "02",
    title: "Simple language beats complicated jargon",
    body: "If your customer cannot understand your offer in 5 seconds, they will leave. We keep messaging crystal clear.",
  },
  {
    number: "03",
    title: "Measure paying customers, not vanity likes",
    body: "Likes and views don't pay staff salaries. We focus strictly on enquiries, phone calls, and real sales.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About BHive"
        title="We think like business owners, not an abstract agency."
        body="BHive was founded to give Sri Lankan businesses honest, practical marketing advice that actually drives sales—without agency fluff."
      />

      {/* 1. Short Story */}
      <Section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              eyebrow="Our Story"
              title="Built for businesses that want real growth, not empty promises."
            />
            <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>
                Too many marketing agencies in Sri Lanka sell disconnected services: a social media team that only cares about graphic designs, a web developer who doesn&apos;t know copywriting, and ad managers who blow budgets on empty clicks.
              </p>
              <p>
                The result? Business owners spend money, get exhausted, and have nothing to show for it.
              </p>
              <p className="font-semibold text-slate-900">
                BHive was built to fix this. We bring strategy, brand, website, and social marketing together into one simple plan where every single piece works to bring you paying customers.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Team Section (Photo Placeholders) */}
      <Section className="bg-slate-50 py-12 sm:py-16 border-y border-slate-200">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0066cc]">
              The People
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display text-slate-900">
              Meet the team behind your growth
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              A dedicated team of strategists, designers, and marketers based in Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={i}
                className="rounded-[22px] bg-white border border-slate-200 p-6 text-center shadow-sm"
              >
                {/* Photo Placeholder */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-navy-900 text-white font-bold text-xl shadow-inner mb-4">
                  {/* TODO: replace photo placeholder with verified team headshots */}
                  {member.placeholderInitials}
                </div>

                <h3 className="text-lg font-semibold font-display text-slate-900">
                  {member.name}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[#0066cc] mt-0.5 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Three Short Principles */}
      <Section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0066cc]">
              Our Guiding Principles
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display text-slate-900">
              How we approach every project
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  PRINCIPLE {principle.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold font-display text-slate-900">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
