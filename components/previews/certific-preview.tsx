"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Lock, 
  CheckCircle2, 
  Fingerprint, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight
} from "lucide-react";

export function CertificPreview() {
  const [activeDoc, setActiveDoc] = useState(0);

  const docs = [
    { name: "Transcript.Pdf", ext: "PDF", verified: true, size: "1.2 MB" },
    { name: "Diploma.Pdf", ext: "PDF", verified: true, size: "2.4 MB" },
    { name: "Bitcoin.Pdf", ext: "PDF", verified: true, size: "0.8 MB" },
    { name: "Licenses.Doc", ext: "DOC", verified: true, size: "540 KB" },
    { name: "Car-Title", ext: "NFT", verified: true, size: "320 KB" }
  ];

  return (
    <div className="relative h-full w-full bg-[#08080a] text-white p-3 sm:p-4 select-none overflow-hidden flex flex-col justify-between text-left font-sans">
      
      {/* Background radial glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 20%, rgba(255, 106, 0, 0.15), transparent 70%)"
        }}
      />

      {/* Mini Navigation Bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-tr from-[#ff6a00] to-amber-500 font-black text-[9px] text-black">
            C
          </div>
          <span className="font-extrabold tracking-wider text-xs uppercase text-zinc-100">
            CERTIFIC
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-2.5 text-[10px] text-zinc-400 font-medium">
          <span className="hover:text-white transition-colors">Solutions</span>
          <span className="hover:text-white transition-colors">Features</span>
          <span className="hover:text-white transition-colors">Pricing</span>
          <span className="hover:text-white transition-colors">API</span>
          <span className="hover:text-white transition-colors">Blog</span>
        </nav>

        <button className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold text-zinc-200 hover:bg-white/10 hover:border-white/40 transition-all">
          Contact Us
        </button>
      </header>

      {/* Hero Headline Section */}
      <section className="relative z-10 text-center py-2 sm:py-3 space-y-1">
        <div className="inline-flex items-center gap-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[9px] text-[#ff6a00] font-medium">
          <ShieldCheck className="h-2.5 w-2.5" />
          <span>Decentralized Verification</span>
        </div>
        
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
          Blockchain Security
        </h3>
        
        <p className="text-[10px] sm:text-[11px] text-zinc-400 max-w-sm mx-auto line-clamp-1">
          Immutable and secure verification powered by blockchain technology.
        </p>

        <div className="pt-0.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#ff6a00] hover:underline cursor-pointer">
            Learn More <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </section>

      {/* Document / Certificate Cards Row */}
      <div className="relative z-10 grid grid-cols-5 gap-1.5 sm:gap-2">
        {docs.map((doc, idx) => (
          <div
            key={doc.name}
            onClick={() => setActiveDoc(idx)}
            className={`cursor-pointer rounded-md border p-1.5 transition-all text-center ${
              activeDoc === idx
                ? "border-orange-500/60 bg-white/10 shadow-sm shadow-orange-500/20"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
            }`}
          >
            <div className="mx-auto flex h-6 w-6 items-center justify-center rounded bg-black/40 text-[#ff6a00]">
              <FileText className="h-3.5 w-3.5" />
            </div>
            <p className="mt-1 truncate text-[9px] font-medium text-zinc-200">
              {doc.name}
            </p>
            <span className="font-mono text-[7px] text-zinc-400">
              {doc.ext}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Track Everything & Features Grid */}
      <footer className="relative z-10 grid grid-cols-2 gap-2 pt-2 border-t border-white/10 mt-1">
        
        {/* Track Everything with Fingerprint */}
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 p-2">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-500/40 bg-orange-500/10 text-[#ff6a00]">
            <Fingerprint className="h-4 w-4 animate-pulse" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[10px] font-bold text-white truncate">Track Everything</h4>
            <p className="text-[8px] text-zinc-400 font-mono">Biometric Hash Synced</p>
          </div>
        </div>

        {/* Feature Checkpoints */}
        <div className="rounded-lg border border-white/10 bg-black/40 p-1.5 flex flex-col justify-center space-y-1">
          <div className="flex items-center gap-1 text-[8px] text-zinc-300">
            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400 shrink-0" />
            <span className="truncate">Instant verification engine</span>
          </div>
          <div className="flex items-center gap-1 text-[8px] text-zinc-300">
            <CheckCircle2 className="h-2.5 w-2.5 text-[#ff6a00] shrink-0" />
            <span className="truncate">Immutable blockchain ledger</span>
          </div>
        </div>

      </footer>
    </div>
  );
}
