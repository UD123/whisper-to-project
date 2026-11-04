import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { LanguageProvider, useI18n } from "@/i18n/LanguageProvider";
import { pricingDict } from "@/i18n/pricing";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LicenseList } from "@/components/account/LicenseList";

const title = "Order Confirmed | RobotAI Pose6D";
const description = "Your Pose6D license purchase was completed. Your license key is shown here.";

export const Route = createFileRoute("/_authenticated/checkout/success")({
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
  component: () => (
    <LanguageProvider>
      <SuccessPage />
    </LanguageProvider>
  ),
});

function SuccessPage() {
  const { lang } = useI18n();
  const s = pricingDict[lang].success;

  return (
    <div className="min-h-screen bg-background">
      <Navbar hashBase="/" solid section="pricing" />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <span className="mono-label mt-6 block text-primary">{s.eyebrow}</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">{s.title}</h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{s.body}</p>
        <div className="mt-8">
          <LicenseList waitForNew />
        </div>
        <div className="mt-8 flex gap-3">
          <Link to="/account" className="mono-label rounded-md border border-border px-4 py-2.5 hover:bg-muted">
            My Licenses
          </Link>
          <Link to="/pricing" className="mono-label rounded-md border border-border px-4 py-2.5 hover:bg-muted">
            {s.back}
          </Link>
        </div>
      </main>
      <Footer hashBase="/" />
    </div>
  );
}
