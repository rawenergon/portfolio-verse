"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  ExternalLink, 
  ShoppingCart, 
  Check, 
  Sparkles, 
  Zap,
  Globe,
  Monitor,
  Tablet,
  Smartphone,
  ShieldCheck,
  Code2,
  Cpu,
  Layers,
  FileCode,
  Rocket
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
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
        <h1 className="text-3xl font-black">Template Not Found</h1>
        <p className="mt-2 text-zinc-500">The requested template does not exist in the catalog.</p>
        <Link href="/" className="mt-6 rounded-xl bg-[#ff6a00] px-5 py-2.5 text-white font-bold text-xs shadow-md">
          Return to CV.VERSE
        </Link>
      </div>
    );
  }

  const isCcidcop = template.slug === "ccidcop";

  const standardFeatures = [
    {
      title: "Hero, About, Services & Projects",
      desc: "Designed with all essential developer and agency sections. Fully responsive across phone, tablet, and desktop, optimized for conversions."
    },
    {
      title: "MDX-Powered Blog & Articles",
      desc: "Includes a complete technical writing engine built with Next.js MDX. Every post is statically pre-rendered for instant page transitions."
    },
    {
      title: "SEO Optimized with Full Metadata",
      desc: "Every single page includes OpenGraph images, Twitter cards, structured JSON-LD data, and search-friendly markup out of the box."
    },
    {
      title: "Lenis Smooth Scroll & Motion Physics",
      desc: "Smooth kinetic scrolling, spring-based micro-interactions, and Framer Motion transitions make the portfolio feel high-end."
    },
    {
      title: "TailwindCSS + React 18/19 + Next.js 14",
      desc: "Engineered on modern Next.js App Router with TypeScript. Achieves 100/100 Lighthouse performance and SEO scores."
    },
    {
      title: "Static Generation — Lightning Fast",
      desc: "Project pages, case studies, and blogs are generated at build time, guaranteeing blazing-fast sub-second response times."
    },
    {
      title: "Discord & Form Webhook Automation",
      desc: "Includes built-in contact forms and newsletter subscriber hooks connected to Discord webhooks and email notifications."
    },
    {
      title: "Production Ready — 1-Click Vercel Deploy",
      desc: "Clean modular codebase, zero build warnings, and pre-configured Vercel and Netlify configuration files."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans">
      <TopBanner />
      <Navbar onOpenSearch={() => {}} />

      <main className="flex-1 pb-16">
        {/* Floating Breadcrumb / Back Bar */}
        <div className="border-b border-zinc-200/80 bg-zinc-50/50 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/30">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-[#ff6a00] dark:text-zinc-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Templates</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Link href="/" className="hover:underline">Templates</Link>
              <span>/</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-bold uppercase">{template.title}</span>
            </div>
          </div>
        </div>

        {/* Template Detail Hero Header */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-bold text-[#ff6a00] border border-orange-500/20">
                  {template.subCategory}
                </span>
                {template.isNew && (
                  <span className="text-xs font-bold italic text-emerald-500">
                    (New Release)
                  </span>
                )}
                {isCcidcop && (
                  <span className="text-xs font-bold text-[#ff6a00] bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 font-mono">
                    ccidcop.in
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
                    className="rounded-lg px-2.5 py-1 text-xs font-mono font-semibold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Price in INR (₹) and Quick CTA Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-zinc-400 line-through font-mono">
                  ₹{template.originalPrice}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
                  ₹{template.price}
                </span>
                <span className="text-xs font-mono text-zinc-400">INR</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-xs font-bold text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-all cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Preview</span>
                </button>

                <button
                  onClick={() => setIsPurchaseOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff6a00] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ff7a1a] transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Purchase - ₹{template.price}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dedicated Live Embedded Responsive Browser on Page */}
          <div className="mt-10">
            <ResponsiveTabBrowser
              initialSlug={template.slug}
              onSelectForPurchase={() => setIsPurchaseOpen(true)}
            />
          </div>

          {/* Technical Feature Breakdown Grid matching UI Layouts Pro */}
          <div className="mt-16 space-y-6">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white uppercase flex items-center gap-2">
                <Zap className="h-6 w-6 text-[#ff6a00]" />
                Template Specifications &amp; Features
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Everything included with your purchase of the {template.title} template.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {standardFeatures.map((feat, idx) => (
                <div 
                  key={feat.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#121214] shadow-sm space-y-2"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff6a00]">
                    <span>0{idx + 1}.</span>
                    <span className="uppercase">{feat.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Buy Callout Banner */}
            <div className="mt-10 rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Ready to deploy {template.title}?
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Instant source code download (.ZIP), documentation, and lifetime license for only ₹{template.price} INR.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPurchaseOpen(true)}
                  className="rounded-xl bg-[#ff6a00] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#ff7a1a] transition-all cursor-pointer"
                >
                  Buy Now &bull; ₹{template.price} INR
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen Interactive Live Preview Modal */}
      <LivePreviewModal
        template={isPreviewOpen ? template : null}
        onClose={() => setIsPreviewOpen(false)}
        onSelectForPurchase={() => {
          setIsPreviewOpen(false);
          setIsPurchaseOpen(true);
        }}
      />

      {/* Purchase Modal with UPI / Cards in INR */}
      <PurchaseModal
        template={isPurchaseOpen ? template : null}
        onClose={() => setIsPurchaseOpen(false)}
      />
    </div>
  );
}
