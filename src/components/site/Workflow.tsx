import { MediaSlot } from "./MediaSlot";

const steps = [
  [
    "01",
    "Object Scanning",
    "Scan your object from different positions and angles using a single RGB camera.",
  ],
  ["02", "Model Generation", "Annotate recorded image data and build the single AI object model."],
  [
    "03",
    "Position Estimation",
    "Real-time pose estimation detecting objects and streaming 6DOF vectors to the robot.",
  ],
];

const modules = [
  {
    id: "MODULE 1",
    name: "Pose6D Data Acquisition & Calibration",
    platform: "Windows / Linux standalone application",
    fns: [
      "Camera connection",
      "Scan data acquisition",
      "Automated camera calibration",
      "Robot-Camera hand-eye calibration",
    ],
  },
  {
    id: "MODULE 2",
    name: "Label6D AI Object Modeler",
    platform: "Windows / Cloud application",
    fns: [
      "Simplified user data annotation",
      "AI model generation",
      "Standalone software or fully managed service",
    ],
  },
  {
    id: "MODULE 3",
    name: "Pose6D Runtime Engine",
    platform: "Windows / Linux high-performance application",
    fns: [
      "Live stream acquisition",
      "Real-time object 6DOF pose computation",
      "Direct industrial protocol output",
    ],
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">03 — Workflow</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            3-Step Deployment Workflow
          </h2>
          <p className="mt-4 text-muted-foreground">
            Connect any camera and industrial robot arm in 3 simple steps.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(([n, t, d]) => (
            <article key={n} className="rounded-xl border border-border bg-background p-7">
              <span className="font-mono text-3xl tracking-tight text-primary">{n}</span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>

        {/* RESERVED MEDIA SLOT — [SCANNING_PROCESS_VIDEO_URL] */}
        <MediaSlot
          className="mt-8 bg-background"
          label="workflow_scanning_process.mp4"
          caption="Workflow demo video — paste a direct MP4 or YouTube URL"
          src=""
        />

        <div className="mt-20 max-w-2xl">
          <span className="mono-label text-primary">03.1 — Software suite</span>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            Modular Software Suite
          </h3>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {modules.map((m) => (
            <article key={m.id} className="rounded-xl border border-border bg-background p-7">
              <span className="mono-label text-signal">{m.id}</span>
              <h4 className="mt-4 text-lg font-semibold tracking-tight">{m.name}</h4>
              <p className="mono-label mt-3 text-muted-foreground normal-case tracking-normal">
                {m.platform}
              </p>
              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {m.fns.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
