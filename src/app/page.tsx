/* eslint-disable @next/next/no-html-link-for-pages */
import { caseStudies } from "@/content/case-studies";
import { insights } from "@/content/insights";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { CaseCard, FinalCta, InsightCard, SectionTitle, SystemSteps } from "@/components/sections/marketing";

const system = [
  { title: "Strategy", body: "Understand the business, customer, market, goals and constraints." },
  { title: "Positioning", body: "Define what makes the business valuable, relevant and different." },
  { title: "Brand", body: "Turn strategy into a recognizable identity people understand and trust." },
  { title: "Digital", body: "Build experiences that make the business easy to discover and choose." },
  { title: "Demand", body: "Coordinate marketing and content around commercial goals." },
  { title: "Growth", body: "Measure what works, refine priorities and build from stronger foundations." },
];

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-navy-600 py-16 text-white sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-honey-500">Strategy · Brand · Marketing · Digital</p>
              <h1 className="display mt-4 max-w-3xl">We build businesses that are ready to grow.</h1>
              <p className="mt-6 max-w-2xl text-lg text-navy-100">
                BHive brings strategy, positioning, brand, marketing, and digital execution together—so your business
                grows as one system, not a collection of disconnected activities.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/grow-your-business" variant="honey">
                  Grow My Business
                </LinkButton>
                <LinkButton
                  href="/launch-your-business"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Launch My Business
                </LinkButton>
              </div>
              <a href="/work" className="mt-5 inline-block text-sm font-semibold text-white underline decoration-honey-500">
                See Our Work
              </a>
            </div>
            <div className="lg:col-span-5">
              <div className="card-base relative grid gap-3 border border-white/20 bg-white/5 p-5 sm:grid-cols-2 backdrop-blur-xs">
                {["Strategy", "Positioning", "Brand", "Digital", "Demand", "Growth"].map((node, index) => (
                  <div
                    key={node}
                    className={`card-base border p-4 transition-all ${
                      index === 5
                        ? "border-honey-500 bg-honey-500 text-navy-900 font-bold"
                        : "border-white/20 text-white"
                    }`}
                  >
                    <span className="font-mono text-xs opacity-70">0{index + 1}</span>
                    <p className="mt-7 font-display text-lg font-semibold">{node}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-xs text-navy-200">CONNECTED BUSINESS GROWTH SYSTEM</p>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionTitle
            eyebrow="Built for business outcomes"
            title="Built around business outcomes—not vanity metrics."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Strategy before execution", "Every action starts with understanding what the business actually needs."],
              ["One connected system", "Brand, marketing, website and content should strengthen each other."],
              ["Growth with direction", "Priorities come before activity. Measure what matters and improve from there."],
            ].map(([title, body]) => (
              <div key={title} className="border-l-2 border-blue-500 pl-5">
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-navy-50">
        <Container>
          <SectionTitle
            eyebrow="Choose your path"
            title="Where are you starting from?"
            body="Different starting points need different growth paths."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {[
              [
                "Existing business",
                "I already run a business.",
                "Fix what is slowing growth. Strengthen your positioning, brand, digital presence and marketing.",
                [
                  "Growth feels inconsistent",
                  "Marketing lacks direction",
                  "Brand feels disconnected",
                  "Website is underperforming",
                ],
                "Grow My Business",
                "/grow-your-business",
              ],
              [
                "New venture",
                "I’m building something new.",
                "Turn your idea into a positioned, branded, launch-ready business.",
                [
                  "Need clear positioning",
                  "Need a professional brand",
                  "Need go-to-market direction",
                  "Need launch infrastructure",
                ],
                "Launch My Business",
                "/launch-your-business",
              ],
            ].map(([label, title, body, signals, cta, href]) => (
              <div
                key={label as string}
                className="card-base border border-[var(--border)] bg-[var(--background)] p-7 text-[var(--foreground)]"
              >
                <p className="eyebrow">{label as string}</p>
                <h3 className="heading-2 mt-3">{title as string}</h3>
                <p className="mt-4 text-muted-foreground">{body as string}</p>
                <ul className="mt-5 grid gap-2 text-sm text-[var(--foreground)]">
                  {(signals as string[]).map((signal) => (
                    <li key={signal}>— {signal}</li>
                  ))}
                </ul>
                <LinkButton href={href as string} className="mt-7">
                  {cta as string}
                </LinkButton>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle
            eyebrow="The BHive system"
            title="Growth is a system."
            body="Businesses rarely struggle because one logo, website or social post is missing. Growth slows when strategy, message, brand, marketing and digital experience stop working together."
          />
          <SystemSteps steps={system} />
        </Container>
      </Section>

      <Section className="bg-navy-600 text-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-honey-500">For existing businesses</p>
              <h2 className="heading-2 mt-3 text-white">Your business may not need more marketing. It may need a better system.</h2>
              <p className="mt-4 text-navy-100">
                More content, campaigns and channels cannot fix unclear positioning or disconnected customer experiences.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <LinkButton href="/grow-your-business" variant="honey">
                  Explore Business Growth
                </LinkButton>
                <LinkButton href="/free-growth-audit" variant="outline" className="border-white text-white">
                  Get Free Growth Audit
                </LinkButton>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="card-base border border-white/15 bg-white/5 p-5 backdrop-blur-xs">
                <p className="eyebrow text-blue-200">Before</p>
                <p className="mt-4">
                  Random marketing
                  <br />
                  Unclear message
                  <br />
                  Reactive decisions
                </p>
              </div>
              <div className="card-base border border-honey-500 bg-honey-500 p-5 text-navy-900 font-medium">
                <p className="eyebrow text-navy-900">After</p>
                <p className="mt-4">
                  Clear positioning
                  <br />
                  Connected marketing
                  <br />
                  Focused priorities
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle
            eyebrow="For founders"
            title="Build it in the right order."
            body="Logo first, website next, social pages after that: it is how many businesses launch—and why they later rebuild everything."
          />
          <SystemSteps
            steps={[
              "Business clarity",
              "Market positioning",
              "Brand strategy",
              "Visual identity",
              "Marketing strategy",
              "Website",
              "Launch",
              "Growth foundation",
            ].map((title) => ({
              title,
              body: "A connected decision that supports the stage before and after it.",
            }))}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/launch-your-business">Build My Business</LinkButton>
            <LinkButton href="/business-guidance-call" variant="outline">
              Book Free Guidance Call
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section className="bg-navy-50">
        <Container>
          <SectionTitle
            eyebrow="Selected work"
            title="Proof through transformation."
            body="Good work changes more than appearance. It changes how a business communicates, operates and enters its market."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {caseStudies
              .filter((x) => x.featured)
              .slice(0, 3)
              .map((item) => (
                <CaseCard key={item.slug} item={item} />
              ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle eyebrow="How we work" title="Less guesswork. Better decisions." />
          <SystemSteps
            steps={[
              { title: "Diagnose", body: "Understand what exists, what is working and what is blocking growth." },
              { title: "Define", body: "Clarify positioning, priorities, audiences and messages." },
              { title: "Build", body: "Turn strategy into brand, marketing, content and digital experiences." },
              { title: "Launch", body: "Coordinate each touchpoint around the same commercial direction." },
              { title: "Improve", body: "Learn from real behaviour and refine the system." },
            ]}
          />
        </Container>
      </Section>

      <Section className="bg-navy-50">
        <Container>
          <SectionTitle
            eyebrow="BHive insights"
            title="Better growth starts with better decisions."
          />
          <div className="mt-8 grid gap-7 lg:grid-cols-3">
            {insights.slice(0, 3).map((item) => (
              <InsightCard key={item.slug} item={item} />
            ))}
          </div>
          <LinkButton href="/insights" variant="outline" className="mt-8">
            Explore Insights
          </LinkButton>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
