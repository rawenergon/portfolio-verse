"use client";

import React, { useState } from "react";
import { 
  X, 
  ExternalLink, 
  Monitor, 
  Tablet, 
  Smartphone, 
  ShoppingCart,
  ArrowLeft,
  RotateCcw
} from "lucide-react";
import { TemplateItem } from "@/lib/templates-data";

interface LivePreviewModalProps {
  template: TemplateItem | null;
  onClose: () => void;
  onSelectForPurchase: (template: TemplateItem) => void;
}

export function LivePreviewModal({ 
  template, 
  onClose, 
  onSelectForPurchase 
}: LivePreviewModalProps) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [key, setKey] = useState(0);

  if (!template) return null;

  const deviceWidthClass = {
    desktop: "w-full max-w-6xl",
    tablet: "w-[768px] max-w-full",
    mobile: "w-[390px] max-w-full",
  }[device];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Top Floating Control Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 bg-[#0e0e11] px-4 text-white">
        
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold uppercase">{template.title}</span>
            <span className="rounded bg-orange-500/15 px-2 py-0.5 text-[10px] font-bold text-[#f95300]">
              ${template.price} USD
            </span>
          </div>
        </div>

        {/* Center: Device Viewport Switchers */}
        <div className="hidden sm:flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/90 p-1">
          <button
            onClick={() => setDevice("desktop")}
            className={`rounded-lg p-1.5 transition-colors ${
              device === "desktop" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
            title="Desktop View"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`rounded-lg p-1.5 transition-colors ${
              device === "tablet" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
            title="Tablet View"
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`rounded-lg p-1.5 transition-colors ${
              device === "mobile" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
            title="Mobile View"
          >
            <Smartphone className="h-4 w-4" />
          </button>
          <button
            onClick={() => setKey(k => k + 1)}
            className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-200 ml-1 border-l border-zinc-800"
            title="Reload Preview"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={template.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <span>Open in Tab</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            onClick={() => {
              onClose();
              onSelectForPurchase(template);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#f95300] px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:bg-[#ff6a1a]"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Buy - ${template.price}</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Preview Container */}
      <main className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <div 
          className={`h-full max-h-[88vh] rounded-xl overflow-hidden border border-zinc-800 bg-[#09090b] shadow-2xl transition-all duration-300 flex flex-col ${deviceWidthClass}`}
        >
          {/* Simulated Browser Address Bar */}
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-400 select-none shrink-0">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="mx-auto rounded bg-black/50 px-6 py-0.5 font-mono text-[11px] text-zinc-300 border border-white/5 truncate max-w-sm">
              https://{template.slug}.portfolioverse.dev/live-preview
            </div>
          </div>

          {/* Interactive Simulation Frame */}
          <div key={key} className="flex-1 overflow-y-auto bg-[#0a0a0c] text-white p-6 sm:p-10 space-y-12">
            
            {/* Live Template Header Simulation */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-orange-500/20 flex items-center justify-center text-[#f95300] font-black border border-orange-500/30">
                  {template.title[0]}
                </div>
                <div>
                  <div className="font-bold tracking-tight text-base">{template.title}</div>
                  <div className="text-[11px] text-zinc-500">{template.category} Template Studio</div>
                </div>
              </div>
              <div className="hidden sm:flex gap-4 text-xs font-medium text-zinc-400">
                <span className="hover:text-white cursor-pointer">Works</span>
                <span className="hover:text-white cursor-pointer">Services</span>
                <span className="hover:text-white cursor-pointer">Pricing</span>
                <span className="hover:text-white cursor-pointer">Contact</span>
              </div>
            </div>

            {/* Template Hero Banner */}
            <div className="text-center py-8 space-y-4 max-w-2xl mx-auto">
              <span className="inline-block rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-[#f95300] border border-orange-500/20">
                Crafted for Next-Gen Creators
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Crafting digital experiences with precision &amp; speed.
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {template.longDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <button 
                  onClick={() => {
                    onClose();
                    onSelectForPurchase(template);
                  }}
                  className="rounded-xl bg-[#f95300] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ff6a1a]"
                >
                  Buy This Template (${template.price})
                </button>
                <a 
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-xs font-semibold hover:bg-zinc-700"
                >
                  Launch Full Demo ↗
                </a>
              </div>
            </div>

            {/* Template Feature Showcase Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
              {template.features.map((feat, i) => (
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#f95300]">
                    <span>0{i + 1}.</span>
                    <span>Feature Highlight</span>
                  </div>
                  <div className="text-sm font-semibold text-zinc-200">{feat}</div>
                  <div className="text-xs text-zinc-500">Fully accessible and optimized for React 18/19 &amp; Next.js 14.</div>
                </div>
              ))}
            </div>

            {/* Tech Stack Specs */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold">Tech Stack Specifications</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Written in pure TypeScript with zero legacy dependencies.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {template.techStack.map(t => (
                  <span key={t.name} className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${t.color}`}>
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
