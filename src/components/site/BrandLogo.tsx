import abb from "@/assets/logos/abb.svg";
import alliedVision from "@/assets/logos/allied-vision.svg";
import basler from "@/assets/logos/basler.svg";
import denso from "@/assets/logos/denso.svg";
import dobot from "@/assets/logos/dobot.svg";
import fanuc from "@/assets/logos/fanuc.svg";
import hanwha from "@/assets/logos/hanwha.svg";
import ids from "@/assets/logos/ids.svg";
import kuka from "@/assets/logos/kuka.svg";
import mitsubishi from "@/assets/logos/mitsubishi.svg";
import nachi from "@/assets/logos/nachi.svg";
import realsense from "@/assets/logos/realsense.svg";
import tmRobots from "@/assets/logos/tm-robots.svg";
import universalRobots from "@/assets/logos/universal-robots.svg";
import yaskawa from "@/assets/logos/yaskawa.svg";

const LOGOS: Record<string, string> = {
  ABB: abb,
  "Allied Vision": alliedVision,
  Basler: basler,
  Denso: denso,
  Dobot: dobot,
  Fanuc: fanuc,
  Hanwha: hanwha,
  IDS: ids,
  Kuka: kuka,
  Mitsubishi: mitsubishi,
  Nachi: nachi,
  RealSense: realsense,
  "TM Robots": tmRobots,
  "Universal Robots": universalRobots,
  Yaskawa: yaskawa,
};

export function hasBrandLogo(name: string): boolean {
  return name in LOGOS;
}

type BrandLogoProps = {
  name: string;
  className?: string;
};

export function BrandLogo({ name, className = "" }: BrandLogoProps) {
  const src = LOGOS[name];

  if (!src) {
    return (
      <li
        className={`rounded-md border border-border bg-background px-3 py-1.5 font-mono text-[12px] tracking-tight ${className}`}
      >
        {name}
      </li>
    );
  }

  return (
    <li
      className={`group flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 transition hover:border-foreground/20 ${className}`}
      title={name}
    >
      <img
        src={src}
        alt={`${name} logo`}
        loading="lazy"
        className="logo-muted h-6 w-auto max-w-[104px] object-contain opacity-90 transition duration-300 group-hover:opacity-100 group-hover:[filter:none]"
      />
    </li>
  );
}
