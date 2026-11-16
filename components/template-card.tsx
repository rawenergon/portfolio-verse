"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Lock, 
  ExternalLink, 
  ShoppingCart, 
  Eye, 
  Globe
} from "lucide-react";
import { TemplateItem } from "@/lib/templates-data";
import { useUserCurrency } from "@/lib/use-user-currency";

interface TemplateCardProps {
  template: TemplateItem;
  onSelectForPurchase: (template: TemplateItem) => void;
  onOpenLivePreview: (template: TemplateItem) => void;
}

export function TemplateCard({ 
  template, 
  onSelectForPurchase, 
  onOpenLivePreview 
}: TemplateCardProps) {
  const { formatPrice } = useUserCurrency();
  const isCcidcop = template.slug === "ccidcop";
  const targetUrl = template.demoUrl || (isCcidcop ? "https://ccidcop.in" : `https://${template.slug}.ui-layouts.com`);
  const previewImgSrc = template.imageUrl || `https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}&screenshot=true&embed=screenshot.url`;

  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-[#e5e5e5] bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-[#27272a] dark:bg-[#121214]">
      
      {/* SVG Noise Texture overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.06]">
        <filter id={`noise-${template.id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${template.id})`} />
      </svg>

      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-zinc-900 dark:text-white uppercase">
              <Link 
                href={`/templates/${template.slug}`}
                className="hover:text-[#ff6a00] dark:hover:text-[#ff6a00] transition-colors"
              >
                {template.title}
              </Link>
            </h2>

            {/* Lock / Live Icon in gray rounded box */}
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#f4f4f5] text-zinc-600 dark:bg-[#27272a] dark:text-zinc-400">
              {template.demoUrl ? (
                <Globe className="h-3 w-3 text-[#ff6a00]" />
              ) : (
                <Lock className="h-3 w-3" />
              )}
            </span>

            {/* (New) Badge in Green Italic matching reference */}
            {template.isNew && (
              <span className="text-sm font-semibold italic text-[#22c55e] tracking-tight">
                (New)
              </span>
            )}
          </div>

          {/* Price formatted according to detected user region */}
          <div className="text-right shrink-0">
            <div className="text-xl sm:text-2xl font-bold font-mono text-zinc-900 dark:text-white leading-tight">
              {formatPrice(template.price)}
            </div>
          </div>
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

        {/* Live URL Pill in corner of card sandbox */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 rounded-md bg-black/80 px-2 py-0.5 font-mono text-[10px] text-zinc-300 border border-white/10 backdrop-blur-sm pointer-events-none">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {template.demoUrl 
              ? template.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') 
              : `${template.slug}.ui-layouts.com`}
          </span>
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-4 z-20">
          <div className="flex items-center gap-2.5">
            <Link
              href={`/templates/${template.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-zinc-900 shadow-md hover:bg-zinc-100 transition-all hover:scale-105 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-[#ff6a00]" />
              <span>View</span>
            </Link>

            <button
              onClick={() => onSelectForPurchase(template)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6a00] px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/30 hover:bg-[#ff7a1a] transition-all hover:scale-105 cursor-pointer"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Buy - {formatPrice(template.price)}</span>
            </button>
          </div>

          <Link
            href={`/templates/${template.slug}`}
            className="text-[11px] font-medium text-white/90 underline-offset-4 hover:underline hover:text-white"
          >
            View Details &amp; Live Site →
          </Link>
        </div>
      </div>

      {/* Bottom Footer Action inside Card */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
        <Link
          href={`/templates/${template.slug}`}
          className="font-medium text-zinc-600 hover:text-[#ff6a00] dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          View →
        </Link>

        <div className="flex items-center gap-2.5">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
          >
            <span>Live Site</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            onClick={() => onSelectForPurchase(template)}
            className="rounded bg-zinc-900 px-3 py-1 font-semibold text-white shadow-sm hover:bg-[#ff6a00] dark:bg-zinc-800 dark:hover:bg-[#ff6a00] transition-colors cursor-pointer"
          >
            Buy - {formatPrice(template.price)}
          </button>
        </div>
      </div>
    </article>
  );
}
