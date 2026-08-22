const categories = [
  {
    label: "Components & metal",
    items: [
      "Covers",
      "Rings",
      "Bolts",
      "Reflective knobs",
      "Metal housings",
      "Profiles",
      "Plates",
      "Connectors",
      "Flanges",
      "Tools",
    ],
  },
  {
    label: "Containers & packaging",
    items: ["Carton boxes", "Single boxes", "Packages", "Bottles", "Cups", "Trays", "Cases"],
  },
  {
    label: "Electronics & tech",
    items: ["Electronic boards", "PCB assemblies", "Phone housings", "Instruments"],
  },
  {
    label: "Complex materials",
    items: [
      "Reflective parts",
      "Translucent plastic",
      "Shiny polished metal",
      "Cloth / textiles",
      "Hangers",
    ],
  },
  {
    label: "Agri & organic",
    items: ["Apples", "Mushrooms", "Agricultural produce"],
  },
];

export function ObjectCatalog() {
  return (
    <section id="objects" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">05 — Catalog</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Trained Object Capability Catalog
          </h2>
          <p className="mt-4 text-muted-foreground">
            Proven 3D pose detection across diverse geometry and surface physics.
          </p>
        </div>

        <div className="mt-12 divide-y divide-border border-t border-border">
          {categories.map((c) => (
            <div key={c.label} className="grid gap-4 py-6 md:grid-cols-[220px_1fr]">
              <h3 className="mono-label pt-1 text-muted-foreground">{c.label}</h3>
              <ul className="flex flex-wrap gap-2">
                {c.items.map((i) => (
                  <li
                    key={i}
                    className="rounded-md border border-border bg-background px-3 py-1.5 font-mono text-[12px] tracking-tight"
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
