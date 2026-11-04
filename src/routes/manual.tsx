import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { LanguageProvider, useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/manual")({
  head: () => ({
    meta: [
      { title: "Pose6D User Manual — RobotAI" },
      { name: "description", content: "Full Pose6D user manual: camera setup, object teaching, validation, robot setup, communication and troubleshooting. Available in English and Chinese." },
      { property: "og:title", content: "Pose6D User Manual — RobotAI" },
      { property: "og:description", content: "Step-by-step Pose6D manual for 6DoF pose estimation with 2D cameras, in English and Chinese." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ManualPage,
});

function ManualPage() {
  return (
    <LanguageProvider>
      <ManualLayout />
    </LanguageProvider>
  );
}

function ManualLayout() {
  const { lang } = useI18n();
  const zh = lang === "zh";
  const src = zh ? "/user-guide/index.zh.html" : "/user-guide/index.html";

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar hashBase="/" solid section="manual" />
      <iframe
        src={src}
        title={zh ? "Pose6D 用户手册" : "Pose6D User Manual"}
        className="w-full flex-1 border-0"
      />
    </div>
  );
}
