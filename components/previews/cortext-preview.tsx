"use client";

import React, { useState } from "react";
import { Cpu, Activity, Zap, Layers, Binary } from "lucide-react";

export function CortextPreview() {
  const [activeModel, setActiveModel] = useState<"70B" | "8B" | "MoE">("70B");

  const specs = {
    "70B": { tokens: "142 t/s", vram: "14.2 GB", latency: "11.2ms" },
    "8B": { tokens: "420 t/s", vram: "4.8 GB", latency: "4.1ms" },
    "MoE": { tokens: "290 t/s", vram: "8.6 GB", latency: "7.8ms" }
  };

  return (
    <div className="relative h-full w-full bg-[#070a12] text-zinc-100 p-3 sm:p-4 select-none overflow-hidden flex flex-col justify-between text-left font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[9px]">
        <div className="flex items-center gap-1.5 font-bold tracking-tight text-white font-mono">
          <Binary className="h-3.5 w-3.5 text-cyan-400" />
          <span>CORTEXT LABS</span>
        </div>
        
        {/* Model Switcher */}
        <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded border border-white/10 text-[8px] font-mono">
          {(["70B", "8B", "MoE"] as const).map(m => (
            <button
              key={m}
              onClick={() => setActiveModel(m)}
              className={`px-1.5 py-0.2 rounded transition-colors ${
                activeModel === m ? "bg-cyan-500 text-black font-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Main Neural Research View */}
      <div className="my-1.5 flex-1 flex flex-col justify-between">
        <div>
          <span className="font-mono text-[8px] text-cyan-400 uppercase tracking-widest">
            Systems &amp; Architecture Research
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
            Latent Space Compression in Multimodal Transformer Ensembles
          </h4>
        </div>

        {/* Live Metrics Readout */}
        <div className="grid grid-cols-3 gap-1.5 my-1 font-mono">
          <div className="rounded border border-cyan-500/20 bg-cyan-950/20 p-1.5 text-center">
            <span className="block text-[7px] text-zinc-400">INFERENCE</span>
            <span className="text-[10px] font-bold text-cyan-400">{specs[activeModel].tokens}</span>
          </div>
          <div className="rounded border border-purple-500/20 bg-purple-950/20 p-1.5 text-center">
            <span className="block text-[7px] text-zinc-400">VRAM FOOTPRINT</span>
            <span className="text-[10px] font-bold text-purple-400">{specs[activeModel].vram}</span>
          </div>
          <div className="rounded border border-emerald-500/20 bg-emerald-950/20 p-1.5 text-center">
            <span className="block text-[7px] text-zinc-400">LATENCY (P99)</span>
            <span className="text-[10px] font-bold text-emerald-400">{specs[activeModel].latency}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/10 pt-1.5 text-[8px] text-zinc-400 font-mono">
        <span className="text-zinc-500">NeurIPS 2025 Spotlight Template</span>
        <span className="text-cyan-400">arXiv:2504.08912 ↗</span>
      </div>
    </div>
  );
}
