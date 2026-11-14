"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  X, 
  Lock, 
  Check, 
  Loader2, 
  ExternalLink, 
  Clock, 
  Video, 
  ShieldCheck, 
  MessageCircle,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const calUrl = `https://cal.com/rawenergon${
    name || email 
      ? `?name=${encodeURIComponent(name.trim())}&email=${encodeURIComponent(email.trim())}` 
      : ""
  }`;

  // Dynamically load Razorpay SDK if not present
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!isOpen) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create order on backend
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: "cal_consultation",
          templateSlug: "cal-consultation",
          title: "1:1 Strategy Call (Cal.com)",
          price: 100, // 100 INR
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          licenseType: "consultation",
        }),
      });

      const orderData = await res.json();

      if (!orderData.success || !orderData.orderId) {
        throw new Error(orderData.error || "Order initialization failed");
      }

      // 2. Configure Razorpay checkout
      const options = {
        key: orderData.key || "rzp_live_Tzwme978z4OZoj",
        amount: orderData.amount || 10000,
        currency: "INR",
        name: "CV.VERSE",
        description: "1:1 Consultation with Aditya Raj",
        image: "/logo.png",
        order_id: orderData.orderId,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        theme: {
          color: "#ff751f",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
        handler: async (response: any) => {
          try {
            // 3. Verify payment signature
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.verified) {
              setPaymentId(response.razorpay_payment_id);
              setIsSuccess(true);
              setIsProcessing(false);

              // Confetti celebration
              try {
                confetti({
                  particleCount: 80,
                  spread: 70,
                  origin: { y: 0.6 },
                });
              } catch {}

              // Automatically launch Cal.com in a new tab with prefilled info
              setTimeout(() => {
                window.open(calUrl, "_blank", "noopener,noreferrer");
              }, 1200);
            } else {
              setErrorMessage("Payment verification failed. Please contact support.");
              setIsProcessing(false);
            }
          } catch (err: any) {
            setErrorMessage(err.message || "Payment verification error");
            setIsProcessing(false);
          }
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (failedRes: any) => {
          setErrorMessage(failedRes?.error?.description || "Payment failed");
          setIsProcessing(false);
        });
        rzp.open();
      } else {
        throw new Error("Razorpay SDK not loaded. Please refresh and try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#111216] text-zinc-900 dark:text-zinc-100 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 px-6 py-4 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff751f]/10 text-[#ff751f] border border-[#ff751f]/20">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-white">
                  1:1 Class &amp; Consultation
                </span>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-mono font-bold text-emerald-500">
                  Cal.com
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Private Class &amp; Strategy Call with Aditya Raj &bull; 30 Mins
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-zinc-900 dark:text-white font-mono">
              ₹100
            </span>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer transition-colors"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!isSuccess ? (
            <form onSubmit={handlePayment} className="space-y-4">
              
              {/* Session Perks Box */}
              <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 text-xs space-y-2 dark:border-orange-500/15 dark:bg-orange-500/10">
                <div className="font-bold text-[#ff751f] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>What you get in this 30-min call:</span>
                </div>
                <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Portfolio architecture & code review (Next.js / Tailwind / GSAP)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Cybersecurity tooling, zero-knowledge architecture, or freelance consulting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Direct schedule confirmation on Cal.com right after payment</span>
                  </li>
                </ul>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-500">
                  {errorMessage}
                </div>
              )}

              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-xs text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[#ff751f] focus:outline-none focus:ring-1 focus:ring-[#ff751f] dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-100"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com (used for Cal.com invite)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-xs text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[#ff751f] focus:outline-none focus:ring-1 focus:ring-[#ff751f] dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-100"
                />
              </div>

              {/* Phone Input (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                  <span>WhatsApp / Phone Number</span>
                  <span className="text-[10px] text-zinc-400 font-normal">Optional</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-xs text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[#ff751f] focus:outline-none focus:ring-1 focus:ring-[#ff751f] dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-100 font-mono"
                />
              </div>

              {/* Topic / Discussion Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                  <span>What would you like to discuss?</span>
                  <span className="text-[10px] text-zinc-400 font-normal">Optional</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Portfolio questions, tech stack guidance, custom feature..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-[#ff751f] focus:outline-none focus:ring-1 focus:ring-[#ff751f] dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-100"
                />
              </div>

              {/* Pay Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ff751f] py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ea6412] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Initializing Secure Checkout...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Pay ₹100 &amp; Schedule on Cal.com</span>
                    </>
                  )}
                </button>
              </div>

              {/* Security & Support Footer */}
              <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center gap-1 font-mono">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Razorpay Live 256-Bit SSL</span>
                </span>
                <span className="font-mono text-zinc-400">cal.com/rawenergon</span>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="py-6 text-center space-y-5 animate-in fade-in">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <Check className="h-7 w-7" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                  Payment Verified!
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Payment ID: <span className="font-mono font-semibold">{paymentId}</span>
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                  We opened Cal.com in a new tab for you to pick your slot.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                If the scheduling tab did not open automatically, click the button below to pick your date and time:
              </div>

              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-emerald-500 transition-all"
              >
                <Calendar className="h-4 w-4" />
                <span>Open Cal.com to Select Slot</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <div className="pt-2 text-[11px] text-zinc-400">
                Need to reschedule or have questions? Contact directly on WhatsApp:{" "}
                <a 
                  href="https://wa.me/918766207219" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-500 hover:underline font-mono font-bold"
                >
                  +91 87662 07219
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
