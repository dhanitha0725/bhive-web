import { insights, pillars } from "@/content/insights";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FinalCta, InsightCard, PageHero } from "@/components/sections/marketing";
export default function Insights() {
  return (
    <>
      <PageHero
        eyebrow="BHive insights"
        title="Better growth starts with better decisions."
        body="Practical thinking about business architecture, brand, marketing and building something that can grow."
        primary={{ label: "Start a Conversation", href: "/contact" }}
      />
      <Section>
        <Container>
          <nav aria-label="Insight categories" className="flex flex-wrap gap-2">
            {Object.entries(pillars).map(([slug, name]) => (
              <a className="rounded border px-3 py-2 text-sm" href={`/insights/category/${slug}`} key={slug}>
                {name}
              </a>
            ))}
          </nav>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {insights.map((x) => (
              <InsightCard key={x.slug} item={x} />
            ))}
          </div>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
