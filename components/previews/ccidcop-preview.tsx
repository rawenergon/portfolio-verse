"use client";

import React, { useState } from "react";
import { 
  Terminal as TerminalIcon, 
  ShieldAlert, 
  Cpu, 
  Layers, 
  ExternalLink,
  Code2,
  Check,
  ChevronRight
} from "lucide-react";

export function CcidcopPreview() {
  const [activeTab, setActiveTab] = useState<"projects" | "terminal" | "stack">("projects");
  const [selectedProject, setSelectedProject] = useState(0);

  const projects = [
    {
      name: "RECO LABS",
      tag: "Security Suite",
      desc: "Autonomous red-team research and defensive intelligence engine.",
      status: "Production"
    },
    {
      name: "RECON-X",
      tag: "Attack Surface",
      desc: "High-concurrency subdomain mapper and vulnerability scanner.",
      status: "Active"
    },
    {
      name: "ADI AI",
      tag: "Agent System",
      desc: "Local agentic LLM orchestration framework with memory graphs.",
      status: "V2 Live"
    },
    {
      name: "FACE MASH",
      tag: "Computer Vision",
      desc: "Real-time edge facial recognition and identity verification.",
      status: "Verified"
    }
  ];

  return (
    <div className="relative h-full w-full bg-[#0a0a0e] text-zinc-100 p-3 sm:p-4 select-none overflow-hidden flex flex-col justify-between text-left font-sans">
      
      {/* Orange Accent Matrix Background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ff6a00 1px, transparent 0)",
          backgroundSize: "18px 18px"
        }}
      />

      {/* Browser Bar / Window Top */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500/80" />
          <span className="h-2 w-2 rounded-full bg-amber-500/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
          <span className="ml-1.5 font-mono text-[9px] text-zinc-400">
            ccidcop.in
          </span>
        </div>

        {/* Interactive Tabs */}
        <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded border border-white/10 text-[9px]">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeTab === "projects" ? "bg-[#ff6a00] text-white font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeTab === "terminal" ? "bg-[#ff6a00] text-white font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            Terminal
          </button>
          <button
            onClick={() => setActiveTab("stack")}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeTab === "stack" ? "bg-[#ff6a00] text-white font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            Stack
          </button>
        </div>
      </header>

      {/* Identity Hero */}
      <div className="relative z-10 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#ff6a00] to-orange-400 text-[10px] font-black text-black">
            AR
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-white leading-tight">Aditya Raj</h4>
              <span className="font-mono text-[9px] text-[#ff6a00]">@rawenergon</span>
            </div>
            <p className="text-[10px] text-zinc-400">
              I build <span className="text-[#ff6a00] font-semibold">security tools</span> in public.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 font-mono text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          <span>● Systems Active</span>
        </div>
      </div>

      {/* Main Interactive Tab Body */}
      <div className="relative z-10 flex-1 min-h-0 my-1">
        {activeTab === "projects" && (
          <div className="grid grid-cols-2 gap-1.5 h-full">
            {projects.map((proj, idx) => (
              <div
                key={proj.name}
                onClick={() => setSelectedProject(idx)}
                className={`cursor-pointer rounded-md border p-2 transition-all flex flex-col justify-between ${
                  selectedProject === idx
                    ? "border-[#ff6a00] bg-orange-500/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-extrabold text-white">
                    {proj.name}
                  </span>
                  <span className="text-[8px] font-mono text-[#ff6a00] bg-[#ff6a00]/10 px-1 py-0.2 rounded">
                    {proj.status}
                  </span>
                </div>
                <p className="text-[8px] text-zinc-400 line-clamp-1 mt-0.5">
                  {proj.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "terminal" && (
          <div className="h-full rounded-md border border-white/10 bg-black/70 p-2 font-mono text-[9px] text-zinc-300 space-y-1 overflow-hidden">
            <div className="text-emerald-400">root@ccidcop:~# security-scan --all</div>
            <div className="text-zinc-400">[✓] Loading zero-knowledge modules... OK</div>
            <div className="text-zinc-400">[✓] RECO Engine &amp; RECON-X node active</div>
            <div className="text-amber-400">[i] 0 Vulnerabilities Detected • 100% Guard</div>
            <div className="flex items-center gap-1 text-white">
              <span>root@ccidcop:~#</span>
              <span className="h-3 w-1.5 bg-[#ff6a00] animate-pulse"></span>
            </div>
          </div>
        )}

        {activeTab === "stack" && (
          <div className="h-full grid grid-cols-3 gap-1.5 items-center">
            {["TypeScript", "Next.js 14", "Rust Core", "Tailwind", "Docker", "shadcn/ui"].map((tech) => (
              <div key={tech} className="rounded border border-white/10 bg-white/5 p-1.5 text-center">
                <Code2 className="h-3 w-3 mx-auto text-[#ff6a00] mb-0.5" />
                <span className="block font-mono text-[8px] text-zinc-300 truncate">{tech}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Meta Row */}
      <footer className="relative z-10 flex items-center justify-between border-t border-white/10 pt-1.5 font-mono text-[9px] text-zinc-400">
        <span className="text-zinc-500">Aditya Raj Portfolio Template</span>
        <span className="text-[#ff6a00] font-semibold flex items-center gap-0.5">
          ccidcop.in <ExternalLink className="h-2.5 w-2.5" />
        </span>
      </footer>
    </div>
  );
}
