import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import type {
  AuthContext,
  AuthenticatedFastifyRequest,
} from "./auth-context.js";

export const CurrentAuth = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthContext => {
    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedFastifyRequest>();

    if (!request.auth) {
      throw new Error("CurrentAuth requires SessionGuard");
    }

    return request.auth;
  },
);
