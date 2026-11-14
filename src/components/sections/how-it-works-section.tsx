import { Building2, Sprout } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import {
  ComparisonCard,
  type ComparisonPanel,
} from "@/components/shadcn-space/card/card-21";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";

const ESTABLISHED: ComparisonPanel = {
  id: "established",
  icon: Building2,
  eyebrow: "For established businesses",
  title: "Scale an active business",
  description:
    "Revenue is coming in, but enquiries are unpredictable and marketing runs as disconnected tactics.",
  steps: [
    {
      num: "01",
      title: "Free growth & social audit",
      tag: "Free",
      detail:
        "A 24–48 hour read of your website, channels, and competitors to find where enquiries leak.",
    },
    {
      num: "02",
      title: "Funnel & touchpoint rebuild",
      detail:
        "High-drop-off pages rebuilt, conversion points tightened, and customer attribution made accurate.",
    },
    {
      num: "03",
      title: "Monthly growth retainer",
      detail:
        "Paid campaigns, content, and social run as one channel mix, optimised every week.",
    },
  ],
  investment: "Ongoing monthly retainer · Cancel anytime",
  action: (
    <PillButton
      treatment="primary"
      isConsultation
      consultationLocation="how-it-works-growth"
      showArrow
      className="!h-12 !px-6 text-sm"
    >
      Claim free growth audit
    </PillButton>
  ),
};

const LAUNCH: ComparisonPanel = {
  id: "launch",
  icon: Sprout,
  eyebrow: "For founders & new ventures",
  title: "Launch a new brand or idea",
  description:
    "The idea is validated, but there is no credible identity, storefront, or repeatable way to win customers yet.",
  steps: [
    {
      num: "01",
      title: "Business guidance call",
      tag: "Free",
      detail:
        "A 30-minute session on your model, buyers, pricing, and the channels worth testing first.",
    },
    {
      num: "02",
      title: "Brand & storefront build",
      detail:
        "A complete identity system, a fast website or WhatsApp storefront, and launch creative.",
    },
    {
      num: "03",
      title: "First-customer campaign",
      detail:
        "A targeted launch push and a 90-day roadmap built around your first paying customers.",
    },
  ],
  investment: "Fixed-scope launch build · No retainer lock-in",
  action: (
    <PillButton
      treatment="filled"
      isConsultation
      consultationLocation="how-it-works-launch"
      showArrow
      className="!h-12 !px-6 text-sm"
    >
      Book launch consultation
    </PillButton>
  ),
  emphasis: true,
};

export function HowItWorksSection() {
  return (
    <section className="relative w-full bg-white py-16 sm:py-24 lg:py-32">
      <Container>
        <Reveal className="max-w-[1100px]">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3068f9] sm:text-[13px]">
            How we work
          </p>

          <h2 className="mt-3 text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[#0b1220] sm:mt-4 sm:text-5xl lg:text-[60px]">
            Two starting points. One growth system.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-[1.6] text-[#5b6475] sm:mt-5 sm:text-lg">
            We don&apos;t sell retainers to unvalidated ideas, or launch packages
            to established brands. Every partnership starts with a diagnosis
            before a single rupee is committed.
          </p>
        </Reveal>

        <Reveal className="mt-12 sm:mt-16" delay={80}>
          <ComparisonCard left={ESTABLISHED} right={LAUNCH} />
        </Reveal>
      </Container>
    </section>
  );
}
