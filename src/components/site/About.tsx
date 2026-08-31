import { useT } from "@/i18n/LanguageProvider";

export function About() {
  const t = useT();

  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:items-center lg:grid-cols-2">
          <div>
            <span className="mono-label text-primary">{t.about.eyebrow}</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              {t.about.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.about.body}
          </p>
        </div>
      </div>
    </section>
  );
}
