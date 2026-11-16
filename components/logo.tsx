import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-2 sm:gap-2.5 group transition-opacity hover:opacity-90 ${className}`}
    >
      {/* Official Provided Logo Image - Compact & Sharp */}
      <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center overflow-hidden rounded-lg bg-black shrink-0">
        <Image
          src="/logo.png"
          alt="CV.VERSE Logo"
          width={32}
          height={32}
          className="h-full w-full object-contain p-0.5 sm:p-1"
          priority
        />
      </div>

      {/* Brand Name: CV.VERSE */}
      <div className="flex items-center font-sans tracking-tight leading-none">
        <span className="text-sm sm:text-base font-black text-zinc-900 dark:text-white">
          CV.
        </span>
        <span className="text-sm sm:text-base font-black text-[#ff751f]">
          VERSE
        </span>
      </div>
    </Link>
  );
}
