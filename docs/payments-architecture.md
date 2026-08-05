# Payments and Entitlements Architecture

## Principle

Payment providers collect money. LevelUp owns products, plans, prices, checkout sessions, entitlements, invoices, reconciliation and audit history.

No provider webhook may directly unlock premium features without passing signature verification, idempotency and an internal state transition.

## Provider priority

### International

1. PayPal subscriptions for recurring plans where the merchant account and buyer country are supported.
2. Card processor may be added later behind the same contracts.

### Vietnam

1. VietQR or a licensed payment provider that can create payment requests and send verified status webhooks.
2. Bank transfer references are unique, expiring and reconciled.
3. ACB is a settlement account option, not a separate business-rule implementation.

### Experimental

`BINANCE_PAY` exists only as a disabled provider capability. It must remain off until merchant onboarding, official API access, jurisdiction, accounting, tax, sanctions and Vietnamese legal review are complete.

## Core entities

- Product
- Plan
- Price
- CheckoutSession
- PaymentAttempt
- Subscription
- EntitlementGrant
- Invoice
- Refund
- ProviderWebhookEvent
- ReconciliationRecord

All monetary amounts use integer minor units and ISO currency codes.

## State model

### Checkout

```text
CREATED → PENDING → SUCCEEDED | FAILED | EXPIRED | CANCELLED
```

### Subscription

```text
INCOMPLETE → TRIALING | ACTIVE → PAST_DUE → PAUSED | CANCELLED | EXPIRED
```

Provider-specific status is stored separately from normalized internal status.

## Idempotency

- Checkout creation accepts an idempotency key.
- Provider order IDs are unique per provider account.
- Webhook event IDs are unique.
- Entitlement grants use a natural unique key such as `subscriptionId + capability + periodStart`.
- Refund and reversal paths create compensating facts; they do not rewrite payment history.

## Webhook processing

1. Receive raw body and headers.
2. Identify provider and merchant account.
3. Verify signature before parsing business fields.
4. Store immutable event with unique provider event ID.
5. Acknowledge duplicate verified events safely.
6. Enqueue processing through the outbox/worker boundary.
7. Transition payment/subscription state transactionally.
8. Grant or revoke entitlements through an auditable command.
9. Reconcile asynchronously against provider reports.

## Feature flags

- `payments.enabled`
- `payments.paypal.enabled`
- `payments.vietqr.enabled`
- `payments.binancePay.enabled` — default `false`
- `commerce.subscriptions.enabled`
- `commerce.trials.enabled`

Flags may hide checkout but must not bypass webhook handling for existing customers.

## Security

- Provider secrets are environment or secret-manager values, never database settings.
- Webhook secrets support rotation.
- Return URLs do not prove payment success.
- Admin financial actions require explicit permissions, confirmation and audit logs.
- Sensitive provider payload fields are minimized or encrypted according to retention policy.

## Rollout

1. Provider-neutral contracts and database schema.
2. Entitlement checks with test grants.
3. PayPal sandbox checkout and webhook verification.
4. Reconciliation and cancellation flows.
5. Vietnam provider sandbox with VietQR rendering and verified webhook status.
6. Production readiness review: legal, tax, refunds, support, incident response and accounting export.
