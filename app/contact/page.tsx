"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopBanner } from "@/components/top-banner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { BookCallModal } from "@/components/book-call-modal";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  Check, 
  Copy, 
  Clock, 
  ShieldCheck, 
  ArrowLeft,
  ExternalLink,
  Calendar,
  Sparkles
} from "lucide-react";

export default function ContactPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const phone = "+918766207219";
  const displayPhone = "+91 87662 07219";
  const email = "devadibxr@gmail.com";
  const whatsappUrl = "https://wa.me/918766207219?text=Hi%20Aditya,%20I%20have%20a%20query%20regarding%20CV.VERSE%20templates.";

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

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
          onOpenBookCall={() => setIsBookCallOpen(true)}
        />

        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Direct Developer Line</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
              Contact & Support
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Have questions regarding template setup, Razorpay order delivery, customization, or commercial licensing? Reach out directly via WhatsApp, Email, or schedule a 1:1 consultation call on Cal.com.
            </p>
          </div>

          {/* 3-Column Contact & Consultation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* 1. WhatsApp Direct Line */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-[#121215] shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Fast Response (&lt; 2h)
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    WhatsApp Chat
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Direct messaging for quick queries, order receipts, and instant verification.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{displayPhone}</span>
                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center gap-1 text-[11px] font-sans text-zinc-500 hover:text-emerald-500 transition-colors cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedPhone ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedPhone ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-xs sm:text-sm text-white shadow-md hover:bg-emerald-500 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Start WhatsApp Chat</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* 2. Direct Email Support */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-[#121215] shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#ff751f]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-bold text-[#ff751f]">
                    <Clock className="h-3 w-3" />
                    24/7 Inbox
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    Direct Email
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Detailed inquiries, custom enterprise licensing, or technical bug reports.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-900 dark:text-zinc-200 font-semibold truncate">{email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-[11px] font-sans text-zinc-500 hover:text-[#ff751f] transition-colors shrink-0 ml-1 cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="h-3.5 w-3.5 text-[#ff751f]" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href={`mailto:${email}?subject=CV.VERSE%20Template%20Inquiry`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 font-semibold text-xs sm:text-sm text-white shadow-md hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-all"
                >
                  <Send className="h-4 w-4" />
                  <span>Send an Email</span>
                </a>
              </div>
            </div>

            {/* 3. Book a 1:1 Call (₹100) via Cal.com */}
            <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-b from-orange-500/5 to-transparent p-6 dark:border-orange-500/25 dark:from-orange-500/10 dark:to-[#121215] shadow-sm flex flex-col justify-between ring-1 ring-orange-500/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff751f] text-white shadow-sm shadow-orange-500/30">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-bold text-[#ff751f] border border-orange-500/20">
                    <Sparkles className="h-3 w-3" />
                    ₹100 INR &bull; 30 Min
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    1:1 Strategy Call
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Code review, portfolio feedback, or custom architecture. Instant Cal.com booking after payment.
                  </p>
                </div>

                <div className="rounded-xl border border-orange-500/20 bg-white/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/60 flex items-center justify-between text-xs">
                  <span className="text-zinc-900 dark:text-zinc-200 font-semibold">cal.com/rawenergon</span>
                  <span className="font-mono text-emerald-500 font-bold">Slot Ready</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => setIsBookCallOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff751f] px-4 py-2.5 font-semibold text-xs sm:text-sm text-white shadow-md hover:bg-[#ea6412] transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Call (₹100)</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </button>
              </div>
            </div>

          </div>

          {/* Creator Guarantee Box */}
          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-r from-orange-500/5 via-zinc-50 to-transparent p-6 dark:border-zinc-800 dark:from-orange-500/10 dark:via-[#121215] dark:to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff751f] text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  100% Delivery & Technical Guarantee
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Every order includes instant ZIP download + email dispatch. If you need help deploying to Vercel or configuring Next.js, ping on WhatsApp anytime.
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

      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
    </div>
  );
}
