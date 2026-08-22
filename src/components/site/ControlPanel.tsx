import { useState } from "react";

const brands = ["ROS / KUKA", "YASKAWA", "ABB", "FANUC"] as const;

const rows: [string, Record<(typeof brands)[number], string>][] = [
  [
    "Interface",
    { "ROS / KUKA": "ROS2 / RSI", YASKAWA: "MotoPlus", ABB: "EGM", FANUC: "R-30iB" },
  ],
  [
    "Axes",
    { "ROS / KUKA": "6-axis", YASKAWA: "6-axis", ABB: "6-axis", FANUC: "6-axis" },
  ],
  [
    "Coordinates",
    {
      "ROS / KUKA": "1 450.32 mm",
      YASKAWA: "1 450.32 mm",
      ABB: "1 450.32 mm",
      FANUC: "1 450.32 mm",
    },
  ],
  [
    "Repeatability",
    { "ROS / KUKA": "±0.03 mm", YASKAWA: "±0.02 mm", ABB: "±0.03 mm", FANUC: "±0.02 mm" },
  ],
  [
    "Cycle time",
    { "ROS / KUKA": "1.57 s", YASKAWA: "1.53 s", ABB: "1.57 s", FANUC: "1.49 s" },
  ],
  [
    "Pose error",
    { "ROS / KUKA": "0.50 %", YASKAWA: "0.53 %", ABB: "0.58 %", FANUC: "0.47 %" },
  ],
];

const gauges = [
  { label: "Rx", value: "-1.25", unit: "deg", pct: 34 },
  { label: "Ry", value: "15.70", unit: "deg", pct: 62 },
  { label: "Rz", value: "92.45", unit: "deg", pct: 88 },
];

function Meter({
  label,
  left,
  right,
  value,
  onChange,
}: {
  label: string;
  left: string;
  right: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="mono-label text-muted-foreground">{label}</span>
        <span className="mono-label text-muted-foreground">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary outline-none"
        style={{
          background: `linear-gradient(to right, var(--primary) ${value}%, var(--border) ${value}%)`,
        }}
      />
      <div className="mt-2 flex justify-between">
        <span className="mono-label text-muted-foreground/70">{left}</span>
        <span className="mono-label text-muted-foreground/70">{right}</span>
      </div>
    </div>
  );
}

export function ControlPanel() {
  const [accel, setAccel] = useState(58);
  const [precision, setPrecision] = useState(74);
  const [brand, setBrand] = useState<(typeof brands)[number]>("ROS / KUKA");

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-7">
            <h3 className="text-xl font-semibold tracking-tight">Interactive RobotAI</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Tune the perception envelope and read the resulting pose solution live. Every value is
              streamed from the inference node, not simulated in the cloud.
            </p>
            <div className="mt-8 space-y-7">
              <Meter
                label="Acceleration"
                left="Low"
                right="High"
                value={accel}
                onChange={setAccel}
              />
              <Meter
                label="Precision"
                left="Fast"
                right="Exact"
                value={precision}
                onChange={setPrecision}
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-7">
            <div className="flex items-start justify-between">
              <span className="mono-label text-muted-foreground">6DOF · XYZ coordinates</span>
              <span className="mono-label text-signal">−1057.5</span>
            </div>
            <div className="mt-5 space-y-1.5 font-mono text-[13px] tracking-tight">
              <div>X: 1450.32mm &nbsp; Y: 220.15mm &nbsp; Z: 567.88mm</div>
              <div>Rx: -1.25° &nbsp; Ry: 15.70° &nbsp; Rz: 92.45°</div>
              <div className="pt-2 text-muted-foreground">
                STATUS: <span className="text-success">OPERATIONAL</span> | EFFICIENCY:{" "}
                <span className="text-primary">98.7%</span>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {gauges.map((g) => (
                <div key={g.label} className="rounded-lg border border-border p-3">
                  <div className="mono-label text-muted-foreground">{g.label}</div>
                  <svg viewBox="0 0 100 56" className="mt-2 w-full">
                    <path
                      d="M8 50 A42 42 0 0 1 92 50"
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 50 A42 42 0 0 1 92 50"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray="132"
                      strokeDashoffset={132 - (132 * g.pct) / 100}
                    />
                  </svg>
                  <div className="mt-1 font-mono text-[11px] tracking-tight">
                    {g.value}
                    {g.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card lg:col-span-1">
            <div className="flex flex-wrap gap-1 border-b border-border p-2">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`rounded-md px-2.5 py-1.5 font-mono text-[11px] tracking-tight transition-colors duration-200 ${
                    brand === b
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
            <dl className="divide-y divide-border">
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 gap-4 px-5 py-3">
                  <dt className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                    {k}
                  </dt>
                  <dd className="text-right font-mono text-[12px] tracking-tight">{v[brand]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
