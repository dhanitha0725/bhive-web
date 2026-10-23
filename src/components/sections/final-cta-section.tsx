"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import BlurText from "@/components/BlurText";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="bg-[#0a254f] py-12 sm:py-16 lg:py-20 text-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-blue-100">
            Ready To Start
          </p>

          <h2 className="heading-1 mt-6 text-white flex justify-center text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-[1.10]">
            <BlurText
              text="Bring us the business problem. We build the growth system."
              animateBy="words"
              direction="bottom"
              delay={70}
              className="justify-center text-white"
            />
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.47] tracking-[-0.374px] text-blue-100">
            Whether you are strengthening an existing business or building
            something new, stop guessing and start building from strong commercial
            foundations.
          </p>

          {/* Action Buttons (button-store-hero & button-secondary-pill) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/grow-your-business"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] sm:text-[17px] font-normal text-[#0a254f] transition-all duration-150 hover:bg-blue-50 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>Grow My Business</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/launch-your-business"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[15px] sm:text-[17px] font-normal text-white transition-all duration-150 hover:bg-white/10 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>Launch My Business</span>
              <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-blue-200">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>Zero Lock-in</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>Commercial Diagnostic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>Proven Architecture</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
