import { describe, expect, it } from "vitest";

import {
  constantTimeEqual,
  createOpaqueToken,
  hashPassword,
  hashToken,
  normalizeEmail,
  validatePasswordPolicy,
  verifyPassword,
} from "./crypto.js";

describe("identity cryptography", () => {
  it("creates unpredictable opaque tokens and stable digests", () => {
    const first = createOpaqueToken();
    const second = createOpaqueToken();

    expect(first).not.toBe(second);
    expect(first.length).toBeGreaterThanOrEqual(40);
    expect(hashToken(first)).toHaveLength(64);
    expect(hashToken(first)).toBe(hashToken(first));
  });

  it("compares same-length secrets without accepting mismatches", () => {
    expect(constantTimeEqual("same-value", "same-value")).toBe(true);
    expect(constantTimeEqual("same-value", "different!")).toBe(false);
    expect(constantTimeEqual("short", "much-longer")).toBe(false);
  });

  it("normalizes email addresses before persistence", () => {
    expect(normalizeEmail("  USER@Example.COM  ")).toBe("user@example.com");
  });

  it("enforces the password length policy", () => {
    expect(validatePasswordPolicy("too-short")).toBeDefined();
    expect(validatePasswordPolicy("valid-password-2026")).toBeUndefined();
    expect(validatePasswordPolicy("x".repeat(129))).toBeDefined();
  });

  it("hashes passwords with Argon2id and rejects the wrong password", async () => {
    const passwordHash = await hashPassword("correct-horse-battery-staple");

    expect(passwordHash).toContain("argon2id");
    await expect(
      verifyPassword(passwordHash, "correct-horse-battery-staple"),
    ).resolves.toBe(true);
    await expect(verifyPassword(passwordHash, "wrong-password")).resolves.toBe(
      false,
    );
  });
});
