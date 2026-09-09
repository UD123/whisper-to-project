import { AutoVideo } from "../AutoVideo";
import type { GuideVideoRef } from "@/content/guide-media";

/** Full walkthrough video with player controls (silent — no audio track). */
export function GuideVideo({
  video,
  label,
  caption,
}: {
  video: GuideVideoRef;
  label: string;
  caption?: string;
}) {
  return (
    <figure className="mt-8 overflow-hidden rounded-xl border border-foreground/25 bg-foreground">
      <div className="flex items-center justify-between border-b border-background/15 px-3 py-2">
        <span className="mono-label truncate text-background/65">{label}</span>
        <span className="mono-label flex items-center gap-1.5 text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          video
        </span>
      </div>
      <video
        src={video.src}
        poster={video.poster}
        controls
        playsInline
        muted
        preload="metadata"
        className="media-grade block w-full bg-foreground"
      />
      {caption ? (
        <figcaption className="border-t border-background/15 px-4 py-3 text-xs text-background/70">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Silent looping example clips, played only while visible. */
export function GuideClips({
  label,
  items,
}: {
  label: string;
  items: { name: string; src: string; poster: string }[];
}) {
  return (
    <div className="mt-6">
      <span className="mono-label text-muted-foreground">{label}</span>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {items.map((v) => (
          <figure key={v.name} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative aspect-video bg-foreground">
              <AutoVideo
                src={v.src}
                poster={v.poster}
                className="media-grade absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <figcaption className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
              {v.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
