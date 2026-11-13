import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type ResponsiveImage = {
  url: string;
  srcSet: string;
};

export function getImageSrcAndSrcSet(
  source: SanityImageSource,
  widths: readonly number[] = [480, 800, 1200]
): ResponsiveImage | null {
  if (!source) return null;
  try {
    const defaultWidth = widths[1] ?? 800;
    const url = urlFor(source).width(defaultWidth).auto("format").url();
    const srcSet = widths
      .map((w) => `${urlFor(source).width(w).auto("format").url()} ${w}w`)
      .join(", ");
    return { url, srcSet };
  } catch {
    return null;
  }
}
