import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { GuideSidebar } from "@/components/site/guide/GuideSidebar";
import { Callout, DocCard, MenuPath, PathChip } from "@/components/site/guide/GuideBits";
import { InstallDiagram, FolderTree } from "@/components/site/guide/GuideDiagrams";
import { GuideVideo } from "@/components/site/guide/GuideVideo";
import { GuideAccordion, useGuideAccordion } from "@/components/site/guide/GuideAccordion";
import { guide } from "@/content/guide";
import { guideSections } from "@/content/guide-sections";
import { guideVideo } from "@/content/guide-media";
import { GuideSectionBody } from "@/components/site/guide/GuideSectionBlocks";
import userGuidePdf from "@/assets/guide/user-guide.pdf.asset.json";
import checkerboardPdf from "@/assets/guide/checkerboard.pdf.asset.json";

const title = "Pose6D Documentation — Installation & Getting Started | RobotAI";
const description =
  "Step-by-step Pose6D setup guide: hardware requirements, Windows installation, USB test verification and the full route to 6DOF pose estimation on your own part.";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidePage,
});

const pdfs: Record<string, string> = {
  manual: userGuidePdf.url,
  checkerboard: checkerboardPdf.url,
};

const accordionIds = [
  "video",
  "installation",
  ...guideSections.map((s) => s.id),
  "downloads",
];

function GuidePage() {
  return (
    <LanguageProvider>
      <GuideContent />
    </LanguageProvider>
  );
}

