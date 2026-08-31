import heroLoop from "@/assets/hero-16x9-loop.mp4.asset.json";
import { AutoVideo } from "./AutoVideo";
import { useT } from "@/i18n/LanguageProvider";

export function Hero() {
  const t = useT();

  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="cad-grid-lg pointer-events-none absolute inset-0 opacity-90" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28">
        <div className="max-w-3xl">
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> {t.hero.badge}
          </span>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#demo"
              className="rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 hover:shadow-[0_10px_28px_-12px_var(--foreground)]"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#specs"
              className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium transition-all duration-200 hover:border-foreground/25 hover:shadow-sm"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {t.hero.stats.map(([k, v, sub]) => (
            <div key={k} className="bg-card px-5 py-5">
              <dt className="mono-label text-muted-foreground">{k}</dt>
              <dd className="mt-2 font-mono text-xl tracking-tight text-foreground">{v}</dd>
              <dd className="mono-label mt-1 text-muted-foreground/80">{sub}</dd>
            </div>
          ))}
        </dl>

        <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-foreground/25 bg-foreground shadow-[0_40px_80px_-48px_var(--foreground)]">
          <div className="flex items-center justify-between border-b border-background/15 px-3 py-2">
            <span className="mono-label text-background/65">{t.hero.viewport}</span>
            <span className="mono-label flex items-center gap-1.5 text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              {t.hero.live}
            </span>
          </div>
          <div className="relative aspect-video w-full overflow-hidden bg-foreground">
            <AutoVideo
              src={heroLoop.url}
              className="media-grade absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/25 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-background/10 ring-inset" />
          </div>
        </div>
      </div>
    </section>
  );
}
