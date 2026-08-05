import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { parseEnvironment, type AppEnvironment } from "@levelup/config";
import type {
  LoginRequest,
  PasswordResetRequestedResponse,
  RegisterResponse,
} from "@levelup/contracts";
import { prisma, UserStatus } from "@levelup/database";

import {
  createOpaqueToken,
  hashPassword,
  hashToken,
  normalizeEmail,
  validatePasswordPolicy,
  verifyPassword,
} from "../common/crypto.js";
import type { RegisterDto } from "./auth.dto.js";
import { SessionService, type CreatedSession } from "./session.service.js";

interface LoginResult {
  userId: string;
  session: CreatedSession;
}

@Injectable()
export class AuthService {
  private readonly environment: AppEnvironment = parseEnvironment();
  private readonly dummyPasswordHash = hashPassword(
    "levelup-dummy-password-never-used-for-authentication",
  );

  constructor(private readonly sessions: SessionService) {}

  async register(input: RegisterDto): Promise<RegisterResponse> {
    if (!input.acceptedTerms) {
      throw new BadRequestException({
        code: "TERMS_REQUIRED",
        message: "Bạn cần đồng ý với điều khoản trước khi tạo tài khoản.",
      });
    }

    const passwordError = validatePasswordPolicy(input.password);
    if (passwordError) {
      throw new BadRequestException({
        code: "PASSWORD_POLICY",
        message: passwordError,
      });
    }

    const email = normalizeEmail(input.email);
    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException({
        code: "EMAIL_ALREADY_REGISTERED",
        message: "Email này đã được sử dụng.",
      });
    }

    const passwordHash = await hashPassword(input.password);
    const verificationToken = createOpaqueToken();
    const verificationExpiresAt = new Date(
      Date.now() + this.environment.AUTH_TOKEN_TTL_MINUTES * 60 * 1_000,
    );

    const user = await prisma.user.create({
      data: {
        email,
        displayName: input.displayName.trim(),
        status: UserStatus.PENDING,
        credential: {
          create: { passwordHash },
        },
        wallet: {
          create: { goldBalance: 0 },
        },
        emailVerificationTokens: {
          create: {
            tokenHash: hashToken(verificationToken),
            expiresAt: verificationExpiresAt,
          },
        },
      },
    });

    return {
      user: this.sessions.toAuthenticatedUser(user),
      verificationRequired: true,
      ...(this.environment.AUTH_DEV_TOKENS_ENABLED
        ? { developmentVerificationToken: verificationToken }
        : {}),
    };
  }

  async verifyEmail(token: string): Promise<void> {
    const record = await prisma.emailVerificationToken.findUnique({
      where: { tokenHash: hashToken(token) },
      include: { user: true },
    });

    if (
      !record ||
      record.consumedAt ||
      record.expiresAt <= new Date() ||
      record.user.status === UserStatus.DELETED
    ) {
      throw new BadRequestException({
        code: "VERIFICATION_TOKEN_INVALID",
        message: "Liên kết xác minh không hợp lệ hoặc đã hết hạn.",
      });
    }

    const verifiedAt = new Date();
    await prisma.$transaction([
      prisma.emailVerificationToken.update({
        where: { id: record.id },
        data: { consumedAt: verifiedAt },
      }),
      prisma.user.update({
        where: { id: record.userId },
        data: {
          emailVerifiedAt: verifiedAt,
          status: UserStatus.ACTIVE,
        },
      }),
    ]);
  }

  async login(
    input: LoginRequest,
    metadata: { userAgent?: string; ip?: string },
  ): Promise<LoginResult> {
    const email = normalizeEmail(input.email);
    const user = await prisma.user.findUnique({
      where: { email },
      include: { credential: true },
    });

    const passwordHash = user?.credential?.passwordHash ?? (await this.dummyPasswordHash);
    const passwordValid = await verifyPassword(passwordHash, input.password);

    if (!user || !passwordValid) {
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không đúng.",
      });
    }

    if (!user.emailVerifiedAt || user.status === UserStatus.PENDING) {
      throw new ForbiddenException({
        code: "EMAIL_NOT_VERIFIED",
        message: "Bạn cần xác minh email trước khi đăng nhập.",
      });
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new ForbiddenException({
        code: "ACCOUNT_UNAVAILABLE",
        message: "Tài khoản hiện không thể đăng nhập.",
      });
    }

    const session = await this.sessions.create({
      userId: user.id,
      remember: input.remember ?? false,
      userAgent: metadata.userAgent,
      ip: metadata.ip,
    });

    return { userId: user.id, session };
  }

  async requestPasswordReset(
    emailInput: string,
  ): Promise<PasswordResetRequestedResponse> {
    const email = normalizeEmail(emailInput);
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, status: true },
    });

    if (!user || user.status === UserStatus.DELETED) {
      return { accepted: true };
    }

    const resetToken = createOpaqueToken();
    const expiresAt = new Date(
      Date.now() + this.environment.AUTH_TOKEN_TTL_MINUTES * 60 * 1_000,
    );

    await prisma.$transaction([
      prisma.passwordResetToken.updateMany({
        where: { userId: user.id, consumedAt: null },
        data: { consumedAt: new Date() },
      }),
      prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash: hashToken(resetToken),
          expiresAt,
        },
      }),
    ]);

    return {
      accepted: true,
      ...(this.environment.AUTH_DEV_TOKENS_ENABLED
        ? { developmentResetToken: resetToken }
        : {}),
    };
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const passwordError = validatePasswordPolicy(password);
    if (passwordError) {
      throw new BadRequestException({
        code: "PASSWORD_POLICY",
        message: passwordError,
      });
    }

    const record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash: hashToken(token) },
    });

    if (!record || record.consumedAt || record.expiresAt <= new Date()) {
      throw new BadRequestException({
        code: "RESET_TOKEN_INVALID",
        message: "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.",
      });
    }

    const passwordHash = await hashPassword(password);
    const now = new Date();

    await prisma.$transaction([
      prisma.credential.upsert({
        where: { userId: record.userId },
        create: {
          userId: record.userId,
          passwordHash,
          passwordUpdatedAt: now,
        },
        update: {
          passwordHash,
          passwordUpdatedAt: now,
        },
      }),
      prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { consumedAt: now },
      }),
      prisma.session.updateMany({
        where: { userId: record.userId, revokedAt: null },
        data: { revokedAt: now },
      }),
    ]);
  }
}
