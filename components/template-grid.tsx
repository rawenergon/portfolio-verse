"use client";

import React, { useState, useMemo } from "react";
import { ArrowUpDown, RotateCcw, Sparkles } from "lucide-react";
import { TEMPLATES_DATA, TemplateItem } from "@/lib/templates-data";
import { TemplateCard } from "./template-card";

interface TemplateGridProps {
  onSelectForPurchase?: (template: TemplateItem) => void;
}

export function TemplateGrid({ 
  onSelectForPurchase 
}: TemplateGridProps) {
  const [sortBy, setSortBy] = useState<"featured" | "newest">("featured");

  const filteredTemplates = useMemo(() => {
    return [...TEMPLATES_DATA].sort((a, b) => {
      if (sortBy === "featured") {
        if (a.slug === "ccidcop") return -1;
        if (b.slug === "ccidcop") return 1;
        return 0;
      }
      if (sortBy === "newest") {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      return 0;
    });
  }, [sortBy]);

  const hasActiveSort = sortBy !== "featured";

  const handleResetSort = () => {
    setSortBy("featured");
  };

  return (
    <div id="templates" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 font-mono">
      
      {/* Filter / Sort Controls Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        
        {/* Sort Pills & Free Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mr-1 flex items-center gap-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-[#ff6a00]" />
            <span>Sort:</span>
          </span>

          <button
            onClick={() => setSortBy("featured")}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
              sortBy === "featured"
                ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <span>Featured</span>
          </button>

          <button
            onClick={() => setSortBy("newest")}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
              sortBy === "newest"
                ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <span>Newest</span>
          </button>

          <span className="ml-1 inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-500 border border-emerald-500/20">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Free &amp; Open Source</span>
          </span>
        </div>

        {/* Right Info: Count & Reset */}
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 self-start sm:self-center">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{filteredTemplates.length} templates</span>
          </span>

          {hasActiveSort && (
            <button
              onClick={handleResetSort}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              title="Reset sort to featured"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 ? (
        <div className="my-10 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 mb-3 shadow-inner">
            <Sparkles className="h-6 w-6 text-[#ff6a00]" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            No templates available
          </h3>
          <button
            onClick={handleResetSort}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#ff6a00] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#ff7a1a] transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Sort</span>
          </button>
        </div>
      ) : (
        /* Template Cards Grid: 3 Columns on desktop */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelectForPurchase={onSelectForPurchase}
            />
          ))}
        </div>
      )}

    </div>
  );
}
