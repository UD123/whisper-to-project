# Pricing page + Paddle payments (in a draft)

## Approach

Work happens in a separate draft version of the site, so the live site stays untouched until you approve. Once it looks right, the draft gets merged.

## Steps

1. **Create a draft** — a parallel copy of the site with its own chat.
2. **Enable Paddle payments** — starts in test mode, so checkouts can be tried with fake money. Real payments need Paddle verification later (business details, ID). Paddle acts as seller of record and handles VAT/sales tax worldwide. Fee: 5% + 50c per checkout.
3. **Create three license products** in Paddle:
   - **Demo** — free / trial license, limited time
   - **Objects** — per-object license pack
   - **Perpetual** — one-time lifetime license
   Exact prices and limits still needed from you before the products are created.
4. **Add a Pricing tab** to the top navigation (next to Product / Docs), on a new `/pricing` page, in the same Clean Lab style as the rest of the site:
   - Three cards, one per license, with what each includes
   - Buy button on each paid card that opens Paddle checkout
   - Enterprise / contact line at the bottom for custom deals
   - Full English + Chinese text, matching the language switcher
5. **After payment** — the buyer returns to a confirmation page on the site with their order details.

## Technical notes

- New route `src/routes/pricing.tsx` with its own page title/description, plus content files mirroring the existing EN/ZH pattern in `src/content/`.
- Nav link added in the shared header component under `src/components/site/`.
- Checkout runs through a server function that creates a Paddle checkout session; Paddle webhook handled at `src/routes/api/public/`.
- License records (email, product, status, key) stored in the backend database with row-level security, written only by the verified webhook.
- Licence-key generation/delivery by email is a separate follow-up; not included here unless you want it now.

## Still needed from you

- Price and included limits for each of the three licenses.
- Whether purchases should be tied to a user account (requires sign-in) or just an email at checkout.
