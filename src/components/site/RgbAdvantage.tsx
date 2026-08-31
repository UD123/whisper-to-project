import { AlertTriangle, Check } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export function RgbAdvantage() {
  const t = useT();

  return (
    <section id="technology" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="mono-label text-primary">{t.technology.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t.technology.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.technology.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-7">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-signal" strokeWidth={1.7} />
              <h3 className="mono-label text-signal">{t.technology.legacyTitle}</h3>
            </div>
            <dl className="mt-6 divide-y divide-border border-t border-border">
              {t.technology.rows.map((r) => (
                <div key={r.dimension} className="py-4">
                  <dt className="text-sm font-medium">{r.dimension}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{r.legacy}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-primary/30 bg-background p-7 shadow-[0_24px_50px_-38px_var(--primary)]">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" strokeWidth={2} />
              <h3 className="mono-label text-primary">{t.technology.modernTitle}</h3>
            </div>
            <dl className="mt-6 divide-y divide-border border-t border-border">
              {t.technology.rows.map((r) => (
                <div key={r.dimension} className="py-4">
                  <dt className="text-sm font-medium">{r.dimension}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{r.modern}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
