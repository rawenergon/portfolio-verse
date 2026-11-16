"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { TemplateItem } from "@/lib/templates-data";

interface TemplateCardProps {
  template: TemplateItem;
  onSelectForPurchase?: (template: TemplateItem) => void;
}

export function TemplateCard({ 
  template 
}: TemplateCardProps) {
  const isCcidcop = template.slug === "ccidcop";
  const targetUrl = template.demoUrl || (isCcidcop ? "https://ccidcop.in" : `https://${template.slug}.ui-layouts.com`);
  const previewImgSrc = template.imageUrl || `https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}&screenshot=true&embed=screenshot.url`;

  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-[#e5e5e5] bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-[#27272a] dark:bg-[#121214]">
      
      {/* SVG Noise Texture overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.06]">
        <filter id={`noise-${template.id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${template.id})`} />
      </svg>

      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h2 className="text-lg sm:text-xl font-serif font-normal tracking-tight text-zinc-900 dark:text-white uppercase">
              <Link 
                href={`/templates/${template.slug}`}
                className="hover:text-[#ff6a00] dark:hover:text-[#ff6a00] transition-colors"
              >
                {template.title}
              </Link>
            </h2>

            {/* (New) Badge in Green Italic matching reference */}
            {template.isNew && (
              <span className="text-xs font-semibold italic text-[#22c55e] tracking-tight">
                (New)
              </span>
            )}
          </div>

          {/* GitHub Logo Icon in Orange (No text name, direct link) */}
          <a
            href={template.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 text-[#ff6a00] border border-orange-500/20 hover:bg-[#ff6a00] hover:text-white transition-all cursor-pointer shrink-0"
            title={`View ${template.title} on GitHub`}
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        {/* Tech Stack Icons Row: TS • N • ⚛ matching screenshot */}
        <div className="mt-3 flex items-center gap-2 text-xs">
          {template.techStack.slice(0, 3).map((tech, i) => {
            const isTS = tech.name === "TypeScript";
            const isNext = tech.name === "Next.js";
            const isReact = tech.name === "React";

            return (
              <React.Fragment key={tech.name}>
                {isTS ? (
                  <span className="inline-flex items-center rounded bg-[#71717a] dark:bg-[#3f3f46] px-1.5 py-0.5 font-mono text-[11px] font-bold text-white shadow-sm" title="TypeScript">
                    TS
                  </span>
                ) : isNext ? (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-zinc-400/80 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 font-mono text-[10px] font-bold text-zinc-800 dark:text-zinc-200" title="Next.js">
                    N
                  </span>
                ) : isReact ? (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/80 text-[12px] font-bold text-zinc-700 dark:text-zinc-300" title="React">
                    ⚛
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700" title={tech.name}>
                    {tech.badge}
                  </span>
                )}
                {i < Math.min(template.techStack.length, 3) - 1 && (
                  <span className="text-zinc-400 dark:text-zinc-600 font-bold">•</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {template.description}
        </p>
      </div>

      {/* Media Preview Container with Website Image */}
      <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#e5e5e5] bg-zinc-950 dark:border-zinc-800 shadow-inner group/preview">
        
        {/* Crisp Website Preview Image with subtle hover zoom */}
        <div className="relative h-full w-full overflow-hidden bg-zinc-900">
          <Image
            src={previewImgSrc}
            alt={`${template.title} Website Preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Hover Quick Action Buttons: Visit and Info */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4 z-20">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#ff6a00] px-5 py-2 text-xs font-bold text-white shadow-lg shadow-orange-500/30 hover:bg-[#ff7a1a] transition-all hover:scale-105 cursor-pointer"
          >
            Visit
          </a>

          <Link
            href={`/templates/${template.slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2 text-xs font-bold text-zinc-900 shadow-lg hover:bg-zinc-100 transition-all hover:scale-105 cursor-pointer"
          >
            Info
          </Link>
        </div>
      </div>

      {/* Bottom Footer Action inside Card */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
        <Link
          href={`/templates/${template.slug}`}
          className="font-medium text-zinc-600 hover:text-[#ff6a00] dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          View Details →
        </Link>

        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-zinc-600 hover:text-[#ff6a00] dark:text-zinc-400 dark:hover:text-[#ff6a00] transition-colors cursor-pointer"
        >
          Live Site →
        </a>
      </div>
    </article>
  );
}
