import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useT } from "@/i18n/LanguageProvider";

export function FAQ() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">{t.faq.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.faq.subtitle}</p>
        </div>

        <div className="mt-12 max-w-3xl divide-y divide-border rounded-xl border border-border bg-background">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="px-6 py-5">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{f.q}</span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2} />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
