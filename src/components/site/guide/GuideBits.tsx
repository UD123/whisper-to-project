import { useState } from "react";
import { Check, ChevronRight, Copy, Download, FileText, X } from "lucide-react";

export function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-xl border border-signal/35 bg-signal/5 p-5">
      <span className="mono-label text-signal">{label}</span>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{children}</p>
    </div>
  );
}

export function PathChip({ value }: { value: string }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.setTimeout(() => setDone(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title="Copy"
      className="mt-3 inline-flex max-w-full items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-xs break-all transition-colors hover:border-foreground/25"
    >
      <span className="truncate">{value}</span>
      {done ? (
        <Check className="h-3.5 w-3.5 shrink-0 text-signal" />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      )}
    </button>
  );
}

export function MenuPath({ parts }: { parts: string[] }) {
  return (
    <span className="mt-3 inline-flex flex-wrap items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1.5">
      {parts.map((p, i) => (
        <span key={p} className="inline-flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
          <span className="font-mono text-xs">{p}</span>
        </span>
      ))}
    </span>
  );
}

export function Shot({ src, label, caption }: { src: string; label: string; caption?: string | undefined }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="mono-label truncate text-muted-foreground">{label}</span>
        <span className="mono-label text-signal">figure</span>
      </div>
      <div className="bg-background p-4">
        <img src={src} alt={caption ?? label} loading="lazy" className="mx-auto w-full max-w-3xl" />
      </div>
      {caption ? (
        <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function DocCard({
  name,
  note,
  url,
  labels,
}: {
  name: string;
  note: string;
  url: string;
  labels: { open: string; close: string; download: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-background">
      <div className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.6} />
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="mono-label mt-1 text-muted-foreground normal-case tracking-normal">
              {note}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border bg-card px-3.5 py-2 text-sm font-medium transition-all hover:border-foreground/25 hover:shadow-sm"
          >
            {open ? (
              <span className="inline-flex items-center gap-1.5">
                <X className="h-3.5 w-3.5" /> {labels.close}
              </span>
            ) : (
              labels.open
            )}
          </button>
          <a
            href={url}
            download
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" />
            {labels.download}
          </a>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border p-3">
          <object data={url} type="application/pdf" className="h-[70vh] w-full rounded-lg">
            <iframe src={url} title={name} className="h-[70vh] w-full rounded-lg" />
          </object>
        </div>
      ) : null}
    </div>
  );
}
