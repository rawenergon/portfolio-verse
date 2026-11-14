"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, Filter } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");

  const categories = [
    { name: "All", count: TEMPLATES_DATA.length },
    { name: "Portfolio", count: TEMPLATES_DATA.filter(t => t.category === "Portfolio").length },
    { name: "Agency", count: TEMPLATES_DATA.filter(t => t.category === "Agency").length },
    { name: "SaaS", count: TEMPLATES_DATA.filter(t => t.category === "SaaS").length },
    { name: "Investment", count: TEMPLATES_DATA.filter(t => t.category === "Investment").length },
    { name: "Tools", count: TEMPLATES_DATA.filter(t => t.category === "Tools").length },
    { name: "Recruitment", count: TEMPLATES_DATA.filter(t => t.category === "Recruitment").length },
  ];

  const filteredTemplates = useMemo(() => {
    return TEMPLATES_DATA.filter((template) => {
      const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
      const matchesSearch = 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.techStack.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Filter and Search Bar Controls */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        
        {/* Category Pill Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] rounded-full px-1.5 py-0.2 ${
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

        {/* Search and Sort controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick filter input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 rounded-lg border border-zinc-200 bg-white pl-8 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#f95300] focus:outline-none focus:ring-1 focus:ring-[#f95300] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 w-36 sm:w-48"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <ArrowUpDown className="h-3 w-3 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured" className="dark:bg-zinc-900">Featured</option>
              <option value="newest" className="dark:bg-zinc-900">Newest (New)</option>
              <option value="price-asc" className="dark:bg-zinc-900">Price: Low to High</option>
              <option value="price-desc" className="dark:bg-zinc-900">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Template Count Badge */}
      <div className="mb-6 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <p>Showing <span className="font-semibold text-zinc-900 dark:text-zinc-200">{filteredTemplates.length}</span> templates</p>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="text-[#f95300] hover:underline"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* 2-Column Responsive Grid matching pro.ui-layouts */}
      {filteredTemplates.length > 0 ? (
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
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            No templates match your search criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 rounded-lg bg-[#f95300] px-4 py-2 text-xs font-semibold text-white shadow hover:bg-[#ff6a1a]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
