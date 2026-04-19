import { useTranslation } from "@/contexts/LanguageContext";
import { LANGUAGE_LABELS } from "@/lib/translations";
import type { LanguageCode } from "@/lib/currency";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage, currency } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-sm font-medium text-foreground/80 transition hover:bg-card hover:text-foreground">
        <Globe className="h-4 w-4" />
        <span>{LANGUAGE_LABELS[language].flag}</span>
        <span className="hidden sm:inline">{language.toUpperCase()}</span>
        <span className="text-muted-foreground">· {currency}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {(Object.keys(LANGUAGE_LABELS) as LanguageCode[]).map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code)}
            className={language === code ? "bg-accent" : ""}
          >
            <span className="mr-2">{LANGUAGE_LABELS[code].flag}</span>
            {LANGUAGE_LABELS[code].name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
