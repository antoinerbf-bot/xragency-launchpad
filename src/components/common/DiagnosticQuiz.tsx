import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Building2,
  Store,
  Briefcase,
  Utensils,
  Heart,
  GraduationCap,
  TrendingUp,
  Users,
  Bot,
  Search,
  Globe,
  Zap,
  Clock,
  Calendar,
  CalendarRange,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslation } from "@/contexts/LanguageContext";
import { submitLead } from "@/server/leads";

type Sector = "ecommerce" | "restaurant" | "services" | "health" | "education" | "other";
type Goal = "visibility" | "leads" | "sales" | "automation";
type Urgency = "now" | "month" | "quarter";

interface QuizState {
  sector: Sector | null;
  goal: Goal | null;
  urgency: Urgency | null;
}

interface Recommendation {
  packKey: string;
  title: string;
  desc: string;
  price: string;
  services: string[];
  badge: string;
}

const SECTORS: { key: Sector; label: string; Icon: typeof Building2 }[] = [
  { key: "ecommerce", label: "E-commerce", Icon: Store },
  { key: "restaurant", label: "Restaurant / Hôtellerie", Icon: Utensils },
  { key: "services", label: "Services B2B / B2C", Icon: Briefcase },
  { key: "health", label: "Santé / Bien-être", Icon: Heart },
  { key: "education", label: "Éducation / Formation", Icon: GraduationCap },
  { key: "other", label: "Autre secteur", Icon: Building2 },
];

const GOALS: { key: Goal; label: string; desc: string; Icon: typeof TrendingUp }[] = [
  { key: "visibility", label: "Plus de visibilité", desc: "SEO, Google Maps, notoriété", Icon: Search },
  { key: "leads", label: "Plus de prospects", desc: "Génération de leads qualifiés", Icon: Users },
  { key: "sales", label: "Plus de ventes", desc: "Site optimisé conversion", Icon: TrendingUp },
  { key: "automation", label: "Automatiser mon business", desc: "IA, chatbots, workflows", Icon: Bot },
];

const URGENCIES: { key: Urgency; label: string; desc: string; Icon: typeof Clock }[] = [
  { key: "now", label: "Immédiat", desc: "Je veux démarrer cette semaine", Icon: Zap },
  { key: "month", label: "Dans le mois", desc: "Planifier sous 30 jours", Icon: Calendar },
  { key: "quarter", label: "Sous 3 mois", desc: "Préparer en amont", Icon: CalendarRange },
];

function recommend(state: QuizState): Recommendation {
  const { goal, urgency, sector } = state;

  // Pack Domination — visibility focus
  if (goal === "visibility") {
    return {
      packKey: "domination",
      title: "Pack Domination Locale",
      desc: "SEO Armada + Google Maps Top 3 pour écraser la concurrence locale.",
      price: "à partir de 1 490€/mois",
      services: ["SEO Armada", "Google Maps Top 3", "Site optimisé"],
      badge: urgency === "now" ? "Démarrage rapide" : "Recommandé",
    };
  }

  if (goal === "automation") {
    return {
      packKey: "ai",
      title: "Pack IA & Automatisation",
      desc: "Chatbot 24/7, qualification auto des leads, gain de productivité massif.",
      price: "à partir de 990€ + 290€/mois",
      services: ["Assistant IA", "Automatisations", "Intégrations"],
      badge: "Innovation",
    };
  }

  if (goal === "sales") {
    const isEcom = sector === "ecommerce";
    return {
      packKey: isEcom ? "ecom" : "conversion",
      title: isEcom ? "Pack E-commerce Premium" : "Pack Conversion Pro",
      desc: isEcom
        ? "Boutique premium + tunnel optimisé + SEO produit."
        : "Site haute conversion + SEO + tracking complet.",
      price: isEcom ? "à partir de 2 490€" : "à partir de 1 890€",
      services: isEcom
        ? ["Site e-commerce", "SEO", "Optimisation tunnel"]
        : ["Site premium", "SEO", "Analytics"],
      badge: "Best-seller",
    };
  }

  // leads
  return {
    packKey: "leadgen",
    title: "Pack Génération de Leads",
    desc: "Site magnétique + SEO + Maps + qualification IA = pipeline qualifié 24/7.",
    price: "à partir de 1 990€ + 490€/mois",
    services: ["Site premium", "SEO + Maps", "IA qualification"],
    badge: urgency === "now" ? "Priorité absolue" : "Complet",
  };
}

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(120),
  email: z.string().trim().email("Email invalide").max(200),
  phone: z.string().trim().max(50).optional(),
  company: z.string().trim().max(150).optional(),
});

