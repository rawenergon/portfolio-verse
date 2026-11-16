"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopBanner } from "@/components/top-banner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  Clock, 
  ShieldCheck, 
  ArrowLeft,
  ExternalLink
} from "lucide-react";

export default function ContactPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = "devadibxr@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

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
          <div className="space-y-4 text-center sm:text-left mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-bold text-[#ff751f]">
              <Mail className="h-3.5 w-3.5" />
              <span>Direct Support Channel</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
              Contact &amp; Support
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Have questions regarding template setup, customization, or open-source repositories? Reach out directly via email.
            </p>
          </div>

          {/* Direct Email Support Card */}
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 dark:border-zinc-800 dark:bg-[#121215] shadow-sm flex flex-col justify-between max-w-xl mx-auto sm:mx-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#ff751f]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-[#ff751f]">
                    <Clock className="h-3.5 w-3.5" />
                    24/7 Inbox
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                    Direct Email Support
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Detailed inquiries, technical questions, bug reports, and portfolio customization.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-900/60 flex items-center justify-between font-mono text-sm">
                  <span className="text-zinc-900 dark:text-zinc-200 font-semibold truncate">{email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 text-xs font-sans text-zinc-500 hover:text-[#ff751f] transition-colors shrink-0 ml-2 cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="h-4 w-4 text-[#ff751f]" /> : <Copy className="h-4 w-4" />}
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href={`mailto:${email}?subject=CV.VERSE%20Template%20Inquiry`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff6a00] px-5 py-3 font-semibold text-sm text-white shadow-md shadow-orange-500/25 hover:bg-[#ff7a1a] transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Send an Email ({email})</span>
                </a>
              </div>
            </div>
          </div>

          {/* Guarantee Box */}
          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-r from-orange-500/5 via-zinc-50 to-transparent p-6 dark:border-zinc-800 dark:from-orange-500/10 dark:via-[#121215] dark:to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff751f] text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Developer &amp; Technical Support
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  If you need help deploying to Vercel or configuring Next.js, email devadibxr@gmail.com anytime.
                </p>
              </div>
            </div>

            <a
              href="https://substack.com/@rawenergon"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-semibold text-[#ff751f] hover:underline inline-flex items-center gap-1"
            >
              <span>Follow @rawenergon</span>
              <ExternalLink className="h-3 w-3" />
            </a>
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
