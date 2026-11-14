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
  Layers,
  Code2,
  Cpu,
  FileCode,
  ShieldCheck,
  ChevronRight
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
  const liveTargetUrl = template.demoUrl || (isCcidcop ? "https://ccidcop.in" : `https://${template.slug}.ui-layouts.com`);

  const detailsList = [
    {
      title: "Hero, About, Services & Projects",
      desc: "Designed with all essential agency and portfolio sections. Fully responsive, modern, and optimized for high conversion."
    },
    {
      title: "MDX-Powered Blog System",
      desc: `${template.title} includes a complete writing engine built using next-mdx. Every article is statically pre-rendered for instant page transitions.`
    },
    {
      title: "SEO Optimized with Full Metadata",
      desc: "Every single page includes metadata, OpenGraph images, Twitter cards, structured JSON-LD data, and search-friendly markup out of the box."
    },
    {
      title: "Lenis for smooth scrolling & Motion Animations",
      desc: "Smooth kinetic motion, spring transitions, and interactive physics make the website feel ultra-fluid and premium."
    },
    {
      title: "TailwindCSS v4 + React 19 + Next.js 14/15",
      desc: "Built on the modern React ecosystem, guaranteeing long-term stability, developer experience, and 100/100 Lighthouse performance."
    },
    {
      title: "Static Generation — Lightning Fast",
      desc: "Case studies and blog pages are generated at build time, delivering blazing-fast sub-second response times."
    },
    {
      title: "Code Blocks with Copy Button",
      desc: "Technical writing pages automatically detect code syntax and provide one-click copy buttons for an elite developer experience."
    },
    {
      title: "Discord & Form Webhook Integration",
      desc: `${template.title} includes built-in contact and newsletter forms connected to Discord webhooks for instant notifications.`
    },
    {
      title: "Easy to Deploy & Customize",
      desc: "Clean modular file structure, clear naming conventions, and typed components make customization effortless."
    },
    {
      title: "Lifetime License & Future Updates",
      desc: "Full source code ownership, lifetime commercial use, and free updates as the design framework evolves."
    }
  ];

  const techStackCards = [
    { name: "TypeScript", desc: "Type-safe development with zero runtime overhead", icon: "TS" },
    { name: "Next.js", desc: "App Router, Server Components & Static Site Generation", icon: "N" },
    { name: "React", desc: "Modern component architecture & state hooks", icon: "⚛" },
    { name: "TailwindCSS", desc: "Utility-first CSS framework for rapid styling", icon: "TW" },
    { name: "Framer Motion", desc: "Spring physics, layout animations & micro-interactions", icon: "FM" },
    { name: "Lenis", desc: "Smooth momentum scrolling for high-end web feel", icon: "LS" },
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
              <span>/ Templates</span>
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
              <div className="flex flex-wrap items-center gap-2 pt-2">
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
                <a
                  href={liveTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-xs font-bold text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-all cursor-pointer"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="h-4 w-4" />
                </a>

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
          <div className="mt-8">
            <ResponsiveTabBrowser
              initialSlug={template.slug}
              onSelectForPurchase={() => setIsPurchaseOpen(true)}
            />
          </div>

          {/* UI Layouts Pro "Details" Section */}
          <div className="mt-16 space-y-10 border-t border-zinc-200 dark:border-zinc-800 pt-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Details
              </h2>
              <div className="mt-6 space-y-4">
                {detailsList.map((item) => (
                  <p key={item.title} className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</span>
                    {" — "}
                    <span>{item.desc}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* UI Layouts Pro "Tech Stack" Section */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-10">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Tech Stack
              </h2>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
                Our template is crafted with a robust and modern tech stack, blending trusted frameworks with innovative tools. This combination guarantees exceptional performance, scalability, and a seamless developer experience, making it the ideal foundation for your next project.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {techStackCards.map((card) => (
                  <div 
                    key={card.name}
                    className="flex items-start gap-3.5 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-sm">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{card.name}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ready to Deploy Purchase CTA Banner */}
            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Ready to deploy {template.title}?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  Instant source code download (.ZIP), full documentation, and lifetime commercial license for only ₹{template.price} INR.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsPurchaseOpen(true)}
                  className="rounded-xl bg-[#ff6a00] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ff7a1a] transition-all hover:scale-105 cursor-pointer"
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
