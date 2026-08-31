import { useT } from "@/i18n/LanguageProvider";

export function ObjectCatalog() {
  const t = useT();

  return (
    <section id="objects" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">{t.catalog.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t.catalog.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.catalog.subtitle}</p>
        </div>

        <div className="mt-12 divide-y divide-border border-t border-border">
          {t.catalog.categories.map((c) => (
            <div key={c.label} className="grid gap-4 py-6 md:grid-cols-[220px_1fr]">
              <h3 className="mono-label pt-1 text-muted-foreground">{c.label}</h3>
              <ul className="flex flex-wrap gap-2">
                {c.items.map((i) => (
                  <li
                    key={i}
                    className="rounded-md border border-border bg-background px-3 py-1.5 font-mono text-[12px] tracking-tight"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
