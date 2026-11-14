"use client";

import React, { useState } from "react";
import { 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Terminal, 
  Copy, 
  ArrowRight,
  CreditCard,
  Loader2
} from "lucide-react";
import confetti from "canvas-confetti";
import { TemplateItem } from "@/lib/templates-data";
import { downloadTemplateBundle } from "@/lib/template-exporter";

interface PurchaseModalProps {
  template: TemplateItem | null;
  onClose: () => void;
}

export function PurchaseModal({ template, onClose }: PurchaseModalProps) {
  const [licenseType, setLicenseType] = useState<"single" | "unlimited">("single");
  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!template) return null;

  const basePrice = template.price;
  const priceBeforeDiscount = licenseType === "single" ? basePrice : basePrice + 40;
  const finalPrice = discountApplied ? Math.round(priceBeforeDiscount * 0.8) : priceBeforeDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const c = coupon.trim().toUpperCase();
    if (c === "CVVERSE20" || c === "PORTFOLIO20" || c === "UILAYOUTS20") {
      setDiscountApplied(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleDownload = async () => {
    if (!template) return;
    setIsDownloading(true);
    try {
      await downloadTemplateBundle(template, licenseType);
      setDownloaded(true);
    } catch (err) {
      console.error("Failed to generate zip bundle:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCheckout = async () => {
    setIsSuccess(true);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });
    // Auto-trigger client-side ZIP bundle download
    setIsDownloading(true);
    try {
      await downloadTemplateBundle(template, licenseType);
      setDownloaded(true);
    } catch (err) {
      console.error("Failed to auto-download zip bundle:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-[#121214] text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="flex items-start gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-[#f95300] font-bold text-lg border border-orange-500/20">
                {template.title.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{template.title} Template</h3>
                  <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {template.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                  {template.description}
                </p>
              </div>
            </div>

            {/* License Selection */}
            <div className="mt-5 space-y-2.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Select License
              </label>

              {/* Single Project */}
              <div 
                onClick={() => setLicenseType("single")}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  licenseType === "single"
                    ? "border-[#f95300] bg-orange-500/5 ring-1 ring-orange-500"
                    : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                <div>
                  <div className="font-semibold text-sm">Personal / Single Project</div>
                  <div className="text-xs text-zinc-500">1 end-product or portfolio</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-base">${basePrice}</span>
                </div>
              </div>

              {/* Unlimited Commercial */}
              <div 
                onClick={() => setLicenseType("unlimited")}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  licenseType === "unlimited"
                    ? "border-[#f95300] bg-orange-500/5 ring-1 ring-orange-500"
                    : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                <div>
                  <div className="font-semibold text-sm flex items-center gap-1.5">
                    <span>Unlimited Commercial / Agency</span>
                    <span className="rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-1.5 py-0.2">
                      Popular
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500">Unlimited client and commercial websites</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-base">${basePrice + 40}</span>
                </div>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (Try PORTFOLIO20)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                disabled={discountApplied}
                className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#f95300] focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 uppercase font-mono"
              />
              <button
                type="submit"
                disabled={discountApplied}
                className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
              >
                {discountApplied ? "Applied!" : "Apply"}
              </button>
            </form>

            {discountApplied && (
              <p className="mt-1.5 text-xs text-emerald-500 font-medium flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                20% discount applied successfully!
              </p>
            )}

            {/* Checklist */}
            <div className="mt-4 space-y-1.5 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900/60 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Full Next.js 14 + TypeScript source code</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Free lifetime updates &amp; Discord community support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Commercial usage rights with royalty-free assets</span>
              </div>
            </div>

            {/* Total and Checkout CTA */}
            <div className="mt-5 flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-xs text-zinc-500">Total Due Today</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-zinc-900 dark:text-white">
                    ${finalPrice}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">USD</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="inline-flex items-center gap-2 rounded-xl bg-[#f95300] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ff6a1a] transition-all hover:scale-[1.02]"
              >
                <CreditCard className="h-4 w-4" />
                <span>Complete Checkout</span>
              </button>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold">You&apos;re All Set!</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Access granted for <strong className="text-zinc-900 dark:text-zinc-100">{template.title} Template</strong> ({licenseType} license).
              </p>
            </div>

            {/* Quick Clone Snippet */}
            <div className="rounded-xl bg-zinc-950 p-3.5 text-left border border-zinc-800">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-2 border-b border-zinc-800">
                <span className="flex items-center gap-1.5 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-[#f95300]" />
                  CLI Quickstart
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`npx cv-verse init ${template.slug}`);
                    setCopiedClone(true);
                    setTimeout(() => setCopiedClone(false), 2000);
                  }}
                  className="hover:text-white flex items-center gap-1"
                >
                  {copiedClone ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedClone ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <code className="block mt-2 font-mono text-xs text-emerald-400">
                npx cv-verse init {template.slug}
              </code>
            </div>

            {/* Download Button */}
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#f95300] py-2.5 text-xs font-bold text-white shadow hover:bg-[#ff6a1a] disabled:opacity-75 transition-all"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating .ZIP Bundle...</span>
                  </>
                ) : downloaded ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Download Again (.ZIP)</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download .ZIP Bundle</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
