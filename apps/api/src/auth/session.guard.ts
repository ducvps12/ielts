import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { parseEnvironment } from "@levelup/config";

import type { AuthenticatedFastifyRequest } from "./auth-context.js";
import { assertSessionCsrf } from "./csrf.js";
import { SessionService } from "./session.service.js";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

@Injectable()
export class SessionGuard implements CanActivate {
  private readonly environment = parseEnvironment();

  constructor(private readonly sessions: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedFastifyRequest>();
    const sessionToken =
      request.cookies[this.environment.AUTH_SESSION_COOKIE_NAME];
    const auth = await this.sessions.authenticate(sessionToken);

    if (!SAFE_METHODS.has(request.method.toLocaleUpperCase())) {
      assertSessionCsrf(request, auth.csrfTokenHash);
    }

    request.auth = auth;
    return true;
  }
}
