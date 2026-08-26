import { BrandLogo } from "./BrandLogo";

const groups = [
  {
    label: "Camera interfaces",
    items: ["IDS", "Basler", "RealSense", "Allied Vision", "Balluff / Matrix V", "Miniature USB RGB"],
  },
  {
    label: "Robot brands",
    items: [
      "Universal Robots",
      "Fanuc",
      "Kuka",
      "ABB",
      "Yaskawa",
      "Hanwha",
      "TM Robots",
      "Denso",
      "Nachi",
      "Mitsubishi",
      "Dobot",
    ],
  },
  {
    label: "Communication protocols",
    items: ["TCP/IP", "MODBUS", "REST API", "ROS", "ROS2"],
  },
  {
    label: "Computing hardware",
    items: ["Windows industrial PC", "Linux industrial PC", "NVIDIA GPU (sub-30 ms)"],
  },
];

export function Ecosystem() {
  return (
    <section id="specs" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">04 — Ecosystem</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Universal Hardware &amp; Protocol Compatibility
          </h2>
          <p className="mt-4 text-muted-foreground">
            Zero vendor lock-in. Seamless integration with your existing industrial computer and
            robotic fleet.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.label} className="rounded-xl border border-border bg-card p-7">
              <h3 className="mono-label text-muted-foreground">{g.label}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <BrandLogo key={i} name={i} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
