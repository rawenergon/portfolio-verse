"use client";

import { useState, useEffect } from "react";
import { SupportedCurrency, getCurrencyForCountry, calculateTemplatePrice, formatCurrencyPrice } from "./currency";

function getInitialCurrency(): SupportedCurrency {
  if (typeof window === "undefined") return "INR";
  try {
    const cached = sessionStorage.getItem("cv_user_currency");
    if (cached) return cached as SupportedCurrency;

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("India")) {
      return "INR";
    }
    if (tz.startsWith("America/")) return "USD";
    if (tz.startsWith("Europe/London")) return "GBP";
    if (tz.startsWith("Europe/")) return "EUR";
    if (tz.startsWith("Australia/")) return "AUD";
    if (tz.startsWith("Asia/Singapore")) return "SGD";
    if (tz.startsWith("Asia/Dubai")) return "AED";
  } catch (e) {}
  return "INR";
}

export function useUserCurrency() {
  const [currency, setCurrency] = useState<SupportedCurrency>(getInitialCurrency);

  useEffect(() => {
    let isMounted = true;
    try {
      const cached = sessionStorage.getItem("cv_user_currency");
      if (cached) {
        setCurrency(cached as SupportedCurrency);
        return;
      }

      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      fetch(`/api/geo?tz=${encodeURIComponent(tz)}`)
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          if (data?.currency) {
            setCurrency(data.currency as SupportedCurrency);
            try {
              sessionStorage.setItem("cv_user_currency", data.currency);
            } catch (e) {}
          }
        })
        .catch(() => {});
    } catch (e) {}

    return () => {
      isMounted = false;
    };
  }, []);

  const formatPrice = (baseInrPrice: number, licenseType: "single" | "unlimited" = "single") => {
    if (baseInrPrice === 0) return "FREE";
    const amount = calculateTemplatePrice(baseInrPrice, currency, licenseType);
    return formatCurrencyPrice(amount, currency);
  };

  const getAmount = (baseInrPrice: number, licenseType: "single" | "unlimited" = "single") => {
    return calculateTemplatePrice(baseInrPrice, currency, licenseType);
  };

  return {
    currency,
    formatPrice,
    getAmount,
    isIndia: currency === "INR",
  };
}
