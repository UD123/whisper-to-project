/** Clean, in-house replacements for the scanned screenshots of the original manual. */

export function InstallDiagram({ label, caption }: { label: string; caption?: string }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="mono-label truncate text-muted-foreground">{label}</span>
        <span className="mono-label text-signal">diagram</span>
      </div>
      <div className="cad-grid bg-background p-6">
        <svg viewBox="0 0 720 200" className="mx-auto w-full max-w-3xl" role="img" aria-label={caption ?? label}>
          <defs>
            <marker id="gd-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="currentColor" className="text-muted-foreground" />
            </marker>
          </defs>

          {[
            { x: 20, t: "CAMERA", s: "USB / GigE / IP" },
            { x: 270, t: "VISION PC", s: "Pose6D · Windows 10" },
            { x: 520, t: "ROBOT CONTROLLER", s: "TCP/IP · port 8480" },
          ].map((b) => (
            <g key={b.t}>
              <rect
                x={b.x}
                y={55}
                width={180}
                height={90}
                rx={10}
                className="fill-card stroke-border"
                strokeWidth={1.5}
              />
              <text
                x={b.x + 90}
                y={95}
                textAnchor="middle"
                className="fill-foreground"
                style={{ font: "600 13px ui-sans-serif, system-ui" }}
              >
                {b.t}
              </text>
              <text
                x={b.x + 90}
                y={116}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ font: "11px ui-monospace, monospace" }}
              >
                {b.s}
              </text>
            </g>
          ))}

          {[200, 450].map((x) => (
            <line
              key={x}
              x1={x}
              y1={100}
              x2={x + 62}
              y2={100}
              className="stroke-muted-foreground"
              strokeWidth={1.5}
              markerEnd="url(#gd-arrow)"
            />
          ))}

          <text x={231} y={88} textAnchor="middle" className="fill-muted-foreground" style={{ font: "10px ui-monospace, monospace" }}>
            image
          </text>
          <text x={481} y={88} textAnchor="middle" className="fill-muted-foreground" style={{ font: "10px ui-monospace, monospace" }}>
            6DOF pose
          </text>
        </svg>
      </div>
      {caption ? (
        <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function FolderTree({
  label,
  root,
  items,
}: {
  label: string;
  root: string;
  items: { k: string; v: string }[];
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="mono-label text-muted-foreground">{label}</span>
        <span className="mono-label text-signal">tree</span>
      </div>
      <div className="bg-background px-5 py-4 font-mono text-sm">
        <p className="text-foreground">{root}</p>
        <ul className="mt-1">
          {items.map((s, i) => (
            <li key={s.k} className="flex gap-3 py-1.5">
              <span className="text-muted-foreground/70">
                {i === items.length - 1 ? "└──" : "├──"}
              </span>
              <span className="w-24 shrink-0 text-foreground">{s.k}</span>
              <span className="min-w-0 text-xs leading-6 text-muted-foreground">{s.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
