import { CircuitBoard, Gauge, Timer } from "lucide-react";

const cards = [
  {
    icon: Gauge,
    metric: "-90%",
    title: "90% Lower Hardware Cost",
    body: "Use $100 2D cameras instead of $20,000 3D laser scanners. No structured light, no LiDAR, no recalibration rigs.",
    spec: "capex_per_cell: $100 vs $20,000",
  },
  {
    icon: Timer,
    metric: "60s",
    title: "1-Minute Object Teaching",
    body: "Train new parts effortlessly without complex CAD manual setups. Show the part, capture, deploy.",
    spec: "teach_time: 00:01:00",
  },
  {
    icon: CircuitBoard,
    metric: "6DOF",
    title: "High Precision 6DOF",
    body: "Get full position (X, Y, Z) and orientation (Rx, Ry, Rz) angles from a single image frame.",
    spec: "accuracy: ±0.4mm / ±0.5°",
  },
];

export function ValueProps() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">03 — Value</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Why Engineers &amp; Plant Managers Choose RobotAI
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_24px_50px_-32px_oklch(0.21_0.03_264/0.6)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-primary transition-colors duration-300 group-hover:border-primary/40">
                  <c.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-2xl tracking-tight text-foreground/90">{c.metric}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              <p className="mt-6 border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
                {c.spec}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
