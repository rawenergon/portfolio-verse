"use client";

import React, { useState } from "react";
import { Mail, Check, ArrowRight, ExternalLink, Calendar } from "lucide-react";

interface NewsletterSectionProps {
  onOpenBookCall?: () => void;
}

export function NewsletterSection({ onOpenBookCall }: NewsletterSectionProps = {}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const substackUrl = "https://substack.com/@rawenergon";
  const substackSubscribeBase = "https://rawenergon.substack.com/subscribe";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = email.includes("@")
      ? `${substackSubscribeBase}?email=${encodeURIComponent(email.trim())}`
      : substackUrl;
    setSubmitted(true);
    window.open(target, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-zinc-100 p-8 sm:p-12 text-center shadow-sm dark:border-zinc-800/80 dark:from-[#131316] dark:to-[#0c0c0e]">
        {/* Diagonal hatch pattern */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 0, transparent 10px)"
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          {/* Substack Pill Badge */}
          <a
            href={substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-bold text-[#ff751f] transition-all hover:bg-orange-500/15 hover:border-orange-500/40 dark:bg-orange-500/15"
          >
            {/* Substack Icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#ff751f]">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
            </svg>
            <span>Substack Newsletter • @rawenergon</span>
            <ExternalLink className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5" />
          </a>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Subscribe to our newsletter
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Get weekly engineering deep-dives, systems architecture, security teardowns, and exclusive early drops from{" "}
            <a 
              href={substackUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-[#ff751f] hover:underline"
            >
              @rawenergon on Substack
            </a>.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="email"
                required
                placeholder="Enter your email for Substack..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-xs sm:text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[#ff751f] focus:outline-none focus:ring-1 focus:ring-[#ff751f] dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:text-zinc-100"
              />
            </div>

            <button
              type="submit"
              className="h-11 w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff751f] px-6 font-semibold text-xs sm:text-sm text-white shadow-md hover:bg-[#ea6412] transition-all"
            >
              {submitted ? (
                <>
                  <Check className="h-4 w-4 text-white" />
                  <span>Opening Substack...</span>
                </>
              ) : (
                <>
                  {/* Substack Icon */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white">
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                  </svg>
                  <span>Subscribe</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {submitted && (
            <p className="text-xs text-[#ff751f] font-semibold animate-in fade-in">
              Redirected to Substack to confirm your subscription!
            </p>
          )}

          {/* Book a Class CTA Button below Substack Subscribe */}
          <div className="pt-3 flex flex-col items-center justify-center gap-2 max-w-md mx-auto">
            <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              or
            </span>
            <button
              type="button"
              onClick={onOpenBookCall || (() => window.open("https://cal.com/rawenergon", "_blank"))}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-zinc-900 shadow-sm hover:border-[#ff751f] hover:text-[#ff751f] hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-[#ff751f] dark:hover:text-[#ff751f] transition-all cursor-pointer group"
              title="Book a 1:1 Class & Strategy Call with Aditya Raj on Cal.com (₹100)"
            >
              <Calendar className="h-4 w-4 text-[#ff751f] transition-transform group-hover:scale-110" />
              <span>Book a Class (1:1 with Aditya)</span>
              <span className="rounded bg-orange-500/15 text-[#ff751f] px-1.5 py-0.5 font-mono text-[11px] font-bold">
                ₹100
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
