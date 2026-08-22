import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer id="about">
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            Ready to Upgrade Your Robotic Vision?
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="#demo"
              className="rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 hover:shadow-[0_10px_28px_-12px_var(--foreground)]"
            >
              Book a Demo
            </a>
            <a
              href="https://youtube.com/@sensor3d"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border bg-background px-5 py-3 text-sm font-medium transition-all duration-200 hover:border-foreground/25 hover:shadow-sm"
            >
              Watch Real Technical Demos on YouTube (@sensor3d)
            </a>
          </div>
        </div>
      </div>

      <div className="cad-grid">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <LogoMark className="h-5 w-5 text-primary" />
              <span className="text-[17px] font-semibold tracking-tight">RobotAI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              6DOF object pose estimation from standard 2D RGB cameras. Built for industrial
              automation teams.
            </p>
            <p className="mono-label mt-5 text-muted-foreground">
              RobotAI Ltd. | Global presence: Korea • Poland
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <nav className="flex flex-wrap gap-6 text-sm">
              {[
                ["Usage Agreement", "#"],
                ["Terms of Use", "#"],
                ["Privacy Policy", "#"],
                ["LinkedIn Profile", "#"],
              ].map(([l, h]) => (
                <a
                  key={l}
                  href={h}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l}
                </a>
              ))}
            </nav>
            <p className="mono-label text-muted-foreground">
              © 2025-2026 RobotAI Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
