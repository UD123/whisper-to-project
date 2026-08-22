import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer id="about" className="cad-grid">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark className="h-5 w-5 text-primary" />
            <span className="text-[17px] font-semibold tracking-tight">RobotAI</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            3D robotic vision from a single 2D camera. Built for industrial automation teams.
          </p>
          <p className="mono-label mt-5 text-muted-foreground">HQ · Haifa, Israel</p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </a>
          </nav>
          <p className="mono-label text-muted-foreground">© 2026 RobotAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
