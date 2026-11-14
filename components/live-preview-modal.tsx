"use client";

import React from "react";
import { TemplateItem } from "@/lib/templates-data";
import { ResponsiveTabBrowser } from "./responsive-tab-browser";

interface LivePreviewModalProps {
  template: TemplateItem | null;
  onClose: () => void;
  onSelectForPurchase: (template: TemplateItem) => void;
}

export function LivePreviewModal({ 
  template, 
  onClose, 
  onSelectForPurchase 
}: LivePreviewModalProps) {
  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md animate-in fade-in duration-200 p-2 sm:p-4">
      <div className="flex-1 w-full max-w-7xl mx-auto h-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col bg-[#0b0c10]">
        <ResponsiveTabBrowser
          initialSlug={template.slug}
          onSelectForPurchase={(t) => {
            onClose();
            onSelectForPurchase(t);
          }}
          onClose={onClose}
          isModal={true}
        />
      </div>
    </div>
  );
}
