import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  showBadge?: boolean;
}

export function Logo({ className = "", showBadge = true }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={`group inline-flex items-center gap-3 transition-transform duration-200 hover:scale-[1.01] ${className}`}
    >
      {/* Official Provided Logo Image - Large & Crisp */}
      <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md">
        <Image
          src="/logo.png"
          alt="CV.VERSE Logo"
          width={48}
          height={48}
          className="h-full w-full object-contain p-1"
          priority
        />
      </div>

      {/* Brand Name: CV.VERSE - Large & Prominent */}
      <div className="flex items-center font-sans tracking-tight">
        <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
          CV.
        </span>
        <span className="text-xl sm:text-2xl font-black text-[#ff6a00]">
          VERSE
        </span>
      </div>

      {/* PRO Badge */}
      {showBadge && (
        <span className="rounded-md bg-[#ff6a00] px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-white shadow-sm shadow-orange-500/30">
          PRO
        </span>
      )}
    </Link>
  );
}
