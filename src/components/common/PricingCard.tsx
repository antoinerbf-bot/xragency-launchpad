import { Check, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/contexts/LanguageContext";

interface PricingCardProps {
  name: string;
  priceEur: number;
  period?: "month" | "year" | "once";
  features: { text: string; included: boolean }[];
  popular?: boolean;
  ctaHref?: string;
}

export function PricingCard({ name, priceEur, period = "once", features, popular, ctaHref = "/contact" }: PricingCardProps) {
  const { t, formatPrice } = useTranslation();
  const periodSuffix = period === "month" ? t("sas.perMonth") : period === "year" ? t("sas.perYear") : "";

  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-8 transition ${
        popular
          ? "border-primary/60 gradient-card shadow-glow scale-[1.02]"
          : "border-border/60 bg-card/40 hover:border-border"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
          ⭐ {t("sas.popular")}
        </span>
      )}
      <h3 className="text-lg font-semibold text-foreground/90">{name}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-gradient">{formatPrice(priceEur)}</span>
        {periodSuffix && <span className="text-sm text-muted-foreground">{periodSuffix}</span>}
        {period === "once" && <span className="text-sm text-muted-foreground"> · {t("sas.oneShot")}</span>}
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            {f.included ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
            )}
            <span className={f.included ? "text-foreground/85" : "text-muted-foreground/70 line-through"}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>
      <Link
        to={ctaHref}
        className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
          popular
            ? "gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02]"
            : "border border-border bg-card/60 text-foreground hover:bg-accent"
        }`}
      >
        {t("sas.choose")}
      </Link>
    </div>
  );
}
