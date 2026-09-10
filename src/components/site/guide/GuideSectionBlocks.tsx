import type { Block, GuideSection } from "@/content/guide-sections";
import { guideVideo } from "@/content/guide-media";
import { Callout, MenuPath, PathChip, Shot } from "./GuideBits";
import { guideShots } from "@/content/guide-shots";
import { GuideClips } from "./GuideVideo";

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
      return <Shot src={guideShots[b.key]} label={b.label} caption={b.caption} />;
    case "shots":
      return (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {b.items.map((s) => (
            <Shot key={s.key} src={guideShots[s.key]} label={s.label} caption={s.caption} />
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
