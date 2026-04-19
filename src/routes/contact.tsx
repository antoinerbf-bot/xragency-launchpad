import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { ContactForm } from "@/components/common/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — XRAGENCY" },
      { name: "description", content: "Parlons de votre projet. Réponse sous 24h. Audit gratuit personnalisé." },
      { property: "og:title", content: "Contact — XRAGENCY" },
      { property: "og:description", content: "Audit gratuit en 24h." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
              <span className="text-gradient">{t("contact.title")}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">{t("contact.subtitle")}</p>

            <div className="mt-10 space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@xragency.com" },
                { icon: MapPin, label: "Bureaux", value: "Paris · New York · London · Tokyo" },
                { icon: Clock, label: "Disponibilité", value: "24h/24 · Réponse < 24h" },
              ].map((it, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                    <it.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{it.label}</div>
                    <div className="mt-1 text-sm font-semibold text-foreground">{it.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 gradient-card p-8 shadow-elegant">
            <ContactForm source="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
