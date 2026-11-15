"use client";

import React, { useState } from "react";
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  RotateCcw, 
  ExternalLink, 
  Lock, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  X,
  Loader2,
  Globe
} from "lucide-react";
import { TEMPLATES_DATA, TemplateItem } from "@/lib/templates-data";
import { useUserCurrency } from "@/lib/use-user-currency";

interface ResponsiveTabBrowserProps {
  initialSlug?: string;
  onSelectForPurchase?: (template: TemplateItem) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export function ResponsiveTabBrowser({
  initialSlug = "ccidcop",
  onSelectForPurchase,
  onClose,
  isModal = false
}: ResponsiveTabBrowserProps) {
  const { formatPrice } = useUserCurrency();
  const [activeSlug, setActiveSlug] = useState<string>(initialSlug);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const activeTemplate = TEMPLATES_DATA.find(t => t.slug === activeSlug) || TEMPLATES_DATA[0];

  const targetLiveUrl = activeTemplate.demoUrl || (activeSlug === "ccidcop" ? "https://ccidcop.in" : `https://${activeSlug}.ui-layouts.com`);
  const proxyEmbedUrl = targetLiveUrl.startsWith("/") 
    ? targetLiveUrl 
    : `/api/proxy?url=${encodeURIComponent(targetLiveUrl)}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(targetLiveUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // Device dimension mappings
  const deviceSpecs = {
    desktop: {
      label: "Desktop",
      dimension: "1280 × 820",
      containerClass: "w-full max-w-[1280px] h-[780px] rounded-xl border border-zinc-700/80 shadow-2xl",
      innerFrameClass: "w-full h-full",
    },
    tablet: {
      label: "Tablet",
      dimension: "768 × 1024",
      containerClass: "w-[768px] max-w-full h-[780px] rounded-2xl border-[6px] border-zinc-800 shadow-2xl",
      innerFrameClass: "w-full h-full",
    },
    mobile: {
      label: "Phone",
      dimension: "390 × 844",
      containerClass: "w-[390px] max-w-full h-[780px] rounded-[44px] border-[10px] border-zinc-850 bg-black shadow-2xl overflow-hidden ring-1 ring-white/10",
      innerFrameClass: "w-full h-full pt-6",
    }
  }[device];

  return (
    <div className={`flex flex-col bg-[#0b0c10] text-zinc-100 ${isModal ? "h-full" : "rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl my-8"}`}>
      
      {/* 1. Real Browser Window Header */}
      <div className="bg-[#16181f] border-b border-zinc-800/80 pt-2 px-3 select-none shrink-0">
        
        {/* Top Browser Bar */}
        <div className="flex items-center justify-between gap-2 pb-1.5">
          
          {/* Browser Window Control Dots */}
          <div className="flex items-center gap-1.5 mr-2 shrink-0">
            <span className="h-3 w-3 rounded-full bg-rose-500/90 shadow-sm cursor-pointer hover:opacity-80" onClick={onClose} />
            <span className="h-3 w-3 rounded-full bg-amber-500/90 shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90 shadow-sm" />
          </div>

          {/* Dedicated Active Tab Only */}
          <div className="flex items-center gap-1 flex-1">
            <div className="flex items-center gap-2 rounded-t-lg bg-[#1f222e] text-white px-3.5 py-1.5 text-xs font-semibold border-t border-x border-zinc-700/80 shadow-sm max-w-[280px] truncate">
              <span className={`h-2 w-2 rounded-full shrink-0 ${activeSlug === "ccidcop" ? "bg-[#ff6a00] animate-pulse" : "bg-emerald-400"}`} />
              <span className="truncate">{activeSlug === "ccidcop" ? "ccidcop.in — Live Portfolio" : `${activeTemplate.title} — Portfolio`}</span>
            </div>
          </div>

          {/* Close Modal Trigger if open in modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white shrink-0 ml-2 cursor-pointer"
              title="Close Browser View"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Browser URL Navigation & Device Switcher Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-2 border-t border-zinc-800/60">
          
          {/* Back, Forward, Reload Controls */}
          <div className="flex items-center gap-1 text-zinc-400">
            <button className="rounded p-1 hover:bg-zinc-800 hover:text-white cursor-pointer" title="Back">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="rounded p-1 hover:bg-zinc-800 hover:text-white cursor-pointer" title="Forward">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => {
                setRefreshKey(k => k + 1);
                setIframeLoading(true);
              }}
              className="rounded p-1 hover:bg-zinc-800 hover:text-white ml-1 cursor-pointer"
              title="Reload live preview"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Omnibox / URL Bar showing Real Live Domain */}
          <div className="flex-1 max-w-xl mx-auto flex items-center justify-between rounded-lg border border-zinc-700/70 bg-[#0d0e12] px-3 py-1.5 text-xs font-mono text-zinc-300 shadow-inner">
            <div className="flex items-center gap-2 truncate">
              <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span className="text-white font-semibold truncate">
                {targetLiveUrl}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button
                onClick={handleCopyUrl}
                className="rounded p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                title="Copy URL"
              >
                {copiedUrl ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              </button>
              <a
                href={targetLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded p-1 text-zinc-400 hover:text-[#ff6a00] hover:bg-zinc-800 cursor-pointer"
                title="Open live site in new tab"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Responsive Device Switchers (Desktop, Tablet, Phone) */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setDevice("desktop")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-semibold transition-all cursor-pointer ${
                device === "desktop"
                  ? "bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Desktop View (1280px)"
            >
              <Monitor className="h-3.5 w-3.5 text-sky-400" />
              <span className="hidden sm:inline">Desktop</span>
            </button>

            <button
              onClick={() => setDevice("tablet")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-semibold transition-all cursor-pointer ${
                device === "tablet"
                  ? "bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Tablet</span>
            </button>

            <button
              onClick={() => setDevice("mobile")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-semibold transition-all cursor-pointer ${
                device === "mobile"
                  ? "bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Mobile Phone View (390px)"
            >
              <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Phone</span>
            </button>

            {/* Viewport dimension badge */}
            <span className="ml-1 font-mono text-[10px] text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded hidden md:inline">
              {deviceSpecs.dimension}
            </span>
          </div>

        </div>
      </div>

      {/* 2. Responsive Canvas Viewport with Live Embedded Site */}
      <div className="flex-1 overflow-auto bg-[#08080a] p-4 sm:p-6 flex items-center justify-center">
        
        {/* Device Frame Chassis */}
        <div 
          className={`relative transition-all duration-300 flex flex-col bg-black ${deviceSpecs.containerClass}`}
        >
          {/* Phone Dynamic Island / Notch if Mobile */}
          {device === "mobile" && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-black z-30 flex items-center justify-center gap-1.5 border border-zinc-800 pointer-events-none">
              <span className="h-2 w-2 rounded-full bg-zinc-900 border border-zinc-800" />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
            </div>
          )}

          {/* Live Loading Overlay */}
          {iframeLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#09090c]/90 text-zinc-400 gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-[#ff6a00]" />
              <span className="text-xs font-mono">Connecting to {activeSlug === "ccidcop" ? "ccidcop.in" : activeTemplate.title}...</span>
            </div>
          )}

          {/* The REAL LIVE EMBEDDED WEBSITE IFRAME */}
          <div className={`relative ${deviceSpecs.innerFrameClass}`}>
            <iframe
              key={`${activeSlug}-${refreshKey}`}
              src={proxyEmbedUrl}
              title={`Live Preview of ${activeTemplate.title}`}
              onLoad={() => setIframeLoading(false)}
              className="h-full w-full border-0 bg-black"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-modals allow-downloads"
            />
          </div>

          {/* Bottom Mobile Home Bar Indicator if Mobile */}
          {device === "mobile" && (
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-zinc-600/60 z-30 pointer-events-none" />
          )}

        </div>

      </div>

      {/* 3. Bottom Action Bar */}
      <div className="bg-[#14151b] border-t border-zinc-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Live embedded:</span>
          <strong className="text-white uppercase font-bold">{activeTemplate.title}</strong>
          <span className="rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold">
            ● Live Connected
          </span>
          <span className="rounded bg-orange-500/10 text-[#ff6a00] border border-orange-500/20 px-2 py-0.5 text-[10px] font-bold font-mono">
            {formatPrice(activeTemplate.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDevice(d => d === "desktop" ? "tablet" : d === "tablet" ? "mobile" : "desktop")}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-zinc-200 hover:bg-zinc-700 font-medium cursor-pointer"
          >
            Switch View ({device})
          </button>

          {onSelectForPurchase && (
            <button
              onClick={() => onSelectForPurchase(activeTemplate)}
              className="rounded-lg bg-[#ff6a00] px-4 py-1.5 font-bold text-white shadow-md hover:bg-[#ff7a1a] transition-all cursor-pointer"
            >
              Get Template — {formatPrice(activeTemplate.price)}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
