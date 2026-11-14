"use client";

import React, { useState } from "react";
import { 
  Video, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Calendar, 
  Star 
} from "lucide-react";

export function MvpStudioPreview() {
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <div className="relative h-full w-full bg-[#f8fafc] text-zinc-900 p-3 sm:p-4 select-none overflow-hidden flex flex-col justify-between text-left font-sans">
      
      {/* Subtle Grid Accent */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* Mini Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-zinc-200 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-zinc-900 text-white font-black text-[9px]">
            M
          </div>
          <span className="font-extrabold tracking-tight text-xs uppercase text-zinc-900">
            MVP STUDIO
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            ● 2 Slots Open for Sprint
          </span>
          <button className="rounded-md bg-zinc-900 px-2.5 py-0.5 text-[9px] font-semibold text-white hover:bg-zinc-800 transition-colors">
            Book Call
          </button>
        </div>
      </header>

      {/* Main Agency Hero Headline */}
      <section className="relative z-10 text-center py-2 space-y-1">
        <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-900 max-w-sm mx-auto leading-snug">
          Expert guidance from strategy to launch consultation
        </h3>
        <p className="text-[10px] text-zinc-500 max-w-xs mx-auto line-clamp-1">
          Turn your complex product idea into a working MVP in 14 days.
        </p>
      </section>

      {/* Interactive Step Cards */}
      <div className="relative z-10 grid grid-cols-2 gap-2">
        {/* Step 1 */}
        <div 
          onClick={() => setSelectedStep(1)}
          className={`cursor-pointer rounded-lg border p-2.5 transition-all text-left ${
            selectedStep === 1
              ? "border-blue-500 bg-white shadow-sm ring-1 ring-blue-500/20"
              : "border-zinc-200 bg-white/70 hover:bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded">
              01
            </span>
            <Video className="h-3 w-3 text-blue-600" />
          </div>
          <h4 className="text-[11px] font-bold text-zinc-900 flex items-center gap-1">
            Free Discovery Call
          </h4>
          <p className="mt-1 text-[8px] sm:text-[9px] text-zinc-500 leading-snug line-clamp-2">
            Share your vision, get expert insights, and let&apos;s see if we&apos;re the right match. Zero commitment.
          </p>
        </div>

        {/* Step 2 */}
        <div 
          onClick={() => setSelectedStep(2)}
          className={`cursor-pointer rounded-lg border p-2.5 transition-all text-left ${
            selectedStep === 2
              ? "border-blue-500 bg-white shadow-sm ring-1 ring-blue-500/20"
              : "border-zinc-200 bg-white/70 hover:bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.2 rounded">
              02
            </span>
            <Sparkles className="h-3 w-3 text-indigo-600" />
          </div>
          <h4 className="text-[11px] font-bold text-zinc-900">
            Sprint Execution
          </h4>
          <p className="mt-1 text-[8px] sm:text-[9px] text-zinc-500 leading-snug line-clamp-2">
            Full-stack Next.js 14, Tailwind, authentication, and payment integrations delivered in record time.
          </p>
        </div>
      </div>

      {/* Bottom Proof Bar */}
      <footer className="relative z-10 flex items-center justify-between pt-2 border-t border-zinc-200 text-[9px] text-zinc-500">
        <div className="flex items-center gap-1">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-2.5 w-2.5 fill-current" />
            ))}
          </div>
          <span className="font-semibold text-zinc-700">5.0 (80+ Reviews)</span>
        </div>
        <span className="font-mono font-medium text-zinc-600">
          Cal.com Sync Enabled ↗
        </span>
      </footer>
    </div>
  );
}
