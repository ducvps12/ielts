import { describe, expect, it } from "vitest";

import { PaymentCapabilitiesController } from "./payment-capabilities.controller.js";

describe("PaymentCapabilitiesController", () => {
  it("keeps all payment providers disabled until operational gates are complete", () => {
    const controller = new PaymentCapabilitiesController();
    const response = controller.getCapabilities();

    expect(response.paymentsEnabled).toBe(false);
    expect(response.subscriptionsEnabled).toBe(false);
    expect(response.providers.every((provider) => !provider.enabled)).toBe(true);
  });

  it("keeps Binance Pay explicitly blocked for legal and merchant review", () => {
    const controller = new PaymentCapabilitiesController();
    const response = controller.getCapabilities();
    const binancePay = response.providers.find(
      (provider) => provider.provider === "BINANCE_PAY",
    );

    expect(binancePay?.enabled).toBe(false);
    expect(binancePay?.supportedCurrencies).toEqual([]);
    expect(binancePay?.reasonDisabled).toContain("legal review");
  });
});
