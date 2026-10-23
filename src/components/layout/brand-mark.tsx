import Link from "next/link";

export function BrandMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center text-2xl font-bold tracking-[-0.06em] ${
        inverted ? "text-white" : "text-[var(--foreground)]"
      }`}
      aria-label="BHive home"
    >
      <span
        className={`mr-1.5 inline-grid size-7 place-items-center text-sm font-black tracking-[-0.08em] ${
          inverted
            ? "bg-white text-[#0066cc]"
            : "bg-[#0066cc] text-white"
        }`}
        style={{ borderRadius: "var(--radius-sm, 8px)" }}
      >
        B
      </span>
      Hive
    </Link>
  );
}
