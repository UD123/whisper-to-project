import { MediaSlot } from "./MediaSlot";

const stats = [
  ["Speed", "< 30 ms", "1 MPix · GPU"],
  ["Precision", "Sub-millimeter", "translation + rotation"],
  ["Cost", "Up to 80% lower", "vs 3D scanners"],
  ["Footprint", "Global", "Korea • Poland"],
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="cad-grid-lg pointer-events-none absolute inset-0 opacity-90" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28">
        <div className="max-w-3xl">
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Deeptech · Industrial Computer Vision
          </span>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl">
            3D Vision Simplified: 6DOF Object Pose Estimation via Standard 2D RGB
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Transform any standard camera into a 3D measurement device. Detect exact 3D coordinates
            (X, Y, Z, Rx, Ry, Rz) under 30 ms without expensive, noisy 3D LiDAR or stereo sensors.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#demo"
              className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-signal-foreground transition-all duration-200 hover:opacity-90 hover:shadow-[0_10px_28px_-10px_var(--signal)]"
            >
              Schedule Technical Demo
            </a>
            <a
              href="#specs"
              className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium transition-all duration-200 hover:border-foreground/25 hover:shadow-sm"
            >
              Explore Specifications
            </a>
          </div>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([k, v, sub]) => (
            <div key={k} className="bg-card px-5 py-5">
              <dt className="mono-label text-muted-foreground">{k}</dt>
              <dd className="mt-2 font-mono text-xl tracking-tight text-foreground">{v}</dd>
              <dd className="mono-label mt-1 text-muted-foreground/80">{sub}</dd>
            </div>
          ))}
        </dl>

        <div className="relative mt-10">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_60px_-40px_oklch(0.21_0.03_264/0.45)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="mono-label text-muted-foreground">cam_00 · rgb 1920×1080 · 30fps</span>
              <span className="mono-label flex items-center gap-1.5 text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> inference active
              </span>
            </div>
            {/* RESERVED MEDIA SLOT — replace src with [REAL_HERO_VIDEO_URL] */}
            <div className="relative aspect-video w-full bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                src="/media/hero.mp4"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-lg border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur">
                <span className="mono-label flex items-center gap-1.5 text-signal">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                  LIVE 6DOF PERCEPTION{" "}
                  <span className="text-muted-foreground">| Latency: 28ms | Output: XYZ + RxRyRz</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
