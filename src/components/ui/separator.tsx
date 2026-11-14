import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type SeparatorProps = ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

/**
 * Lightweight separator matching the shadcn/ui API surface.
 *
 * The project does not ship Radix primitives, and a separator is a single
 * hairline: a div with the correct role does the job without a dependency.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      data-slot="separator"
      role={decorative ? "presentation" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
