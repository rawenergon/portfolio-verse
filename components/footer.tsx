"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  const footerLinks = [
    { name: "Installation", href: "#get-started" },
    { name: "Components", href: "#components" },
    { name: "Blocks", href: "#blocks" },
    { name: "Templates", href: "/" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-zinc-200/80 bg-white pt-12 pb-16 dark:border-zinc-800/80 dark:bg-[#09090b]">
      {/* Background Subtle Gradient */}
      <div 
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[900px] opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #f95300 0%, transparent 70%)"
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Brand logo in footer */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* Links with Middle Dot Separators */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {footerLinks.map((link, idx) => (
            <React.Fragment key={link.name}>
              <Link 
                href={link.href}
                className="transition-colors hover:text-[#f95300] dark:hover:text-white"
              >
                {link.name}
              </Link>
              {idx < footerLinks.length - 1 && (
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Massive Stylized Wordmark Display matching pro.ui-layouts */}
        <div className="mt-14 select-none overflow-hidden opacity-[0.06] dark:opacity-[0.08] transition-opacity hover:opacity-[0.14] dark:hover:opacity-[0.12]">
          <span className="block font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl text-zinc-900 dark:text-white uppercase leading-none">
            PortfolioVerse
          </span>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-500 dark:text-zinc-500">
          <p>Copyright © 2026 Portfolio Verse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
