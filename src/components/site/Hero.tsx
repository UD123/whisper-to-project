import { useEffect, useState } from "react";


function useTicker() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 900);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function Hero() {
  const t = useTicker();
  const x = (14.2 + Math.sin(t / 2) * 0.6).toFixed(1);
  const y = (-8.5 + Math.cos(t / 3) * 0.4).toFixed(1);
  const z = (450.0 + Math.sin(t / 5) * 1.2).toFixed(1);
  const latency = 36 + (t % 5);

  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="cad-grid-lg pointer-events-none absolute inset-0 opacity-90" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28">
        <div className="max-w-3xl">
          <span className="mono-label inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Deeptech · Industrial Computer Vision
          </span>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl">
            3D Robotic Vision Powered by a Single 2D Camera.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Transform standard RGB cameras into precise 3D spatial sensors. Extract 6DOF position and
            orientation in real-time with AI Computer Vision—eliminating costly 3D LiDAR sensors.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#demo"
              className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-signal-foreground transition-all duration-200 hover:opacity-90 hover:shadow-[0_10px_28px_-10px_var(--signal)]"
            >
              Schedule Live Demo
            </a>
            <a
              href="#specs"
              className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium transition-all duration-200 hover:border-foreground/25 hover:shadow-sm"
            >
              View Technical Specs
            </a>
          </div>

          <p className="mono-label mt-6 text-muted-foreground">
            Compatibility: Universal Robots · ABB · KUKA · FANUC · ROS/ROS2
          </p>
        </div>

        <div className="relative mt-14">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_60px_-40px_oklch(0.21_0.03_264/0.45)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="mono-label text-muted-foreground">cam_00 · rgb 1920×1080 · 30fps</span>
              <span className="mono-label flex items-center gap-1.5 text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> inference active
              </span>
            </div>
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
                  LIVE 6DOF PERCEPTION <span className="text-muted-foreground">| Latency: 38ms</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 sm:bottom-6 sm:left-6 sm:right-auto">
            <div className="rounded-lg border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
              <div className="mono-label text-muted-foreground">Pose · 6DOF</div>
              <div className="mt-1.5 font-mono text-sm tracking-tight">
                X: <span className="text-primary">+{x}mm</span> &nbsp;Y:{" "}
                <span className="text-primary">{y}mm</span> &nbsp;Z:{" "}
                <span className="text-primary">{z}mm</span>
              </div>
              <div className="mt-1 font-mono text-sm tracking-tight text-muted-foreground">
                Rx: 2.4° &nbsp;Ry: -11.8° &nbsp;Rz: 87.1°
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
              <div className="mono-label text-muted-foreground">Latency</div>
              <div className="mt-1.5 font-mono text-sm text-signal">{latency}ms</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
