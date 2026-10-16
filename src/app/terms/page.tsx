// Placeholder legal copy — requires professional legal review before launch.
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
export default function Terms() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="heading-1">Terms</h1>
        <div className="prose-measure mt-8 grid gap-5 text-muted-foreground">
          <p>
            This website provides information about BHive’s services. Content is general information, not a binding
            proposal or professional advice.
          </p>
          <p>
            Project scope, timelines, fees, responsibilities and intellectual-property terms are agreed separately in
            writing. These terms require professional legal review before launch.
          </p>
        </div>
      </Container>
    </Section>
  );
}
