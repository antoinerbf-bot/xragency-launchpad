import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PricingCard } from "@/components/common/PricingCard";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: "Bundles Premium — XRAGENCY" },
      { name: "description", content: "Combinez Web + SEO + Google Maps + IA. Économisez jusqu'à 25%." },
      { property: "og:title", content: "Bundles Premium — XRAGENCY" },
      { property: "og:description", content: "Combinez nos services et économisez 15 à 25%." },
    ],
  }),
  component: BundlesPage,
});

function BundlesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-gradient">Bundles Premium</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
            La performance maximum. Combinez nos services et économisez jusqu'à <strong className="text-foreground">25%</strong>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid gap-8 lg:grid-cols-3">
        <PricingCard
          name="Bundle Local"
          priceEur={1499}
          period="year"
          features={[
            { text: "Pack Essentiel (site 4 pages)", included: true },
            { text: "SEO Local (8 articles/mois)", included: true },
            { text: "Google Maps Top 3 (petite ville)", included: true },
            { text: "WebCare Essentiel inclus", included: true },
            { text: "Économie : -20% vs séparé", included: true },
          ]}
        />
        <PricingCard
          name="Bundle Performance"
          priceEur={3999}
          period="year"
          popular
          features={[
            { text: "Pack Performance (site 7 pages + blog)", included: true },
            { text: "SEO Boost (20 articles/mois)", included: true },
            { text: "Google Maps Top 3 (ville moyenne)", included: true },
            { text: "Chatbot IA Starter", included: true },
            { text: "WebCare Business inclus", included: true },
            { text: "Économie : -25% vs séparé", included: true },
          ]}
        />
        <PricingCard
          name="Bundle Empire"
          priceEur={8999}
          period="year"
          features={[
            { text: "Pack Expérience (e-commerce complet)", included: true },
            { text: "SEO Pro (50 articles/mois)", included: true },
            { text: "Google Maps Top 3 (grande ville)", included: true },
            { text: "IA Boost (multi-canal)", included: true },
            { text: "Branding charte complète", included: true },
            { text: "Community Management Boost", included: true },
            { text: "WebCare Illimité inclus", included: true },
            { text: "Économie : -25% vs séparé", included: true },
          ]}
        />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 text-center">
        <h2 className="text-3xl font-bold text-gradient">Bundle sur-mesure ?</h2>
        <p className="mt-3 text-muted-foreground">Combinez exactement les services dont vous avez besoin.</p>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105">
          Devis personnalisé <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
