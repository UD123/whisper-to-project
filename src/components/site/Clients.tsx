import abb from "@/assets/logos/abb.svg";
import denso from "@/assets/logos/denso.svg";
import ford from "@/assets/logos/clients/ford.svg";
import whirlpool from "@/assets/logos/clients/whirlpool.svg";
import delta from "@/assets/logos/clients/delta.svg";
import itpAero from "@/assets/logos/clients/itp-aero.svg";
import { useT } from "@/i18n/LanguageProvider";

const CLIENTS = [
  { name: "ABB", src: abb },
  { name: "Ford", src: ford },
  { name: "DENSO", src: denso },
  { name: "Whirlpool", src: whirlpool },
  { name: "Delta", src: delta },
  { name: "ITP Aero", src: itpAero },
];

export function Clients() {
  const t = useT();

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <span className="mono-label text-muted-foreground">{t.clients.eyebrow}</span>
          <p className="max-w-xl text-sm text-muted-foreground">{t.clients.note}</p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CLIENTS.map((c) => (
            <li
              key={c.name}
              title={c.name}
              className="group flex h-20 items-center justify-center rounded-xl border border-border bg-card px-5 transition hover:border-foreground/20"
            >
              <img
                src={c.src}
                alt={`${c.name} logo`}
                loading="lazy"
                className="logo-muted max-h-8 w-auto max-w-[120px] object-contain opacity-90 transition duration-300 group-hover:opacity-100 group-hover:[filter:none]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
