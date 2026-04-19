import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  LANGUAGE_TO_CURRENCY,
  type CurrencyCode,
  type LanguageCode,
  formatPrice as formatPriceUtil,
} from "@/lib/currency";
import { translations } from "@/lib/translations";

interface LanguageContextValue {
  language: LanguageCode;
  currency: CurrencyCode;
  setLanguage: (lang: LanguageCode) => void;
  setCurrency: (cur: CurrencyCode) => void;
  t: (key: string) => string;
  formatPrice: (eurAmount: number, opts?: { suffix?: string }) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY_LANG = "xragency.lang";
const STORAGE_KEY_CUR = "xragency.cur";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("fr");
  const [currency, setCurrencyState] = useState<CurrencyCode>("EUR");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedLang = localStorage.getItem(STORAGE_KEY_LANG) as LanguageCode | null;
    const savedCur = localStorage.getItem(STORAGE_KEY_CUR) as CurrencyCode | null;
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
      setCurrencyState(savedCur ?? LANGUAGE_TO_CURRENCY[savedLang]);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    const newCur = LANGUAGE_TO_CURRENCY[lang];
    setCurrencyState(newCur);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
      localStorage.setItem(STORAGE_KEY_CUR, newCur);
    }
  };

  const setCurrency = (cur: CurrencyCode) => {
    setCurrencyState(cur);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY_CUR, cur);
  };

  const t = (key: string): string => {
    return translations[language][key] ?? translations.fr[key] ?? key;
  };

  const formatPrice = (eurAmount: number, opts?: { suffix?: string }) =>
    formatPriceUtil(eurAmount, currency, language, opts);

  return (
    <LanguageContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        t,
        formatPrice,
        isRTL: language === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}
