import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { usageAgreement } from "@/content/usage-agreement";

const URL = "https://whisper-to-project.lovable.app/usage-agreement";

export const Route = createFileRoute("/usage-agreement")({
  head: () => ({
    meta: [
      { title: "Usage Agreement — RobotAI" },
      { name: "description", content: "Terms governing the use of RobotAI Ltd. products and services, including Pose6D." },
      { property: "og:title", content: "Usage Agreement — RobotAI" },
      { property: "og:description", content: "Terms governing the use of RobotAI Ltd. products and services." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: UsageAgreementPage,
});

const slug = (t: string) => "s" + t.split(".")[0];

function UsageAgreementPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar hashBase="/" solid />
        <main className="mx-auto max-w-4xl px-6 pb-20 pt-32">
          <p className="mono-label text-muted-foreground">Legal</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Usage Agreement</h1>
          <nav className="mt-8 rounded-md border border-border bg-card p-5">
            <p className="mono-label mb-3 text-muted-foreground">Contents</p>
            <ol className="grid gap-1 text-sm sm:grid-cols-2">
              {usageAgreement.sections.map((s) => (
                <li key={s.title}>
                  <a href={`#${slug(s.title)}`} className="text-muted-foreground hover:text-foreground">{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-10 space-y-4 text-sm leading-relaxed text-foreground/90">
            {usageAgreement.intro.map((p) => <p key={p}>{p}</p>)}
          </div>
          {usageAgreement.sections.map((s) => (
            <section key={s.title} id={slug(s.title)} className="mt-12 scroll-mt-28 border-t border-border pt-8">
              <h2 className="font-mono text-base font-semibold tracking-tight">{s.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/90">
                {s.paras.map((p) => <p key={p}>{p}</p>)}
              </div>
            </section>
          ))}
        </main>
        <Footer hashBase="/" />
      </div>
    </LanguageProvider>
  );
}
