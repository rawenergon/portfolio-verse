"use client";

import React from "react";
import { Heart } from "lucide-react";

export function TopBanner() {
  const razorpaySponsorUrl = process.env.NEXT_PUBLIC_RAZORPAY_SPONSOR_URL || "https://pages.razorpay.com/cvverse";

  return (
    <div className="relative isolate z-50 flex items-center justify-center overflow-hidden border-b border-zinc-200/80 bg-zinc-50/95 px-3 py-1.5 text-[11px] text-zinc-700 dark:border-zinc-800/80 dark:bg-[#0c0c0e]/95 dark:text-zinc-300">
      <a
        href={razorpaySponsorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md bg-[#ff6a00] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs hover:bg-[#ff7a1a] transition-all cursor-pointer uppercase tracking-tight"
      >
        <Heart className="h-2.5 w-2.5 fill-current" />
        <span>SPONSOR BEFORE TOO LATE at $ 2.99</span>
      </a>
    </div>
  );
}
