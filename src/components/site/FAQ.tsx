import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Do we need to buy expensive new cameras or LIDARs?",
    a: "No. RobotAI is hardware-agnostic and works with standard industrial or compact USB RGB cameras you might already have.",
  },
  {
    q: "How long does integration take?",
    a: "Integration typically takes only a few days using standard industrial protocols (ROS, ROS2, Modbus, TCP/IP).",
  },
  {
    q: "How does the custom part evaluation work?",
    a: "You submit your part geometry and application type through our form. Our engine runs a pose-estimation evaluation on your specific components and we report back with the accuracy and performance metrics.",
  },
  {
    q: "What hardware is required for processing?",
    a: "Standard Windows or Linux industrial PCs equipped with an NVIDIA GPU for sub-30 ms inference.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">08 — FAQ</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            B2B FAQ
          </h2>
          <p className="mt-4 text-muted-foreground">
            Common questions from engineering and procurement teams.
          </p>
        </div>

        <div className="mt-12 max-w-3xl divide-y divide-border rounded-xl border border-border bg-background">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="px-6 py-5">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{f.q}</span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2} />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
