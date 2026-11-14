"use client";

import React, { useState, useMemo } from "react";
import { ArrowUpDown, RotateCcw, Sparkles, Filter } from "lucide-react";
import { TEMPLATES_DATA, TemplateItem } from "@/lib/templates-data";
import { TemplateCard } from "./template-card";

interface TemplateGridProps {
  onSelectForPurchase: (template: TemplateItem) => void;
  onOpenLivePreview: (template: TemplateItem) => void;
}

export function TemplateGrid({ 
  onSelectForPurchase, 
  onOpenLivePreview 
}: TemplateGridProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");

  const categories = [
    { name: "All", count: TEMPLATES_DATA.length },
    { name: "Security & Systems", count: TEMPLATES_DATA.filter(t => t.subCategory === "Security & Systems").length },
    { name: "Developer & Terminal", count: TEMPLATES_DATA.filter(t => t.subCategory === "Developer & Terminal").length },
    { name: "Agency & Studio", count: TEMPLATES_DATA.filter(t => t.subCategory === "Agency & Studio").length },
    { name: "Minimalist", count: TEMPLATES_DATA.filter(t => t.subCategory === "Minimalist").length },
    { name: "Design & Creative", count: TEMPLATES_DATA.filter(t => t.subCategory === "Design & Creative").length },
  ];

  // Distinct tech stack options extracted from live templates
  const techOptions = useMemo(() => {
    const set = new Set<string>();
    TEMPLATES_DATA.forEach(t => t.techStack.forEach(tech => set.add(tech.name)));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES_DATA.filter((template) => {
      const matchesCategory = selectedSubCategory === "All" || template.subCategory === selectedSubCategory;
      const matchesTech = selectedTech === "All" || template.techStack.some(t => t.name.toLowerCase() === selectedTech.toLowerCase());
      return matchesCategory && matchesTech;
    }).sort((a, b) => {
      // Dynamic sort logic:
      if (sortBy === "featured") {
        if (a.slug === "ccidcop") return -1;
        if (b.slug === "ccidcop") return 1;
        return 0;
      }
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }
      if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      if (sortBy === "newest") {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      return 0;
    });
  }, [selectedSubCategory, selectedTech, sortBy]);

  const hasActiveFilters = selectedSubCategory !== "All" || selectedTech !== "All" || sortBy !== "featured";

  const handleResetFilters = () => {
    setSelectedSubCategory("All");
    setSelectedTech("All");
    setSortBy("featured");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* Category Pills & Sort Controls Bar */}
      <div className="mb-6 flex flex-col gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        
        {/* Top Filter Controls: Categories on left, Sort on right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
            {categories.map((cat) => {
              const isActive = selectedSubCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedSubCategory(prev => prev === cat.name ? "All" : cat.name)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] rounded-full px-1.5 py-0.2 font-mono ${
                    isActive
                      ? "bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Actions: Reset button & Sort Dropdown */}
          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                title="Reset all filters to default"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}

            <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span className="text-[11px] font-medium text-zinc-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured" className="dark:bg-zinc-900">Featured (CCIDCOP Pinned)</option>
                <option value="price-asc" className="dark:bg-zinc-900">Price: Low to High (₹69 → ₹100)</option>
                <option value="price-desc" className="dark:bg-zinc-900">Price: High to Low (₹100 → ₹69)</option>
                <option value="newest" className="dark:bg-zinc-900">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Filter: Tech Stack Pills Strip */}
        <div className="flex flex-wrap items-center gap-1 text-xs pt-1">
          <span className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mr-1">
            <Filter className="h-3 w-3" />
            <span>Stack:</span>
          </span>
          {techOptions.map((tech) => {
            const isTechActive = selectedTech === tech;
            return (
              <button
                key={tech}
                onClick={() => setSelectedTech(prev => prev === tech ? "All" : tech)}
                className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition-all cursor-pointer ${
                  isTechActive
                    ? "bg-[#ff6a00] text-white font-bold shadow-sm"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                {tech}
              </button>
            );
          })}

          <span className="ml-auto text-[11px] font-mono text-zinc-400">
            Showing <strong className="text-zinc-700 dark:text-zinc-300">{filteredTemplates.length}</strong> {filteredTemplates.length === 1 ? "template" : "templates"}
          </span>
        </div>

      </div>

      {/* Empty State when no templates match the selected filter combination */}
      {filteredTemplates.length === 0 ? (
        <div className="my-10 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 mb-3 shadow-inner">
            <Sparkles className="h-6 w-6 text-[#ff6a00]" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            No templates match the current filter
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
            {selectedSubCategory !== "All" ? `No templates in ${selectedSubCategory} yet.` : ""} 
            {" "}New curated portfolio templates drop weekly.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        /* 2-Column Responsive Template Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelectForPurchase={onSelectForPurchase}
              onOpenLivePreview={onOpenLivePreview}
            />
          ))}
        </div>
      )}

    </div>
  );
}
