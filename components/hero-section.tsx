"use client";

import React from "react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-7 pb-4 md:pt-9 md:pb-6">
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        
        {/* CV.VERSE GitHub Badge (No border around logo) */}
        <div className="mx-auto mb-4 flex w-fit items-center justify-center">
          <a
            href="https://github.com/rawenergon"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="flex items-center justify-center gap-2 px-3 py-1 text-sm font-medium hover:bg-orange-500/10 transition-all cursor-pointer group"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className="text-[#ff6a00] group-hover:scale-110 transition-transform"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span className="text-xs font-bold tracking-tight text-zinc-900 dark:text-zinc-100">CV.VERSE</span>
          </a>
        </div>

        {/* Clean Headline */}
        <h1 className="mx-auto max-w-3xl text-center text-3xl sm:text-5xl md:text-6xl font-normal font-serif tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          <span className="block">Stop Wasting Time on Boilerplate</span>
          <span className="block mt-1 italic text-zinc-700 dark:text-zinc-300">Build Faster with CV.VERSE Templates.</span>
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-4 max-w-xl text-center text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
          Production-grade Next.js &amp; Tailwind CSS portfolios built for developers who ship. Clone clean architecture, skip the repetitive grind, and launch your site today.
        </p>

        {/* 4-Icon Strip: TypeScript, React, Tailwind CSS, Motion dev */}
        <div className="mx-auto mt-6 flex w-fit items-center justify-center gap-2.5 sm:gap-3">
          
          {/* 1. TypeScript */}
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
            title="TypeScript"
            className="grid h-12 w-12 sm:h-13 sm:w-13 place-items-center rounded-xl border border-zinc-200/80 bg-zinc-100/90 p-2.5 transition-all hover:bg-white hover:border-zinc-300 hover:scale-105 dark:border-zinc-800 dark:bg-[#18181b] dark:hover:bg-[#27272a] dark:hover:border-zinc-700 shadow-xs group"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="h-6 w-6 transition-transform group-hover:scale-110"
              aria-label="TypeScript"
            >
              <rect width="24" height="24" rx="3.5" fill="#3178C6" />
              <path
                fill="#FFFFFF"
                d="M14.7 18.5c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596zM3.375 9.938h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
              />
            </svg>
          </a>

          {/* 2. React */}
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            title="React"
            className="grid h-12 w-12 sm:h-13 sm:w-13 place-items-center rounded-xl border border-zinc-200/80 bg-zinc-100/90 p-2.5 transition-all hover:bg-white hover:border-zinc-300 hover:scale-105 dark:border-zinc-800 dark:bg-[#18181b] dark:hover:bg-[#27272a] dark:hover:border-zinc-700 shadow-xs group"
          >
            <svg 
              viewBox="-11.5 -10.23174 23 20.46348" 
              className="h-6 w-6 text-[#00D8FF] dark:text-[#58C4DC] transition-transform group-hover:scale-110"
              aria-label="React"
            >
              <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
          </a>

          {/* 3. Tailwind CSS */}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Tailwind CSS"
            className="grid h-12 w-12 sm:h-13 sm:w-13 place-items-center rounded-xl border border-zinc-200/80 bg-zinc-100/90 p-2.5 transition-all hover:bg-white hover:border-zinc-300 hover:scale-105 dark:border-zinc-800 dark:bg-[#18181b] dark:hover:bg-[#27272a] dark:hover:border-zinc-700 shadow-xs group"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="h-6 w-6 fill-current text-[#38BDF8] transition-transform group-hover:scale-110"
              aria-label="Tailwind CSS"
            >
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
            </svg>
          </a>

          {/* 4. Motion dev */}
          <a
            href="https://motion.dev/"
            target="_blank"
            rel="noopener noreferrer"
            title="Motion dev"
            className="grid h-12 w-12 sm:h-13 sm:w-13 place-items-center rounded-xl border border-zinc-200/80 bg-zinc-100/90 p-2.5 transition-all hover:bg-white hover:border-zinc-300 hover:scale-105 dark:border-zinc-800 dark:bg-[#18181b] dark:hover:bg-[#27272a] dark:hover:border-zinc-700 shadow-xs group"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="h-6 w-6 fill-current text-[#F59E0B] transition-transform group-hover:scale-110"
              aria-label="Motion dev"
            >
              <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
            </svg>
          </a>

        </div>

      </div>

      {/* 45-degree diagonal striped hatch divider band below */}
      <div 
        className="mt-8 h-8 w-full border-y border-[#e5e5e5] dark:border-[#262626] opacity-60 dark:opacity-80"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #e5e5e5, #e5e5e5 1px, transparent 0, transparent 8px)"
        }}
      />
    </section>
  );
}
