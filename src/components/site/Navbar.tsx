import { LogoMark } from "./Logo";

const links = [
  { label: "Technology", href: "#technology" },
  { label: "Applications", href: "#use-cases" },
  { label: "Workflow", href: "#workflow" },
  { label: "Compatibility", href: "#specs" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-[17px] font-semibold tracking-tight">
            <LogoMark className="h-5 w-5 text-primary" />
            RobotAI
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-2 py-1 sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <span className="mono-label text-muted-foreground">Live 6DOF</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#specs"
            className="hidden rounded-md border border-border bg-card px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:border-foreground/25 hover:shadow-sm sm:inline-flex"
          >
            Developer Docs
          </a>
          <a
            href="#demo"
            className="rounded-md bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-all duration-200 hover:opacity-90"
          >
            Request Demo
          </a>
        </div>
      </div>
    </header>
  );
}
