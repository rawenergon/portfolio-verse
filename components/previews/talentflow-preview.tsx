"use client";

import React, { useState } from "react";
import { Users, Briefcase, Award, TrendingUp, CheckCircle } from "lucide-react";

export function TalentflowPreview() {
  const [activePipeline, setActivePipeline] = useState<"executive" | "engineering">("engineering");

  const metrics = [
    { label: "Talent Placed", val: "148+" },
    { label: "Avg Offer Time", val: "16 Days" },
    { label: "Retention Rate", val: "99.1%" }
  ];

  return (
    <div className="relative h-full w-full bg-[#0b0f19] text-zinc-100 p-3 sm:p-4 select-none overflow-hidden flex flex-col justify-between text-left font-sans">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[9px]">
        <div className="flex items-center gap-1.5 font-bold tracking-tight text-white">
          <Users className="h-3.5 w-3.5 text-blue-400" />
          <span>TALENTFLOW</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[8px] bg-white/5 border border-white/10 rounded px-1.5 py-0.5">
          <span className="text-emerald-400 font-bold">$12.4M</span>
          <span className="text-zinc-400">Total Compensation Negotiated</span>
        </div>
      </div>

      {/* Main Kanban / Pipeline Preview */}
      <div className="my-1.5 grid grid-cols-3 gap-1.5 flex-1 items-stretch">
        
        {/* Sourced */}
        <div className="rounded border border-white/10 bg-white/[0.03] p-1.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[8px] font-semibold text-zinc-400">
            <span>SOURCED</span>
            <span className="font-mono text-[8px] bg-white/10 px-1 rounded">28</span>
          </div>
          <div className="space-y-1 mt-1">
            <div className="rounded bg-black/40 border border-white/5 p-1">
              <p className="text-[8px] font-bold text-white truncate">Staff ML Eng</p>
              <p className="text-[7px] text-zinc-400">Anthropic Ex-Team</p>
            </div>
            <div className="rounded bg-black/40 border border-white/5 p-1">
              <p className="text-[8px] font-bold text-white truncate">Lead Designer</p>
              <p className="text-[7px] text-zinc-400">Figma Alumni</p>
            </div>
          </div>
        </div>

        {/* Interview */}
        <div className="rounded border border-blue-500/30 bg-blue-500/5 p-1.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[8px] font-semibold text-blue-400">
            <span>INTERVIEW</span>
            <span className="font-mono text-[8px] bg-blue-500/20 px-1 rounded">8</span>
          </div>
          <div className="space-y-1 mt-1">
            <div className="rounded bg-black/40 border border-blue-500/20 p-1">
              <p className="text-[8px] font-bold text-white truncate">VP of Eng</p>
              <p className="text-[7px] text-blue-300">Final Round Passed</p>
            </div>
            <div className="rounded bg-black/40 border border-blue-500/20 p-1">
              <p className="text-[8px] font-bold text-white truncate">Principal Rust</p>
              <p className="text-[7px] text-blue-300">Technical Deep Dive</p>
            </div>
          </div>
        </div>

        {/* Placed */}
        <div className="rounded border border-emerald-500/30 bg-emerald-500/5 p-1.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[8px] font-semibold text-emerald-400">
            <span>PLACED</span>
            <span className="font-mono text-[8px] bg-emerald-500/20 px-1 rounded">14</span>
          </div>
          <div className="space-y-1 mt-1">
            <div className="rounded bg-black/40 border border-emerald-500/20 p-1">
              <p className="text-[8px] font-bold text-white truncate">Head of Product</p>
              <p className="text-[7px] text-emerald-300">Signed $280k + Equity</p>
            </div>
            <div className="rounded bg-black/40 border border-emerald-500/20 p-1">
              <p className="text-[8px] font-bold text-white truncate">Founding Eng</p>
              <p className="text-[7px] text-emerald-300">Accepted Series A</p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/10 pt-1.5 text-[8px] text-zinc-400 font-mono">
        <span>Executive Talent Search Template</span>
        <span className="text-emerald-400">● 100% Client Satisfaction</span>
      </div>
    </div>
  );
}
