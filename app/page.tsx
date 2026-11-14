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
import { TemplateItem } from "@/lib/templates-data";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [purchaseTemplate, setPurchaseTemplate] = useState<TemplateItem | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
      {/* Top Banner with Promo Code */}
      <TopBanner />

      {/* Navigation Header */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroSection />

        {/* Templates Catalog Grid */}
        <TemplateGrid
          onSelectForPurchase={(template) => setPurchaseTemplate(template)}
          onOpenLivePreview={(template) => setPreviewTemplate(template)}
        />

        {/* Newsletter Callout */}
        <NewsletterSection />
      </main>

      {/* Site Footer */}
      <Footer />

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
