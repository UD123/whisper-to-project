import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LicenseList } from "@/components/account/LicenseList";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "My Licenses | RobotAI Pose6D" },
      { name: "description", content: "Your Pose6D license keys and purchase history." },
      { property: "og:title", content: "My Licenses | RobotAI Pose6D" },
      { property: "og:description", content: "Your Pose6D license keys and purchase history." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LanguageProvider>
      <AccountPage />
    </LanguageProvider>
  ),
});

function AccountPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar hashBase="/" solid section="pricing" />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <span className="mono-label text-primary">Account</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">My Licenses</h1>
        <p className="mt-2 text-sm text-muted-foreground">Signed in as {user.email}</p>
        <div className="mt-8">
          <LicenseList />
        </div>
        <div className="mt-8 flex gap-3">
          <Link to="/pricing" className="mono-label rounded-md border border-border px-4 py-2.5 hover:bg-muted">
            Buy another license
          </Link>
          <button type="button" onClick={signOut} className="mono-label rounded-md border border-border px-4 py-2.5 hover:bg-muted">
            Sign out
          </button>
        </div>
      </main>
      <Footer hashBase="/" />
    </div>
  );
}
