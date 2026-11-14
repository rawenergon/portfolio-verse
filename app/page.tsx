"use client";

import React, { useState } from "react";
import { TopBanner } from "@/components/top-banner";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { TemplateGrid } from "@/components/template-grid";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { PurchaseModal } from "@/components/purchase-modal";
import { LivePreviewModal } from "@/components/live-preview-modal";
import { TemplateItem, TEMPLATES_DATA } from "@/lib/templates-data";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [purchaseTemplate, setPurchaseTemplate] = useState<TemplateItem | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);

  return (
    <div className="min-h-screen bg-[repeating-linear-gradient(45deg,#f0f0f0_0_1px,#0000_1px_8px)] dark:bg-[repeating-linear-gradient(45deg,#161616_0_1px,#0000_1px_8px)] text-zinc-900 dark:text-zinc-100 transition-colors">
      
      {/* Top Banner with Promo Code */}
      <TopBanner />

      {/* Main Container with borders against diagonal striped margins */}
      <div className="mx-auto max-w-[1440px] border-x border-[#e5e5e5] bg-white dark:border-[#262626] dark:bg-[#09090b] shadow-2xl">
        {/* Navigation Header */}
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Hero Section matching exact reference */}
        <main className="flex-1">
          <HeroSection 
            onOpenResponsiveBrowser={() => {
              const ccidcop = TEMPLATES_DATA.find(t => t.slug === "ccidcop") || TEMPLATES_DATA[0];
              setPreviewTemplate(ccidcop);
            }}
          />

          {/* Dedicated Portfolio Templates Catalog */}
          <TemplateGrid
            onSelectForPurchase={(template) => setPurchaseTemplate(template)}
            onOpenLivePreview={(template) => setPreviewTemplate(template)}
          />

          {/* Newsletter Callout */}
          <NewsletterSection />
        </main>

        {/* Site Footer */}
        <Footer />
      </div>

      {/* Interactive Command Palette Modal (Ctrl + K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTemplate={(template) => setPurchaseTemplate(template)}
      />

      {/* Interactive Purchase Checkout Modal */}
      <PurchaseModal
        template={purchaseTemplate}
        onClose={() => setPurchaseTemplate(null)}
      />

      {/* Fullscreen Interactive Live Preview Modal */}
      <LivePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onSelectForPurchase={(template) => setPurchaseTemplate(template)}
      />
    </div>
  );
}
