import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Globe, Search, MapPin, Palette, Users, Bot, Cpu, Server, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { services } from "@/data/services";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Search, MapPin, Palette, Users, Bot, Cpu, Server,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XRAGENCY — Agence d'Innovation Digitale Premium" },
      {
        name: "description",
        content: "Web, SEO, Google Maps, IA. Agence internationale premium. Paris · NY · London · Tokyo. Audit gratuit en 24h.",
      },
      { property: "og:title", content: "XRAGENCY — Agence d'Innovation Digitale Premium" },
      { property: "og:description", content: "Web, SEO, IA. Premium · Performance · Innovation." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-accent-purple/20 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-32 md:px-8 md:pt-32 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 glass px-4 py-1.5 text-xs font-medium text-foreground/80">
              <Sparkles className="h-3 w-3 text-primary" />
              {t("hero.eyebrow")}
            </span>
            <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
              <span className="text-gradient">{t("hero.title")}</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
              >
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-8 py-4 text-sm font-semibold text-foreground transition hover:bg-card"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid gap-6 sm:grid-cols-3"
          >
            {[t("hero.stat1"), t("hero.stat2"), t("hero.stat3")].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/60 glass p-6 text-center"
              >
                <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground/90">{stat}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            <span className="text-gradient">{t("services.title")}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("services.subtitle")}</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => {
            const Icon = ICONS[s.icon] ?? Globe;
            return (
              <motion.div
                key={s.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  to={s.href}
                  className="group block h-full rounded-2xl border border-border/60 gradient-card p-6 transition hover:border-primary/50 hover:shadow-elegant"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{t(s.titleKey)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(s.descKey)}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                    {t("services.learnMore")} <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 gradient-card p-12 text-center md:p-20">
          <div className="absolute inset-0 gradient-hero opacity-50" />
          <div className="absolute -top-20 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
          <div className="relative">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              <span className="text-gradient">{t("cta.title")}</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("cta.subtitle")}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
            >
              {t("cta.button")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
