import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { PricingCard } from "@/components/common/PricingCard";

export const Route = createFileRoute("/solutions/branding")({
  head: () => ({
    meta: [
      { title: "Branding & Identité Visuelle — XRAGENCY" },
      { name: "description", content: "Logo, charte graphique, identité de luxe. À partir de 199€." },
      { property: "og:title", content: "Branding — XRAGENCY" },
      { property: "og:description", content: "Votre image vaut 1000 clients." },
    ],
  }),
  component: BrandingPage,
});

function BrandingPage() {
  const { t } = useTranslation();
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-gradient">Votre image vaut 1000 clients</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Logo, charte graphique, identité visuelle premium. Conçus pour le luxe et la performance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <PricingCard
            name="Logo Solo"
            priceEur={199}
            period="once"
            features={[
              { text: "3 propositions de logo", included: true },
              { text: "2 révisions incluses", included: true },
              { text: "Fichiers PNG, SVG, PDF haute résolution", included: true },
              { text: "Versions couleur, N&B, monochrome", included: true },
              { text: "Délai 5-7 jours", included: true },
              { text: "Charte graphique complète", included: false },
            ]}
          />
          <PricingCard
            name="Charte Graphique Complète"
            priceEur={299}
            period="once"
            popular
            features={[
              { text: "Logo complet (versions, tailles, zones)", included: true },
              { text: "Palette couleurs (primaires + secondaires)", included: true },
              { text: "Typographies (titres, texte, web)", included: true },
              { text: "Guidelines (espacements, usages interdits)", included: true },
              { text: "Document PDF 10-15 pages", included: true },
              { text: "Délai 10-12 jours", included: true },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
        >
          Démarrer mon branding <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
