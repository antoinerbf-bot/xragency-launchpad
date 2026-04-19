import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Search, MapPin, Palette, Users, Bot, Cpu, Server } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { services } from "@/data/services";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Search, MapPin, Palette, Users, Bot, Cpu, Server,
};

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions — XRAGENCY" },
      { name: "description", content: "Découvrez toutes nos solutions premium : Web, SEO, Google Maps, Branding, IA, Ingénierie." },
      { property: "og:title", content: "Solutions — XRAGENCY" },
      { property: "og:description", content: "8 solutions premium pour dominer votre marché." },
    ],
  }),
  component: SolutionsIndex,
});

function SolutionsIndex() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
          <span className="text-gradient">{t("nav.solutions")}</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("services.subtitle")}</p>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = ICONS[s.icon] ?? Globe;
          return (
            <Link
              key={s.slug}
              to={s.href}
              className="group rounded-2xl border border-border/60 gradient-card p-8 transition hover:border-primary/50 hover:shadow-elegant"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-foreground">{t(s.titleKey)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t(s.descKey)}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                {t("services.learnMore")} <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
