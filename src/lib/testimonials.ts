import type { TESTIMONIALS_QUERY_RESULT } from "../../sanity.types";

export type TestimonialView = {
  id?: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};

export function mapTestimonials(
  raw: TESTIMONIALS_QUERY_RESULT | null | undefined
): TestimonialView[] {
  return (raw ?? [])
    .filter((item) => Boolean(item?.author && item?.quote))
    .map((item, index) => {
      const quote = item.quote!.trim().replace(/^["“]+/, "").replace(/["”]+$/, "");
      const role = [item.role, item.company].filter(Boolean).join(" · ");

      return {
        id: item._id,
        quote: `“${quote}”`,
        author: item.author!,
        role,
        avatar: item.avatar?.url || `/images/figma/hero-${(index % 4) + 1}.png`,
      };
    });
}
