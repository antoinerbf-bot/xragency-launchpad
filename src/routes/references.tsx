import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";

export const Route = createFileRoute("/references")({
  head: () => ({
    meta: [
      { title: "Références & Cas Clients — XRAGENCY" },
      { name: "description", content: "Découvrez nos résultats : ROI moyen +340%, 200+ clients dans 12 pays." },
      { property: "og:title", content: "Références — XRAGENCY" },
      { property: "og:description", content: "Cas clients premium, résultats mesurables." },
    ],
  }),
  component: RefPage,
});

const cases = [
  { name: "Restaurant Le Méridien", sector: "Gastronomie · Nice", result: "+525% ROI · Top 1 Google Maps", quote: "Réservations multipliées par 4 en 6 mois." },
  { name: "Cabinet Dentaire VP", sector: "Santé · Marseille", result: "127 nouveaux patients/an", quote: "Le Top 3 a tout changé." },
  { name: "Maison Lefèvre", sector: "Luxe · Paris", result: "+340% trafic SEO en 12 mois", quote: "Stratégie SEO d'un autre niveau." },
  { name: "Hôtel Belvédère", sector: "Hospitalité · Cannes", result: "+78% bookings directs", quote: "On a quitté Booking, l'agence a tout reconstruit." },
  { name: "Avocats & Associés", sector: "Juridique · Lyon", result: "Top 3 sur 22 mots-clés", quote: "Notre agenda est plein 6 mois à l'avance." },
  { name: "TechStart SaaS", sector: "Tech · Tokyo", result: "MVP livré en 18 jours", quote: "Vélocité et qualité au rendez-vous." },
];

function RefPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-gradient">Résultats. Pas des promesses.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
            ROI moyen <strong className="text-foreground">+340%</strong> · 200+ clients dans 12 pays · Note client moyenne 4.9/5.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => (
          <div key={i} className="rounded-2xl border border-border/60 gradient-card p-6">
            <div className="flex gap-1 text-warning">
              {[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{c.name}</h3>
            <p className="text-xs text-muted-foreground">{c.sector}</p>
            <div className="mt-4 rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">{c.result}</div>
            <p className="mt-4 text-sm italic text-foreground/80">"{c.quote}"</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105">
          Devenir notre prochain succès <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
