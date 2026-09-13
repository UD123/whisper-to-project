import type { Block, GuideSection } from "@/content/guide-sections";
import { guideVideo } from "@/content/guide-media";
import { Callout, MenuPath, PathChip, Shot } from "./GuideBits";
import { guideShots } from "@/content/guide-shots";
import { GuideClips } from "./GuideVideo";
import { ArrowUpRight, Download, FileText } from "lucide-react";

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "h":
      return <h4 className="mt-10 text-lg font-semibold tracking-tight">{b.text}</h4>;
    case "p":
      return <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{b.text}</p>;
    case "bullets":
      return (
        <ul className="mt-5 space-y-2.5">
          {b.items.map((i) => (
            <li key={i} className="flex max-w-3xl gap-3 text-sm text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {i}
            </li>
          ))}
        </ul>
      );
    case "note":
      return <Callout label={b.label}>{b.text}</Callout>;
    case "steps":
      return (
        <ol className="mt-5 space-y-3">
          {b.items.map((s, i) => (
            <li
              key={i}
              className="rounded-xl border border-border bg-card px-4 py-3.5 sm:flex sm:gap-4"
            >
              <span className="font-mono text-sm text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-1.5 min-w-0 sm:mt-0">
                {s.menu ? <MenuPath parts={s.menu} /> : null}
                <p
                  className={`text-sm leading-relaxed text-muted-foreground ${s.menu ? "mt-2.5" : ""}`}
                >
                  {s.body}
                </p>
                {s.path ? <PathChip value={s.path} /> : null}
                {s.shot && guideShots[s.shot] ? (
                  <Shot src={guideShots[s.shot]} label={s.shot} />
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-card">
                {b.head.map((h) => (
                  <th key={h} className="mono-label border-b border-border px-5 py-3 font-normal text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {r.map((c, j) => (
                    <td
                      key={j}
                      className={`px-5 py-3 align-top ${
                        j === 0 ? "font-mono text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "code":
      return (
        <div className="mt-6 overflow-hidden rounded-xl border border-foreground/25 bg-foreground">
          <div className="border-b border-background/15 px-3 py-2">
            <span className="mono-label text-background/65">{b.label}</span>
          </div>
          <pre className="overflow-x-auto px-5 py-4 font-mono text-xs leading-relaxed text-background/90">
            {b.lines.join("\n")}
          </pre>
        </div>
      );
    case "shot":
      return <Shot src={guideShots[b.key]} label={b.label} caption={b.caption} className={b.className} />;
    case "shots":
      return (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {b.items.map((s) => (
            <Shot key={s.key} src={guideShots[s.key]} label={s.label} caption={s.caption} className={s.className} />
          ))}
        </div>
      );
    case "videos":
      return (
        <GuideClips
          label={b.label}
          items={b.items
            .filter((v) => guideVideo[v.key])
            .map((v) => ({ name: v.name, ...guideVideo[v.key]! }))}
        />
      );
    case "button":
      return (
        <a
          href={b.url}
          download={b.download}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {b.download ? <Download className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
          {b.text}
        </a>
      );
    case "download":
      return (
        <div className="mt-6 rounded-xl border border-border bg-background p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.6} />
              <div>
                <p className="text-sm font-medium">{b.name}</p>
                <p className="mono-label mt-1 text-muted-foreground normal-case tracking-normal">
                  {b.note}
                </p>
              </div>
            </div>
            <a
              href={b.url}
              download
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <Download className="h-3.5 w-3.5" />
              {b.label}
            </a>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function GuideSectionBody({ section }: { section: GuideSection }) {
  return (
    <>
      {section.blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </>
  );
}
