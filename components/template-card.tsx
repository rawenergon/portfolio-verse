"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Lock, 
  ExternalLink, 
  ShoppingCart, 
  Eye, 
  Sparkles,
  Check,
  Maximize2
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-zinc-400/80 dark:border-zinc-800 dark:bg-[#121214] dark:hover:border-zinc-700 dark:hover:shadow-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Noise Texture SVG overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.06]">
        <filter id={`noise-${template.id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${template.id})`} />
      </svg>

      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
              {template.title}
            </h2>

            {/* Lock / Pro Icon */}
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              <Lock className="h-3 w-3" />
            </span>

            {/* (New) Badge */}
            {template.isNew && (
              <span className="text-xs font-bold italic text-emerald-500 dark:text-emerald-400 tracking-tight">
                (New)
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 shrink-0">
            <span className="text-xs text-zinc-400 line-through">
              ${template.originalPrice}
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
              ${template.price}
            </span>
          </div>
        </div>

        {/* Tech Stack Icons Row */}
        <div className="mt-3 flex items-center gap-2">
          {template.techStack.map((tech, i) => (
            <React.Fragment key={tech.name}>
              <span 
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold border ${tech.color}`}
                title={tech.name}
              >
                {tech.badge}
              </span>
              {i < template.techStack.length - 1 && (
                <span className="text-zinc-400 dark:text-zinc-600 text-xs">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
      </div>

      {/* Media Preview Container */}
      <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-950 dark:border-zinc-800/80 shadow-inner">
        {/* Video or Animated Interactive Preview */}
        {!videoFailed && template.videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          >
            <source src={template.videoSrc} type="video/mp4" />
          </video>
        ) : (
          /* Interactive Animated Fallback Mockup */
          <div className={`relative h-full w-full bg-gradient-to-br ${template.previewGradient} p-4 flex flex-col justify-between overflow-hidden`}>
            {/* Ambient grid texture */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
                backgroundSize: "20px 20px"
              }}
            />

            {/* Mock browser header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 z-10">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 bg-black/40 px-3 py-0.5 rounded-full border border-white/5">
                {template.slug}.portverse.io
              </span>
            </div>

            {/* Mock website content */}
            <div className="z-10 my-auto text-center space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white backdrop-blur">
                {template.category}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {template.title}
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto line-clamp-2">
                {template.longDescription.slice(0, 80)}...
              </p>
            </div>

            {/* Mock UI bottom controls */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 z-10 text-[10px] text-zinc-400 font-mono">
              <span>Next.js 14 • Tailwind</span>
              <span className="text-emerald-400">● Live Demo Ready</span>
            </div>
          </div>
        )}

        {/* Floating Quick Action Overlay Buttons on Hover */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-4">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenLivePreview(template)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3.5 py-2 text-xs font-bold text-zinc-900 shadow-lg backdrop-blur hover:bg-white hover:scale-105 transition-all"
            >
              <Eye className="h-3.5 w-3.5 text-[#f95300]" />
              <span>Live Preview</span>
            </button>

            <button
              onClick={() => onSelectForPurchase(template)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#f95300] px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-orange-500/30 hover:bg-[#ff6a1a] hover:scale-105 transition-all"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Buy - ${template.price}</span>
            </button>
          </div>

          <Link
            href={`/templates/${template.slug}`}
            className="text-[11px] font-medium text-white/90 underline-offset-4 hover:underline hover:text-white"
          >
            View Full Specifications & Changelog →
          </Link>
        </div>
      </div>

      {/* Bottom Footer Actions inside Card */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs">
        <Link
          href={`/templates/${template.slug}`}
          className="font-medium text-zinc-600 hover:text-[#f95300] dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          Details &amp; Docs
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenLivePreview(template)}
            className="flex items-center gap-1 font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            <span>Preview</span>
            <ExternalLink className="h-3 w-3" />
          </button>

          <button
            onClick={() => onSelectForPurchase(template)}
            className="rounded-md bg-zinc-900 px-3 py-1 font-semibold text-white shadow transition-all hover:bg-[#f95300] dark:bg-zinc-800 dark:hover:bg-[#f95300]"
          >
            Get Template
          </button>
        </div>
      </div>
    </div>
  );
}
