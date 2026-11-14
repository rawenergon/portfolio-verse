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
      className={`inline-flex items-center gap-2 sm:gap-3.5 ${className}`}
    >
      {/* Official Provided Logo Image - Responsive for Mobile & Desktop */}
      <div className="relative flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-black border border-zinc-200/80 dark:border-zinc-800 shadow-sm shrink-0">
        <Image
          src="/logo.png"
          alt="CV.VERSE Logo"
          width={64}
          height={64}
          className="h-full w-full object-contain p-1 sm:p-1.5"
          priority
        />
      </div>

      {/* Brand Name: CV.VERSE */}
      <div className="flex items-center font-sans tracking-tight">
        <span className="text-xl sm:text-3xl font-black text-zinc-900 dark:text-white">
          CV.
        </span>
        <span className="text-xl sm:text-3xl font-black text-[#ff751f]">
          VERSE
        </span>
      </div>

      {/* PRO Badge */}
      {showBadge && (
        <span className="rounded-md bg-[#ff751f] px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-white shadow-sm shrink-0">
          PRO
        </span>
      )}
    </Link>
  );
}
