import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/contexts/LanguageContext";
import { services } from "@/data/services";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/40 bg-card/30 mt-32">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-2xl font-extrabold text-gradient">XRAGENCY</div>
            <p className="mt-3 text-sm text-muted-foreground">{t("footer.tagline")}</p>
            <p className="mt-4 text-xs font-medium text-foreground/70">
              🌍 Paris · New York · London · Tokyo
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">
              {t("footer.services")}
            </h3>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={s.href} className="text-sm text-muted-foreground hover:text-foreground transition">
                    {t(s.titleKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">
              {t("footer.company")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition">{t("footer.about")}</Link></li>
              <li><Link to="/references" className="text-sm text-muted-foreground hover:text-foreground transition">{t("footer.references")}</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">{t("footer.contact")}</Link></li>
              <li><Link to="/bundles" className="text-sm text-muted-foreground hover:text-foreground transition">Bundles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/90">
              {t("footer.legal")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li><span className="text-sm text-muted-foreground">{t("footer.terms")}</span></li>
              <li><span className="text-sm text-muted-foreground">{t("footer.cgv")}</span></li>
              <li><span className="text-sm text-muted-foreground">{t("footer.privacy")}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} XRAGENCY. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
