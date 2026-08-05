import { describe, expect, it } from "vitest";

import { adminNavigation } from "../components/shell/admin-navigation";
import { demoAdminOperator } from "../data/demo/admin";

describe("admin navigation permissions", () => {
  it("shows only entries covered by the operator permission set", () => {
    const allowed = adminNavigation.filter((item) =>
      demoAdminOperator.permissions.includes(item.permission),
    );

    expect(allowed).toHaveLength(adminNavigation.length);
    expect(new Set(allowed.map((item) => item.href)).size).toBe(allowed.length);
  });

  it("does not use duplicate permission-path pairs", () => {
    const pairs = adminNavigation.map((item) => `${item.permission}:${item.href}`);
    expect(new Set(pairs).size).toBe(pairs.length);
  });
});
