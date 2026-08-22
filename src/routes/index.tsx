import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { PerceptionSlider } from "@/components/site/PerceptionSlider";
import { ValueProps } from "@/components/site/ValueProps";
import { UseCases } from "@/components/site/UseCases";
import { Specs } from "@/components/site/Specs";
import { DemoForm } from "@/components/site/DemoForm";
import { Footer } from "@/components/site/Footer";

const title = "RobotAI — 3D Robotic Vision from a Single 2D Camera";
const description =
  "Turn standard RGB cameras into 6DOF spatial sensors. Real-time AI pose estimation for bin picking, machine tending and assembly — without 3D LiDAR.";

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <PerceptionSlider />
        <ValueProps />
        <UseCases />
        <Specs />
        <DemoForm />
      </main>
      <Footer />
    </div>
  );
}
