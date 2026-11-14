"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Moon, 
  Sun, 
  Github, 
  LogIn, 
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { Logo } from "./logo";

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check initial html class
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    } else {
      setIsDark(true); // Default to dark for premium aesthetic
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setIsDark(false);
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Blocks", href: "#blocks" },
    { name: "Illustrations", href: "#illustrations", badge: "New" },
    { name: "Templates", href: "/", isTemplates: true },
    { name: "Website Builder", href: "#builder" },
    { name: "Changelog", href: "#changelog", hasDot: true },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#09090b]/80 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm">
            {navLinks.map((link) => {
              const isActive = link.isTemplates && (pathname === "/" || pathname.startsWith("/templates"));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all ${
                    isActive
                      ? "bg-orange-500/10 text-[#f95300] dark:bg-orange-500/15 dark:text-[#ff6a1a] shadow-sm shadow-orange-500/5 ring-1 ring-orange-500/20"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] font-semibold italic text-[#f95300] tracking-tight">
                      ({link.badge})
                    </span>
                  )}
                  {link.hasDot && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#f95300]"></span>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Search Trigger Button */}
          <button
            onClick={onOpenSearch}
            className="group flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50/80 px-2.5 py-1.5 text-xs text-zinc-500 transition-all hover:border-[#f95300]/50 hover:bg-white hover:text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            title="Search templates and components (Ctrl + K)"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#f95300]" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-flex items-center rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Star Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Github className="h-3.5 w-3.5" />
            <span>Star</span>
            <span className="rounded bg-zinc-100 px-1 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              4.2k
            </span>
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Login / Pro CTA Button */}
          <button 
            onClick={onOpenSearch}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white shadow transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Sign In</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 lg:hidden dark:border-zinc-800"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-200 bg-white px-4 py-4 lg:hidden dark:border-zinc-800 dark:bg-[#09090b]">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="rounded bg-orange-500/10 px-1.5 py-0.5 text-xs font-bold text-[#f95300]">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
