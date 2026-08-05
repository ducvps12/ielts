import { randomUUID } from "node:crypto";

import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { prisma } from "@levelup/database";
import { beforeAll, describe, expect, it } from "vitest";

import { AuthService } from "./auth.service.js";
import { SessionService } from "./session.service.js";
import { GoalsService } from "../goals/goals.service.js";

process.env.AUTH_DEV_TOKENS_ENABLED = "true";

describe.sequential("identity and owned goal integration", () => {
  const suffix = randomUUID();
  const email = `integration-${suffix}@levelup.local`;
  const password = "correct-horse-battery-staple";
  const sessions = new SessionService();
  const auth = new AuthService(sessions);
  const goals = new GoalsService();

  beforeAll(async () => {
    await prisma.$connect();
  });

  it("registers, verifies and signs in with an opaque revocable session", async () => {
    const registration = await auth.register({
      displayName: "Integration Learner",
      email,
      password,
      acceptedTerms: true,
    });

    expect(registration.user.email).toBe(email);
    expect(registration.user.status).toBe("PENDING");
    expect(registration.developmentVerificationToken).toBeDefined();

    await auth.verifyEmail(registration.developmentVerificationToken ?? "");

    const login = await auth.login(
      { email, password, remember: false },
      { userAgent: "vitest", ip: "127.0.0.1" },
    );
    const context = await sessions.authenticate(login.session.sessionToken);

    expect(context.user.status).toBe("ACTIVE");
    expect(context.user.emailVerifiedAt).toBeDefined();
    expect(login.session.sessionToken).not.toBe(context.sessionId);

    await sessions.revoke(context.sessionId);
    await expect(
      sessions.authenticate(login.session.sessionToken),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it("creates a private language goal and prevents cross-user reads", async () => {
    const owner = await prisma.user.findUniqueOrThrow({ where: { email } });
    const goal = await goals.create(owner.id, owner.timezone, {
      category: "LANGUAGE",
      title: "Giao tiếp tiếng Trung trong công việc",
      outcome:
        "Thực hiện cuộc trao đổi công việc 15 phút bằng tiếng Trung và hiểu phần lớn câu hỏi thường gặp.",
      learningProfile: {
        uiLocale: "vi",
        learningLanguage: "zh-CN",
        explanationLanguage: "vi",
        proficiencyFramework: "HSK",
        proficiencyLevel: "HSK 1",
      },
    });

    expect(goal.ownerId).toBe(owner.id);
    expect(goal.category).toBe("LANGUAGE");

    const profile = await prisma.languageProfile.findUnique({
      where: {
        userId_learningLanguage: {
          userId: owner.id,
          learningLanguage: "zh-CN",
        },
      },
    });
    expect(profile?.proficiencyFramework).toBe("HSK");

    await expect(
      goals.get("another-user-id", goal.id, "UTC"),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it("resets the password, revokes old sessions and accepts the new secret", async () => {
    const activeLogin = await auth.login(
      { email, password, remember: true },
      { userAgent: "vitest", ip: "127.0.0.1" },
    );
    const resetRequest = await auth.requestPasswordReset(email);
    const resetToken = resetRequest.developmentResetToken;

    expect(resetToken).toBeDefined();
    await auth.resetPassword(resetToken ?? "", "new-secure-password-2026");

    await expect(
      sessions.authenticate(activeLogin.session.sessionToken),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    const newLogin = await auth.login(
      {
        email,
        password: "new-secure-password-2026",
        remember: false,
      },
      { userAgent: "vitest", ip: "127.0.0.1" },
    );
    expect(newLogin.session.sessionToken).toBeTruthy();
  });
});
