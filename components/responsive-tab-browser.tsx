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
  Maximize2,
  X,
  Globe,
  Terminal,
  Code2,
  Cpu,
  Layers,
  ArrowUpRight,
  Shield,
  FileText,
  Fingerprint,
  Star,
  Users,
  Box,
  Binary
} from "lucide-react";
import { TEMPLATES_DATA, TemplateItem } from "@/lib/templates-data";

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
  const [activeSlug, setActiveSlug] = useState<string>(initialSlug);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [ccidcopTab, setCcidcopTab] = useState<"work" | "stack" | "blog" | "terminal">("work");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "CCIDCOP Systems v2.6.4 [Connected]",
    "Type 'help' or click a command: [status] [projects] [skills] [whoami]"
  ]);

  const activeTemplate = TEMPLATES_DATA.find(t => t.slug === activeSlug) || TEMPLATES_DATA[0];

  const handleCopyUrl = () => {
    const url = activeSlug === "ccidcop" ? "https://ccidcop.in" : `https://${activeSlug}.cvverse.dev`;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleTerminalCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response = "";
    if (cleanCmd === "help") {
      response = "Available commands: status, projects, skills, whoami, clear";
    } else if (cleanCmd === "status") {
      response = "[✓] Core: Online | Memory: 18MB | Threat Intel: Synced (0 CVEs)";
    } else if (cleanCmd === "projects") {
      response = "• RECO LABS (2026) • RECO BLOG • RECON-X (2025) • ADI AI • FACE MASH • BE REAL";
    } else if (cleanCmd === "skills") {
      response = "Languages: TS, Rust, Python, Bash | Frontend: Next.js 14, Tailwind | Backend: Supabase";
    } else if (cleanCmd === "whoami") {
      response = "Aditya Raj (@rawenergon) — Developer & Security Tools Engineer (ccidcop.in)";
    } else if (cleanCmd === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else {
      response = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }
    setTerminalLogs(prev => [...prev, `> ${cmd}`, response]);
    setTerminalInput("");
  };

  // Device dimension mappings
  const deviceSpecs = {
    desktop: {
      label: "Desktop View",
      dimension: "1280 × 820",
      containerClass: "w-full max-w-[1280px] h-[780px] rounded-xl border border-zinc-700/80 shadow-2xl",
      innerFrameClass: "w-full h-full",
    },
    tablet: {
      label: "Tablet (iPad Pro)",
      dimension: "768 × 1024",
      containerClass: "w-[768px] max-w-full h-[780px] rounded-2xl border-[6px] border-zinc-800 shadow-2xl",
      innerFrameClass: "w-full h-full",
    },
    mobile: {
      label: "Phone (iPhone 15 Pro)",
      dimension: "390 × 844",
      containerClass: "w-[390px] max-w-full h-[780px] rounded-[44px] border-[10px] border-zinc-850 bg-black shadow-2xl overflow-hidden ring-1 ring-white/10",
      innerFrameClass: "w-full h-full pt-6",
    }
  }[device];

  return (
    <div className={`flex flex-col bg-[#0b0c10] text-zinc-100 ${isModal ? "h-full" : "rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl my-8"}`}>
      
      {/* 1. Real Browser Window Header with Tabs */}
      <div className="bg-[#16181f] border-b border-zinc-800/80 pt-2 px-3 select-none">
        
        {/* Top Tab Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1.5">
          
          {/* Browser Window Control Dots */}
          <div className="flex items-center gap-1.5 mr-2 shrink-0">
            <span className="h-3 w-3 rounded-full bg-rose-500/90 shadow-sm cursor-pointer hover:opacity-80" onClick={onClose} />
            <span className="h-3 w-3 rounded-full bg-amber-500/90 shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90 shadow-sm" />
          </div>

          {/* Browser Tabs Row */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1">
            {TEMPLATES_DATA.map((t) => {
              const isActive = t.slug === activeSlug;
              return (
                <button
                  key={t.slug}
                  onClick={() => setActiveSlug(t.slug)}
                  className={`group relative flex items-center gap-2 rounded-t-lg px-3 py-1.5 text-xs font-medium transition-all max-w-[170px] truncate ${
                    isActive
                      ? "bg-[#1f222e] text-white shadow-sm border-t border-x border-zinc-700/80 font-semibold"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${t.slug === "ccidcop" ? "bg-[#ff6a00]" : "bg-emerald-400"}`} />
                  <span className="truncate">{t.slug === "ccidcop" ? "ccidcop.in" : t.title}</span>
                  {isActive && (
                    <span className="text-[10px] font-mono text-zinc-400 ml-1">×</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Close Modal Trigger if open in modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white shrink-0 ml-2"
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
            <button className="rounded p-1 hover:bg-zinc-800 hover:text-white" title="Back">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="rounded p-1 hover:bg-zinc-800 hover:text-white" title="Forward">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setRefreshKey(k => k + 1)}
              className="rounded p-1 hover:bg-zinc-800 hover:text-white ml-1"
              title="Reload page"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Omnibox / URL Bar */}
          <div className="flex-1 max-w-xl mx-auto flex items-center justify-between rounded-lg border border-zinc-700/70 bg-[#0d0e12] px-3 py-1.5 text-xs font-mono text-zinc-300 shadow-inner">
            <div className="flex items-center gap-2 truncate">
              <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span className="text-zinc-500">https://</span>
              <span className="text-white font-semibold">
                {activeSlug === "ccidcop" ? "ccidcop.in" : `${activeSlug}.cvverse.dev`}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button
                onClick={handleCopyUrl}
                className="rounded p-1 text-zinc-400 hover:text-white hover:bg-zinc-800"
                title="Copy URL"
              >
                {copiedUrl ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              </button>
              <a
                href={activeTemplate.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded p-1 text-zinc-400 hover:text-[#ff6a00] hover:bg-zinc-800"
                title="Open in new window"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Responsive Device Switchers (Desktop, Tablet, Phone) */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setDevice("desktop")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-semibold transition-all ${
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
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-semibold transition-all ${
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
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-semibold transition-all ${
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

      {/* 2. Responsive Canvas Viewport */}
      <div className="flex-1 overflow-auto bg-[#08080a] p-4 sm:p-6 flex items-center justify-center">
        
        {/* Device Frame Chassis */}
        <div 
          key={`${activeSlug}-${device}-${refreshKey}`}
          className={`relative transition-all duration-300 flex flex-col bg-[#0d0e12] ${deviceSpecs.containerClass}`}
        >
          {/* Phone Dynamic Island / Notch if Mobile */}
          {device === "mobile" && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-black z-30 flex items-center justify-center gap-1.5 border border-zinc-800">
              <span className="h-2 w-2 rounded-full bg-zinc-900 border border-zinc-800" />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
            </div>
          )}

          {/* Scrollable Responsive Viewport Content */}
          <div className={`overflow-y-auto ${deviceSpecs.innerFrameClass}`}>
            
            {activeSlug === "ccidcop" ? (
              /* ========================================================= */
              /* OFFICIAL CCIDCOP.IN HIGH-FIDELITY RESPONSIVE PORTFOLIO   */
              /* ========================================================= */
              <div className="min-h-full bg-[#0a0a0d] text-zinc-100 p-5 sm:p-8 space-y-8 font-sans selection:bg-[#ff6a00] selection:text-black">
                
                {/* ccidcop Header */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#ff6a00] to-orange-400 font-black text-sm text-black shadow-md shadow-orange-500/20">
                      AR
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-base font-bold text-white leading-tight">Aditya Raj</h1>
                        <span className="font-mono text-xs text-[#ff6a00]">@rawenergon</span>
                      </div>
                      <p className="text-xs text-zinc-400">Developer &amp; Security Tools Engineer &bull; India</p>
                    </div>
                  </div>

                  {/* ccidcop Navigation links */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                    <button 
                      onClick={() => setCcidcopTab("work")}
                      className={`px-2.5 py-1 rounded transition-colors ${ccidcopTab === "work" ? "bg-white/10 text-white font-bold" : "hover:text-white"}`}
                    >
                      Work
                    </button>
                    <button 
                      onClick={() => setCcidcopTab("stack")}
                      className={`px-2.5 py-1 rounded transition-colors ${ccidcopTab === "stack" ? "bg-white/10 text-white font-bold" : "hover:text-white"}`}
                    >
                      Stack
                    </button>
                    <button 
                      onClick={() => setCcidcopTab("blog")}
                      className={`px-2.5 py-1 rounded transition-colors ${ccidcopTab === "blog" ? "bg-white/10 text-white font-bold" : "hover:text-white"}`}
                    >
                      Blog
                    </button>
                    <button 
                      onClick={() => setCcidcopTab("terminal")}
                      className={`px-2.5 py-1 rounded transition-colors ${ccidcopTab === "terminal" ? "bg-[#ff6a00] text-black font-bold" : "hover:text-white"}`}
                    >
                      Terminal
                    </button>
                  </div>
                </header>

                {/* ccidcop Hero */}
                <section className="space-y-3">
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    I build <span className="text-[#ff6a00]">security tools</span> in public.
                  </h2>
                  <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
                    Developer and security tools engineer building <strong className="text-white">vaulted</strong> and <strong className="text-white">netwatch</strong>. Focusing on engineering low-level systems, cryptographic suites, and minimal software that runs fast.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-zinc-400">
                    <a href="https://github.com/rawenergon" target="_blank" rel="noopener noreferrer" className="hover:text-white border border-zinc-800 rounded px-2 py-0.5 bg-zinc-900/50">
                      GitHub: @rawenergon ↗
                    </a>
                    <a href="https://x.com/adibxr" target="_blank" rel="noopener noreferrer" className="hover:text-white border border-zinc-800 rounded px-2 py-0.5 bg-zinc-900/50">
                      X: @adibxr ↗
                    </a>
                    <a href="mailto:devadibxr@gmail.com" className="hover:text-white border border-zinc-800 rounded px-2 py-0.5 bg-zinc-900/50">
                      devadibxr@gmail.com
                    </a>
                  </div>
                </section>

                {/* Tab: Work Section */}
                {ccidcopTab === "work" && (
                  <section className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold">
                        Work &bull; Projects (2024 &ndash; 2026)
                      </h3>
                      <span className="font-mono text-[10px] text-emerald-400">● 6 Deployed</span>
                    </div>

                    <div className={`grid gap-3 ${device === "mobile" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                      {[
                        { title: "RECO LABS", year: "2026", desc: "A Community for Builders", tag: "Security Lab", url: "https://ccidcop.in" },
                        { title: "RECO BLOG", year: "2026", desc: "Markdown Blog Writing Engine with Syntax Parser", tag: "Content Platform", url: "https://ccidcop.in" },
                        { title: "RECON-X", year: "2025", desc: "Automated Passive DNS & Attack Surface Recon Pipeline", tag: "OSINT Engine", url: "https://ccidcop.in" },
                        { title: "ADI AI", year: "2025", desc: "Automated Social Media & Intelligent Agent Bot", tag: "Agentic AI", url: "https://ccidcop.in" },
                        { title: "FACE MASH", year: "2024", desc: "Real-Time Ranking & Computer Vision Comparison App", tag: "Vision App", url: "https://ccidcop.in" },
                        { title: "BE REAL", year: "2024", desc: "Privacy-Centric Anonymous Interaction Platform", tag: "Zero-Knowledge", url: "https://ccidcop.in" }
                      ].map((item) => (
                        <div 
                          key={item.title} 
                          className="group rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-all hover:border-[#ff6a00]/50 hover:bg-zinc-900/70"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-white group-hover:text-[#ff6a00] transition-colors">
                              {item.title}
                            </h4>
                            <span className="font-mono text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                              {item.year}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-zinc-400 leading-snug">
                            {item.desc}
                          </p>
                          <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-800/40 text-[10px] font-mono">
                            <span className="text-[#ff6a00]">{item.tag}</span>
                            <span className="text-zinc-500 group-hover:text-white transition-colors">View Project ↗</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Tab: Stack Matrix Section */}
                {ccidcopTab === "stack" && (
                  <section className="space-y-4">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold border-b border-zinc-800 pb-2">
                      Technical Stack Matrix
                    </h3>
                    <div className={`grid gap-3 ${device === "mobile" ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-4"}`}>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3.5">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase">Languages</span>
                        <div className="mt-2 space-y-1 text-xs font-semibold text-zinc-200">
                          <div>TypeScript</div>
                          <div>JavaScript (ESNext)</div>
                          <div>Python</div>
                          <div>Bash / Shell</div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3.5">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase">Frontend</span>
                        <div className="mt-2 space-y-1 text-xs font-semibold text-zinc-200">
                          <div>Next.js 14 (App Router)</div>
                          <div>React 18 / 19</div>
                          <div>Tailwind CSS</div>
                          <div>shadcn/ui</div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3.5">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase">Backend &amp; DB</span>
                        <div className="mt-2 space-y-1 text-xs font-semibold text-zinc-200">
                          <div>Supabase</div>
                          <div>Firebase</div>
                          <div>PostgreSQL</div>
                          <div>Node.js APIs</div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3.5">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase">Security &amp; Ops</span>
                        <div className="mt-2 space-y-1 text-xs font-semibold text-zinc-200">
                          <div>Cryptography</div>
                          <div>Docker Containers</div>
                          <div>Linux Kernel Internals</div>
                          <div>Wireshark Recon</div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Tab: Blog Section */}
                {ccidcopTab === "blog" && (
                  <section className="space-y-4">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold border-b border-zinc-800 pb-2">
                      Technical Blog &bull; Writing
                    </h3>
                    <div className="space-y-2.5">
                      {[
                        { title: "HOW COMPUTERS KNOW", date: "April 2026", time: "6 min read", desc: "Understanding memory addressing, bus architecture, and CPU cache hierarchy from first principles." },
                        { title: "HOW I HACK THEM", date: "March 2026", time: "8 min read", desc: "Reconnaissance pipelines, port enumeration evasion, and passive threat modeling." },
                        { title: "WHY I'M REPLACING MY SELF", date: "February 2026", time: "5 min read", desc: "Building local agent swarms to automate repetitive security triage and tooling." },
                        { title: "LIST OF EXAMS AFTER 12", date: "January 2026", time: "4 min read", desc: "Curated guide for software engineers and cybersecurity specialists entering higher education." }
                      ].map(post => (
                        <div key={post.title} className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 hover:border-zinc-700 transition-all cursor-pointer">
                          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
                            <span>{post.date}</span>
                            <span>{post.time}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white hover:text-[#ff6a00] transition-colors">{post.title}</h4>
                          <p className="mt-1 text-xs text-zinc-400">{post.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Tab: Interactive Terminal Section */}
                {ccidcopTab === "terminal" && (
                  <section className="space-y-3">
                    <div className="rounded-xl border border-zinc-800 bg-black/90 p-4 font-mono text-xs space-y-2">
                      <div className="text-zinc-500 pb-2 border-b border-zinc-800/80 flex items-center justify-between">
                        <span>Terminal Emulator &bull; root@ccidcop.in</span>
                        <span className="text-emerald-400">● Live Sandbox</span>
                      </div>
                      <div className="space-y-1 text-zinc-300 min-h-[160px] overflow-y-auto">
                        {terminalLogs.map((log, i) => (
                          <div key={i} className={log.startsWith(">") ? "text-amber-400 font-bold" : "text-zinc-300"}>
                            {log}
                          </div>
                        ))}
                      </div>
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (terminalInput) handleTerminalCommand(terminalInput);
                        }}
                        className="flex items-center gap-2 pt-2 border-t border-zinc-800"
                      >
                        <span className="text-emerald-400 font-bold">$</span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          placeholder="Type 'help' or 'status'..."
                          className="flex-1 bg-transparent text-white focus:outline-none text-xs font-mono"
                        />
                      </form>
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-400">
                      <span className="text-zinc-500">Quick run:</span>
                      {["status", "projects", "skills", "whoami", "clear"].map(cmd => (
                        <button
                          key={cmd}
                          onClick={() => handleTerminalCommand(cmd)}
                          className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 hover:text-[#ff6a00] hover:border-[#ff6a00]/50"
                        >
                          {cmd}
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* ccidcop Experience & Footer */}
                <footer className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
                  <span>Aditya Raj &bull; Independent Developer</span>
                  <a href="https://ccidcop.in/" target="_blank" rel="noopener noreferrer" className="text-[#ff6a00] font-semibold hover:underline">
                    ccidcop.in Official Site ↗
                  </a>
                </footer>

              </div>
            ) : (
              /* ========================================================= */
              /* STANDARD TEMPLATES RESPONSIVE RICH DEMO                   */
              /* ========================================================= */
              <div className="min-h-full bg-[#0a0a0d] text-zinc-100 p-5 sm:p-8 space-y-8 font-sans">
                
                {/* Simulated Header */}
                <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[#ff6a00] font-black text-xs">
                      {activeTemplate.title[0]}
                    </div>
                    <span className="font-extrabold uppercase text-sm tracking-tight text-white">
                      {activeTemplate.title}
                    </span>
                  </div>

                  <nav className="hidden sm:flex items-center gap-4 text-xs font-medium text-zinc-400">
                    <span className="text-white">Home</span>
                    <span className="hover:text-white cursor-pointer">Projects</span>
                    <span className="hover:text-white cursor-pointer">About</span>
                    <span className="hover:text-white cursor-pointer">Contact</span>
                  </nav>

                  <button className="rounded-lg bg-[#ff6a00] px-3 py-1 text-xs font-bold text-white hover:bg-[#ff7a1a]">
                    Get in Touch
                  </button>
                </header>

                {/* Simulated Hero */}
                <section className="text-center py-6 space-y-3 max-w-xl mx-auto">
                  <span className="inline-block rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-0.5 text-xs font-bold text-[#ff6a00]">
                    {activeTemplate.subCategory}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {activeTemplate.title} Portfolio
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {activeTemplate.longDescription}
                  </p>
                </section>

                {/* Simulated Features Grid */}
                <section className={`grid gap-3 ${device === "mobile" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                  {activeTemplate.features.map((feat, idx) => (
                    <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#ff6a00]">
                        <span>0{idx + 1}.</span>
                        <span>Feature Highlight</span>
                      </div>
                      <p className="text-sm font-semibold text-zinc-200">{feat}</p>
                      <p className="text-xs text-zinc-500">Fully responsive across Mobile, Tablet, and Desktop.</p>
                    </div>
                  ))}
                </section>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-zinc-800">
                  {activeTemplate.techStack.map(tech => (
                    <span key={tech.name} className="font-mono text-xs bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-zinc-300">
                      {tech.name}
                    </span>
                  ))}
                </div>

              </div>
            )}

          </div>

          {/* Bottom Mobile Home Bar Indicator if Mobile */}
          {device === "mobile" && (
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-zinc-600/60 z-30 pointer-events-none" />
          )}

        </div>

      </div>

      {/* 3. Bottom Action Bar */}
      <div className="bg-[#14151b] border-t border-zinc-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Currently viewing:</span>
          <strong className="text-white uppercase font-bold">{activeTemplate.title}</strong>
          <span className="rounded bg-orange-500/10 text-[#ff6a00] border border-orange-500/20 px-2 py-0.5 text-[10px] font-bold">
            ${activeTemplate.price} USD
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDevice(d => d === "desktop" ? "tablet" : d === "tablet" ? "mobile" : "desktop")}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-zinc-200 hover:bg-zinc-700 font-medium"
          >
            Toggle Device ({device})
          </button>

          {onSelectForPurchase && (
            <button
              onClick={() => onSelectForPurchase(activeTemplate)}
              className="rounded-lg bg-[#ff6a00] px-4 py-1.5 font-bold text-white shadow-md hover:bg-[#ff7a1a]"
            >
              Buy Template &bull; ${activeTemplate.price}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
