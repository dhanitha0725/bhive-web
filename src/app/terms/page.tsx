import { Container } from "@/components/ui/container";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "Terms of Service | BHive",
  description: "Terms and conditions for using the BHive website and services.",
  path: "/terms",
});

export default function Terms() {
  return (
    <section className="w-full bg-white text-[#0b1220] pt-32 sm:pt-40 pb-20 sm:pb-28">
      <Container className="max-w-3xl">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#3068f9]">
          Legal
        </span>
        <h1 className="mt-2.5 text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.08] text-[#0b1220]">
          Terms of Service
        </h1>
        <div className="mt-10 grid gap-5 text-base text-[#5b6475] leading-[1.65] border-t border-[#e5e8ee] pt-8">
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
    </section>
  );
}
