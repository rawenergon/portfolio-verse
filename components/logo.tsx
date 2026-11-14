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
      className={`inline-flex items-center gap-3.5 ${className}`}
    >
      {/* Official Provided Logo Image - Clean, No Hover Glow */}
      <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center overflow-hidden rounded-2xl bg-black border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <Image
          src="/logo.png"
          alt="CV.VERSE Logo"
          width={64}
          height={64}
          className="h-full w-full object-contain p-1.5"
          priority
        />
      </div>

      {/* Brand Name: CV.VERSE */}
      <div className="flex items-center font-sans tracking-tight">
        <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
          CV.
        </span>
        <span className="text-2xl sm:text-3xl font-black text-[#ff751f]">
          VERSE
        </span>
      </div>

      {/* PRO Badge */}
      {showBadge && (
        <span className="rounded-md bg-[#ff751f] px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-white shadow-sm">
          PRO
        </span>
      )}
    </Link>
  );
}
