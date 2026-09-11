# Send “Request custom evaluation” submissions to info@robotai.info

## Goal
When a visitor submits the demo/evaluation form (name, email, company, application), an email with those details is sent to **info@robotai.info**.

## Prerequisite — sender domain
The project has no email domain configured. Sending requires a domain you own (e.g. robotai-vision.com). After plan approval, the email setup dialog will be shown so you can pick the sender domain and add the DNS records (guided, ~5 minutes). Emails start sending once the domain verifies; all code is built right away and works as soon as verification completes.

## What will be built
1. **Email templates scaffold** — Lovable's app-email system (template registry + server-only send helper + preview page).
2. **Evaluation request template** — a clean branded email in the site's style containing:
   - Name, Email, Company, chosen Application
   - Sent to the fixed recipient `info@robotai.info`
3. **Form wiring** — the existing DemoForm "Request custom evaluation" submit calls a dedicated server action that validates the input, sends the email, and shows success/error feedback in the form (EN/中文 strings included).
4. **Safety** — the recipient and template are fixed on the server (visitors can't send arbitrary emails), input is validated, and one submission sends exactly one email.

## Notes
- Emails include an automatic unsubscribe footer (required, cannot be removed).
- Delivery can be monitored in Cloud → Emails.
