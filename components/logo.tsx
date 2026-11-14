import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showBadge?: boolean;
}

export function Logo({ className = "", showBadge = true }: LogoProps) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.01] ${className}`}>
      {/* Geometric SVG Icon */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-900 to-black p-1.5 ring-1 ring-white/15 shadow-inner shadow-orange-500/10 group-hover:ring-orange-500/50 transition-all duration-300">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Subtle glow filter */}
          <defs>
            <linearGradient id="pv-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7a1a" />
              <stop offset="100%" stopColor="#f95300" />
            </linearGradient>
            <linearGradient id="pv-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffb03a" />
              <stop offset="100%" stopColor="#f95300" />
            </linearGradient>
          </defs>
          
          {/* P and V interlocking geometry */}
          <path
            d="M6 6H17C21.4 6 24 8.6 24 12C24 15.4 21.4 18 17 18H11V26H6V6Z"
            fill="url(#pv-grad)"
            fillOpacity="0.85"
          />
          <path
            d="M11 11H16.5C18.2 11 19.5 11.5 19.5 12C19.5 12.5 18.2 13 16.5 13H11V11Z"
            fill="#ffffff"
          />
          <path
            d="M17 14L22 26H27L22 14H17Z"
            fill="url(#pv-grad2)"
          />
          <circle cx="24.5" cy="8.5" r="2.5" fill="#f95300" className="animate-pulse" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex items-center gap-1.5 font-sans tracking-tight">
        <span className="text-[17px] font-bold text-zinc-900 dark:text-white">
          Portfolio
        </span>
        <span className="text-[17px] font-bold text-[#f95300]">
          verse
        </span>
      </div>

      {/* PRO Badge matching pro.ui-layouts */}
      {showBadge && (
        <span className="rounded-md bg-[#f95300] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm shadow-orange-500/30">
          PRO
        </span>
      )}
    </Link>
  );
}
