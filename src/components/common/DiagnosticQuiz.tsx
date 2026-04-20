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

interface RecoMeta {
  packKey: string;
  badgeKey: string;
}

const SECTORS: { key: Sector; Icon: typeof Building2 }[] = [
  { key: "ecommerce", Icon: Store },
  { key: "restaurant", Icon: Utensils },
  { key: "services", Icon: Briefcase },
  { key: "health", Icon: Heart },
  { key: "education", Icon: GraduationCap },
  { key: "other", Icon: Building2 },
];

const GOALS: { key: Goal; Icon: typeof TrendingUp }[] = [
  { key: "visibility", Icon: Search },
  { key: "leads", Icon: Users },
  { key: "sales", Icon: TrendingUp },
  { key: "automation", Icon: Bot },
];

const URGENCIES: { key: Urgency; Icon: typeof Clock }[] = [
  { key: "now", Icon: Zap },
  { key: "month", Icon: Calendar },
  { key: "quarter", Icon: CalendarRange },
];

function recommend(state: QuizState): RecoMeta {
  const { goal, urgency, sector } = state;
  if (goal === "visibility") {
    return {
      packKey: "domination",
      badgeKey: urgency === "now" ? "fast" : "recommended",
    };
  }
  if (goal === "automation") {
    return { packKey: "ai", badgeKey: "innovation" };
  }
  if (goal === "sales") {
    return {
      packKey: sector === "ecommerce" ? "ecom" : "conversion",
      badgeKey: "bestseller",
    };
  }
  return {
    packKey: "leadgen",
    badgeKey: urgency === "now" ? "priority" : "complete",
  };
}

export function DiagnosticQuiz() {
  const { t, language, currency } = useTranslation();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<QuizState>({ sector: null, goal: null, urgency: null });
  const [contact, setContact] = useState({ name: "", email: "", phone: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const ContactSchema = z.object({
    name: z.string().trim().min(1, t("quiz.error.name")).max(120),
    email: z.string().trim().email(t("quiz.error.email")).max(200),
    phone: z.string().trim().max(50).optional(),
    company: z.string().trim().max(150).optional(),
  });

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
          message: `[Diagnostic] Pack: ${t(`quiz.pack.${reco.packKey}.title`)} | Goal: ${state.goal} | Urgency: ${state.urgency}`,
          source: "diagnostic",
          language,
          currency,
        },
      });
      if (res?.success) {
        setDone(true);
        toast.success(t("quiz.success.toast"));
      } else {
        toast.error(t("quiz.error.send"));
      }
    } catch {
      toast.error(t("quiz.error.network"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-20 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 glass px-4 py-1.5 text-xs font-medium text-foreground/80">
          <Sparkles className="h-3 w-3 text-primary" />
          {t("quiz.eyebrow")}
        </span>
        <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
          <span className="text-gradient">{t("quiz.title")}</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("quiz.subtitle")}</p>
      </div>

      <div className="mt-12 overflow-hidden rounded-3xl border border-border/60 gradient-card p-8 md:p-12">
        {!done && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {t("quiz.step")} {Math.min(step + 1, 4)} {t("quiz.of")} 4
              </span>
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
          {step === 0 && (
            <motion.div
              key="sector"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-foreground">{t("quiz.q1.title")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("quiz.q1.subtitle")}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SECTORS.map(({ key, Icon }) => (
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
                    <span className="text-sm font-medium text-foreground">
                      {t(`quiz.sector.${key}`)}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-foreground">{t("quiz.q2.title")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("quiz.q2.subtitle")}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {GOALS.map(({ key, Icon }) => (
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
                      <div className="text-sm font-semibold text-foreground">
                        {t(`quiz.goal.${key}`)}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {t(`quiz.goal.${key}.desc`)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="urgency"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-foreground">{t("quiz.q3.title")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("quiz.q3.subtitle")}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {URGENCIES.map(({ key, Icon }) => (
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
                      <div className="text-sm font-semibold text-foreground">
                        {t(`quiz.urgency.${key}`)}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {t(`quiz.urgency.${key}.desc`)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

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
                    {t(`quiz.badge.${reco.badgeKey}`)}
                  </span>
                  <span className="text-xs text-muted-foreground">{t("quiz.reco.badge")}</span>
                </div>
                <h3 className="mt-4 text-3xl font-extrabold text-foreground">
                  {t(`quiz.pack.${reco.packKey}.title`)}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {t(`quiz.pack.${reco.packKey}.desc`)}
                </p>
                <div className="mt-4 text-2xl font-bold text-gradient">
                  {t(`quiz.pack.${reco.packKey}.price`)}
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {(["s1", "s2", "s3"] as const).map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {t(`quiz.pack.${reco.packKey}.${s}`)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-foreground">
                  {t("quiz.reco.contactTitle")}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("quiz.reco.contactSubtitle")}
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder={t("quiz.field.name")}
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder={t("quiz.field.email")}
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder={t("quiz.field.phone")}
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder={t("quiz.field.company")}
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
                    <ArrowLeft className="h-4 w-4" /> {t("quiz.reco.back")}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-60 sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> {t("quiz.reco.sending")}
                      </>
                    ) : (
                      <>
                        {t("quiz.reco.submit")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

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
              <h3 className="mt-6 text-3xl font-extrabold text-foreground">
                {t("quiz.done.title")}
              </h3>
              <p className="mt-3 text-muted-foreground">
                {t("quiz.done.subtitle")}{" "}
                <span className="font-semibold text-foreground">
                  {reco ? t(`quiz.pack.${reco.packKey}.title`) : ""}
                </span>
                .
              </p>
              <button
                onClick={reset}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-card"
              >
                {t("quiz.done.restart")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
