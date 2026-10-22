import { packages } from "@/content/packages";
import { caseStudies } from "@/content/case-studies";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
  CaseCard,
  Faqs,
  FinalCta,
  PageHero,
  SectionTitle,
  SystemSteps,
} from "@/components/sections/marketing";
const faqs = [
  {
    q: "What happens after the free audit?",
    a: "You receive a practical review of visible gaps and a recommended order for the next decisions. There is no obligation to begin a project.",
  },
  {
    q: "Do we need to change our whole brand?",
    a: "Not necessarily. The work should match the problem; sometimes clearer messages or a better customer journey matter more than a full identity change.",
  },
  {
    q: "Can BHive work with our existing team?",
    a: "Yes. The goal is to give internal teams and specialist partners a shared commercial direction.",
  },
  {
    q: "Can you improve a website without rebuilding it?",
    a: "Where the existing platform supports it, we can identify and prioritise improvements before recommending a rebuild.",
  },
  {
    q: "Do you only manage social media?",
    a: "No. Content and social work when they support a wider positioning, journey and growth system.",
  },
];
export default function Grow() {
  return (
    <>
      <PageHero
        eyebrow="For existing businesses"
        title="Turn scattered marketing into structured growth."
        body="You have already built something real. Now align the strategy, brand, digital presence and marketing around where the business needs to go next."
        primary={{ label: "Get Free Growth Audit", href: "/free-growth-audit" }}
        secondary={{ label: "Explore Growth Packages", href: "#packages" }}
      />
      <Section>
        <Container>
          <SectionTitle
            eyebrow="The diagnostic"
            title="Growth problems rarely appear in one place."
            body="These are often symptoms of one problem: disconnected growth infrastructure."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Brand looks different everywhere",
              "Website no longer reflects the business",
              "Social creates activity but little direction",
              "Marketing depends on last-minute ideas",
              "Customers struggle to understand the difference",
              "Services have grown but messaging has not",
              "Teams work without shared strategy",
              "More spending has unclear impact",
            ].map((x) => (
              <li className="border-l-2 border-blue-500 bg-navy-50 p-4" key={x}>
                {x}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section className="bg-navy-50">
        <Container>
          <SectionTitle
            eyebrow="The outcome"
            title="Fix the system, not only the symptoms."
          />
          <SystemSteps
            steps={[
              "Positioning",
              "Brand",
              "Customer journey",
              "Digital presence",
              "Marketing",
              "Measurement",
            ].map((title) => ({
              title,
              body: "A deliberate capability that reinforces the decisions made before it, instead of operating alone.",
            }))}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionTitle
            eyebrow="Free Social & Growth Audit"
            title="Know what to fix before spending more."
            body="We review visible parts of your business and identify where positioning, brand, social presence, website experience and conversion journey lose strength."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">What we review</h3>
              <p className="mt-2 text-muted-foreground">
                Message clarity, positioning, visual consistency, content
                structure, website experience, conversion friction and priority
                opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">What you receive</h3>
              <p className="mt-2 text-muted-foreground">
                Key problems, immediate fixes, strategic recommendations and a
                practical priority blueprint.
              </p>
            </div>
          </div>
          <LinkButton href="/free-growth-audit" className="mt-7">
            Get My Free Audit
          </LinkButton>
        </Container>
      </Section>
      <Section id="packages" className="bg-navy-50">
        <Container>
          <SectionTitle
            eyebrow="Growth packages"
            title="Choose the level of change your business needs."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {packages.map((item) => (
              <div
                key={item.id}
                className={`card-base border p-6 ${item.featured ? "border-navy-600 bg-navy-600 text-white" : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"}`}
              >
                <p className="eyebrow">{item.label}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm opacity-80">{item.for}</p>
                <ul className="mt-5 grid gap-2 text-sm">
                  {item.capabilityGroups.map((x) => (
                    <li key={x}>— {x}</li>
                  ))}
                </ul>
                <LinkButton
                  href="/contact"
                  variant={item.featured ? "white" : "primary"}
                  className="mt-6"
                >
                  Discuss {item.name}
                </LinkButton>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionTitle
            eyebrow="Relevant work"
            title="Change that begins with the business problem."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {caseStudies.slice(0, 3).map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
          <SectionTitle
            eyebrow="Questions"
            title="Useful answers before a conversation."
          />
          <Faqs items={faqs} />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
