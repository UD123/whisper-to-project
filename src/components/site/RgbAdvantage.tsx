import { AlertTriangle, Check } from "lucide-react";

const limitations = [
  [
    "Hardware Cost & CapEx",
    "Expensive industrial 3D sensors, LIDARs, and high-end processing servers.",
  ],
  [
    "Surface & Material Limitations",
    "Complete failure or severe noise on polished metal, reflective bolts, and translucent parts.",
  ],
  [
    "Shadows, Edges & Occlusions",
    "Dense error margins on sharp contours and dead zones caused by active light emitters.",
  ],
  ["Setup Flexibility & Range", "Inflexible working distances and rigid calibration ranges."],
  [
    "Processing Overhead",
    "Heavy performance bottlenecks requiring complex point cloud segmentation algorithms.",
  ],
];

const advantages = [
  [
    "Hardware Cost & CapEx",
    "Cost-Efficient Setup — works with standard RGB cameras (including compact USB options) and standard industrial PCs.",
  ],
  [
    "Surface & Material Limitations",
    "Material Agnostic — seamlessly handles shiny, reflective, and multi-texture parts without issues.",
  ],
  [
    "Shadows, Edges & Occlusions",
    "Direct 6DOF Output — instant XYZ and rotation vectors utilizing clear RGB contrast and visual edges.",
  ],
  [
    "Setup Flexibility & Range",
    "Total Setup Flexibility — adjustable camera-to-object distances and compact footprint.",
  ],
  [
    "Processing Overhead",
    "Sub-30 ms Inference — lightweight processing delivering fast coordinates without point cloud overhead.",
  ],
];

export function RgbAdvantage() {
  return (
    <section id="technology" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="mono-label text-primary">01 — Technology</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Comparison: Traditional 3D Vision vs. RobotAI
          </h2>
          <p className="mt-4 text-muted-foreground">
            A direct comparison across the five most critical dimensions for production-grade robotic
            vision.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-background p-7">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-signal" strokeWidth={1.7} />
              <h3 className="mono-label text-signal">Traditional 3D Vision & LiDAR</h3>
            </div>
            <dl className="mt-6 divide-y divide-border border-t border-border">
              {limitations.map(([t, d]) => (
                <div key={t} className="py-4">
                  <dt className="text-sm font-medium">{t}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-primary/30 bg-background p-7 shadow-[0_24px_50px_-38px_var(--primary)]">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" strokeWidth={2} />
              <h3 className="mono-label text-primary">RobotAI 2D RGB Engine</h3>
            </div>
            <dl className="mt-6 divide-y divide-border border-t border-border">
              {advantages.map(([t, d]) => (
                <div key={t} className="py-4">
                  <dt className="text-sm font-medium">{t}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
