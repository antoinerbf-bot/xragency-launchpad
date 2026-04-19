import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PricingCard } from "@/components/common/PricingCard";

export const Route = createFileRoute("/solutions/community-management")({
  head: () => ({
    meta: [
      { title: "Community Management — XRAGENCY" },
      { name: "description", content: "Stratégie sociale premium, contenu original, croissance audience. À partir de 399€/mois." },
      { property: "og:title", content: "Community Management — XRAGENCY" },
      { property: "og:description", content: "Stratégie + création + animation 7j/7." },
    ],
  }),
  component: CMPage,
});

function CMPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-gradient">Community Management Premium</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Stratégie éditoriale, création de contenu, animation 7j/7. Instagram, LinkedIn, TikTok, Facebook.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid gap-8 lg:grid-cols-3">
        <PricingCard name="Starter" priceEur={399} period="month" features={[
          { text: "1 réseau (au choix)", included: true },
          { text: "12 publications/mois", included: true },
          { text: "Stratégie éditoriale", included: true },
          { text: "Modération messages", included: true },
          { text: "Reporting mensuel", included: true },
          { text: "Création vidéo Reels/Shorts", included: false },
        ]} />
        <PricingCard name="Boost" priceEur={799} period="month" popular features={[
          { text: "2 réseaux", included: true },
          { text: "24 publications/mois", included: true },
          { text: "8 Reels/Shorts vidéo", included: true },
          { text: "Stratégie + planning éditorial", included: true },
          { text: "Modération + interactions", included: true },
          { text: "Rapport bi-mensuel + call", included: true },
        ]} />
        <PricingCard name="Pro" priceEur={1499} period="month" features={[
          { text: "3-4 réseaux", included: true },
          { text: "40+ publications/mois", included: true },
          { text: "20 Reels/Shorts professionnels", included: true },
          { text: "Stratégie influenceurs incluse", included: true },
          { text: "Community manager dédié", included: true },
          { text: "Reporting hebdomadaire", included: true },
        ]} />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105">
          Démarrer ma stratégie <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
