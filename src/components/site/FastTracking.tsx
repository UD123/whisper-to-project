import { Gauge, Crosshair, RefreshCw } from "lucide-react";
import { MediaSlot } from "./MediaSlot";
import { useT } from "@/i18n/LanguageProvider";
import fastTrackingVideo from "@/assets/fast-tracking.mp4.asset.json";

const icons = [Gauge, Crosshair, RefreshCw] as const;

export function FastTracking() {
  const t = useT();

  return (
    <section id="fast-tracking" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">{t.fastTracking.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t.fastTracking.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.fastTracking.subtitle}</p>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <MediaSlot
            tone="dark"
            label="CAM_03 · LIVE 6DOF TRACKING"
            caption={t.fastTracking.title}
            aspect="aspect-[4/3]"
            src={fastTrackingVideo.url}
          />

          <div className="flex flex-col gap-4">
            {t.fastTracking.stats.map((s, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={1.7} />
                    <span className="mono-label text-primary">{s.label}</span>
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight">{s.value}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
