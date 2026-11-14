/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { InsightSummary } from "@/lib/blog/types";

interface BlogCardProps {
  post: InsightSummary;
  className?: string;
  priority?: boolean;
}

export function BlogCard({ post, className = "", priority = false }: BlogCardProps) {
  return (
    <article className={`h-full ${className}`}>
      <Link
        href={`/insights/${post.slug}`}
        className="group flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3068f9] focus-visible:ring-offset-4 rounded-2xl"
      >
        {/* Article Image Container */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#f5f7fa] border border-[#e5e8ee]">
          {post.coverImage ? (
            <img
              src={post.coverImage.url}
              srcSet={post.coverImage.srcSet}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={post.coverImage.alt || post.title}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#f5f7fa] text-[#5b6475]">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#3068f9]">
                {post.pillarName || "Insight"}
              </span>
            </div>
          )}
        </div>

        {/* Metadata */}
        <p className="mt-4 text-xs sm:text-[14px] text-[#5b6475] font-normal leading-[1.5]">
          {post.pillarName ? `${post.pillarName}  •  ` : ""}
          {post.readingTime || "4 min read"}
        </p>

        {/* Title */}
        <h3 className="mt-2 text-lg sm:text-[20px] font-medium tracking-tight text-[#0b1220] group-hover:text-[#3068f9] transition-colors duration-200 leading-[1.3]">
          {post.title}
        </h3>

        {/* Action Link */}
        <div className="mt-auto pt-4 flex items-center gap-2 text-[15px] font-medium text-[#0b1220] group-hover:text-[#3068f9] transition-colors duration-200">
          <span>Read article</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </div>
      </Link>
    </article>
  );
}
