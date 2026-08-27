export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-3xl">
          <span className="mono-label text-primary">05 — About</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            About RobotAI
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            We are a deep-tech software company disrupting industrial automation. By replacing complex,
            expensive 3D hardware and lidars with high-performance RGB-based vision algorithms, we empower
            robotic systems with instant, material-agnostic 6DOF perception at a fraction of traditional
            costs.
          </p>
        </div>
      </div>
    </section>
  );
}
