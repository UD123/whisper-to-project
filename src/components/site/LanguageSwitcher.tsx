import { Globe } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/dictionaries";

const options: { code: Lang; short: string; full: string }[] = [
  { code: "en", short: "EN", full: "English" },
  { code: "zh", short: "中文", full: "简体中文" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-1 rounded-md border border-border bg-card p-0.5"
    >
      <Globe className="ml-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.7} />
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          aria-pressed={lang === o.code}
          title={o.full}
          className={`rounded-[5px] px-2 py-1 font-mono text-[11px] tracking-tight transition-colors duration-200 ${
            lang === o.code
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.short}
        </button>
      ))}
    </div>
  );
}
