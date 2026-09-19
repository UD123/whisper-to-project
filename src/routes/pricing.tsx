import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { LanguageProvider, useI18n } from "@/i18n/LanguageProvider";
import { pricingDict, type PricingTier } from "@/i18n/pricing";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { toast } from "sonner";

const title = "Pose6D Licensing & Pricing | RobotAI";
const description =
  "Pose6D license options: free evaluation, per-object production licenses at $100, and a $1,000 perpetual workstation license.";

export const Route = createFileRoute("/pricing")({
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
  component: PricingPage,
});

function PricingPage() {
  return (
    <LanguageProvider>
      <PricingLayout />
    </LanguageProvider>
  );
}

function PricingLayout() {
  const { lang } = useI18n();
  const p = pricingDict[lang];

  return (
    <div className="min-h-screen bg-background">
      <PaymentTestModeBanner />
      <Navbar hashBase="/" solid section="pricing" />
      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="cad-grid-lg pointer-events-none absolute inset-0 opacity-90" />
          <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 md:pt-20">
            <span className="mono-label text-primary">{p.eyebrow}</span>
            <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
              {p.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {p.subtitle}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {p.tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">{p.note}</p>

          <div className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">{p.faqTitle}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {p.faq.map((item) => (
                <div key={item.q} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer hashBase="/" />
    </div>
  );
}

function TierCard({ tier }: { tier: PricingTier }) {
  const { openCheckout } = usePaddleCheckout();
  const [busy, setBusy] = useState(false);

  const buy = async () => {
    if (!tier.priceId) return;
    setBusy(true);
    try {
      await openCheckout({
        priceId: tier.priceId,
        quantity: 1,
        successUrl: `${window.location.origin}/checkout/success`,
      });
    } catch (e) {
      console.error(e);
      toast.error("Checkout could not be opened. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-xl border bg-card p-7 ${
        tier.featured ? "border-foreground shadow-sm" : "border-border"
      }`}
    >
      <span className="mono-label text-muted-foreground">{tier.name}</span>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-[-0.03em]">{tier.price}</span>
        <span className="text-sm text-muted-foreground">{tier.unit}</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tier.desc}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {tier.priceId ? (
        <button
          type="button"
          onClick={buy}
          disabled={busy}
          className="mono-label mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {tier.cta}
        </button>
      ) : (
        <a
          href={tier.href}
          className="mono-label mt-7 inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 transition-colors hover:bg-muted"
        >
          {tier.cta}
        </a>
      )}
    </div>
  );
}