export function DiagnosticQuiz() {
  const { t, language, currency } = useTranslation();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<QuizState>({ sector: null, goal: null, urgency: null });
  const [contact, setContact] = useState({ name: "", email: "", phone: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const progress = ((step + 1) / 4) * 100;
  const reco = state.sector && state.goal && state.urgency ? recommend(state) : null;

  const reset = () => {
    setStep(0);
    setState({ sector: null, goal: null, urgency: null });
    setContact({ name: "", email: "", phone: "", company: "" });
    setDone(false);
  };

  const handleSubmit = async () => {
    const parsed = ContactSchema.safeParse(contact);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (!reco) return;
    setSubmitting(true);
    try {
      const res = await submitLead({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || null,
          company: parsed.data.company || null,
          sector: state.sector,
          service: reco.packKey,
          message: `[Diagnostic] Pack: ${reco.title} | Objectif: ${state.goal} | Urgence: ${state.urgency}`,
          source: "diagnostic",
          language,
          currency,
        },
      });
      if (res?.success) {
        setDone(true);
        toast.success("Diagnostic envoyé ! Nous vous recontactons sous 24h.");
      } else {
        toast.error("Erreur lors de l'envoi. Réessayez.");
      }
    } catch {
      toast.error("Erreur réseau. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-20 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 glass px-4 py-1.5 text-xs font-medium text-foreground/80">
          <Sparkles className="h-3 w-3 text-primary" />
          Diagnostic gratuit · 60 secondes
        </span>
        <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
          <span className="text-gradient">Quel pack vous correspond ?</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Répondez à 3 questions, recevez une recommandation sur-mesure et un audit offert.
        </p>
      </div>

      <div className="mt-12 overflow-hidden rounded-3xl border border-border/60 gradient-card p-8 md:p-12">
        {/* Progress bar */}
        {!done && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Étape {Math.min(step + 1, 4)} / 4</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border/40">
              <motion.div
                className="h-full gradient-primary"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 0: SECTOR */}
          {step === 0 && (
            <motion.div
              key="sector"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-foreground">Votre secteur ?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pour adapter notre stratégie à votre marché.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SECTORS.map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setState((s) => ({ ...s, sector: key }));
                      setStep(1);
                    }}
                    className={`group flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                      state.sector === key
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-border/60 bg-card/40 hover:border-primary/50 hover:bg-card"
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1: GOAL */}
          {step === 1 && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-foreground">Votre objectif principal ?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Le KPI numéro 1 que vous voulez faire exploser.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {GOALS.map(({ key, label, desc, Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setState((s) => ({ ...s, goal: key }));
                      setStep(2);
                    }}
                    className={`group flex items-start gap-4 rounded-xl border p-5 text-left transition ${
                      state.goal === key
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-border/60 bg-card/40 hover:border-primary/50 hover:bg-card"
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{label}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: URGENCY */}
          {step === 2 && (
            <motion.div
              key="urgency"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-foreground">Quelle urgence ?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pour prioriser votre dossier dans notre planning.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {URGENCIES.map(({ key, label, desc, Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setState((s) => ({ ...s, urgency: key }));
                      setStep(3);
                    }}
                    className={`group flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition ${
                      state.urgency === key
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-border/60 bg-card/40 hover:border-primary/50 hover:bg-card"
                    }`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{label}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: RECOMMENDATION + CONTACT */}
          {step === 3 && reco && !done && (
            <motion.div
              key="reco"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="rounded-2xl border border-primary/40 gradient-hero p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                    <Sparkles className="h-3 w-3" />
                    {reco.badge}
                  </span>
                  <span className="text-xs text-muted-foreground">Recommandation personnalisée</span>
                </div>
                <h3 className="mt-4 text-3xl font-extrabold text-foreground">{reco.title}</h3>
                <p className="mt-2 text-muted-foreground">{reco.desc}</p>
                <div className="mt-4 text-2xl font-bold text-gradient">{reco.price}</div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {reco.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-foreground">
                  Recevez votre audit offert + chiffrage détaillé
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Réponse personnalisée sous 24h. Sans engagement.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Nom complet *"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone (optionnel)"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Entreprise (optionnel)"
                    value={contact.company}
                    onChange={(e) => setContact({ ...contact, company: e.target.value })}
                    className="rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" /> Modifier mes réponses
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-60 sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Envoi...
                      </>
                    ) : (
                      <>
                        Recevoir mon audit
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* DONE */}
          {done && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-glow">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-3xl font-extrabold text-foreground">Diagnostic envoyé !</h3>
              <p className="mt-3 text-muted-foreground">
                Notre équipe vous recontacte sous 24h avec votre audit personnalisé et le chiffrage du{" "}
                <span className="font-semibold text-foreground">{reco?.title}</span>.
              </p>
              <button
                onClick={reset}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-card"
              >
                Refaire le diagnostic
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
