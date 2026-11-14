"use client";

import React, { useState } from "react";
import { Sliders, Check, Palette, Layers, Box } from "lucide-react";

export function LayouticPreview() {
  const [toggleOn, setToggleOn] = useState(true);
  const [buttonCount, setButtonCount] = useState(42);
  const [activeColor, setActiveColor] = useState("orange");

  const colors = [
    { id: "orange", hex: "#ff6a00" },
    { id: "indigo", hex: "#6366f1" },
    { id: "emerald", hex: "#10b981" },
    { id: "rose", hex: "#f43f5e" }
  ];

  return (
    <div className="relative h-full w-full bg-[#090d16] text-zinc-100 p-3 sm:p-4 select-none overflow-hidden flex flex-col justify-between text-left font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[9px]">
        <div className="flex items-center gap-1.5 font-bold tracking-tight text-white">
          <Box className="h-3.5 w-3.5 text-[#ff6a00]" />
          <span>LAYOUTIC UI</span>
        </div>
        <span className="font-mono text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-zinc-300">
          Design System v3.2
        </span>
      </div>

      {/* Interactive Component Lab */}
      <div className="my-1.5 grid grid-cols-2 gap-2 flex-1 items-center">
        
        {/* Toggle & Button Box */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-zinc-300 font-medium">Dark Mode Switch</span>
            <button
              onClick={() => setToggleOn(!toggleOn)}
              className={`h-4 w-7 rounded-full p-0.5 transition-colors ${
                toggleOn ? "bg-[#ff6a00]" : "bg-zinc-700"
              }`}
            >
              <div
                className={`h-3 w-3 rounded-full bg-white transition-transform ${
                  toggleOn ? "translate-x-3" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/10">
            <span className="text-[9px] text-zinc-300 font-medium">Interactive Button</span>
            <button
              onClick={() => setButtonCount(c => c + 1)}
              className="rounded bg-white/10 hover:bg-white/20 border border-white/20 px-2 py-0.5 text-[8px] font-bold text-white transition-all active:scale-95"
            >
              Clicks: {buttonCount}
            </button>
          </div>
        </div>

        {/* Color Token Swatches */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[9px] text-zinc-300">
            <span>Primary Token</span>
            <span className="font-mono text-[8px] text-zinc-400">HEX</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            {colors.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveColor(c.id)}
                className={`h-5 w-5 rounded-full border-2 transition-transform ${
                  activeColor === c.id ? "border-white scale-110 shadow-md" : "border-transparent opacity-80"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/10 pt-1.5 text-[8px] text-zinc-400 font-mono">
        <span>Tailwind + Radix Primitives</span>
        <span className="text-emerald-400">● 94 Components Tested</span>
      </div>
    </div>
  );
}
