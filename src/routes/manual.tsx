import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/manual")({
  head: () => ({
    meta: [
      { title: "Pose6D User Manual — RobotAI" },
      { name: "description", content: "Full Pose6D user manual: camera setup, object teaching, validation, robot setup, communication and troubleshooting." },
      { property: "og:title", content: "Pose6D User Manual — RobotAI" },
      { property: "og:description", content: "Step-by-step Pose6D manual for 6DoF pose estimation with 2D cameras." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ManualPage,
});

function ManualPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar hashBase="/" solid section="manual" />
      <iframe src="/manual/index.html" title="Pose6D User Manual" className="w-full flex-1 border-0" />
    </div>
  );
}
