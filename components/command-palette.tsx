"use client";

import React, { useState, useEffect } from "react";
import { Search, X, Layout, Layers, FileCode, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { TEMPLATES_DATA, TemplateItem } from "@/lib/templates-data";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: TemplateItem) => void;
}

export function CommandPalette({ isOpen, onClose, onSelectTemplate }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeItem, setActiveItem] = useState<TemplateItem>(TEMPLATES_DATA[0]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTemplates = TEMPLATES_DATA.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase()) ||
    t.description.toLowerCase().includes(query.toLowerCase())
  );

  const blockCategories = [
    { name: "Hero Blocks", count: 26 },
    { name: "Newsletter Blocks", count: 7 },
    { name: "Pricing Blocks", count: 24 },
    { name: "Testimonials Blocks", count: 22 },
    { name: "Feature Blocks", count: 11 },
    { name: "Footer Blocks", count: 63 },
    { name: "Experience Blocks", count: 13 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#121214] text-zinc-900 dark:text-zinc-100 ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3.5 dark:border-zinc-800">
          <Search className="h-5 w-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search blocks, templates, pages, and docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base outline-none placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stats Pill Strip */}
        <div className="flex items-center gap-3 border-b border-zinc-200/80 bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-[#f95300]" />
            <strong className="text-zinc-900 dark:text-zinc-200">234</strong> Blocks
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Layout className="h-3.5 w-3.5 text-emerald-500" />
            <strong className="text-zinc-900 dark:text-zinc-200">11</strong> Templates
          </span>
        </div>

        {/* 2-Column Command Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px] max-h-[480px]">
          
          {/* Left Column: Lists */}
          <div className="md:col-span-7 overflow-y-auto border-r border-zinc-200 p-2 dark:border-zinc-800 space-y-4">
            
            {/* Templates Section */}
            <div>
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Templates ({filteredTemplates.length})
              </div>
              <div className="space-y-1">
                {filteredTemplates.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveItem(item);
                    }}
                    onDoubleClick={() => {
                      onSelectTemplate(item);
                      onClose();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors ${
                      activeItem?.id === item.id
                        ? "bg-orange-500/10 text-[#f95300] font-semibold dark:bg-orange-500/15"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Layout className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{item.title}</span>
                      {item.isNew && (
                        <span className="text-[10px] italic text-emerald-500 font-bold">(New)</span>
                      )}
                    </div>
                    <span className="font-mono text-zinc-400">${item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Blocks Section */}
            <div>
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Component Blocks
              </div>
              <div className="space-y-1">
                {blockCategories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">{cat.count} blocks</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Preview & Action */}
          <div className="hidden md:flex md:col-span-5 flex-col justify-between p-5 bg-zinc-50/50 dark:bg-zinc-900/30">
            {activeItem ? (
              <div className="space-y-4">
                <div className="aspect-[16/10] w-full rounded-xl bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-white/10 pb-1.5">
                    <span>{activeItem.category}</span>
                    <span className="text-emerald-400 font-semibold">${activeItem.price} USD</span>
                  </div>
                  <div className="text-center my-auto">
                    <h4 className="text-lg font-bold text-white uppercase">{activeItem.title}</h4>
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{activeItem.description}</p>
                  </div>
                  <div className="flex gap-1 text-[9px] text-zinc-400">
                    {activeItem.techStack.map(t => (
                      <span key={t.name} className="bg-white/10 px-1.5 py-0.5 rounded">{t.name}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">{activeItem.title} Template</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    {activeItem.longDescription.slice(0, 110)}...
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center my-auto text-xs text-zinc-400">Select an item to view preview</div>
            )}

            <button
              onClick={() => {
                if (activeItem) {
                  onSelectTemplate(activeItem);
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#f95300] py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-[#ff6a1a] transition-all"
            >
              <span>Open result</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
