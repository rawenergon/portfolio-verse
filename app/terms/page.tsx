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
  Download, 
  CreditCard, 
  AlertCircle,
  MessageCircle,
  Mail
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
              <span>Legal & Agreements</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Last Updated: March 2026 • Effective Immediately
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
                By browsing, accessing, or purchasing any digital software templates from CV.VERSE (operated by Aditya Raj / @rawenergon), you agree to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using this platform or purchasing products.
              </p>
            </section>

            {/* Section 2 */}
            <section className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#121215]">
              <div className="flex items-center gap-3 mb-4">
                <Download className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  2. Digital Goods Delivery
                </h2>
              </div>
              <p className="mb-3">
                All templates offered on CV.VERSE are digital software products distributed as production-ready source code archives (.ZIP).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <li>Upon successful completion of payment via Razorpay, your browser triggers an instant automatic download of the full ZIP archive.</li>
                <li>Your submitted email address is recorded in the transaction ledger for backup dispatch and receipt delivery.</li>
                <li>If an unexpected network disruption occurs during download, contact us immediately with your Razorpay Payment ID for instant manual re-delivery.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#121215]">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  3. Pricing & Payments
                </h2>
              </div>
              <p className="mb-3">
                Payments are processed securely via <strong>Razorpay Live</strong> using bank-grade 256-bit encryption. Supported payment methods include UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, MasterCard, RuPay), and NetBanking.
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Prices are listed in Indian Rupees (INR) and are subject to promotional discounts or change without prior notice. Once purchased, you retain permanent access to the version delivered.
              </p>
            </section>

            {/* Section 4 */}
            <section className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-[#121215]">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  4. Refund Policy for Digital Goods
                </h2>
              </div>
              <p className="mb-3">
                Due to the non-tangible, irrevocable nature of digital source code downloads, sales are generally final once the ZIP has been delivered.
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                However, if you experience a verified technical defect, corrupted archive, or missing source files that our team cannot resolve within 48 hours of notification, we will issue a full refund to your original payment method.
              </p>
            </section>

            {/* Section 5 - Support Contact */}
            <section className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 sm:p-8 dark:border-orange-500/20 dark:bg-orange-500/10">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-2">
                5. Support & Inquiries
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                For any questions about these Terms, licensing, or payment receipts, reach out directly:
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono">
                <a 
                  href="https://wa.me/918766207219"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-white font-sans hover:bg-emerald-500 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp: +91 87662 07219</span>
                </a>
                <a 
                  href="mailto:devadibxr@gmail.com"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-2 text-white font-sans hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email: devadibxr@gmail.com</span>
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
