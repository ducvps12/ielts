import { describe, expect, it } from "vitest";

import {
  initialLearningLanguages,
  isValidMoney,
  paymentProviders,
  supportedUiLocales,
} from "./index.js";

describe("shared product contracts", () => {
  it("keeps interface locale separate from the learning language catalogue", () => {
    expect(supportedUiLocales).toEqual(["vi", "en", "zh-CN", "fr"]);
    expect(initialLearningLanguages).toContain("ja");
    expect(initialLearningLanguages.length).toBeGreaterThan(supportedUiLocales.length);
  });

  it("requires integer minor units and an ISO-like currency code", () => {
    expect(isValidMoney({ amountMinor: 9900, currency: "USD" })).toBe(true);
    expect(isValidMoney({ amountMinor: 99.5, currency: "USD" })).toBe(false);
    expect(isValidMoney({ amountMinor: 9900, currency: "usd" })).toBe(false);
  });

  it("keeps experimental payment providers explicit", () => {
    expect(paymentProviders).toContain("PAYPAL");
    expect(paymentProviders).toContain("VIETQR");
    expect(paymentProviders).toContain("BINANCE_PAY");
  });
});
