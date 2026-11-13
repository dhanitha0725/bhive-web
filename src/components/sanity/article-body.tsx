/* eslint-disable @next/next/no-img-element */
import React from "react";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg leading-8 text-neutral-700">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="heading-2 mt-10 text-neutral-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold text-neutral-900">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#0066cc] pl-4 text-lg italic text-neutral-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-lg leading-8 text-neutral-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-lg leading-8 text-neutral-700">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline underline-offset-4">{children}</span>
    ),
    code: ({ children }) => (
      <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-neutral-800">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      return (
        <a
          href={href}
          className="font-semibold text-[#0066cc] underline underline-offset-4 hover:text-[#0055b3]"
          rel="noreferrer noopener"
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
          <figure className="my-8">
            <img
              src={imageUrl}
              alt={altText}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl border border-neutral-200 object-cover"
            />
            {value.caption ? (
              <figcaption className="mt-2 text-center text-sm text-neutral-500">
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
    <div className="grid gap-6">
      <PortableText value={value} components={components} />
    </div>
  );
}
