import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, RefreshCw } from "lucide-react";
import { listOrders, type OrderRow } from "@/utils/payments.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  head: () => ({
    meta: [
      { title: "License Orders | RobotAI Admin" },
      { name: "description", content: "Internal list of Pose6D license purchases." },
    ],
  }),
  component: OrdersPage,
});

function money(cents: number, currency: string) {
  const zeroDecimal = ["JPY", "KRW", "VND"].includes(currency.toUpperCase());
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    zeroDecimal ? cents : cents / 100,
  );
}

function OrdersPage() {
  const fetchOrders = useServerFn(listOrders);
  const [q, setQ] = useState("");

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchOrders(),
  });

  const orders = (data ?? []) as OrderRow[];

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return orders;
    return orders.filter((o) =>
      [o.customer_email, o.customer_name, o.product_id, o.license_key, o.paddle_transaction_id]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(needle)),
    );
  }, [orders, q]);

  const total = filtered
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.amount_cents, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="text-[17px] font-semibold tracking-tight">
            RobotAI
          </Link>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/auth";
            }}
            className="mono-label text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <span className="mono-label text-primary">Admin</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">License orders</h1>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search email, product, license key…"
            className="w-72 rounded-md border border-border bg-card px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => refetch()}
            className="mono-label inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 hover:bg-muted"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <div className="ml-auto flex gap-6 text-sm">
            <span className="text-muted-foreground">
              Orders: <span className="text-foreground">{filtered.length}</span>
            </span>
            <span className="text-muted-foreground">
              Revenue: <span className="text-foreground">{money(total, "USD")}</span>
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-12 flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading orders…
          </div>
        ) : error ? (
          <p className="mt-12 text-sm text-destructive">
            {(error as Error).message === "Forbidden"
              ? "This account is not an administrator."
              : (error as Error).message}
          </p>
        ) : filtered.length === 0 ? (
          <p className="mt-12 text-sm text-muted-foreground">
            No orders yet. Completed purchases appear here automatically.
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-muted/50">
                <tr className="mono-label text-left text-muted-foreground">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">License key</th>
                  <th className="px-4 py-3">Mode</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(o.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div>{o.customer_email ?? "—"}</div>
                      {o.customer_name ? (
                        <div className="text-muted-foreground">{o.customer_name}</div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">{o.product_id ?? "—"}</td>
                    <td className="px-4 py-3">{o.quantity}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {money(o.amount_cents, o.currency)}
                    </td>
                    <td className="px-4 py-3">{o.status}</td>
                    <td className="px-4 py-3 font-mono text-xs">{o.license_key ?? "—"}</td>
                    <td className="px-4 py-3">{o.environment === "sandbox" ? "test" : "live"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
