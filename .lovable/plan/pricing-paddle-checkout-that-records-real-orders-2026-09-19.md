# Pricing & Paddle — checkout that records real orders

Work happens in the existing draft **"Pricing & Paddle"**, so the live site stays untouched until you accept it. The draft is currently empty and behind the main project, so it gets refreshed from main first.

## Licenses

| License | Price | Type |
|---|---|---|
| Demo | $0 | free trial, no payment |
| Objects | $100 | one-time |
| Perpetual | $1000 | one-time |

## What gets built

1. **Payments enabled (Paddle, test mode)** — a test environment so you can run real checkout flows with test cards. Going live later needs Paddle verification.
2. **Products created** — Objects ($100) and Perpetual ($1000). Demo stays a free form-based request, no checkout.
3. **Pricing page (`/pricing`)** — a fourth tab next to Product / Docs / Download, in the site's Clean Lab style, EN + 中文. Three cards, feature list per tier, Buy button on the paid tiers, "Request demo" on Demo.
4. **Checkout** — clicking Buy opens Paddle checkout with buyer email; on success the buyer lands on a confirmation page.
5. **Orders saved automatically** — a Paddle webhook (signature-verified) writes every completed purchase to the database: buyer name/email, product, amount, currency, status, Paddle transaction id, timestamp, and a generated license key. Webhook retries can't create duplicates.
6. **Admin orders page (`/admin/orders`)** — sign-in protected, admin-only, lists every purchase with search and newest-first order, plus totals. You can also read the same rows directly in the backend data table.

## Technical notes

- New table `public.orders` with RLS: admins read all via `has_role(auth.uid(), 'admin')`, no public read; writes only from the webhook (service role). GRANTs included in the migration.
- Webhook lives at `src/routes/api/public/paddle-webhook.ts`; it verifies Paddle's signature before any write and is idempotent on the Paddle transaction id.
- Checkout session creation goes through a server function; price ids are resolved server-side so they can't be tampered with in the browser.
- `/admin/orders` sits under the authenticated route layout and reads through an admin-verified server function.

## After approval

I switch to the draft and build everything there. You review it in the draft's preview, run a test purchase, and accept it into the main project when it looks right.
