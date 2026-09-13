import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Terminal, Download, AlertCircle, FileText } from "lucide-react";
import { LanguageProvider, useT } from "@/i18n/LanguageProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const title = "Pose6D Downloads — Windows & Linux | RobotAI";
const description = "Download Pose6D for Windows or Linux. Runtime, calibration tools and camera drivers for industrial 6DOF pose estimation.";

const WINDOWS_URL =
  "https://github.com/RobotAI-Global/pose6d-deploy/releases/download/v25.09-windows-cpu/Pose6D-2509-cpu.exe";
const TEMP_LINUX_URL =
  "https://github.com/robotai-vision/pose6d/releases/download/v1.0.0/Pose6D-Linux";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <LanguageProvider>
      <DownloadLayout />
    </LanguageProvider>
  );
}

function DownloadLayout() {
  const t = useT();
  const d = t.download;

  return (
    <div className="min-h-screen bg-background">
      <Navbar hashBase="/" solid section="download" />
      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="cad-grid-lg pointer-events-none absolute inset-0 opacity-90" />
          <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 md:pt-20">
            <span className="mono-label text-primary">{d.eyebrow}</span>
            <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
              {d.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {d.subtitle}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <DownloadContent />
        </section>
      </main>
      <Footer hashBase="/" />
    </div>
  );
}

function DownloadContent() {
  const t = useT();
  const d = t.download;

  return (
    <div className="space-y-14">
      <div className="grid gap-6 md:grid-cols-2">
        <PlatformCard
          icon={<Monitor className="h-6 w-6" />}
          platform={d.windows.title}
          desc={d.windows.desc}
          file={d.windows.file}
          button={d.windows.button}
          href={WINDOWS_URL}
          note={d.windows.note}
        />
        <PlatformCard
          icon={<Terminal className="h-6 w-6" />}
          platform={d.linux.title}
          desc={d.linux.desc}
          file={d.linux.file}
          button={d.linux.button}
          href={TEMP_LINUX_URL}
          note={d.linux.note}
        />
      </div>

      <section>
        <span className="mono-label text-primary">{d.manual.title}</span>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
          {d.manual.title}
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{d.manual.desc}</p>

        <div className="mt-6 flex flex-col rounded-xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-semibold tracking-tight">{d.manual.file}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.manual.note}</p>
            </div>
          </div>
          <a
            href="/media/Pose6D-User-Guide.pdf"
            download
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 md:mt-0"
          >
            <Download className="h-4 w-4" />
            {d.manual.button}
          </a>
        </div>
      </section>
    </div>
  );
}

function PlatformCard({
  icon,
  platform,
  desc,
  file,
  button,
  href,
  note,
}: {
  icon: React.ReactNode;
  platform: string;
  desc: string;
  file: string;
  button: string;
  href: string;
  note: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-primary">
          {icon}
        </span>
        <h2 className="text-xl font-semibold tracking-tight">{platform}</h2>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>

      <div className="mt-6 rounded-lg border border-border bg-background px-4 py-3">
        <span className="mono-label text-muted-foreground">File</span>
        <p className="mt-1 font-mono text-sm break-all">{file}</p>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <a
          href={href}
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          {button}
        </a>
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{note}</span>
        </p>
      </div>
    </div>
  );
}
