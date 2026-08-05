export const paymentProviders = [
  "PAYPAL",
  "VIETQR",
  "BANK_TRANSFER",
  "BINANCE_PAY",
] as const;

export type PaymentProvider = (typeof paymentProviders)[number];

export const checkoutStatuses = [
  "CREATED",
  "PENDING",
  "SUCCEEDED",
  "FAILED",
  "EXPIRED",
  "CANCELLED",
] as const;

export type CheckoutStatus = (typeof checkoutStatuses)[number];

export const subscriptionStatuses = [
  "INCOMPLETE",
  "TRIALING",
  "ACTIVE",
  "PAST_DUE",
  "PAUSED",
  "CANCELLED",
  "EXPIRED",
] as const;

export type SubscriptionStatus = (typeof subscriptionStatuses)[number];

export interface Money {
  amountMinor: number;
  currency: string;
}

export interface PaymentProviderCapability {
  provider: PaymentProvider;
  enabled: boolean;
  supportsOneTime: boolean;
  supportsSubscriptions: boolean;
  supportedCurrencies: string[];
  reasonDisabled?: string;
}

export interface CreateCheckoutCommand {
  userId: string;
  priceId: string;
  provider: PaymentProvider;
  idempotencyKey: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionContract {
  id: string;
  provider: PaymentProvider;
  providerReference?: string;
  status: CheckoutStatus;
  total: Money;
  redirectUrl?: string;
  expiresAt?: string;
}

export interface VerifiedWebhookEvent {
  provider: PaymentProvider;
  providerEventId: string;
  eventType: string;
  occurredAt: string;
  payloadHash: string;
}

export function isValidMoney(value: Money): boolean {
  return (
    Number.isSafeInteger(value.amountMinor) &&
    value.amountMinor >= 0 &&
    /^[A-Z]{3}$/.test(value.currency)
  );
}
