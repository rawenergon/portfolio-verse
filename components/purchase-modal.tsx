"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Terminal, 
  Copy, 
  CreditCard,
  Loader2,
  QrCode,
  Smartphone,
  Lock,
  ArrowRight,
  Shield
} from "lucide-react";
import confetti from "canvas-confetti";
import { TemplateItem } from "@/lib/templates-data";
import { downloadTemplateBundle } from "@/lib/template-exporter";

interface PurchaseModalProps {
  template: TemplateItem | null;
  onClose: () => void;
}

export function PurchaseModal({ template, onClose }: PurchaseModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"upi-qr" | "upi-id" | "card">("upi-qr");
  const [licenseType, setLicenseType] = useState<"single" | "unlimited">("single");
  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [upiIdInput, setUpiIdInput] = useState("");

  if (!template) return null;

  const basePrice = template.price; // in INR (₹69 for ccidcop)
  const priceBeforeDiscount = licenseType === "single" ? basePrice : basePrice + 99;
  const finalPrice = discountApplied ? Math.max(1, Math.round(priceBeforeDiscount * 0.8)) : priceBeforeDiscount;

  // Real UPI Payment Payload URI
  const upiUri = `upi://pay?pa=adityaraj@okhdfcbank&pn=CV.VERSE&am=${finalPrice}&cu=INR&tn=${template.slug}_template_license`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiUri)}&size=200x200&color=09090b&bgcolor=ffffff`;

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

  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 160,
        spread: 100,
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
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-2xl dark:border-zinc-800 dark:bg-[#121214] text-zinc-900 dark:text-zinc-100 max-h-[92vh] overflow-y-auto"
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
          <div className="space-y-4">
            {/* Header with Title & Price */}
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-[#ff6a00] border border-orange-500/20 uppercase">
                  Instant Checkout &bull; INR
                </span>
                <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> 100% Verified
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black mt-1 text-zinc-900 dark:text-white uppercase tracking-tight">
                {template.title} Template
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Full production Next.js source code, components, and lifetime license.
              </p>
            </div>

            {/* License Selector */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setLicenseType("single")}
                className={`rounded-xl border p-3 text-left transition-all ${
                  licenseType === "single"
                    ? "border-[#ff6a00] bg-orange-500/5 ring-1 ring-orange-500/30"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                }`}
              >
                <div className="font-bold text-zinc-900 dark:text-white">Single Project</div>
                <div className="text-[11px] text-zinc-500">For 1 commercial website</div>
                <div className="mt-1.5 font-mono text-sm font-black text-[#ff6a00]">
                  ₹{basePrice}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLicenseType("unlimited")}
                className={`rounded-xl border p-3 text-left transition-all ${
                  licenseType === "unlimited"
                    ? "border-[#ff6a00] bg-orange-500/5 ring-1 ring-orange-500/30"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                }`}
              >
                <div className="font-bold text-zinc-900 dark:text-white">Agency / Unlimited</div>
                <div className="text-[11px] text-zinc-500">Unlimited client websites</div>
                <div className="mt-1.5 font-mono text-sm font-black text-[#ff6a00]">
                  ₹{basePrice + 99}
                </div>
              </button>
            </div>

            {/* Payment Method Tabs */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-zinc-50/60 dark:bg-zinc-900/40 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Select Payment Method (INR):</span>
                <span className="font-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  UPI &bull; Cards &bull; QR
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi-qr")}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
                    paymentMethod === "upi-qr"
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                      : "bg-white text-zinc-600 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  <QrCode className="h-3.5 w-3.5" />
                  <span>Scan UPI QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi-id")}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
                    paymentMethod === "upi-id"
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                      : "bg-white text-zinc-600 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>UPI Apps</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${
                    paymentMethod === "card"
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                      : "bg-white text-zinc-600 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Card / Netbanking</span>
                </button>
              </div>

              {/* UPI QR View */}
              {paymentMethod === "upi-qr" && (
                <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-center">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-zinc-200">
                    <img 
                      src={qrCodeUrl} 
                      alt="UPI Payment QR Code" 
                      className="h-36 w-36 object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
                      Scan with any UPI App (GPay, PhonePe, Paytm, Cred)
                    </span>
                    <p className="font-mono text-[11px] text-zinc-500 mt-0.5">
                      Amount: <strong className="text-[#ff6a00] font-black">₹{finalPrice} INR</strong>
                    </p>
                  </div>
                </div>
              )}

              {/* UPI ID / App View */}
              {paymentMethod === "upi-id" && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g. yourname@okhdfcbank)"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-mono text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#ff6a00]"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-[11px] font-medium text-center">
                    {["Google Pay", "PhonePe", "Paytm", "BHIM / Cred"].map(app => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setUpiIdInput(`user@${app.toLowerCase().replace(/[^a-z]/g, '')}`)}
                        className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-1.5 hover:border-[#ff6a00] text-zinc-700 dark:text-zinc-300"
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Card / Netbanking View */}
              {paymentMethod === "card" && (
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Card Number (Visa / Mastercard / RuPay)"
                    defaultValue="4532 •••• •••• 8821"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono dark:border-zinc-700 dark:bg-zinc-800"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="12/28"
                      className="rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono dark:border-zinc-700 dark:bg-zinc-800"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      defaultValue="•••"
                      className="rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Discount Code (CVVERSE20)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-mono dark:border-zinc-800 dark:bg-zinc-900"
              />
              <button
                type="submit"
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                Apply
              </button>
            </form>
            {discountApplied && (
              <span className="block text-xs font-semibold text-emerald-500">
                🎉 20% discount applied!
              </span>
            )}

            {/* Total Due & Pay Button */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-[11px] text-zinc-500">Total Amount Payable</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-zinc-900 dark:text-white">
                    ₹{finalPrice}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">INR</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff6a00] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ff7a1a] transition-all hover:scale-[1.02] cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying UPI...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Pay ₹{finalPrice} &amp; Download</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Payment Success & Source Code Download Screen */
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold">Payment Verified &bull; ₹{finalPrice} INR</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Access granted for <strong className="text-zinc-900 dark:text-zinc-100">{template.title} Template</strong> ({licenseType} license).
              </p>
            </div>

            {/* Quick Clone Snippet */}
            <div className="rounded-xl bg-zinc-950 p-3.5 text-left border border-zinc-800">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-2 border-b border-zinc-800">
                <span className="flex items-center gap-1.5 font-mono">
                  <Terminal className="h-3.5 w-3.5 text-[#ff6a00]" />
                  CLI Quickstart
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`npx cv-verse init ${template.slug}`);
                    setCopiedClone(true);
                    setTimeout(() => setCopiedClone(false), 2000);
                  }}
                  className="hover:text-white flex items-center gap-1 cursor-pointer"
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
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#ff6a00] py-2.5 text-xs font-bold text-white shadow hover:bg-[#ff7a1a] disabled:opacity-75 transition-all cursor-pointer"
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
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
