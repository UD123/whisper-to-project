import { BrandLogo } from "./BrandLogo";
import { useT } from "@/i18n/LanguageProvider";

export function Ecosystem() {
  const t = useT();

  const groups = [
    {
      label: t.ecosystem.groups[0],
      items: ["IDS", "Basler", "RealSense", "Allied Vision", "Balluff / Matrix V"],
      extra: t.ecosystem.cameraExtra,
    },
    {
      label: t.ecosystem.groups[1],
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
      extra: [] as string[],
    },
    {
      label: t.ecosystem.groups[2],
      items: ["TCP/IP", "MODBUS", "REST API", "ROS", "ROS2"],
      extra: [] as string[],
    },
    {
      label: t.ecosystem.groups[3],
      items: [] as string[],
      extra: t.ecosystem.computing,
    },
  ];

  return (
    <section id="ecosystem" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">{t.ecosystem.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t.ecosystem.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.ecosystem.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.label} className="rounded-xl border border-border bg-card p-7">
              <h3 className="mono-label text-muted-foreground">{g.label}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <BrandLogo key={i} name={i} />
                ))}
                {g.extra.map((i) => (
                  <li
                    key={i}
                    className="rounded-md border border-border bg-background px-3 py-1.5 font-mono text-[12px] tracking-tight text-muted-foreground"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
