"use client";

import React, { useState } from "react";
import { Terminal, GitBranch, FolderGit2, Check, Code } from "lucide-react";

export function NextcodezPreview() {
  const [activeFile, setActiveFile] = useState<"page.tsx" | "engine.rs" | "config.json">("page.tsx");

  const codeSnippets = {
    "page.tsx": `export default async function Portfolio() {
  const engineer = await getDeveloper("vance");
  return <TerminalView user={engineer} live={true} />;
}`,
    "engine.rs": `pub fn compute_metrics() -> SysResult<Stats> {
  let vram = alloc::pinned_buffer(1024)?;
  Ok(Stats { latency_ms: 1.2, status: 200 })
}`,
    "config.json": `{
  "theme": "tokyo-night-dark",
  "compiler": "next-swc",
  "deploy": "edge-cluster"
}`
  };

  return (
    <div className="relative h-full w-full bg-[#0d1117] text-zinc-200 p-3 sm:p-4 select-none overflow-hidden flex flex-col justify-between text-left font-mono">
      
      {/* Top IDE Tab Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 text-[9px]">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
          <span className="h-2 w-2 rounded-full bg-green-500/80" />
          <span className="ml-2 font-sans font-bold text-zinc-400">NEXTCODEZ</span>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-1">
          {(["page.tsx", "engine.rs", "config.json"] as const).map((file) => (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={`px-2 py-0.5 rounded text-[8px] transition-colors ${
                activeFile === file
                  ? "bg-zinc-800 text-sky-400 border border-zinc-700 font-semibold"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {file}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Body */}
      <div className="my-1.5 flex-1 min-h-0 bg-black/50 rounded border border-zinc-800/80 p-2.5 overflow-hidden flex flex-col justify-between">
        <div className="space-y-0.5 text-[9px] leading-relaxed">
          <div className="text-zinc-500">// NextCodez Developer Portfolio v2.4</div>
          <pre className="text-emerald-400 font-mono overflow-hidden">
            {codeSnippets[activeFile]}
          </pre>
        </div>

        {/* Contribution Graph Row */}
        <div className="mt-2 pt-2 border-t border-zinc-800/60 flex items-center justify-between">
          <span className="text-[8px] text-zinc-500">1,248 commits this year</span>
          <div className="flex items-center gap-1">
            {[3, 4, 2, 5, 4, 3, 5, 2, 4, 5, 3, 4].map((level, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-sm"
                style={{
                  backgroundColor:
                    level === 5 ? "#22c55e" :
                    level === 4 ? "#16a34a" :
                    level === 3 ? "#15803d" : "#166534"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Terminal Row */}
      <div className="flex items-center justify-between border-t border-zinc-800 pt-1.5 text-[8px] text-zinc-400">
        <div className="flex items-center gap-1 text-emerald-400">
          <GitBranch className="h-2.5 w-2.5" />
          <span>master* (clean)</span>
        </div>
        <span className="text-zinc-500 font-sans">Full-Stack Engineer Template</span>
      </div>
    </div>
  );
}
