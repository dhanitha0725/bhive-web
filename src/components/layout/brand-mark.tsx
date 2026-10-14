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
        className={`mr-1 inline-grid size-6.5 place-items-center text-sm font-black tracking-[-0.08em] ${
          inverted
            ? "bg-white text-[#0b4cc4]"
            : "bg-[#0b4cc4] text-white"
        }`}
        style={{ borderRadius: "var(--radius-btn, 6px)" }}
      >
        B
      </span>
      Hive
    </Link>
  );
}
