import type { ComponentProps } from "react";
type SectionProps = ComponentProps<"section"> & { as?: "section" | "div" };
export function Section({ as = "section", className = "", ...props }: SectionProps) {
  const classes = `py-16 sm:py-20 lg:py-28 ${className}`;
  if (as === "div") return <div className={classes} {...(props as ComponentProps<"div">)} />;
  return <section className={classes} {...props} />;
}
