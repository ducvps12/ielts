import { Injectable, UnauthorizedException } from "@nestjs/common";
import { parseEnvironment, type AppEnvironment } from "@levelup/config";
import type { AuthenticatedUser } from "@levelup/contracts";
import { prisma, UserStatus, type User } from "@levelup/database";

import {
  createOpaqueToken,
  hashPrivateMetadata,
  hashToken,
} from "../common/crypto.js";
import type { AuthContext } from "./auth-context.js";

export interface CreatedSession {
  sessionId: string;
  sessionToken: string;
  csrfToken: string;
  expiresAt: Date;
}

interface CreateSessionInput {
  userId: string;
  remember: boolean;
  userAgent?: string;
  ip?: string;
}

@Injectable()
export class SessionService {
  private readonly environment: AppEnvironment = parseEnvironment();

  async create(input: CreateSessionInput): Promise<CreatedSession> {
    const sessionToken = createOpaqueToken();
    const csrfToken = createOpaqueToken();
    const expiresAt = new Date(
      Date.now() +
        (input.remember
          ? this.environment.AUTH_REMEMBER_TTL_DAYS * 24 * 60 * 60 * 1_000
          : this.environment.AUTH_SESSION_TTL_HOURS * 60 * 60 * 1_000),
    );

    const session = await prisma.session.create({
      data: {
        userId: input.userId,
        tokenHash: hashToken(sessionToken),
        csrfTokenHash: hashToken(csrfToken),
        userAgentHash: input.userAgent
          ? hashPrivateMetadata(input.userAgent, this.environment.SESSION_SECRET)
          : undefined,
        ipHash: input.ip
          ? hashPrivateMetadata(input.ip, this.environment.SESSION_SECRET)
          : undefined,
        expiresAt,
      },
      select: { id: true },
    });

    return {
      sessionId: session.id,
      sessionToken,
      csrfToken,
      expiresAt,
    };
  }

  async authenticate(sessionToken: string | undefined): Promise<AuthContext> {
    if (!sessionToken) {
      throw new UnauthorizedException({
        code: "AUTH_REQUIRED",
        message: "Bạn cần đăng nhập để tiếp tục.",
      });
    }

    const session = await prisma.session.findUnique({
      where: { tokenHash: hashToken(sessionToken) },
      include: { user: true },
    });

    const now = new Date();
    if (
      !session ||
      session.revokedAt ||
      session.expiresAt <= now ||
      session.user.status !== UserStatus.ACTIVE
    ) {
      throw new UnauthorizedException({
        code: "SESSION_INVALID",
        message: "Phiên đăng nhập đã hết hạn hoặc không còn hợp lệ.",
      });
    }

    if (now.getTime() - session.lastSeenAt.getTime() > 5 * 60 * 1_000) {
      await prisma.session.update({
        where: { id: session.id },
        data: { lastSeenAt: now },
      });
    }

    return {
      sessionId: session.id,
      user: this.toAuthenticatedUser(session.user),
      csrfTokenHash: session.csrfTokenHash,
      expiresAt: session.expiresAt,
    };
  }

  async revoke(sessionId: string): Promise<void> {
    await prisma.session.updateMany({
      where: { id: sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  toAuthenticatedUser(user: User): AuthenticatedUser {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      status: user.status,
      emailVerifiedAt: user.emailVerifiedAt?.toISOString(),
      locale: user.locale,
      timezone: user.timezone,
    };
  }
}
