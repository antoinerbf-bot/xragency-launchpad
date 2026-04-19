export type CurrencyCode = "EUR" | "USD" | "VND" | "RUB" | "SAR";
export type LanguageCode = "fr" | "en" | "es" | "vn" | "ru" | "ar";

export const LANGUAGE_TO_CURRENCY: Record<LanguageCode, CurrencyCode> = {
  fr: "EUR",
  en: "USD",
  es: "EUR",
  vn: "VND",
  ru: "RUB",
  ar: "SAR",
};

const RATES: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.1,
  VND: 25800,
  RUB: 90,
  SAR: 4.1,
};

const LOCALES: Record<LanguageCode, string> = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
  vn: "vi-VN",
  ru: "ru-RU",
  ar: "ar-SA",
};

function smartRound(amount: number, currency: CurrencyCode): number {
  if (currency === "VND") return Math.round(amount / 100000) * 100000;
  if (currency === "RUB") return Math.round(amount / 500) * 500;
  if (currency === "SAR") return Math.round(amount / 10) * 10;
  return Math.round(amount);
}

export function convertPrice(eurAmount: number, currency: CurrencyCode): number {
  return smartRound(eurAmount * RATES[currency], currency);
}

export function formatPrice(
  eurAmount: number,
  currency: CurrencyCode,
  language: LanguageCode,
  options?: { suffix?: string }
): string {
  const converted = convertPrice(eurAmount, currency);
  const formatted = new Intl.NumberFormat(LOCALES[language], {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(converted);
  return options?.suffix ? `${formatted}${options.suffix}` : formatted;
}
