import type { AuthenticatedUser } from "@levelup/contracts";
import type { FastifyRequest } from "fastify";

export interface AuthContext {
  sessionId: string;
  user: AuthenticatedUser;
  csrfTokenHash: string;
  expiresAt: Date;
}

export interface AuthenticatedFastifyRequest extends FastifyRequest {
  auth?: AuthContext;
}