function GuideContent() {
  const { lang } = useI18n();
  const g = lang === "zh" ? guideZh : guide;
  const sections = lang === "zh" ? guideSectionsZh : guideSections;
  const tabs = g.installation.tabs;
  const [tab, setTab] = useState(tabs[0]!.id);
  const active = tabs.find((t) => t.id === tab) ?? tabs[0]!;
  const acc = useGuideAccordion(accordionIds, ["installation"]);

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar hashBase="/" solid section="docs" />


        <main id="top">
          {/* Page header */}
          <section className="relative overflow-hidden border-b border-border">
            <div className="cad-grid-lg pointer-events-none absolute inset-0 opacity-90" />
            <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 md:pt-20">
              <span className="mono-label text-primary">{g.meta.eyebrow}</span>
              <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
                {g.meta.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {g.meta.subtitle}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={userGuidePdf.url}
                  download
                  className="rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  {g.meta.download}
                </a>
              </div>
            </div>
          </section>

          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-16">
            <GuideSidebar items={g.nav} />

            <div className="min-w-0">
              {/* Overview */}
              <section id="overview" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  {g.overview.title}
                </h2>
                {g.overview.body.map((p) => (
                  <p key={p} className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </section>

              {/* Main steps */}
              <section id="main-steps" className="mt-16 scroll-mt-24">
                <span className="mono-label text-primary">{g.steps.eyebrow}</span>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  {g.steps.title}
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">{g.steps.subtitle}</p>

                <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                  {g.steps.items.map((s) => {
                    const inner = (
                      <>
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-mono text-xl tracking-tight text-primary">
                            {s.n}
                          </span>
                          {s.href ? (
                            <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                          ) : (
                            <span className="mono-label text-muted-foreground/70">
                              {g.steps.soon}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-4 text-base font-semibold tracking-tight">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {s.detail}
                        </p>
                      </>
                    );

                    return (
                      <li key={s.n}>
                        {s.href ? (
                          <a
                            href={s.href}
                            className="group block h-full rounded-xl border border-border bg-card p-5 transition-all hover:border-foreground/25 hover:shadow-sm"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div className="h-full rounded-xl border border-border bg-background p-5">
                            {inner}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </section>

              {/* Instructions — collapsible */}
              <section className="mt-16">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                    Instructions
                  </h2>
                  <button
                    type="button"
                    onClick={() => (acc.allOpen ? acc.collapseAll() : acc.expandAll())}
                    className="mono-label rounded-md border border-border bg-card px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {acc.allOpen ? "Collapse all" : "Expand all"}
                  </button>
                </div>

                <div className="mt-6">
                  {/* Video guide */}
                  <GuideAccordion
                    id="video"
                    title={g.video.title}
                    summary={g.video.subtitle}
                    open={acc.isOpen("video")}
                    onToggle={acc.toggle}
                  >
                    <GuideVideo
                      video={guideVideo[g.video.key]!}
                      label={g.video.label}
                      caption={g.video.title}
                    />
                  </GuideAccordion>

                  {/* Installation */}
                  <GuideAccordion
                    id="installation"
                    n="01"
                    title={g.installation.title}
                    summary={g.installation.subtitle}
                    open={acc.isOpen("installation")}
                    onToggle={acc.toggle}
                  >
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">
                      {g.installation.requirementsTitle}
                    </h3>
                    <dl className="mt-4 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
                      {g.installation.requirements.map((r) => (
                        <div
                          key={r.k}
                          className="grid gap-1 bg-card px-5 py-4 sm:grid-cols-[200px_180px_minmax(0,1fr)] sm:items-baseline sm:gap-4"
                        >
                          <dt className="mono-label text-muted-foreground">{r.k}</dt>
                          <dd className="font-mono text-sm">{r.v}</dd>
                          <dd className="text-sm text-muted-foreground">{r.note}</dd>
                        </div>
                      ))}
                    </dl>

                    <Callout label={g.installation.callout.label}>
                      {g.installation.callout.text}
                    </Callout>

                    <InstallDiagram
                      label={g.installation.diagramLabel}
                      caption={g.installation.diagramCaption}
                    />

                    <h3 className="mt-12 text-lg font-semibold tracking-tight">
                      {g.installation.installTitle}
                    </h3>
                    <ol className="mt-4 space-y-3">
                      {g.installation.installSteps.map((s, i) => (
                        <li
                          key={s.title}
                          className="rounded-xl border border-border bg-card px-4 py-3.5 sm:flex sm:gap-4"
                        >
                          <span className="font-mono text-sm text-primary">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="mt-1.5 sm:mt-0">
                            <p className="text-sm font-semibold tracking-tight">{s.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {s.body}
                            </p>
                            {s.path ? <PathChip value={s.path} /> : null}
                            {"file" in s && s.file ? (
                              <span className="mt-2 inline-flex items-center gap-2 rounded-md border border-dashed border-border bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground">
                                {s.file} · {g.installation.fileSoon}
                              </span>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ol>

                    <FolderTree
                      label={g.installation.structureLabel}
                      root="C:\RobotAI\Parts\usb_test"
                      items={g.installation.structure}
                    />

                    {/* Verification */}
                    <div id="verification" className="mt-14 scroll-mt-24">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {g.installation.verificationTitle}
                      </h3>
                      <p className="mt-3 max-w-2xl text-muted-foreground">
                        {g.installation.verificationSubtitle}
                      </p>

                      <div className="mt-6 inline-flex rounded-lg border border-border bg-card p-1">
                        {g.installation.tabs.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setTab(t.id)}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                              tab === t.id
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {t.name}
                          </button>
                        ))}
                      </div>

                      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {active.intro}
                      </p>

                      <ol className="mt-5 space-y-3">
                        {active.steps.map((s, i) => (
                          <li
                            key={`${active.id}-${i}`}
                            className="rounded-xl border border-border bg-card px-4 py-3.5 sm:flex sm:gap-4"
                          >
                            <span className="font-mono text-sm text-primary">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="mt-1.5 min-w-0 sm:mt-0">
                              {"menu" in s && s.menu ? <MenuPath parts={s.menu} /> : null}
                              <p
                                className={`text-sm leading-relaxed ${
                                  "result" in s && s.result
                                    ? "font-medium text-foreground"
                                    : "text-muted-foreground"
                                } ${"menu" in s && s.menu ? "mt-3" : ""}`}
                              >
                                {s.body}
                              </p>
                              {"path" in s && s.path ? <PathChip value={s.path} /> : null}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </GuideAccordion>

                  {/* Sections 02–07 */}
                  {guideSections.map((s) => (
                    <GuideAccordion
                      key={s.id}
                      id={s.id}
                      n={s.n}
                      title={s.title}
                      summary={s.summary}
                      open={acc.isOpen(s.id)}
                      onToggle={acc.toggle}
                    >
                      <GuideSectionBody section={s} />
                    </GuideAccordion>
                  ))}

                  {/* Documents */}
                  <GuideAccordion
                    id="downloads"
                    title={g.downloads.title}
                    summary={g.downloads.subtitle}
                    open={acc.isOpen("downloads")}
                    onToggle={acc.toggle}
                  >
                    <div className="space-y-4">
                      {g.downloads.items.map((d) => (
                        <DocCard
                          key={d.id}
                          name={d.name}
                          note={d.note}
                          url={pdfs[d.id]!}
                          labels={{
                            open: g.downloads.open,
                            close: g.downloads.close,
                            download: g.downloads.download,
                          }}
                        />
                      ))}
                    </div>
                  </GuideAccordion>
                </div>
              </section>

              <section className="mt-16">
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-6">
                  <div>
                    <p className="text-base font-semibold tracking-tight">{g.help.title}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{g.help.body}</p>
                  </div>
                  <a
                    href="/#demo"
                    className="rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    {g.help.cta}
                  </a>
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer hashBase="/" />
      </div>
    </LanguageProvider>
  );
}
