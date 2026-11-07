import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string | undefined } => {
    const r = typeof s["redirect"] === "string" ? s["redirect"] : undefined;
    // Only allow same-origin relative paths.
    return { redirect: r && r.startsWith("/") && !r.startsWith("//") ? r : undefined };
  },
  head: () => ({
    meta: [
      { title: "Sign in | RobotAI" },
      { name: "description", content: "Sign in to RobotAI to buy Pose6D licenses and view your license keys." },
      { property: "og:title", content: "Sign in | RobotAI" },
      { property: "og:description", content: "Sign in to buy and manage Pose6D licenses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const target = redirect ?? "/account";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data, error } =
        mode === "signin"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({
              email,
              password,
              options: { emailRedirectTo: `${window.location.origin}/auth?redirect=${encodeURIComponent(target)}` },
            });
      if (error) {
        toast.error(error.message);
        return;
      }
      if (!data.session) {
        toast.success("Check your email to confirm your account, then sign in.");
        setMode("signin");
        return;
      }
      navigate({ to: target as "/account" });
    } finally {
      setBusy(false);
    }
  };

  const sendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      setResetSent(true);
      toast.success("Reset link sent. Check your email.");
    } finally {
      setBusy(false);
    }
  };

  const closeForgot = () => {
    setForgotOpen(false);
    setResetSent(false);
  };

  if (forgotOpen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm rounded-xl border border-border bg-card p-7">
          <span className="mono-label text-primary">RobotAI</span>

          {resetSent ? (
            <>
              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">Check your email</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                If {email} has a RobotAI account, a password reset link is on its way. The link works once and
                expires soon.
              </p>
              <button
                type="button"
                onClick={closeForgot}
                className="mono-label mt-6 inline-flex w-full items-center justify-center rounded-md border border-border px-4 py-2.5 text-foreground transition-colors hover:bg-accent"
              >
                Back to sign in
              </button>
            </>
          ) : (
            <form onSubmit={sendResetLink}>
              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">Reset your password</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your account email and we'll send you a link to choose a new password.
              </p>

              <label className="mono-label mt-6 block text-muted-foreground" htmlFor="reset-email">
                Email
              </label>
              <input
                id="reset-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />

              <button
                type="submit"
                disabled={busy}
                className="mono-label mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Send reset link
              </button>
              <button
                type="button"
                onClick={closeForgot}
                className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
              >
                Back to sign in
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border border-border bg-card p-7">
        <span className="mono-label text-primary">RobotAI</span>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <label className="mono-label mt-6 block text-muted-foreground" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <label className="mono-label mt-4 block text-muted-foreground" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        {mode === "signin" ? (
          <button
            type="button"
            onClick={() => setForgotOpen(true)}
            className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Forgot your password?
          </button>
        ) : null}
        <button
          type="submit"
          disabled={busy}
          className="mono-label mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {mode === "signin" ? "Sign in" : "Sign up"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}
