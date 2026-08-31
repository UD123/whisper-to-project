import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustMetrics } from "@/components/site/TrustMetrics";
import { RgbAdvantage } from "@/components/site/RgbAdvantage";
import { Applications } from "@/components/site/Applications";
import { Workflow } from "@/components/site/Workflow";
import { Ecosystem } from "@/components/site/Ecosystem";
import { Specs } from "@/components/site/Specs";
import { ObjectCatalog } from "@/components/site/ObjectCatalog";
import { About } from "@/components/site/About";
import { FAQ } from "@/components/site/FAQ";
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
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "zh_CN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <TrustMetrics />
          <RgbAdvantage />
          <Applications />
          <Workflow />
          <Ecosystem />
          <Specs />
          <ObjectCatalog />
          <About />
          <FAQ />
          <DemoForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
