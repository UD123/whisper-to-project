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
