import type { ComponentProps } from "react";
export function Grid({ className = "", ...props }: ComponentProps<"div">) { return <div className={`grid grid-cols-4 gap-4 sm:grid-cols-8 sm:gap-5 lg:grid-cols-12 lg:gap-6 ${className}`} {...props} />; }
