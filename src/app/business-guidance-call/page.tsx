import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero, SectionTitle } from "@/components/sections/marketing";
import { LeadForm } from "@/components/forms/lead-form";
export default function Guidance() {
  return (
    <>
      <PageHero
        eyebrow="For founders"
        title="Start with a clearer launch path."
        body="Bring your idea, stage and biggest question. We will help identify the next useful decisions before you commit to a package."
        primary={{ label: "Request guidance", href: "#form" }}
      />
      <Section>
        <Container className="max-w-3xl">
          <SectionTitle
            eyebrow="Business Guidance Call"
            title="A focused conversation about what needs to happen next."
            body="We will discuss your customer, market questions, launch order and immediate priorities."
          />
          <div id="form" className="mt-8 border bg-navy-50 p-6">
            <LeadForm type="business-guidance" />
          </div>
        </Container>
      </Section>
    </>
  );
}
