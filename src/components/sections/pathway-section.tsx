"use client";

import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowRight, Check, Sparkles, Building2, Rocket } from "lucide-react";

const pathways = [
  {
    tag: "Established Operations",
    category: "Existing business",
    title: "I already run a business.",
    description:
      "Fix what is slowing growth. Strengthen your positioning, brand, digital presence, and marketing into a coherent revenue driver.",
    signals: [
      "Growth feels inconsistent across quarters",
      "Marketing activity lacks commercial direction",
      "Brand messaging feels disconnected from the offer",
      "Website is underperforming and leaking enquiries",
    ],
    ctaText: "Grow My Business",
    ctaHref: "/grow-your-business",
    icon: Building2,
    badgeVariant: "default",
    featured: false,
  },
  {
    tag: "Zero to One",
    category: "New venture",
    title: "I’m building something new.",
    description:
      "Turn your idea into a positioned, branded, launch-ready business from day one without costly re-builds down the road.",
    signals: [
      "Need razor-sharp market positioning",
      "Need a professional, credible brand identity",
      "Need clear go-to-market commercial direction",
      "Need high-converting launch infrastructure",
    ],
    ctaText: "Launch My Business",
    ctaHref: "/launch-your-business",
    icon: Rocket,
    badgeVariant: "default",
    featured: true,
  },
];

export function PathwaySection() {
  return (
    <section className="py-20 lg:py-28 bg-navy-50/60 text-[var(--foreground)] transition-colors duration-200">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow text-blue-600 font-mono tracking-widest text-xs uppercase font-semibold">
            Choose your path
          </p>
          <h2 className="heading-2 mt-3 font-display tracking-tight text-[var(--foreground)]">
            Where are you starting from?
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Different starting points require different growth paths. Choose the
            trajectory tailored to your current stage.
          </p>
        </div>

        {/* Pathway Cards Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {pathways.map((path, idx) => {
            const Icon = path.icon;
            return (
              <Reveal
                key={path.category}
                y={20}
                delay={idx * 100}
                className={`relative flex flex-col justify-between rounded-2xl border p-8 transition-all duration-300 hover:shadow-xl ${
                  path.featured
                    ? "border-blue-500/40 bg-[var(--background)] shadow-lg ring-1 ring-blue-500/20"
                    : "border-[var(--border)] bg-[var(--background)] shadow-sm"
                }`}
              >
                {path.featured && (
                  <div className="absolute -top-3.5 right-6 inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white shadow-sm">
                    <Sparkles className="h-3 w-3" />
                    <span>Founder Path</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-wider uppercase text-blue-600">
                      {path.category}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold text-[var(--foreground)]">
                    {path.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {path.description}
                  </p>

                  {/* Signals List */}
                  <div className="mt-6 pt-6 border-t border-[var(--border)]">
                    <p className="font-mono text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                      Key Signals:
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {path.signals.map((signal) => (
                        <li
                          key={signal}
                          className="flex items-start gap-2.5 text-sm text-[var(--foreground)]"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 mt-0.5">
                            <Check className="h-3 w-3 stroke-[2.5]" />
                          </div>
                          <span>{signal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6">
                  <Link
                    href={path.ctaHref}
                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-98 ${
                      path.featured
                        ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg"
                        : "border border-[var(--border)] bg-navy-50 text-[var(--foreground)] hover:bg-navy-100/80"
                    }`}
                  >
                    <span>{path.ctaText}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
