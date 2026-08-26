import { MediaSlot } from "./MediaSlot";
import objectLocalizationVideo from "@/assets/object-localization.mp4.asset.json";
import machineTendingVideo from "@/assets/machine-tending.mp4.asset.json";
import randomBinPickingVideo from "@/assets/random-bin-picking.mp4.asset.json";


const apps = [
  {
    id: "bin_picking",
    title: "Random Bin Picking",
    desc: "Small parts, reflective bolts, chaotic orientation in deep bins.",
    src: "", // [BIN_PICKING_VIDEO_OR_IMAGE_URL]
  },
  {
    id: "machine_tending",
    title: "Machine Tending",
    desc: "Exact positioning, CNC loading/unloading, press operation.",
    src: machineTendingVideo.url, // [MACHINE_TENDING_VIDEO_OR_IMAGE_URL]
  },
  {
    id: "object_localization",
    title: "Single & Multiple Object 3D Localization",
    desc: "Polished metal, translucent plastic, small bolts, laminated items.",
    src: objectLocalizationVideo.url,
  },
  {
    id: "palletizing",
    title: "Palletizing & Depalletizing",
    desc: "Carton boxes, 4-object piles, dynamic warehouse logistics.",
    src: "", // [PALLETIZING_IMAGE_URL]
  },
  {
    id: "assembly",
    title: "Precise Positioning & Assembly",
    desc: "Connector insertion, electronic board alignment, trajectory tracking.",
    src: "", // [ASSEMBLY_IMAGE_URL]
  },
  {
    id: "agv_docking",
    title: "AGV, Forklift & Pallet Docking",
    desc: "Pallet relative positioning under varying load conditions.",
    src: "", // [DOCKING_IMAGE_URL]
  },
  {
    id: "agritech",
    title: "AgriTech / Special Applications",
    desc: "Mushroom growth analysis, leaf detection, flower cutting point estimation.",
    src: "", // [AGRI_IMAGE_URL]
  },
];

export function Applications() {
  return (
    <section id="use-cases" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">02 — Applications</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Field-Proven Industrial Applications
          </h2>
          <p className="mt-4 text-muted-foreground">
            Solving the “pick and place” problem where object positions and orientations are never
            fixed.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((a) => (
            <article
              key={a.id}
              className="flex flex-col rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_24px_50px_-32px_oklch(0.21_0.03_264/0.6)]"
            >
              <MediaSlot
                tone="dark"
                label={a.src ? `${a.id}.mp4` : `${a.id}.png`}
                caption={a.src ? a.title : "screenshot / diagram slot"}
                aspect="aspect-video"
                src={a.src}
              />
              <h3 className="mt-5 px-1 text-base font-semibold tracking-tight">{a.title}</h3>

              <p className="mt-2 px-1 pb-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
