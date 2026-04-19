import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/solutions/ingenierie")({
  head: () => ({
    meta: [
      { title: "Ingénierie & Développement Sur-mesure — XRAGENCY" },
      { name: "description", content: "Plateformes complexes, intégrations API, ERP. Devis personnalisé." },
      { property: "og:title", content: "Ingénierie Sur-mesure — XRAGENCY" },
      { property: "og:description", content: "Plateformes, API, intégrations métier." },
    ],
  }),
  component: EngPage,
});

function EngPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-gradient">Ingénierie sur-mesure</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Plateformes SaaS, marketplaces, intégrations ERP/CRM, API publiques. Architecture cloud-native, scalable, sécurisée.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Plateformes SaaS", desc: "Stack moderne (React, TypeScript, Postgres). Auth, billing, multi-tenant." },
          { title: "Marketplaces", desc: "Vendeurs multiples, paiement split (Stripe Connect), modération." },
          { title: "Intégrations ERP/CRM", desc: "HubSpot, Salesforce, SAP, Odoo. Synchronisation temps réel." },
          { title: "APIs publiques", desc: "REST + GraphQL, documentation OpenAPI, rate limiting, monitoring." },
          { title: "Apps mobiles", desc: "React Native cross-platform iOS + Android." },
          { title: "Migrations", desc: "Refonte de systèmes legacy. Stratégie progressive sans downtime." },
        ].map((c, i) => (
          <div key={i} className="rounded-2xl border border-border/60 gradient-card p-6">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 text-center">
        <p className="text-lg text-muted-foreground">
          Projets à partir de 5 000€. TJM consulting senior : 850€/jour. Devis détaillé sous 48h après cadrage.
        </p>
        <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105">
          Cadrage gratuit (1h) <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
