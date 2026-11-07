import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { passwordFormSchema } from "@/lib/password-schema";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password | RobotAI" },
      {
        name: "description",
        content: "Set a new password for your RobotAI account.",
      },
      { property: "og:title", content: "Reset password | RobotAI" },
      {
        property: "og:description",
        content: "Set a new password for your RobotAI account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  // The reset link lands here with a recovery token in the URL. The Supabase
  // client reads it and raises PASSWORD_RECOVERY; confirm the session with
  // getUser() so a stale or hand-typed URL cannot open the form.
  useEffect(() => {
    let active = true;

    const settle = async () => {
      const { data } = await supabase.auth.getUser();
      if (!active) return;
      setChecked(true);
      if (data.user) setRecovery(true);
    };

    const subscription = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        void settle();
      }
    });
    const timer = setTimeout(() => void settle(), 1500);

    return () => {
      active = false;
      subscription.data.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = passwordFormSchema.safeParse({ password, confirm });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the new password");
      return;
    }

    setBusy(true);
    try {
      // Recovery sessions are exempt from the current-password requirement,
      // so only the new password is sent here.
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Password updated. You're signed in.");
      navigate({ to: "/account" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-7">
        <span className="mono-label text-primary">RobotAI</span>

        {!checked ? (
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Checking your reset link…
          </p>
        ) : recovery ? (
          <form onSubmit={submit}>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">Choose a new password</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your new password twice to finish resetting it.
            </p>

            <label className="mono-label mt-6 block text-muted-foreground" htmlFor="password">
              New password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />

            <label className="mono-label mt-4 block text-muted-foreground" htmlFor="confirm">
              Confirm new password
            </label>
            <input
              id="confirm"
              type="password"
              required
              minLength={6}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />

            <button
              type="submit"
              disabled={busy}
              className="mono-label mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Update password
            </button>
          </form>
        ) : (
          <>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">This reset link isn't valid</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Reset links expire after one use. Request a new one from the sign-in page.
            </p>
            <Link
              to="/auth"
              className="mono-label mt-6 inline-flex w-full items-center justify-center rounded-md border border-border px-4 py-2.5 text-foreground transition-colors hover:bg-accent"
            >
              Back to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
