import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  Terminal, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  Sparkles,
  Check,
  Download
} from "lucide-react";

export const metadata: Metadata = {
  title: "System Spec — Editorial Minimalist Portfolio",
  description:
    "An ultra-minimalist, architectural editorial portfolio system adhering strictly to the 48rem canvas spec.",
};

export default function SystemSpecPage() {
  const curatedItems = [
    {
      num: "Item 01",
      title: "Zero-Knowledge Kernel",
      tag: "Security / Ring-0",
      description:
        "Cryptographic attestation framework & kernel driver verification engine built in C++20 and Rust.",
    },
    {
      num: "Item 02",
      title: "Command Interface (Ctrl+K)",
      tag: "Interaction Protocol",
      description:
        "Ultra-low latency keyboard navigation overlay with fuzzy search, indexed in memory at sub-millisecond speeds.",
    },
    {
      num: "Item 03",
      title: "Dashed Editorial Engine",
      tag: "Design System",
      description:
        "Strict 48rem layout framework pairing DM Sans, serif italic headlines, dashed architectural guides, and reduced-motion fallback.",
    },
    {
      num: "Item 04",
      title: "Distributed Packet Sniffer",
      tag: "Systems Telemetry",
      description:
        "High-throughput network traffic analyzer and live payload stream decoder with WebSocket visualization.",
    },
  ];

  const specs = [
    { label: "Canvas Geometry", val: "max-w-[48rem] (768px)" },
    { label: "Type Pairing", val: "DM Sans + Italic Serif" },
    { label: "Grid Lines", val: "border-dashed border-border/80" },
    { label: "Active Feedback", val: "transform: scale(0.992)" },
    { label: "Motion Mode", val: "prefers-reduced-motion: 0.01ms" },
    { label: "Typography Base", val: "14px Balanced Leading" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#070709] text-zinc-900 dark:text-zinc-100 selection:bg-[#ff6a00] selection:text-white transition-colors">
      
      {/* Top Floating Utility Bar */}
      <nav className="sticky top-0 z-50 border-b border-dashed border-zinc-300/80 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-[#070709]/90 px-4 py-2.5">
        <div className="mx-auto flex max-w-[48rem] items-center justify-between text-xs font-mono">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>CV.VERSE / templates</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>spec v1.0.0</span>
            </span>

            <Link
              href="/templates/system-spec"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#ff6a00] px-3 py-1 font-sans text-xs font-bold text-white shadow-sm hover:bg-[#ea6412] transition-all active:scale-[0.992]"
            >
              <Download className="h-3 w-3" />
              <span>Get Template · ₹100</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Strict 48rem Canvas matching specification */}
      <div className="relative mx-auto w-full max-w-[48rem]">
        <main className="relative flex min-h-dvh flex-col gap-y-6 overflow-x-clip border-x border-dashed border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#090a0d] pt-8 sm:pt-14 pb-20 shadow-xl">
          
          {/* Module Header */}
          <section className="pt-4">
            <div className="flex items-center gap-2 px-6 pb-2 text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-[#ff6a00] animate-pulse" />
              <span>Overview · System Spec</span>
            </div>
            
            <h1 className="section-heading border-t-0 font-serif text-3xl sm:text-4xl font-medium italic text-zinc-900 dark:text-white">
              section.
            </h1>
            
            <p className="px-6 mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-sans">
              A concise description demonstrating the font pairing: DM Sans for comfortable reading,
              paired with structural dashed borders and precise monospace annotations.
            </p>

            {/* Quick Status Bar */}
            <div className="mx-6 mt-5 flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-3 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Check className="h-3.5 w-3.5" /> ONLINE
              </span>
              <span>•</span>
              <span>ENGINE: NEXT.JS 14</span>
              <span>•</span>
              <span>CANVAS: 48REM</span>
              <span>•</span>
              <span>LATENCY: 12MS</span>
            </div>
          </section>

          {/* Curated Items Section */}
          <section className="border-t border-dashed border-zinc-300 dark:border-zinc-800 px-6 py-8 space-y-5">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-2xl font-medium italic text-zinc-900 dark:text-white">
                curated items.
              </h2>
              <span className="font-mono text-xs text-zinc-400">04 works</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {curatedItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="group relative border border-dashed border-zinc-300 dark:border-zinc-800 p-5 rounded-lg bg-zinc-50/60 dark:bg-zinc-900/30 hover:border-[#ff6a00]/60 transition-all active:scale-[0.992] cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                      {item.num}
                    </span>
                    <span className="rounded bg-zinc-200/80 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-zinc-900 dark:text-white group-hover:text-[#ff6a00] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* System Spec Matrix Section */}
          <section className="border-t border-dashed border-zinc-300 dark:border-zinc-800 px-6 py-8 space-y-4">
            <h2 className="font-serif text-2xl font-medium italic text-zinc-900 dark:text-white">
              spec matrix.
            </h2>
            <p className="text-xs font-mono text-zinc-400">
              Architectural tokens engineered for minimalist readability.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {specs.map((s, i) => (
                <div
                  key={i}
                  className="border border-dashed border-zinc-300 dark:border-zinc-800 p-3 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/20"
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    {s.label}
                  </div>
                  <div className="text-xs font-mono font-bold text-zinc-900 dark:text-white mt-1">
                    {s.val}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Code Spec Snippet */}
          <section className="border-t border-dashed border-zinc-300 dark:border-zinc-800 px-6 py-8 space-y-4">
            <h2 className="font-serif text-2xl font-medium italic text-zinc-900 dark:text-white">
              implementation.
            </h2>

            <div className="overflow-hidden rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 bg-[#0d0e12] p-4 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-1.5 text-zinc-500 pb-3 border-b border-zinc-800 mb-3 text-[11px]">
                <Terminal className="h-3.5 w-3.5 text-[#ff6a00]" />
                <span>system-spec.config.ts</span>
              </div>
              <pre className="text-xs leading-relaxed overflow-x-auto text-zinc-300">
                <span className="text-purple-400">export const</span> <span className="text-blue-400">systemConfig</span> = &#123;{"\n"}
                {"  "}canvas: <span className="text-emerald-400">&quot;max-w-[48rem]&quot;</span>,{"\n"}
                {"  "}motion: <span className="text-emerald-400">&quot;prefers-reduced-motion: 0.01ms&quot;</span>,{"\n"}
                {"  "}microInteraction: <span className="text-emerald-400">&quot;transform: scale(0.992)&quot;</span>,{"\n"}
                {"  "}borders: <span className="text-emerald-400">&quot;border-dashed border-border/80&quot;</span>,{"\n"}
                {"  "}fonts: [<span className="text-emerald-400">&quot;DM Sans&quot;</span>, <span className="text-emerald-400">&quot;Georgia Serif Italic&quot;</span>, <span className="text-emerald-400">&quot;JetBrains Mono&quot;</span>]{"\n"}
                &#125;;
              </pre>
            </div>
          </section>

          {/* Footer Callout */}
          <footer className="border-t border-dashed border-zinc-300 dark:border-zinc-800 px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <div>
              <span>SYSTEM SPEC © 2026</span> &bull; <span>ADITYA RAJ</span>
            </div>
            <Link
              href="/"
              className="text-[#ff6a00] hover:underline"
            >
              Return to Catalog →
            </Link>
          </footer>

        </main>
      </div>

    </div>
  );
}
