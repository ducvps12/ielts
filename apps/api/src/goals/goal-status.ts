import { GoalStatus } from "@levelup/database";

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

export function canTransitionGoalStatus(
  current: GoalStatus,
  next: GoalStatus,
): boolean {
  return current === next || allowedTransitions[current].has(next);
}
