"use client";

import React, { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";

export function TopBanner() {
  const [copied, setCopied] = useState(false);
  const code = "CVVERSE20";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative isolate z-50 flex items-center justify-center overflow-hidden border-b border-zinc-200/80 bg-zinc-50/90 px-3 py-1 text-[11px] text-zinc-600 dark:border-zinc-800/80 dark:bg-[#0c0c0e]/90 dark:text-zinc-300">
      {/* Subtle diagonal background hatch lines */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 0, transparent 8px)"
        }}
      />

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="text-xs">🔥</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Limited-Time</span>
          <span className="hidden sm:inline">—</span>
          <span>Get <span className="font-bold text-[#f95300]">20% OFF</span> all templates</span>
        </span>

        <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>

        <button
          onClick={handleCopy}
          className="group inline-flex items-center gap-1 rounded border border-zinc-300/80 bg-white px-1.5 py-0.2 font-mono text-[10px] font-medium text-zinc-900 shadow-sm transition-all hover:border-[#f95300] hover:text-[#f95300] dark:border-zinc-700/80 dark:bg-zinc-900 dark:text-zinc-200"
          title="Click to copy promo code"
        >
          <span className="font-bold tracking-wider">{code}</span>
          {copied ? (
            <Check className="h-2.5 w-2.5 text-emerald-500 animate-in fade-in" />
          ) : (
            <Copy className="h-2.5 w-2.5 text-zinc-400 group-hover:text-[#f95300]" />
          )}
          {copied && (
            <span className="text-[9px] text-emerald-500 font-sans font-semibold">Copied!</span>
          )}
        </button>
      </div>
    </div>
  );
}
