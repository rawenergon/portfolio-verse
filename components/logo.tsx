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
    </Link>
  );
}
