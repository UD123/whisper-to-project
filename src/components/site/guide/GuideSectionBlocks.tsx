import type { Block, GuideSection } from "@/content/guide-sections";
import { guideVideo } from "@/content/guide-media";
import { Callout, MenuPath, PathChip } from "./GuideBits";
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
        <ol className="mt-6 space-y-3">
          {b.items.map((s, i) => (
            <li key={i} className="rounded-xl border border-border bg-card p-5 sm:flex sm:gap-5">
              <span className="font-mono text-sm text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-2 min-w-0 sm:mt-0">
                {s.menu ? <MenuPath parts={s.menu} /> : null}
                <p
                  className={`text-sm leading-relaxed text-muted-foreground ${s.menu ? "mt-3" : ""}`}
                >
                  {s.body}
                </p>
                {s.path ? <PathChip value={s.path} /> : null}
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
    case "videos":
      return <VideoLinks label={b.label} items={b.items} />;
    default:
      return null;
  }
}

export function GuideSectionView({ section }: { section: GuideSection }) {
  return (
    <section id={section.id} className="mt-20 scroll-mt-24">
      <span className="mono-label text-primary">
        Step {section.n} · {section.updated}
      </span>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
        {section.title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{section.summary}</p>
      {section.blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </section>
  );
}
