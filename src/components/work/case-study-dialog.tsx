"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { PillButton } from "@/components/ui/pill-button";
import { siteConfig } from "@/config/site";
import type { CaseStudy } from "@/content/case-studies";
import { getCaseStudyImage } from "@/lib/case-studies";

type CaseStudyDialogProps = {
  study: CaseStudy | null;
  onClose: () => void;
};

export function CaseStudyDialog({ study, onClose }: CaseStudyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (study && !dialog.open) dialog.showModal();
    if (!study && dialog.open) dialog.close();
  }, [study]);

  useEffect(() => {
    if (!study) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [study]);

  const metrics =
    study?.results && study.results.length > 0
      ? study.results
      : study?.outcomeMetric
        ? [{ value: study.outcomeMetric, label: "Headline result" }]
        : [];

  const isDemo = Boolean(study && (study.isDemo || siteConfig.proofIsDemo));

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] p-0 text-white backdrop:bg-[#0b1220]/80"
    >
      {study ? (
        <div className="max-h-[92dvh] overflow-y-auto">
          <div className="relative isolate">
            <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-80">
              <img
                src={getCaseStudyImage(study)}
                alt={`${study.client} case study`}
                className="h-full w-full object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-[#0b1220]/70" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-white/25 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-white/80">
                  Case study
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 ease-out hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1220]"
                >
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/64">
                  {study.industry}
                </p>
                <h2
                  id={titleId}
                  className="mt-2 max-w-2xl text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
                >
                  {study.client}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {isDemo ? (
              <p className="mb-5 inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/64">
                Illustrative example
              </p>
            ) : null}

            <p className="max-w-3xl text-base leading-[1.6] text-white/64">{study.whatWeDid}</p>

            {metrics.length > 0 ? (
              <dl className="mt-8 grid gap-6 border-y border-white/10 py-6 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={`${metric.value}-${metric.label}`} className="flex flex-col">
                    <dt className="order-2 mt-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">
                      {metric.label}
                    </dt>
                    <dd className="order-1 text-3xl font-medium tracking-[-0.03em] text-white sm:text-4xl">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <section>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/50">
                  The challenge
                </h3>
                <p className="mt-2.5 text-sm leading-[1.6] text-white/64">{study.challenge}</p>
              </section>

              <section>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/50">
                  What we did
                </h3>
                {study.scope.length > 0 ? (
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {study.scope.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2.5 text-sm leading-[1.6] text-white/64">
                    A connected strategy, brand, and digital engagement.
                  </p>
                )}
              </section>
            </div>

            {study.result ? (
              <section className="mt-8 rounded-xl border border-white/10 p-5 sm:p-6">
                <h3 className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/50">
                  The result
                </h3>
                <p className="mt-2.5 text-sm leading-[1.6] text-white/64">{study.result}</p>
              </section>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PillButton href="/free-growth-audit" treatment="filled">
                Discuss a similar project
              </PillButton>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-medium text-white transition-colors duration-200 ease-out hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1220]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
