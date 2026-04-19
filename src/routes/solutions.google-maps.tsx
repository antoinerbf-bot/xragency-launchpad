import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, MapPin, Star, Phone, TrendingUp } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { PricingCard } from "@/components/common/PricingCard";

export const Route = createFileRoute("/solutions/google-maps")({
  head: () => ({
    meta: [
      { title: "Google Maps Top 3 Local — XRAGENCY" },
      { name: "description", content: "Apparaissez dans le Top 3 Google Maps. 46% des recherches sont locales. À partir de 999€/an." },
      { property: "og:title", content: "Google Maps Top 3 Local — XRAGENCY" },
      { property: "og:description", content: "3x plus d'appels, 5x plus de visites." },
    ],
  }),
  component: MapsPage,
});

function MapsPage() {
  const { t, formatPrice } = useTranslation();
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-flex rounded-full border border-border/60 glass px-3 py-1 text-xs font-medium text-foreground/80">
              Google Maps · Top 3 Local
            </span>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
              <span className="text-gradient">Apparaissez "près de chez moi"</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              <strong className="text-foreground">46%</strong> des recherches Google ont une intention locale.
              Le Top 3 du Pack Local capte <strong className="text-foreground">80%</strong> des clics. Soyez-en.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SIMULATION TOP 3 */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
        <h2 className="text-2xl font-bold">Exemple : recherche "dentiste marseille"</h2>
        <div className="mt-6 rounded-2xl border border-border/60 gradient-card p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">📍 Pack Local Google</div>
          <div className="mt-4 space-y-3">
            {[
              { name: "Cabinet Dentaire Vieux-Port", reviews: "127 avis ★★★★★", badge: "TOP 1 🏆" },
              { name: "Clinique Dentaire Marseille", reviews: "89 avis ★★★★★", badge: "TOP 2 🥈" },
              { name: "Dentiste Joliette", reviews: "65 avis ★★★★", badge: "TOP 3 🥉" },
            ].map((it, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-border/60 bg-card/40 p-4">
                <div>
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-xs text-muted-foreground">{it.reviews} · 2.3 km · Ouvert</div>
                </div>
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">{it.badge}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            👆 Ces 3 fiches captent 80 % des clics. Les autres sont invisibles sans scroll.
          </p>
        </div>
      </section>

      {/* MÉTHODE 5 ÉTAPES */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-3xl font-bold text-center text-gradient">Comment on y arrive (5 étapes)</h2>
        <div className="mt-12 space-y-4">
          {[
            { title: "Optimisation Fiche Google Business", desc: "Catégories, horaires, photos HD, descriptions, attributs", duration: "J+0 à J+7" },
            { title: "Stratégie Avis Clients", desc: "Campagne d'acquisition d'avis 5 étoiles éthique", duration: "J+7 à M+2" },
            { title: "Citations & NAP", desc: "Inscription dans 50+ annuaires (Nom, Adresse, Téléphone cohérents)", duration: "M+1 à M+2" },
            { title: "Contenu géo-localisé", desc: "Articles SEO avec mots-clés locaux pointant vers la fiche", duration: "M+2 à M+4" },
            { title: "Monitoring & ajustements", desc: "Suivi positions quotidien, réponses avis, optimisations", duration: "M+3 à M+6" },
          ].map((step, i) => (
            <div key={i} className="flex gap-4 rounded-2xl border border-border/60 gradient-card p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <span className="text-xs font-semibold text-primary">{step.duration}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gradient">Tarification transparente</h2>
          <p className="mt-3 text-muted-foreground">Variables selon ville × concurrence. Audit gratuit pour devis exact.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <PricingCard
            name="Petite ville"
            priceEur={999}
            period="year"
            features={[
              { text: "< 50 000 habitants", included: true },
              { text: "Optimisation GMB complète", included: true },
              { text: "50+ citations annuaires", included: true },
              { text: "Réponses avis incluses", included: true },
              { text: "Reporting mensuel", included: true },
            ]}
          />
          <PricingCard
            name="Ville moyenne"
            priceEur={1299}
            period="year"
            popular
            features={[
              { text: "50 000 à 200 000 hab.", included: true },
              { text: "Tout Petite ville +", included: true },
              { text: "Stratégie avis renforcée", included: true },
              { text: "Contenu géo-localisé bonus", included: true },
              { text: "Call mensuel inclus", included: true },
            ]}
          />
          <PricingCard
            name="Grande ville"
            priceEur={1599}
            period="year"
            features={[
              { text: "> 200 000 habitants", included: true },
              { text: "Concurrence forte gérée", included: true },
              { text: "Optimisation multi-quartiers", included: true },
              { text: "Backlinks locaux premium", included: true },
            ]}
          />
          <PricingCard
            name="Paris/Lyon/Marseille"
            priceEur={1899}
            period="year"
            features={[
              { text: "Hyper-concurrence métropole", included: true },
              { text: "Stratégie complète métropole", included: true },
              { text: "Acquisition avis intensive", included: true },
              { text: "Support prioritaire", included: true },
            ]}
          />
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          + ajustement selon concurrence : faible +0€, moyenne +200€, forte +500€, très forte +800€
        </p>
      </section>

      {/* ROI */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        <div className="rounded-3xl border border-primary/40 gradient-card p-8 md:p-12 shadow-elegant">
          <h2 className="text-2xl font-bold text-gradient">Exemple de ROI : Restaurant Nice</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Phone, label: "Appels supplémentaires/mois", value: "+120" },
              { icon: TrendingUp, label: "Réservations/mois", value: "+48" },
              { icon: Star, label: "Revenu additionnel/mois", value: "+936€" },
              { icon: MapPin, label: "ROI annuel", value: "+525%" },
            ].map((m, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-card/40 p-4">
                <m.icon className="h-5 w-5 text-primary" />
                <div className="mt-2 text-2xl font-bold text-gradient">{m.value}</div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            💡 Investissement {formatPrice(1799)}/an. Rentabilité dès le 2ᵉ mois.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 text-center">
        <h2 className="text-3xl font-bold text-gradient">Audit gratuit + devis exact</h2>
        <p className="mt-3 text-muted-foreground">Réponse sous 24h avec analyse de votre position actuelle.</p>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
        >
          Recevoir mon audit <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
