import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { services } from "@/data/services";
import logoXragency from "@/assets/logo-xragency.png";

export function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border/40" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center" aria-label="XRAGENCY — Accueil">
          <img
            src={logoXragency}
            alt="XRAGENCY"
            className="h-6 w-auto md:h-7 select-none"
            draggable={false}
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            to="/"
            className="text-sm font-medium text-foreground/80 transition hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            {t("nav.home")}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition hover:text-foreground">
              {t("nav.solutions")}
              <ChevronDown className="h-3 w-3" />
            </button>
            {solutionsOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                <div className="grid w-[480px] grid-cols-2 gap-1 rounded-2xl border border-border/60 glass p-3 shadow-elegant">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={s.href}
                      className="rounded-lg px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-foreground"
                    >
                      {t(s.titleKey)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/bundles"
            className="text-sm font-medium text-foreground/80 transition hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            {t("nav.bundles")}
          </Link>
          <Link
            to="/references"
            className="text-sm font-medium text-foreground/80 transition hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            {t("nav.references")}
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-foreground/80 transition hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            {t("nav.about")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link
            to="/contact"
            className="hidden rounded-full gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105 lg:inline-flex"
          >
            {t("nav.cta")}
          </Link>
          <button
            className="lg:hidden rounded-full border border-border/60 p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/40 glass">
          <div className="flex flex-col gap-1 px-4 py-6">
            <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 hover:bg-accent">
              {t("nav.home")}
            </Link>
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("nav.solutions")}
            </div>
            {services.map((s) => (
              <Link
                key={s.slug}
                to={s.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-6 py-2.5 text-sm text-foreground/80 hover:bg-accent"
              >
                {t(s.titleKey)}
              </Link>
            ))}
            <Link to="/bundles" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 hover:bg-accent">
              {t("nav.bundles")}
            </Link>
            <Link to="/references" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 hover:bg-accent">
              {t("nav.references")}
            </Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 hover:bg-accent">
              {t("nav.about")}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 rounded-full gradient-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
