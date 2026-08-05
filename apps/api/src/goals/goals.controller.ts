import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import type {
  GoalSummary,
  LanguageProfileContract,
} from "@levelup/contracts";

import type { AuthContext } from "../auth/auth-context.js";
import { CurrentAuth } from "../auth/current-auth.decorator.js";
import { SessionGuard } from "../auth/session.guard.js";
import {
  CreateGoalDto,
  UpdateGoalStatusDto,
  UpsertLanguageProfileDto,
} from "./goals.dto.js";
import { GoalsService } from "./goals.service.js";

@Controller()
@UseGuards(SessionGuard)
export class GoalsController {
  constructor(private readonly goals: GoalsService) {}

  @Get("goals")
  list(@CurrentAuth() auth: AuthContext): Promise<GoalSummary[]> {
    return this.goals.list(auth.user.id, auth.user.timezone);
  }

  @Get("goals/:goalId")
  get(
    @CurrentAuth() auth: AuthContext,
    @Param("goalId") goalId: string,
  ): Promise<GoalSummary> {
    return this.goals.get(auth.user.id, goalId, auth.user.timezone);
  }

  @Post("goals")
  create(
    @CurrentAuth() auth: AuthContext,
    @Body() input: CreateGoalDto,
  ): Promise<GoalSummary> {
    return this.goals.create(auth.user.id, auth.user.timezone, input);
  }

  @Patch("goals/:goalId/status")
  updateStatus(
    @CurrentAuth() auth: AuthContext,
    @Param("goalId") goalId: string,
    @Body() input: UpdateGoalStatusDto,
  ): Promise<GoalSummary> {
    return this.goals.updateStatus(
      auth.user.id,
      goalId,
      input.status,
      auth.user.timezone,
    );
  }

  @Get("language-profiles")
  listLanguageProfiles(
    @CurrentAuth() auth: AuthContext,
  ): Promise<LanguageProfileContract[]> {
    return this.goals.listLanguageProfiles(auth.user.id);
  }

  @Put("language-profiles/current")
  upsertLanguageProfile(
    @CurrentAuth() auth: AuthContext,
    @Body() input: UpsertLanguageProfileDto,
  ): Promise<LanguageProfileContract> {
    return this.goals.upsertLanguageProfile(auth.user.id, input);
  }
}
