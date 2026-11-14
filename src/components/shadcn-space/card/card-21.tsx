import type { CSSProperties, ComponentType, ReactNode } from "react";
import { Check } from "lucide-react";

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
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
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
  duration = 5,
  color = "var(--color-primary)",
  radius = 24,
}: ShineBorderProps) {
  return (
    <div
      className={cn("relative isolate overflow-hidden bg-[#e5e8ee]", className)}
      style={{ borderRadius: radius, padding: borderWidth }}
    >
      {/* Rotating beam, visible only through the border ring. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ borderRadius: radius }}
      >
        <div
          className="animate-border-beam absolute left-1/2 top-1/2 h-[200%] w-[200%] opacity-90"
          style={
            {
              background: `conic-gradient(from 90deg, transparent 0deg, transparent 336deg, ${color} 352deg, ${color} 356deg, transparent 360deg)`,
              "--beam-duration": `${duration}s`,
            } as CSSProperties
          }
        />
      </div>

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
  const Icon = panel.icon;
  const dark = Boolean(panel.emphasis);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl",
        dark ? "border border-white/10 bg-[#0b1220]" : "bg-white",
        className
      )}
    >
      {/* Ink panel glow */}
      {dark ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-28 size-96 rounded-full bg-[#3068f9]/25 blur-3xl"
        />
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-xl border",
              dark
                ? "border-white/15 bg-white/10 text-white"
                : "border-[#dce6fb] bg-[#eef3ff] text-[#1f55e0]"
            )}
          >
            <Icon className="size-5" strokeWidth={1.75} />
          </span>

          <div className="min-w-0">
            <p
              className={cn(
                "text-[10px] font-medium uppercase tracking-[0.1em] sm:text-[11px] sm:tracking-[0.14em]",
                dark ? "text-white/55" : "text-[#5b6475]"
              )}
            >
              {panel.eyebrow}
            </p>
            <h3
              className={cn(
                "mt-1.5 text-[22px] font-medium leading-[1.2] tracking-[-0.02em] sm:text-2xl",
                dark ? "text-white" : "text-[#0b1220]"
              )}
            >
              {panel.title}
            </h3>
          </div>
        </div>

        <p
          className={cn(
            "mt-4 text-sm leading-[1.6] sm:text-[15px]",
            dark ? "text-white/65" : "text-[#5b6475]"
          )}
        >
          {panel.description}
        </p>

        <Separator
          className={cn("my-6", dark ? "bg-white/12" : "bg-[#e5e8ee]")}
        />

        {/* Sequenced steps */}
        <ol className="flex flex-col gap-6">
          {panel.steps.map((step) => (
            <li key={step.num} className="flex items-start gap-3.5">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-px grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-semibold tabular-nums",
                  dark
                    ? "border-white/20 bg-white/[0.06] text-[#b3ccff]"
                    : "border-[#dce6fb] bg-white text-[#1f55e0]"
                )}
              >
                {step.num}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h4
                    className={cn(
                      "text-[15px] font-medium leading-snug tracking-[-0.01em]",
                      dark ? "text-white" : "text-[#0b1220]"
                    )}
                  >
                    {step.title}
                  </h4>
                  {step.tag ? (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]",
                        dark
                          ? "bg-white/10 text-white"
                          : "bg-[#eef3ff] text-[#1f55e0]"
                      )}
                    >
                      {step.tag}
                    </span>
                  ) : null}
                </div>
                <p
                  className={cn(
                    "mt-1 text-[13px] leading-[1.55] sm:text-sm",
                    dark ? "text-white/60" : "text-[#5b6475]"
                  )}
                >
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Commercial shape + action */}
        <div className="mt-auto pt-8">
          <Separator className={cn(dark ? "bg-white/12" : "bg-[#e5e8ee]")} />
          <div className="mt-5 flex flex-col gap-5">
            <p
              className={cn(
                "flex items-start gap-2 text-[13px] leading-[1.55]",
                dark ? "text-white/65" : "text-[#5b6475]"
              )}
            >
              <Check
                aria-hidden="true"
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  dark ? "text-[#7fa8f5]" : "text-[#3068f9]"
                )}
                strokeWidth={2}
              />
              <span>
                <span
                  className={cn(
                    "font-medium",
                    dark ? "text-white" : "text-[#0b1220]"
                  )}
                >
                  Investment shape:
                </span>{" "}
                {panel.investment}
              </span>
            </p>

            {panel.action}
          </div>
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
