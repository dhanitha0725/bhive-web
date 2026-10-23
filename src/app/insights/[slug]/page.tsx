import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getInsight, insights, pillars } from "@/content/insights";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FinalCta } from "@/components/sections/marketing";
import { createMetadata } from "@/seo/metadata";

export function generateStaticParams() {
  return insights.filter((x) => x.published).map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const x = getInsight(resolvedParams.slug);
  return x
    ? createMetadata({
        title: x.title,
        description: x.excerpt,
        path: `/insights/${x.slug}`,
      })
    : {};
}

export default async function Insight({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const x = getInsight(resolvedParams.slug);
  if (!x) notFound();

  return (
    <>
      <article>
        <Section className="bg-[#0066cc] text-white pt-28 pb-16 sm:pt-36 sm:pb-20">
          <Container className="max-w-4xl">
            <span className="eyebrow eyebrow-light text-white/80">
              {pillars[x.pillar] || x.pillar}
            </span>
            <h1 className="display mt-4 text-white">{x.title}</h1>
            <p className="mt-5 text-blue-100 text-lg leading-relaxed">{x.excerpt}</p>
            <p className="mt-5 font-mono text-xs text-blue-200">
              {x.date} · {x.readingTime}
            </p>
          </Container>
        </Section>
        <Section className="py-12 sm:py-16">
          <Container className="max-w-3xl">
            <div className="grid gap-6 text-lg leading-8 text-neutral-700">
              {x.content.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link
              href="/services"
              className="mt-10 inline-block border-l-2 border-[#0066cc] pl-4 font-semibold text-[#0066cc] hover:underline"
            >
              Explore our services
            </Link>
          </Container>
        </Section>
      </article>
      <FinalCta />
    </>
  );
}
