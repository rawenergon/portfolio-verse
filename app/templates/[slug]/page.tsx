"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { 
  ArrowLeft, 
  ExternalLink, 
  ShoppingCart, 
  Check, 
  Sparkles, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  Zap,
  Code2
} from "lucide-react";
import { TEMPLATES_DATA, TemplateItem } from "@/lib/templates-data";
import { TopBanner } from "@/components/top-banner";
import { Navbar } from "@/components/navbar";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";
import { PurchaseModal } from "@/components/purchase-modal";
import { LivePreviewModal } from "@/components/live-preview-modal";
import { ResponsiveTabBrowser } from "@/components/responsive-tab-browser";

export default function TemplateDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const template = TEMPLATES_DATA.find((t) => t.slug === slug);

  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!template) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold">Template Not Found</h1>
        <p className="mt-2 text-zinc-500">The requested template does not exist.</p>
        <Link href="/" className="mt-6 rounded-lg bg-[#f95300] px-4 py-2 text-white font-semibold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
      <TopBanner />
      <Navbar onOpenSearch={() => {}} />

      <main className="flex-1 pb-16">
        {/* Floating Breadcrumb / Back Bar */}
        <div className="border-b border-zinc-200/80 bg-zinc-50/50 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/30">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-[#f95300] dark:text-zinc-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Templates</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Link href="/" className="hover:underline">Templates</Link>
              <span>/</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-bold">{template.title}</span>
            </div>
          </div>
        </div>

        {/* Template Detail Hero Header */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-bold text-[#f95300] border border-orange-500/20">
                  {template.category}
                </span>
                {template.isNew && (
                  <span className="text-xs font-bold italic text-emerald-500">
                    (New Release)
                  </span>
                )}
                <span className="text-xs text-zinc-400 font-mono">
                  Updated {template.updatedAt}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                {template.title}
              </h1>

              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {template.longDescription}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {template.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold border ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and CTA Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-zinc-400 line-through">
                  ${template.originalPrice}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
                  ${template.price}
                </span>
                <span className="text-xs font-mono text-zinc-400">USD</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-xs font-bold text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Preview</span>
                </button>

                <button
                  onClick={() => setIsPurchaseOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-[#f95300] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ff6a1a] transition-all hover:scale-[1.02]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Purchase - ${template.price}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Responsive Tab Browser (Desktop, Tablet, Phone) */}
          <div className="mt-10">
            <ResponsiveTabBrowser
              initialSlug={template.slug}
              onSelectForPurchase={() => setIsPurchaseOpen(true)}
            />
          </div>

          {/* Feature Breakdown & Pages Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Features Checklist */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#121214] space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
                <Zap className="h-5 w-5 text-[#f95300]" />
                Included Features
              </h3>
              <ul className="space-y-3">
                {template.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Template Pages Included */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#121214] space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
                <Code2 className="h-5 w-5 text-[#f95300]" />
                Pages &amp; Views Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {template.pages.map((page, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                      {idx + 1}
                    </span>
                    <span>{page}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All-Access Bundle Upsell matching pro.ui-layouts */}
          <div className="mt-16 rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-8 sm:p-10 dark:border-zinc-800 dark:from-[#131316] dark:to-[#0c0c0e]">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f95300]">
                All-Access Pass
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Unlock Everything with One Purchase
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Get lifetime access to all 11+ templates, 234+ UI component blocks, and every future drop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tier 1 */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#121214] flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-base">Pro Creator</h4>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold">$139</span>
                    <span className="text-xs text-zinc-400 line-through">$169</span>
                  </div>
                  <p className="text-xs text-zinc-500">Access to all current templates for solo creators.</p>
                </div>
                <button
                  onClick={() => setIsPurchaseOpen(true)}
                  className="mt-6 w-full rounded-xl border border-zinc-300 py-2.5 text-xs font-bold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                >
                  Get Creator Pass
                </button>
              </div>

              {/* Tier 2 (Popular) */}
              <div className="relative rounded-2xl border-2 border-[#f95300] bg-white p-6 shadow-xl dark:bg-[#121214] flex flex-col justify-between ring-4 ring-orange-500/10">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#f95300] px-3 py-0.5 text-[10px] font-black uppercase text-white tracking-wider">
                  Most Popular
                </span>
                <div className="space-y-2">
                  <h4 className="font-bold text-base">Forever Builder</h4>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold">$198</span>
                    <span className="text-xs text-zinc-400 line-through">$249</span>
                  </div>
                  <p className="text-xs text-zinc-500">Lifetime access to all current + future templates and blocks.</p>
                </div>
                <button
                  onClick={() => setIsPurchaseOpen(true)}
                  className="mt-6 w-full rounded-xl bg-[#f95300] py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ff6a1a]"
                >
                  Get Forever Access
                </button>
              </div>

              {/* Tier 3 */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#121214] flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-base">Team Forge</h4>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold">$449</span>
                    <span className="text-xs text-zinc-400 line-through">$549</span>
                  </div>
                  <p className="text-xs text-zinc-500">Up to 10 team seats with dedicated Discord support.</p>
                </div>
                <button
                  onClick={() => setIsPurchaseOpen(true)}
                  className="mt-6 w-full rounded-xl border border-zinc-300 py-2.5 text-xs font-bold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                >
                  Get Team Pass
                </button>
              </div>
            </div>
          </div>
        </div>

        <NewsletterSection />
      </main>

      <Footer />

      <PurchaseModal
        template={isPurchaseOpen ? template : null}
        onClose={() => setIsPurchaseOpen(false)}
      />

      <LivePreviewModal
        template={isPreviewOpen ? template : null}
        onClose={() => setIsPreviewOpen(false)}
        onSelectForPurchase={() => {
          setIsPreviewOpen(false);
          setIsPurchaseOpen(true);
        }}
      />
    </div>
  );
}
