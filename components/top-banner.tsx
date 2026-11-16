"use client";

import React, { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";

export function TopBanner() {
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
          <span className="text-xs">⚡</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">100% Free &amp; Open Source</span>
          <span className="hidden sm:inline">—</span>
          <span>Inspirational Developer Portfolios with Instant GitHub Access</span>
        </span>
      </div>
    </div>
  );
}
