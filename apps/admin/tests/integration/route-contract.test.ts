import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const routeFiles = [
  "app/admin/page.tsx",
  "app/admin/users/page.tsx",
  "app/admin/goals/page.tsx",
  "app/admin/campaigns/page.tsx",
  "app/admin/quests/page.tsx",
  "app/admin/content/page.tsx",
  "app/admin/community/page.tsx",
  "app/admin/reports/page.tsx",
  "app/admin/notifications/page.tsx",
  "app/admin/settings/page.tsx",
  "app/admin/audit-logs/page.tsx",
] as const;

describe("admin route contract", () => {
  it.each(routeFiles)("keeps %s implemented", (routeFile) => {
    expect(existsSync(resolve(process.cwd(), routeFile))).toBe(true);
  });
});
