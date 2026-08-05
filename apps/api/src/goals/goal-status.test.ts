import { GoalStatus } from "@levelup/database";
import { describe, expect, it } from "vitest";

import { canTransitionGoalStatus } from "./goal-status.js";

describe("goal status transitions", () => {
  it("allows activating a draft goal", () => {
    expect(
      canTransitionGoalStatus(GoalStatus.DRAFT, GoalStatus.ACTIVE),
    ).toBe(true);
  });

  it("allows pausing and resuming an active goal", () => {
    expect(
      canTransitionGoalStatus(GoalStatus.ACTIVE, GoalStatus.PAUSED),
    ).toBe(true);
    expect(
      canTransitionGoalStatus(GoalStatus.PAUSED, GoalStatus.ACTIVE),
    ).toBe(true);
  });

  it("keeps terminal goals terminal", () => {
    expect(
      canTransitionGoalStatus(GoalStatus.COMPLETED, GoalStatus.ACTIVE),
    ).toBe(false);
    expect(
      canTransitionGoalStatus(GoalStatus.ABANDONED, GoalStatus.ACTIVE),
    ).toBe(false);
  });

  it("accepts an idempotent state update", () => {
    expect(
      canTransitionGoalStatus(GoalStatus.ACTIVE, GoalStatus.ACTIVE),
    ).toBe(true);
  });
});
