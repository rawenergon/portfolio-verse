"use client";

import React, { useState } from "react";
import { Mail, Check, Sparkles, ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
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
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-[#f95300] dark:bg-orange-500/15">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Weekly Design Drops</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Subscribe to our newsletter
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Get the latest updates, early template drops, UI design tips, and exclusive discount codes directly to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitted}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-xs sm:text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[#f95300] focus:outline-none focus:ring-1 focus:ring-[#f95300] dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:text-zinc-100"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="h-11 w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 font-semibold text-xs sm:text-sm text-white shadow-md hover:bg-zinc-800 transition-all dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              {submitted ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {submitted && (
            <p className="text-xs text-emerald-500 font-semibold animate-in fade-in">
              Thanks for subscribing! Check your inbox for confirmation.
            </p>
          )}

          <p className="text-[11px] text-zinc-400">
            No spam ever. Unsubscribe with a single click at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
