"use client";

import React, { useState } from "react";
import { Sparkles, ArrowUpRight, Eye } from "lucide-react";

export function LaynitePreview() {
  const [activeProject, setActiveProject] = useState(0);

  const works = [
    { title: "AURA LUXURY", category: "Spatial Identity 2026", year: "2026", color: "#e2e8f0" },
    { title: "SYNAPSE AUDIO", category: "Acoustic System UI", year: "2025", color: "#a855f7" },
    { title: "KINETIC ARCHIVE", category: "WebGL Interactive", year: "2025", color: "#ff6a00" }
  ];

  return (
    <div className="relative h-full w-full bg-[#030304] text-white p-3 sm:p-4 select-none overflow-hidden flex flex-col justify-between text-left font-serif">
      
      {/* Editorial Navigation */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[9px] font-sans">
        <span className="font-mono text-xs tracking-widest uppercase text-white font-bold">
          LAYNITE
        </span>
        <div className="flex items-center gap-3 text-zinc-400">
          <span className="hover:text-white cursor-pointer transition-colors">Archive</span>
          <span className="hover:text-white cursor-pointer transition-colors">Exhibits</span>
          <span className="text-[#ff6a00] font-mono">Available Q2 ↗</span>
        </div>
      </div>

      {/* Hero Headline */}
      <div className="my-auto py-2 text-center space-y-1">
        <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-400">
          Independent Creative Direction
        </span>
        <h3 className="text-sm sm:text-base font-light tracking-widest uppercase text-zinc-100">
          Form &bull; Rhythm &bull; Function
        </h3>
      </div>

      {/* Interactive Selected Work Deck */}
      <div className="relative z-10 grid grid-cols-3 gap-1.5 font-sans">
        {works.map((work, idx) => (
          <div
            key={work.title}
            onClick={() => setActiveProject(idx)}
            className={`cursor-pointer rounded border p-2 transition-all ${
              activeProject === idx
                ? "border-white bg-white/10 shadow-lg"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between text-[8px] text-zinc-400 font-mono">
              <span>0{idx + 1}</span>
              <ArrowUpRight className="h-2.5 w-2.5" />
            </div>
            <h4 className="mt-1 text-[10px] font-bold text-white truncate">
              {work.title}
            </h4>
            <p className="text-[7px] text-zinc-400 truncate mt-0.5">
              {work.category}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/10 pt-1.5 font-sans text-[8px] text-zinc-500">
        <span className="font-mono">Tokyo &bull; Zurich &bull; New York</span>
        <span className="text-zinc-400">Curated Work Showcase</span>
      </div>
    </div>
  );
}
