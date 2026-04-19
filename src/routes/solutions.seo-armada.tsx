import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, TrendingUp, Search, Target, BarChart3 } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { PricingCard } from "@/components/common/PricingCard";

export const Route = createFileRoute("/solutions/seo-armada")({
  head: () => ({
    meta: [
      { title: "SEO Armada — Dominez Google | XRAGENCY" },
      { name: "description", content: "Stratégie SEO premium : volume IA + qualité humaine. À partir de 199€/mois. ROI moyen +340% en 12 mois." },
      { property: "og:title", content: "SEO Armada — Dominez Google" },
      { property: "og:description", content: "Volume IA + qualité humaine. Top Google durable." },
    ],
  }),
  component: SEOPage,
});

function SEOPage() {
  const { t } = useTranslation();
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-accent-purple/20 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-flex rounded-full border border-border/60 glass px-3 py-1 text-xs font-medium text-foreground/80">
              SEO Armada
            </span>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
              <span className="text-gradient">Dominez Google. Sans publicité.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Notre stratégie unique : <strong className="text-foreground">Volume IA + Qualité humaine</strong>.
              L'IA génère, nos rédacteurs révisent, Google adore. Trafic organique durable, ROI cumulatif.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AVANT/APRÈS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-3xl font-bold text-center">Avant / Après XRAGENCY</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8">
            <h3 className="text-lg font-semibold text-destructive">❌ Avant</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              <li>• Site invisible sur Google</li>
              <li>• ~50 visiteurs/mois</li>
              <li>• 0 demande de devis organique</li>
              <li>• Budget Google Ads : 800€/mois</li>
              <li>• ROI : négatif</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-success/30 bg-success/5 p-8">
            <h3 className="text-lg font-semibold text-success">✅ Après 6 mois</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              <li>• Top 3 Google sur 15+ mots-clés</li>
              <li>• 2 400 visiteurs qualifiés/mois</li>
              <li>• 45 demandes de devis/mois</li>
              <li>• Budget Ads divisé par 4 : 200€/mois</li>
              <li>• ROI : +420%</li>
            </ul>
          </div>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-3xl font-bold text-center text-gradient">Notre méthode en 4 étapes</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Search, title: "Audit & mots-clés", desc: "Analyse complète + 100 mots-clés cibles" },
            { icon: Target, title: "Stratégie cluster", desc: "Cocons sémantiques + planning 6 mois" },
            { icon: TrendingUp, title: "Production IA + humain", desc: "8 à 50 articles/mois selon formule" },
            { icon: BarChart3, title: "Suivi & ajustements", desc: "Reporting mensuel + call stratégique" },
          ].map((step, i) => (
            <div key={i} className="rounded-2xl border border-border/60 gradient-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-xs font-semibold text-primary">ÉTAPE {i + 1}</div>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gradient">Formules mensuelles</h2>
          <p className="mt-3 text-muted-foreground">Sans engagement. Résiliable à tout moment.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <PricingCard
            name="SEO Local"
            priceEur={199}
            period="month"
            features={[
              { text: "8 articles SEO/mois (800-1000 mots)", included: true },
              { text: "Mots-clés locaux (ville)", included: true },
              { text: "Optimisation Google My Business", included: true },
              { text: "Citations locales (annuaires)", included: true },
              { text: "Rapport mensuel", included: true },
              { text: "Netlinking", included: false },
            ]}
          />
          <PricingCard
            name="SEO Boost"
            priceEur={349}
            period="month"
            popular
            features={[
              { text: "20 articles SEO/mois", included: true },
              { text: "Mots-clés nationaux + locaux", included: true },
              { text: "Optimisation technique avancée", included: true },
              { text: "Netlinking (5 backlinks qualité/mois)", included: true },
              { text: "Rapport détaillé + opportunités", included: true },
              { text: "Call stratégique mensuel", included: true },
            ]}
          />
          <PricingCard
            name="SEO Pro"
            priceEur={549}
            period="month"
            features={[
              { text: "50+ articles SEO/mois", included: true },
              { text: "Stratégie internationale (multilingue)", included: true },
              { text: "Core Web Vitals + technique avancée", included: true },
              { text: "Netlinking premium (15 backlinks DA>30)", included: true },
              { text: "Stratégie cluster avancée", included: true },
              { text: "Rapport hebdomadaire + call bi-mensuel", included: true },
            ]}
          />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <PricingCard
            name="Résidence Locale (annuel)"
            priceEur={1699}
            period="year"
            features={[
              { text: "Équivalent SEO Local mensuel (économie 689€)", included: true },
              { text: "Audit technique complet (valeur 299€)", included: true },
              { text: "2 articles evergreen bonus (2000 mots)", included: true },
              { text: "GMB premium", included: true },
            ]}
          />
          <PricingCard
            name="Empire National (annuel)"
            priceEur={3299}
            period="year"
            features={[
              { text: "Équivalent SEO Boost (économie 889€)", included: true },
              { text: "Audit concurrence approfondi (valeur 499€)", included: true },
              { text: "Stratégie 12 mois personnalisée", included: true },
              { text: "5 articles premium bonus + 10 backlinks bonus", included: true },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 text-center">
        <h2 className="text-3xl font-bold text-gradient">Audit SEO gratuit en 24h</h2>
        <p className="mt-3 text-muted-foreground">
          Recevez votre plan d'action complet avec mots-clés et potentiel de trafic.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
        >
          Demander mon audit <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
