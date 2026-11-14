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
  RotateCcw,
  Github,
  Twitter,
  Mail,
  Shield,
  Code2,
  Terminal,
  Cpu
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

  const isCcidcop = template.slug === "ccidcop";

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
            {isCcidcop && (
              <span className="hidden sm:inline-block rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                ccidcop.in
              </span>
            )}
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
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <span>{isCcidcop ? "Visit ccidcop.in" : "Open in Tab"}</span>
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
            <div className="mx-auto rounded bg-black/50 px-6 py-0.5 font-mono text-[11px] text-zinc-300 border border-white/5 truncate max-w-sm flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span>{isCcidcop ? "https://ccidcop.in" : `https://${template.slug}.cvverse.dev`}</span>
            </div>
          </div>

          {/* Interactive Simulation Frame */}
          <div key={key} className="flex-1 overflow-y-auto bg-[#0a0a0c] text-white p-6 sm:p-10 space-y-12">
            
            {isCcidcop ? (
              /* Dedicated CCIDCOP Live Simulation */
              <div className="max-w-2xl mx-auto space-y-10">
                {/* CCIDCOP Top Nav */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center font-black text-[#f95300] text-sm">
                      AR
                    </div>
                    <div>
                      <div className="font-bold text-sm">Aditya Raj</div>
                      <div className="text-[11px] font-mono text-zinc-400">@rawenergon • India</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <a href="https://github.com/rawenergon" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      GitHub
                    </a>
                    <span>/</span>
                    <a href="https://x.com/adibxr" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      X
                    </a>
                    <span>/</span>
                    <a href="mailto:devadibxr@gmail.com" className="hover:text-white">
                      Email
                    </a>
                  </div>
                </div>

                {/* CCIDCOP Hero */}
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    I build <span className="text-[#f95300]">security tools</span> in public.
                  </h1>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Developer and security tools engineer building <strong className="text-zinc-200">vaulted</strong> and <strong className="text-zinc-200">netwatch</strong>. Over the past 4 years, I&apos;ve focused on engineering low-level systems, cryptographic suites, and minimal software that runs fast.
                  </p>
                </div>

                {/* Projects Showcase */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                    Featured Work &amp; Products
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "RECO LABS", year: "2026", desc: "A Community for Builders" },
                      { title: "RECO BLOG", year: "2026", desc: "Markdown Blog Writing Engine" },
                      { title: "RECON-X", year: "2025", desc: "Automated Passive DNS & Recon Pipeline" },
                      { title: "ADI AI", year: "2025", desc: "Automated Social & Scheduling Bot" },
                      { title: "FACE MASH", year: "2024", desc: "Real-Time Ranking & Comparison App" },
                      { title: "BE REAL", year: "2024", desc: "Privacy-Centric Anonymous Platform" },
                    ].map(proj => (
                      <div key={proj.title} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-zinc-100">{proj.title}</span>
                          <span className="font-mono text-[10px] text-zinc-500">{proj.year}</span>
                        </div>
                        <p className="text-xs text-zinc-400">{proj.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack Matrix */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                    Technical Stack
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                      <div className="text-zinc-500 text-[10px]">Languages</div>
                      <div className="font-semibold text-zinc-200 mt-1">TypeScript, JS</div>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                      <div className="text-zinc-500 text-[10px]">Frontend</div>
                      <div className="font-semibold text-zinc-200 mt-1">Next.js, Tailwind, React</div>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                      <div className="text-zinc-500 text-[10px]">Backend</div>
                      <div className="font-semibold text-zinc-200 mt-1">Supabase, Firebase</div>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                      <div className="text-zinc-500 text-[10px]">Security</div>
                      <div className="font-semibold text-zinc-200 mt-1">Auth, Cryptography</div>
                    </div>
                  </div>
                </div>

                {/* Live Visit Banner */}
                <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-white">Experience ccidcop.in Live</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Explore the production portfolio deployed on ccidcop.in</p>
                  </div>
                  <a
                    href="https://ccidcop.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#f95300] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#ff6a1a] shrink-0"
                  >
                    <span>Launch ccidcop.in</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              /* Standard Template Live Preview */
              <>
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
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
