import type { ComponentType, ReactNode } from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* ============================= */
/* Types                         */
/* ============================= */

export type ComparisonStep = {
  /** Sequence marker, e.g. "01". */
  num: string;
  title: string;
  detail: string;
  /** Optional pill, e.g. "Free". */
  tag?: string;
};

export type ComparisonPanel = {
  id: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  eyebrow: string;
  title: string;
  description: string;
  steps: ComparisonStep[];
  /** Commercial shape, e.g. "Ongoing monthly retainer". */
  investment: string;
  /** Rendered CTA, owned by the caller so the card stays presentational. */
  action: ReactNode;
  /** Ink panel with the light-on-dark treatment. */
  emphasis?: boolean;
};

export interface ComparisonCardProps {
  left: ComparisonPanel;
  right: ComparisonPanel;
  className?: string;
}

/* ============================= */
/* Shine border (meteor beam)    */
/* ============================= */

type ShineBorderProps = {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  color?: string;
  radius?: number;
};

function ShineBorder({
  children,
  className,
  borderWidth = 2,
  duration = 6,
  color = "#3068f9",
  radius = 24,
}: ShineBorderProps) {
  const strokeWidth = borderWidth * 2 + 4;

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-[#e5e8ee]", className)}
      style={{ borderRadius: radius, padding: borderWidth }}
    >
      {/* Perimeter-following meteor beam, visible only through the outer border ring. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full motion-reduce:hidden"
        fill="none"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          ry={radius}
          pathLength={100}
          stroke={color}
          strokeOpacity={0.28}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="18 82"
          strokeDashoffset={0}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-100"
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          ry={radius}
          pathLength={100}
          stroke={color}
          strokeOpacity={0.62}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="10 90"
          strokeDashoffset={-8}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="-8"
            to="-108"
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          ry={radius}
          pathLength={100}
          stroke={color}
          strokeOpacity={1}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="5 95"
          strokeDashoffset={-13}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="-13"
            to="-113"
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          ry={radius}
          pathLength={100}
          stroke="#93c5fd"
          strokeOpacity={0.95}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="1.8 98.2"
          strokeDashoffset={-16.2}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="-16.2"
            to="-116.2"
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      <div
        className="relative z-10 h-full overflow-hidden bg-white"
        style={{ borderRadius: radius - borderWidth }}
      >
        {children}
      </div>
    </div>
  );
}

/* ============================= */
/* Panel                         */
/* ============================= */

function ComparisonPanelColumn({
  panel,
  className,
}: {
  panel: ComparisonPanel;
  className?: string;
}) {
  const dark = Boolean(panel.emphasis);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300",
        dark
          ? "border border-white/10 bg-[#0b1220] shadow-[0_16px_36px_rgba(11,18,32,0.35)]"
          : "border border-[#e5e8ee] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]",
        className,
      )}
    >
      {/* Ink panel radial glow */}
      {dark ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 -right-24 size-80 rounded-full bg-[#3068f9]/20 blur-3xl"
        />
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
        {/* Header (clean typography, icon removed) */}
        <div>
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.14em]",
              dark ? "text-[#93c5fd]" : "text-[#3068f9]",
            )}
          >
            {panel.eyebrow}
          </p>
          <h3
            className={cn(
              "mt-2 text-2xl font-medium leading-[1.18] tracking-[-0.025em] sm:text-[26px] lg:text-[28px]",
              dark ? "text-white" : "text-[#0b1220]",
            )}
          >
            {panel.title}
          </h3>
        </div>

        <p
          className={cn(
            "mt-3.5 text-sm leading-[1.6] sm:text-[15px]",
            dark ? "text-white/65" : "text-[#5b6475]",
          )}
        >
          {panel.description}
        </p>

        <Separator
          className={cn("my-6 sm:my-7", dark ? "bg-white/10" : "bg-[#e5e8ee]")}
        />

        {/* Sequenced steps with connected timeline and refined mono badges */}
        <ol className="flex flex-col">
          {panel.steps.map((step, idx) => {
            const isLast = idx === panel.steps.length - 1;
            return (
              <li key={step.num} className="group relative flex items-start gap-4">
                {/* Timeline step indicator */}
                <div className="relative flex flex-col items-center shrink-0">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-7 place-items-center rounded-lg border text-xs font-semibold font-mono tabular-nums select-none transition-colors duration-200",
                      dark
                        ? "border-white/12 bg-white/[0.07] text-[#93c5fd] group-hover:border-white/25 group-hover:bg-white/10"
                        : "border-[#d8e3fc] bg-[#f0f4ff] text-[#1f55e0] shadow-[0_1px_2px_rgba(31,85,224,0.06)] group-hover:border-[#b9d0fb] group-hover:bg-[#e7efff]",
                    )}
                  >
                    {step.num}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "w-px my-1.5 flex-1 min-h-[34px]",
                        dark ? "bg-white/10" : "bg-[#e5e8ee]",
                      )}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={cn("min-w-0 flex-1", !isLast ? "pb-6" : "pb-0")}>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <h4
                      className={cn(
                        "text-[15px] font-medium leading-snug tracking-[-0.01em]",
                        dark ? "text-white" : "text-[#0b1220]",
                      )}
                    >
                      {step.title}
                    </h4>
                    {step.tag ? (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]",
                          dark
                            ? "border border-[#3068f9]/40 bg-[#3068f9]/20 text-[#93c5fd]"
                            : "border border-[#d6e3fc] bg-[#eef3ff] text-[#1f55e0]",
                        )}
                      >
                        {step.tag}
                      </span>
                    ) : null}
                  </div>
                  <p
                    className={cn(
                      "mt-1.5 text-[13px] leading-[1.6] sm:text-sm",
                      dark ? "text-white/60" : "text-[#5b6475]",
                    )}
                  >
                    {step.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Commercial reassurance + action */}
        <div className="mt-auto pt-8 sm:pt-10">
          {panel.investment ? (
            <p
              className={cn(
                "mb-3.5 text-center text-xs font-medium tracking-wide",
                dark ? "text-white/50" : "text-[#5b6475]",
              )}
            >
              {panel.investment}
            </p>
          ) : null}
          <div className="flex flex-col">{panel.action}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================= */
/* Card                          */
/* ============================= */

export function ComparisonCard({
  left,
  right,
  className,
}: ComparisonCardProps) {
  return (
    <ShineBorder className={className}>
      <div className="grid grid-cols-1 gap-3 p-2 sm:p-2.5 md:grid-cols-2 md:gap-6 md:p-3">
        <ComparisonPanelColumn panel={left} />
        <ComparisonPanelColumn panel={right} />
      </div>
    </ShineBorder>
  );
}

export default ComparisonCard;
