import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { gatewayFetch, type PaddleEnv } from "@/lib/paddle.server";

export const resolvePaddlePrice = createServerFn({ method: "GET" })
  .inputValidator((data: { priceId: string; environment: PaddleEnv }) => data)
  .handler(async ({ data }) => {
    const response = await gatewayFetch(
      data.environment,
      `/prices?external_id=${encodeURIComponent(data.priceId)}`,
    );
    const result = (await response.json()) as { data?: Array<{ id: string }> };
    if (!result.data?.length) throw new Error("Price not found");
    return result.data[0]!.id;
  });

export type OrderRow = {
  id: string;
  created_at: string;
  customer_email: string | null;
  customer_name: string | null;
  product_id: string | null;
  price_id: string | null;
  quantity: number;
  amount_cents: number;
  currency: string;
  status: string;
  license_key: string | null;
  environment: string;
  paddle_transaction_id: string;
};

/**
 * Admin-only order list. The first signed-in user claims the admin role via
 * claim_admin(); everyone else is rejected.
 */
export const listOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: claimError } = await context.supabase.rpc("claim_admin");
    if (claimError) throw new Error(claimError.message);
    if (!isAdmin) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select(
        "id, created_at, customer_email, customer_name, product_id, price_id, quantity, amount_cents, currency, status, license_key, environment, paddle_transaction_id",
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw new Error(error.message);
    return (data ?? []) as OrderRow[];
  });

export type MyLicense = {
  id: string;
  created_at: string;
  product_id: string | null;
  amount_cents: number;
  currency: string;
  status: string;
  license_key: string | null;
  revoked_at: string | null;
  paddle_transaction_id: string;
};

/** Signed-in customer's own orders/licenses (RLS: user_id = auth.uid()). */
export const listMyLicenses = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("id, created_at, product_id, amount_cents, currency, status, license_key, revoked_at, paddle_transaction_id")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((o) => ({
      ...o,
      // Never expose a key that was revoked by a refund.
      license_key: o.revoked_at ? null : o.license_key,
    })) as MyLicense[];
  });

function freeLicenseKey(seed: string): string {
  const raw = seed.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(-16).padStart(16, "X");
  return `P6D-${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}`;
}

/** Free Demo license: registration only, one per account, no payment. */
export const claimDemoLicense = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const txId = `free_demo_${context.userId}`;
    const { data: existing } = await supabaseAdmin
      .from("orders")
      .select("id")
      .eq("paddle_transaction_id", txId)
      .maybeSingle();
    if (existing) return { alreadyClaimed: true };
    const email = (context.claims as { email?: string }).email ?? null;
    const { error } = await supabaseAdmin.from("orders").insert({
      paddle_transaction_id: txId,
      customer_email: email,
      product_id: "pose6d_demo",
      price_id: "pose6d_demo_free",
      quantity: 1,
      amount_cents: 0,
      currency: "USD",
      status: "completed",
      license_key: freeLicenseKey(crypto.randomUUID()),
      environment: "free",
      user_id: context.userId,
    });
    if (error) throw new Error(error.message);
    return { alreadyClaimed: false };
  });
