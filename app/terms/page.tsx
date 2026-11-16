"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopBanner } from "@/components/top-banner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  Code2, 
  CreditCard, 
  AlertCircle,
  Mail,
  ExternalLink
} from "lucide-react";

export default function TermsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[repeating-linear-gradient(45deg,#f0f0f0_0_1px,#0000_1px_8px)] dark:bg-[repeating-linear-gradient(45deg,#161616_0_1px,#0000_1px_8px)] text-zinc-900 dark:text-zinc-100 transition-colors">
      <TopBanner />

      <div className="mx-auto max-w-[1440px] border-x border-[#e5e5e5] bg-white dark:border-[#262626] dark:bg-[#09090b] shadow-2xl">
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

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
              <FileText className="h-3.5 w-3.5" />
              <span>Legal &amp; Terms</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white font-serif">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Last Updated: March 2026 • CV.VERSE by Aditya Raj (@rawenergon)
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            
            {/* Section 1 */}
            <section className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#121215]">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-5 w-5 text-[#ff751f]" />
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  1. Agreement to Terms
                </h2>
              </div>
              <p>
                By accessing CV.VERSE (operated by Aditya Raj / @rawenergon), you agree to these Terms of Service. All developer portfolio templates curated on CV.VERSE are free and open-source software distributed under standard MIT licenses.
              </p>
            </section>

            {/* Section 2 */}
            <section className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#121215]">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  2. Open Source Software &amp; Code Usage
                </h2>
              </div>
              <p className="mb-3">
                All templates linked on CV.VERSE are open-source repositories hosted on GitHub. You are free to clone, fork, modify, and deploy them for both personal and commercial portfolio projects.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <li>Source code is provided as-is without warranty of any kind.</li>
                <li>Respect individual repository licenses and author attributions where applicable.</li>
                <li>Contributions and template submissions are welcomed via GitHub pull requests.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#121215]">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  3. Sponsorships &amp; Contributions
                </h2>
              </div>
              <p className="mb-3">
                CV.VERSE templates are 100% free. Any voluntary developer sponsorships or donations are processed securely via <strong>Razorpay Live</strong> using bank-grade 256-bit encryption. Supported methods include UPI (Google Pay, PhonePe, Paytm, BHIM), NetBanking, and Credit/Debit Cards.
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Sponsorships support hosting, continuous open-source maintenance, and catalog curation.
              </p>
            </section>

            {/* Section 4 */}
            <section className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#121215]">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  4. Intellectual Property
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                All respective logos, third-party trademarks, and brand assets referenced belong to their respective creators and owners. CV.VERSE does not claim ownership over external portfolio implementations.
              </p>
            </section>

            {/* Section 5 - Support Contact */}
            <section className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 sm:p-8 dark:border-orange-500/20 dark:bg-orange-500/10">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-2">
                5. Support &amp; Inquiries
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                For questions regarding these Terms, template listings, or project collaboration:
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono">
                <a 
                  href="mailto:devadibxr@gmail.com"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-white font-sans hover:bg-[#ff6a00] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-[#ff6a00] dark:hover:text-white transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email: devadibxr@gmail.com</span>
                </a>
                <a 
                  href="https://instagram.com/adibxr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-pink-600 px-4 py-2 text-white font-sans hover:bg-pink-500 transition-colors"
                >
                  <span>Instagram: @adibxr</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </section>

          </div>

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
