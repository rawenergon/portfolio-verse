"use client";

import React from "react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-6 md:pt-14 md:pb-10">
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        
        {/* CV.VERSE Badge - clean without AI blobs */}
        <div className="mx-auto mb-4 flex w-fit items-center justify-center gap-2 rounded-md px-3 py-1 text-sm font-medium border shadow-sm bg-zinc-50 border-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="15" 
            height="15" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-[#ff6a00]"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M3 9h18"></path>
            <path d="M9 21V9"></path>
          </svg>
          <span className="text-xs font-bold tracking-tight">CV.VERSE</span>
        </div>

        {/* Clean Headline with CV.VERSE */}
        <h1 className="mx-auto max-w-2xl text-center text-3xl sm:text-4xl md:text-[2.65rem] font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
          <span className="block">Stop Wasting Time on Boilerplate</span>
          <span className="block mt-1">Build Faster with CV.VERSE Templates.</span>
        </h1>

        {/* Exact Reference 4-Icon Strip: 48px square boxes, NO text labels */}
        <div className="mx-auto mt-6 flex w-fit items-center justify-center gap-2">
          
          {/* React */}
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="React"
            className="grid h-12 w-12 place-items-center rounded border border-[#e5e5e5] bg-[#f5f5f5] p-2.5 transition-all hover:bg-white hover:border-zinc-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-sm"
          >
            <svg 
              viewBox="0 0 115.3 100" 
              className="h-6 w-6 fill-current text-[#58C4DC]"
            >
              <path d="M57.65 65.25c-8.4 0-15.25-6.85-15.25-15.25s6.85-15.25 15.25-15.25 15.25 6.85 15.25 15.25-6.85 15.25-15.25 15.25z"/>
              <path d="M96.75 25.1c-13.6-7.85-30.85-8-44.5-.4-1.35.75-2.6 1.6-3.8 2.5-6.8-5.3-15.2-8.3-24.1-8.3-15.7 0-24.3 9.3-24.3 26.1 0 11.2 4.9 22.8 13.9 32.7 13.6 14.9 31.9 20.3 46.8 13.8 1.4-.6 2.7-1.3 3.9-2.1 6.8 4.9 15.1 7.6 23.8 7.6 15.7 0 24.3-9.3 24.3-26.1 0-11.2-4.9-22.8-13.9-32.7-5.9-6.5-12.7-10.7-18.7-13.1zM57.65 89.2c-15.9 0-32-11.9-40.4-29.8C10.7 45.4 12.1 34 20.7 28.9c3.8-2.2 8.7-2.6 13.8-1.2-5.4 7-8.3 14.8-8.3 22.3 0 10.3 5.4 20.4 15.1 28.5 5 4.2 10.9 7.3 16.35 10.7zm-22.7-39.2c0-8.9 4.3-17.6 12-24.7 9.4-8.6 22.6-11.2 33.1-6.5 10.6 4.7 15.9 14.7 13.3 25-2.2 8.6-8.9 16.3-18.9 21.6-8.5 4.6-17.7 6.4-25.1 4.2-8.4-2.5-14.4-9.9-14.4-19.6zm63.1 9.9c0 10.3-5.4 20.4-15.1 28.5-4.8 4-10.5 7-15.7 10.2 15.7.1 31.5-11.8 39.8-29.6 6.5-13.9 5.1-25.3-3.5-30.4-3.8-2.2-8.7-2.6-13.8-1.2 5.4 7.1 8.3 14.9 8.3 22.5z"/>
            </svg>
          </a>

          {/* Tailwind CSS */}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Tailwind CSS"
            className="grid h-12 w-12 place-items-center rounded border border-[#e5e5e5] bg-[#f5f5f5] p-2.5 transition-all hover:bg-white hover:border-zinc-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-sm"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="h-6 w-6 fill-current text-[#38BDF8]"
            >
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
            </svg>
          </a>

          {/* Motion (Framer Motion) */}
          <a
            href="https://motion.dev/"
            target="_blank"
            rel="noopener noreferrer"
            title="Motion"
            className="grid h-12 w-12 place-items-center rounded border border-[#e5e5e5] bg-[#f5f5f5] p-2.5 transition-all hover:bg-white hover:border-zinc-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-sm"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="h-6 w-6 fill-current text-[#F59E0B]"
            >
              <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
            </svg>
          </a>

          {/* Next.js */}
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Next.js"
            className="grid h-12 w-12 place-items-center rounded border border-[#e5e5e5] bg-[#f5f5f5] p-2.5 transition-all hover:bg-white hover:border-zinc-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-sm"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="h-6 w-6 fill-current text-zinc-900 dark:text-white"
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 16.03L9.77 6.94h2.24l7.15 9.42c-.7.62-1.47 1.18-2.24 1.67zM6.94 17.06V6.94h1.79v10.12H6.94z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Exact Reference Striped Divider Band below Hero (.VrSTkyRL) */}
      <div 
        className="mt-10 h-10 w-full border-y border-zinc-200 dark:border-zinc-800"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #f0f0f0 0, #f0f0f0 1px, transparent 1px, transparent 8px)"
        }}
      />
    </section>
  );
}
