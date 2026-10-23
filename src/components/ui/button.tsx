import Link from "next/link";
import type { ComponentProps } from "react";

// Corporate button system based on DESIGN.md: primary pill, dark utility, white pill, outline pill, text link.
type Variant = "primary" | "dark" | "white" | "outline" | "text";

const styles: Record<Variant, string> = {
  primary:
    "bg-[#0066cc] text-white hover:bg-[#0055b3] focus-visible:outline-[#0071e3]",
  dark:
    "bg-[#1d1d1f] text-white hover:bg-[#272729] !rounded-lg !px-[15px] !py-2 text-[14px]",
  white:
    "bg-white text-[#0066cc] border border-[#e0e0e0] hover:bg-[#f5f5f7] focus-visible:outline-[#0071e3]",
  outline:
    "border border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc]/5 focus-visible:outline-[#0071e3]",
  text:
    "text-[#0066cc] underline decoration-1 underline-offset-4 hover:text-[#0055b3] !min-h-0 !p-0 !rounded-none",
};

const base =
  "btn-base inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-[22px] py-[11px] text-[15px] sm:text-[17px] font-normal leading-normal transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.95]";

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
