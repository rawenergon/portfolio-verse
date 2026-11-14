import { NextRequest, NextResponse } from "next/server";
import { getCurrencyForCountry, CURRENCIES } from "@/lib/currency";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // 1. Check edge headers
    const vercelCountry = req.headers.get("x-vercel-ip-country");
    const cloudflareCountry = req.headers.get("cf-ipcountry");
    const forwardedCountry = req.headers.get("x-country-code");

    // 2. Query param override or timezone heuristic if running locally
    const url = new URL(req.url);
    const tz = url.searchParams.get("tz") || "";
    
    let countryCode = (vercelCountry || cloudflareCountry || forwardedCountry || "").toUpperCase().trim();

    if (!countryCode && tz) {
      if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("India")) {
        countryCode = "IN";
      } else if (tz.startsWith("America/")) {
        countryCode = tz.includes("Toronto") || tz.includes("Vancouver") ? "CA" : "US";
      } else if (tz.startsWith("Europe/London")) {
        countryCode = "GB";
      } else if (tz.startsWith("Europe/")) {
        countryCode = "DE";
      } else if (tz.startsWith("Australia/")) {
        countryCode = "AU";
      } else if (tz.startsWith("Asia/Singapore")) {
        countryCode = "SG";
      } else if (tz.startsWith("Asia/Dubai")) {
        countryCode = "AE";
      }
    }

    // Default to US (international) if not detectable, or IN if tz was Indian
    if (!countryCode) {
      countryCode = "US";
    }

    const currency = getCurrencyForCountry(countryCode);
    const currencyConfig = CURRENCIES[currency];

    return NextResponse.json({
      countryCode,
      currency,
      symbol: currencyConfig.symbol,
      currencyName: currencyConfig.name,
      flag: currencyConfig.flag,
      isInternational: countryCode !== "IN",
      detectedBy: vercelCountry ? "vercel-edge" : tz ? "timezone" : "default",
    });
  } catch (err: any) {
    console.error("Geo detection error:", err);
    return NextResponse.json({
      countryCode: "US",
      currency: "USD",
      symbol: "$",
      currencyName: "US Dollar",
      flag: "🇺🇸",
      isInternational: true,
      error: err?.message,
    });
  }
}
