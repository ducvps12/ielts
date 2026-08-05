import { Controller, Get } from "@nestjs/common";
import type { PaymentProviderCapability } from "@levelup/contracts";

interface CommerceCapabilitiesResponse {
  paymentsEnabled: boolean;
  subscriptionsEnabled: boolean;
  providers: PaymentProviderCapability[];
}

const providerCapabilities: PaymentProviderCapability[] = [
  {
    provider: "PAYPAL",
    enabled: false,
    supportsOneTime: true,
    supportsSubscriptions: true,
    supportedCurrencies: ["USD", "EUR", "GBP", "AUD", "CAD"],
    reasonDisabled:
      "Sandbox credentials, verified webhooks, reconciliation and entitlement grants are not configured.",
  },
  {
    provider: "VIETQR",
    enabled: false,
    supportsOneTime: true,
    supportsSubscriptions: false,
    supportedCurrencies: ["VND"],
    reasonDisabled:
      "A licensed provider integration and verified payment-status webhook are required before activation.",
  },
  {
    provider: "BANK_TRANSFER",
    enabled: false,
    supportsOneTime: true,
    supportsSubscriptions: false,
    supportedCurrencies: ["VND"],
    reasonDisabled:
      "Unique transfer references, expiry, reconciliation and support operations are not implemented.",
  },
  {
    provider: "BINANCE_PAY",
    enabled: false,
    supportsOneTime: false,
    supportsSubscriptions: false,
    supportedCurrencies: [],
    reasonDisabled:
      "Experimental provider blocked pending official merchant access, jurisdiction and legal review.",
  },
];

@Controller("commerce/capabilities")
export class PaymentCapabilitiesController {
  @Get()
  getCapabilities(): CommerceCapabilitiesResponse {
    return {
      paymentsEnabled: false,
      subscriptionsEnabled: false,
      providers: providerCapabilities,
    };
  }
}
