import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { useTranslation } from "@/contexts/LanguageContext";
import { submitLead } from "@/server/leads";

interface ContactFormProps {
  source?: "contact" | "audit" | "checkout" | "diagnostic";
  defaultService?: string;
  compact?: boolean;
}

export function ContactForm({ source = "contact", defaultService, compact }: ContactFormProps) {
  const { t, language, currency } = useTranslation();
  const submit = useServerFn(submitLead);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const serviceVal = defaultService ?? (String(fd.get("service") ?? "") || null);
    try {
      const res = await submit({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? "") || null,
          company: String(fd.get("company") ?? "") || null,
          sector: String(fd.get("sector") ?? "") || null,
          service: serviceVal,
          message: String(fd.get("message") ?? "") || null,
          source,
          language,
          currency,
        },
      });
      if (res.success) {
        toast.success(t("contact.success"));
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(t("contact.error"));
      }
    } catch {
      toast.error(t("contact.error"));
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
        <input required name="name" placeholder={t("contact.name") + " *"} className={inputCls} />
        <input required type="email" name="email" placeholder={t("contact.email") + " *"} className={inputCls} />
      </div>
      <div className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
        <input name="phone" placeholder={t("contact.phone")} className={inputCls} />
        <input name="company" placeholder={t("contact.company")} className={inputCls} />
      </div>
      {!defaultService && (
        <input name="service" placeholder={t("contact.service")} className={inputCls} />
      )}
      <input name="sector" placeholder={t("contact.sector")} className={inputCls} />
      <textarea
        name="message"
        rows={4}
        placeholder={t("contact.message")}
        className={inputCls + " resize-none"}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? t("contact.sending") : t("contact.submit")}
      </button>
    </form>
  );
}
