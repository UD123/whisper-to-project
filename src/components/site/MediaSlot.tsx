import { Film } from "lucide-react";

export type MediaSlotProps = {
  /** Direct MP4 URL, YouTube URL/embed, or image URL (PNG/JPG). Leave empty to render the reserved placeholder frame. */
  src?: string;
  label: string;
  caption?: string;
  aspect?: string;
  className?: string;
  /** "light" = default lab frame, "dark" = deep slate technical viewport */
  tone?: "light" | "dark";
  children?: React.ReactNode;
};

function kind(src?: string) {
  if (!src) return "empty" as const;
  if (/youtube\.com|youtu\.be/.test(src)) return "youtube" as const;
  if (/\.(mp4|webm|mov)(\?|$)/i.test(src)) return "video" as const;
  return "image" as const;
}

function youtubeEmbed(src: string) {
  const id = src.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{6,})/)?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : src;
}

/**
 * Technical viewport frame. Drop a real MP4 / YouTube / screenshot URL into `src`
 * and it renders in place of the reserved placeholder.
 */
export function MediaSlot({
  src,
  label,
  caption,
  aspect = "aspect-video",
  className = "",
  tone = "light",
  children,
}: MediaSlotProps) {
  const effective = src;
  const k = kind(effective);
  const dark = tone === "dark";

  return (
    <div
      className={`overflow-hidden rounded-xl border ${
        dark ? "border-foreground/25 bg-foreground" : "border-border bg-card"
      } ${className}`}
    >
      <div
        className={`flex items-center justify-between border-b px-3 py-2 ${
          dark ? "border-background/15" : "border-border"
        }`}
      >
        <span
          className={`mono-label truncate ${dark ? "text-background/65" : "text-muted-foreground"}`}
        >
          {label}
        </span>
        <span className="mono-label flex items-center gap-1.5 text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          {k === "empty" ? "slot" : "media"}
        </span>
      </div>

      <div className={`relative w-full ${aspect} ${dark ? "bg-foreground" : "bg-background"}`}>
        {k === "video" && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src={effective}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {k === "youtube" && (
          <iframe
            src={youtubeEmbed(effective!)}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
        {k === "image" && (
          <img
            src={effective}
            alt={caption ?? label}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {k === "empty" && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-2 text-center ${
              dark ? "dark-grid" : "cad-grid"
            }`}
          >
            <Film
              className={`h-5 w-5 ${dark ? "text-background/55" : "text-muted-foreground"}`}
              strokeWidth={1.5}
            />
            <span className={`mono-label ${dark ? "text-background/65" : "text-muted-foreground"}`}>
              reserved media slot
            </span>
            {caption ? (
              <span
                className={`mono-label max-w-[85%] normal-case tracking-normal ${
                  dark ? "text-background/45" : "text-muted-foreground/70"
                }`}
              >
                {caption}
              </span>
            ) : null}
          </div>
        )}
        {children}
        
      </div>
    </div>
  );
}
