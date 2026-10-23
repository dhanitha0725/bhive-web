import type { ComponentProps } from "react";
type SectionProps = ComponentProps<"section"> & { as?: "section" | "div" };
export function Section({ as = "section", className = "", ...props }: SectionProps) {
  const classes = `py-12 sm:py-16 lg:py-20 ${className}`;
  if (as === "div") return <div className={classes} {...(props as ComponentProps<"div">)} />;
  return <section className={classes} {...props} />;
}
