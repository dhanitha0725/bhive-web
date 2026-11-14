import { Container } from "@/components/ui/container";
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
    name: "Lead Strategist",
    role: "Founder & Commercial Lead",
    placeholderInitials: "LS",
    bio: "Over 8 years helping small and medium enterprises clarify their offer, brand, and customer pipeline.",
  },
  {
    name: "Brand & Creative Lead",
    role: "Head of Design",
    placeholderInitials: "BC",
    bio: "Specializing in visual identities, typography, and mobile-first websites that build instant credibility.",
  },
  {
    name: "Digital Growth Lead",
    role: "Head of Marketing",
    placeholderInitials: "DG",
    bio: "Focused on Sri Lankan social platforms, direct-response campaigns, and WhatsApp conversion funnels.",
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
    title: "Simple language beats jargon",
    body: "If your customer cannot understand your offer in 5 seconds, they leave. We keep messaging clear and direct.",
  },
  {
    number: "03",
    title: "Measure paying customers, not likes",
    body: "Likes and impressions don't pay staff salaries. We focus strictly on enquiries, calls, and real sales.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-white text-[#0b1220]">
      <PageHero
        eyebrow="About BHive"
        title="We think like business owners, not an abstract agency."
        body="BHive was founded to give Sri Lankan businesses honest, practical marketing systems that actually drive sales—without agency fluff."
      />

      {/* 1. Our Story */}
      <section className="w-full py-16 sm:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="Our Story"
                title="Built for businesses that want real growth, not empty promises."
              />
            </div>

            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-[#5b6475] leading-[1.65]">
              <p>
                Too many marketing agencies in Sri Lanka sell disconnected services: a social media team that only cares about graphics, a web developer who doesn&apos;t know conversion copywriting, and ad managers who spend budgets on empty clicks.
              </p>
              <p>
                The result? Business owners spend money, get exhausted, and have nothing measurable to show for it.
              </p>
              <p className="font-medium text-[#0b1220] pt-2 border-t border-[#e5e8ee]">
                BHive was built to fix this. We connect strategy, brand identity, web storefronts, and digital marketing into one clear plan where every piece brings you paying customers.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. The People */}
      <section className="w-full py-16 sm:py-24 bg-[#f5f7fa] border-y border-[#e5e8ee]">
        <Container>
          <SectionTitle
            eyebrow="The People"
            title="Meet the team behind your growth"
            body="A dedicated team of strategists, designers, and marketers based in Sri Lanka."
            centered
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.role}
                className="rounded-2xl bg-white border border-[#e5e8ee] p-7 sm:p-8 flex flex-col items-start"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3ff] border border-[#dce6fb] text-[#3068f9] font-medium text-base mb-5">
                  {member.placeholderInitials}
                </div>

                <h3 className="text-xl font-medium tracking-[-0.02em] text-[#0b1220]">
                  {member.name}
                </h3>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3068f9] mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-sm sm:text-base text-[#5b6475] leading-[1.6]">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Guiding Principles */}
      <section className="w-full py-16 sm:py-24 bg-white">
        <Container>
          <SectionTitle
            eyebrow="Our Guiding Principles"
            title="How we approach every project"
            centered
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="rounded-2xl border border-[#e5e8ee] bg-white p-7 sm:p-8"
              >
                <span className="inline-flex items-center justify-center h-7 px-3 rounded-full bg-[#eef3ff] text-xs font-medium text-[#3068f9] tabular-nums">
                  {principle.number}
                </span>
                <h3 className="mt-4 text-xl font-medium tracking-[-0.02em] text-[#0b1220]">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-[#5b6475] leading-[1.6]">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </div>
  );
}
