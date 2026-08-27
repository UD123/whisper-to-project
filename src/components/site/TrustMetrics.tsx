import { Factory, Clock, Globe } from "lucide-react";

const metrics = [
  {
    icon: Factory,
    value: "5+",
    label: "Active Industrial Pilots",
    sub: "Production environments",
  },
  {
    icon: Clock,
    value: "< 30 ms",
    label: "Latency",
    sub: "NVIDIA GPU accelerated",
  },
  {
    icon: Globe,
    value: "Global",
    label: "Deployment",
    sub: "China · Japan · Singapore",
  },
];

export function TrustMetrics() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <div className="grid divide-y divide-border rounded-xl border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center gap-4 px-6 py-5">
              <m.icon className="h-5 w-5 text-primary" strokeWidth={1.7} />
              <div>
                <div className="font-mono text-xl tracking-tight text-foreground">{m.value}</div>
                <div className="text-sm font-medium text-foreground">{m.label}</div>
                <div className="mono-label mt-0.5 text-muted-foreground">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
