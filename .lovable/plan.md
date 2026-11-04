# How billing works today (no changes yet)

## What happens when a customer presses Buy
1. On the Pricing page, each license with a Buy button is linked to a Paddle price (e.g. Demo = $1 USD, test mode).
2. Pressing Buy opens Paddle's secure checkout as a pop-up over the page. Card details go straight to Paddle; the site never sees them.
3. Paddle charges the card and handles tax, receipts and invoices (Paddle is the legal seller).
4. On success, the customer is sent to the "Thank you" page.
5. In the background, Paddle notifies the site that payment completed (or failed).
6. The site saves an order: customer name and email, license, quantity, amount, currency, status, and generates a license key (format P6D-XXXX-XXXX-XXXX-XXXX).
7. Admins see every order on the protected Admin Orders page.

## Current limitations
- Test mode only: no real money until Paddle is switched to live.
- The license key is stored but not emailed to the customer or shown on the Thank-you page.
- The background notification only reaches the published site, so test purchases from the preview are not recorded.
- Enterprise / custom tiers use a contact link, not checkout.

## Possible next steps (pick any)
- Show the license key on the Thank-you page.
- Email the license key and download link to the buyer.
- Go live with Paddle for real payments.

## Technical details
- Checkout: `usePaddleCheckout` opens Paddle overlay with price id and optional userId in customData.
- Webhook: `/api/public/payments/webhook` verifies signature, handles transaction.completed and transaction.payment_failed, upserts into `public.orders` keyed by transaction id.
- `orders` table readable by admins only (RLS).
