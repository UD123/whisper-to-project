import { Factory, Clock, Globe } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

const icons = [Factory, Clock, Globe];

export function TrustMetrics() {
  const t = useT();

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <div className="grid divide-y divide-border rounded-xl border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {t.trust.map((m, i) => {
            const Icon = icons[i] ?? Factory;
            return (
              <div key={m.label} className="flex items-center gap-4 px-6 py-5">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.7} />
                <div>
                  <div className="font-mono text-xl tracking-tight text-foreground">{m.value}</div>
                  <div className="text-sm font-medium text-foreground">{m.label}</div>
                  <div className="mono-label mt-0.5 text-muted-foreground">{m.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
