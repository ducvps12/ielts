import { Injectable, UnauthorizedException } from "@nestjs/common";
import { parseEnvironment, type AppEnvironment } from "@levelup/config";
import type {
  AuthenticatedUser,
  SessionSummary,
} from "@levelup/contracts";
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

interface RotateSessionInput {
  sessionId: string;
  userId: string;
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

  async rotate(input: RotateSessionInput): Promise<CreatedSession> {
    const sessionToken = createOpaqueToken();
    const csrfToken = createOpaqueToken();
    const now = new Date();

    const rotated = await prisma.$transaction(async (transaction) => {
      const current = await transaction.session.findFirst({
        where: {
          id: input.sessionId,
          userId: input.userId,
          revokedAt: null,
          expiresAt: { gt: now },
        },
        select: { expiresAt: true },
      });

      if (!current) {
        throw this.invalidSession();
      }

      const revoked = await transaction.session.updateMany({
        where: {
          id: input.sessionId,
          userId: input.userId,
          revokedAt: null,
          expiresAt: { gt: now },
        },
        data: { revokedAt: now },
      });

      if (revoked.count !== 1) {
        throw this.invalidSession();
      }

      const session = await transaction.session.create({
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
          expiresAt: current.expiresAt,
        },
        select: { id: true },
      });

      return { id: session.id, expiresAt: current.expiresAt };
    });

    return {
      sessionId: rotated.id,
      sessionToken,
      csrfToken,
      expiresAt: rotated.expiresAt,
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
      throw this.invalidSession();
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

  async listActiveForUser(
    userId: string,
    currentSessionId: string,
  ): Promise<SessionSummary[]> {
    const sessions = await prisma.session.findMany({
      where: {
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: [{ lastSeenAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        createdAt: true,
        lastSeenAt: true,
        expiresAt: true,
      },
    });

    return sessions.map((session) => ({
      id: session.id,
      current: session.id === currentSessionId,
      createdAt: session.createdAt.toISOString(),
      lastSeenAt: session.lastSeenAt.toISOString(),
      expiresAt: session.expiresAt.toISOString(),
    }));
  }

  async revoke(sessionId: string): Promise<void> {
    await prisma.session.updateMany({
      where: { id: sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async revokeForUser(userId: string, sessionId: string): Promise<boolean> {
    const result = await prisma.session.updateMany({
      where: { id: sessionId, userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    return result.count === 1;
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

  private invalidSession(): UnauthorizedException {
    return new UnauthorizedException({
      code: "SESSION_INVALID",
      message: "Phiên đăng nhập đã hết hạn hoặc không còn hợp lệ.",
    });
  }
}
