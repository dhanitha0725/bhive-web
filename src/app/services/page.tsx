import { services } from "@/content/services";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { FinalCta, PageHero, SectionTitle } from "@/components/sections/marketing";

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Build the parts of your business that make growth possible."
        body="Strategy gives the system direction. Brand, digital experience and marketing turn that direction into useful customer decisions."
        primary={{ label: "Start With Your Business Problem", href: "/contact" }}
      />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {["Think", "Build", "Grow"].map((group) => (
              <div key={group}>
                <SectionTitle
                  eyebrow={group}
                  title={group === "Think" ? "Know what matters." : group === "Build" ? "Make it usable." : "Create demand with direction."}
                />
                <div className="mt-6 grid gap-3">
                  {services
                    .filter((s) => s.eyebrow === group)
                    .map((s) => (
                      <article key={s.slug} className="card-base border border-[var(--border)] bg-[var(--background)] p-5">
                        <h2 className="font-display text-xl font-semibold text-[var(--foreground)]">{s.name}</h2>
                        <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
                        <LinkButton href={`/services/${s.slug}`} variant="text" className="mt-4 min-h-0 px-0 py-0">
                          Explore service
                        </LinkButton>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
