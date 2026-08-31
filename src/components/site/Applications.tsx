import { MediaSlot } from "./MediaSlot";
import { useT } from "@/i18n/LanguageProvider";
import objectLocalizationVideo from "@/assets/object-localization.mp4.asset.json";
import machineTendingVideo from "@/assets/machine-tending-loop.mp4.asset.json";
import randomBinPickingVideo from "@/assets/bin-picking-loop.mp4.asset.json";
import palletizingVideo from "@/assets/palletizing.mp4.asset.json";
import assemblyVideo from "@/assets/assembly.mp4.asset.json";
import agvDockingVideo from "@/assets/agv-docking.mp4.asset.json";
import agritechVideo from "@/assets/agritech.mp4.asset.json";

const media = [
  ["bin_picking", randomBinPickingVideo.url],
  ["machine_tending", machineTendingVideo.url],
  ["object_localization", objectLocalizationVideo.url],
  ["palletizing", palletizingVideo.url],
  ["assembly", assemblyVideo.url],
  ["agv_docking", agvDockingVideo.url],
  ["agritech", agritechVideo.url],
] as const;

export function Applications() {
  const t = useT();

  return (
    <section id="use-cases" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">{t.applications.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t.applications.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.applications.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {media.map(([id, src], i) => {
            const copy = t.applications.items[id];
            return (
              <article
                key={id}
                className="flex flex-col rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_24px_50px_-32px_oklch(0.21_0.03_264/0.6)]"
              >
                <MediaSlot
                  tone="dark"
                  label={`CAM_${String(i + 2).padStart(2, "0")} · 1080P`}
                  caption={copy.title}
                  aspect="aspect-video"
                  src={src}
                />
                <h3 className="mt-5 px-1 text-base font-semibold tracking-tight">{copy.title}</h3>
                <p className="mt-2 px-1 pb-2 text-sm leading-relaxed text-muted-foreground">
                  {copy.desc}
                </p>
              </article>
            );
          })}

          <article className="flex flex-col justify-between rounded-xl border border-dashed border-border bg-background p-7 md:col-span-1">
            <div>
              <span className="mono-label text-primary">{t.applications.ctaEyebrow}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {t.applications.ctaTitle}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t.applications.ctaDesc}
              </p>
            </div>
            <a
              href="#demo"
              className="mt-6 inline-flex w-fit rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              {t.applications.ctaButton}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
