import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PricingCard } from "@/components/common/PricingCard";

export const Route = createFileRoute("/solutions/infrastructure")({
  head: () => ({
    meta: [
      { title: "Infrastructure & WebCare — XRAGENCY" },
      { name: "description", content: "Hébergement premium, monitoring 24/7, maintenance et sécurité." },
      { property: "og:title", content: "Infrastructure & WebCare — XRAGENCY" },
      { property: "og:description", content: "Hébergement, monitoring, sécurité." },
    ],
  }),
  component: InfraPage,
});

function InfraPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-gradient">Infrastructure & WebCare</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Hébergement edge cloud, monitoring 24/7, sauvegardes, mises à jour sécurité, support prioritaire.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid gap-8 lg:grid-cols-3">
        <PricingCard name="WebCare Essentiel" priceEur={29} period="month" features={[
          { text: "Mises à jour sécurité", included: true },
          { text: "Sauvegardes hebdomadaires", included: true },
          { text: "Monitoring uptime 24/7", included: true },
          { text: "Support email (48h)", included: true },
          { text: "Renouvellement domaine + SSL", included: true },
        ]} />
        <PricingCard name="WebCare Business" priceEur={59} period="month" popular features={[
          { text: "Tout Essentiel +", included: true },
          { text: "Modifications contenu (2h/mois)", included: true },
          { text: "Support prioritaire (24h)", included: true },
          { text: "Sauvegardes quotidiennes", included: true },
          { text: "Optimisations vitesse trimestrielles", included: true },
        ]} />
        <PricingCard name="WebCare Illimité" priceEur={99} period="month" features={[
          { text: "Tout Business +", included: true },
          { text: "Modifications illimitées", included: true },
          { text: "1 article SEO/mois", included: true },
          { text: "Support urgent (4h, 7j/7)", included: true },
          { text: "A/B testing + audit UX", included: true },
        ]} />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105">
          Souscrire <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
