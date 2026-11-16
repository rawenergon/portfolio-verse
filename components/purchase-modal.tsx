"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Check, 
  ShieldCheck, 
  Download, 
  CreditCard,
  Loader2,
  QrCode,
  Smartphone,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Mail,
  Phone,
  Tag,
  CheckCircle2,
  FileCode,
  Terminal,
  ExternalLink,
  Globe,
  ChevronDown,
  Github
} from "lucide-react";
import confetti from "canvas-confetti";
import { TemplateItem } from "@/lib/templates-data";
import { downloadTemplateBundle } from "@/lib/template-exporter";
import { 
  SupportedCurrency, 
  CURRENCIES, 
  formatCurrencyPrice 
} from "@/lib/currency";

interface PurchaseModalProps {
  template: TemplateItem | null;
  onClose: () => void;
}

export function PurchaseModal({ template, onClose }: PurchaseModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "upi-qr">("razorpay");
  const [licenseType, setLicenseType] = useState<"single" | "unlimited">("single");
  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [paymentId, setPaymentId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  // Country & Currency state
  const [currency, setCurrency] = useState<SupportedCurrency>("INR");
  const [countryCode, setCountryCode] = useState<string>("IN");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Auto-detect country and currency on mount
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      fetch(`/api/geo?tz=${encodeURIComponent(tz)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.currency && CURRENCIES[data.currency as SupportedCurrency]) {
            setCurrency(data.currency as SupportedCurrency);
            setCountryCode(data.countryCode || "US");
            if (data.isInternational) {
              setPaymentMethod("razorpay");
            }
          }
        })
        .catch((err) => console.warn("Country detection fallback:", err));
    } catch (e) {
      console.warn("Timezone resolution:", e);
    }
  }, []);

  // Free template instant access
  useEffect(() => {
    if (template && (template.isFree || template.price === 0)) {
      setIsSuccess(true);
    }
  }, [template]);

  // Dynamically load Razorpay SDK
  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Free template instant access
  useEffect(() => {
    if (template && (template.isFree || template.price === 0)) {
      setIsSuccess(true);
    }
  }, [template]);

  // Lock body scroll and handle Escape key dismiss
  useEffect(() => {
    if (!template) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [template, onClose]);

  if (!template) return null;

  // Currency & Price Calculations
  const currencyConfig = CURRENCIES[currency] || CURRENCIES.INR;
  const isTier100 = template.price >= 100;
  const singlePrice = isTier100 ? currencyConfig.tier100 : currencyConfig.tier69;
  const unlimitedPrice = Number((singlePrice + currencyConfig.commercialAddon).toFixed(2));
  
  const priceBeforeDiscount = licenseType === "single" ? singlePrice : unlimitedPrice;
  const finalPrice = discountApplied 
    ? Number((priceBeforeDiscount * 0.8).toFixed(2)) 
    : priceBeforeDiscount;

  const isInternational = currency !== "INR";

  // Real UPI URI for Indian users
  const upiUri = `upi://pay?pa=adityaraj@okhdfcbank&pn=CV.VERSE&am=${finalPrice}&cu=INR&tn=${template.slug}_template_license`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiUri)}&size=200x200&color=09090b&bgcolor=ffffff`;

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

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

  // Launch Razorpay Live Checkout (Domestic & International)
  const handleRazorpayPayment = async () => {
    setEmailError("");
    setErrorMessage("");

    if (!email.trim() || !validateEmail(email)) {
      setEmailError("Please enter a valid email address to receive your template.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create order on server with localized currency
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          templateSlug: template.slug,
          price: finalPrice,
          currency: currency,
          country: countryCode,
          title: template.title,
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          licenseType,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.orderId) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      // Check if Razorpay SDK is ready
      if (typeof window === "undefined" || !(window as any).Razorpay) {
        throw new Error("Razorpay SDK is initializing. Please try again in a few seconds.");
      }

      // 2. Open Razorpay live popup
      const options = {
        key: data.key || "rzp_live_Tzwme978z4OZoj",
        amount: data.amount,
        currency: data.currency || currency,
        name: "CV.VERSE",
        description: `${template.title} Source Code & License (${data.currency || currency})`,
        image: "/logo.png",
        order_id: data.orderId,
        prefill: {
          email: email.trim(),
          contact: phone.trim() || undefined,
        },
        notes: {
          template: template.slug,
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          license: licenseType,
          currency: data.currency || currency,
          country: countryCode,
        },
        theme: {
          color: "#ff6a00",
        },
        handler: async function (response: any) {
          try {
            // 3. Verify payment signature on backend
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                templateSlug: template.slug,
                customerEmail: email.trim(),
                customerPhone: phone.trim(),
                licenseType,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setPaymentId(response.razorpay_payment_id);
              setIsSuccess(true);
              confetti({
                particleCount: 160,
                spread: 100,
                origin: { y: 0.5 },
              });
              // Auto-trigger instant ZIP download
              setIsDownloading(true);
              try {
                await downloadTemplateBundle(template, licenseType);
                setDownloaded(true);
              } catch (e) {
                console.error("Auto download error:", e);
              } finally {
                setIsDownloading(false);
              }
            } else {
              setErrorMessage("Payment verification failed. Please contact support.");
            }
          } catch (verifyErr: any) {
            console.error("Verification error:", verifyErr);
            setErrorMessage("Error confirming payment status.");
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.open();
    } catch (err: any) {
      console.error("Razorpay checkout error:", err);
      setErrorMessage(err?.message || "Failed to launch Razorpay checkout.");
      setIsProcessing(false);
    }
  };

  // Instant Manual UPI Confirmation (India Only)
  const handleConfirmUpi = async () => {
    setEmailError("");
    setErrorMessage("");

    if (!email.trim() || !validateEmail(email)) {
      setEmailError("Please enter a valid email address to receive your template.");
      return;
    }

    setIsProcessing(true);
    setTimeout(async () => {
      setIsProcessing(false);
      setPaymentId(`UPI_MANUAL_${Date.now().toString().slice(-8)}`);
      setIsSuccess(true);
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.5 },
      });
      setIsDownloading(true);
      try {
        await downloadTemplateBundle(template, licenseType);
        setDownloaded(true);
      } catch (e) {
        console.error("Auto download error:", e);
      } finally {
        setIsDownloading(false);
      }
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#111216] text-zinc-900 dark:text-zinc-100 max-h-[94vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar with Currency Selector */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 px-6 py-4 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff6a00]/10 text-[#ff6a00] font-black text-sm">
              CV.
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-white uppercase">
                  {template.title}
                </span>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-mono font-bold text-emerald-500">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Official Source Code &bull; Lifetime License
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Currency Selector Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCurrencyDropdown((prev) => !prev)}
                className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-800 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                title="Change Currency"
              >
                <span>{currencyConfig.flag}</span>
                <span className="font-mono">{currency}</span>
                <ChevronDown className="h-3 w-3 text-zinc-400" />
              </button>

              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-1.5 w-44 rounded-xl border border-zinc-200 bg-white py-1.5 shadow-xl dark:border-zinc-700 dark:bg-zinc-900 z-50 text-xs">
                  <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Select Currency
                  </div>
                  {(Object.keys(CURRENCIES) as SupportedCurrency[]).map((cur) => {
                    const c = CURRENCIES[cur];
                    const active = cur === currency;
                    return (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => {
                          setCurrency(cur);
                          setShowCurrencyDropdown(false);
                          if (cur !== "INR") {
                            setPaymentMethod("razorpay");
                          }
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-left transition-colors ${
                          active
                            ? "bg-orange-500/10 text-[#ff6a00] font-bold"
                            : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.code} ({c.symbol})</span>
                        </span>
                        {active && <Check className="h-3.5 w-3.5" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <span className="text-xl font-black text-zinc-900 dark:text-white font-mono">
              {formatCurrencyPrice(finalPrice, currency)}
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {!isSuccess ? (
            <>
              {/* International Payment Notification Banner */}
              {isInternational && (
                <div className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3.5 py-2 text-xs font-semibold text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/15 dark:text-blue-400">
                  <Globe className="h-4 w-4 shrink-0" />
                  <span>
                    International checkout active. Pay in <strong>{currency} ({currencyConfig.symbol})</strong> with any global debit or credit card.
                  </span>
                </div>
              )}

              {/* Step 1: Customer Contact Collection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#ff6a00]" />
                    <span>Send Template To (Email &bull; Required)</span>
                  </label>
                  <span className="text-[10px] font-mono text-zinc-400">Instant Delivery</span>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email (e.g. alex@gmail.com)"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      className={`w-full rounded-xl border bg-white pl-9 pr-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 dark:bg-zinc-900 dark:text-zinc-100 ${
                        emailError 
                          ? "border-rose-500 focus:ring-rose-500/20" 
                          : "border-zinc-300 dark:border-zinc-700 focus:border-[#ff6a00] focus:ring-[#ff6a00]/20"
                      }`}
                    />
                  </div>

                  {emailError && (
                    <p className="text-[11px] font-medium text-rose-500 flex items-center gap-1">
                      <span>⚠</span> {emailError}
                    </p>
                  )}

                  {/* Optional Phone / WhatsApp */}
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                    <input
                      type="tel"
                      placeholder={isInternational ? "Phone with country code (e.g. +1 555-0199)" : "Phone / WhatsApp (Optional)"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-zinc-300 bg-white pl-9 pr-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#ff6a00] focus:outline-none focus:ring-2 focus:ring-[#ff6a00]/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: License Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <FileCode className="h-3.5 w-3.5 text-[#ff6a00]" />
                  <span>Choose License Tier</span>
                </label>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setLicenseType("single")}
                    className={`relative rounded-xl border p-3 text-left transition-all cursor-pointer ${
                      licenseType === "single"
                        ? "border-[#ff6a00] bg-orange-500/5 ring-1 ring-[#ff6a00] shadow-sm"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 bg-zinc-50/50 dark:bg-zinc-900/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-900 dark:text-white">Single License</span>
                      <div className={`h-3.5 w-3.5 rounded-full border flex items-center justify-center ${
                        licenseType === "single" ? "border-[#ff6a00] bg-[#ff6a00]" : "border-zinc-400"
                      }`}>
                        {licenseType === "single" && <Check className="h-2.5 w-2.5 text-white" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">1 Live Website &bull; Personal / Client</p>
                    <div className="mt-2 font-mono text-sm font-black text-[#ff6a00]">
                      {formatCurrencyPrice(singlePrice, currency)}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLicenseType("unlimited")}
                    className={`relative rounded-xl border p-3 text-left transition-all cursor-pointer ${
                      licenseType === "unlimited"
                        ? "border-[#ff6a00] bg-orange-500/5 ring-1 ring-[#ff6a00] shadow-sm"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 bg-zinc-50/50 dark:bg-zinc-900/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-900 dark:text-white">Unlimited / Agency</span>
                      <div className={`h-3.5 w-3.5 rounded-full border flex items-center justify-center ${
                        licenseType === "unlimited" ? "border-[#ff6a00] bg-[#ff6a00]" : "border-zinc-400"
                      }`}>
                        {licenseType === "unlimited" && <Check className="h-2.5 w-2.5 text-white" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Unlimited Sites &bull; Team &bull; Resale</p>
                    <div className="mt-2 font-mono text-sm font-black text-[#ff6a00]">
                      {formatCurrencyPrice(unlimitedPrice, currency)}
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 3: Payment Method Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-[#ff6a00]" />
                    <span>Payment Gateway</span>
                  </span>
                  <span className="font-mono text-[10px] text-emerald-500 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Razorpay Live Verified
                  </span>
                </label>

                {/* Gateway Switcher Tabs */}
                <div className={`grid ${isInternational ? "grid-cols-1" : "grid-cols-2"} gap-2`}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition-all cursor-pointer border ${
                      paymentMethod === "razorpay"
                        ? "border-[#ff6a00] bg-[#ff6a00] text-white shadow-md shadow-orange-500/20"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                    }`}
                  >
                    <Zap className="h-3.5 w-3.5" />
                    <span>{isInternational ? "International Cards & Wallets" : "Razorpay Standard"}</span>
                  </button>

                  {!isInternational && (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi-qr")}
                      className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition-all cursor-pointer border ${
                        paymentMethod === "upi-qr"
                          ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900 shadow-sm"
                          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                      }`}
                    >
                      <QrCode className="h-3.5 w-3.5" />
                      <span>Direct UPI QR</span>
                    </button>
                  )}
                </div>

                {/* Supported Payment Apps Strip */}
                {paymentMethod === "razorpay" ? (
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/40 space-y-2">
                    {isInternational ? (
                      <>
                        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">Visa</span>
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">Mastercard</span>
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">American Express</span>
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">Apple Pay</span>
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">Google Pay</span>
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">Discover / JCB</span>
                        </div>
                        <p className="text-center text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                          Global 3D Secure checkout. Supports any international credit or debit card worldwide.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">GPay</span>
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">PhonePe</span>
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">Paytm</span>
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">Cred UPI</span>
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">Visa / MC</span>
                          <span className="rounded bg-white dark:bg-zinc-800 px-2 py-1 border border-zinc-200 dark:border-zinc-700 shadow-xs">Netbanking</span>
                        </div>
                        <p className="text-center text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                          Click the payment button below to open the secure Razorpay Live modal and complete payment.
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/40 text-center space-y-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-zinc-200">
                      <img 
                        src={qrCodeUrl} 
                        alt="UPI Payment QR Code" 
                        className="h-32 w-32 object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
                        Scan with any UPI App (GPay, PhonePe, Paytm, Cred)
                      </div>
                      <p className="font-mono text-[11px] text-zinc-500 mt-0.5">
                        Amount: <strong className="text-[#ff6a00] font-black">{formatCurrencyPrice(finalPrice, "INR")} INR</strong>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Coupon Code Section */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Promo Code (CVVERSE20)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-white pl-9 pr-3 py-2 text-xs font-mono uppercase text-zinc-900 placeholder:text-zinc-400 focus:border-[#ff6a00] focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 cursor-pointer transition-colors"
                >
                  Apply
                </button>
              </form>

              {discountApplied && (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-500 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>20% discount applied! You save {formatCurrencyPrice(priceBeforeDiscount - finalPrice, currency)}.</span>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
                  {errorMessage}
                </div>
              )}
            </>
          ) : (
            /* Payment Success Screen */
            <div className="space-y-5 text-center py-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 animate-in zoom-in-50 duration-300">
                <Check className="h-7 w-7" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500 font-mono">
                  <ShieldCheck className="h-3.5 w-3.5" /> 100% Free &amp; Open Source
                </span>
                <h2 className="text-2xl font-black mt-2 text-zinc-900 dark:text-white uppercase tracking-tight">
                  {template.title} Source Code
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                  Clone the open source repository or download the production bundle to build your own portfolio.
                </p>
              </div>

              {/* Instant GitHub & Download Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={template.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-xs font-bold text-white hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all shadow-md cursor-pointer"
                >
                  <Github className="h-4 w-4" />
                  <span>Open GitHub Repository</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff6a00] px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-[#ff7a1a] transition-all cursor-pointer"
                >
                  {isDownloading ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Packaging...
                    </span>
                  ) : downloaded ? (
                    <span className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5" /> Downloaded ZIP
                    </span>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Download .ZIP</span>
                    </>
                  )}
                </button>
              </div>

              {/* CLI Setup Helper */}
              <div className="rounded-xl bg-black p-3.5 font-mono text-[11px] text-zinc-300 space-y-1.5 text-left">
                <div className="text-zinc-500 text-[10px] flex items-center gap-1">
                  <Terminal className="h-3 w-3" /> Quick Clone &amp; Setup:
                </div>
                <div className="text-emerald-400 select-all">git clone {template.githubUrl}.git</div>
                <div className="text-zinc-400">cd {template.slug} &amp;&amp; npm install &amp;&amp; npm run dev</div>
              </div>

              <button
                onClick={onClose}
                className="w-full rounded-xl border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800 py-3 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 cursor-pointer transition-colors"
              >
                Close &amp; Return to Catalog
              </button>
            </div>
          )}
        </div>

        {/* Footer / CTA Bar */}
        {!isSuccess && (
          <div className="border-t border-zinc-200/80 px-6 py-4 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between gap-4 shrink-0">
            <div>
              <span className="text-[11px] text-zinc-500 block">Total Due</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-zinc-900 dark:text-white font-mono">
                  {formatCurrencyPrice(finalPrice, currency)}
                </span>
                <span className="text-xs font-mono text-zinc-400">{currency}</span>
              </div>
            </div>

            {paymentMethod === "razorpay" ? (
              <button
                type="button"
                onClick={handleRazorpayPayment}
                disabled={isProcessing}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#ff6a00] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ff7a1a] transition-all hover:scale-[1.02] cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Opening Razorpay...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Pay {formatCurrencyPrice(finalPrice, currency)} &amp; Download</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmUpi}
                disabled={isProcessing}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#ff6a00] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ff7a1a] transition-all hover:scale-[1.02] cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Confirming...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>I Have Paid {formatCurrencyPrice(finalPrice, "INR")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
