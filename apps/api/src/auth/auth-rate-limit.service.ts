import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import type { AppEnvironment } from "@levelup/config";

import { hashPrivateMetadata, normalizeEmail } from "../common/crypto.js";
import type {
  AuthRateLimitStore,
  RateLimitSnapshot,
} from "./auth-rate-limit.store.js";

export const AUTH_RATE_LIMIT_OPTIONS = Symbol("AUTH_RATE_LIMIT_OPTIONS");
export const AUTH_RATE_LIMIT_STORE = Symbol("AUTH_RATE_LIMIT_STORE");

export type AuthRateLimitScope =
  | "REGISTER_IP"
  | "LOGIN_IP"
  | "LOGIN_FAILURE"
  | "PASSWORD_RESET_IP"
  | "PASSWORD_RESET_EMAIL";

export interface AuthRateLimitOptions {
  enabled: boolean;
  redisUrl: string;
  prefix: string;
  secret: string;
  loginRequestLimit: number;
  loginRequestWindowSeconds: number;
  loginFailureLimit: number;
  loginFailureWindowSeconds: number;
  registerLimit: number;
  registerWindowSeconds: number;
  passwordResetIpLimit: number;
  passwordResetEmailLimit: number;
  passwordResetWindowSeconds: number;
}

export function authRateLimitOptionsFromEnvironment(
  environment: AppEnvironment,
): AuthRateLimitOptions {
  return {
    enabled: environment.AUTH_RATE_LIMIT_ENABLED,
    redisUrl: environment.REDIS_URL,
    prefix: environment.AUTH_RATE_LIMIT_PREFIX,
    secret: environment.SESSION_SECRET,
    loginRequestLimit: environment.AUTH_LOGIN_REQUEST_LIMIT,
    loginRequestWindowSeconds:
      environment.AUTH_LOGIN_REQUEST_WINDOW_SECONDS,
    loginFailureLimit: environment.AUTH_LOGIN_FAILURE_LIMIT,
    loginFailureWindowSeconds:
      environment.AUTH_LOGIN_FAILURE_WINDOW_SECONDS,
    registerLimit: environment.AUTH_REGISTER_LIMIT,
    registerWindowSeconds: environment.AUTH_REGISTER_WINDOW_SECONDS,
    passwordResetIpLimit: environment.AUTH_PASSWORD_RESET_IP_LIMIT,
    passwordResetEmailLimit: environment.AUTH_PASSWORD_RESET_EMAIL_LIMIT,
    passwordResetWindowSeconds:
      environment.AUTH_PASSWORD_RESET_WINDOW_SECONDS,
  };
}

export class AuthRateLimitException extends HttpException {
  constructor(scope: AuthRateLimitScope, retryAfterSeconds: number) {
    super(
      {
        code: "AUTH_RATE_LIMITED",
        message:
          "Bạn thao tác quá nhanh. Vui lòng chờ một lúc trước khi thử lại.",
        scope,
        retryAfterSeconds: Math.max(1, retryAfterSeconds),
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}

@Injectable()
export class AuthRateLimitService {
  constructor(
    @Inject(AUTH_RATE_LIMIT_STORE)
    private readonly store: AuthRateLimitStore,
    @Inject(AUTH_RATE_LIMIT_OPTIONS)
    private readonly options: AuthRateLimitOptions,
  ) {}

  async consumeRegistration(ip: string): Promise<void> {
    if (!this.options.enabled) {
      return;
    }

    await this.consumeQuota(
      "REGISTER_IP",
      this.key("register-ip", this.normalizeIp(ip)),
      this.options.registerLimit,
      this.options.registerWindowSeconds,
    );
  }

  async assertLoginAllowed(email: string, ip: string): Promise<void> {
    if (!this.options.enabled) {
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedIp = this.normalizeIp(ip);

    await this.consumeQuota(
      "LOGIN_IP",
      this.key("login-ip", normalizedIp),
      this.options.loginRequestLimit,
      this.options.loginRequestWindowSeconds,
    );

    const failureSnapshot = await this.read(
      this.loginFailureKey(normalizedEmail, normalizedIp),
    );
    if (failureSnapshot.count >= this.options.loginFailureLimit) {
      throw new AuthRateLimitException(
        "LOGIN_FAILURE",
        failureSnapshot.retryAfterSeconds,
      );
    }
  }

  async recordLoginFailure(email: string, ip: string): Promise<void> {
    if (!this.options.enabled) {
      return;
    }

    const snapshot = await this.consume(
      this.loginFailureKey(normalizeEmail(email), this.normalizeIp(ip)),
      this.options.loginFailureWindowSeconds,
    );

    if (snapshot.count >= this.options.loginFailureLimit) {
      throw new AuthRateLimitException(
        "LOGIN_FAILURE",
        snapshot.retryAfterSeconds,
      );
    }
  }

  async clearLoginFailures(email: string, ip: string): Promise<void> {
    if (!this.options.enabled) {
      return;
    }

    await this.withStore(() =>
      this.store.reset(
        this.loginFailureKey(normalizeEmail(email), this.normalizeIp(ip)),
      ),
    );
  }

  async consumePasswordReset(email: string, ip: string): Promise<void> {
    if (!this.options.enabled) {
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedIp = this.normalizeIp(ip);

    await this.consumeQuota(
      "PASSWORD_RESET_IP",
      this.key("password-reset-ip", normalizedIp),
      this.options.passwordResetIpLimit,
      this.options.passwordResetWindowSeconds,
    );
    await this.consumeQuota(
      "PASSWORD_RESET_EMAIL",
      this.key("password-reset-email", normalizedEmail),
      this.options.passwordResetEmailLimit,
      this.options.passwordResetWindowSeconds,
    );
  }

  private async consumeQuota(
    scope: AuthRateLimitScope,
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<void> {
    const snapshot = await this.consume(key, windowSeconds);
    if (snapshot.count > limit) {
      throw new AuthRateLimitException(scope, snapshot.retryAfterSeconds);
    }
  }

  private async consume(
    key: string,
    windowSeconds: number,
  ): Promise<RateLimitSnapshot> {
    return this.withStore(() => this.store.consume(key, windowSeconds));
  }

  private async read(key: string): Promise<RateLimitSnapshot> {
    return this.withStore(() => this.store.get(key));
  }

  private async withStore<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof AuthRateLimitException) {
        throw error;
      }

      throw new ServiceUnavailableException({
        code: "AUTH_RATE_LIMIT_UNAVAILABLE",
        message:
          "Lớp bảo vệ đăng nhập đang tạm thời không khả dụng. Vui lòng thử lại sau.",
      });
    }
  }

  private loginFailureKey(email: string, ip: string): string {
    return this.key("login-failure", `${email}|${ip}`);
  }

  private key(scope: string, subject: string): string {
    const fingerprint = hashPrivateMetadata(
      `${scope}:${subject}`,
      this.options.secret,
    );
    return `${this.options.prefix}:${scope}:${fingerprint}`;
  }

  private normalizeIp(ip: string): string {
    const normalized = ip.trim().toLowerCase();
    return normalized || "unknown";
  }
}
