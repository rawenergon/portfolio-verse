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
  ArrowLeft,
  ExternalLink
} from "lucide-react";

export default function ContactPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedIg, setCopiedIg] = useState(false);

  const email = "devadibxr@gmail.com";
  const igHandle = "@adibxr";
  const igUrl = "https://instagram.com/adibxr";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyIg = () => {
    navigator.clipboard.writeText(igHandle);
    setCopiedIg(true);
    setTimeout(() => setCopiedIg(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[repeating-linear-gradient(45deg,#f0f0f0_0_1px,#0000_1px_8px)] dark:bg-[repeating-linear-gradient(45deg,#161616_0_1px,#0000_1px_8px)] text-zinc-900 dark:text-zinc-100 transition-colors">
      <TopBanner />

      <div className="mx-auto max-w-[1440px] border-x border-[#e5e5e5] bg-white dark:border-[#262626] dark:bg-[#09090b] shadow-2xl">
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Back Navigation */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-[#ff6a00] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Templates</span>
          </Link>

          {/* Header */}
          <div className="space-y-3 mb-10 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white uppercase font-serif">
              Contact &amp; Connect
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              Reach out directly for template queries, feedback, or collaborations via email or Instagram.
            </p>
          </div>

          {/* Clean 2-Column Contact Options: Email and IG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
            
            {/* 1. Email Box */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6 dark:border-zinc-800 dark:bg-[#121215] flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-[#ff6a00] border border-orange-500/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Inbox</span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">Email</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    For technical support, inquiries, and contributions.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-900 dark:text-zinc-200 truncate">{email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-[11px] font-sans text-zinc-500 hover:text-[#ff6a00] transition-colors shrink-0 ml-2 cursor-pointer"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href={`mailto:${email}?subject=CV.VERSE%20Inquiry`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#ff6a00] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-[#ff6a00] dark:hover:text-white transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send an Email</span>
                </a>
              </div>
            </div>

            {/* 2. Instagram Box */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6 dark:border-zinc-800 dark:bg-[#121215] flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20">
                    <svg 
                      viewBox="0 0 24 24" 
                      width="20" 
                      height="20" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Social</span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">Instagram</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Direct messages and updates from Aditya Raj.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{igHandle}</span>
                  <button
                    onClick={handleCopyIg}
                    className="flex items-center gap-1 text-[11px] font-sans text-zinc-500 hover:text-pink-500 transition-colors shrink-0 ml-2 cursor-pointer"
                    title="Copy handle"
                  >
                    {copiedIg ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedIg ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-pink-500 transition-all cursor-pointer"
                >
                  <span>Open Instagram ({igHandle})</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
              </div>
            </div>

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
