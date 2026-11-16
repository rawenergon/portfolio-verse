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

          {/* GitHub Logo Icon in Orange (No border, direct link) */}
          <a
            href={template.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#ff6a00] hover:bg-orange-500/10 hover:scale-110 transition-all cursor-pointer shrink-0"
            title={`View ${template.title} on GitHub`}
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        {/* Tech Stack Icons Row */}
        <div className="mt-3 flex items-center gap-2 text-xs">
          {template.techStack.slice(0, 3).map((tech, i) => {
            const isTS = tech.name === "TypeScript";
            const isNext = tech.name === "Next.js";
            const isReact = tech.name === "React";

            return (
              <React.Fragment key={tech.name}>
                {isTS ? (
                  <span className="inline-flex items-center gap-1 rounded bg-[#3178c6]/10 text-[#3178c6] border border-[#3178c6]/20 px-1.5 py-0.5 font-mono text-[11px] font-bold shadow-2xs" title="TypeScript">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                      <rect width="24" height="24" rx="3.5" fill="#3178C6" />
                      <path fill="#FFFFFF" d="M14.7 18.5c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596zM3.375 9.938h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                    </svg>
                    <span>TS</span>
                  </span>
                ) : isNext ? (
                  <span className="inline-flex items-center gap-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 font-mono text-[11px] font-bold shadow-2xs" title="Next.js">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current shrink-0" aria-hidden="true">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 16.03L9.77 6.94h2.24l7.15 9.42c-.7.62-1.47 1.18-2.24 1.67zM6.94 17.06V6.94h1.79v10.12H6.94z"/>
                    </svg>
                    <span>Next</span>
                  </span>
                ) : isReact ? (
                  <span className="inline-flex items-center gap-1 rounded bg-[#00d8ff]/10 text-[#00d8ff] border border-[#00d8ff]/20 px-1.5 py-0.5 font-mono text-[11px] font-bold shadow-2xs" title="React">
                    <svg viewBox="-11.5 -10.23174 23 20.46348" className="h-3.5 w-3.5 text-[#00D8FF] shrink-0" aria-hidden="true">
                      <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                      <g stroke="currentColor" strokeWidth="1" fill="none">
                        <ellipse rx="11" ry="4.2"/>
                        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                      </g>
                    </svg>
                    <span>React</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700" title={tech.name}>
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
