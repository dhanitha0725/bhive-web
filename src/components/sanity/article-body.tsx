/* eslint-disable @next/next/no-img-element */
import React from "react";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base sm:text-lg leading-[1.6] text-[#0b1220] mb-6 font-normal">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#0b1220] mt-12 sm:mt-16 mb-4 sm:mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-medium tracking-[-0.01em] leading-[1.3] text-[#0b1220] mt-8 sm:mt-10 mb-3 sm:mb-4">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#3068f9] pl-6 py-1 my-8 text-lg sm:text-xl italic text-[#5b6475] leading-[1.6]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-3 pl-6 text-base sm:text-lg leading-[1.6] text-[#0b1220] my-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-3 pl-6 text-base sm:text-lg leading-[1.6] text-[#0b1220] my-6">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#0b1220]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline underline-offset-4">{children}</span>
    ),
    code: ({ children }) => (
      <code className="rounded bg-[#f5f7fa] px-1.5 py-0.5 font-mono text-sm text-[#0b1220] border border-[#e5e8ee]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      return (
        <a
          href={href}
          className="font-medium text-[#3068f9] underline underline-offset-4 hover:text-[#1f55e0] transition-colors"
          rel={isExternal ? "noreferrer noopener" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      try {
        const imageUrl = urlFor(value).width(1200).auto("format").url();
        const altText =
          typeof value.alt === "string" && value.alt.trim().length > 0
            ? value.alt
            : "Article image";
        return (
          <figure className="my-10">
            <div className="overflow-hidden rounded-2xl border border-[#e5e8ee] bg-[#f5f7fa]">
              <img
                src={imageUrl}
                alt={altText}
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
              />
            </div>
            {value.caption ? (
              <figcaption className="mt-3 text-center text-sm text-[#5b6475]">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      } catch {
        return null;
      }
    },
  },
};

export function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return (
    <div className="w-full">
      <PortableText value={value} components={components} />
    </div>
  );
}
