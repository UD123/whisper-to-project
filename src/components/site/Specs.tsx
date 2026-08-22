import { Download } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const groups = [
  {
    id: "pose",
    title: "Pose Estimation",
    rows: [
      ["output", "6DOF (X, Y, Z, Rx, Ry, Rz)"],
      ["accuracy", "±0.4 mm translation / ±0.5° rotation"],
      ["input", "single monocular RGB frame"],
    ],
  },
  {
    id: "speed",
    title: "Inference Speed",
    rows: [
      ["latency", "< 50 ms per frame"],
      ["throughput", "up to 30 fps continuous"],
      ["mode", "edge, no cloud round-trip"],
    ],
  },
  {
    id: "hardware",
    title: "Supported Hardware",
    rows: [
      ["cameras", "standard USB3 / GigE 2D cameras"],
      ["compute", "NVIDIA Jetson Orin / Edge PC"],
      ["calibration", "hand-eye, automated"],
    ],
  },
  {
    id: "interfaces",
    title: "Robot & Software Interfaces",
    rows: [
      ["middleware", "ROS, ROS2, gRPC"],
      ["sdk", "Python SDK, C++ API"],
      ["robots", "Universal Robots URCaps, KUKA, ABB, FANUC"],
    ],
  },
];

export function Specs() {
  return (
    <section id="specs" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="mono-label text-primary">05 — Specification</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              Technical Specifications &amp; Compatibility
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything a CTO or integration engineer needs before the first pilot cell.
            </p>
            <a
              href="#demo"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium transition-all duration-200 hover:border-foreground/25 hover:shadow-sm"
            >
              <Download className="h-4 w-4" strokeWidth={1.7} />
              Download Technical Datasheet (PDF)
            </a>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="pose"
            className="rounded-xl border border-border bg-card px-2"
          >
            {groups.map((g) => (
              <AccordionItem key={g.id} value={g.id} className="border-border last:border-b-0">
                <AccordionTrigger className="px-4 text-base font-medium hover:no-underline">
                  {g.title}
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <dl className="divide-y divide-border border-t border-border">
                    {g.rows.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-3">
                        <dt className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                          {k}
                        </dt>
                        <dd className="font-mono text-[13px] tracking-tight">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
