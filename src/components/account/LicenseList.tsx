import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { listMyLicenses, type MyLicense } from "@/utils/payments.functions";

const PRODUCT_NAMES: Record<string, string> = {
  pose6d_demo: "Demo",
  pose6d_objects: "Objects",
  pose6d_perpetual: "Perpetual",
};

function money(cents: number, currency: string) {
  const zero = ["JPY", "KRW", "VND"].includes(currency.toUpperCase());
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(zero ? cents : cents / 100);
}

/** Lists the signed-in user's licenses. `waitForNew` polls until an order appears (after checkout). */
export function LicenseList({ waitForNew = false }: { waitForNew?: boolean }) {
  const fetchLicenses = useServerFn(listMyLicenses);
  const startedAt = useStartTime();
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-licenses"],
    queryFn: () => fetchLicenses(),
    refetchInterval: (q) => {
      if (!waitForNew) return false;
      const rows = (q.state.data ?? []) as MyLicense[];
      const fresh = rows.some((r) => new Date(r.created_at).getTime() >= startedAt - 10 * 60_000);
      return fresh || Date.now() - startedAt > 120_000 ? false : 3000;
    },
  });

  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
  if (error) return <p className="text-sm text-destructive">Could not load licenses.</p>;
  const rows = (data ?? []) as MyLicense[];
  if (!rows.length)
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        {waitForNew && <Loader2 className="h-4 w-4 animate-spin" />}
        {waitForNew ? "Confirming your payment… your license key will appear here in a few seconds." : "No licenses yet."}
      </p>
    );

  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.id} className="rounded-lg border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold">
              Pose6D {PRODUCT_NAMES[r.product_id ?? ""] ?? r.product_id ?? "License"}
            </span>
            <span className="mono-label text-muted-foreground">
              {new Date(r.created_at).toLocaleDateString()} · {money(r.amount_cents, r.currency)} · {r.status}
            </span>
          </div>
          <div className="mt-3 font-mono text-base tracking-wider">
            {r.license_key ? (
              r.license_key
            ) : r.status === "refunded" ? (
              <span className="text-sm text-muted-foreground">License revoked (refunded)</span>
            ) : r.status === "payment_failed" ? (
              <span className="text-sm text-destructive">Payment failed — no license issued</span>
            ) : (
              <span className="text-sm text-muted-foreground">Pending</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function useStartTime() {
  // Stable for the component's lifetime.
  const [t] = useStateOnce(() => Date.now());
  return t;
}
import { useState as useStateOnce } from "react";
