import { describe, expect, it } from "vitest";

import {
  AuthRateLimitException,
  AuthRateLimitService,
  type AuthRateLimitOptions,
} from "./auth-rate-limit.service.js";
import type {
  AuthRateLimitStore,
  RateLimitSnapshot,
} from "./auth-rate-limit.store.js";

interface CounterState {
  count: number;
  expiresAt: number;
}

class MemoryRateLimitStore implements AuthRateLimitStore {
  readonly counters = new Map<string, CounterState>();
  now = 1_000_000;

  async consume(
    key: string,
    windowSeconds: number,
  ): Promise<RateLimitSnapshot> {
    const current = this.activeCounter(key);
    const state = current ?? {
      count: 0,
      expiresAt: this.now + windowSeconds * 1_000,
    };
    state.count += 1;
    this.counters.set(key, state);
    return this.snapshot(state);
  }

  async get(key: string): Promise<RateLimitSnapshot> {
    const state = this.activeCounter(key);
    return state ? this.snapshot(state) : { count: 0, retryAfterSeconds: 0 };
  }

  async reset(key: string): Promise<void> {
    this.counters.delete(key);
  }

  private activeCounter(key: string): CounterState | undefined {
    const state = this.counters.get(key);
    if (!state) {
      return undefined;
    }

    if (state.expiresAt <= this.now) {
      this.counters.delete(key);
      return undefined;
    }

    return state;
  }

  private snapshot(state: CounterState): RateLimitSnapshot {
    return {
      count: state.count,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((state.expiresAt - this.now) / 1_000),
      ),
    };
  }
}

const options: AuthRateLimitOptions = {
  enabled: true,
  redisUrl: "redis://unused",
  prefix: "test:auth",
  secret: "test-secret-with-at-least-32-characters",
  loginRequestLimit: 3,
  loginRequestWindowSeconds: 60,
  loginFailureLimit: 2,
  loginFailureWindowSeconds: 120,
  registerLimit: 2,
  registerWindowSeconds: 300,
  passwordResetIpLimit: 3,
  passwordResetEmailLimit: 2,
  passwordResetWindowSeconds: 600,
};

function createFixture(): {
  store: MemoryRateLimitStore;
  service: AuthRateLimitService;
} {
  const store = new MemoryRateLimitStore();
  return {
    store,
    service: new AuthRateLimitService(store, options),
  };
}

async function captureRateLimit(
  operation: () => Promise<void>,
): Promise<AuthRateLimitException> {
  try {
    await operation();
  } catch (error) {
    expect(error).toBeInstanceOf(AuthRateLimitException);
    return error as AuthRateLimitException;
  }

  throw new Error("Expected the operation to be rate limited.");
}

describe("AuthRateLimitService", () => {
  it("allows the configured registration quota and blocks the next request", async () => {
    const { service } = createFixture();

    await service.consumeRegistration("203.0.113.10");
    await service.consumeRegistration("203.0.113.10");

    const error = await captureRateLimit(() =>
      service.consumeRegistration("203.0.113.10"),
    );

    expect(error.getStatus()).toBe(429);
    expect(error.getResponse()).toMatchObject({
      code: "AUTH_RATE_LIMITED",
      scope: "REGISTER_IP",
      retryAfterSeconds: 300,
    });
  });

  it("locks a login subject after repeated credential failures and clears it after success", async () => {
    const { service } = createFixture();
    const email = "Learner@Example.com";
    const ip = "198.51.100.7";

    await service.assertLoginAllowed(email, ip);
    await service.recordLoginFailure(email, ip);

    const thresholdError = await captureRateLimit(() =>
      service.recordLoginFailure(email, ip),
    );
    expect(thresholdError.getResponse()).toMatchObject({
      scope: "LOGIN_FAILURE",
      retryAfterSeconds: 120,
    });

    await captureRateLimit(() => service.assertLoginAllowed(email, ip));
    await service.clearLoginFailures(email, ip);
    await expect(service.assertLoginAllowed(email, ip)).resolves.toBeUndefined();
  });

  it("applies password-reset quotas to both IP and normalized email", async () => {
    const { service } = createFixture();

    await service.consumePasswordReset("Learner@Example.com", "192.0.2.9");
    await service.consumePasswordReset(" learner@example.com ", "192.0.2.10");

    const error = await captureRateLimit(() =>
      service.consumePasswordReset("LEARNER@example.com", "192.0.2.11"),
    );
    expect(error.getResponse()).toMatchObject({
      scope: "PASSWORD_RESET_EMAIL",
      retryAfterSeconds: 600,
    });
  });

  it("stores only keyed fingerprints instead of raw email or IP values", async () => {
    const { service, store } = createFixture();

    await service.consumePasswordReset("private@example.com", "203.0.113.44");

    const keys = [...store.counters.keys()].join("\n");
    expect(keys).not.toContain("private@example.com");
    expect(keys).not.toContain("203.0.113.44");
    expect(keys).toContain("test:auth:password-reset");
  });

  it("can be disabled without touching the backing store", async () => {
    const store = new MemoryRateLimitStore();
    const service = new AuthRateLimitService(store, {
      ...options,
      enabled: false,
    });

    await service.consumeRegistration("203.0.113.10");
    await service.assertLoginAllowed("learner@example.com", "203.0.113.10");
    await service.recordLoginFailure("learner@example.com", "203.0.113.10");
    await service.consumePasswordReset(
      "learner@example.com",
      "203.0.113.10",
    );

    expect(store.counters.size).toBe(0);
  });
});
