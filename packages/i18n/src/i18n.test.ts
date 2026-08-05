import { describe, expect, it } from "vitest";

import {
  formatCurrency,
  learningLanguageDefinitions,
  resolveUiLocale,
  supportedUiLocales,
} from "./index.js";

describe("internationalization foundation", () => {
  it("keeps UI locales independent from learning languages", () => {
    expect(supportedUiLocales).toEqual(["vi", "en", "zh-CN", "fr"]);
    expect(learningLanguageDefinitions.some((language) => language.code === "ja")).toBe(
      true,
    );
    expect(learningLanguageDefinitions.length).toBeGreaterThan(
      supportedUiLocales.length,
    );
  });

  it("resolves exact and language-only locale values", () => {
    expect(resolveUiLocale("fr-FR")).toBe("fr");
    expect(resolveUiLocale("zh-TW")).toBe("zh-CN");
    expect(resolveUiLocale(undefined)).toBe("vi");
  });

  it("formats currency from integer minor units", () => {
    expect(formatCurrency(199000, "VND", "vi")).toContain("199.000");
    expect(formatCurrency(990, "USD", "en")).toContain("9.90");
    expect(() => formatCurrency(9.9, "USD", "en")).toThrow(
      "integer minor units",
    );
  });
});
