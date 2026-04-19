import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Zap, MessageSquare } from "lucide-react";
import { PricingCard } from "@/components/common/PricingCard";

export const Route = createFileRoute("/solutions/ia-automatisation")({
  head: () => ({
    meta: [
      { title: "IA & Automatisation — XRAGENCY" },
      { name: "description", content: "Chatbots 24/7, automatisations IA, gain de productivité. À partir de 299€/mois." },
      { property: "og:title", content: "IA & Automatisation — XRAGENCY" },
      { property: "og:description", content: "Économie 2200€/mois vs humain." },
    ],
  }),
  component: AIPage,
});

function AIPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-gradient">L'IA qui travaille pour vous 24/7</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Chatbots intelligents, qualification automatique de leads, automatisations métier. Économisez jusqu'à 2 200€/mois vs un humain.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Bot, title: "Chatbot 24/7", desc: "Qualifie vos leads automatiquement, répond aux FAQ, prend des RDV." },
            { icon: Zap, title: "Automatisations", desc: "Connexion CRM, emails personnalisés, workflows Make/n8n/Zapier." },
            { icon: MessageSquare, title: "Assistants IA dédiés", desc: "Entraînés sur votre base de connaissances. Voix + texte." },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-border/60 gradient-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid gap-8 lg:grid-cols-3">
        <PricingCard name="Chatbot Starter" priceEur={299} period="month" features={[
          { text: "Chatbot site web", included: true },
          { text: "1 base de connaissances (FAQ, services)", included: true },
          { text: "Capture leads + email auto", included: true },
          { text: "500 conversations/mois", included: true },
          { text: "Multi-langue (6 langues)", included: false },
        ]} />
        <PricingCard name="IA Boost" priceEur={599} period="month" popular features={[
          { text: "Chatbot multi-canal (web, WhatsApp, FB)", included: true },
          { text: "Qualification leads avancée", included: true },
          { text: "Connexion CRM (HubSpot, Pipedrive)", included: true },
          { text: "Multi-langue (6 langues)", included: true },
          { text: "Conversations illimitées", included: true },
        ]} />
        <PricingCard name="IA Pro" priceEur={1299} period="month" features={[
          { text: "Tout IA Boost +", included: true },
          { text: "Voice agent (réception téléphonique IA)", included: true },
          { text: "Automatisations sur-mesure (workflows)", included: true },
          { text: "Tableau de bord analytics avancé", included: true },
          { text: "Support dédié + formation équipe", included: true },
        ]} />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105">
          Démo gratuite <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
