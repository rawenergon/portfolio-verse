"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Lock, 
  ExternalLink, 
  ShoppingCart, 
  Eye, 
  Globe
} from "lucide-react";
import { TemplateItem } from "@/lib/templates-data";

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
  const [videoFailed, setVideoFailed] = useState(false);
  const isCcidcop = template.slug === "ccidcop";

  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-[#e5e5e5] bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-[#27272a] dark:bg-[#121214]">
      
      {/* SVG Noise Texture overlay from reference */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.06]">
        <filter id={`noise-${template.id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${template.id})`} />
      </svg>

      <div className="relative z-10">
        {/* Exact Header Row from reference screenshot */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {template.title}
            </h2>

            {/* Lock / Live Icon in gray rounded box */}
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#f4f4f5] text-zinc-600 dark:bg-[#27272a] dark:text-zinc-400">
              {isCcidcop ? (
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

          {/* Price */}
          <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white shrink-0">
            ${template.price}
          </div>
        </div>

        {/* Tech Stack Icons Row: TS • N • ⚛ */}
        <div className="mt-3 flex items-center gap-2 text-xs">
          {template.techStack.slice(0, 3).map((tech, i) => (
            <React.Fragment key={tech.name}>
              <span 
                className={`inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold border ${tech.color}`}
                title={tech.name}
              >
                {tech.badge}
              </span>
              {i < Math.min(template.techStack.length, 3) - 1 && (
                <span className="text-zinc-400 dark:text-zinc-600">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {template.description}
        </p>
      </div>

      {/* Media Preview Container */}
      <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#e5e5e5] bg-zinc-950 dark:border-zinc-800 shadow-inner">
        {/* Video or Animated Interactive Preview */}
        {!videoFailed && template.videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          >
            <source src={template.videoSrc} type="video/mp4" />
          </video>
        ) : isCcidcop ? (
          /* High-Fidelity CCIDCOP Preview Mockup */
          <div className="relative h-full w-full bg-gradient-to-br from-[#121216] via-black to-[#09090b] p-5 flex flex-col justify-between overflow-hidden">
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, #f95300 1px, transparent 0)",
                backgroundSize: "24px 24px"
              }}
            />

            <div className="flex items-center justify-between border-b border-white/10 pb-2 z-10">
              <div className="flex gap-1.5 items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                <span className="ml-2 font-mono text-[10px] text-zinc-400">ccidcop.in</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                ● Live Portfolio
              </span>
            </div>

            <div className="z-10 my-auto text-left space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[10px] font-black text-[#ff6a00]">
                  AR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">Aditya Raj</h4>
                  <p className="text-[9px] font-mono text-zinc-400">@rawenergon</p>
                </div>
              </div>
              <p className="text-sm font-extrabold text-white tracking-tight">
                I build <span className="text-[#ff6a00]">security tools</span> in public.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {["RECO LABS", "RECON-X", "ADI AI", "FACE MASH"].map(tag => (
                  <span key={tag} className="font-mono text-[8px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 z-10 text-[10px] text-zinc-400 font-mono">
              <span className="text-zinc-500">TypeScript • Next.js • Security</span>
              <span className="text-[#ff6a00] font-semibold">ccidcop.in ↗</span>
            </div>
          </div>
        ) : (
          /* General Interactive Mockup */
          <div className={`relative h-full w-full bg-gradient-to-br ${template.previewGradient} p-4 flex flex-col justify-between overflow-hidden`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-2 z-10">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400">{template.slug}.portverse.io</span>
            </div>
            <div className="z-10 my-auto text-center space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight uppercase">{template.title}</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto line-clamp-1">{template.subCategory}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 z-10 text-[10px] text-zinc-400 font-mono">
              <span>Next.js 14</span>
              <span className="text-emerald-400">● Live Demo Ready</span>
            </div>
          </div>
        )}

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-4">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenLivePreview(template)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-zinc-900 shadow-md hover:bg-zinc-100 transition-all hover:scale-105"
            >
              <Eye className="h-3.5 w-3.5 text-[#ff6a00]" />
              <span>Live Preview</span>
            </button>

            <button
              onClick={() => onSelectForPurchase(template)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6a00] px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/30 hover:bg-[#ff7a1a] transition-all hover:scale-105"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Buy - ${template.price}</span>
            </button>
          </div>

          <Link
            href={`/templates/${template.slug}`}
            className="text-[11px] font-medium text-white/90 underline-offset-4 hover:underline hover:text-white"
          >
            View Details &amp; Docs →
          </Link>
        </div>
      </div>

      {/* Bottom Footer Action inside Card */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
        <Link
          href={`/templates/${template.slug}`}
          className="font-medium text-zinc-600 hover:text-[#ff6a00] dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          Details
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenLivePreview(template)}
            className="flex items-center gap-1 font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <span>Preview</span>
            <ExternalLink className="h-3 w-3" />
          </button>

          <button
            onClick={() => onSelectForPurchase(template)}
            className="rounded bg-zinc-900 px-3 py-1 font-semibold text-white shadow-sm hover:bg-[#ff6a00] dark:bg-zinc-800 dark:hover:bg-[#ff6a00] transition-colors"
          >
            Buy Template
          </button>
        </div>
      </div>
    </article>
  );
}
