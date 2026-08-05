import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type {
  GoalStatus as GoalStatusContract,
  GoalSummary,
  LanguageProfileContract,
} from "@levelup/contracts";
import {
  GoalCategory,
  GoalStatus,
  Prisma,
  prisma,
} from "@levelup/database";

import type {
  CreateGoalDto,
  UpsertLanguageProfileDto,
} from "./goals.dto.js";

const allowedTransitions: Record<GoalStatus, ReadonlySet<GoalStatus>> = {
  DRAFT: new Set([GoalStatus.ACTIVE, GoalStatus.ABANDONED]),
  ACTIVE: new Set([
    GoalStatus.PAUSED,
    GoalStatus.COMPLETED,
    GoalStatus.ABANDONED,
  ]),
  PAUSED: new Set([GoalStatus.ACTIVE, GoalStatus.ABANDONED]),
  COMPLETED: new Set(),
  ABANDONED: new Set(),
};

function toJsonValue(
  value: Record<string, unknown> | undefined,
): Prisma.InputJsonValue | undefined {
  if (!value) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

@Injectable()
export class GoalsService {
  async list(userId: string, timezone: string): Promise<GoalSummary[]> {
    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return goals.map((goal) => this.toSummary(goal, timezone));
  }

  async get(
    userId: string,
    goalId: string,
    timezone: string,
  ): Promise<GoalSummary> {
    const goal = await prisma.goal.findFirst({
      where: { id: goalId, userId },
    });

    if (!goal) {
      throw new NotFoundException({
        code: "GOAL_NOT_FOUND",
        message: "Không tìm thấy mục tiêu này.",
      });
    }

    return this.toSummary(goal, timezone);
  }

  async create(
    userId: string,
    timezone: string,
    input: CreateGoalDto,
  ): Promise<GoalSummary> {
    const targetDate = input.targetDate ? new Date(input.targetDate) : undefined;
    if (targetDate && targetDate <= new Date()) {
      throw new BadRequestException({
        code: "GOAL_TARGET_DATE_INVALID",
        message: "Ngày mục tiêu phải nằm trong tương lai.",
      });
    }

    if (input.category === "LANGUAGE" && !input.learningProfile) {
      throw new BadRequestException({
        code: "LANGUAGE_PROFILE_REQUIRED",
        message: "Mục tiêu ngôn ngữ cần có ngôn ngữ học và trình độ hiện tại.",
      });
    }

    const goal = await prisma.$transaction(async (transaction) => {
      const created = await transaction.goal.create({
        data: {
          userId,
          category: GoalCategory[input.category],
          title: input.title.trim(),
          outcome: input.outcome.trim(),
          targetDate,
          baseline: toJsonValue(input.baseline),
          constraints: toJsonValue(input.constraints),
        },
      });

      if (input.learningProfile) {
        await this.upsertLanguageProfileWithClient(
          transaction,
          userId,
          input.learningProfile,
        );
      }

      await transaction.auditLog.create({
        data: {
          actorId: userId,
          action: "goal.created",
          resourceType: "Goal",
          resourceId: created.id,
          after: {
            category: created.category,
            title: created.title,
            status: created.status,
          },
        },
      });

      return created;
    });

    return this.toSummary(goal, timezone);
  }

  async updateStatus(
    userId: string,
    goalId: string,
    requestedStatus: GoalStatusContract,
    timezone: string,
  ): Promise<GoalSummary> {
    const current = await prisma.goal.findFirst({
      where: { id: goalId, userId },
    });

    if (!current) {
      throw new NotFoundException({
        code: "GOAL_NOT_FOUND",
        message: "Không tìm thấy mục tiêu này.",
      });
    }

    const nextStatus = GoalStatus[requestedStatus];
    if (
      nextStatus !== current.status &&
      !allowedTransitions[current.status].has(nextStatus)
    ) {
      throw new BadRequestException({
        code: "GOAL_STATUS_TRANSITION_INVALID",
        message: `Không thể chuyển mục tiêu từ ${current.status} sang ${nextStatus}.`,
      });
    }

    const updated = await prisma.$transaction(async (transaction) => {
      const goal = await transaction.goal.update({
        where: { id: current.id },
        data: { status: nextStatus },
      });

      await transaction.auditLog.create({
        data: {
          actorId: userId,
          action: "goal.status_changed",
          resourceType: "Goal",
          resourceId: goal.id,
          before: { status: current.status },
          after: { status: goal.status },
        },
      });

      return goal;
    });

    return this.toSummary(updated, timezone);
  }

  async listLanguageProfiles(
    userId: string,
  ): Promise<LanguageProfileContract[]> {
    const profiles = await prisma.languageProfile.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    return profiles.map((profile) => ({
      id: profile.id,
      userId: profile.userId,
      uiLocale: profile.uiLocale as LanguageProfileContract["uiLocale"],
      learningLanguage:
        profile.learningLanguage as LanguageProfileContract["learningLanguage"],
      explanationLanguage:
        profile.explanationLanguage as LanguageProfileContract["explanationLanguage"],
      proficiencyFramework:
        profile.proficiencyFramework as LanguageProfileContract["proficiencyFramework"],
      proficiencyLevel: profile.proficiencyLevel,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    }));
  }

  async upsertLanguageProfile(
    userId: string,
    input: UpsertLanguageProfileDto,
  ): Promise<LanguageProfileContract> {
    const profile = await this.upsertLanguageProfileWithClient(
      prisma,
      userId,
      input,
    );

    return {
      id: profile.id,
      userId: profile.userId,
      uiLocale: profile.uiLocale as LanguageProfileContract["uiLocale"],
      learningLanguage:
        profile.learningLanguage as LanguageProfileContract["learningLanguage"],
      explanationLanguage:
        profile.explanationLanguage as LanguageProfileContract["explanationLanguage"],
      proficiencyFramework:
        profile.proficiencyFramework as LanguageProfileContract["proficiencyFramework"],
      proficiencyLevel: profile.proficiencyLevel,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };
  }

  private upsertLanguageProfileWithClient(
    client: Prisma.TransactionClient | typeof prisma,
    userId: string,
    input: UpsertLanguageProfileDto,
  ) {
    return client.languageProfile.upsert({
      where: {
        userId_learningLanguage: {
          userId,
          learningLanguage: input.learningLanguage,
        },
      },
      create: {
        userId,
        uiLocale: input.uiLocale,
        learningLanguage: input.learningLanguage,
        explanationLanguage: input.explanationLanguage,
        proficiencyFramework: input.proficiencyFramework,
        proficiencyLevel: input.proficiencyLevel,
      },
      update: {
        uiLocale: input.uiLocale,
        explanationLanguage: input.explanationLanguage,
        proficiencyFramework: input.proficiencyFramework,
        proficiencyLevel: input.proficiencyLevel,
      },
    });
  }

  private toSummary(
    goal: {
      id: string;
      userId: string;
      category: GoalCategory;
      title: string;
      outcome: string;
      status: GoalStatus;
      targetDate: Date | null;
      goalTemplateId: string | null;
      createdAt: Date;
      updatedAt: Date;
    },
    timezone: string,
  ): GoalSummary {
    return {
      id: goal.id,
      ownerId: goal.userId,
      category: goal.category,
      title: goal.title,
      outcome: goal.outcome,
      status: goal.status,
      targetDate: goal.targetDate?.toISOString(),
      timezone,
      templateVersionId: goal.goalTemplateId ?? undefined,
      createdAt: goal.createdAt.toISOString(),
      updatedAt: goal.updatedAt.toISOString(),
    };
  }
}
