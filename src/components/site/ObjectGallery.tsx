import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { objectClips, type ObjectClip } from "@/content/object-gallery";
import { useI18n } from "@/i18n/LanguageProvider";

/** Static gallery of detected objects with full-size image previews. */
export function ObjectGallery() {
  const { lang, t } = useI18n();
  const [active, setActive] = useState<ObjectClip | null>(null);

  return (
    <div className="mt-14">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="mono-label text-primary">{t.catalog.galleryTitle}</h3>
        <p className="text-sm text-muted-foreground">{t.catalog.galleryNote}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {objectClips.map((clip) => (
          <button
            key={clip.id}
            type="button"
            onClick={() => setActive(clip)}
            className="group overflow-hidden rounded-lg border border-border bg-background text-left transition-colors hover:border-primary/60"
          >
            <div className="relative aspect-video bg-foreground">
              <img
                src={clip.image}
                alt={clip.name[lang]}
                loading="lazy"
                className="media-grade absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/25 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background/90">
                  <Maximize2 className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </span>
            </div>
            <div className="border-t border-border px-3 py-2.5">
              <span className="block truncate text-sm font-medium tracking-tight">
                {clip.name[lang]}
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {clip.note[lang]}
              </span>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.name[lang]}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-xl border border-foreground/25 bg-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-background/15 px-3 py-2">
              <span className="mono-label truncate text-background/65">{active.name[lang]}</span>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={t.catalog.galleryClose}
                className="text-background/65 transition-colors hover:text-background"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
            <img
              src={active.image}
              alt={active.name[lang]}
              className="media-grade block max-h-[75vh] w-full object-contain bg-foreground"
            />
            <p className="border-t border-background/15 px-4 py-3 text-xs text-background/70">
              {active.note[lang]}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
