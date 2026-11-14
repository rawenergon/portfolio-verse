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
      className={`group inline-flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.01] ${className}`}
    >
      {/* Official Provided Logo Image */}
      <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <Image
          src="/logo.png"
          alt="CV.VERSE Logo"
          width={32}
          height={32}
          className="h-full w-full object-contain"
          priority
        />
      </div>

      {/* Brand Name: CV.VERSE */}
      <div className="flex items-center font-sans tracking-tight">
        <span className="text-[18px] font-extrabold text-zinc-900 dark:text-white">
          CV.
        </span>
        <span className="text-[18px] font-extrabold text-[#ff6a00]">
          VERSE
        </span>
      </div>

      {/* PRO Badge */}
      {showBadge && (
        <span className="rounded-md bg-[#ff6a00] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm shadow-orange-500/30">
          PRO
        </span>
      )}
    </Link>
  );
}
