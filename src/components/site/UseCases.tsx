import { useState } from "react";
import binPicking from "@/assets/scene-3d.jpg";
import machineTending from "@/assets/case-tending.jpg";
import palletizing from "@/assets/case-palletizing.jpg";
import assembly from "@/assets/case-assembly.jpg";

const cases = [
  {
    id: "bin",
    tab: "Bin Picking",
    img: binPicking,
    metric: "+300% cycle speed",
    desc: "Randomly piled parts in deep boxes. RobotAI resolves overlapping, reflective and untextured geometry frame by frame.",
    spec: "pick_rate: 21 ppm · clutter: high",
  },
  {
    id: "tending",
    tab: "Machine Tending",
    img: machineTending,
    metric: "±0.3mm alignment",
    desc: "High-precision CNC and press loader alignment, with pose correction applied before every insertion.",
    spec: "chuck_align: ±0.3mm",
  },
  {
    id: "palletizing",
    tab: "Palletizing & Sorting",
    img: palletizing,
    metric: "+240% throughput",
    desc: "On-the-fly conveyor package tracking with continuous pose streaming at line speed.",
    spec: "conveyor: 0.9 m/s · track: 30Hz",
  },
  {
    id: "assembly",
    tab: "Assembly & Alignment",
    img: assembly,
    metric: "<1mm insertion",
    desc: "Sub-millimeter part insertion with closed-loop 6DOF feedback during the approach.",
    spec: "insert_tol: 0.4mm",
  },
];

export function UseCases() {
  const [active, setActive] = useState(cases[0].id);
  const current = cases.find((c) => c.id === active)!;

  return (
    <section id="use-cases" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">04 — Deployments</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Industrial Use Cases
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                active === c.id
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_22px_-12px_var(--primary)]"
                  : "border-border bg-background text-muted-foreground hover:border-foreground/25 hover:text-foreground"
              }`}
            >
              {c.tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-5">
          <div className="overflow-hidden rounded-xl border border-border lg:col-span-3">
            <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2.5">
              <span className="mono-label text-muted-foreground">preview · {current.id}_cell.mp4</span>
              <span className="mono-label text-signal">rec</span>
            </div>
            <img
              key={current.id}
              src={current.img}
              alt={`${current.tab} robotic cell with RobotAI vision`}
              width={1280}
              height={960}
              loading="lazy"
              className="aspect-[4/3] w-full animate-in fade-in object-cover duration-500"
            />
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-border bg-background p-7 lg:col-span-2">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{current.tab}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{current.desc}</p>
            </div>
            <div className="mt-8">
              <div className="font-mono text-3xl tracking-tight text-primary">{current.metric}</div>
              <p className="mt-4 border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
                {current.spec}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
