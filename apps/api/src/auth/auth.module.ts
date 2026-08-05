import { Module } from "@nestjs/common";
import { parseEnvironment } from "@levelup/config";

import {
  AUTH_RATE_LIMIT_OPTIONS,
  AUTH_RATE_LIMIT_STORE,
  AuthRateLimitService,
  authRateLimitOptionsFromEnvironment,
  type AuthRateLimitOptions,
} from "./auth-rate-limit.service.js";
import { RedisAuthRateLimitStore } from "./auth-rate-limit.store.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { SessionGuard } from "./session.guard.js";
import { SessionService } from "./session.service.js";

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_RATE_LIMIT_OPTIONS,
      useFactory: (): AuthRateLimitOptions =>
        authRateLimitOptionsFromEnvironment(parseEnvironment()),
    },
    {
      provide: AUTH_RATE_LIMIT_STORE,
      inject: [AUTH_RATE_LIMIT_OPTIONS],
      useFactory: (options: AuthRateLimitOptions): RedisAuthRateLimitStore =>
        new RedisAuthRateLimitStore(options.redisUrl),
    },
    AuthRateLimitService,
    AuthService,
    SessionService,
    SessionGuard,
  ],
  exports: [SessionService, SessionGuard],
})
export class AuthModule {}
