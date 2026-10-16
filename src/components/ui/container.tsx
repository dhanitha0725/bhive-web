import type { ComponentProps } from "react";
export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-20 ${className}`} {...props} />;
}
