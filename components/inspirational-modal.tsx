"use client";

import React, { useState } from "react";
import { X, Sparkles, ExternalLink, Github, Check, Copy, Code2 } from "lucide-react";
import { TEMPLATES_DATA } from "@/lib/templates-data";

interface InspirationalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InspirationalModal({ isOpen, onClose }: InspirationalModalProps) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyClone = (slug: string, gitUrl: string) => {
    navigator.clipboard.writeText(`git clone ${gitUrl}.git`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-2xl dark:border-zinc-800 dark:bg-[#121214] text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-[#ff6a00] border border-orange-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Inspirational Developer Portfolios
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              100% Free &amp; Open Source — Clone the exact code and build your own.
            </p>
          </div>
        </div>

        {/* Portfolio List */}
        <div className="mt-5 space-y-4">
          {TEMPLATES_DATA.map((template) => (
            <div
              key={template.id}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 p-4 transition-all hover:border-[#ff6a00]/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white uppercase">
                      {template.title}
                    </h3>
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-500 border border-emerald-500/20">
                      FREE &amp; OPEN SOURCE
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {template.description}
                  </p>
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={template.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                  </a>

                  <a
                    href={template.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-colors shadow-sm"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub Repo</span>
                  </a>
                </div>
              </div>

              {/* One-Click Clone Command */}
              <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-zinc-100 dark:bg-zinc-950 px-3 py-1.5 border border-zinc-200/60 dark:border-zinc-800/60 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 overflow-x-auto truncate">
                  <Code2 className="h-3.5 w-3.5 text-[#ff6a00] shrink-0" />
                  <span className="truncate">git clone {template.githubUrl}.git</span>
                </div>
                <button
                  onClick={() => handleCopyClone(template.slug, template.githubUrl)}
                  className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 text-[11px] font-sans font-semibold text-zinc-700 hover:text-[#ff6a00] border border-zinc-200 shadow-xs dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white transition-all shrink-0 cursor-pointer"
                  title="Copy clone command"
                >
                  {copiedSlug === template.slug ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500">
          <p>All portfolios are curated for design &amp; code inspiration. Build freely with Next.js, React, and Tailwind CSS.</p>
        </div>
      </div>
    </div>
  );
}
