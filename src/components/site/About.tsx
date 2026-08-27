import aboutImage from "@/assets/robotai-about.png.asset.json";

export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
          <div>
            <span className="mono-label text-primary">07 — About</span>
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

          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <img
                src={aboutImage.url}
                alt="RobotAI leadership"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-lg border border-border bg-card px-4 py-2 shadow-sm md:block">
              <span className="mono-label text-muted-foreground">Founder & CEO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
