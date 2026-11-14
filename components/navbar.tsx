"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Moon, 
  Sun,
  Calendar
} from "lucide-react";
import { Logo } from "./logo";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenBookCall?: () => void;
}

export function Navbar({ onOpenSearch, onOpenBookCall }: NavbarProps) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false); // Can toggle between light and dark

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-[#09090b]/95 transition-colors">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center min-w-0">
          <Logo />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Book Call Button (₹100) */}
          {onOpenBookCall && (
            <button
              onClick={onOpenBookCall}
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg bg-[#ff751f] px-2 sm:px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#ea6412] transition-all shrink-0 cursor-pointer"
              title="Book a 1:1 call with Aditya Raj on Cal.com (₹100)"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Book Call</span>
              <span className="rounded bg-black/20 px-1 py-0.2 font-mono text-[10px] font-bold">₹100</span>
            </button>
          )}

          {/* Search Trigger Button matching reference Ctrl+K */}
          <button
            onClick={onOpenSearch}
            className="flex h-9 sm:h-auto items-center gap-1.5 sm:gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 sm:px-3 py-1.5 text-xs text-zinc-500 transition-all hover:border-[#ff751f]/50 hover:bg-white hover:text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            title="Search templates (Ctrl + K)"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden sm:inline font-sans text-xs">Search...</span>
            <kbd className="hidden sm:inline-flex items-center rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              Ctrl K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
