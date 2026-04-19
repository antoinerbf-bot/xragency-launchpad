import { createFileRoute } from "@tanstack/react-router";
import { Globe, Clock, Users, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — XRAGENCY" },
      { name: "description", content: "Agence digitale internationale. Paris · NY · London · Tokyo. Réactivité 24/7 sur 4 continents." },
      { property: "og:title", content: "À propos — XRAGENCY" },
      { property: "og:description", content: "Agence premium · 4 continents · 12 fuseaux horaires." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl max-w-3xl">
            <span className="text-gradient">L'agence que vous attendiez</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            XRAGENCY est une agence digitale internationale positionnée sur le luxe, la performance et l'innovation.
            Nous combinons la précision du conseil stratégique, la créativité de la direction artistique et la puissance
            de l'ingénierie technique pour livrer des expériences digitales qui dominent leur marché.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Globe, label: "12 pays", desc: "Clients sur 4 continents" },
          { icon: Clock, label: "24h/24", desc: "Réactivité garantie" },
          { icon: Users, label: "200+", desc: "Marques accompagnées" },
          { icon: Award, label: "+340%", desc: "ROI client moyen" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-border/60 gradient-card p-6 text-center">
            <s.icon className="mx-auto h-6 w-6 text-primary" />
            <div className="mt-3 text-3xl font-extrabold text-gradient">{s.label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 space-y-12">
        <div>
          <h2 className="text-3xl font-bold text-gradient">Nos bureaux</h2>
          <p className="mt-3 text-muted-foreground">
            🌍 Paris · New York · London · Tokyo. Une équipe répartie sur 4 continents et 12 fuseaux horaires.
            Quand vous dormez, on continue. Quand vous écrivez, on répond.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gradient">Nos valeurs</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li className="rounded-2xl border border-border/60 bg-card/40 p-5">
              <h3 className="font-semibold">Excellence</h3>
              <p className="mt-1 text-sm text-muted-foreground">Pas de compromis sur la qualité. Chaque livrable est pensé pour durer.</p>
            </li>
            <li className="rounded-2xl border border-border/60 bg-card/40 p-5">
              <h3 className="font-semibold">Transparence</h3>
              <p className="mt-1 text-sm text-muted-foreground">Tarifs publics, processus documentés, reporting complet.</p>
            </li>
            <li className="rounded-2xl border border-border/60 bg-card/40 p-5">
              <h3 className="font-semibold">Performance</h3>
              <p className="mt-1 text-sm text-muted-foreground">Le design ne sert à rien sans résultats. Tout est mesuré.</p>
            </li>
            <li className="rounded-2xl border border-border/60 bg-card/40 p-5">
              <h3 className="font-semibold">Innovation</h3>
              <p className="mt-1 text-sm text-muted-foreground">IA, automatisation, edge computing. Toujours en avance.</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
