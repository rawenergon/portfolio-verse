"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  const footerLinks = [
    { name: "Templates", href: "/" },
    { name: "Live Preview", href: "/templates/ccidcop" },
    { name: "License", href: "/license" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact & Support", href: "/contact" },
    { name: "Substack Newsletter", href: "https://substack.com/@rawenergon", external: true },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-zinc-200 bg-white pt-12 pb-16 dark:border-zinc-800 dark:bg-[#09090b]">
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
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-[#ff751f] dark:hover:text-white"
              >
                {link.name}
              </Link>
              {idx < footerLinks.length - 1 && (
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
              )}
            </React.Fragment>
          ))}
        </div>


        {/* Stylized Wordmark Display */}
        <div className="mt-12 select-none overflow-hidden opacity-[0.05] dark:opacity-[0.08] transition-opacity hover:opacity-[0.10]">
          <span className="block font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl text-zinc-900 dark:text-white uppercase leading-none">
            CV.VERSE
          </span>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-500">
          <p>Copyright © 2026 CV.VERSE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
