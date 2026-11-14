"use client";

import React from "react";
import { Code2, ShieldCheck, Briefcase, Zap, ArrowRight, Sparkles } from "lucide-react";

export function SeoSection() {
  const pillars = [
    {
      icon: Code2,
      title: "Developer Portfolios",
      tag: "Engineered for Devs",
      description:
        "Clean, lightning-fast, and optimized to highlight your tech stack and case studies.",
      badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: ShieldCheck,
      title: "Security Templates",
      tag: "Built for InfoSec",
      description:
        "Robust, professional designs tailored specifically for cybersecurity firms, SaaS tools, and consultants.",
      badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: Briefcase,
      title: "Agency Websites",
      tag: "Conversion-Focused",
      description:
        "Modern, accessible layouts designed to convert visitors into paying clients.",
      badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <section 
      id="about-templates"
      aria-label="Why Choose Our Templates" 
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="relative mx-auto max-w-5xl">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-[#ff751f] dark:bg-orange-500/15">
            <Zap className="h-3.5 w-3.5" />
            <span>PRODUCTION-READY FOUNDATION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
            Why start from scratch when you can deploy in minutes?
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Our premium collection of Next.js, Tailwind CSS, and React templates is engineered specifically for developers, security professionals, and digital agencies who want to ship fast without compromising on quality.
          </p>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Whether you need a sleek developer portfolio to showcase your latest GitHub commits or a high-converting agency landing page, these production-ready templates give you the perfect foundation.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#ff751f]/50 hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80"
              >
                {/* Diagonal subtle pattern on hover */}
                <div 
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-[0.03] transition-opacity dark:group-hover:opacity-[0.05]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 0, transparent 8px)"
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-[#ff751f] shadow-sm dark:border-zinc-800 dark:bg-zinc-800">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${pillar.badgeColor}`}>
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-6 sm:p-8 dark:border-orange-500/20 dark:from-orange-500/15 dark:via-transparent">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff751f] uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Zero Boilerplate Fatigue</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200 max-w-2xl leading-relaxed">
                Stop wasting hours on basic project setup, routing, and styling. Grab a template, customize it instantly with Tailwind CSS utility classes, and get your next project live in record time.
              </p>
            </div>
            
            <a
              href="#templates"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff751f] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#ea6412] hover:shadow-orange-500/20 transition-all shrink-0 cursor-pointer"
            >
              <span>Explore Templates</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
