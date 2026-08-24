import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { RgbAdvantage } from "@/components/site/RgbAdvantage";
import { Applications } from "@/components/site/Applications";
import { Workflow } from "@/components/site/Workflow";
import { Ecosystem } from "@/components/site/Ecosystem";
import { ObjectCatalog } from "@/components/site/ObjectCatalog";
import { DemoForm } from "@/components/site/DemoForm";
import { Footer } from "@/components/site/Footer";

const title = "RobotAI — 6DOF Pose Estimation from a Standard 2D Camera";
const description =
  "Turn any RGB camera into a 3D measurement device. Sub-millimeter 6DOF pose estimation under 30ms for bin picking, machine tending and assembly — no LiDAR required.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteMediaProvider>
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <RgbAdvantage />
        <Applications />
        <Workflow />
        <Ecosystem />
        <ObjectCatalog />
        <DemoForm />
      </main>
      <Footer />
    </div>
    </SiteMediaProvider>
  );
}

