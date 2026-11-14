// Multi-currency and country-dependent international pricing configuration

export type SupportedCurrency = "INR" | "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "SGD" | "AED";

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  flag: string;
  // Specific prices for standard templates (₹69 base, ₹100 base)
  tier69: number;  // Single license for ₹69 base
  tier100: number; // Single license for ₹100 base / 1:1 call
  commercialAddon: number; // Addon for unlimited license
}

export const CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    flag: "🇮🇳",
    tier69: 69,
    tier100: 100,
    commercialAddon: 99,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    flag: "🇺🇸",
    tier69: 1.99,
    tier100: 2.49,
    commercialAddon: 2.99,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    flag: "🇪🇺",
    tier69: 1.79,
    tier100: 2.29,
    commercialAddon: 2.69,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    flag: "🇬🇧",
    tier69: 1.49,
    tier100: 1.99,
    commercialAddon: 2.39,
  },
  CAD: {
    code: "CAD",
    symbol: "CA$",
    name: "Canadian Dollar",
    flag: "🇨🇦",
    tier69: 2.49,
    tier100: 2.99,
    commercialAddon: 3.49,
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    flag: "🇦🇺",
    tier69: 2.69,
    tier100: 3.29,
    commercialAddon: 3.79,
  },
  SGD: {
    code: "SGD",
    symbol: "SG$",
    name: "Singapore Dollar",
    flag: "🇸🇬",
    tier69: 2.49,
    tier100: 2.99,
    commercialAddon: 3.49,
  },
  AED: {
    code: "AED",
    symbol: "AED",
    name: "UAE Dirham",
    flag: "🇦🇪",
    tier69: 6.99,
    tier100: 9.99,
    commercialAddon: 9.99,
  },
};

// Map ISO-3166-1 alpha-2 country code to SupportedCurrency
export const COUNTRY_CURRENCY_MAP: Record<string, SupportedCurrency> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AU: "AUD",
  SG: "SGD",
  AE: "AED",
  // European Union countries
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  IE: "EUR",
  PT: "EUR",
  FI: "EUR",
  GR: "EUR",
  SE: "EUR",
  DK: "EUR",
  PL: "EUR",
  CZ: "EUR",
  CH: "EUR",
  NO: "EUR",
};

export function getCurrencyForCountry(countryCode?: string): SupportedCurrency {
  if (!countryCode) return "USD";
  const upper = countryCode.toUpperCase().trim();
  if (upper === "IN") return "INR";
  return COUNTRY_CURRENCY_MAP[upper] || "USD";
}

// Calculate price in given currency from template's base INR price
export function calculateTemplatePrice(
  basePriceInr: number,
  currency: SupportedCurrency = "INR",
  licenseType: "single" | "unlimited" = "single"
): number {
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  // Determine if template is base 69 or base 100
  const isTier100 = basePriceInr >= 100;
  const base = isTier100 ? config.tier100 : config.tier69;
  const addon = licenseType === "unlimited" ? config.commercialAddon : 0;
  return Number((base + addon).toFixed(2));
}

// Format price with proper currency symbol
export function formatCurrencyPrice(
  amount: number,
  currency: SupportedCurrency = "INR"
): string {
  const config = CURRENCIES[currency] || CURRENCIES.INR;
  if (currency === "INR") {
    return `${config.symbol}${Math.round(amount)}`;
  }
  return `${config.symbol}${amount.toFixed(2)}`;
}
