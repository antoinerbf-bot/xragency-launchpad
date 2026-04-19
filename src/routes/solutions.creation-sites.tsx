import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { PricingCard } from "@/components/common/PricingCard";

export const Route = createFileRoute("/solutions/creation-sites")({
  head: () => ({
    meta: [
      { title: "Création de Sites Web Premium — XRAGENCY" },
      { name: "description", content: "Sites premium responsive, e-commerce, réservations. Pack Essentiel 499€, Performance 799€, Expérience 1099€." },
      { property: "og:title", content: "Création de Sites Web Premium — XRAGENCY" },
      { property: "og:description", content: "Sites sur-mesure de 499€ à 1099€. Livraison 3 à 21 jours." },
    ],
  }),
  component: WebPage,
});

function WebPage() {
  const { t, formatPrice } = useTranslation();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex rounded-full border border-border/60 glass px-3 py-1 text-xs font-medium text-foreground/80">
              {t("services.web.title")}
            </span>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
              <span className="text-gradient">Sites web qui convertissent</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Du site vitrine à la plateforme e-commerce complète. Design premium, performance Google PageSpeed
              {">"} 90, SSL, SEO technique de base, formation incluse. Livraison de 3 à 21 jours selon le pack.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INCLUS DANS TOUS LES PACKS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-3xl font-bold">Inclus dans tous les packs</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Design responsive (mobile, tablet, desktop)",
            "Optimisation vitesse Google PageSpeed > 90",
            "SSL / HTTPS sécurité",
            "Intégration Google Maps",
            "Liens réseaux sociaux",
            "Formulaire de contact fonctionnel",
            "SEO technique de base",
            "Formation 30 min (gestion contenu)",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-xl border border-border/60 bg-card/40 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span className="text-sm text-foreground/85">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">
            <span className="text-gradient">Choisissez votre pack</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Paiement unique. Pas d'abonnement caché.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <PricingCard
            name="Pack Essentiel"
            priceEur={499}
            period="once"
            features={[
              { text: "Site 4 pages (Accueil, Services, Galerie, Contact)", included: true },
              { text: "CMS simple (édition textes/images)", included: true },
              { text: "Click-to-call + WhatsApp intégré", included: true },
              { text: "Google Maps intégré", included: true },
              { text: "Livraison 3-5 jours", included: true },
              { text: "Blog", included: false },
              { text: "E-commerce", included: false },
            ]}
          />
          <PricingCard
            name="Pack Performance"
            priceEur={799}
            period="once"
            popular
            features={[
              { text: "Site 5-7 pages", included: true },
              { text: "Blog complet + 3 articles SEO rédigés (800 mots)", included: true },
              { text: "CMS avancé (WordPress / Webflow / custom)", included: true },
              { text: "Formulaires multiples + newsletter", included: true },
              { text: "SEO avancé (schema.org, breadcrumbs)", included: true },
              { text: "Livraison 7-10 jours", included: true },
              { text: "E-commerce", included: false },
            ]}
          />
          <PricingCard
            name="Pack Expérience"
            priceEur={1099}
            period="once"
            features={[
              { text: "Site sur-mesure jusqu'à 15 pages", included: true },
              { text: "E-commerce complet (Stripe, PayPal, Apple/Google Pay)", included: true },
              { text: "Réservations en ligne (calendrier, paiement)", included: true },
              { text: "Espace client (compte, historique)", included: true },
              { text: "API réseaux sociaux + CRM", included: true },
              { text: "Analytics avancé (GA4, Hotjar)", included: true },
              { text: "Livraison 14-21 jours", included: true },
            ]}
          />
        </div>
      </section>

      {/* WEBCARE */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">
            <span className="text-gradient">WebCare — Gestion mensuelle</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Votre site évolue avec votre business.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <PricingCard
            name="WebCare Essentiel"
            priceEur={29}
            period="month"
            features={[
              { text: "Mises à jour sécurité mensuelles", included: true },
              { text: "Sauvegardes hebdomadaires", included: true },
              { text: "Monitoring uptime 24/7", included: true },
              { text: "Support email (48h)", included: true },
              { text: "Renouvellement domaine + SSL", included: true },
              { text: "Modifications contenu", included: false },
            ]}
          />
          <PricingCard
            name="WebCare Business"
            priceEur={59}
            period="month"
            popular
            features={[
              { text: "Tout Essentiel +", included: true },
              { text: "Modifications contenu (2h/mois)", included: true },
              { text: "Support prioritaire (24h)", included: true },
              { text: "Sauvegardes quotidiennes", included: true },
              { text: "Optimisations vitesse trimestrielles", included: true },
              { text: "Rapport mensuel (trafic, performance)", included: true },
            ]}
          />
          <PricingCard
            name="WebCare Illimité"
            priceEur={99}
            period="month"
            features={[
              { text: "Tout Business +", included: true },
              { text: "Modifications illimitées", included: true },
              { text: "1 article SEO/mois (800 mots)", included: true },
              { text: "Support urgent (4h, 7j/7)", included: true },
              { text: "A/B testing (2/mois)", included: true },
              { text: "Audit UX trimestriel", included: true },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 text-center">
        <h2 className="text-3xl font-bold text-gradient">Prêt à démarrer ?</h2>
        <p className="mt-3 text-muted-foreground">
          Devis gratuit en 24h. Investissement à partir de {formatPrice(499)}.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
        >
          Lancer mon projet <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
