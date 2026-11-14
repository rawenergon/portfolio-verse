"use client";

import React from "react";
import { Layout, Sparkles, Layers, ArrowUpRight } from "lucide-react";

export function HeroSection() {
  const techLogos = [
    {
      name: "React",
      url: "https://react.dev",
      color: "text-cyan-400 group-hover:border-cyan-500/50",
      svg: (
        <svg viewBox="0 0 115.3 100" className="h-5 w-5 fill-current text-[#00d8ff]">
          <path d="M57.65 65.25c-8.4 0-15.25-6.85-15.25-15.25s6.85-15.25 15.25-15.25 15.25 6.85 15.25 15.25-6.85 15.25-15.25 15.25z"/>
          <path d="M96.75 25.1c-13.6-7.85-30.85-8-44.5-.4-1.35.75-2.6 1.6-3.8 2.5-6.8-5.3-15.2-8.3-24.1-8.3-15.7 0-24.3 9.3-24.3 26.1 0 11.2 4.9 22.8 13.9 32.7 13.6 14.9 31.9 20.3 46.8 13.8 1.4-.6 2.7-1.3 3.9-2.1 6.8 4.9 15.1 7.6 23.8 7.6 15.7 0 24.3-9.3 24.3-26.1 0-11.2-4.9-22.8-13.9-32.7-5.9-6.5-12.7-10.7-18.7-13.1zM57.65 89.2c-15.9 0-32-11.9-40.4-29.8C10.7 45.4 12.1 34 20.7 28.9c3.8-2.2 8.7-2.6 13.8-1.2-5.4 7-8.3 14.8-8.3 22.3 0 10.3 5.4 20.4 15.1 28.5 5 4.2 10.9 7.3 16.35 10.7zm-22.7-39.2c0-8.9 4.3-17.6 12-24.7 9.4-8.6 22.6-11.2 33.1-6.5 10.6 4.7 15.9 14.7 13.3 25-2.2 8.6-8.9 16.3-18.9 21.6-8.5 4.6-17.7 6.4-25.1 4.2-8.4-2.5-14.4-9.9-14.4-19.6zm63.1 9.9c0 10.3-5.4 20.4-15.1 28.5-4.8 4-10.5 7-15.7 10.2 15.7.1 31.5-11.8 39.8-29.6 6.5-13.9 5.1-25.3-3.5-30.4-3.8-2.2-8.7-2.6-13.8-1.2 5.4 7.1 8.3 14.9 8.3 22.5z"/>
        </svg>
      )
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com",
      color: "text-sky-400 group-hover:border-sky-500/50",
      svg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-[#38bdf8]">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      )
    },
    {
      name: "Framer Motion",
      url: "https://motion.dev",
      color: "text-amber-400 group-hover:border-amber-500/50",
      svg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-[#f59e0b]">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
        </svg>
      )
    },
    {
      name: "Next.js",
      url: "https://nextjs.org",
      color: "text-zinc-200 group-hover:border-zinc-400",
      svg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-zinc-900 dark:text-white">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 16.03L9.77 6.94h2.24l7.15 9.42c-.7.62-1.47 1.18-2.24 1.67zM6.94 17.06V6.94h1.79v10.12H6.94z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20">
      {/* Amber / Orange Radial Spotlight Background */}
      <div 
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[800px] max-w-[100vw] rounded-full opacity-40 blur-[100px] dark:opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(249, 83, 0, 0.45) 0%, rgba(249, 115, 22, 0.15) 45%, transparent 70%)"
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-zinc-800 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200 dark:shadow-orange-500/5 mb-6 ring-1 ring-orange-500/20">
          <span className="flex h-2 w-2 rounded-full bg-[#f95300] animate-pulse"></span>
          <Layout className="h-3.5 w-3.5 text-[#f95300]" />
          <span>Templates</span>
        </div>

        {/* H1 Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.12] max-w-4xl mx-auto">
          Stop Wasting Time on Boilerplate
          <span className="block mt-1 bg-gradient-to-r from-zinc-600 via-zinc-800 to-zinc-900 dark:from-zinc-400 dark:via-zinc-200 dark:to-zinc-100 bg-clip-text text-transparent">
            Build Faster with Better Templates.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Production-ready SaaS, portfolio & agency templates built with modern design principles, accessible components, smooth animations, and copy-paste ease.
        </p>

        {/* Tech Stack 4-Button Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {techLogos.map((tech) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 ${tech.color}`}
            >
              {tech.svg}
              <span>{tech.name}</span>
              <ArrowUpRight className="h-3 w-3 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
