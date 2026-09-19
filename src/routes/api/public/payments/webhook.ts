import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { verifyWebhook, gatewayFetch, EventName, type PaddleEnv } from "@/lib/paddle.server";

let _supabase: ReturnType<typeof createClient<Database>> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient<Database>(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_SERVICE_ROLE_KEY"]!,
    );
  }
  return _supabase;
}

function licenseKeyFor(transactionId: string): string {
  const raw = transactionId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(-16).padStart(16, "X");
  return `P6D-${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}`;
}

async function fetchCustomer(env: PaddleEnv, customerId?: string) {
  if (!customerId) return { email: null as string | null, name: null as string | null };
  try {
    const res = await gatewayFetch(env, `/customers/${encodeURIComponent(customerId)}`);
    const json = (await res.json()) as { data?: { email?: string; name?: string } };
    return { email: json.data?.email ?? null, name: json.data?.name ?? null };
  } catch (e) {
    console.error("Failed to fetch customer", e);
    return { email: null, name: null };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleTransaction(data: any, env: PaddleEnv, status: string) {
  const transactionId: string | undefined = data?.id;
  if (!transactionId) return;

  const item = data?.items?.[0];
  const priceId: string | null = item?.price?.importMeta?.externalId ?? item?.price?.id ?? null;
  const productId: string | null =
    item?.product?.importMeta?.externalId ?? item?.price?.productId ?? null;
  const quantity: number = item?.quantity ?? 1;

  const totals = data?.details?.totals;
  const amountCents = Number(totals?.total ?? data?.details?.totals?.grandTotal ?? 0) || 0;
  const currency: string = data?.currencyCode ?? "USD";

  const customer = await fetchCustomer(env, data?.customerId);

  const { error } = await getSupabase()
    .from("orders")
    .upsert(
      {
        paddle_transaction_id: transactionId,
        paddle_customer_id: data?.customerId ?? null,
        customer_email: customer.email,
        customer_name: customer.name,
        product_id: productId,
        price_id: priceId,
        quantity,
        amount_cents: amountCents,
        currency,
        status,
        license_key: status === "completed" ? licenseKeyFor(transactionId) : null,
        environment: env,
        user_id: data?.customData?.userId ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "paddle_transaction_id" },
    );

  if (error) console.error("Failed to store order", error);
}

async function handleWebhook(req: Request, env: PaddleEnv) {
  const event = await verifyWebhook(req, env);

  switch (event.eventType) {
    case EventName.TransactionCompleted:
      await handleTransaction(event.data, env, "completed");
      break;
    case EventName.TransactionPaymentFailed:
      await handleTransaction(event.data, env, "payment_failed");
      break;
    default:
      console.log("Unhandled event:", event.eventType);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const env = (url.searchParams.get("env") || "sandbox") as PaddleEnv;
        try {
          await handleWebhook(request, env);
          return Response.json({ received: true });
        } catch (e) {
          console.error("Webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
