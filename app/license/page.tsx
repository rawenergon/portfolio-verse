"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopBanner } from "@/components/top-banner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Code2, 
  Mail,
  Sparkles
} from "lucide-react";

export default function LicensePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[repeating-linear-gradient(45deg,#f0f0f0_0_1px,#0000_1px_8px)] dark:bg-[repeating-linear-gradient(45deg,#161616_0_1px,#0000_1px_8px)] text-zinc-900 dark:text-zinc-100 transition-colors">
      <TopBanner />

      <div className="mx-auto max-w-[1440px] border-x border-[#e5e5e5] bg-white dark:border-[#262626] dark:bg-[#09090b] shadow-2xl">
        <Navbar 
          onOpenSearch={() => setIsSearchOpen(true)} 
        />

        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Back Navigation */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-[#ff751f] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Templates</span>
          </Link>

          {/* Header */}
          <div className="space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-bold text-[#ff751f]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Commercial & Developer Rights</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
              License Agreement
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Every purchase on CV.VERSE includes a comprehensive developer license granting lifetime personal and commercial usage rights.
            </p>
          </div>

          {/* Quick Summary Pill Banner */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 mb-10 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>
              <strong>Short version:</strong> You can build unlimited client and personal sites, charge clients whatever you want, and keep 100% of the profits. You just cannot resell the raw code as a template.
            </span>
          </div>

          {/* Rights Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            
            {/* Allowed */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#121215]">
              <div className="flex items-center gap-2.5 mb-6 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  What You Can Do
                </h2>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Use for unlimited client projects, freelance gigs, and corporate contracts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Deploy on unlimited personal portfolios, SaaS marketing sites, and applications.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Modify, strip, rewrite, re-theme, or combine with other codebases freely.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Charge clients for design, implementation, and deployment services without royalties.</span>
                </li>
              </ul>
            </div>

            {/* Prohibited */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#121215]">
              <div className="flex items-center gap-2.5 mb-6 text-rose-600 dark:text-rose-400">
                <XCircle className="h-5 w-5" />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  What You Cannot Do
                </h2>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Re-distribute, sub-license, or resell the raw template as a downloadable theme.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Publish the entire boilerplate un-modified to public open-source repositories.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Include raw template files in website builder tools, SaaS clones, or theme marketplaces.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Claim original authorship of the base framework design for trademarking.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Extended Licensing & Inquiries */}
          <section className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#121215]">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="h-5 w-5 text-[#ff751f]" />
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                Enterprise & Custom Licensing
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              If your organization requires custom enterprise agreements, white-label redistribution rights, or bespoke feature implementations, get in touch directly:
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <a 
                href="mailto:devadibxr@gmail.com?subject=Licensing%20Inquiry%20CV.VERSE"
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2.5 text-white font-sans hover:bg-[#ff6a00] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-[#ff6a00] dark:hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email: devadibxr@gmail.com</span>
              </a>
            </div>
          </section>

        </main>

        <Footer />
      </div>

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTemplate={() => {}}
      />
    </div>
  );
}
