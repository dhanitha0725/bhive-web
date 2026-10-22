import Link from "next/link";
import type { ComponentProps } from "react";

// Corporate button system: blue primary, black secondary, white (for dark
// sections), outline, text.
type Variant = "primary" | "dark" | "white" | "outline" | "text";

const styles: Record<Variant, string> = {
  primary: "bg-[#0b4cc4] text-white hover:bg-[#083da0]",
  dark: "bg-[#0a0a0b] text-white hover:bg-[#23282f]",
  white: "bg-white text-[#0b4cc4] hover:bg-[#eef4ff]",
  outline:
    "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]",
  text: "text-[#0b4cc4] underline decoration-2 underline-offset-4 hover:text-[#083da0]",
};

const base =
  "btn-base inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
