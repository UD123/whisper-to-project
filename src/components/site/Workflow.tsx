import { MediaSlot } from "./MediaSlot";
import { useT } from "@/i18n/LanguageProvider";
import objectScanningVideo from "@/assets/object-scanning-zoom.mp4.asset.json";

export function Workflow() {
  const t = useT();

  return (
    <section id="workflow" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">{t.workflow.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t.workflow.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.workflow.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.workflow.steps.map((s) => (
            <article key={s.n} className="rounded-xl border border-border bg-background p-7">
              <span className="font-mono text-3xl tracking-tight text-primary">{s.n}</span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </div>

        <MediaSlot
          tone="dark"
          className="mx-auto mt-8 max-w-3xl"
          label={t.workflow.mediaLabel}
          src={objectScanningVideo.url}
        />

        <div className="mt-20 max-w-2xl">
          <span className="mono-label text-primary">{t.workflow.suiteEyebrow}</span>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            {t.workflow.suiteTitle}
          </h3>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.workflow.modules.map((m) => (
            <article key={m.id} className="rounded-xl border border-border bg-background p-7">
              <span className="mono-label text-signal">{m.id}</span>
              <h4 className="mt-4 text-lg font-semibold tracking-tight">{m.name}</h4>
              <p className="mono-label mt-3 text-muted-foreground normal-case tracking-normal">
                {m.platform}
              </p>
              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {m.fns.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
