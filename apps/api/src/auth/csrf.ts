import { ForbiddenException } from "@nestjs/common";
import { parseEnvironment } from "@levelup/config";
import type { FastifyRequest } from "fastify";

import { constantTimeEqual, hashToken } from "../common/crypto.js";

const environment = parseEnvironment();

function headerValue(request: FastifyRequest): string | undefined {
  const value = request.headers["x-csrf-token"];
  return Array.isArray(value) ? value[0] : value;
}

export function assertPreAuthCsrf(request: FastifyRequest): string {
  const headerToken = headerValue(request);
  const cookieToken = request.cookies[environment.AUTH_CSRF_COOKIE_NAME];

  if (
    !headerToken ||
    !cookieToken ||
    headerToken.length < 20 ||
    !constantTimeEqual(headerToken, cookieToken)
  ) {
    throw new ForbiddenException({
      code: "CSRF_INVALID",
      message: "Yêu cầu bảo mật không hợp lệ. Hãy tải lại trang và thử lại.",
    });
  }

  return headerToken;
}

export function assertSessionCsrf(
  request: FastifyRequest,
  expectedTokenHash: string,
): void {
  const csrfToken = assertPreAuthCsrf(request);
  if (!constantTimeEqual(hashToken(csrfToken), expectedTokenHash)) {
    throw new ForbiddenException({
      code: "CSRF_SESSION_MISMATCH",
      message: "Phiên bảo mật không còn hợp lệ. Hãy đăng nhập lại.",
    });
  }
}
