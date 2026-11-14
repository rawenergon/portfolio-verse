"use client";

import React, { useState, useEffect } from "react";
import { TopBanner } from "@/components/top-banner";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { TemplateGrid } from "@/components/template-grid";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { PurchaseModal } from "@/components/purchase-modal";
import { LivePreviewModal } from "@/components/live-preview-modal";
import { BookCallModal } from "@/components/book-call-modal";
import { TemplateItem, TEMPLATES_DATA } from "@/lib/templates-data";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [purchaseTemplate, setPurchaseTemplate] = useState<TemplateItem | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);

  // Global Ctrl+K / Cmd+K listener to toggle command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[repeating-linear-gradient(45deg,#f0f0f0_0_1px,#0000_1px_8px)] dark:bg-[repeating-linear-gradient(45deg,#161616_0_1px,#0000_1px_8px)] text-zinc-900 dark:text-zinc-100 transition-colors">
      
      {/* Top Banner with Promo Code */}
      <TopBanner />

      {/* Main Container with borders against diagonal striped margins */}
      <div className="mx-auto max-w-[1440px] border-x border-[#e5e5e5] bg-white dark:border-[#262626] dark:bg-[#09090b] shadow-2xl">
        {/* Navigation Header */}
        <Navbar 
          onOpenSearch={() => setIsSearchOpen(true)} 
          onOpenBookCall={() => setIsBookCallOpen(true)}
        />

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
          <NewsletterSection onOpenBookCall={() => setIsBookCallOpen(true)} />
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

      {/* 1:1 Consultation / Strategy Call Booking Modal (₹100 INR) */}
      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
    </div>
  );
}
