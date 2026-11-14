"use client";

import React, { useState, useMemo } from "react";
import { Search, ArrowUpDown } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");

  const categories = [
    { name: "All", count: TEMPLATES_DATA.length },
    { name: "Security & Systems", count: TEMPLATES_DATA.filter(t => t.subCategory === "Security & Systems").length },
    { name: "Agency & Studio", count: TEMPLATES_DATA.filter(t => t.subCategory === "Agency & Studio").length },
    { name: "Developer & Terminal", count: TEMPLATES_DATA.filter(t => t.subCategory === "Developer & Terminal").length },
    { name: "Minimalist", count: TEMPLATES_DATA.filter(t => t.subCategory === "Minimalist").length },
    { name: "Design & Creative", count: TEMPLATES_DATA.filter(t => t.subCategory === "Design & Creative").length },
  ];

  const filteredTemplates = useMemo(() => {
    return TEMPLATES_DATA.filter((template) => {
      const matchesCategory = selectedSubCategory === "All" || template.subCategory === selectedSubCategory;
      const matchesSearch = 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.techStack.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0); // Featured first
    });
  }, [selectedSubCategory, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* Category Pills & Search */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
          {categories.map((cat) => {
            const isActive = selectedSubCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedSubCategory(cat.name)}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
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
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search portfolio templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 rounded border border-zinc-200 bg-white pl-8 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#ff6a00] focus:outline-none focus:ring-1 focus:ring-[#ff6a00] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 w-44 sm:w-56"
            />
          </div>

          <div className="flex items-center gap-1 rounded border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <ArrowUpDown className="h-3 w-3 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured" className="dark:bg-zinc-900">Featured</option>
              <option value="newest" className="dark:bg-zinc-900">Newest</option>
              <option value="price-asc" className="dark:bg-zinc-900">Price: Low to High</option>
              <option value="price-desc" className="dark:bg-zinc-900">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2-Column Responsive Template Grid */}
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
    </div>
  );
}
