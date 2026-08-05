import { describe, expect, it } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class values and ignores falsey values", () => {
    expect(cn("base", false, undefined, null, "active")).toBe("base active");
  });

  it("supports conditional class maps through clsx", () => {
    expect(cn({ visible: true, hidden: false })).toBe("visible");
  });
});
