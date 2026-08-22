import { useCallback, useEffect, useRef, useState } from "react";
import scene2d from "@/assets/scene-2d.jpg";
import scene3d from "@/assets/scene-3d.jpg";

export function PerceptionSlider() {
  const [pos, setPos] = useState(52);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && update(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [update]);

  return (
    <section id="technology" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">02 — Perception layer</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            2D input in. Full 6DOF understanding out.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drag the handle to compare a raw RGB frame with the RobotAI inference layer running on the
            exact same image.
          </p>
        </div>

        <div
          ref={ref}
          onPointerDown={(e) => {
            dragging.current = true;
            update(e.clientX);
          }}
          className="relative mt-10 aspect-[4/3] w-full cursor-ew-resize overflow-hidden rounded-xl border border-border select-none sm:aspect-[16/9]"
        >
          <img
            src={scene2d}
            alt="Standard 2D RGB camera view of metal parts piled in an industrial bin"
            width={1280}
            height={960}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <img
              src={scene3d}
              alt="Same bin of parts with RobotAI 3D bounding boxes and XYZ pose axes overlaid"
              width={1280}
              height={960}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute top-4 right-4 rounded-md border border-border bg-card/95 px-3 py-1.5 font-mono text-[11px] tracking-tight text-success backdrop-blur">
              ● MATCHED · conf 0.98
            </span>
          </div>

          <span className="mono-label absolute top-4 left-4 rounded-md border border-border bg-card/95 px-3 py-1.5 backdrop-blur">
            Standard 2D RGB Input
          </span>
          <span className="mono-label absolute bottom-4 right-4 rounded-md border border-border bg-card/95 px-3 py-1.5 text-primary backdrop-blur">
            RobotAI AI Layer
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-primary"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-card font-mono text-[11px] text-primary shadow-lg">
              ⇄
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
