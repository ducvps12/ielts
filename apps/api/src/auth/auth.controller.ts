import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { parseEnvironment } from "@levelup/config";
import type {
  CsrfResponse,
  PasswordResetRequestedResponse,
  RegisterResponse,
  SessionListResponse,
  SessionResponse,
  SessionRevokedResponse,
} from "@levelup/contracts";
import type { FastifyReply, FastifyRequest } from "fastify";

import { createOpaqueToken } from "../common/crypto.js";
import type { AuthContext } from "./auth-context.js";
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from "./auth.dto.js";
import { AuthService } from "./auth.service.js";
import { CurrentAuth } from "./current-auth.decorator.js";
import { assertPreAuthCsrf, assertSessionCsrf } from "./csrf.js";
import { SessionGuard } from "./session.guard.js";
import { SessionService } from "./session.service.js";

@Controller("auth")
export class AuthController {
  private readonly environment = parseEnvironment();

  constructor(
    private readonly auth: AuthService,
    private readonly sessions: SessionService,
  ) {}

  @Get("csrf")
  issueCsrf(@Res({ passthrough: true }) reply: FastifyReply): CsrfResponse {
    const csrfToken = createOpaqueToken();
    reply.setCookie(this.environment.AUTH_CSRF_COOKIE_NAME, csrfToken, {
      path: "/",
      httpOnly: false,
      secure: this.environment.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
    });

    return { csrfToken };
  }

  @Post("register")
  async register(
    @Body() input: RegisterDto,
    @Req() request: FastifyRequest,
  ): Promise<RegisterResponse> {
    assertPreAuthCsrf(request);
    return this.auth.register(input);
  }

  @Post("verify-email")
  async verifyEmail(
    @Body() input: VerifyEmailDto,
    @Req() request: FastifyRequest,
  ): Promise<{ verified: true }> {
    assertPreAuthCsrf(request);
    await this.auth.verifyEmail(input.token);
    return { verified: true };
  }

  @Post("login")
  async login(
    @Body() input: LoginDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<SessionResponse> {
    assertPreAuthCsrf(request);
    const result = await this.auth.login(input, {
      userAgent: request.headers["user-agent"],
      ip: request.ip,
    });

    this.setSessionCookies(
      reply,
      result.session.sessionToken,
      result.session.csrfToken,
      result.session.expiresAt,
    );
    const context = await this.sessions.authenticate(result.session.sessionToken);

    return {
      user: context.user,
      csrfToken: result.session.csrfToken,
      expiresAt: result.session.expiresAt.toISOString(),
    };
  }

  @Get("session")
  @UseGuards(SessionGuard)
  session(
    @CurrentAuth() context: AuthContext,
    @Req() request: FastifyRequest,
  ): SessionResponse {
    const csrfToken =
      request.cookies[this.environment.AUTH_CSRF_COOKIE_NAME] ?? "";

    return {
      user: context.user,
      csrfToken,
      expiresAt: context.expiresAt.toISOString(),
    };
  }

  @Get("sessions")
  @UseGuards(SessionGuard)
  async listSessions(
    @CurrentAuth() context: AuthContext,
  ): Promise<SessionListResponse> {
    return {
      sessions: await this.sessions.listActiveForUser(
        context.user.id,
        context.sessionId,
      ),
    };
  }

  @Post("sessions/rotate")
  @UseGuards(SessionGuard)
  async rotateSession(
    @CurrentAuth() context: AuthContext,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<SessionResponse> {
    assertSessionCsrf(request, context.csrfTokenHash);
    const session = await this.sessions.rotate({
      sessionId: context.sessionId,
      userId: context.user.id,
      userAgent: request.headers["user-agent"],
      ip: request.ip,
    });

    this.setSessionCookies(
      reply,
      session.sessionToken,
      session.csrfToken,
      session.expiresAt,
    );

    return {
      user: context.user,
      csrfToken: session.csrfToken,
      expiresAt: session.expiresAt.toISOString(),
    };
  }

  @Post("sessions/:sessionId/revoke")
  @UseGuards(SessionGuard)
  async revokeSession(
    @CurrentAuth() context: AuthContext,
    @Param("sessionId") sessionId: string,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<SessionRevokedResponse> {
    assertSessionCsrf(request, context.csrfTokenHash);
    const revoked = await this.sessions.revokeForUser(
      context.user.id,
      sessionId,
    );
    const currentSessionRevoked = revoked && sessionId === context.sessionId;

    if (currentSessionRevoked) {
      this.clearSessionCookies(reply);
    }

    return { revoked, currentSessionRevoked };
  }

  @Post("logout")
  @UseGuards(SessionGuard)
  async logout(
    @CurrentAuth() context: AuthContext,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<{ loggedOut: true }> {
    assertSessionCsrf(request, context.csrfTokenHash);
    await this.sessions.revoke(context.sessionId);
    this.clearSessionCookies(reply);
    return { loggedOut: true };
  }

  @Post("logout-all")
  @UseGuards(SessionGuard)
  async logoutAll(
    @CurrentAuth() context: AuthContext,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<{ loggedOut: true }> {
    assertSessionCsrf(request, context.csrfTokenHash);
    await this.sessions.revokeAllForUser(context.user.id);
    this.clearSessionCookies(reply);
    return { loggedOut: true };
  }

  @Post("forgot-password")
  async forgotPassword(
    @Body() input: ForgotPasswordDto,
    @Req() request: FastifyRequest,
  ): Promise<PasswordResetRequestedResponse> {
    assertPreAuthCsrf(request);
    return this.auth.requestPasswordReset(input.email);
  }

  @Post("reset-password")
  async resetPassword(
    @Body() input: ResetPasswordDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<{ reset: true }> {
    assertPreAuthCsrf(request);
    await this.auth.resetPassword(input.token, input.password);
    this.clearSessionCookies(reply);
    return { reset: true };
  }

  private setSessionCookies(
    reply: FastifyReply,
    sessionToken: string,
    csrfToken: string,
    expiresAt: Date,
  ): void {
    const secure = this.environment.NODE_ENV === "production";
    const maxAge = Math.max(
      1,
      Math.floor((expiresAt.getTime() - Date.now()) / 1_000),
    );

    reply.setCookie(this.environment.AUTH_SESSION_COOKIE_NAME, sessionToken, {
      path: "/",
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge,
    });
    reply.setCookie(this.environment.AUTH_CSRF_COOKIE_NAME, csrfToken, {
      path: "/",
      httpOnly: false,
      secure,
      sameSite: "lax",
      maxAge,
    });
  }

  private clearSessionCookies(reply: FastifyReply): void {
    const options = {
      path: "/",
      secure: this.environment.NODE_ENV === "production",
      sameSite: "lax" as const,
    };
    reply.clearCookie(this.environment.AUTH_SESSION_COOKIE_NAME, options);
    reply.clearCookie(this.environment.AUTH_CSRF_COOKIE_NAME, options);
  }
}
