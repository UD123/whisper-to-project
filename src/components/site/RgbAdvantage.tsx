import { AlertTriangle, Check } from "lucide-react";

const limitations = [
  ["Noise & Edge Artifacts", "Dense error margins on sharp contours."],
  ["Shadow Occlusions", "Dead zones created by active light emitters."],
  ["Fixed Working Distances", "Inflexible setup ranges."],
  [
    "Material Sensitivity",
    "Complete failure on shiny, polished, metallic, translucent or reflective parts.",
  ],
  ["Texture Blindness", "Inability to process visual markings or surface contrast."],
  ["Heavy Processing Bottleneck", "Requires complex point cloud segmentation algorithms."],
];

const advantages = [
  ["Direct 6DOF Vector Output", "Instant XYZ + RxRyRz coordinates without point cloud overhead."],
  [
    "Material Agnostic",
    "Seamlessly handles polished metal, reflective bolts, translucent plastic and laminated parts.",
  ],
  ["Full Texture Awareness", "Utilizes RGB contrast, fine visual edges and surface markings."],
  ["Total Setup Flexibility", "Adjustable camera-to-object distances and compact sensor sizes."],
];

export function RgbAdvantage() {
  return (
    <section id="technology" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="mono-label text-primary">01 — Technology</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Why Active 3D Vision Fails on Real Production Lines
          </h2>
          <p className="mt-4 text-muted-foreground">
            Comparing standard 2D RGB AI perception against RealSense, stereo cameras and LIDARs.
          </p>
          <blockquote className="mt-8 border-l-2 border-signal pl-5 text-sm leading-relaxed text-muted-foreground italic">
            Active 3D sensors present built-in industrial flaws: noise, shadows, distance limits,
            material sensitivity and texture blindness. At the end of the day, you still need to find
            an object in a heavy point cloud.
          </blockquote>
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
